<div align="center">

<a href="docs/stretchicorn-hero.png"><img src="docs/stretchicorn-hero.png" alt="Stretchicorn key art: a rainbow-stretched unicorn battling an angry corn army" width="1000"></a>

# 🌽🦄 STRETCHICORN

### **STRETCH · SNAP · SHUCK.**

**A tiny desktop action game where you rainbow-stretch an enchanted unicorn through 13 increasingly chaotic trials against an aggressively unreasonable corn army.**

Built for **js13kGames 2026 · Unicorns & Rainbows**.

[**Download v0.21.1 IMPOSSIBLE ENCORE**](dist/stretchicorn-desktop-v0.21.1.zip)

**13 hearts · 13 trials · 4 difficulty modes · one secret boss-rush finale**

</div>

---

## What is Stretchicorn?

Stretchicorn is an arcade-action game built around one unusual control idea: **you control the unicorn from both ends**.

```text
PULL ←     ♥ BODY ═══════ 🌈 RAINBOW ═══════ 🦄 HEAD / HORN     → AIM
           vulnerable         safe                 safe
```

- **WASD** moves the vulnerable ♥ body.
- **Arrow Keys** steer the safe head and horn.
- Pull the body away from the horn to load the rainbow spring.
- When the unicorn lights up, press **Space** to convert that tension into a **Rainbow Snap**.

Only the ♥ body takes damage. The head and rainbow can safely reach into danger to attack, collect power-ups, Graze kernels, Parry projectiles and set up the next launch.

The strongest plays make one movement solve several problems at once: dodge a kernel, lance through a cob, sweep up a power-up and land already positioned for another Snap.

---

# 🌈 Four difficulty modes

v0.21.1 substantially rebuilds the top of the difficulty ladder.

| Key | Mode | Pressure | What changes |
|---|---|---:|---|
| `1` | **Easy** | `0.7×` | fewer enemies, slower attack pressure, more forgiving pickups |
| `2` | **Normal** | `1.0×` | the original balanced Stretchicorn campaign |
| `3` | **Hard** | `1.6×` | the former Impossible mode, now correctly labeled as a serious challenge |
| `4` | **Impossible** | `2.4×` | extreme density plus HP, movement, projectile, terrain and resource scaling |

Pressing **Space / Enter** on the title screen always starts Normal. A Game Over retry preserves the selected difficulty.

### Hard

Hard is the old top difficulty intact: approximately **1.6× stage density / attack pressure**, higher reinforcement ceilings and scarcer power-ups. It keeps enemy HP, hostile movement speed and Husk Shift timing at their normal values, so it remains demanding without becoming a different ruleset.

### Impossible

Impossible is now designed as a genuinely different survival problem rather than simply “a little more corn.” It combines:

- **2.4× pressure scalar** for initial stage populations and enemy attack clocks,
- **1.5× enemy HP**,
- **1.25× enemy movement speed**,
- **1.25× hostile projectile speed**,
- **1.25× Husk Shift cycle speed**,
- substantially **scarcer friendly power-ups**,
- higher boss reinforcement ceilings.

The unicorn itself stays responsive. Player movement, spring feel and damage-per-hit are not nerfed. Impossible makes the *world* more dangerous instead of making the controls unpleasant.

Representative starting populations:

| Trial | Easy | Normal | Hard | Impossible |
|---|---:|---:|---:|---:|
| 1 · Pastel Patch | 3 | 5 | 8 | **12** |
| 5 · Maize Monarch | 3 | 4 | 6 | **8** |
| 9 · Husk Architect | 1 | 1 | 2 | **2** |
| 11 · Kernel Gauntlet | 14 | 21 | 34 | **50** |
| 13 · Cobtopus | 8 | 11 | 16 | **22** |

The complete scaling matrix lives in [`docs/difficulty-modes.md`](docs/difficulty-modes.md).

---

# 👑 Impossible Encore

Beating Trial 13 on Impossible is **not the ending anymore**.

When the first Cobtopus falls, the arena clears, Husk Shift begins a fresh warning cycle, and the three signature bosses deploy together:

```text
         MAIZE MONARCH        COBTOPUS
              🌽                 🐙🌽

                    ♥🌈🦄

              HUSK ARCHITECT
                   🌽▦
```

You must survive:

- **Cobtopus** radial and curved projectile pressure,
- **Maize Monarch** phased aimed fans and reinforcements,
- **Husk Architect** projectile fans plus shifting arena geometry,
- all at the **same time**.

The normal victory state is locked until every encore boss is defeated. Clearing the trio unlocks the special **IMPOSSIBLE!** ending.

Hard, Normal and Easy still end normally after the Trial 13 Cobtopus.

---

# 🎮 Controls

<div align="center">
<img src="docs/stretchicorn-controls.svg" alt="Stretchicorn controls: WASD body movement, arrows head aim, Space attack" width="900">
</div>

| Input | Action |
|---|---|
| **1 / 2 / 3 / 4** | Start Easy / Normal / Hard / Impossible from title |
| **W A S D** | Move the vulnerable ♥ body |
| **Arrow Keys** | Smoothly steer the safe head / horn |
| **Space** | Horn strike / Rainbow Snap |
| **P** | Pause / resume |
| **M** | Return to menu |
| **C** | Controls / rebinding |
| **R** | Rules |
| **S** | Music + SFX settings |

Controls are persistently rebindable. Duplicate assignments swap cleanly, while `M` and `P` remain reserved so custom bindings cannot strand the player inside a run.

---

# 🌈 Core mechanics

### Rainbow Spring

The head angle belongs to the Arrow Keys. The body-to-head distance behaves like a compact one-dimensional spring. Moving the body opposite the horn direction generates charge:

```text
charge contribution = dot(movementDirection, -aimDirection)
```

This preserves precise aim while still letting the unicorn stretch, recoil and launch.

### Rainbow Snap

A charged Space attack is simultaneously:

- an attack,
- a dash,
- a dodge,
- traversal,
- pickup routing,
- combo setup.

Recharge quickly and Snap again for a **Double Rainbow**, increasing reach, damage and safety.

### Popcorn Graze

Skim a hostile kernel without touching the ♥ body:

```text
far      → safe
near     → GRAZE +13 + spring
contact  → damage
```

### Kernel Parry

Strike an incoming kernel with the horn to reflect it back into the corn army. Reflected kernels damage enemies, grant score and refill spring energy.

### Lucky 13

Every 13 kills triggers a burst of health, shield, spring energy and score. It is both a comeback mechanic and an incentive to stay aggressive when the arena gets crowded.

---

# 🌽 Enemy roster

| Enemy | Tactical role |
|---|---|
| **Kernel Kamikaze** | body-pressure pursuit |
| **Cob Charger** | telegraphed wall-crash attack |
| **Pop-Gunner** | ranged kernel pressure |
| **Prism Popper** | curved multi-shot patterns |
| **Husk Bruiser** | armored commitment check |
| **Husk Ram** | geometry + recovery punishment |
| **Maize Monarch** | four-phase aimed-fan boss |
| **Husk Architect** | dynamic-cover boss |
| **Cobtopus** | radial final boss with adds and Husk Shift |

Only Cob Chargers receive environmental wall-smash damage. Bosses cannot accidentally lose the fight to the arena.

---

# 🧱 Husk Shift

Trials 9 and 13 introduce dynamic blocks that change meaning over time:

```text
WARNING  → get out
SOLID    → use it as cover
OPEN     → survive without it
```

The warning footprint freezes in place instead of chasing the player. When it hardens, anything still inside is ejected. Enemies are moved out safely rather than taking free environmental HP loss.

Impossible accelerates this entire cycle by 25%, which means the player has less downtime between geometry decisions while also handling denser projectile fields.

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

The campaign layers the control language rather than introducing thirteen disconnected gimmicks. Early trials teach body/head separation and Snap timing. Midgame adds Graze, Parry, armor and geometry. Late trials ask the player to combine those verbs under sustained pressure.

---

