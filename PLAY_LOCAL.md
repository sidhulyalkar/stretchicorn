# Play Stretchicorn locally with one HTML file

For the fastest playtest, download:

**[`dist/stretchicorn-local.html`](dist/stretchicorn-local.html)**

Then double-click it in Finder or Explorer. No local server, npm install, Wavedash runtime or neighboring `src/` files are required.

The standalone file is built from the same current source as the competition package, but it intentionally keeps a readable startup/error wrapper. If startup fails, the Canvas reports the failure instead of silently showing a blank screen.

## Current playtest flow

The title screen lets you:

- click **Easy / Normal / Hard / Impossible** or press `1`-`4`,
- press Space / Enter to begin Easy,
- click **Field Guide** for the complete combat vocabulary,
- press `C` or click **Controls** to change pointer gameplay behavior.

Easy begins with **FIRST FLIGHT** inside Trial 1. Five practice targets appear one at a time and must be defeated with genuine charged Rainbow Snaps before the campaign advances to Trial 2.

There is no separate intro/tutorial physics mode. First Flight uses the production body movement, horn aim, charge and Snap rules.

## Controls

- **WASD**: move the vulnerable heart/body
- **Mouse or Arrow Keys**: aim the safe horn
- **Left Click or Space**: Rainbow Snap
- **P**: pause / resume
- **F while paused**: Field Guide
- **C**: Controls
- **M**: back / menu

### Laptop-safe mode

The Controls screen contains **MOUSE AIM + CLICK ON/OFF**.

Turning it OFF prevents touchpad movement from stealing horn aim and prevents accidental gameplay clicks from triggering Snap. Arrow Keys and Space remain active. Menu clicks remain active so pointer gameplay can always be switched back on.

The setting persists through localStorage when available and fails safely when storage is unavailable.

## What to playtest

The most useful final checks are not only "can I beat it?" Pay attention to:

- whether First Flight teaches pull → aim → Snap without explanation fatigue,
- whether gold kernels read as parry/graze opportunities and cyan spikes read as dodge-only threats,
- whether Double Rainbow feels discoverable and worth chaining,
- whether temporary hay gives enough warning before becoming solid,
- whether Hideaway, Colonel and Prime each communicate a distinct counterplay rule,
- whether Impossible remains difficult for a player who is already good at chaining,
- whether Style / Best / Time / Hearts make the result screen motivating rather than confusing,
- whether the mouse toggle solves accidental laptop touchpad input without making the menus awkward.

## Current qualified artifact

Competition package:

**[`dist/stretchicorn-js13k.zip`](dist/stretchicorn-js13k.zip)**

Versioned twin:

**[`dist/stretchicorn-desktop-v0.39.0.zip`](dist/stretchicorn-desktop-v0.39.0.zip)**

```text
13,284 / 13,312 bytes
28 bytes free
SHA-256 d78c8a03bfb7d2aef4a89815bf56c87823847ad7853d23f9c8baec5972e174f2
```

The stable and versioned ZIPs are byte-identical and each contains exactly one root-level `index.html`.

Do **not** submit `stretchicorn-local.html` to js13kGames. Submit `dist/stretchicorn-js13k.zip`.

## Browser qualification

The release workflow checks both forms of the game in Chromium and Firefox:

- exact extracted competition ZIP,
- standalone HTML opened directly through `file://`,
- no external network attempts,
- no page/console errors,
- title → Controls pointer OFF/ON round trip,
- title → gameplay,
- pause rendering.

The VM regression suite separately exercises combat authority, retries, safe spawns, boss gates, Encore completion, First Flight, Field Guide, pointer migration and deterministic soak coverage.

See [`README.md`](README.md) for the full game overview and [`RELEASING.md`](RELEASING.md) for the deterministic submission pipeline.
