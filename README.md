<div align="center">

<a href="docs/stretchicorn-hero.png"><img src="docs/stretchicorn-hero.png" alt="Stretchicorn key art: a rainbow-stretched unicorn battling an angry corn army" width="1000"></a>

# 🌽🦄 STRETCHICORN

### **STRETCH · SNAP · SHUCK.**

**A tiny desktop action game where you play as an enchanted unicorn gifted the power to rainbow-stretch and fight off an army of angry corn across 13 chaotic trials!**

Built for **js13kGames 2026 · Unicorns & Rainbows**.

[**Download the current v0.21.0 competition ZIP**](dist/stretchicorn-desktop-v0.21.0.zip)

**13 hearts · 13 trials · 4 difficulty modes · way too much corn**

</div>

---

## What is Stretchicorn?

Stretchicorn is a fast arcade-action game built around one strange control idea: **the unicorn is controlled from both ends**.

You move the vulnerable body with one hand, steer the safe head and horn with the other, then pull the two apart to charge the rainbow stretched between them.

```text
PULL ←     ♥ BODY ═══════ 🌈 RAINBOW ═══════ 🦄 HEAD / HORN     → AIM
           vulnerable         safe                 safe
```

Only the **♥ body** takes damage. The head and rainbow can safely reach into danger to attack, collect power-ups, parry kernels and prepare the next launch.

When the unicorn lights up, press **Space** and turn that tension into a **Rainbow Snap**.

The result is part action game, part elastic slingshot, part bullet-dodging geometry puzzle, and part argument with a deeply unreasonable amount of corn.

---

## The game in 30 seconds

1. **Choose a difficulty.** Press `1` Easy, `2` Normal, `3` Hard, or `4` Impossible. Space / Enter starts Normal.
2. **Move the ♥ body with WASD.** This is the part enemies can hurt.
3. **Aim the head with the Arrow Keys.** The horn rotates smoothly through continuous angles.
4. **Pull the body away from the horn.** That loads the rainbow spring.
5. **Watch the unicorn light up.** Glow + boing means Rainbow Snap is ready.
6. **Press Space.** Launch through enemies, projectiles and pickups.
7. **Turn, recharge and chain another Snap.** Good routes become Double Rainbows, Parries, Grazes and score.

The strongest plays make one movement solve several problems at once: dodge a projectile, hit a cob, sweep through a power-up and set up the next attack before the rainbow finishes recoiling.

---

# 🌈 Four difficulty modes

Stretchicorn supports four complete campaign modes. Difficulty changes **pressure and resource economy**, not the feel of the unicorn.

| Mode | Launch key | Enemy density | Attack pressure | Friendly pickups | Intended feel |
|---|---:|---:|---:|---:|---|
| **Easy** | `1` | ~0.7× | ~0.7× | more frequent | learn the two-handed controls |
| **Normal** | `2` | 1.0× | 1.0× | original cadence | the original balanced campaign |
| **Hard** | `3` | ~1.3× | ~1.3× | less frequent | denser routing and faster decisions |
| **Impossible** | `4` | ~1.6× | ~1.6× | substantially scarcer | maximum corn pressure |

**Normal is the exact gameplay baseline.** Player movement speed, spring physics, damage rules, enemy movement speed and telegraph durations remain unchanged across modes. Harder modes increase how many threats you must solve and how often attacks arrive, without making warnings unfairly shorter.

Difficulty also scales boss reinforcement ceilings so late fights continue escalating instead of hitting the Normal population cap too early.

A few representative starting populations:

| Trial | Easy | Normal | Hard | Impossible |
|---|---:|---:|---:|---:|
| 1 · Pastel Patch | 3 | 5 | 6 | 8 |
| 5 · Maize Monarch | 3 | 4 | 5 | 6 |
| 9 · Husk Architect | 1 | 1 | 1 | **2 Architects** |
| 11 · Kernel Gauntlet | 14 | 21 | 28 | **34** |
| 13 · Cobtopus | 8 | 11 | 14 | **16** |

If you die and retry, the selected difficulty is preserved. Returning to the title screen is how you pick a new mode.

See [`docs/difficulty-modes.md`](docs/difficulty-modes.md) for the complete 52-stage/mode population matrix and scaling rules.

---

# 🎮 Controls

<div align="center">

<img src="docs/stretchicorn-controls.svg" alt="Stretchicorn control diagram: WASD moves the vulnerable body, arrow keys aim the safe head, Space attacks and Rainbow Snaps" width="900">

