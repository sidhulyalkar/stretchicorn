# Stretchicorn Rainbow League — Wavedash integration

The Wavedash build intentionally uses a readable, platform-specific layer outside the 13KB competition artifact. The js13k ZIP remains unchanged and contains no Wavedash code. Wavedash-only full-bleed presentation also lives in `src/wavedash.css`, so platform polish cannot silently alter the submitted competition artifact.

## What the Wavedash edition adds

1. **Player identity + social presence**
   - Shows the signed-in Wavedash username and online-friend count on the title screen.
   - Publishes live presence for title, Trial progress, pause, game over and campaign clear.
   - Tracks backend connectivity and host mute/fullscreen state.
   - `F2` opens the native Wavedash overlay without adding a competing in-game social shell.

2. **Eight competitive leaderboards**
   - `Style - Easy`
   - `Clear Time - Easy`
   - `Style - Normal`
   - `Clear Time - Normal`
   - `Style - Hard`
   - `Clear Time - Hard`
   - `Style - Impossible`
   - `Clear Time - Impossible`

   Style sorts descending. Clear time sorts ascending and uses milliseconds. Both keep each player's personal best. Entries include compact run metadata: difficulty, time, hearts, kills, max combo, Style and Encore state.

   **Fairness boundary:** only runs started from Trial 1 are rank-eligible. Easy mode's legitimate current-Trial retry remains available, but a checkpoint clear is explicitly marked `UNRANKED` and cannot submit Style, clear time, personal-best leaderboard stats or ghost UGC. This prevents a partial-campaign retry from competing against full runs.

3. **Thirteen achievements + persistent stats**
   - Import `wavedash/achievements.json` once in the Developer Portal.
   - Achievements are tied to actual Stretchicorn mechanics: Rainbow Snap, Double Rainbow, Lucky 13, parry mastery, boss clears, maximum combo, difficulty clears and a 13-heart perfect clear.
   - Persistent stats track kills, Snaps, Double Rainbows, Lucky 13s, parries, runs, max combo, per-difficulty best Style and per-difficulty best clear time.

4. **Cloud saves**
   - Syncs the three local control/audio settings and all four per-difficulty Best Style values through `stretchicorn/profile-v1.json`.
   - Remote and local personal bests merge by maximum score, so a cloud sync cannot erase a stronger local Best Style.
   - Saves queue safely if the player changes a setting before initial cloud hydration finishes.

5. **Rainbow Ghost UGC**
   - Every rank-eligible run records a compact 10 Hz body/head trace without affecting simulation state.
   - A new personal-best Style run is uploaded as `GAME_MANAGED` UGC and attached directly to that leaderboard entry.
   - On the next full run, the client examines the leading Style entries and downloads the **highest-ranked available entry with attached ghost UGC**. This gracefully handles legacy/high-ranked scores created before ghost integration.
   - The selected rival appears as a translucent rainbow trajectory labeled with rank and player name.
   - Superseded personal-best ghost UGC is deleted after a better attached entry is accepted, preventing orphaned replay accumulation.
   - Ghost data is visualization-only: it never participates in collision, scoring, RNG or game state.

## One-time Developer Portal setup

### Achievements and stats

Developer Portal → Stretchicorn → Achievements → **Add achievement → Import JSON** → paste/import:

`wavedash/achievements.json`

The same manifest includes the in-game stat definitions used by the platform layer.

### Leaderboards

The game uses `getOrCreateLeaderboard()` for all eight boards. Launch one Wavedash playtest while signed in as a member of the Stretchicorn game team so the boards are created as **Visible** platform leaderboards. Verify the Leaderboards tab contains all eight entries and that their sort/display rules are correct.

## Build and verification

```bash
npm run wavedash:test
npm run wavedash:dev
```

`npm run wavedash:test` first regenerates the normal js13k artifact, then builds a separate readable `wavedash-dist/` folder and checks that:

- the 13KB competition artifact has no Wavedash code or Wavedash-only presentation,
- the submitted competition CSS stays canonical while `src/wavedash.css` supplies the full-bleed platform skin,
- the platform layer owns SDK initialization,
- identity/friends/presence, leaderboards, stats, achievements, cloud saves, UGC, overlay access and host events are wired,
- checkpoint retries cannot contaminate full-run leaderboards or ghost UGC,
- exactly thirteen achievement definitions are present.

When the sandbox playtest is clean:

```bash
npm run wavedash:push
```

## Manual playtest checklist

Run at least one short test per lane before publishing a judged build:

- Title shows `WAVEDASH • <username>` and no gray gutter.
- `F2` opens/closes the Wavedash overlay and the title reports online friends when present.
- Wavedash host mute toggles do not break the in-game Music/SFX settings.
- Start a Trial-1 run and confirm presence reports the current Trial/difficulty.
- Trigger Rainbow Snap, Double Rainbow, Lucky 13 and a parry; verify stats/achievements in Playtest data.
- Change Mouse/Music/SFX settings, reload on Wavedash and verify cloud restoration.
- Clear a full campaign and verify both Style and Clear Time entries.
- Improve a Style PB and confirm the leaderboard entry has attached UGC.
- Start the same difficulty again and verify the highest-ranked available Rainbow Ghost is visible but cannot affect gameplay.
- On Easy, deliberately die after Trial 1, retry the current Trial, finish that checkpoint run and confirm the result says `UNRANKED` with no new leaderboard or ghost entry.
- Verify Impossible only submits after the Encore is actually finished.
- Confirm the game continues locally if the Wavedash backend disconnects mid-run.

## Claim boundary

The ghost is a replay visualization of a previously recorded player trajectory, not deterministic game-state playback. Enemy RNG is not replayed or synchronized. It is deliberately described as a **Rainbow Ghost / trajectory rival**, never as a frame-perfect simulation replay.
