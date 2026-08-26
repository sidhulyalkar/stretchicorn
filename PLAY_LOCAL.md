# Play Stretchicorn locally with one HTML file

For the fastest local test, download this single generated file:

**[`dist/stretchicorn-local.html`](dist/stretchicorn-local.html)**

Then double-click `stretchicorn-local.html` in Finder/Explorer. No local server, npm install, Wavedash, or `src/` directory is required.

## Why the repository root `index.html` is different

The root `index.html` is the readable/Wavedash development shell. It intentionally loads JavaScript and CSS from `src/`, so downloading **only** the root `index.html` is not a standalone game.

If you download the entire repository ZIP, the root shell can use those neighboring `src/` files. If you want one file, use `dist/stretchicorn-local.html` instead.

## Competition submission

Do not submit the local-playtest HTML to js13kGames. The actual size-qualified competition package remains:

**[`dist/stretchicorn-js13k.zip`](dist/stretchicorn-js13k.zip)**

The competition ZIP is produced and validated separately so the convenient local tester cannot change the 13KB submission bytes.

## Failure visibility

The standalone local build installs a tiny startup error renderer before the game source. If a future JavaScript regression prevents startup, the Canvas displays the startup error instead of silently remaining blank.

CI opens the committed local HTML directly with a `file://` URL in both Chromium and Firefox and verifies that the title renders, difficulty input starts gameplay, and no network request is attempted.