</div>

| Input | Action |
|---|---|
| **1 / 2 / 3 / 4** | Start Easy / Normal / Hard / Impossible from title |
| **W A S D** | Move the vulnerable ♥ body |
| **Arrow Keys** | Smoothly steer the safe head / horn |
| **Space** | Horn strike / Rainbow Snap |
| **P** | Pause / resume |
| **M** | Return to menu |
| **C** | Controls page |
| **R** | Rules page |
| **S** | Settings page |

### Custom controls

The Controls page supports persistent rebinding for all nine gameplay actions. Duplicate assignments swap rather than coexist. `M` and `P` remain reserved for menu/pause. Bindings persist through `localStorage`.

### Audio settings

Music and gameplay sounds are independently adjustable and persistent from OFF through 100%.

---

# 🌈 Core mechanics

## Rainbow Spring

The player is represented by two important points:

```text
A = vulnerable ♥ body
P = safe head / horn
```

The head is reconstructed from body position, aim direction and one scalar spring length:

```text
P = A + aimVector × springLength
```

This keeps the character elastic **without sacrificing aiming precision**. Arrow input owns the angle, the spring owns the distance, and WASD movement loads the spring.

### Pull to charge

Spring charge comes from movement opposite the horn direction. Pull straight backward and charge quickly. Move sideways and the contribution falls. Move toward the horn and the spring does not load.

### Rainbow Snap

A charged Space attack is attack, dash, traversal, dodge, pickup routing and combo setup in one verb.

### Double Rainbow

Recharge and Snap again during the short follow-up window for extra reach, damage, particles and safety.

### Popcorn Graze

Skim a hostile kernel without touching the ♥ body to gain **+13 score and spring energy**.

### Kernel Parry

Hit an incoming kernel with the horn to reflect it back into the corn army. Reflected kernels damage enemies and restore spring energy.

### Lucky 13

Every 13 defeated enemies triggers a Lucky 13 burst with health, shield, spring energy, score and rainbow spectacle.

---

# 🌽 The corn army

The campaign mixes a compact roster of enemies with different tactical roles rather than simply scaling health upward.

| Enemy | What it asks from you |
|---|---|
| **Kernel Kamikaze** | Keep moving and protect the ♥ body |
| **Cob Charger** | Read the telegraph and redirect the charge |
| **Pop-Gunner** | Graze, Parry or route around ranged pressure |
| **Prism Popper** | Handle curved multi-shot patterns |
| **Husk Bruiser** | Commit to damage against armor |
| **Husk Ram** | Use geometry and punish recovery |
| **Maize Monarch** | Adapt through a four-phase mid-game boss |
| **Husk Architect** | Read dynamic terrain while fighting |
| **Cobtopus** | Combine everything in the final trial |

---

# 🌽 Power-ups

Power-ups can be collected by the body **or anywhere along the stretched rainbow**.

| Pickup | Effect |
|---|---|
| **♥ Heart Kernel** | Restore one heart |
| **Husk Shield** | Absorb the next hit |
| **Butter Boost** | Temporary movement speed |
| **Prism Cob** | Easier spring charging |
| **Gold Cob** | Temporary 2× score |

Rainbow Snap temporarily increases collection reach, so efficient routes can attack and collect at the same time.

---

# 🧱 Husk Shift: dynamic arena geometry

Later trials introduce blocks that **warn, materialize, harden, protect, disappear and return somewhere else**.

```text
WARNING / MATERIALIZING   2.0 s
          ↓
SOLID COVER               2.35 s
          ↓
OPEN ARENA
          ↓
new layout + repeat
```

If the body is still inside when the block hardens, the player loses a life and is knocked out of the new geometry. Once solid, that same block becomes useful cover against hostile kernels. Then it disappears again.

### Trial 9: The Husk Architect

The Husk Architect is an armored miniboss designed to teach the dynamic-cover rhythm before the finale.

### Trial 13: The Cobtopus

Cobtopus combines radial projectile patterns, multiple health phases, adds and three-block Husk Shift formations.

---

# 🏁 The 13 trials

1. **Pastel Patch**
2. **Kernel Panic**
3. **Popcorn Front**
4. **Husk Maze**
5. **The Maize Monarch**
6. **Butter Blitz**
7. **Husk Armor**
8. **Prism Popcorn**
9. **The Husk Architect**
10. **Sugar Corn**
11. **Kernel Gauntlet**
12. **Double Cornbow**
13. **The Cobtopus**

