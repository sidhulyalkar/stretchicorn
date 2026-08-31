<div align="center">

<a href="docs/stretchicorn-hero.png"><img src="docs/stretchicorn-hero.png" alt="Stretchicorn key art" width="1000"></a>

# 🌽🦄 STRETCHICORN

### **STRETCH · SNAP · SHUCK.**

A **13KB desktop arcade-action game** where one unicorn is split across two control points and held together by a living rainbow.

Move the vulnerable body. Aim the safe horn. Stretch the rainbow until it bites back.

Built for **js13kGames 2026 · Unicorns & Rainbows**.

[**Play the standalone build**](dist/stretchicorn-local.html) · [**Download the js13k ZIP**](dist/stretchicorn-js13k.zip)

**v0.38.0 · 13 trials · 3 authored bosses · 1 Impossible Encore · 12,640 bytes**

</div>

---

## The game in one picture

```text
         movement / danger                         aim / offense
               ↓                                        ↓
         ♥ BODY  ═══════════════ 🌈 ═══════════════  🦄 HORN
       vulnerable         elastic living rainbow          safe
               \________________________________________/
                          STRETCH → SNAP
```

Stretchicorn is controlled from **both ends**.

- **WASD** moves the heart/body.
- **Arrow Keys** aim the head and horn.
- Pull the two halves apart to build rainbow tension.
- **Space** converts that tension into a fast Rainbow Snap.
- The body is vulnerable; the head/horn and rainbow are the tools you deliberately throw into danger.

That geometry is the entire game engine in miniature. Movement, aiming, offense, defense, traversal, spacing, parries, pickups, and combos all emerge from the same split creature instead of separate ability buttons.

---

# Why Stretchicorn feels different

Most action games ask you to move one avatar and point a weapon from it.

Stretchicorn asks you to manage a **relationship between two points**.

The vulnerable heart can retreat while the horn attacks. The horn can orbit an enemy while the body anchors somewhere safer. Stretching farther creates stronger attack geometry but also creates a larger creature to manage. A good Snap can simultaneously cross the arena, hit several enemies, avoid a projectile lane, collect something, and set up the next attack.

The result is intentionally closer to steering a spring-loaded constellation than piloting a conventional character.

---

## Core combat vocabulary

### 🌈 Rainbow Snap

Pull the body away from the horn to store tension, then release with **Space**.

A charged Snap is simultaneously:

- attack,
- dash,
- dodge,
- traversal,
- combo route,
- and repositioning tool.

Good play is less about standing still and firing, and more about repeatedly finding valuable lines through the arena.

### 🌽 Kernel Parry

Large round gold kernels are counterable.

Meet them with the horn and they reverse direction. A successful returned kernel can then damage enemies or interact with boss shields.

Returned shots reward precision and spacing:

- **RETURN x2** for a close return,
- **RETURN x3** for a medium return,
- **RETURN x4** for a long return.

The game therefore gives real value to creating distance and lining up a difficult counter-shot instead of always choosing the nearest Snap.

### ✨ Graze

The safe offensive side of Stretchicorn can skim danger to keep momentum and recharge pressure. The game rewards entering dangerous geometry deliberately rather than treating every projectile as something to flee from.

### 13-chain rhythm

Kills, scoring, rainbow charge, and the recurring **Lucky 13** motif turn dense encounters into routing problems. Enemy crowds are useful until they become dangerous enough that blindly chaining through them stops working.

---

# Thirteen trials

The campaign is one escalating combat curriculum rather than thirteen isolated gimmicks.

Early trials teach spacing and Snap geometry. Mid-game introduces ranged kernels, parries, changing cover, and shield logic. Late trials combine those ideas under denser pressure before the final boss asks the player to use the whole vocabulary at once.

The world changes with the run as well: it begins dark and drained, then regains saturation and increasingly improbable rainbow structure as Stretchicorn restores it.

---

# Boss trilogy

The three campaign bosses are designed as **different combat questions**, not larger corn with larger health bars.

## Trial 5 · Hideaway Husk

A defensive husk with a small cob hiding inside.

Its shell is mechanically authoritative:

- **shield closed:** Snaps and reflected kernels are blocked,
- **opening tell:** Husk slows and commits,
- **firing window:** the shell opens and the cob peeks out,
- **counterplay:** attack the exposed core or send its own kernels back,
- **recovery:** the shell closes and the duel resets.

The lesson is simple and readable:

> **When Husk attacks, Husk becomes vulnerable.**

