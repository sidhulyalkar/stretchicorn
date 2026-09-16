# Wavedash SDK release branch

This branch is intentionally separate from `main` and exists only for the post-js13k Wavedash integration window.

George confirmed the rule directly: post-deadline work is allowed **as long as it is only SDK calls and not updates to gameplay itself**. This branch therefore treats the submitted game as frozen. Combat, movement, balance, rendering, level flow, RNG, collisions, scoring, controls, and win conditions are not changed.

## Architecture

The repository-root `index.html`, `src/style.css`, and all gameplay/rendering source files remain byte-identical to the Wavedash release base.

`npm run wavedash:build` creates `wavedash-dist/` by copying those frozen files and replacing only the original one-line Wavedash init hook in the copied `index.html` with:

```html
<script src="src/wavedash-platform.js"></script><script src="wavedash/challenge-platform.js"></script>
```

`src/wavedash-platform.js` owns SDK initialization and the core platform telemetry. `wavedash/challenge-platform.js` is a second SDK-only observer for the three long-tail challenge boards and `World's End` reconciliation. Neither layer draws UI or writes gameplay state.

## SDK integrations

The Wavedash build currently uses:

- player identity, friends, and presence
- **eleven leaderboards**: eight per-difficulty Style/Clear Time boards plus three challenge boards
- thirty-nine achievements and persistent stats
- cloud saves for existing settings and personal bests
- `GAME_MANAGED` replay-trace UGC attached to new Style PB entries
- backend reconnect events
- stats persistence events
- host mute/fullscreen state
- local Wavedash-filesystem retry queues for core ranked runs and challenge-board submissions

Only full campaigns that start from Trial 1 are leaderboard eligible. Existing checkpoint retries remain fully playable, but they never submit ranked results, replay UGC, challenge-board results, or full-campaign clear achievements.

## Leaderboards

Core boards:

- `Style - Easy`
- `Clear Time - Easy`
- `Style - Normal`
- `Clear Time - Normal`
- `Style - Hard`
- `Clear Time - Hard`
- `Style - Impossible`
- `Clear Time - Impossible`

Challenge boards:

- `Biggest Harvest` — best eligible defeats during one existing horn slash
- `Silky Style - Hard` — Style from a full Hard run with zero powerups
- `Silky Style - Impossible` — Style from a full Impossible run with zero powerups

Style and challenge boards sort descending. Clear Time sorts ascending in milliseconds. All submissions use `keepBest: true`.

Challenge-board entries also carry the exact frozen gameplay commit (`eee2ac40c71070ddb1502e16362e3b9490d5ce61`) and trace schema version in their flat Wavedash metadata so the competitive record is auditable without modifying the game.

## Achievement design

The 39-achievement set is deliberately spaced across onboarding, mastery, alternative play styles, replay value, lifetime persistence, and global competition rather than simply rewarding every boss or raw counter.

The SDK-only observer tracks existing outcomes such as:

- first Snap, Double Rainbow, Lucky 13, graze, parry, and x4 combo
- Trial 5 / Trial 9 / per-difficulty campaign clears
- five eligible defeats during one existing horn slash (`Corn Combine`)
- thirteen grazes in one Trial before heart loss (`Great Grazer`)
- thirteen parries in one run (`Parry Party`)
- thirteen cumulative seconds at x4 combo
- five Wall Smashes in one run
- Double Rainbow within three seconds of collecting Prism Cob
- collecting all five existing powerup types in one run
- zero-powerup clears on each difficulty plus the all-four `Pure Spectrum` meta challenge
- a Hard clear without ever losing a heart (`Pristine Prance`)
- reaching the existing Impossible Encore (`Cob Comeback`)
- clear-time and Style PB improvements
- global Top 13 Impossible Style once at least thirteen players are ranked

Final themed names for the renamed achievements are:

- `COLONEL_CLEAR` — `Colonel Chop`
- `IMPOSSIBLE_CLEAR` — `Rainbow Royalty`
- `FULL_HEARTS` — `Heart Hold'em`
- `THREAD_NEEDLE` — `Great Grazer`
- `RETURN_DEPARTMENT` — `Parry Party`
- `NO_POWER_HARD` — `Raw Rainbow`
- `NO_POWER_IMPOSSIBLE` — `Powerless Pony`
- `UNTOUCHED` — `Pristine Prance`
- `ENCORE_REACHED` — `Cob Comeback`

The underlying stable achievement identifiers are intentionally unchanged. Only player-facing titles changed, which avoids invalidating SDK wiring, saved achievement state, or portal references.

Long-tail stat-triggered achievements:

- `Popcorn Apprentice`: 1,300 eligible defeats
- `Corn Reaper`: 13,000 eligible defeats
- `Maize Master`: 130,000 eligible defeats
- `Serial Snapper`: 1,300 Rainbow Snaps
- `Graze Craze`: 1,300 grazes
- `Return Center`: 1,300 parries
- `Seeing Double`: 130 Double Rainbows
- `Cob Composter`: 13 full campaigns

