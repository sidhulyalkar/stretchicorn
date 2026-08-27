<div align="center">

<a href="docs/stretchicorn-hero.png"><img src="docs/stretchicorn-hero.png" alt="Stretchicorn key art" width="1000"></a>

# 🌽🦄 STRETCHICORN

### **STRETCH · SNAP · SHUCK.**

A 13KB desktop arcade-action game about a dead unicorn revived by the last surviving rainbow and sent through a drained meadow kingdom to return color to the world.

Built for **js13kGames 2026 · Unicorns & Rainbows**.

[**Download the current js13k competition ZIP**](dist/stretchicorn-js13k.zip)  
[**Download the one-file local playtest**](dist/stretchicorn-local.html)

**v0.28.0 · BOSS TRILOGY · Living Scar → First Flight → Easy → mastery**

</div>

---

## The premise

Stretchicorn begins **dead**.

A catastrophe tore the unicorn apart and drained the world almost completely of color. One surviving ribbon of rainbow light finds the two halves. It cannot rebuild the missing body, so it becomes the missing body itself: an elastic living scar that stitches Stretchicorn back into motion.

```text
PULL ←     ♥ BODY ═══════ 🌈 LIVING SCAR ═══════ 🦄 HEAD / HORN     → AIM
           vulnerable          life-force                 safe
```

The rainbow is resurrection, body, spring, movement system, weapon, shield, and the world's remaining source of full-spectrum color.

**Stretchicorn is not carrying the magic. Stretchicorn is being held alive by it.**

v0.27's Living Color renderer begins the world almost drained and returns saturation through campaign progress, combo, and restoration. The visual story and the mechanical story therefore share one rule: skilled movement brings color back.

---

## First Flight

Stretchicorn uses an unusual two-ended controller, so the game teaches the physical idea before asking the player to survive it.

Every first run follows:

**Living Scar origin → safe First Flight → three real Rainbow Snaps → Easy campaign.**

First Flight uses the real production movement and tension physics while removing enemies, damage, walls, and pickups.

1. **WASD** moves the vulnerable heart-body.
2. **Arrow keys** point the safe head and horn.
3. Pull the body away from the horn to store tension in the living scar.
4. **Space** releases that tension as a Rainbow Snap.
5. Complete three genuine charged Snaps to begin Easy automatically.

The intended mental model is deliberately compact:

> **BODY PULLS · HORN POINTS · RAINBOW SNAPS**

Returning players can skip the story/practice, select a difficulty directly with `1`–`4`, or press `T` from the title to replay onboarding.

---

# v0.28 Boss Trilogy

v0.28 replaces the three normal campaign bosses as **three different mastery problems**, not three larger versions of ordinary enemies.

The progression is intentional:

**read an attack window → route through an enemy formation → manage competing priorities under pressure**

Each encounter reuses verbs the player already learned rather than introducing a boss-only control scheme.

## Trial 5 · Hideaway Husk

Hideaway Husk is a frightened defensive boss wrapped in layered husks.

Its closed husks are a real gameplay guard. Rainbow Snaps and parried friendly kernels cannot damage it while the guard is active.

The fight cycles through:

```text
HIDE → COVER! → seven-kernel blast → husks OPEN → punish window → HIDE
```

The arena's existing blocks become meaningful shelter. The player is rewarded for reading the warning, placing the vulnerable heart behind cover, surviving the committed blast, then snapping into the opening.

**What it tests:** patience, positioning, cover use, and recognition of vulnerability windows.

## Trial 9 · The Kernel Colonel

The Colonel does not politely remain in attack range. It retreats when Stretchicorn closes distance, circles the arena, and deploys four-kernel squads between itself and the player.

Its command guard stays active until the player destroys **three soldiers inside the chain window**. A visible `0/3 → 3/3` counter makes that relationship readable. Completing the chain produces:

**EXPOSED!**

and temporarily drops the Colonel's guard.

Trying to ignore the troops and chase the commander is deliberately inefficient. The army is also the route to the boss.

