# Play Stretchicorn locally with one HTML file

For the fastest playtest, download:

**[`dist/stretchicorn-local.html`](dist/stretchicorn-local.html)**

Then double-click it in Finder or Explorer. No local server, npm install, Wavedash runtime or neighboring `src/` files are required.

The final standalone file is the **exact packed competition HTML** also placed at the root of the submission ZIP. The release pipeline first builds the readable source form for VM regressions, then packing replaces both `dist/index.html` and `dist/stretchicorn-local.html` with the same qualified payload. A direct `file://` playtest therefore exercises the bytes we actually submit instead of a parallel browser build.

## Current playtest flow

The title screen lets you:

- click **Easy / Normal / Hard / Impossible** or press `1`-`4`,
- press Space / Enter to begin Easy,
- press `G` or click **Field Guide** for the complete combat vocabulary,
- press `C` or click **Controls** to change pointer gameplay behavior.

Easy begins with **FIRST FLIGHT** inside Trial 1. Five practice targets appear one at a time and must be defeated with genuine charged Rainbow Snaps before the campaign advances to Trial 2.

There is no separate intro/tutorial physics mode. First Flight uses the production body movement, horn aim, charge and Snap rules.

## Controls

- **WASD**: move the vulnerable heart/body
- **Mouse or Arrow Keys**: aim the safe horn
- **Left Click or Space**: Rainbow Snap
- **P**: pause / resume
- **G**: Field Guide / return from Field Guide
- **C**: Controls
- **M**: back / menu

Pause, Field Guide, Controls, Game Over and result actions are also presented as separate clickable boxes. **BACK** returns Field Guide or Controls to the screen that opened it; clicks outside an action box are inert.

### Laptop-safe mode

The Controls screen centers **MOUSE ON/OFF** above the control legend and centers **BACK** at the bottom.

Turning mouse gameplay OFF prevents touchpad movement from stealing horn aim and prevents accidental gameplay clicks from triggering Snap. Arrow Keys and Space remain active. Menu clicks remain active so pointer gameplay can always be switched back on.

The setting persists through localStorage when available and fails safely when storage is unavailable.

## What to playtest

The most useful final checks are not only "can I beat it?" Pay attention to:

- whether First Flight teaches pull → aim → Snap without explanation fatigue,
- whether gold kernels read as parry/graze opportunities and cyan spikes read as dodge-only threats,
- whether Double Rainbow feels discoverable and worth chaining,
- whether temporary hay gives enough warning before becoming solid,
- whether Hideaway, Colonel and Cap'n Cobtopus each communicate a distinct counterplay rule,
- whether Trial 13 changes its live objective from **DEFEAT THE COBTOPUS** to **DEFEAT THE COBTOPI** immediately after the split,
- whether **CORN ARMY DEFEATED!** reads as a stronger final result than the restored sky alone,
- whether Impossible remains difficult for a player who is already good at chaining,
- whether Impossible sustain now extends strong runs without flattening its hostile pressure,
- whether the **3× Impossible run-end Style premium** makes deep Impossible attempts feel properly rewarded without changing Hard scores,
- whether Colonel summons create tactical pressure without rewarding score farming,
- whether Hard/Impossible stop rewarding last-enemy pickup farming,
- whether Style / Best / Time / Hearts make the result screen motivating rather than confusing,
- whether every boxed menu action feels obvious and returns to the expected screen,
- whether the mouse toggle solves accidental laptop touchpad input without making the menus awkward.

## Current qualified artifact

Competition package:

**[`dist/stretchicorn-js13k.zip`](dist/stretchicorn-js13k.zip)**

Versioned twin:

**[`dist/stretchicorn-desktop-v0.39.0.zip`](dist/stretchicorn-desktop-v0.39.0.zip)**

```text
13,309 / 13,312 bytes
3 bytes free
SHA-256 371f627c1750e09edababa22d68909069b82697bfbd22d3756dd250392fc6f16
```

The stable and versioned ZIPs are byte-identical and each contains exactly one root-level `index.html`.

Do **not** submit `stretchicorn-local.html` to js13kGames. Submit `dist/stretchicorn-js13k.zip`.

## Browser qualification

The release workflow checks the same packed payload in Chromium, Firefox and WebKit through two launch paths:

- extracted from the exact competition ZIP and served locally,
- opened directly as `dist/stretchicorn-local.html` through `file://`,
- no external network attempts,
- no page/console errors,
- title → Controls pointer OFF/ON round trip,
- title → gameplay,
- pause rendering.

The VM regression suite separately exercises combat authority, retries, safe spawns, boss gates, Encore completion, First Flight, Field Guide, boxed menu actions, pointer migration and deterministic soak coverage.

See [`README.md`](README.md) for the full game overview and [`RELEASING.md`](RELEASING.md) for the deterministic submission pipeline.
