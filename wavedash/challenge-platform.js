'use strict';
/*
  WAVEDASH CHALLENGE EXTENSION
  ----------------------------
  SDK-only competitive layer loaded after src/wavedash-platform.js.
  It never writes game state or renders UI. It observes completed full runs and
  adds three long-tail Wavedash leaderboards plus reconnect/startup reconciliation
  for the World's End achievement.
*/
(() => {
  const SDK = window.Wavedash;
  const platform = window.__stretchicornWavedash;
  if (!SDK || !platform) return;

  const GAME_BUILD = 'eee2ac40c71070ddb1502e16362e3b9490d5ce61';
  const TRACE_VERSION = 1;
  const QUEUE_PATH = 'stretchicorn/pending-challenge-runs-v1.json';
  const MAX_PENDING = 8;
  const encoder = new TextEncoder();
  const decoder = new TextDecoder();

  const challenge = {
    boards: null,
    pending: [],
    loaded: false,
    draining: false,
    lastMode: typeof mode === 'number' ? mode : 0,
    lastQueuedRunSerial: -1,
    worldsTimer: null,
    worldsRetries: 0,
  };
  window.__stretchicornWavedashChallenges = challenge;

  const safe = async (label, fn) => {
    try {
      return await fn();
    } catch (error) {
      console.warn(`[Wavedash:${label}]`, error);
      return null;
    }
  };

  async function ensureBoards() {
    if (challenge.boards) return challenge.boards;
    if (!platform.online) return null;
    const defs = [
      ['harvest', 'Biggest Harvest'],
      ['puristHard', 'Purist Style - Hard'],
      ['puristImpossible', 'Purist Style - Impossible'],
    ];
    const responses = await Promise.all(defs.map(([, name]) => safe(`board-${name}`, () =>
      SDK.getOrCreateLeaderboard(name, SDK.LeaderboardSortOrder.DESC, SDK.LeaderboardDisplayType.NUMERIC)
    )));
    if (responses.some(response => !response?.success)) return null;
    challenge.boards = Object.fromEntries(defs.map(([key], i) => [key, responses[i].data.id]));
    return challenge.boards;
  }

  function runMetadata(record) {
    return {
      difficulty: record.difficulty,
      timeMs: record.timeMs,
      hearts: record.hearts,
      kills: record.kills,
      maxCombo: Number(Number(record.maxCombo || 1).toFixed(2)),
      powerups: record.powerups,
      grazes: record.grazes,
      parries: record.parries,
      doubleRainbows: record.doubleRainbows,
      bestSlash: record.bestSlash,
      fullRun: 1,
      gameBuild: GAME_BUILD,
      traceVersion: TRACE_VERSION,
    };
  }

  function snapshotClear() {
    const difficulty = D > 2 ? 'impossible' : D > 1.3 ? 'hard' : D < .85 ? 'easy' : 'normal';
    return {
      id: `${platform.userId || 'player'}-${Date.now()}-${platform.runSerial}`,
      difficulty,
      score: Math.max(0, Math.round(score)),
      timeMs: Math.max(1, Math.round(runT * 1000)),
      hearts: Math.max(0, Math.round(hearts)),
      kills: Math.max(0, Math.round(kills)),
      maxCombo: Number(platform.currentMaxCombo || combo || 1),
      powerups: Number(platform.runPowerups || 0),
      grazes: Number(platform.runGrazes || 0),
      parries: Number(platform.runParries || 0),
      doubleRainbows: Number(platform.runDoubleRainbows || 0),
      bestSlash: Number(platform.bestSlashKills || 0),
    };
  }

  async function persistPending() {
    const payload = encoder.encode(JSON.stringify({ version: 1, runs: challenge.pending }));
    return !!(await safe('challenge-pending-write', () => SDK.writeLocalFile(QUEUE_PATH, payload)));
  }

  async function loadPending() {
    const bytes = await safe('challenge-pending-read', () => SDK.readLocalFile(QUEUE_PATH));
    if (bytes) {
      try {
        const payload = JSON.parse(decoder.decode(bytes));
        if (payload?.version === 1 && Array.isArray(payload.runs)) {
          challenge.pending = payload.runs.filter(run =>
            run && ['easy', 'normal', 'hard', 'impossible'].includes(run.difficulty) &&
            Number.isFinite(run.score) && Number.isFinite(run.timeMs)
          ).slice(-MAX_PENDING);
        }
      } catch (error) {
        console.warn('[Wavedash:challenge-pending-parse]', error);
      }
    }
    challenge.loaded = true;
    if (platform.online) drainPending();
  }

  async function submitChallengeRun(record) {
    const boards = await ensureBoards();
    if (!boards) return false;
    const metadata = runMetadata(record);

    if (record.bestSlash > 0) {
      const harvest = await safe('leaderboard-biggest-harvest', () =>
        SDK.uploadLeaderboardScore(boards.harvest, record.bestSlash, true, undefined, metadata)
      );
      if (!harvest?.success) return false;
    }

    if (record.powerups === 0 && record.difficulty === 'hard') {
      const purist = await safe('leaderboard-purist-hard', () =>
        SDK.uploadLeaderboardScore(boards.puristHard, record.score, true, undefined, metadata)
      );
      if (!purist?.success) return false;
    }

    if (record.powerups === 0 && record.difficulty === 'impossible') {
      const purist = await safe('leaderboard-purist-impossible', () =>
        SDK.uploadLeaderboardScore(boards.puristImpossible, record.score, true, undefined, metadata)
      );
      if (!purist?.success) return false;
    }

    if (record.difficulty === 'impossible') scheduleWorldsEndCheck(250);
    return true;
  }

  async function drainPending() {
    if (!platform.online || !challenge.loaded || challenge.draining) return;
    challenge.draining = true;
    try {
      while (platform.online && challenge.pending.length) {
        if (!(await submitChallengeRun(challenge.pending[0]))) break;
        challenge.pending.shift();
        await persistPending();
      }
    } finally {
      challenge.draining = false;
    }
  }

  async function queueChallengeRun(record) {
    challenge.pending.push(record);
    if (challenge.pending.length > MAX_PENDING) challenge.pending.splice(0, challenge.pending.length - MAX_PENDING);
    await persistPending();
    if (platform.online) drainPending();
  }

  function scheduleWorldsEndCheck(delay = 1000) {
    if (challenge.worldsTimer) return;
    challenge.worldsTimer = setTimeout(async () => {
      challenge.worldsTimer = null;
      const done = await reconcileWorldsEnd();
      if (!done && platform.online && challenge.worldsRetries++ < 5) scheduleWorldsEndCheck(1000);
      else challenge.worldsRetries = 0;
    }, delay);
  }

  async function reconcileWorldsEnd() {
    if (!platform.online || !platform.statsReady) return false;
    if (SDK.getAchievement?.('WORLDS_END')) return true;
    const board = await safe('worlds-end-board', () => SDK.getOrCreateLeaderboard(
      'Style - Impossible',
      SDK.LeaderboardSortOrder.DESC,
      SDK.LeaderboardDisplayType.NUMERIC,
    ));
    if (!board?.success) return false;
    const [mine, top] = await Promise.all([
      safe('worlds-end-own-entry', () => SDK.getMyLeaderboardEntries(board.data.id)),
      safe('worlds-end-top13', () => SDK.listLeaderboardEntries(board.data.id, 0, 13, false)),
    ]);
    if (!mine?.success || !top?.success) return false;
    const entry = mine.data?.[0];
    if (!entry || entry.globalRank > 13 || top.data.length < 13) return true;
    if (SDK.setAchievement('WORLDS_END', false)) SDK.storeStats();
    return true;
  }

  function observeClear() {
    if (mode === 5 && challenge.lastMode !== 5 && platform.runEligible && challenge.lastQueuedRunSerial !== platform.runSerial) {
      challenge.lastQueuedRunSerial = platform.runSerial;
      const record = snapshotClear();
      queueChallengeRun(record);
      if (record.difficulty === 'impossible') scheduleWorldsEndCheck(1250);
    }
    challenge.lastMode = mode;
    requestAnimationFrame(observeClear);
  }

  function onConnected() {
    ensureBoards().then(() => drainPending());
    scheduleWorldsEndCheck(750);
  }

  SDK.on?.(SDK.Events.BACKEND_CONNECTED, onConnected);
  loadPending();
  if (platform.online) onConnected();
  requestAnimationFrame(observeClear);
})();
