<div align="center">

<a href="docs/stretchicorn-hero.png"><img src="docs/stretchicorn-hero.png" alt="Stretchicorn key art: a rainbow-stretched unicorn battling an angry corn army" width="1000"></a>

# 🌽🦄 STRETCHICORN

### **STRETCH · SNAP · SHUCK.**

A 13KB desktop arcade-action game where you control an enchanted unicorn from both ends, stretch a rainbow spring, and fight an increasingly unreasonable corn army across 13 trials.

Built for **js13kGames 2026 · Unicorns & Rainbows**.

[**Download the v0.21.1 competition build**](dist/stretchicorn-desktop-v0.21.1.zip)

**13 hearts · 13 trials · 4 difficulty modes · one secret Impossible finale**

</div>

---

## What is Stretchicorn?

Stretchicorn is built around one unusual controller:

```text
PULL ←     ♥ BODY ═══════ 🌈 RAINBOW ═══════ 🦄 HEAD / HORN     → AIM
           vulnerable         safe                 safe
```

- **WASD** moves the vulnerable heart-body.
- **Arrow Keys** steer the safe head and horn.
- Pull the body away from the horn to load the rainbow spring.
- When the unicorn lights up, press **Space** to launch a **Rainbow Snap**.

Only the body takes damage. The head and rainbow can safely reach into danger to attack, collect power-ups, Graze ordinary kernels, Parry projectiles, and set up another launch.

Strong play turns one movement into several jobs at once: dodge, attack, collect, reposition, recharge, then chain the next Snap.

---

## 🎮 Controls

<div align="center">
<img src="docs/stretchicorn-controls.svg" alt="Stretchicorn controls: WASD body movement, arrows head aim, Space attack" width="900">
</div>

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

Space or Enter from the title screen starts **Normal**. Game Over retries preserve the selected difficulty. Controls are persistently rebindable, while `M` and `P` remain reserved so custom bindings cannot strand the player in a run.

---

## 🌈 Difficulty ladder

v0.21.1 rebuilds the top of the difficulty curve around a specific playtest finding: **more enemies can actually make the game easier for expert players** because dense rooms provide more chain targets, more Lucky 13 triggers, and more opportunities to remain permanently aggressive.

Impossible therefore stops scaling population beyond Hard density and instead attacks the systems that expert players were exploiting.

| Key | Mode | Pressure scalar | Population | Purpose |
|---|---|---:|---|---|
| `1` | **Easy** | `0.7×` | reduced | learn the controller |
| `2` | **Normal** | `1.0×` | baseline | authored campaign |
| `3` | **Hard** | `1.6×` | high | old top difficulty |
| `4` | **Impossible** | `2.4×` attack clock | **capped at Hard density** | expert anti-chain ruleset |

Representative starting populations:

| Trial | Easy | Normal | Hard | Impossible |
|---|---:|---:|---:|---:|
| 1 · Pastel Patch | 3 | 5 | 8 | **8** |
| 5 · Maize Monarch | 3 | 4 | 6 | **6** |
| 9 · Husk Architect | 1 | 1 | 2 | **2** |
| 11 · Kernel Gauntlet | 14 | 21 | 34 | **34** |
| 13 · Cobtopus | 8 | 11 | 16 | **16** |

### Impossible anti-chain rules

Impossible keeps the unicorn responsive and preserves normal combo scoring, Rainbow Snap, and Double Rainbow timing. The world gets harsher instead:

- **2.4× hostile attack/cooldown pressure**
- **1.5× enemy HP**
- **1.25× hostile movement speed**
- **1.25× hostile projectile speed**
- **1.25× Husk Shift cadence**
- substantially **scarcer pickups**
- **cyan piercing volleys** that cannot be parried or grazed and can hit through Rainbow/dash invulnerability
- **Lucky 13 no longer restores a heart or grants a shield** on Impossible

Lucky 13 still grants spring readiness, `+130` score, and its celebration, so chaining remains valuable without becoming a renewable survival engine.

The complete balance matrix and design rationale live in [`docs/difficulty-modes.md`](docs/difficulty-modes.md).

---

## 🌽 Splitcorn

v0.21.1 also adds a one-generation death hierarchy across every difficulty. Tough regular corn creates a brief cleanup phase instead of simply disappearing:

- **Cob Charger → 2 Kernel Kamikazes**
- **Pop-Gunner → 2 Kernel Kamikazes**
- **Prism Popper → 2 Pop-Gunners**
- **Husk Bruiser → 2 Pop-Gunners**

Split-born children are terminal and never split again. This creates a kill → burst → cleanup rhythm without exponential swarm growth.

The mechanic changes target priority: deleting an elite is still rewarding, but the player must account for the immediate local pressure created by its descendants.

---

## 👑 Impossible Encore

Trial 13 is a false summit on Impossible.

Defeating the original Cobtopus clears the arena and deploys three signature bosses together:

- **Cobtopus** with radial and curved projectile pressure
- **Maize Monarch** with phased aimed fans and reinforcements
- **Husk Architect** with projectile fans and shifting arena geometry

Each original encore boss gets one false death:

- **Maize Monarch → 2 Maize Monarchs**
- **Cobtopus → 2 Cobtopuses**
- **Husk Architect → 2 Husk Architects**

The six possible descendants are terminal. The finale can therefore escalate from three originals to at most six copies without unbounded recursion. Victory remains locked until every terminal boss is gone, which unlocks the special **IMPOSSIBLE!** ending.

