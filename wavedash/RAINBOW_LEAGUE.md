# Stretchicorn on Wavedash: SDK integration map

George confirmed that post-deadline changes are allowed only when they are SDK integration work and do not update gameplay itself. The judged Wavedash branch therefore freezes the submitted game and treats every platform feature below as passive observation, persistence, or a Wavedash API call.

There is intentionally **no Wavedash-only combat change, level change, balance change, renderer override, ghost renderer, title-screen augmentation, victory-screen augmentation, or extra gameplay UI** in this branch.

## 1. Identity, friends, and presence

The SDK reads the signed-in player identity and online-friend list, then publishes presence for existing states: choosing difficulty, current Trial/difficulty, pause, failure, and campaign clear. Presence is refreshed after reconnect and cleared on exit. Gameplay never depends on identity/friends/presence.

## 2. Eleven competitive leaderboards

Core boards:

- `Style - Easy`
- `Clear Time - Easy`
- `Style - Normal`
- `Clear Time - Normal`
- `Style - Hard`
- `Clear Time - Hard`
- `Style - Impossible`
- `Clear Time - Impossible`

Long-tail challenge boards:

- `Biggest Harvest`
- `Silky Style - Hard`
- `Silky Style - Impossible`

Style and challenge boards sort descending. Clear Time sorts ascending in milliseconds. Every submission uses `keepBest: true`.

Challenge-board metadata records the already-completed run plus frozen-build provenance (`gameBuild` and `traceVersion`). `Biggest Harvest` submits the run's best observed single-slash eligible-defeat count. The two Silky Style boards submit only zero-powerup full campaigns on the named difficulty.

Only a campaign started from Trial 1 is rank eligible. Existing checkpoint retry behavior is untouched, and checkpoint completions never call either the core or challenge ranking paths.

## 3. Thirty-nine achievements + persistent stats

Import `wavedash/achievements.json` in the Developer Portal. The platform layer observes existing mechanics and records them through SDK calls only.

### First-session discovery

`First Snap`, `Double Rainbow`, `Lucky 13`, `Close Shave`, `Return to Sender`, `Rainbow Engine`, `Husk Cracked`, `Colonel Chop`, `Easy Pickings`, `Full Shuck`, `Hard Shuck`, `Rainbow Royalty`, and `Heart Hold'em`.

### One-run mastery

- `Corn Combine`: five eligible defeats during one existing horn slash
- `Great Grazer`: thirteen grazes in one Trial before a heart loss
- `Parry Party`: thirteen parries in one run
- `Full Spectrum`: thirteen cumulative seconds at x4 combo
- `Wall to Wall`: five Wall Smashes in one run
- `Prism Break`: Double Rainbow within three seconds of collecting Prism Cob
- `Full Pantry`: collect all five existing powerup types in one run

### Self-imposed challenge runs

- `Plain Corn`: Easy with zero powerups
- `Dry Shuck`: Normal with zero powerups
- `Raw Rainbow`: Hard with zero powerups
- `Powerless Pony`: Impossible with zero powerups
- `Pristine Prance`: Hard without ever losing a heart
- `Cob Comeback`: reach the existing Impossible Encore
- `Pure Spectrum`: complete all four zero-powerup difficulty challenges

Only the player-facing titles changed during the final naming pass. Stable achievement identifiers remain unchanged so SDK wiring, saved achievement state, and portal references remain compatible.

### Long-tail return goals

- `Popcorn Apprentice`: 1,300 eligible defeats
- `Corn Reaper`: 13,000 eligible defeats
- `Maize Master`: 130,000 eligible defeats
- `Serial Snapper`: 1,300 charged Rainbow Snaps
- `Graze Craze`: 1,300 grazes
- `Return Center`: 1,300 parries
- `Seeing Double`: 130 Double Rainbows
- `Cob Composter`: thirteen full campaigns

### PB and world competition

