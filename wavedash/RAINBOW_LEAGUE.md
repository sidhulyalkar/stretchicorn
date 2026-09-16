# Stretchicorn Rainbow League — Wavedash integration

The Wavedash build intentionally uses a readable, platform-specific layer outside the 13KB competition artifact. The js13k ZIP remains unchanged and contains no Wavedash code.

## What the Wavedash edition adds

1. **Player identity + presence**
   - Shows the signed-in Wavedash username on the title screen.
   - Publishes live presence for title, Trial progress, pause, game over and campaign clear.
   - Tracks backend connectivity and host mute/fullscreen state.

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

3. **Thirteen achievements + persistent stats**
   - Import `wavedash/achievements.json` once in the Developer Portal.
   - Achievements are tied to actual Stretchicorn mechanics: Rainbow Snap, Double Rainbow, Lucky 13, parry mastery, boss clears, maximum combo, difficulty clears and a 13-heart perfect clear.
   - Persistent stats track kills, Snaps, Double Rainbows, Lucky 13s, parries, runs, max combo, per-difficulty best Style and per-difficulty best clear time.

4. **Cloud saves**
   - Syncs the three local control/audio settings and all four per-difficulty Best Style values through `stretchicorn/profile-v1.json`.
   - Remote and local personal bests merge by maximum score, so a cloud sync cannot erase a stronger local Best Style.
   - Saves queue safely if the player changes a setting before initial cloud hydration finishes.

5. **Rainbow Ghost UGC**
   - Every run records a compact 10 Hz body/head trace without affecting simulation state.
   - A new personal-best Style run is uploaded as `GAME_MANAGED` UGC and attached directly to that leaderboard entry.
   - The current world-#1 Style ghost for the selected difficulty downloads automatically and appears as a translucent rainbow rival during the next run.
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

- the 13KB competition artifact has no Wavedash code,
- full-bleed Wavedash presentation remains intact,
- the platform layer owns SDK initialization,
- identity/presence, leaderboards, stats, achievements, cloud saves, UGC and host events are all wired,
- exactly thirteen achievement definitions are present.

When the sandbox playtest is clean:

```bash
npm run wavedash:push
```

## Manual playtest checklist

Run at least one short test per lane before publishing a judged build:

- Title shows `WAVEDASH • <username>` and no gray gutter.
- Wavedash host mute toggles do not break the in-game Music/SFX settings.
- Start a run and confirm presence reports the current Trial/difficulty.
- Trigger Rainbow Snap, Double Rainbow, Lucky 13 and a parry; verify stats/achievements in Playtest data.
- Change Mouse/Music/SFX settings, reload on Wavedash and verify cloud restoration.
- Clear a campaign and verify both Style and Clear Time entries.
- Improve a Style PB and confirm the leaderboard entry has attached UGC.
- Start the same difficulty again and verify the #1 Rainbow Ghost is visible but cannot affect gameplay.
- Verify Impossible only submits after the Encore is actually finished.
- Confirm the game continues locally if the Wavedash backend disconnects mid-run.

## Claim boundary

The ghost is a replay visualization of a previously recorded player trajectory, not deterministic game-state playback. Enemy RNG is not replayed or synchronized. It is deliberately described as a **Rainbow Ghost / trajectory rival**, never as a frame-perfect simulation replay.