Easy, Normal, and Hard still end normally after the Trial 13 Cobtopus.

---

## 🌈 Core mechanics

### Rainbow Spring

The Arrow Keys own the head angle while body-to-head distance behaves like a compact spring. Moving the body opposite the horn direction generates charge:

```text
charge contribution = dot(movementDirection, -aimDirection)
```

### Rainbow Snap

A charged Space attack is simultaneously an attack, dash, dodge, traversal tool, pickup route, and combo setup. Recharge quickly and Snap again for a **Double Rainbow** with more reach, damage, and safety.

### Popcorn Graze

Skim an ordinary hostile kernel without touching the body to gain **+13 score and spring energy**. Cyan piercing kernels deliberately do not participate in this economy.

### Kernel Parry

Hit an ordinary incoming kernel with the horn to reflect it into the corn army. Reflected kernels damage enemies, grant score, and restore spring energy. Cyan piercing kernels must be dodged instead.

### Husk Shift

Trials 9 and 13 use dynamic blocks that cycle through warning, solid cover, and open arena states:

```text
WARNING  → get out
SOLID    → exploit the cover
OPEN     → survive without it
```

Enemies are ejected from forming blocks without taking free environmental damage, so the arena cannot solve boss fights for the player.

---

## 🏁 The 13 trials

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

The campaign layers one control language instead of introducing thirteen disconnected gimmicks. Early stages teach body/head separation and Snap timing. Midgame adds Graze, Parry, armor, and terrain. Late stages ask the player to combine all of those verbs under sustained pressure.

---

## 🎵 POP DROP

Stretchicorn contains **no audio files**. Music and SFX are synthesized at runtime with Web Audio oscillators.

The procedural soundtrack moves through arcade-EDM, trap-flavored switches, and high-speed peaks. Parries, Grazes, enemy deaths, and pickups reuse the same pitched kernel-pop family, so strong play becomes part of the percussion.

Music and SFX have independent persistent volume controls, including genuine zero-allocation `OFF` states.

---

## 🚀 Play and build

### Competition artifact

1. Download [`dist/stretchicorn-desktop-v0.21.1.zip`](dist/stretchicorn-desktop-v0.21.1.zip).
2. Unzip it.
3. Open `index.html` in a modern desktop browser.
4. Choose a difficulty with `1` through `4`, or press Space / Enter for Normal.

The archive contains one self-contained HTML file and works offline.

### Readable source

```bash
git clone https://github.com/sidhulyalkar/stretchicorn.git
cd stretchicorn
python3 -m http.server 8080
```

### Verify the release

```bash
python3 -m pip install zopfli
npm run verify
```

Useful commands:

```bash
npm run build       # generate dist/index.html
npm test            # production-VM regression suite
npm run smoke       # exact-artifact smoke test
npm run package     # deterministic ZIP
npm run check:size  # enforce the 13,312-byte limit
npm run verify      # all release gates
```

---

## 🧠 Architecture

```text
stretchicorn/
├── index.html
├── src/
│   ├── 00-core.js       state, spawning, geometry, difficulty, audio
│   ├── 01-combat.js     Snap, Parry, Graze, scoring, Splitcorn, finale
│   ├── 02-update.js     fixed 60 Hz simulation, AI, Impossible pressure
│   ├── 03-render.js     Canvas art, HUD, boss identities, warnings
│   ├── 04-ui-input.js   menus, difficulty launch, controls, victory flow
│   └── style.css
├── scripts/
│   ├── build.mjs
│   ├── package.py
│   ├── check-size.mjs
│   ├── test.mjs
│   └── release-smoke.mjs
└── dist/
    └── stretchicorn-desktop-v0.21.1.zip
```

Gameplay advances through a fixed **60 Hz accumulator**. Rendering occurs only after a useful simulation step, avoiding redundant full Canvas paints on 120 / 144 / 240 Hz displays while preserving gameplay cadence.

---

## 📦 13KB engineering

The current deterministic v0.21.1 competition archive is:

```text
13,293 / 13,312 bytes
19 bytes free
```

The runtime contains no external images, fonts, music files, framework, or game engine. Repository artwork and diagrams are documentation only.

The readable source stays understandable while the release builder performs a tightly controlled minification and identifier-golfing pass on the generated competition artifact. The build also aliases `Math` and strips nonessential shell bytes to preserve room for gameplay.

---

## 🧪 Release validation

The exact generated artifact is regression-tested for:

- all four difficulty launch values and retry preservation
- Hard-density population cap on Impossible
- Hard vs Impossible HP separation
- Impossible hostile movement/projectile speed and attack-clock scaling
- pickup scarcity and accelerated Husk Shift
- Impossible Lucky 13 with no heart/shield sustain
- cyan piercing-volley generation, no Graze reward, and damage through dash/Rainbow invulnerability
- one-generation Splitcorn mappings and no recursive child splitting
- one-time duplication of all three Impossible encore bosses
- terminal boss-copy cleanup and the true Impossible ending
- Hard receiving no boss-rush duplication
- 120 Hz input retention and 60 Hz render gating
- focus-loss auto-pause
- safe stage spawns
- bounded enemy/projectile populations during an Impossible encore stress run
- generated Canvas API safety
- deterministic ZIP integrity and the exact **13,312-byte** competition limit

---

## Credits

Designed and built for **js13kGames 2026** around the theme **Unicorns & Rainbows**.

No external runtime assets. Just JavaScript, Canvas, Web Audio, one elastic unicorn, and a corn problem that learned how to split itself. 🌈🦄🌽