It teaches patience without turning the first boss into a waiting game.

---

## Trial 9 · Kernel Colonel

A corn commander with evil eyes, a curled mustache, military details, and a husk shield.

The Colonel cannot be solved by repeatedly diving into its body. Its shield is opened through reflected-kernel counterplay, after which the player has a real damage window.

The fight tests:

- projectile reading,
- controlled spacing,
- return accuracy,
- and converting a defensive action into offense.

Long-distance returns become especially valuable because the same parry skill used to open the fight can also deliver amplified damage once the target is vulnerable.

---

## Trial 13 · Cobtopus Prime

The finale combines the campaign's mechanics instead of merely increasing speed.

### Phase I · Prime shell

Cobtopus Prime alternates between protection and a short exposed-core attack window while arena pressure and returnable kernels force the player to move decisively.

### Phase II · split cores

Destroying the shell does **not** end the fight.

Prime ruptures into two independent cores. Each core has its own reflected-kernel shield requirement and must be opened separately.

Required returns scale with difficulty:

| Difficulty | Returns per core |
|---|---:|
| Easy | 1 |
| Normal | 2 |
| Hard | 3 |
| Impossible | 4 |

Killing one core cannot prematurely end the fight. Both must be opened and destroyed.

---

## Anti-pin Phase Shift

Aggressive Snap play is supposed to be strong, but bosses should not become stationary collision targets.

If a player lands **three rapid successful direct hits** on a boss, the boss performs a deterministic **PHASE SHIFT** to the opposite side of the arena relative to the vulnerable heart.

The player keeps the earned burst damage, but must reacquire the target and rebuild attack geometry.

This specifically counters repetitive boss pinning without punishing normal aggression or inflating boss HP.

---

# Difficulty

Choose directly from the title:

| Key | Mode | Character |
|---|---|---|
| `1` | Easy | learn the geometry |
| `2` | Normal | intended campaign pressure |
| `3` | Hard | faster, denser, mixed projectile decisions |
| `4` | Impossible | expert anti-chain pressure + Encore |

`Space` starts Easy immediately.

There is **no intro cutscene and no mandatory tutorial scene**. Launch goes straight to the title and then straight into play.

## Hard: parry or dodge?

Late Hard deliberately breaks the idea that every projectile is free counterattack fuel.

- **Gold round kernels:** parry / return.
- **Cyan spikes:** cannot be returned; dodge them.

The mix appears progressively in the last trials, so dense enemy fields become a classification problem rather than a parry buffet.

## Impossible

Impossible is designed around expert behavior rather than simply spawning an absurd number of enemies.

It increases hostile pressure while protecting the game from the accidental advantage of unlimited chain targets. Late trials contain a heavier cyan dodge-only mix, boss return gates are stricter, and completing the campaign reaches a bounded **Impossible Encore** instead of an endless survival tail.

---

# A sky that remembers the run

The background is part of the progression system.

Stretchicorn begins in a dark, partially drained world. Campaign progress and restoration bring back color, and v0.38 turns the rainbow itself into a visible restoration meter.

### Early restoration

**Single rainbow.**

A broad six-band arch sits behind the arena as a faint promise.

### Mid restoration

**Double rainbow.**

A smaller second rainbow appears inside the same geometry.

### Late restoration

**Triple rainbow.**

A third nested arch completes the restored sky.

All three rainbows share one procedural primitive and one center. The color order follows natural radial ordering: **red/pink outside, violet inside**. The inner arches are progressively fainter so the effect reads as atmosphere rather than combat clutter.

The title uses the same nested-rainbow geometry, so the menu and arena now belong to one visual language.

---

# Procedural presentation

The competition build ships **no raster game art and no external resources**.

Stretchicorn, corn enemies, husks, mustaches, tentacles, shields, kernels, rainbow bands, terrain, particles, menus, boss telegraphs, and sky restoration are all built from Canvas primitives already present in the game.

The visual strategy is deliberate reuse:

- rounded ellipses become body mass, kernel cells, highlights, eyes, and armor details,
- arcs become shields, boss machinery, rainbow skies, and telegraphs,
- Bézier curves become husks, tentacles, mane, tail, terrain, and elastic motion,
- the six-color palette serves character rendering, world restoration, boss feedback, and the title,
- the same corn renderer scales from regular enemies into increasingly authored silhouettes.

That reuse is how the bosses gained personality without paying for sprite sheets.

---

# Procedural audio

