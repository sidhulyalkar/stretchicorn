# Play Stretchicorn locally with one HTML file

For the fastest v0.23 test, download this single generated file:

**[`dist/stretchicorn-local.html`](dist/stretchicorn-local.html)**

Then double-click `stretchicorn-local.html` in Finder/Explorer. No local server, npm install, Wavedash, or `src/` directory is required.

The file begins with the mandatory **Living Scar** origin/tutorial. Watch it through to see the complete intended first-run experience, or use the visible Skip control / Space / Enter / Escape to reach the difficulty menu immediately. Press **T** on the title screen to replay it.

## Why the repository root `index.html` is different

The root `index.html` is the readable/Wavedash development shell. It intentionally loads JavaScript and CSS from `src/`, so downloading **only** the root `index.html` is not a standalone game.

If you download the entire repository ZIP, the root shell can use those neighboring `src/` files. If you want one file, use `dist/stretchicorn-local.html` instead.

## Competition submission

Do not submit the local-playtest HTML to js13kGames. The actual size-qualified competition package is:

**[`dist/stretchicorn-js13k.zip`](dist/stretchicorn-js13k.zip)**

The v0.23 competition ZIP is **12,985 / 13,312 bytes** and is produced separately so the convenient readable tester cannot alter the competition payload.

## Failure visibility

The standalone local build installs a tiny startup error renderer before the game source. If a future JavaScript regression prevents startup, the Canvas displays the startup error instead of silently remaining blank.

Qualification opens the committed local HTML directly with a `file://` URL in both Chromium and Firefox and verifies the sequence **origin/tutorial → skip → title → gameplay**, with no network requests.
