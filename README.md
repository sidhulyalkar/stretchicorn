<div align="center">

<a href="docs/stretchicorn-hero.png"><img src="docs/stretchicorn-hero.png" alt="Stretchicorn key art" width="1000"></a>

# 🌽🦄 STRETCHICORN

### **STRETCH · SNAP · SHUCK.**

A complete desktop arcade-action game packed into a **13,310 byte js13k ZIP**.

**Move the vulnerable body. Aim the safe horn. Stretch the rainbow. Snap through an army of corn.**

Built for **js13kGames 2026 · Unicorns & Rainbows**.

[**Download the standalone HTML**](dist/stretchicorn-local.html) · [**Download the js13k submission ZIP**](dist/stretchicorn-js13k.zip) · [**Read the release process**](RELEASING.md)

**v0.39.0 submission candidate · 13 trials · 4 difficulties · 3 authored bosses · Impossible Encore · 13,310 / 13,312 bytes**

</div>

---

## What fits in 13 KB?

Stretchicorn is not a tech demo wrapped around one mechanic. The current submission contains a finite campaign, onboarding, progression, bosses, scoring, powerups, procedural graphics, synthesized music, accessibility controls, persistent preferences, pause/retry flows, a real ending, and a deterministic release/test pipeline.

| System | Included in the competition build |
|---|---|
| **Campaign** | 13 authored trials with escalating enemy mixes and arena rules |
| **Core movement** | independent vulnerable-body movement + safe horn aiming |
| **Combat** | charge, Rainbow Snap, chained Double Rainbow, graze, parry, reflected shots, wall smashes |
| **Bosses** | Hideaway Husk, Kernel Colonel, two-phase Cobtopus Prime |
| **Expert finale** | Impossible Encore combining learned boss counterplay |
| **Difficulty** | Easy, Normal, Hard, Impossible with mechanical differences rather than HP-only scaling |
| **Enemies** | chase swarms, dashers, ranged shooters, curved-spread prisms, armored husks |
| **Projectiles** | gold parry/graze kernels + cyan dodge-only piercing spikes |
| **Arena** | static cover + temporary hay barriers that warn, harden, collide, then disappear |
| **Powerups** | Heart, Husk Shield, Butter Boost, Prism power, Gold 2X, Lucky 13 rewards |
| **Scoring** | Style score, combo multiplier, precision return tiers, per-difficulty Best |
| **Run summary** | Style, Best, time, hearts, clear progression |
| **Onboarding** | Field Guide + Easy First Flight inside the actual campaign |
| **Controls** | keyboard, mouse aim/click, persistent laptop-safe pointer OFF toggle |
| **Visuals** | fully procedural characters, corn, bosses, VFX, hay, terrain, UI, nested rainbow sky |
| **Audio** | procedural Web Audio music, bass, percussion, chimes, hit and kernel-pop feedback |
| **Persistence** | per-difficulty Best and control preference through guarded localStorage |
| **Reliability** | deterministic packaging, offline checks, VM regressions, Chromium + Firefox tests |
| **External runtime assets** | **0** |

The shipping ZIP uses **99.985% of the 13,312 byte limit**. There are **2 bytes free**.

---

# The game in one picture

<div align="center">
<img src="docs/stretchicorn-controls.svg" alt="Stretchicorn control model" width="1100">
</div>

Stretchicorn is one creature with two control points:

- the **heart-body** is vulnerable and controlled with **WASD**,
- the **head/horn** is safe and aimed with **Mouse** or **Arrow Keys**,
- the **rainbow between them** behaves like a spring, weapon, dash line and spatial resource,
- **Click** or **Space** releases stored tension as a Rainbow Snap.

That relationship is the entire design nucleus. There is no separate dash button, parry button, grapple button or special-move wheel. Most of the depth comes from drawing a better line through danger.

> **Protect the body. Throw the horn into danger. Make the rainbow do several jobs at once.**

---

# Controls

| Input | Action |
|---|---|
| **W A S D** | Move the vulnerable body / heart |
| **Mouse** | Aim the horn toward the pointer |
| **Arrow Keys** | Aim the horn without mouse input |
| **Left Click** | Rainbow Snap |
| **Space** | Rainbow Snap |
| **1 / 2 / 3 / 4** | Start Easy / Normal / Hard / Impossible |
| **Click difficulty card** | Start that difficulty from the title |
| **Space / Enter on title** | Start Easy |
| **P** | Pause / resume |
| **F while paused** | Open / close the Field Guide |
| **C** | Open Controls from title or pause |
| **M** | Return / back / menu depending on screen |