**What it tests:** chaining, target routing, pursuit control, and converting enemy density into a deliberate offensive sequence.

## Trial 13 · The Cobnocopia

The final normal boss is a horn-of-plenty corruption that alternates protected and exposed phases while creating healing kernels around the arena.

The healers physically travel toward the boss. If one reaches it, Cobnocopia regains HP. Killing the healer interrupts that recovery, forcing a real target-priority choice between preparing the next damage window and denying healing.

Below 20% HP the fight changes:

**FINAL FEAST!**

Cobnocopia remains exposed, six healing kernels arrive immediately, and additional food continues spawning. The last phase becomes an aggressive race between damage, interception, movement, and survival rather than simply a faster version of the same pattern.

**What it tests:** target priority, timing, spatial awareness, and sustained execution while several valuable targets compete for attention.

---

## Difficulty ladder

The intended first-player path is:

**First Flight → Easy → Normal → Hard → Impossible**

Space / Enter defaults to Easy. Experienced players can press `1`, `2`, `3`, or `4` directly.

Impossible remains an expert anti-chain ruleset rather than a population-spam mode:

- population is capped around Hard density instead of endlessly adding chain fuel,
- hostile attack cadence increases,
- enemies gain additional HP,
- movement and hostile projectile speed rise,
- pickups become scarcer,
- cyan piercing attacks cannot be countered and must be dodged,
- Impossible Lucky 13 grants charge/readiness and score but not heart/shield sustain.

After Trial 13, Impossible still reaches the bounded **Encore**. Its old compact fallback boss grammar is intentionally preserved so the expert ending remains finite and distinct from the new campaign trilogy.

---

## Controls

| Input | Action |
|---|---|
| **W A S D** | Move the vulnerable heart-body |
| **Arrow Keys** | Aim / steer the safe head and horn |
| **Space** | Horn strike / charged Rainbow Snap |
| **1 / 2 / 3 / 4** | Easy / Normal / Hard / Impossible |
| **P** | Pause |
| **M** | Menu |
| **T** | Replay Living Scar + First Flight from title |
| **C** | Rebind controls |
| **S** | Music + SFX |

A charged Rainbow Snap is simultaneously attack, dash, dodge, traversal, pickup route, and combo setup.

Only the ♥ body takes ordinary damage. The head and living rainbow can enter danger to attack, collect powerups, Graze ordinary kernels, and Parry counterable shots.

---

## Visual direction

The supplied hero image remains the visual contract established in v0.26:

- luminous rounded white Stretchicorn forms,
- thick candy-gloss rainbow,
- golden kernel cells with restrained highlights,
- deep green husks,
- plum/violet environment values,
- strong silhouettes and readable faces,
- selective glow rather than decorative particle wallpaper.

v0.27 adds the Living Color rule: the countryside begins drained, then progressively regains saturation as Stretchicorn restores it.

v0.28 gives the three bosses their own silhouettes and readable combat states rather than adding another arena-decoration layer. Boss identity is expressed primarily through **behavior + shape + vulnerability language**.

---

## 13KB engineering

The competition build is deterministic:

```text
readable source
      ↓
custom safe identifier golf
      ↓
Terser 5.50.0
      ↓
pinned Roadroller 2.1.0 model
      ↓
Zopfli 0.4.3 / 80 iterations
      ↓
one-file js13k ZIP
```

The readable repository retains historical systems, while `scripts/build.mjs` removes superseded boss AI, old Husk Shift machinery, retired boss costumes, duplicate micro-HUD elements, and obsolete render ranges before composing the current modules.

This replacement architecture matters because v0.28 did not have enough budget to ship the old bosses and the new trilogy simultaneously.

### Exact v0.28 artifact

```text
dist/stretchicorn-js13k.zip
dist/stretchicorn-desktop-v0.28.0.zip
13,305 / 13,312 bytes
7 bytes free
```

SHA-256:

```text
c1072fde0e3e1fcb8e503d14aa71f88b22d4ce2ff8d3cce64601cdd7c79b7e3d
```