`World's End` is reconciled on backend connection as well as after Impossible activity. A player who already holds a Top-13 Impossible Style standing therefore receives it once the board population reaches thirteen, without needing to set another score.

## Build and verification

```bash
npm run wavedash:build
npm run wavedash:test
npm run wavedash:audit
npm run wavedash:dev
npm run wavedash:push
```

`npm run wavedash:test` deliberately does **not** rebuild or repack the js13k submission. It verifies that:

- the generated Wavedash shell differs from the frozen root shell only at the SDK init hook,
- all copied gameplay/rendering files are byte-identical,
- neither SDK layer contains a renderer, canvas overlay, title/victory override, or Wavedash-specific gameplay presentation,
- exactly eleven leaderboard definitions and 39 achievement definitions are present,
- the final themed display names and `Silky Style` challenge-board names cannot silently drift,
- both ranked queues survive disconnect/reconnect,
- challenge-board submissions preserve checkpoint fairness,
- challenge metadata includes frozen-build provenance,
- an executable SDK mock proves slash/graze/parry/powerup observation, zero-powerup challenge boards, PB achievements, Impossible Encore/Top-13 handling, replay attachment, cloud/stat behavior, and reconnect-safe submission.

The GitHub workflow rejects any pull-request diff outside the explicit SDK/tooling/documentation allowlist and separately proves the frozen game/runtime files are byte-identical to the submission base.

## Developer Portal setup

Import `wavedash/achievements.json` under the Stretchicorn game's Achievements section. It defines the 39 achievements plus the stat identifiers consumed by the SDK layer.

**Important:** Wavedash bulk import skips identifiers that already exist. Because this release evolved from the original 13-achievement setup, a second import alone is not enough to prove the portal matches the repository.

After import, mark these four achievements **Secret**:

- `NO_POWER_IMPOSSIBLE` — Powerless Pony
- `UNTOUCHED` — Pristine Prance
- `ENCORE_REACHED` — Cob Comeback
- `PURE_SPECTRUM` — Pure Spectrum

Then run:

```bash
npm run wavedash:audit
```

The audit calls `wavedash achievement list --json` and fails if the portal does not contain **exactly** the intended 39 identifiers, if an obsolete achievement remains, if a title/description differs, or if the four secret flags do not match. `npm run wavedash:push` runs this audit automatically before uploading a build.

Launch one sandbox/playtest while signed in as a member of the Stretchicorn Wavedash team so all eleven `getOrCreateLeaderboard()` calls establish team-owned boards. Verify all eleven are Visible in the Leaderboards tab.

## Configuration

Copy `wavedash.example.toml` to `wavedash.toml` and insert the real game ID:

```toml
game_id = "YOUR_REAL_GAME_ID"
upload_dir = "./wavedash-dist"
entrypoint = "index.html"
```

`wavedash.toml` and `wavedash-dist/` remain ignored so credentials/build output do not enter source control.

The judged upload must use `wavedash-dist/`. Serving the repository root intentionally loads only the frozen submission's minimal Wavedash handshake and will not include the expanded SDK integration.

## Final sandbox checklist

Before publishing the judged build:

1. Import/reconcile `wavedash/achievements.json`, apply the final themed titles, mark the four documented achievements Secret, and make `npm run wavedash:audit` pass.
2. Run `npm run wavedash:test`.
3. Run `npm run wavedash:dev`.
4. Confirm all eleven leaderboards are Visible with the expected sort/display rules, including `Silky Style - Hard` and `Silky Style - Impossible`.
5. Trigger Snap, graze, parry, powerup, slash-harvest, and x4-combo achievements and verify persistence after reload.
6. Verify a zero-powerup full clear earns the matching challenge achievement and, on Hard/Impossible, submits the corresponding Silky Style board.
7. Verify `Biggest Harvest` records the best single-slash kill count and keeps the player's best score.
8. Change the existing Music/SFX/Mouse settings, reload, and verify cloud restoration.
9. Complete a Trial-1 campaign and verify Style + Clear Time submissions plus attached replay-trace UGC and enriched metadata.
10. Establish a PB, then improve it by at least thirteen seconds and verify the PB achievements.
11. Complete a checkpoint retry and verify no core or challenge ranked result is produced.
12. Disconnect/reconnect during a full-run clear and verify both local ranked queues drain safely.
13. With at least thirteen Impossible Style entries, verify an existing Top-13 player receives `World's End` on reconnect even without posting another score.
14. Run a clean-slate pass with `wavedash clear-playtest-data` (and clear browser site data/private-window local storage if testing cloud-save emptiness).
15. Run `npm run wavedash:push`; the command refuses to upload if the local SDK suite or portal achievement audit fails.
