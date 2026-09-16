# Wavedash SDK release branch

This branch is intentionally separate from `main` and exists only for the post-js13k Wavedash integration window.

George confirmed the rule directly: post-deadline work is allowed **as long as it is only SDK calls and not updates to gameplay itself**. This branch therefore treats the submitted game as frozen. Combat, movement, balance, rendering, level flow, RNG, collisions, scoring, controls, and win conditions are not changed.

## Architecture

The repository-root `index.html`, `src/style.css`, and all gameplay/rendering source files remain byte-identical to the Wavedash release base.

`npm run wavedash:build` creates `wavedash-dist/` by copying those frozen files and replacing only the original one-line Wavedash init hook in the copied `index.html` with:

```html
<script src="src/wavedash-platform.js"></script>
```

`src/wavedash-platform.js` then owns SDK initialization and passive platform telemetry. It may observe existing game state, but it must not write gameplay state or draw additional game UI.

## SDK integrations

The platform layer currently uses:

- player identity, friends, and presence
- eight leaderboards: Style + Clear Time for each difficulty
- thirty-nine achievements and persistent stats
- cloud saves for existing settings and personal bests
- `GAME_MANAGED` replay-trace UGC attached to new Style PB entries
- backend reconnect events
- stats persistence events
- host mute/fullscreen state
- a local Wavedash-filesystem retry queue for ranked runs interrupted by connectivity loss

Only full campaigns that start from Trial 1 are leaderboard eligible. Existing checkpoint retries remain fully playable, but they never submit Style, Clear Time, replay UGC, or full-campaign clear achievements.

## Achievement design

The 39-achievement set is deliberately spaced across onboarding, mastery, alternative play styles, replay value, lifetime persistence, and global competition rather than simply rewarding every boss or raw counter.

The SDK-only observer tracks existing outcomes such as:

- first Snap, Double Rainbow, Lucky 13, graze, parry, and x4 combo
- Trial 5 / Trial 9 / per-difficulty campaign clears
- five eligible defeats during one existing horn slash (`Corn Combine`)
- thirteen grazes in one Trial before heart loss
- thirteen parries in one run
- thirteen cumulative seconds at x4 combo
- five Wall Smashes in one run
- Double Rainbow within three seconds of collecting Prism Cob
- collecting all five existing powerup types in one run
- zero-powerup clears on each difficulty plus the all-four `Pure Spectrum` meta challenge
- a Hard clear without ever losing a heart
- reaching the existing Impossible Encore
- clear-time and Style PB improvements
- global Top 13 Impossible Style once at least thirteen players are ranked

Long-tail stat-triggered achievements are intentionally much farther apart than the initial draft:

- `Popcorn Apprentice`: 1,300 eligible defeats
- `Corn Reaper`: 13,000 eligible defeats
- `Maize Master`: 130,000 eligible defeats
- `Serial Snapper`: 1,300 Rainbow Snaps
- `Graze Craze`: 1,300 grazes
- `Return Center`: 1,300 parries
- `Seeing Double`: 130 Double Rainbows
- `Cob Composter`: 13 full campaigns

The platform observer never changes the mechanics that produce those events. It only records the frozen game's results through Wavedash SDK stat/achievement calls.

## Build and verification

```bash
npm run wavedash:build
npm run wavedash:test
npm run wavedash:dev
npm run wavedash:push
```

`npm run wavedash:test` deliberately does **not** rebuild or repack the js13k submission. It verifies that:

- the generated Wavedash shell differs from the frozen root shell only at the SDK init hook,
- all copied gameplay/rendering files are byte-identical,
- the platform file contains no ghost renderer, title/victory renderer override, canvas overlay, or Wavedash-specific gameplay presentation,
- SDK calls for identity/presence, leaderboards, stats/achievements, cloud storage, replay UGC, and lifecycle handling are present,
- exactly 39 achievement definitions exist with the intended lifetime thresholds,
- an executable SDK mock proves checkpoint fairness, slash/graze/parry/powerup observation, PB achievements, Impossible Encore/Top-13 handling, replay attachment, cloud/stat behavior, and reconnect-safe leaderboard submission.

The GitHub workflow also rejects any pull-request diff outside the explicit SDK/tooling/documentation allowlist. That CI rule is the mechanical guardrail around George's eligibility boundary.

## Developer Portal setup

Import `wavedash/achievements.json` under the Stretchicorn game's Achievements section. It defines the 39 achievements plus the stat identifiers consumed by the SDK layer.

Wavedash's bulk-import format carries achievement IDs/titles/descriptions/stat triggers, while secret visibility is configured in the Developer Portal or CLI. After import, mark these four achievements **Secret** so they remain hidden until earned:

- `NO_POWER_IMPOSSIBLE` — Barely Possible
- `UNTOUCHED` — Untouched
- `ENCORE_REACHED` — NOT YET.
- `PURE_SPECTRUM` — Pure Spectrum

The eight leaderboards are created with `getOrCreateLeaderboard()`. Run one sandbox/playtest while signed in as a member of the Stretchicorn Wavedash team, then verify all eight are Visible in the Leaderboards tab.

Leaderboard metadata now records the completed run's difficulty, Style/time counterpart, hearts, eligible kills, max combo, Encore state, powerup count, grazes, parries, Double Rainbows, best single-slash harvest, and `fullRun: 1`. This stays within Wavedash's flat metadata budget and gives leaderboard runs useful context without adding game UI.

## Configuration

Copy `wavedash.example.toml` to `wavedash.toml` and insert the real game ID:

```toml
game_id = "YOUR_REAL_GAME_ID"
upload_dir = "./wavedash-dist"
entrypoint = "index.html"
```

`wavedash.toml` and `wavedash-dist/` remain ignored so credentials/build output do not enter source control.

## Live sandbox checklist

Before publishing the judged build:

1. Run `npm run wavedash:test`.
2. Import `wavedash/achievements.json`, then mark the four documented achievements Secret.
3. Run `npm run wavedash:dev`.
4. Confirm all eight leaderboards exist with the expected sort/display rules.
5. Trigger Snap, graze, parry, powerup, slash-harvest, and x4-combo achievements and verify stats persist after reload.
6. Verify a zero-powerup full clear earns only the matching purist achievement, while a run that touches any powerup does not.
7. Change the existing Music/SFX/Mouse settings, reload, and verify cloud restoration.
8. Complete a Trial-1 campaign and verify Style + Clear Time submissions plus attached replay-trace UGC and enriched metadata.
9. Establish a PB, then improve it by at least thirteen seconds and verify the PB achievements.
10. Complete an Easy checkpoint retry and verify no ranked submission or full-campaign achievement is produced.
11. Disconnect/reconnect during a full-run clear and verify the locally queued result submits exactly once after reconnection.
12. With at least thirteen Impossible Style entries present in sandbox/playtest data, verify a Top-13 standing unlocks `World's End`.
