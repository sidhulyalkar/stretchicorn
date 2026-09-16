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
- thirteen achievements and persistent stats
- cloud saves for existing settings and personal bests
- `GAME_MANAGED` replay-trace UGC attached to new Style PB entries
- backend reconnect events
- stats persistence events
- host mute/fullscreen state
- a local Wavedash-filesystem retry queue for ranked runs interrupted by connectivity loss

Only full campaigns that start from Trial 1 are leaderboard eligible. Existing checkpoint retries remain fully playable, but they never submit Style, Clear Time, replay UGC, or full-campaign clear achievements.

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
- an executable SDK mock proves checkpoint fairness, PB replay attachment, cloud/stat behavior, and reconnect-safe leaderboard submission.

The GitHub workflow also rejects any pull-request diff outside the explicit SDK/tooling/documentation allowlist. That CI rule is the mechanical guardrail around George's eligibility boundary.

## Developer Portal setup

Import `wavedash/achievements.json` under the Stretchicorn game's Achievements section. It defines the thirteen achievements plus the stat identifiers consumed by the SDK layer.

The eight leaderboards are created with `getOrCreateLeaderboard()`. Run one sandbox/playtest while signed in as a member of the Stretchicorn Wavedash team, then verify all eight are Visible in the Leaderboards tab.

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
2. Run `npm run wavedash:dev`.
3. Confirm all eight leaderboards exist with the expected sort/display rules.
4. Trigger several achievements and verify stats persist after reload.
5. Change the existing Music/SFX/Mouse settings, reload, and verify cloud restoration.
6. Complete a Trial-1 campaign and verify Style + Clear Time submissions plus attached replay-trace UGC.
7. Complete an Easy checkpoint retry and verify no ranked submission or full-campaign achievement is produced.
8. Disconnect/reconnect during a full-run clear and verify the locally queued result submits exactly once after reconnection.
