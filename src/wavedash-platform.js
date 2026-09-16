'use strict';
/*
  WAVEDASH PLATFORM LAYER
  -----------------------
  Loaded only by the readable/Wavedash build. It intentionally lives outside
  the 13KB competition artifact so platform features can stay expressive while
  the js13k release remains byte-for-byte independent.

  Features:
  - player identity, friends and live presence
  - 8 leaderboards (Style + clear time for each difficulty)
  - 13 achievements + persistent stats
  - cloud sync for settings and personal bests
  - leaderboard-attached GAME_MANAGED ghost UGC
  - highest-ranked available Rainbow Ghost racing overlay
  - Wavedash overlay shortcut and host connection/mute/fullscreen awareness
*/
(() => {
  const SDK = window.Wavedash;
  if (!SDK) return;

  const DIFFICULTIES = [
    { value: .7, key: 'easy', label: 'Easy' },
    { value: 1, key: 'normal', label: 'Normal' },
    { value: 1.6, key: 'hard', label: 'Hard' },
    { value: 2.4, key: 'impossible', label: 'Impossible' },
  ];
  const SAVE_PATH = 'stretchicorn/profile-v1.json';
  const GHOST_RATE_HZ = 10;
  const GHOST_VERSION = 1;
  const BOARDS = new Map();
  const encoder = new TextEncoder();
  const decoder = new TextDecoder();

  const platform = {
    username: 'PLAYER',
    userId: '',
    friendsOnline: 0,
    online: true,
    muted: false,
    fullscreen: false,
    statsReady: false,
    cloudReady: false,
    cloudDirty: false,
    pendingStatAdds: new Map(),
    pendingStatMax: new Map(),
    pendingStatMin: new Map(),
    pendingAchievements: new Set(),
    trace: [],
    ghost: null,
    ghostName: '',
    ghostRank: 0,
    ghostScore: 0,
    ghostDifficulty: '',
    lastSampleMs: -1,
    lastMode: typeof mode === 'number' ? mode : 0,
    lastWave: typeof wave === 'number' ? wave : 1,
    lastPresence: '',
    lastPresenceAt: 0,
    lastResult: null,
    currentMaxCombo: 1,
    runSerial: 0,
    submittedRunSerial: -1,
    runEligible: true,
    toast: '',
    toastUntil: 0,
  };
  window.__stretchicornWavedash = platform;

  const difficulty = (value = D) =>
    DIFFICULTIES.reduce((best, d) => Math.abs(d.value - value) < Math.abs(best.value - value) ? d : best, DIFFICULTIES[0]);

  const safe = async (label, fn) => {
    try {
      return await fn();
    } catch (error) {
      console.warn(`[Wavedash:${label}]`, error);
      return null;
    }
  };

  const toast = (text, seconds = 3) => {
    platform.toast = text;
    platform.toastUntil = performance.now() + seconds * 1000;
  };

  const achievementNames = {
    FIRST_SNAP: 'FIRST SNAP',
    DOUBLE_RAINBOW: 'DOUBLE RAINBOW',
    LUCKY_13: 'LUCKY 13',
    KERNEL_PARRY: 'RETURN TO SENDER',
    HUSK_CLEAR: 'HUSK CRACKED',
    COLONEL_CLEAR: 'COLONEL DOWN',
    MAX_COMBO: 'RAINBOW ENGINE',
    CAPN_CLEAR: "CAP'N POPS",
    EASY_CLEAR: 'EASY PICKINGS',
    NORMAL_CLEAR: 'FULL SHUCK',
    HARD_CLEAR: 'HARD SHUCK',
    IMPOSSIBLE_CLEAR: 'IMPOSSIBLE!',
    PERFECT_13: 'PERFECT 13',
  };

  function queueStatAdd(id, amount = 1) {
    if (!amount) return;
    if (!platform.statsReady) {
      platform.pendingStatAdds.set(id, (platform.pendingStatAdds.get(id) || 0) + amount);
      return;
    }
    const current = Number(SDK.getStat(id) || 0);
    SDK.setStat(id, current + amount, false);
  }

  function queueStatMax(id, value) {
    if (!Number.isFinite(value)) return;
    if (!platform.statsReady) {
      platform.pendingStatMax.set(id, Math.max(platform.pendingStatMax.get(id) ?? -Infinity, value));
      return;
    }
    const current = Number(SDK.getStat(id) || 0);
    if (value > current) SDK.setStat(id, value, false);
  }

  function queueStatMin(id, value) {
    if (!Number.isFinite(value) || value <= 0) return;
    if (!platform.statsReady) {
      const previous = platform.pendingStatMin.get(id);
      platform.pendingStatMin.set(id, previous == null ? value : Math.min(previous, value));
      return;
    }
    const current = Number(SDK.getStat(id) || 0);
    if (!current || value < current) SDK.setStat(id, value, false);
  }

  function unlock(id) {
    if (!platform.statsReady) {
      platform.pendingAchievements.add(id);
      return;
    }
    if (SDK.getAchievement(id)) return;
    if (SDK.setAchievement(id, false)) toast(`ACHIEVEMENT • ${achievementNames[id] || id}`, 3.2);
  }

  function flushStats() {
    if (!platform.statsReady) return;
    for (const [id, amount] of platform.pendingStatAdds) queueStatAdd(id, amount);
    for (const [id, value] of platform.pendingStatMax) queueStatMax(id, value);
    for (const [id, value] of platform.pendingStatMin) queueStatMin(id, value);
    for (const id of platform.pendingAchievements) unlock(id);
    platform.pendingStatAdds.clear();
    platform.pendingStatMax.clear();
    platform.pendingStatMin.clear();
    platform.pendingAchievements.clear();
    SDK.storeStats();
  }

  async function initStats() {
    const response = await safe('stats-load', () => SDK.requestStats());
    if (!response?.success) return;
    platform.statsReady = true;
    flushStats();
  }

  function profileSnapshot() {
    const best = {};
    for (const d of DIFFICULTIES) best[d.key] = Number(localStorage[`SB${d.value.toFixed(1)}`] || 0);
    return {
      version: 1,
      timestamp: Date.now(),
      settings: localStorage.SV || V.join(','),
      best,
    };
  }

  async function uploadCloud() {
    if (!platform.cloudReady) {
      platform.cloudDirty = true;
      return;
    }
    platform.cloudDirty = false;
    const payload = profileSnapshot();
    const wrote = await safe('cloud-write', () => SDK.writeLocalFile(SAVE_PATH, encoder.encode(JSON.stringify(payload))));
    if (!wrote) return;
    const uploaded = await safe('cloud-upload', () => SDK.uploadRemoteFile(SAVE_PATH));
    if (uploaded?.success) toast('WAVEDASH CLOUD SAVED', 1.6);
  }

  function applyCloudProfile(payload, preserveLocalSettings = false) {
    if (!payload || payload.version !== 1) return;
    if (!preserveLocalSettings && typeof payload.settings === 'string' && payload.settings) {
      const values = payload.settings.split(',').map(Number);
      if (values.length >= 2 && values.slice(0, 2).every(Number.isFinite)) {
        V = [values[0] > 0 ? 1 : 0, values[1] > 0 ? 1 : 0, values.length > 2 && Number.isFinite(values[2]) ? (values[2] > 0 ? 1 : 0) : 1];
        localStorage.SV = V.join(',');
      }
    }
    for (const d of DIFFICULTIES) {
      const key = `SB${d.value.toFixed(1)}`;
      const localBest = Number(localStorage[key] || 0);
      const remoteBest = Number(payload.best?.[d.key] || 0);
      if (remoteBest > localBest) localStorage[key] = String(remoteBest);
    }
  }

  async function initCloud() {
    const exists = await safe('cloud-exists', () => SDK.remoteFileExists(SAVE_PATH));
    if (exists?.success && exists.data) {
      const downloaded = await safe('cloud-download', () => SDK.downloadRemoteFile(SAVE_PATH));
      if (downloaded?.success) {
        const bytes = await safe('cloud-read', () => SDK.readLocalFile(SAVE_PATH));
        if (bytes) {
          try {
            applyCloudProfile(JSON.parse(decoder.decode(bytes)), platform.cloudDirty);
            toast('WAVEDASH CLOUD SYNCED', 1.8);
          } catch (error) {
            console.warn('[Wavedash:cloud-parse]', error);
          }
        }
      }
    }
    platform.cloudReady = true;
    if (platform.cloudDirty || !exists?.data) uploadCloud();
  }

  async function ensureBoards(d = difficulty()) {
    if (BOARDS.has(d.key)) return BOARDS.get(d.key);
    const styleResponse = await safe(`board-style-${d.key}`, () => SDK.getOrCreateLeaderboard(
      `Style - ${d.label}`,
      SDK.LeaderboardSortOrder.DESC,
      SDK.LeaderboardDisplayType.NUMERIC,
    ));
    const timeResponse = await safe(`board-time-${d.key}`, () => SDK.getOrCreateLeaderboard(
      `Clear Time - ${d.label}`,
      SDK.LeaderboardSortOrder.ASC,
      SDK.LeaderboardDisplayType.TIME_MILLISECONDS,
    ));
    if (!styleResponse?.success || !timeResponse?.success) return null;
    const ids = { style: styleResponse.data.id, time: timeResponse.data.id };
    BOARDS.set(d.key, ids);
    return ids;
  }

  async function initBoards() {
    await Promise.all(DIFFICULTIES.map(ensureBoards));
  }

  async function initFriends() {
    const response = await safe('friends', () => SDK.listFriends());
    if (response?.success) platform.friendsOnline = response.data.filter(friend => friend.isOnline).length;
  }

  function ghostPayload(snapshot) {
    return {
      version: GHOST_VERSION,
      rate: GHOST_RATE_HZ,
      difficulty: snapshot.difficulty.key,
      username: platform.username,
      style: snapshot.score,
      timeMs: snapshot.timeMs,
      frames: snapshot.trace,
    };
  }

  async function createGhostUGC(snapshot) {
    if (snapshot.trace.length < GHOST_RATE_HZ * 2) return undefined;
    const path = `replays/stretchicorn-${snapshot.difficulty.key}-${Date.now()}.json`;
    const wrote = await safe('ghost-write', () => SDK.writeLocalFile(path, encoder.encode(JSON.stringify(ghostPayload(snapshot)))));
    if (!wrote) return undefined;
    const response = await safe('ghost-create', () => SDK.createUGCItem(
      SDK.UGCType.GAME_MANAGED,
      `${snapshot.difficulty.label} Rainbow Ghost`,
      `${platform.username} • Style ${snapshot.score} • ${(snapshot.timeMs / 1000).toFixed(1)}s`,
      SDK.UGCVisibility.PUBLIC,
      path,
    ));
    return response?.success ? response.data : undefined;
  }

  async function loadTopGhost(d = difficulty()) {
    const ids = await ensureBoards(d);
    if (!ids) return;
    const response = await safe('ghost-top', () => SDK.listLeaderboardEntries(ids.style, 0, 10, false));
    const entry = response?.success ? response.data?.find(candidate => candidate.ugcId) : null;
    platform.ghost = null;
    platform.ghostName = '';
    platform.ghostRank = 0;
    platform.ghostScore = 0;
    platform.ghostDifficulty = d.key;
    if (!entry?.ugcId) return;
    const path = `ghosts/${d.key}-${entry.userId}.json`;
    const downloaded = await safe('ghost-download', () => SDK.downloadUGCItem(entry.ugcId, path));
    if (!downloaded?.success) return;
    const bytes = await safe('ghost-read', () => SDK.readLocalFile(path));
    if (!bytes) return;
    try {
      const data = JSON.parse(decoder.decode(bytes));
      if (data.version !== GHOST_VERSION || data.difficulty !== d.key || !Array.isArray(data.frames)) return;
      platform.ghost = data;
      platform.ghostName = entry.username || 'RIVAL';
      platform.ghostRank = entry.globalRank || 1;
      platform.ghostScore = Number(entry.score || 0);
      toast(`GHOST LOADED • #${platform.ghostRank} ${platform.ghostName}`, 2.2);
    } catch (error) {
      console.warn('[Wavedash:ghost-parse]', error);
    }
  }

  async function submitRun(snapshot) {
    const ids = await ensureBoards(snapshot.difficulty);
    if (!ids) return;

    const own = await safe('leaderboard-own', () => SDK.getMyLeaderboardEntries(ids.style));
    const previous = own?.success ? own.data?.[0] : null;
    const isStylePB = !previous || snapshot.score > Number(previous.score || 0);
    const ugcId = isStylePB ? await createGhostUGC(snapshot) : undefined;
    const metadata = {
      difficulty: snapshot.difficulty.key,
      timeMs: snapshot.timeMs,
      hearts: snapshot.hearts,
      kills: snapshot.kills,
      maxCombo: Number(snapshot.maxCombo.toFixed(2)),
      encore: snapshot.encore ? 1 : 0,
    };

    const styleResult = await safe('leaderboard-style-upload', () => SDK.uploadLeaderboardScore(
      ids.style,
      snapshot.score,
      true,
      ugcId,
      metadata,
    ));
    const timeResult = await safe('leaderboard-time-upload', () => SDK.uploadLeaderboardScore(
      ids.time,
      snapshot.timeMs,
      true,
      undefined,
      { ...metadata, style: snapshot.score },
    ));

    if (ugcId && (!styleResult?.success || !styleResult.data.scoreChanged)) safe('ghost-delete-unused', () => SDK.deleteUGCItem(ugcId));

    if (styleResult?.success) {
      platform.lastResult = {
        styleRank: styleResult.data.globalRank,
        submittedStyleRank: styleResult.data.submittedRank,
        timeRank: timeResult?.success ? timeResult.data.globalRank : null,
        stylePB: !!styleResult.data.scoreChanged,
        timePB: !!timeResult?.data?.scoreChanged,
      };
      const flags = [
        `STYLE #${styleResult.data.globalRank}`,
        timeResult?.success ? `TIME #${timeResult.data.globalRank}` : '',
        styleResult.data.scoreChanged ? 'NEW PB' : '',
      ].filter(Boolean).join(' • ');
      toast(`WAVEDASH • ${flags}`, 5);

      if (ugcId && styleResult.data.scoreChanged && previous?.ugcId && previous.ugcId !== ugcId) {
        safe('ghost-delete-old', () => SDK.deleteUGCItem(previous.ugcId));
      }
    }
  }

  function snapshotRun() {
    const d = difficulty();
    return {
      difficulty: d,
      score: Math.max(0, Math.round(score)),
      timeMs: Math.max(1, Math.round(runT * 1000)),
      hearts: Math.max(0, Math.round(hearts)),
      kills: Math.max(0, Math.round(kills)),
      maxCombo: platform.currentMaxCombo || combo || 1,
      encore: D > 2 && queen === 3,
      trace: platform.trace.slice(),
    };
  }

  function recordClear() {
    if (platform.submittedRunSerial === platform.runSerial) return;
    platform.submittedRunSerial = platform.runSerial;
    const snapshot = snapshotRun();
    const key = snapshot.difficulty.key.toUpperCase();
    queueStatAdd('RUNS_CLEARED', 1);
    unlock('CAPN_CLEAR');
    unlock(`${key}_CLEAR`);
    if (snapshot.hearts === 13) unlock('PERFECT_13');

    if (!platform.runEligible) {
      flushStats();
      uploadCloud();
      toast('CHECKPOINT CLEAR • LEADERBOARDS REQUIRE TRIAL 1', 4.5);
      return;
    }

    queueStatMax(`BEST_STYLE_${key}`, snapshot.score);
    queueStatMin(`BEST_TIME_${key}_MS`, snapshot.timeMs);
    queueStatMax('MAX_COMBO', snapshot.maxCombo);
    flushStats();
    uploadCloud();
    submitRun(snapshot);
  }

  function startRun(startWave = 1) {
    platform.runSerial++;
    platform.runEligible = startWave === 1;
    platform.trace = [];
    platform.lastSampleMs = -1;
    platform.currentMaxCombo = 1;
    platform.lastResult = null;
    platform.lastWave = wave;
    queueStatAdd('RUNS_STARTED', 1);
    const d = difficulty();
    setPresence(`Trial ${wave}/13 • ${d.label}`, platform.runEligible ? 'Stretching a rainbow' : 'Checkpoint retry • unranked');
    if (platform.runEligible) loadTopGhost(d);
    else {
      platform.ghost = null;
      platform.ghostName = '';
      platform.ghostRank = 0;
      platform.ghostScore = 0;
      platform.ghostDifficulty = d.key;
    }
  }

  function setPresence(status, details = '') {
    const key = `${status}\n${details}`;
    const now = performance.now();
    if (key === platform.lastPresence && now - platform.lastPresenceAt < 12000) return;
    platform.lastPresence = key;
    platform.lastPresenceAt = now;
    safe('presence', () => SDK.updateUserPresence({ status, details }));
  }

  function refreshPresence() {
    const d = difficulty();
    if (mode === 1) setPresence(`Trial ${wave}/13 • ${d.label}`, `Style ${Math.round(score)} • ♥ ${hearts}/13${platform.runEligible ? '' : ' • UNRANKED'}`);
    else if (mode === 2) setPresence(`Paused • Trial ${wave}/13`, d.label);
    else if (mode === 3) setPresence('Run flattened', `${d.label} • Style ${Math.round(score)}`);
    else if (mode === 5 || mode === 4) setPresence('Corn army defeated!', `${d.label} • Style ${Math.round(score)}`);
    else setPresence('Choosing a difficulty', 'Stretchicorn');
  }

  // Wrap gameplay seams rather than spending js13k bytes on platform hooks.
  const baseReset = reset;
  reset = function (...args) {
    const startWave = Number(args[0] ?? 1);
    const result = baseReset.apply(this, args);
    startRun(startWave);
    return result;
  };

  const baseStartKick = startKick;
  startKick = function (...args) {
    const beforeKick = kick;
    const result = baseStartKick.apply(this, args);
    if (beforeKick <= 0 && kick > 0 && snap > 0) {
      queueStatAdd('TOTAL_SNAPS', 1);
      unlock('FIRST_SNAP');
      if (snap === 2) {
        queueStatAdd('DOUBLE_RAINBOWS', 1);
        unlock('DOUBLE_RAINBOW');
      }
    }
    return result;
  };

  const baseLucky = lucky;
  lucky = function (...args) {
    const result = baseLucky.apply(this, args);
    queueStatAdd('LUCKY_13S', 1);
    unlock('LUCKY_13');
    return result;
  };

  const baseKillE = killE;
  killE = function (...args) {
    const before = kills;
    const result = baseKillE.apply(this, args);
    const gained = Math.max(0, kills - before);
    if (gained) queueStatAdd('TOTAL_KILLS', gained);
    return result;
  };

  const baseSay = say;
  say = function (message, ...args) {
    if (message === 'PARRY!') {
      queueStatAdd('PARRIES', 1);
      unlock('KERNEL_PARRY');
    }
    return baseSay.call(this, message, ...args);
  };

  const baseSave = save;
  save = function (...args) {
    const result = baseSave.apply(this, args);
    uploadCloud();
    return result;
  };

  // Add platform identity to the final title renderer without touching js13k.
  const baseTitle = title;
  title = function (...args) {
    const result = baseTitle.apply(this, args);
    const friends = platform.friendsOnline ? ` • ${platform.friendsOnline} FRIEND${platform.friendsOnline === 1 ? '' : 'S'} ONLINE` : '';
    const ghost = platform.ghostName ? ` • GHOST #${platform.ghostRank || 1} ${platform.ghostName} ${platform.ghostScore}` : '';
    txt(`WAVEDASH • ${platform.username}${friends}${ghost}`, W - 18, H - 14, 10, platform.online ? '#9abbb2' : '#ff8f8f', 'right');
    txt('F2 WAVEDASH', 18, H - 14, 10, '#7d91a0');
    if (platform.muted) txt('HOST MUTED', 18, H - 30, 10, '#ffcf69');
    return result;
  };

  const baseVictory = victory;
  victory = function (...args) {
    const result = baseVictory.apply(this, args);
    if (platform.lastResult) {
      const ranks = [`STYLE #${platform.lastResult.styleRank}`];
      if (platform.lastResult.timeRank) ranks.push(`TIME #${platform.lastResult.timeRank}`);
      if (platform.lastResult.stylePB) ranks.push('NEW PB');
      txt(`WAVEDASH • ${ranks.join(' • ')}`, W / 2, H / 2 + 120, 12, '#9bffca', 'center');
    } else if (!platform.runEligible && (mode === 5 || mode === 4)) {
      txt('WAVEDASH • CHECKPOINT CLEAR • UNRANKED', W / 2, H / 2 + 120, 12, '#ffd37a', 'center');
    }
    return result;
  };

  addEventListener('keydown', event => {
    if (event.key === 'F2' && !event.repeat) {
      event.preventDefault();
      SDK.toggleOverlay?.();
    }
  });

  // Ghost canvas is separate from the game canvas. It never changes collision,
  // scoring, RNG, screenshot contracts or the competition renderer.
  const ghostCanvas = document.createElement('canvas');
  ghostCanvas.width = W;
  ghostCanvas.height = H;
  ghostCanvas.setAttribute('aria-hidden', 'true');
  Object.assign(ghostCanvas.style, {
    position: 'fixed',
    pointerEvents: 'none',
    zIndex: '2',
    transformOrigin: 'top left',
  });
  document.body.appendChild(ghostCanvas);
  const GX = ghostCanvas.getContext('2d');

  function syncGhostCanvas() {
    const rect = C.getBoundingClientRect();
    ghostCanvas.style.left = `${rect.left}px`;
    ghostCanvas.style.top = `${rect.top}px`;
    ghostCanvas.style.width = `${rect.width}px`;
    ghostCanvas.style.height = `${rect.height}px`;
  }

  function ghostFrameIndex(frames, targetMs) {
    let lo = 0, hi = frames.length - 1;
    while (lo < hi) {
      const mid = Math.ceil((lo + hi) / 2);
      if ((frames[mid]?.[0] ?? Infinity) <= targetMs) lo = mid;
      else hi = mid - 1;
    }
    return lo;
  }

  function drawGhost() {
    syncGhostCanvas();
    GX.clearRect(0, 0, W, H);
    if (mode !== 1 || !platform.ghost?.frames?.length || platform.ghostDifficulty !== difficulty().key) return;
    const frames = platform.ghost.frames;
    const index = ghostFrameIndex(frames, Math.round(runT * 1000));
    const frame = frames[index];
    if (!frame || frame.length < 5) return;
    const [, ax, ay, px, py] = frame;

    GX.save();
    GX.globalAlpha = .25;
    GX.lineCap = 'round';
    const dx = px - ax, dy = py - ay, len = Math.hypot(dx, dy) || 1, ox = -dy / len, oy = dx / len;
    const colors = ['#ff5d8f', '#ff9f43', '#ffe45a', '#6fe38a', '#61c8ff', '#b28dff'];
    colors.forEach((color, i) => {
      const off = (i - 2.5) * 3;
      GX.strokeStyle = color;
      GX.lineWidth = 3;
      GX.beginPath();
      GX.moveTo(ax + ox * off, ay + oy * off);
      GX.lineTo(px + ox * off, py + oy * off);
      GX.stroke();
    });

    GX.globalAlpha = .12;
    GX.strokeStyle = '#fff';
    GX.lineWidth = 2;
    GX.beginPath();
    for (let i = Math.max(0, index - 18), first = true; i <= index; i++) {
      const f = frames[i];
      if (!f) continue;
      if (first) { GX.moveTo(f[1], f[2]); first = false; }
      else GX.lineTo(f[1], f[2]);
    }
    GX.stroke();

    GX.globalAlpha = .34;
    GX.fillStyle = '#fff';
    GX.beginPath(); GX.arc(ax, ay, 17, 0, Math.PI * 2); GX.fill();
    GX.beginPath(); GX.arc(px, py, 12, 0, Math.PI * 2); GX.fill();
    GX.globalAlpha = .55;
    GX.font = '600 11px system-ui';
    GX.textAlign = 'center';
    GX.fillText(`#${platform.ghostRank || 1} ${platform.ghostName}`, ax, ay - 25);
    GX.restore();
  }

  function drawToast() {
    let el = document.querySelector('#wavedash-toast');
    if (!platform.toast || performance.now() > platform.toastUntil) {
      if (el) el.style.display = 'none';
      return;
    }
    const rect = C.getBoundingClientRect();
    if (!el) {
      el = document.createElement('div');
      el.id = 'wavedash-toast';
      Object.assign(el.style, {
        position: 'fixed',
        zIndex: '3',
        pointerEvents: 'none',
        font: '600 12px system-ui',
        color: '#e8f7ff',
        background: 'rgba(9,6,16,.82)',
        border: '1px solid rgba(97,200,255,.5)',
        borderRadius: '7px',
        padding: '7px 10px',
        backdropFilter: 'blur(6px)',
      });
      document.body.appendChild(el);
    }
    el.textContent = platform.toast;
    el.style.display = 'block';
    el.style.left = `${rect.left + 12}px`;
    el.style.top = `${rect.top + 12}px`;
  }

  function monitor() {
    const nowMs = Math.round(runT * 1000);
    if (mode === 1 && platform.runEligible && (platform.lastSampleMs < 0 || nowMs - platform.lastSampleMs >= 1000 / GHOST_RATE_HZ)) {
      platform.lastSampleMs = nowMs;
      if (platform.trace.length < 12000) platform.trace.push([nowMs, Math.round(A.x), Math.round(A.y), Math.round(P.x), Math.round(P.y)]);
    }

    if (mode === 1 && combo > platform.currentMaxCombo) {
      platform.currentMaxCombo = combo;
      queueStatMax('MAX_COMBO', platform.currentMaxCombo);
      if (platform.currentMaxCombo >= 3.95) unlock('MAX_COMBO');
    }

    if (wave !== platform.lastWave) {
      const previous = platform.lastWave;
      platform.lastWave = wave;
      if (previous === 5 && wave > 5) unlock('HUSK_CLEAR');
      if (previous === 9 && wave > 9) unlock('COLONEL_CLEAR');
      refreshPresence();
    }

    if (mode !== platform.lastMode) {
      const previousMode = platform.lastMode;
      platform.lastMode = mode;
      if (mode === 5 && previousMode !== 5) recordClear();
      if (mode === 3) {
        flushStats();
        uploadCloud();
      }
      refreshPresence();
    }

    if (performance.now() - platform.lastPresenceAt > 12000) refreshPresence();
    drawGhost();
    drawToast();
    requestAnimationFrame(monitor);
  }

  // Initialize lifecycle first, then release deferred events after listeners exist.
  SDK.updateLoadProgressZeroToOne(1);
  SDK.init({ debug: false, deferEvents: true });
  SDK.on?.(SDK.Events.BACKEND_CONNECTED, () => {
    platform.online = true;
    refreshPresence();
  });
  SDK.on?.(SDK.Events.BACKEND_DISCONNECTED, () => {
    platform.online = false;
    toast('WAVEDASH OFFLINE • LOCAL RUN STILL ACTIVE', 3);
  });
  SDK.on?.(SDK.Events.BACKEND_RECONNECTING, () => {
    platform.online = false;
    toast('WAVEDASH RECONNECTING…', 2);
  });
  SDK.on?.(SDK.Events.MUTE_CHANGED, payload => {
    platform.muted = !!payload.isMuted;
  });
  SDK.on?.(SDK.Events.FULLSCREEN_CHANGED, payload => {
    platform.fullscreen = !!payload.isFullscreen;
  });
  SDK.readyForEvents?.();

  platform.username = SDK.getUsername?.() || SDK.getUser?.()?.username || 'PLAYER';
  platform.userId = SDK.getUserId?.() || SDK.getUser?.()?.id || '';
  platform.muted = !!SDK.isMuted?.();
  platform.fullscreen = !!SDK.isFullscreen?.();

  refreshPresence();
  initStats();
  initCloud();
  initFriends();
  initBoards();
  requestAnimationFrame(monitor);
})();
