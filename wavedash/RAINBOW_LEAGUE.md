# Stretchicorn on Wavedash: SDK integration map

George confirmed that post-deadline changes are allowed only when they are SDK integration work and do not update gameplay itself. The judged Wavedash branch therefore freezes the submitted game and treats every platform feature below as passive observation, persistence, or a Wavedash API call.

There is intentionally **no Wavedash-only combat change, level change, balance change, renderer override, ghost renderer, title-screen augmentation, victory-screen augmentation, or extra gameplay UI** in this branch.

## 1. Identity, friends, and presence

The SDK reads the signed-in player identity and online-friend list, then publishes presence for existing game states such as:

- choosing a difficulty
- current Trial + difficulty
- pause
- run failure
- campaign clear

Presence is refreshed after backend reconnection and cleared on page exit. No gameplay state depends on identity, friends, or presence.

## 2. Eight competitive leaderboards

The SDK creates and reuses:

- `Style - Easy`
- `Clear Time - Easy`
- `Style - Normal`
- `Clear Time - Normal`
- `Style - Hard`
- `Clear Time - Hard`
- `Style - Impossible`
- `Clear Time - Impossible`

Style sorts descending. Clear Time sorts ascending in milliseconds. `keepBest` is enabled for every submission.

Each saved run includes flat metadata describing the already-completed run: difficulty, time, hearts, kills, max combo, Encore state, and `fullRun: 1`.

### Ranked-run fairness

Only a campaign started from Trial 1 is rank eligible. Existing checkpoint retry behavior is untouched, but checkpoint completions never call the leaderboard or replay-UGC submission path and never unlock full-campaign clear achievements.

This closes the partial-run timing exploit without changing how retries work in the game.

## 3. Thirteen achievements + persistent stats

Import `wavedash/achievements.json` in the Developer Portal. The platform layer observes existing mechanics and records them through SDK calls:

- Rainbow Snap
- Double Rainbow
- Lucky 13
- kernel parry
- Trial 5 boss clear
- Trial 9 boss clear
- x4 combo
- full campaign clear
- Easy / Normal / Hard / Impossible clears
- 13-heart full campaign

Persistent stats include kills, Snaps, Double Rainbows, Lucky 13s, parries, runs started, full campaigns cleared, max combo, and per-difficulty best Style/time.

Stat writes are batched. `STATS_STORED` is observed so a failed persistence event can be retried without touching gameplay.

## 4. Cloud saves

The SDK syncs only state that already existed in the submitted game:

- Music/SFX/Mouse settings from `SV`
- per-difficulty Best Style values

Remote and local PB values merge monotonically so a weaker cloud copy cannot erase a stronger local record. If the player changes an existing setting before initial cloud hydration finishes, the local setting wins and is uploaded after hydration.

## 5. Leaderboard-attached replay trace UGC

A rank-eligible run passively records the existing body/head positions at 10 Hz. The trace does not feed back into simulation, input, collision, scoring, RNG, enemies, or rendering.

When the run is a new Style PB, the trace is written with `writeLocalFile()`, uploaded as `UGCType.GAME_MANAGED`, and attached to the Style leaderboard entry through `uploadLeaderboardScore(..., ugcId, metadata)`.

This intentionally stops at the SDK/UGC boundary. The post-deadline build does **not** draw another player's trace back into the game.

Superseded PB replay UGC is deleted after a better attached PB is accepted so the player's UGC storage does not accumulate abandoned files.

## 6. Disconnect-safe ranked submission

A full-run result is first written to a local Wavedash filesystem queue. If the backend is unavailable, the game continues normally and no remote submission is attempted.

On `BACKEND_CONNECTED`, the SDK layer retries queued results. The retry flow is designed around `keepBest` and the player's existing leaderboard entry so reconnects do not duplicate or downgrade saved standings.

The local queue is bounded and survives a page reload on the same device.

## Build isolation

The repository root remains the frozen game shell. `npm run wavedash:build` copies it to `wavedash-dist/` and replaces exactly one string: the original one-line Wavedash init hook becomes a script reference to `src/wavedash-platform.js`.

No stylesheet override is added. All copied game/rendering files are byte-for-byte identical to the frozen source.

## One-time Developer Portal setup

Import:

`wavedash/achievements.json`

Then launch one Wavedash playtest while signed in as a Stretchicorn team member so the eight `getOrCreateLeaderboard()` calls establish team-owned boards. Verify all eight are Visible and have the expected sort/display settings.

## Verification

```bash
npm run wavedash:test
npm run wavedash:dev
```

The automated suite checks both structure and behavior:

- Wavedash build shell differs from root only at the SDK init hook
- copied gameplay/rendering files are byte-identical
- no custom Wavedash renderer/UI layer exists
- exactly 8 leaderboard definitions and 13 achievements exist
- observer wrappers preserve frozen function return values
- checkpoint clears cannot submit ranked records
- a Trial-1 clear submits Style + Clear Time + PB replay UGC
- offline full-run results persist locally and submit after reconnect
- cloud/stat/presence calls remain platform-only side effects

The pull-request workflow also rejects any changed file outside the explicit SDK/tooling/documentation allowlist.

## Live sandbox checklist

Before publishing:

1. Import achievements/stats.
2. Run `npm run wavedash:test`.
3. Run `npm run wavedash:dev`.
4. Verify all eight leaderboards.
5. Trigger several existing mechanics and confirm achievements/stats update.
6. Reload after changing existing audio/mouse settings and confirm cloud restoration.
7. Complete a Trial-1 campaign and confirm Style + Clear Time + attached replay UGC.
8. Complete a checkpoint retry and confirm no ranked/full-clear platform record is produced.
9. Disconnect during a full-run clear, reconnect, and confirm the queued result is submitted exactly once.