You begin with **13 hearts** so a first run has enough room to learn the unusual controls before the campaign starts demanding precision.

---

# 🎵 POP DROP: procedural gaming EDM

Stretchicorn ships with **no audio files**. The soundtrack is synthesized at runtime with Web Audio oscillators and a tiny sequencer. Pitched kernel pops are shared between the soundtrack and gameplay so Parries, Grazes, enemy deaths and pickups become musical accents.

---

# 🚀 Play and install

## Competition build

1. Download [`dist/stretchicorn-desktop-v0.21.0.zip`](dist/stretchicorn-desktop-v0.21.0.zip).
2. Unzip it.
3. Open `index.html` in a modern desktop browser.
4. Choose a difficulty with `1` through `4`, or press Space / Enter for Normal.

The competition artifact is a self-contained single HTML file and works offline.

## Run the readable source locally

```bash
git clone https://github.com/sidhulyalkar/stretchicorn.git
cd stretchicorn
python3 -m http.server 8080
```

---

# 🌊 Wavedash build

The Wavedash integration lives only on the `platform/wavedash-v0.21.0` branch and stays **outside the 13KB competition artifact**.

### Direct dashboard upload

If you download this branch as a ZIP and upload the project directly through the Wavedash dashboard, use the repository-root `index.html` as the entry point. That shell now initializes the injected Wavedash SDK **after all five Stretchicorn runtime scripts have loaded**, reports 100% load progress, and calls `Wavedash.init()` so the Wavedash loading overlay is released.

This direct-upload handshake fixes the failure mode where a source-branch upload could sit forever at **0%** because the old root `index.html` never called the Wavedash SDK.

### CLI platform build

For a cleaner upload-only directory, the CLI path remains isolated:

```bash
npm run wavedash:build
npm run wavedash:test
npm run wavedash:dev
npm run wavedash:push
```

`wavedash:build` creates `wavedash-dist/index.html` from the compact game and appends the same Wavedash load/init handshake. `wavedash:test` verifies both upload paths and also asserts that `dist/index.html` contains **no Wavedash code**, protecting the js13k artifact.

First-time setup:

```bash
curl -fsSL https://wavedash.com/cli/install.sh | sh
wavedash auth login
wavedash init
```

Keep the generated `game_id` and configure:

```toml
game_id = "YOUR_REAL_GAME_ID"
upload_dir = "./wavedash-dist"
entrypoint = "index.html"
```

Then `npm run wavedash:push` creates the platform build, runs the handshake regression, and uploads it.

---

# 🧠 Architecture

```text
stretchicorn/
├── index.html              readable browser + direct Wavedash upload shell
├── src/
│   ├── 00-core.js          world state, stages, difficulty, geometry, audio
│   ├── 01-combat.js        damage, Snap, Parry, Graze, Lucky 13
│   ├── 02-update.js        fixed-step movement, spring physics, AI, difficulty
│   ├── 03-render.js        Canvas renderer, HUD, warnings
│   └── 04-ui-input.js      menus, difficulty launch, input, game loop
├── scripts/
│   ├── build.mjs
│   ├── build-wavedash.mjs
│   ├── test-wavedash.mjs
│   ├── package.py
│   ├── test.mjs
│   └── release-smoke.mjs
├── dist/                    js13k artifact
└── wavedash-dist/           generated platform upload folder
```

The competition and Wavedash paths are intentionally separate. Platform-specific code never consumes competition bytes.

---

# 📦 13KB engineering

The four-mode competition candidate remains **13,294 / 13,312 bytes**, leaving **18 bytes free**. The Wavedash wrappers are not part of that ZIP.

---

# 🧪 Validation

The regression suite covers all four launch modes, the full 52 stage/mode population matrix, pickup cadence, attack-pressure scaling, preserved telegraphs, high-refresh input, focus pause, HUSKSHIFT, Cobtopus, safe spawns, Impossible stress runs and the exact 13KB artifact.

The Wavedash branch adds a platform regression that checks:

- the root direct-upload shell calls `updateLoadProgressZeroToOne(1)` and `Wavedash.init()` after the runtime scripts,
- the generated `wavedash-dist/index.html` contains the same handshake,
- the js13k `dist/index.html` remains free of Wavedash platform code.

---

## Credits

Designed and built for **js13kGames 2026** around the theme **Unicorns & Rainbows**.

No external runtime assets. Just JavaScript, Canvas, Web Audio, one stretchy unicorn, and a corn problem that got considerably out of hand. 🌈🦄🌽
