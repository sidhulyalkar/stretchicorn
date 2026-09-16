# Wavedash release branch

Wavedash is now a first-class Stretchicorn platform target rather than a loader-only wrapper. Shared gameplay and the js13k competition artifact remain inherited from `main`, while all platform features live in `src/wavedash-platform.js` and are excluded from the 13KB ZIP.

See [`wavedash/RAINBOW_LEAGUE.md`](wavedash/RAINBOW_LEAGUE.md) for the complete feature map, Developer Portal setup, and playtest checklist.

## Direct dashboard upload

The repository-root `index.html` loads the readable Stretchicorn source, then loads `src/wavedash-platform.js` after the final game renderer. That platform layer owns the Wavedash lifecycle:

```js
Wavedash.updateLoadProgressZeroToOne(1)
Wavedash.init({ debug: false, deferEvents: true })
```

It then enables identity/presence, leaderboards, achievements/stats, cloud saves, leaderboard-attached ghost UGC, and host event synchronization.

If `window.Wavedash` is absent, the platform layer returns immediately and the readable game still runs as a normal local browser build.

## Isolated Wavedash build

`npm run wavedash:build` creates `wavedash-dist/` from the readable platform-aware source files. This is intentional: Wavedash does not impose the 13KB js13k payload ceiling, so the platform edition can use clear, auditable integration code and replay data without spending competition bytes.

The normal `dist/index.html` js13k artifact is still generated and tested separately and must remain Wavedash-free.

```bash
npm run wavedash:build
npm run wavedash:test
npm run wavedash:dev
npm run wavedash:push
```

## One-time achievement/stat setup

Import `wavedash/achievements.json` in the Stretchicorn Developer Portal before the judged build. It defines thirteen themed achievements plus the stats consumed by the platform layer.

The eight Style / Clear Time boards are created with `getOrCreateLeaderboard()`. Run one playtest while signed in as a member of the Stretchicorn Wavedash team so they are created as visible team-owned leaderboards, then verify visibility in the Leaderboards tab.

## Configuration

Copy `wavedash.example.toml` to `wavedash.toml`, keep the real generated game ID locally, and use:

```toml
game_id = "YOUR_REAL_GAME_ID"
upload_dir = "./wavedash-dist"
entrypoint = "index.html"
```

`wavedash.toml` and `wavedash-dist/` are ignored so local publishing state and generated platform artifacts do not leak into source control.

## Release invariant

Before publishing a Wavedash build, both should pass:

```bash
npm run verify
npm run wavedash:test
```

`npm run verify` protects the exact js13k release and 13,312-byte ceiling. `npm run wavedash:test` builds and audits the richer Wavedash edition. The two targets intentionally share gameplay while keeping platform integration outside the competition payload.
