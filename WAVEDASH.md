# Wavedash release branch

This branch is the Wavedash publishing layer for the current `main` Stretchicorn release. Shared gameplay, balance, tests, documentation, and the js13k competition artifact are inherited directly from `main`; Wavedash integration stays isolated outside the 13KB submission bundle.

## Direct dashboard upload

The repository-root `index.html` loads the readable Stretchicorn source and, after all five game scripts have loaded, signals Wavedash readiness with:

```js
Wavedash.updateLoadProgressZeroToOne(1)
Wavedash.init({debug:false})
```

For a direct dashboard upload, upload the branch contents with the root `index.html` as the entrypoint.

## Isolated Wavedash build

The platform build uses the exact js13k `dist/index.html` generated from `main`, then writes a separate `wavedash-dist/index.html` with the Wavedash readiness hook appended. The competition artifact itself is never modified.

```bash
npm run wavedash:build
npm run wavedash:test
npm run wavedash:dev
npm run wavedash:push
```

`npm run wavedash:test` checks both supported Wavedash entrypoints and also verifies that the js13k competition artifact contains no Wavedash code.

## Configuration

Copy `wavedash.example.toml` to `wavedash.toml`, keep the real generated game ID locally, and use:

```toml
game_id = "YOUR_REAL_GAME_ID"
upload_dir = "./wavedash-dist"
entrypoint = "index.html"
```

`wavedash.toml` and `wavedash-dist/` are ignored so local publishing state and generated platform artifacts do not leak into source control.

## Release invariant

Before publishing a Wavedash build, both of these should pass:

```bash
npm run verify
npm run wavedash:test
```

The first command validates the exact js13k release artifact and 13,312-byte ceiling. The second validates the Wavedash-only publishing shell. This separation keeps platform integration from changing the competition submission.