### Laptop-safe pointer controls

The Controls screen has a persistent **MOUSE AIM + CLICK ON/OFF** preference.

When pointer gameplay is **OFF**:

- touchpad or mouse movement cannot disturb horn aim,
- accidental clicks cannot trigger a Snap,
- Arrow Keys still aim,
- Space still Snaps,
- menu/UI clicks still work so the option can always be turned back on,
- stale pointer state is cleared before re-enabling.

The setting is stored alongside the existing local preferences. Older two-value settings migrate to pointer controls **ON** by default.

---

# Stretch, Snap, repeat

## 🌈 1. Stretch

Move the body away from the horn direction. Separation creates rainbow tension and charges the spring.

The stronger the charge, the more useful the next attack line becomes. Pulling farther is powerful, but it also makes your geometry harder to manage.

## 💥 2. Snap

Click or press Space to release the spring.

A charged Rainbow Snap is simultaneously:

- an attack,
- a burst of traversal,
- a dodge line,
- a multi-target route,
- a pickup collector,
- a combo extender,
- and a way to reposition the horn for the next decision.

## 🌈🌈 3. Double Rainbow

Recharge and Snap again quickly enough and the game chains into **Double Rainbow**.

The chained attack hits harder, reaches farther and grants a brief defensive window. Expert play becomes a rhythm of deliberately rebuilding tension instead of simply mashing the attack button.

---

# Gold is opportunity. Cyan is danger.

Projectile color is a combat language.

### 🟡 Gold kernels

Gold round kernels can be:

- **grazed** near the vulnerable body for **+13 Style** and charge,
- **parried** with the horn for **+25 Style** and charge,
- **returned** into enemies and boss shields.

Returned fire rewards distance:

| Return | Meaning |
|---|---|
| **RETURN x2** | close counter |
| **RETURN x3** | medium counter |
| **RETURN x4** | long precision counter |

A cross-arena return is therefore more valuable than batting the nearest shot back.

### 🔷 Cyan spikes

Cyan spikes are intentionally different:

- cannot be parried,
- cannot be grazed for value,
- pierce ordinary dash invulnerability,
- must be dodged.

Late Hard and Impossible force the player to classify projectiles while moving:

**parry gold · dodge cyan · preserve the next Snap line**.

---

# Style is mastery, not victory

You win by clearing the campaign and restoring the sky. **Style** measures how strongly you played while doing it.

Style rewards:

- charged Rainbow Snaps,
- chained kills,
- graze risk,
- parries,
- long-distance returns,
- wall-smash opportunities,
- Lucky 13 routing,
- maintaining aggressive flow without getting flattened.

The combo multiplier climbs toward **4×** while active play continues. Each difficulty also keeps its own **Best** score.

The final result separates three ideas that used to be conflated:

- **Victory**: did you restore the sky?
- **Style**: how skillfully and boldly did you fight?
- **Run quality**: how fast did you finish and how many hearts survived?

The victory sequence keeps Stretchicorn in the final gameplay pose while the defeated Cobtopus erupts into **rainbow popcorn**, followed by Style, Best, time and hearts.

---

# Easy starts by teaching the real game

Easy Trial 1 is **FIRST FLIGHT**.

Rather than sending a new player to a detached tutorial scene, the first trial introduces one target at a time and asks for five genuine charged Snap kills using the production movement/combat rules.

That teaches the essential loop:

**pull away → aim → Snap → recharge → repeat**

After the fifth target, the campaign simply becomes Trial 2. No separate tutorial physics, no fake practice move, no second version of the controls to maintain.

The title and pause menus also expose a compact **Field Guide** covering:

- the 13-trial objective,
- vulnerable body vs safe horn/rainbow,
- charge and Snap,
- Double Rainbow,
- gold vs cyan projectiles,
- Style and run results,
- powerups and Lucky 13,
- enemy archetypes,
- temporary hay,
- boss counterplay,
- Impossible Encore.

---

# Thirteen trials, one growing vocabulary

The campaign is built from recombination rather than thirteen unrelated gimmicks.

### Early trials

Learn movement, tension and direct Snap routing against readable enemy pressure.

### Mid campaign

Ranged kernels, parries, armored targets, static cover and denser formations ask the player to combine offense and positioning.

### Late campaign

Curved spreads, temporary hay barriers, mixed gold/cyan fire and stronger enemy combinations turn the arena into a moving geometry problem.

### Trial 13

