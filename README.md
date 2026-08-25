<div align="center">

<a href="docs/stretchicorn-hero.png"><img src="docs/stretchicorn-hero.png" alt="Stretchicorn key art: a rainbow-stretched unicorn battling an angry corn army" width="1000"></a>

# 🌽🦄 STRETCHICORN

### **STRETCH · SNAP · SHUCK.**

A 13KB desktop arcade-action game about a dead unicorn revived by the last surviving rainbow, then sent through a dark corn-corrupted world to bring color back one violent stretch at a time.

Built for **js13kGames 2026 · Unicorns & Rainbows**.

[**Download the current js13k competition ZIP**](dist/stretchicorn-js13k.zip)

**v0.22.0 · RAINBOW THEATRE · 13 hearts · 13 trials · 4 difficulty modes · one secret Impossible finale**

</div>

---

## The premise

Stretchicorn begins **dead**.

Some catastrophe tore the unicorn in two and drained almost all color from the world. The two halves lie separated in a dim, hostile cornfield until one thin ribbon of rainbow light finds them. It cannot restore the body that was lost, so it becomes the missing body itself: an elastic living bridge that stitches the unicorn back into motion.

That makes the central mechanic the story:

```text
PULL ←     ♥ BODY ═══════ 🌈 LIVING SCAR ═══════ 🦄 HEAD / HORN     → AIM
           vulnerable          life-force                 safe
```

The rainbow is simultaneously:

- the force that resurrected Stretchicorn,
- the scar holding its two halves together,
- the spring used for movement,
- the weapon used to fight,
- and the last source of full-spectrum color in the world.

Stretchicorn is not carrying a magical weapon. **Stretchicorn is being held alive by one.**

The game deliberately leaves the larger catastrophe mysterious. Did the corn destroy the old world, or merely survive whatever did? Why do the strongest corn creatures resist returning color? Is the rainbow a remnant of Stretchicorn's old magic or something that chose the unicorn after death?

The story is told primarily through play, color, animation, music, bosses, and short transition tableaux rather than exposition. The full visual/narrative direction is documented in [`docs/rainbow-theatre-v0.22.md`](docs/rainbow-theatre-v0.22.md).

---

## 🎮 The unusual controller

- **WASD** moves the vulnerable ♥ body.
- **Arrow Keys** steer the safe head and horn.
- Pull the body away from the horn to stretch and charge the rainbow.
- When the unicorn lights up, press **Space** to launch a **Rainbow Snap**.

Only the body takes damage. The head and rainbow can safely reach into danger to attack, collect power-ups, Graze ordinary kernels, Parry projectiles, and prepare another launch.

Strong play turns one movement into several jobs at once: dodge, attack, collect, reposition, recharge, then chain the next Snap.

### Controls

| Input | Action |
|---|---|
| **1 / 2 / 3 / 4** | Start Easy / Normal / Hard / Impossible |
| **W A S D** | Move the vulnerable body |
| **Arrow Keys** | Steer the safe head / horn |
| **Space** | Horn strike / Rainbow Snap |
| **P** | Pause / resume |
| **M** | Return to menu |
| **C** | Controls / rebinding |
| **R** | Rules |
| **S** | Music + SFX settings |

Space or Enter from the title screen starts Normal. Game Over retries preserve the selected difficulty. Controls are persistently rebindable, while `M` and `P` remain reserved.

---

# 🌈 v0.22 — RAINBOW THEATRE

v0.22 is a presentation, clarity, and atmosphere release built around one goal: make the game feel like **procedural psychedelic storybook arcade art** without diluting the two-ended elastic-unicorn combat.

## 1. Playable resurrection tutorial

Trial 1 no longer throws instructions at the player on a timer.

The unicorn's rainbow fades into existence as if re-stitching the two halves together. The tutorial advances only when the player performs the corresponding action:

1. **WASD · MOVE THE HEART**
2. **ARROWS · AIM THE HORN**
3. **PULL AWAY · STRETCH THE RAINBOW**
4. **SPACE · RAINBOW SNAP**
5. **COLOR RETURNS.**