- `Thirteen Seconds Faster`: improve an established clear-time PB by at least 13 seconds
- `Two Rainbows, One Run`: improve established Style and Clear Time PBs on the same run
- `Corn Prix Champion`: improve an established Clear Time PB on every difficulty
- `World's End`: hold a global Top-13 Impossible Style rank once at least thirteen players are ranked

The PB logic compares against the player's existing Wavedash entries before submission, so the first score establishes a baseline rather than falsely counting as an improvement.

`World's End` is additionally reconciled on backend connection. If a player was already in the Top 13 when the board later reaches thirteen players, the SDK can unlock it without requiring another Impossible score.

### Secret achievements

After import, mark these four Secret in Wavedash:

- `NO_POWER_IMPOSSIBLE` — Powerless Pony
- `UNTOUCHED` — Pristine Prance
- `ENCORE_REACHED` — Cob Comeback
- `PURE_SPECTRUM` — Pure Spectrum

## 4. Cloud saves

The SDK syncs only state that already existed in the submitted game: Music/SFX/Mouse settings and per-difficulty Best Style values. Remote/local PBs merge monotonically so a weaker cloud copy cannot erase a stronger local record.

## 5. Leaderboard-attached replay trace UGC

A rank-eligible run passively records body/head positions at 10 Hz. The trace never feeds back into simulation, input, collisions, scoring, RNG, enemies, or rendering.

On a new Style PB, the trace is written with `writeLocalFile()`, uploaded as `UGCType.GAME_MANAGED`, and attached to the Style entry. Superseded PB replay UGC is cleaned up. The post-deadline build deliberately does not render another player's trace back into the game.

## 6. Disconnect-safe submission

The core Style/Time result and the three challenge-board results each use bounded Wavedash-filesystem retry queues. Offline clears are persisted first and submitted after `BACKEND_CONNECTED`. `keepBest` protects standings from reconnect retries.

## Build isolation

The repository root remains the frozen game shell. `npm run wavedash:build` copies it to `wavedash-dist/` and replaces exactly one string: the original one-line Wavedash init hook becomes two SDK-only script references:

- `src/wavedash-platform.js`
- `wavedash/challenge-platform.js`

No stylesheet override is added. All copied game/rendering files are byte-for-byte identical to the frozen source.

## Portal integrity

Bulk-import `wavedash/achievements.json`, reconcile any previously imported 13-achievement state, and mark the four secret achievements. Then run:

```bash
npm run wavedash:audit
```

The audit reads the live Wavedash achievement list and fails unless it contains exactly the intended 39 achievements with matching titles/descriptions/secret flags. `npm run wavedash:push` runs this audit before uploading.

Launch one Wavedash playtest while signed in as a Stretchicorn team member so the eleven `getOrCreateLeaderboard()` calls establish team-owned boards, then verify all eleven are Visible.

## Verification

```bash
npm run wavedash:test
npm run wavedash:audit
npm run wavedash:dev
```

The automated suite checks:

- Wavedash shell differs from root only at the SDK hook
- copied gameplay/rendering files are byte-identical
- no custom Wavedash renderer/UI exists
- exactly 11 leaderboard definitions and 39 achievements exist
- final player-facing achievement names and Silky Style board names are locked in tests
- long-tail thresholds are locked to the intended values
- observer wrappers preserve frozen function returns
- checkpoint clears cannot submit core or challenge records
- slash/graze/parry/powerup/x4/zero-powerup/PB/Encore observers remain SDK-only
- core and challenge offline queues drain after reconnect
- challenge metadata includes frozen-build provenance
- `World's End` is reconciled on reconnect
- cloud/stat/presence calls remain platform-only side effects

The pull-request workflow also rejects any changed file outside the explicit SDK/tooling/documentation allowlist.

## Final live checks

Before publishing: make `wavedash:audit` pass, run the sandbox from `wavedash-dist`, verify all 11 boards and representative achievements, test one zero-powerup Hard/Impossible run, test `Biggest Harvest`, verify replay UGC/cloud saves, test checkpoint exclusion, test an offline/reconnect clear, test `World's End` with a populated Impossible board, clear sandbox data for a clean final pass, then use `npm run wavedash:push`.