Cobtopus Prime asks for nearly every learned verb at once, then changes the target structure for Phase II.

---

# Three bosses, three different questions

The bosses are not normal enemies with larger HP bars. Each changes what good geometry means.

| Trial | Boss | Core question |
|---|---|---|
| **5** | **Hideaway Husk** | Can you wait for the firing window and punish it? |
| **9** | **Kernel Colonel** | Can you turn incoming fire into the key that opens the boss? |
| **13** | **Cobtopus Prime** | Can you combine movement, returns, arena pressure and split targets? |

## 🌽 Hideaway Husk

Hideaway closes behind a real shield. Direct attacks do not leak through protected states.

Its offense creates its weakness: when Husk commits to firing, the shell opens and creates the punish window.

## 🎖 Kernel Colonel

Colonel weaponizes the parry system. Returned gold kernels are not merely bonus damage, they are part of the shield-opening grammar.

The fight asks the player to receive an attack, reshape it, and send it back with intent.

## 🐙 Cobtopus Prime

Prime begins behind protected/open Phase I windows, then ruptures into **two independent cores**.

Each split core owns its own reflected-kernel shield requirement:

| Difficulty | Returns required per core |
|---|---:|
| Easy | 1 |
| Normal | 2 |
| Hard | 3 |
| Impossible | 4 |

Destroying one core does not finish the encounter. Both must be opened and defeated.

### Anti-pin Phase Shift

Three rapid successful direct hits can trigger a deterministic **PHASE SHIFT**. Damage already earned is preserved, but the boss relocates and the player must construct a new attack line.

This breaks stationary pinning without using arbitrary invulnerability or giant health pools.

---

# Four difficulties that alter decisions

Difficulty is not only a multiplier.

| Mode | Design intent |
|---|---|
| **Easy** | First Flight onboarding, forgiving pressure, retry failed trial |
| **Normal** | intended campaign rhythm |
| **Hard** | denser late encounters and stronger gold/cyan classification pressure |
| **Impossible** | expert anti-chain pressure, reduced sustain, stricter boss return gates, Encore |

A key playtest discovery shaped Impossible: simply adding more enemies can make Stretchicorn easier for skilled players because extra bodies become extra combo targets.

Impossible therefore attacks the *player's conversion engine* instead of only increasing population. It adds more threats that cannot become free offense, makes sustain less generous, raises boss gates, accelerates hostile pressure and ends with a final recombination test.

### Impossible Encore

Clearing Trial 13 on Impossible is not quite the end.

The Encore combines learned boss logic in one arena. Previously defeated targets stay defeated, the transition clears stale projectiles, and the player must finish the remaining threats without relying on a single rehearsed boss script.

---

# Powerups and Lucky 13

Five compact pickups reuse the game's existing corn/shape vocabulary:

| Pickup | Effect |
|---|---|
| **♥ Heart Kernel** | restore one heart, capped at 13 |
| **Husk Shield** | absorb the next ordinary body hit |
| **Butter Boost** | temporary movement speed |
| **Prism Cob** | powers the rainbow and makes charge easier to reach |
| **Gold Cob** | 2× Style scoring for six seconds |

Every 13th kill triggers **Lucky 13**:

- +130 Style,
- immediate charge / ready state,
- radial rainbow feedback,
- on Easy through Hard, an extra heart and shield,
- on Impossible, the sustain portion is deliberately withheld.

The number 13 is therefore both competition theme and gameplay rhythm.

---

# Hay that changes the arena

Temporary barriers are rendered as procedural straw bales rather than generic collision rectangles.

Their state is readable:

1. **forming**: translucent warning geometry + progress cue,
2. **solid**: real collision for player, enemies and projectiles,
3. **gone**: route reopens.

If a bale hardens over the vulnerable body, the game ejects the body and applies the appropriate hit rather than leaving the player embedded in geometry. Enemy overlap is resolved too.

The same blocks can become cover, danger, route blockers or wall-smash opportunities depending on the current fight.

---

# The sky is a progress meter

The background is not a stack of imported level images.

Progress restores a nested rainbow family using shared procedural geometry:

### 🌈 Early: single rainbow
One broad six-band arch appears.

### 🌈🌈 Mid: double rainbow
A second arch forms inside it.

### 🌈🌈🌈 Late: triple rainbow
A third nested arch completes the restored sky.

All use natural radial order: **red outside, violet inside**. The title uses the same visual family, so menu, campaign and ending share one motif rather than paying for separate art directions.

---

# Everything in the game is generated at runtime

