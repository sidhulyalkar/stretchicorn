'use strict';
/*
  WAVEDASH SDK LAYER
  ------------------
  This file is loaded only by the Wavedash build. It observes the frozen
  Stretchicorn game and calls Wavedash APIs without changing combat, movement,
  balance, rendering, level flow, RNG, collisions, scoring, or win conditions.

  SDK integrations:
  - player identity, friends, and presence
  - 8 leaderboards (Style + clear time for each difficulty)
  - 13 achievements + persistent stats
  - cloud save sync for settings and personal bests
  - GAME_MANAGED replay-trace UGC attached to Style PB entries
  - backend, stats-persistence, mute, and fullscreen lifecycle events
  - local retry queue for ranked submissions interrupted by connectivity loss
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
  const PENDING_PATH = 'stretchicorn/pending-ranked-runs-v1.json';
  const TRACE_RATE_HZ = 10;
  const TRACE_VERSION = 1;
  const MAX_PENDING_RUNS = 8;
  const BOARDS = new Map();
  const encoder = new TextEncoder();
  const decoder = new TextDecoder();

  const platform = {
    username: 'PLAYER',
    userId: '',
    friendsOnline: 0,
    online: false,
    muted: false,
    fullscreen: false,
    statsReady: false,
    statsDirty: false,
    statsTimer: null,
    cloudReady: false,
    cloudDirty: false,
    cloudInit: null,
    pendingStatAdds: new Map(),
    pendingStatMax: new Map(),
    pendingStatMin: new Map(),
    pendingAchievements: new Set(),
    pendingRuns: [],
    pendingLoaded: false,
    drainingRuns: false,
    trace: [],
    lastSampleMs: -1,
    lastMode: typeof mode === 'number' ? mode : 0,
    lastWave: typeof wave === 'number' ? wave : 1,
    lastPresence: '',
    lastPresenceAt: 0,
    desiredPresence: { status: 'Choosing a difficulty', details: 'Stretchicorn' },
    lastResult: null,
    currentMaxCombo: 1,
    runSerial: 0,
    submittedRunSerial: -1,
    runEligible: true,
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

  function scheduleStatsStore(delay = 1200) {
    platform.statsDirty = true;
    if (!platform.statsReady || platform.statsTimer) return;
    platform.statsTimer = setTimeout(() => {
      platform.statsTimer = null;
      if (!platform.statsDirty) return;
      const accepted = SDK.storeStats();
      if (accepted === false) scheduleStatsStore(2500);
    }, delay);
  }

  function queueStatAdd(id, amount = 1) {
    if (!amount) return;
    if (!platform.statsReady) {
      platform.pendingStatAdds.set(id, (platform.pendingStatAdds.get(id) || 0) + amount);
      return;
    }
    const current = Number(SDK.getStat(id) || 0);
    if (SDK.setStat(id, current + amount, false)) scheduleStatsStore();
  }

  function queueStatMax(id, value) {
    if (!Number.isFinite(value)) return;
    if (!platform.statsReady) {
      platform.pendingStatMax.set(id, Math.max(platform.pendingStatMax.get(id) ?? -Infinity, value));
      return;
    }
    const current = Number(SDK.getStat(id) || 0);
    if (value > current && SDK.setStat(id, value, false)) scheduleStatsStore();
  }

  function queueStatMin(id, value) {
    if (!Number.isFinite(value) || value <= 0) return;
    if (!platform.statsReady) {
      const previous = platform.pendingStatMin.get(id);
      platform.pendingStatMin.set(id, previous == null ? value : Math.min(previous, value));
      return;
    }
    const current = Number(SDK.getStat(id) || 0);
    if ((!current || value < current) && SDK.setStat(id, value, false)) scheduleStatsStore();
  }

  function unlock(id) {
    if (!platform.statsReady) {
      platform.pendingAchievements.add(id);
      return;
    }
    if (!SDK.getAchievement(id) && SDK.setAchievement(id, false)) scheduleStatsStore();
  }

  function flushQueuedStats() {
    if (!platform.statsReady) return;
    const adds = [...platform.pendingStatAdds];
    const maxes = [...platform.pendingStatMax];
    const mins = [...platform.pendingStatMin];
    const achievements = [...platform.pendingAchievements];
    platform.pendingStatAdds.clear();
    platform.pendingStatMax.clear();
    platform.pendingStatMin.clear();
    platform.pendingAchievements.clear();
    for (const [id, amount] of adds) queueStatAdd(id, amount);
    for (const [id, value] of maxes) queueStatMax(id, value);
    for (const [id, value] of mins) queueStatMin(id, value);
    for (const id of achievements) unlock(id);
  }

  function flushStatsNow() {
    if (!platform.statsReady || !platform.statsDirty) return;
    if (platform.statsTimer) {
      clearTimeout(platform.statsTimer);
      platform.statsTimer = null;
    }
    const accepted = SDK.storeStats();
    if (accepted === false) scheduleStatsStore(2500);
  }

  async function initStats() {
    if (platform.statsReady) return true;
    const response = await safe('stats-load', () => SDK.requestStats());
    if (!response?.success) return false;
    platform.statsReady = true;
    flushQueuedStats();
    return true;
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
    if (!platform.cloudReady || !platform.online) {
      platform.cloudDirty = true;
      return false;
    }
    const payload = profileSnapshot();
    const wrote = await safe('cloud-write', () => SDK.writeLocalFile(SAVE_PATH, encoder.encode(JSON.stringify(payload))));
    if (!wrote) {
      platform.cloudDirty = true;
      return false;
    }
    const uploaded = await safe('cloud-upload', () => SDK.uploadRemoteFile(SAVE_PATH));
    platform.cloudDirty = !uploaded?.success;
    return !!uploaded?.success;
  }

  function applyCloudProfile(payload, preserveLocalSettings = false) {
    if (!payload || payload.version !== 1) return false;
    let needsUpload = preserveLocalSettings;
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
      else if (localBest > remoteBest) needsUpload = true;
    }
    return needsUpload;
  }

  async function initCloud() {
    if (platform.cloudReady) return true;
    if (platform.cloudInit) return platform.cloudInit;
    platform.cloudInit = (async () => {
      const exists = await safe('cloud-exists', () => SDK.remoteFileExists(SAVE_PATH));
      if (!exists?.success) return false;
      let needsUpload = !exists.data;
      if (exists.data) {
        const downloaded = await safe('cloud-download', () => SDK.downloadRemoteFile(SAVE_PATH));
        if (!downloaded?.success) return false;
        const bytes = await safe('cloud-read', () => SDK.readLocalFile(SAVE_PATH));
        if (bytes) {
          try {
            needsUpload = applyCloudProfile(JSON.parse(decoder.decode(bytes)), platform.cloudDirty) || needsUpload;
          } catch (error) {
            console.warn('[Wavedash:cloud-parse]', error);
            needsUpload = true;
          }
        }
      }
      platform.cloudReady = true;
      if (platform.cloudDirty || needsUpload) await uploadCloud();
      return true;
    })();
    const result = await platform.cloudInit;
    platform.cloudInit = null;
    return result;
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
    const results = await Promise.all(DIFFICULTIES.map(ensureBoards));
    return results.every(Boolean);
  }

  async function initFriends() {
    const response = await safe('friends', () => SDK.listFriends());
    if (!response?.success) return false;
    platform.friendsOnline = response.data.filter(friend => friend.isOnline).length;
    return true;
  }

  function replayPayload(record) {
    return {
      version: TRACE_VERSION,
      rate: TRACE_RATE_HZ,
      difficulty: record.difficulty,
      username: platform.username,
      style: record.score,
      timeMs: record.timeMs,
      frames: record.trace,
    };
  }

  async function createReplayUGC(record) {
    if (!Array.isArray(record.trace) || record.trace.length < TRACE_RATE_HZ * 2) return undefined;
    const path = `replays/stretchicorn-${record.id}.json`;
    const wrote = await safe('replay-write', () => SDK.writeLocalFile(path, encoder.encode(JSON.stringify(replayPayload(record)))));
    if (!wrote) return undefined;
    const d = DIFFICULTIES.find(item => item.key === record.difficulty) || DIFFICULTIES[1];
    const response = await safe('replay-create', () => SDK.createUGCItem(
      SDK.UGCType.GAME_MANAGED,
      `${d.label} PB Replay Trace`,
      `${platform.username} • Style ${record.score} • ${(record.timeMs / 1000).toFixed(1)}s`,
      SDK.UGCVisibility.PUBLIC,
      path,
    ));
    return response?.success ? response.data : undefined;
  }

  function makePendingRecord(snapshot) {
    return {
      id: `${platform.userId || 'player'}-${Date.now()}-${platform.runSerial}`,
      difficulty: snapshot.difficulty.key,
      score: snapshot.score,
      timeMs: snapshot.timeMs,
      hearts: snapshot.hearts,
      kills: snapshot.kills,
      maxCombo: snapshot.maxCombo,
      encore: snapshot.encore ? 1 : 0,
      trace: snapshot.trace,
      ugcId: null,
    };
  }

  async function persistPendingRuns() {
    const payload = JSON.stringify({ version: 1, runs: platform.pendingRuns });
    return !!(await safe('pending-write', () => SDK.writeLocalFile(PENDING_PATH, encoder.encode(payload))));
  }

  async function loadPendingRuns() {
    const bytes = await safe('pending-read', () => SDK.readLocalFile(PENDING_PATH));
    if (bytes) {
      try {
        const payload = JSON.parse(decoder.decode(bytes));
        if (payload?.version === 1 && Array.isArray(payload.runs)) {
          platform.pendingRuns = payload.runs.filter(run =>
            run && DIFFICULTIES.some(d => d.key === run.difficulty) && Number.isFinite(run.score) && Number.isFinite(run.timeMs)
          ).slice(-MAX_PENDING_RUNS);
        }
      } catch (error) {
        console.warn('[Wavedash:pending-parse]', error);
      }
    }
    platform.pendingLoaded = true;
    if (platform.online) drainPendingRuns();
  }

  async function submitPendingRun(record) {
    const d = DIFFICULTIES.find(item => item.key === record.difficulty);
    if (!d) return true;
    const ids = await ensureBoards(d);
    if (!ids) return false;

    const ownStyle = await safe('leaderboard-own-style', () => SDK.getMyLeaderboardEntries(ids.style));
    if (!ownStyle?.success) return false;
    const previous = ownStyle.data?.[0] || null;
    let styleRank = previous?.globalRank || null;
    let submittedStyleRank = null;
    let stylePB = false;

    if (!previous || record.score > Number(previous.score || 0)) {
      if (!record.ugcId) {
        record.ugcId = await createReplayUGC(record) || null;
        if (record.ugcId) await persistPendingRuns();
      }
      const metadata = {
        difficulty: record.difficulty,
        timeMs: record.timeMs,
        hearts: record.hearts,
        kills: record.kills,
        maxCombo: Number(Number(record.maxCombo || 1).toFixed(2)),
        encore: record.encore ? 1 : 0,
        fullRun: 1,
      };
      const styleResult = await safe('leaderboard-style-upload', () => SDK.uploadLeaderboardScore(
        ids.style,
        record.score,
        true,
        record.ugcId || undefined,
        metadata,
      ));
      if (!styleResult?.success) return false;
      styleRank = styleResult.data.globalRank;
      submittedStyleRank = styleResult.data.submittedRank;
      stylePB = !!styleResult.data.scoreChanged;
      if (record.ugcId && !stylePB) {
        await safe('replay-delete-unused', () => SDK.deleteUGCItem(record.ugcId));
        record.ugcId = null;
        await persistPendingRuns();
      }
      if (record.ugcId && stylePB && previous?.ugcId && previous.ugcId !== record.ugcId) {
        safe('replay-delete-old', () => SDK.deleteUGCItem(previous.ugcId));
      }
    } else if (record.ugcId && previous?.ugcId !== record.ugcId) {
      await safe('replay-delete-stale', () => SDK.deleteUGCItem(record.ugcId));
      record.ugcId = null;
      await persistPendingRuns();
    }

    const timeMetadata = {
      difficulty: record.difficulty,
      style: record.score,
      hearts: record.hearts,
      kills: record.kills,
      maxCombo: Number(Number(record.maxCombo || 1).toFixed(2)),
      encore: record.encore ? 1 : 0,
      fullRun: 1,
    };
    const timeResult = await safe('leaderboard-time-upload', () => SDK.uploadLeaderboardScore(
      ids.time,
      record.timeMs,
      true,
      undefined,
      timeMetadata,
    ));
    if (!timeResult?.success) return false;

    platform.lastResult = {
      styleRank,
      submittedStyleRank,
      timeRank: timeResult.data.globalRank,
      submittedTimeRank: timeResult.data.submittedRank,
      stylePB,
      timePB: !!timeResult.data.scoreChanged,
    };
    setPresence(
      `Cleared ${d.label}`,
      `Style ${record.score}${styleRank ? ` • #${styleRank}` : ''} • ${(record.timeMs / 1000).toFixed(1)}s`,
      true,
    );
    return true;
  }

  async function drainPendingRuns() {
    if (!platform.online || !platform.pendingLoaded || platform.drainingRuns) return;
    platform.drainingRuns = true;
    try {
      while (platform.online && platform.pendingRuns.length) {
        const record = platform.pendingRuns[0];
        if (!(await submitPendingRun(record))) break;
        platform.pendingRuns.shift();
        await persistPendingRuns();
      }
    } finally {
      platform.drainingRuns = false;
    }
  }

  async function queueRankedRun(snapshot) {
    const record = makePendingRecord(snapshot);
    platform.pendingRuns.push(record);
    if (platform.pendingRuns.length > MAX_PENDING_RUNS) platform.pendingRuns.splice(0, platform.pendingRuns.length - MAX_PENDING_RUNS);
    await persistPendingRuns();
    if (platform.online) drainPendingRuns();
  }

  function snapshotRun() {
    return {
      difficulty: difficulty(),
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
    if (!platform.runEligible) {
      flushStatsNow();
      uploadCloud();
      return;
    }

    const snapshot = snapshotRun();
    const key = snapshot.difficulty.key.toUpperCase();
    queueStatAdd('RUNS_CLEARED', 1);
    queueStatMax(`BEST_STYLE_${key}`, snapshot.score);
    queueStatMin(`BEST_TIME_${key}_MS`, snapshot.timeMs);
    queueStatMax('MAX_COMBO', snapshot.maxCombo);
    unlock('CAPN_CLEAR');
    unlock(`${key}_CLEAR`);
    if (snapshot.hearts === 13) unlock('PERFECT_13');
    flushStatsNow();
    uploadCloud();
    queueRankedRun(snapshot);
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
    refreshPresence(true);
  }

  function setPresence(status, details = '', force = false) {
    platform.desiredPresence = { status, details };
    if (!platform.online) return;
    const key = `${status}\n${details}`;
    const now = performance.now();
    if (!force && key === platform.lastPresence && now - platform.lastPresenceAt < 12000) return;
    platform.lastPresence = key;
    platform.lastPresenceAt = now;
    safe('presence', () => SDK.updateUserPresence({ status, details }));
  }

  function refreshPresence(force = false) {
    const d = difficulty();
    if (mode === 1) setPresence(`Trial ${wave}/13 • ${d.label}`, `Style ${Math.round(score)} • ♥ ${hearts}/13${platform.runEligible ? '' : ' • unranked'}`, force);
    else if (mode === 2) setPresence(`Paused • Trial ${wave}/13`, d.label, force);
    else if (mode === 3) setPresence('Run flattened', `${d.label} • Style ${Math.round(score)}`, force);
    else if (mode === 5 || mode === 4) setPresence('Campaign clear', `${d.label} • Style ${Math.round(score)}${platform.runEligible ? '' : ' • unranked'}`, force);
    else setPresence('Choosing a difficulty', 'Stretchicorn', force);
  }

  // Observe existing game seams. Each wrapper calls the frozen implementation first
  // and only records SDK-facing telemetry afterward.
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
    const result = baseSay.call(this, message, ...args);
    if (message === 'PARRY!') {
      queueStatAdd('PARRIES', 1);
      unlock('KERNEL_PARRY');
    }
    return result;
  };

  const baseSave = save;
  save = function (...args) {
    const result = baseSave.apply(this, args);
    uploadCloud();
    return result;
  };

  function monitor() {
    const nowMs = Math.round(runT * 1000);
    if (mode === 1 && platform.runEligible && (platform.lastSampleMs < 0 || nowMs - platform.lastSampleMs >= 1000 / TRACE_RATE_HZ)) {
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
      if (platform.runEligible && previous === 5 && wave > 5) unlock('HUSK_CLEAR');
      if (platform.runEligible && previous === 9 && wave > 9) unlock('COLONEL_CLEAR');
      refreshPresence(true);
    }

    if (mode !== platform.lastMode) {
      const previousMode = platform.lastMode;
      platform.lastMode = mode;
      if (mode === 5 && previousMode !== 5) recordClear();
      if (mode === 3) {
        flushStatsNow();
        uploadCloud();
      }
      refreshPresence(true);
    }

    if (performance.now() - platform.lastPresenceAt > 12000) refreshPresence();
    requestAnimationFrame(monitor);
  }

  function onConnected() {
    platform.online = true;
    platform.lastPresence = '';
    refreshPresence(true);
    initStats().then(() => {
      if (platform.statsDirty) flushStatsNow();
    });
    initCloud();
    initFriends();
    initBoards().then(() => drainPendingRuns());
    if (platform.pendingLoaded) drainPendingRuns();
  }

  function onDisconnected() {
    platform.online = false;
  }

  SDK.updateLoadProgressZeroToOne(1);
  SDK.init({ debug: false, deferEvents: true });
  SDK.on?.(SDK.Events.BACKEND_CONNECTED, onConnected);
  SDK.on?.(SDK.Events.BACKEND_DISCONNECTED, onDisconnected);
  SDK.on?.(SDK.Events.BACKEND_RECONNECTING, onDisconnected);
  SDK.on?.(SDK.Events.STATS_STORED, payload => {
    if (payload?.success) platform.statsDirty = false;
    else scheduleStatsStore(2500);
  });
  SDK.on?.(SDK.Events.MUTE_CHANGED, payload => {
    platform.muted = !!payload.isMuted;
  });
  SDK.on?.(SDK.Events.FULLSCREEN_CHANGED, payload => {
    platform.fullscreen = !!payload.isFullscreen;
  });

  platform.username = SDK.getUsername?.() || SDK.getUser?.()?.username || 'PLAYER';
  platform.userId = SDK.getUserId?.() || SDK.getUser?.()?.id || '';
  platform.muted = !!SDK.isMuted?.();
  platform.fullscreen = !!SDK.isFullscreen?.();

  loadPendingRuns();
  refreshPresence();
  SDK.readyForEvents?.();
  requestAnimationFrame(monitor);

  addEventListener('pagehide', () => {
    flushStatsNow();
    if (platform.cloudDirty) uploadCloud();
    if (platform.online) safe('presence-clear', () => SDK.updateUserPresence({}));
  });
})();