# 🎵 POP DROP

Stretchicorn contains **no audio files**. Music and SFX are synthesized at runtime using Web Audio oscillators.

The procedural soundtrack moves through arcade-EDM, trap-flavored switches and high-speed peaks while gameplay sounds use the same pitched kernel-pop family. Parries, Grazes and enemy deaths therefore feel like little percussive additions to the soundtrack rather than unrelated effects pasted on top.

Music and SFX have independent persistent volume controls, including genuine zero-allocation `OFF` states.

---

# 🚀 Play / build

### Competition build

1. Download [`dist/stretchicorn-desktop-v0.21.1.zip`](dist/stretchicorn-desktop-v0.21.1.zip).
2. Unzip it.
3. Open `index.html` in a modern desktop browser.
4. Choose a difficulty with `1` through `4`, or press Space / Enter for Normal.

The competition artifact is one self-contained HTML file and works offline.

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

Useful individual commands:

```bash
npm run build
npm test
npm run smoke
npm run package
npm run check:size
```

---

# 🧠 Architecture

```text
stretchicorn/
├── index.html
├── src/
│   ├── 00-core.js       state, spawning, geometry, difficulty, audio
│   ├── 01-combat.js     Snap, Parry, Graze, scoring, boss-rush transition
│   ├── 02-update.js     fixed 60 Hz simulation, AI, Impossible scaling
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

Gameplay advances through a fixed **60 Hz accumulator**. Rendering occurs only after a useful simulation step, avoiding redundant full Canvas paints on 120 / 144 / 240 Hz displays while preserving the game's intended update cadence.

---

# 📦 13KB engineering

The v0.21.1 candidate archive is:

```text
13,308 / 13,312 bytes
4 bytes free
```

The Impossible Encore needed far more behavior than the previous 18-byte reserve could hold, so the release also reclaims bytes without removing gameplay:

- dead player-head velocity state was removed,
- the competition-only HTML shell was shortened,
- the responsive Canvas CSS was compacted,
- the build aliases `Math` once and reuses the shorter identifier,
- the new encore function participates in the safe identifier-golfing pass.

The readable source remains understandable. Only the generated competition artifact receives those byte-level transformations.

---

# 🧪 Validation

The exact built artifact is regression-tested for:

- Easy / Normal / Hard / Impossible launch values and Trial 1 density,
- Space / Enter Normal shortcut and retry preservation,
- Hard preserving the former Impossible HP behavior,
- Impossible 1.5× HP scaling,
- Impossible hostile movement and projectile acceleration,
- Impossible pickup scarcity and faster Husk Shift cycle,
- the Cobtopus → three-boss Encore transition,
- no premature victory while another encore boss remains,
- the final special Impossible victory state,
- Hard finishing normally without the encore,
- 120 Hz attack-input retention and render gating,
- blur auto-pause,
- Husk Shift warning / harden behavior,
- safe player spawning across all 13 Normal trials,
- bounded entity / projectile populations during an Impossible encore stress simulation,
- generated Canvas API safety,
- exact ZIP size below **13,312 bytes**.

The deterministic v0.21.1 ZIP is **13,308 bytes**, leaving only **4 bytes** in the byte vault.

---

# 🔧 v0.21.1 · IMPOSSIBLE ENCORE

This release exists because the previous Impossible could be cleared too comfortably. The old mode has been promoted to **Hard**, while Impossible now attacks several difficulty dimensions simultaneously and hides one final fight behind the Cobtopus.

The intended ladder is now:

```text
Easy        learn the strange controller
Normal      play the authored baseline
Hard        master the original campaign under heavy pressure
Impossible  survive an intentionally vicious ruleset, then prove it again
```

No new player verb was added. The difficulty comes from recombining the systems already learned across the campaign at much greater intensity.

---

## Credits

Designed and built for **js13kGames 2026** around the theme **Unicorns & Rainbows**.

No external runtime assets. Just JavaScript, Canvas, Web Audio, one elastic unicorn, and a corn problem that has now developed a second final boss fight. 🌈🦄🌽