The competition archive contains:

- no sprite sheets,
- no raster game art,
- no audio files,
- no web fonts,
- no CDN dependencies,
- no fetch/XHR/WebSocket runtime,
- no external resources.

Characters and environments are assembled from Canvas primitives. The same shapes change jobs repeatedly:

- ellipses become bodies, kernels, eyes, highlights and medals,
- arcs become shields, telegraphs and rainbow skies,
- curves become husks, tentacles, mane, tail and terrain,
- the six-color palette becomes character detail, combat feedback and world restoration,
- one corn grammar scales from tiny enemies to authored bosses.

That reuse compresses well, but it also gives Stretchicorn a coherent visual language.

---

# Procedural audio: the corn has a synthesizer

The entire soundtrack and feedback layer is generated with the Web Audio API.

A small set of oscillator voices produces:

- rhythmic kick/snare-like hits,
- pitched kernel pops,
- melodic hooks,
- bass/wobble accents,
- Snap and hit feedback,
- boss coloration,
- victory chimes,
- a heavier Impossible/Encore texture.

Music and combat sounds deliberately share voices, so the soundtrack feels built from the same world rather than glued on as a separate asset pack.

---

# Why the 13 KB constraint improved the design

The byte limit was treated as a design constraint, not a packaging problem.

### One mechanic, many verbs

The body/horn/rainbow relationship produces movement, aiming, charging, dashing, attacking, dodging, grazing, parrying, traversal and routing without buying a separate subsystem for each verb.

### Recombination beats accumulation

Bosses, late trials and difficulty modes mostly recombine rules already learned by the player. This increases depth faster than it increases code.

### Shape reuse becomes art direction

The same primitives that make the ZIP smaller also make the world feel related. Corn enemies and bosses look like they belong to one family because they literally share a rendering grammar.

### Deletion is a feature

Across development, weaker ideas were removed instead of endlessly preserved in the shipping composition: duplicate intro states, redundant world renderers, obsolete boss grammars, old grading language and several one-off visual systems.

The question behind every byte became:

> **Does this make the game more legible, more replayable or more fun?**

---

# 13,310 bytes, deterministically

The current competition artifact is:

```text
dist/stretchicorn-js13k.zip
dist/stretchicorn-desktop-v0.39.0.zip
13,310 / 13,312 bytes
2 bytes free
SHA-256 074b379ed4d3dbaec326b07cb0ae0b1313af77b6a4e5d5ae5791e9360102401a
```

The stable and versioned ZIPs are byte-identical and contain exactly one file at archive root:

```text
index.html
```

The production path is:

```text
readable source modules
        ↓
competition-only source slicing / override composition
        ↓
safe identifier golf
        ↓
Terser 5.50.0
        ↓
Roadroller 2.1.0 with pinned deterministic model
        ↓
Zopfli 0.4.3 deterministic ZIP
        ↓
one root-level index.html
```

Roadroller is run twice and the outputs must match before packaging continues.

---

# Release confidence

Extreme byte golf makes regressions unusually easy to introduce, so the repository treats the final ZIP as a reproducible artifact and tests both readable behavior and transformed output.

The canonical `npm run release:competition` path currently covers:

- legacy settings migration and persistent pointer preference,
- pointer OFF blocking mouse aim and click while preserving Arrow + Space,
- Controls opened from title and pause,
- stale-pointer suppression when re-enabling,
- deterministic multi-difficulty / boss soak with finite-state and entity-count bounds,
- Easy First Flight target progression,
- Field Guide contract,
- pause authority,
- retry/reset semantics,
- per-difficulty Best persistence and storage failure fallback,
- reflected-projectile single-resolution authority,
- boss open/closed shield authority,
- Hideaway firing vulnerability,
- Colonel return gate,
- Prime two-phase / independent-core behavior,
- difficulty-scaled return requirements,
- precision `RETURN x2/x3/x4`,
- anti-pin Phase Shift,
- late-Hard / Impossible cyan pressure,
- Impossible Encore defeat-order completion,
- safe spawn invariants,
- deterministic single → double → triple rainbow progression,
- no external runtime references or network-capable APIs,
- deterministic archive metadata/content,
- exact 13,312-byte ceiling,
- committed `dist/` parity with rebuilt source,
- exact submitted ZIP in Chromium,
- exact submitted ZIP in Firefox,
- standalone `file://` HTML in Chromium,
- standalone `file://` HTML in Firefox,
- Wavedash publishing-layer isolation.