The first corn remains dormant until the player's first Snap, making the tutorial playable rather than punitive. The heart and horn receive contextual visual focus instead of forcing the player to study a rules page before moving.

## 2. Thirteen procedural storybook chapters

Every trial now has its own restrained dark palette and symbolic procedural backdrop. No image assets are stored in the runtime.

The chapter motifs are drawn from Canvas primitives:

| Trial | Visual motif |
|---|---|
| **Pastel Patch** | sleeping blossoms |
| **Kernel Panic** | marching stalks |
| **Popcorn Front** | smoke fronts |
| **Husk Maze** | looming maze pillars |
| **Maize Monarch** | dead crowns / false court |
| **Butter Blitz** | fast golden streaks |
| **Husk Armor** | layered shell forms |
| **Prism Popcorn** | broken-spectrum diamonds |
| **Husk Architect** | blueprint geometry |
| **Sugar Corn** | crystalline stars |
| **Kernel Gauntlet** | army teeth / marching silhouettes |
| **Double Cornbow** | paired rainbow arches |
| **Cobtopus** | curling vortex forms |

The world starts dark and restrained. The player's rainbow remains the strongest full-spectrum object.

## 3. Skill restores color

Color is now a performance system, not just decoration.

At low combo the environment stays subdued. As the player performs well, spectral contamination spreads through the scene:

- clean chains brighten chapter motifs,
- Grazes and Parries create chromatic fragments,
- stronger combos enrich stars, horizon light, particles, and flowers,
- Lucky 13 produces a restoration burst,
- stage clear holds the restored world on screen for a short breathing beat.

The visual metaphor is literal: **playing well teaches the dead world how to be colorful again.**

## 4. More alive procedural characters

Without adding sprite assets:

- the unicorn body squashes and stretches with charge,
- the head subtly breathes,
- the eyes blink,
- the body fades in during resurrection,
- corn breathes subtly while alive,
- enemies squash on impact.

The goal is small-motion density: inexpensive animation that makes every procedural shape feel less schematic.

## 5. Boss theatre and the Impossible false ending

Bosses receive stronger entrance staging rather than simply appearing as large enemies.

The Impossible finale now deliberately weaponizes relief:

1. Cobtopus falls.
2. The arena clears.
3. The victory rhythm begins to resolve.
4. Then: **NOT YET.**
5. Maize Monarch, Cobtopus, and Husk Architect arrive together through rainbow entrance rings.
6. Each original boss later performs its existing one-time false death and tears into two terminal same-identity copies.

The HUD names the event **IMPOSSIBLE ENCORE · THE WORLD REFUSES**.

The mechanic remains bounded: three originals can become at most six terminal descendants.

## 6. Performance-reactive POP DROP

Stretchicorn still contains no audio files. Music and SFX are synthesized at runtime with Web Audio.

v0.22 makes performance part of the arrangement:

- combo slightly increases musical tempo,
- higher combo adds a compact high-frequency percussion voice,
- combat effects continue sharing the same kernel-pop sonic family.

A stronger run therefore sounds subtly more energized instead of playing the same mix irrespective of performance.

## 7. Trial mastery grades + breathing beats

Every non-final trial now derives a lightweight grade from information the game already has:

- **S** · no damage and strong finishing combo
- **A** · no damage
- **B** · 1–2 hits taken
- **C** · 3+ hits taken

The grade appears inside a short **RESTORED** tableau after the fight. This gives players a legible mastery target without bolting on an upgrade tree or another core system.

---

## 🌈 Difficulty ladder

The v0.21.1 anti-chain redesign remains intact underneath Rainbow Theatre.

| Key | Mode | Pressure scalar | Population | Purpose |
|---|---|---:|---|---|
| `1` | **Easy** | `0.7×` | reduced | learn the controller |
| `2` | **Normal** | `1.0×` | baseline | authored campaign |
| `3` | **Hard** | `1.6×` | high | serious mastery challenge |
| `4` | **Impossible** | `2.4×` attack clock | **capped at Hard density** | expert anti-chain ruleset |