The soundtrack and combat feedback are generated with the Web Audio API.

Short oscillator voices, pitched kernel pops, percussion, and synthesized bass share a small procedural sound vocabulary. Gameplay events and music deliberately reuse related sounds so popping corn, landing attacks, and the soundtrack feel like parts of the same arcade machine.

No audio files are shipped.

---

# Controls

| Input | Action |
|---|---|
| **W A S D** | Move the vulnerable body / heart |
| **Arrow Keys** | Aim / steer the head and horn |
| **Space** | Horn strike / charged Rainbow Snap |
| **1 / 2 / 3 / 4** | Easy / Normal / Hard / Impossible |
| **P** | Pause |
| **M** | Return to menu |
| **C** | Rebind controls |
| **S** | Music + SFX settings |

The title intentionally stays compact: choose pressure, learn the three core inputs, and play.

---

# 13KB engineering

Everything above has to fit inside a js13k competition archive.

The release pipeline is deterministic:

```text
readable source
      ↓
custom source slicing + safe identifier golf
      ↓
Terser 5.50.0
      ↓
pinned Roadroller 2.1.0 model
      ↓
Zopfli 0.4.3 / deterministic ZIP
      ↓
one root-level index.html
```

The readable repository intentionally preserves some historical source context, while `scripts/build.mjs` removes superseded implementations before packing. New systems frequently replace older, lower-value byte ranges instead of simply accumulating on top of them.

That strategy is why the current game contains substantially more authored combat and art than earlier versions while still retaining useful headroom.

## Exact v0.38 competition artifact

```text
dist/stretchicorn-js13k.zip
dist/stretchicorn-desktop-v0.38.0.zip
12,640 / 13,312 bytes
672 bytes free
```

SHA-256:

```text
2753615971b736a5e0e0c2636c94276344ed0cb846cedfeaf8a5c7fdc9138cf9
```

The archive contains exactly one root-level `index.html` and is fully self-contained/offline.

---

# Qualification

The v0.38 release lineage has automated contracts for the mechanics that would be easiest to accidentally break while byte-golfing:

- title → gameplay launch with no hidden intro/training state,
- all 13 safe-spawn invariants,
- authoritative closed/open boss shields,
- Hideaway firing vulnerability,
- Kernel Colonel reflected-kernel gate,
- Cobtopus Prime Phase I and independent split-core Phase II,
- Easy / Normal / Hard / Impossible return-count scaling,
- `RETURN x2/x3/x4` distance tiers,
- three-hit boss Phase Shift,
- late-Hard cyan dodge-only projectile pressure,
- deterministic single → double → triple rainbow restoration,
- natural outer-red / inner-violet rainbow ordering,
- deterministic packing,
- offline/no-network validation,
- exact one-file archive structure,
- hard 13,312-byte size gate,
- extracted competition ZIP smoke tests in Chromium and Firefox,
- standalone `file://` smoke tests in Chromium and Firefox.

Final v0.38 runtime qualification: **GitHub Actions run `33424531311`**.

---

# Build and play

Fastest local playtest:

[`dist/stretchicorn-local.html`](dist/stretchicorn-local.html)

Download that single file and double-click it. No server is required.

Competition archive:

[`dist/stretchicorn-js13k.zip`](dist/stretchicorn-js13k.zip)

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

# Architecture

```text
src/00-core.js              shared state, geometry, spawning, procedural audio
src/01-combat.js            Snap, Parry, Graze, scoring, combat authority
src/02-update.js            fixed-step simulation and enemy behavior
src/03-render.js            base scene / combat rendering
src/03-keyart-v026.js       glossy procedural character/material vocabulary
src/03-living-color-v027.js dark → restored color progression wrapper
src/03-bosses-v028.js       boss mechanics and encounter authority
src/03-boss-art-v034.js     compact procedural boss-detail pass
src/03-sky-v030.js          v0.38 nested single/double/triple rainbow world
src/03-title-v037.js        procedural title tableau
src/04-ui-input.js          menu, victory flow, controls, input
scripts/build.mjs           release composition, source slicing, identifier golf
scripts/test-v038.mjs       current nested-rainbow contract
scripts/test-v037.mjs       no-intro + late-Hard contract
scripts/test-v032.mjs       boss/counterplay/runtime regression contract
```

---

<div align="center">

## **STRETCH · SNAP · SHUCK.**

Thirteen trials. A living rainbow. An unreasonable amount of corn packed into 12.64 KB. 🌈🌽

</div>