The stable and versioned ZIPs are byte-identical and share Git blob `b1cc87529ab56e0a3dddea1dc8a0af9c3d12118f`.

**Seven bytes means seven bytes.** Future gameplay or presentation additions should replace lower-value code or improve compression rather than casually growing the payload.

---

## Qualification

Final v0.28 qualification run: **`33045527163`**.

The exact qualified head passed:

- deterministic v0.28 gameplay regression tests,
- real guarded/open Hideaway damage semantics,
- Hideaway seven-kernel blast → open transition,
- Colonel three-kill chain → temporary guard release → guard recovery,
- Colonel squad deployment,
- Cobnocopia protected/open cycle,
- healer travel and +3 HP recovery,
- six-healer Final Feast below 20%,
- anti-chain Impossible rules,
- bounded Impossible Encore and true ending,
- safe spawning across all 13 trials,
- fixed-step / high-refresh input invariants,
- deterministic Roadroller output,
- offline/no-network audit,
- exact one-file root-level ZIP validation,
- **13,305 / 13,312 byte hard-size gate**,
- exact submitted ZIP in Chromium,
- exact submitted ZIP in Firefox,
- standalone `file://` build in Chromium,
- standalone `file://` build in Firefox,
- Wavedash isolation.

The qualified artifacts were then independently reproduced and frozen to the branch by the release bot.

Automated tests can prove state transitions and boundedness. They cannot tell us whether the bosses *feel* good. The remaining gate is human playtesting.

---

## What to judge in the v0.28 playtest

### Hideaway Husk
- Is `COVER!` early enough to react without feeling leisurely?
- Do the blocks read naturally as shelter?
- Is the seven-kernel blast dangerous but understandable?
- Is the open window long enough to reward a clean read?

### Kernel Colonel
- Does retreat create a chase puzzle rather than annoyance?
- Is the `0/3 → 3/3` relationship immediately understandable?
- Does chaining through the squad feel better than chasing directly?
- Is the exposed window satisfying and long enough to capitalize on?

### Cobnocopia
- Are healing kernels visually recognizable as urgent targets?
- Is the HP recovery noticeable without requiring explanatory text?
- Do protected/open phases remain readable while healers are active?
- Does Final Feast feel climactic rather than merely cluttered?

### Impossible
- Does the new normal-boss trilogy leave the old Encore feeling like a deliberate corrupted encore rather than a regression?
- Is the final density still readable at full speed?

---

## Build and play

Fastest local playtest:

[`dist/stretchicorn-local.html`](dist/stretchicorn-local.html)

Download that one file and double-click it. No local server is required.

Competition submission:

[`dist/stretchicorn-js13k.zip`](dist/stretchicorn-js13k.zip)

Versioned snapshot:

[`dist/stretchicorn-desktop-v0.28.0.zip`](dist/stretchicorn-desktop-v0.28.0.zip)

Build the exact release:

```bash
python3 -m pip install zopfli==0.4.3
npm run release:competition
```

Useful commands:

```bash
npm run build
npm test
npm run smoke
npm run browser:smoke
npm run browser:file-smoke
npm run wavedash:test
npm run release:competition
```

---

## Architecture

```text
src/00-core.js              state, spawning, geometry, procedural audio
src/01-combat.js            Snap, Parry, Graze, Splitcorn, scoring
src/02-update.js            fixed-step simulation and ordinary enemy AI
src/03-render.js            base character/enemy/combat rendering
src/03-keyart-v026.js       canonical glossy character/material renderer
src/03-living-color-v027.js grayscale origin + progressive world saturation
src/03-bosses-v028.js       Hideaway, Colonel, Cobnocopia AI + silhouettes
src/04-ui-input.js          First Flight, menus, victory flow, controls
scripts/test.mjs            deterministic gameplay contracts
scripts/release-smoke.mjs   exact built-artifact semantic smoke
```

Designed for **js13kGames 2026** around **Unicorns & Rainbows**.