Impossible keeps the unicorn responsive while making the world harsher:

- 2.4× hostile attack/cooldown pressure
- 1.5× enemy HP
- 1.25× hostile movement speed
- 1.25× hostile projectile speed
- 1.25× Husk Shift cadence
- substantially scarcer pickups
- cyan piercing volleys that cannot be parried or grazed and can hit through Rainbow/dash invulnerability
- Lucky 13 still grants spring readiness and score but no heart/shield sustain

The complete balance matrix lives in [`docs/difficulty-modes.md`](docs/difficulty-modes.md).

### Cyan piercing readability

Piercing shots are no longer differentiated by color alone. Their Canvas shape is a sharp directional spear/comet with a trailing streak, while ordinary kernels remain round. This keeps the mandatory-dodge rule readable under fast combat and for players who do not distinguish the colors strongly.

---

## 🌽 Splitcorn

The one-generation death hierarchy remains across all difficulties:

- **Cob Charger → 2 Kernel Kamikazes**
- **Pop-Gunner → 2 Kernel Kamikazes**
- **Prism Popper → 2 Pop-Gunners**
- **Husk Bruiser → 2 Pop-Gunners**

Split-born children are terminal and never split again, creating a kill → burst → cleanup rhythm without exponential growth.

---

## 👑 Impossible Encore

After the normal Trial 13 Cobtopus on Impossible, three signature bosses deploy together:

- Cobtopus
- Maize Monarch
- Husk Architect

Each original gets one false death and duplicates into two same-identity terminal copies. Victory remains locked until the entire terminal group is cleared.

Easy, Normal, and Hard still end normally after Trial 13.

---

## Core combat language

### Rainbow Spring

Moving the body opposite the horn direction generates charge:

```text
charge contribution = dot(movementDirection, -aimDirection)
```

### Rainbow Snap

A charged Space attack is simultaneously attack, dash, dodge, traversal, pickup routing, and combo setup. Recharge quickly and Snap again for **Double Rainbow**.

### Popcorn Graze

Skim an ordinary hostile kernel without touching the vulnerable body to gain **+13 score and spring energy**. Cyan piercing kernels do not participate in the Graze economy.

### Kernel Parry

Strike an ordinary incoming kernel with the horn to reflect it into the corn army. Reflected kernels damage enemies, grant score, and restore spring energy. Cyan piercing kernels must be dodged.

### Husk Shift

Trials 9 and 13 cycle arena blocks through:

```text
WARNING → SOLID COVER → OPEN ARENA
```

Enemies are ejected from forming blocks without taking free environmental damage, so the arena cannot solve boss fights for the player.

---

## 🏁 The 13 trials

1. Pastel Patch
2. Kernel Panic
3. Popcorn Front
4. Husk Maze
5. The Maize Monarch
6. Butter Blitz
7. Husk Armor
8. Prism Popcorn
9. The Husk Architect
10. Sugar Corn
11. Kernel Gauntlet
12. Double Cornbow
13. The Cobtopus

The campaign layers one movement/combat language rather than introducing thirteen unrelated gimmicks.

---

## 🚀 Play and build

### Competition artifact

For the easiest stable download, use:

[`dist/stretchicorn-js13k.zip`](dist/stretchicorn-js13k.zip)

The versioned release snapshot is:

[`dist/stretchicorn-desktop-v0.22.0.zip`](dist/stretchicorn-desktop-v0.22.0.zip)

Both contain one root-level self-contained `index.html` and are byte-identical.

### Readable source

```bash
git clone https://github.com/sidhulyalkar/stretchicorn.git
cd stretchicorn
python3 -m http.server 8080
```

### Build the exact competition release

```bash
python3 -m pip install zopfli==0.4.3
npm run release:competition
```

The release pipeline is deliberately different from the readable/Wavedash build:

```text
readable src
   ↓ custom safe golf
unpacked dist/index.html
   ├── VM regression + exact-artifact smoke
   ├── Wavedash build consumes this form
   ↓ Terser 5.50.0
   ↓ fixed deterministic Roadroller 2.1.0 model
   ↓ Zopfli 0.4.3 / 80 iterations
js13k ZIP
```

Roadroller is run twice under the fixed production model and its outputs are byte-compared before packaging. The stochastic compression tournament was used only to discover the model and is not part of normal releases.

---

## 📦 13KB engineering

Before Rainbow Theatre, v0.21.1 was essentially full:

```text
13,293 / 13,312 bytes
19 bytes free
```

The compression reclamation phase tested the current custom golf, Terser, Roadroller, combined Terser → Roadroller, deeper Roadroller search, and whole-document packing. The winning architecture was then frozen into a deterministic production recipe.

After implementing the complete Rainbow Theatre pass and all thirteen procedural chapter motifs, the exact v0.22.0 archive is:

```text
11,582 / 13,312 bytes
1,730 bytes free
```

Exact verified SHA-256:

```text
fa43b64d6dffa54d5d220f9ed9620697b3e04fe68ee5c7765dcf22925a4e63b1
```

So v0.22 is visually and structurally richer than v0.21.1 while retaining a substantial safety/iteration reserve instead of living one accidental semicolon from disqualification.

No external runtime images, fonts, music files, framework, or game engine are used.

---

## 🧪 Release validation

The release pipeline validates:

- all four difficulty launch values and retry preservation
- action/input invariants and 120 Hz input retention
- 60 Hz simulation/render gating
- Hard-density Impossible population cap
- Hard vs Impossible HP separation
- Impossible hostile movement/projectile and attack-clock scaling
- pickup scarcity and accelerated Husk Shift
- Impossible Lucky 13 without heart/shield sustain
- piercing generation, no piercing Graze reward, and damage through Rainbow invulnerability
- one-generation Splitcorn and no recursive children
- all three Impossible boss false deaths and terminal-copy cleanup
- true Impossible ending
- focus-loss auto-pause
- safe stage spawns
- bounded enemy/projectile populations during encore stress
- generated Canvas API safety
- offline/no-network runtime
- one-file root-level ZIP structure
- deterministic package equality
- exact 13,312-byte ceiling
- real Chromium and Firefox interaction smoke in the hardened release pipeline
- Wavedash isolation from the competition artifact

---

## Architecture

```text
stretchicorn/
├── index.html                 readable/Wavedash shell
├── src/
│   ├── 00-core.js             state, spawning, difficulty, procedural audio
│   ├── 01-combat.js           Snap, Parry, Graze, scoring, Splitcorn, grades
│   ├── 02-update.js           simulation, AI, tutorial, Impossible pressure
│   ├── 03-render.js           storybook art, chapter motifs, HUD, theatre
│   ├── 04-ui-input.js         menus, controls, title/victory flow
│   └── style.css
├── scripts/
│   ├── build.mjs              readable → compact standalone HTML
│   ├── pack-competition.mjs   deterministic Terser + Roadroller stage
│   ├── package.py             deterministic Zopfli ZIP
│   ├── verify-archive.py      ZIP structure/hash verification
│   ├── check-offline.mjs      offline/runtime audit
│   ├── browser-smoke.mjs      Chromium/Firefox interaction smoke
│   ├── test.mjs               source/VM regression suite
│   └── release-smoke.mjs      exact unpacked artifact semantic smoke
├── docs/
│   ├── rainbow-theatre-v0.22.md
│   └── difficulty-modes.md
└── dist/
    ├── stretchicorn-js13k.zip
    └── stretchicorn-desktop-v0.22.0.zip
```

---

## Credits

Designed and built for **js13kGames 2026 · Unicorns & Rainbows**.

No external runtime assets. Just JavaScript, Canvas, Web Audio, one resurrected elastic unicorn, and a corn world slowly remembering color. 🌈🦄🌽