The real-browser smoke path also toggles the laptop-safe pointer controls OFF and back ON through the actual Canvas UI, then starts gameplay, pauses, and checks for console/page/network failures.

Current development is tracked in [PR #21](https://github.com/sidhulyalkar/stretchicorn/pull/21).

---

# Build and play

## Fastest local playtest

Download [`dist/stretchicorn-local.html`](dist/stretchicorn-local.html) and double-click it.

It is a self-contained `file://` build with no server requirement. It intentionally includes readable startup/error handling and is **not** the competition submission artifact.

## Rebuild the exact competition package

Requirements:

- Node.js 22
- Python 3.12+
- `zopfli==0.4.3`

```bash
python3 -m pip install zopfli==0.4.3
npm run release:competition
```

Useful development commands:

```bash
npm run build                 # readable + standalone generated HTML
npm test                      # full VM regression chain
npm run smoke                 # faster current regression chain
npm run release:competition   # full deterministic release gate
npm run browser:smoke         # exact HTML through local HTTP + Playwright
npm run browser:file-smoke    # standalone file:// Playwright check
npm run wavedash:test         # publishing-layer isolation
```

See [`PLAY_LOCAL.md`](PLAY_LOCAL.md) for the one-file tester and [`RELEASING.md`](RELEASING.md) for the submission preflight.

---

# Architecture

The readable source is intentionally modular even though the shipping artifact is aggressively transformed.

```text
src/
  00-core.js              state, geometry, spawning, audio, walls, pickups
  01-combat.js            Snap, Double Rainbow, hurt, scoring, collision, parry
  02-update.js            fixed-step simulation, movement, projectiles, enemy AI
  03-render.js            base scene and combat rendering
  03-keyart-v026.js       shared character/material grammar
  03-living-color-v027.js retained visual vocabulary used by the build composition
  03-bosses-v028.js       boss state machines, return gates, finale authority
  03-boss-art-v034.js     compact procedural boss detail grammar
  03-sky-v030.js          storm-to-single/double/triple rainbow restoration
  03-title-v037.js        title tableau, Field Guide, hay material, pointer routing
  04-ui-input.js          title/pause/result/Controls input and fixed-step RAF loop
  style.css               one-canvas layout

scripts/
  build.mjs               source composition, retired-seam slicing, identifier golf
  pack-competition.mjs    pinned Terser + deterministic Roadroller packing
  package.py              deterministic Zopfli archive generation
  verify-archive.py       root path, parity, metadata, CRC, size and SHA checks
  check-offline.mjs       rejects external references / network-capable runtime APIs
  browser-smoke.mjs       Chromium/Firefox exact-build interaction smoke
  file-smoke.mjs          Chromium/Firefox standalone file:// smoke
  test-v044.mjs           final input migration + deterministic soak audit
  test-v043.mjs           pointer controls regression
  test-v042.mjs           finale/result regression
  test-v041.mjs           Easy First Flight regression
  test-v040.mjs           guide / pointer / hay integration contract
  test-v039.mjs           pause, retry, boss authority, Encore regression
  test-v038.mjs           nested rainbow regression
  test-v037.mjs           title/direct-start + cyan pressure regression
  test-v036.mjs           boss rendering regression
  test-v035.mjs           compact base shape-language regression
  test-v032.mjs           boss/counterplay runtime regression
  test-sky-v030.mjs       sky renderer contract
```

A few versioned module names remain because the project evolved through byte-budget experiments. The production builder explicitly composes the winning pieces and removes superseded seams before minification. That architecture lets the readable repository preserve why a rendering/mechanics layer exists without paying for multiple versions in the 13 KB output.

---

# Repository hygiene

The working tree keeps only the current release ZIP pair. Historical binary releases remain recoverable from Git history rather than accumulating in `dist/`.

One-off packing tuners, retired v0.29/v0.31 harnesses, obsolete Living Color smoke scripts and old screenshot/trim helpers were removed during the final cleanup pass. The scripts left in the repository either participate in the current release/test path or document active publishing behavior.

Historical design notes remain under [`docs/`](docs/) because they explain decisions that shaped the final game without entering the competition archive.

---

# Competition artifact vs repository assets

The repository includes screenshots/key art for GitHub documentation. Those files are **not** part of the js13k submission.

The actual competition ZIP contains only the generated root `index.html`, with all game graphics and sound created at runtime.

---

<div align="center">

## **STRETCH · SNAP · SHUCK.**

**One vulnerable body. One safe horn. Thirteen trials. Two spare bytes.** 🌈🌽

</div>
