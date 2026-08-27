# Play Stretchicorn v0.28 locally with one HTML file

For the fastest Boss Trilogy playtest, download this single generated file:

**[`dist/stretchicorn-local.html`](dist/stretchicorn-local.html)**

Then double-click `stretchicorn-local.html` in Finder or Explorer. No local server, npm install, Wavedash, or `src/` directory is required.

The file starts with **The Living Scar** origin and then enters **First Flight**, a safe practice field using the real production movement physics. New players move the vulnerable heart, aim the safe horn, create rainbow tension, and complete three charged Rainbow Snaps before Easy begins automatically. Story and practice each retain a skip path for returning players. Press **T** from the title to replay onboarding.

## What changed in v0.28

The three campaign bosses now test different kinds of mastery:

- **Trial 5 · Hideaway Husk**: use arena cover during `COVER!`, survive the seven-kernel blast, then attack when its husks open.
- **Trial 9 · The Kernel Colonel**: the boss retreats and deploys squads. Chain three troop kills to drop the command guard and create an `EXPOSED!` damage window.
- **Trial 13 · The Cobnocopia**: alternate between protected/open phases while intercepting healing kernels before they reach the boss. Below 20% HP, `FINAL FEAST!` turns the ending into a six-healer priority race.

For the most useful human test, pay attention to whether each mechanic is understandable from the action itself, not merely whether the fight can be beaten.

## Current qualified artifact

The competition package corresponding to this playtest is:

**[`dist/stretchicorn-js13k.zip`](dist/stretchicorn-js13k.zip)**

Qualified v0.28 result:

```text
13,305 / 13,312 bytes
7 bytes free
SHA-256 c1072fde0e3e1fcb8e503d14aa71f88b22d4ce2ff8d3cce64601cdd7c79b7e3d
```

The stable ZIP and `dist/stretchicorn-desktop-v0.28.0.zip` are byte-identical.

Do not submit `stretchicorn-local.html` to js13kGames. The readable one-file tester intentionally contains uncompressed source and a startup error renderer; only the ZIP is size-qualified.

## Why the repository root `index.html` is different

The root `index.html` is the readable/Wavedash development shell. It intentionally loads JavaScript and CSS from `src/`, so downloading only the root file is not a standalone game.

If you download the entire repository ZIP, the root shell can use those neighboring files. If you want one file, use `dist/stretchicorn-local.html`.

## Browser qualification

Final v0.28 qualification run `33045527163` verified:

- the exact extracted competition ZIP in Chromium,
- the exact extracted competition ZIP in Firefox,
- the standalone local HTML directly through `file://` in Chromium,
- the standalone local HTML directly through `file://` in Firefox,
- no attempted external network requests,
- Wavedash isolation,
- deterministic reproduction of the frozen competition artifacts.

The automated suite also exercises Hideaway's guard/open cycle, the Colonel's three-kill exposure grammar, Cobnocopia healing and Final Feast, all 13 safe spawns, and the bounded Impossible Encore.

## Failure visibility

The standalone local build installs a small startup error renderer before the game source. If a future JavaScript regression prevents startup, the Canvas displays the startup error rather than silently remaining blank.
