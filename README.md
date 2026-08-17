<div align="center">

<a href="docs/stretchicorn-hero.png"><img src="docs/stretchicorn-hero.png" alt="Stretchicorn key art: a rainbow-stretched unicorn battling a hostile corn army" width="1000"></a>

# 🌽🦄 STRETCHICORN

### **STRETCH · SNAP · SHUCK.**

A tiny desktop action game where **your body is your health, your head is your weapon, and the rainbow between them is a spring**.

Built for **js13kGames 2026 · Unicorns & Rainbows**.

[**Download the current v0.20.6 competition ZIP**](dist/stretchicorn-desktop-v0.20.6.zip)

**13 hearts · 13 trials · way too much corn**

</div>

---

## What is Stretchicorn?

Stretchicorn is a fast, weird little action game built around one unusual control idea:

> **Move the vulnerable unicorn body with WASD, independently steer the safe head with the arrow keys, stretch the rainbow between them, then turn that tension into movement and attack.**

You do not control one conventional character hitbox. You control a two-point elastic creature:

```text
PULL ←     ♥ BODY ═══════ 🌈 RAINBOW ═══════ 🦄 HEAD / HORN     → AIM
           vulnerable         safe                 safe
```

Only the **♥ body** takes damage.

The head and rainbow are safe, which means dangerous space is not merely something to avoid. It can be used to:

- probe projectile lanes,
- parry incoming kernels,
- collect power-ups,
- attack around geometry,
- prepare Rainbow Snaps,
- create escape routes,
- convert enemy pressure into score and spring energy.

That asymmetry is the heart of the game.

<div align="center">

<a href="docs/stretchicorn-title-v017.png"><img src="docs/stretchicorn-title-v017.png" alt="Stretchicorn title-screen visual identity" width="900"></a>

</div>

---

# The game in 30 seconds

### 1. Move the vulnerable body

**WASD** moves the ♥ body through the arena.

### 2. Aim the safe head

**Arrow keys** smoothly rotate the head through continuous angles. The dashed aim ray and reticle show the exact horn trajectory.

### 3. Pull away from the horn

Move the body opposite the aim direction to load the rainbow spring.

```text
PULL ←     ♥════════════🌈════════════🦄     → AIM
```

A rear directional indicator brightens when your movement is aligned correctly.

### 4. Wait for the unicorn to light up

When the spring is ready, the whole unicorn glows and a procedural **boing** fires. The character itself becomes the readiness meter.

### 5. Press Space

A charged Space attack becomes **Rainbow Snap**: attack, dash, traversal, evasion and pickup routing in one move.

Then turn, recharge and do it again.

---

# Core combat loop

A strong Stretchicorn sequence feels less like standard twin-stick movement and more like drawing attack geometry through a hostile arena:

```text
aim
 ↓
pull body away
 ↓
charge Spring
 ↓
SNAP through a lane
 ↓
Graze / Parry incoming kernels
 ↓
turn during recovery
 ↓
recharge
 ↓
DOUBLE RAINBOW
```

The central design goal is that movement and offense reinforce each other rather than living in separate systems.

---

# 🎮 Controls

| Input | Action |
|---|---|
| **W A S D** | Move the vulnerable ♥ body |
| **Arrow Keys** | Smoothly steer the safe head |
| **Space** | Horn strike / Rainbow Snap |
| **P** | Pause / resume |
| **M** | Return to menu |
| **C** | Controls page |
| **R** | Rules page |
| **S** | Settings page |

## Custom controls

The Controls page supports persistent rebinding for all gameplay actions:

```text
↑ / ↓         select action
ENTER         begin rebinding
press a key   assign it
D             restore defaults
M / ESC       back
```

If a newly requested key is already in use, the two bindings **swap** instead of creating an ambiguous duplicate. Bindings persist through `localStorage`.

## Audio settings

Music and gameplay sounds are independent:

```text
Music        OFF / 25 / 50 / 75 / 100%
Game Sounds  OFF / 25 / 50 / 75 / 100%
```

Use **Up/Down** to choose a row and **Left/Right or Enter** to change its level. Settings persist locally between sessions.

---

# 🌈 Rainbow Spring

The spring system is the game's main movement language.

Stretchicorn is represented by two important points:

```text
A = vulnerable ♥ body
P = safe head / horn
```

The head is reconstructed from an authoritative aim direction and one scalar spring length:

```text
P = A + aimVector × springLength
```

That architecture is intentional. Earlier prototypes let the head behave like a freely moving 2-D spring body, which looked elastic but allowed movement to drag the head away from where the player believed they were aiming.

The final model separates the jobs cleanly:

```text
Arrow keys       → authoritative angle
Spring length    → elastic distance
WASD             → body movement + spring loading
```

This keeps the character stretchy without making attacks vague.

## Exact pull direction

Spring charge comes from movement opposite the horn direction. Conceptually:

```text
charge contribution = dot(movementDirection, -aimDirection)
```

Pull directly away and charge rises quickly. Move sideways and the contribution drops. Move toward the horn and the spring does not load.

The rear pull indicator communicates that geometry directly in the arena.

## Deterministic horn strikes

The game snapshots the aim angle the instant Space is pressed:

```text
aim ↗
SPACE
   ↓
kickA = aim
```

Rendering, hit detection, parry direction and knockback all use that same frozen angle during the brief active strike.

Movement can continue, but rotating the head cannot bend a horn attack that has already begun.

---

# Combat systems

## 🌈 Rainbow Snap

A charged Space attack simultaneously:

- extends the horn,
- launches the body,
- compresses the rainbow spring,
- damages enemies,
- crosses projectile patterns,
- grants a short safety window,
- traverses the arena,
- sweeps through power-ups.

One mechanic is movement, attack and routing at once.

## 🌈🌈 Double Rainbow

Recharge and Snap again inside the short post-Snap window for additional damage, reach, particles, invulnerability and combo retention.

## 🍿 Popcorn Graze

Hostile kernels have two meaningful radii around the ♥ body:

```text
far      → safe
near     → POPCORN GRAZE +13 + spring energy
contact  → damage
```

A dangerous projectile can therefore become a resource if you skim it precisely enough.

## 💥 Kernel Parry

Strike hostile popcorn with the horn to flip projectile ownership.

Reflected kernels:

- damage enemies,
- restore spring energy,
- award score,
- briefly create breathing room around the reflection.

Enemy pressure can become ammunition.

## 🍀 Lucky 13

Every 13 defeated enemies triggers a Lucky 13 burst:

- +1 heart up to 13,
- Husk Shield,
- spring energy,
- Snap-ready time,
- +130 score,
- rainbow-ring spectacle.

The number 13 is part of the actual game rules, not only the archive limit.

---

# 🌽 Power-ups

The pickups are tiny magical cobs rather than abstract UI tokens.

| Pickup | Effect | Strategic use |
|---|---|---|
| **♥ Heart Kernel** | Restore one heart | Stabilize a long run |
| **Husk Shield** | Absorb the next hit | Carry into dense boss patterns |
| **Butter Boost** | Faster body movement | Reposition and create wider Snap routes |
| **Prism Cob** | Easier spring charging | Aggressive chain setups |
| **Gold Cob** | Temporary 2× score | Combine with high combo / add waves |

The entire rainbow segment can collect a pickup, and Rainbow Snap temporarily increases the collection radius. A single route can attack, escape and collect without placing the vulnerable body directly on the item.

---

# 🌽 The corn army

The enemy roster is built from compact shared state rather than separate class hierarchies.

| Enemy | Tactical role |
|---|---|
| **Kernel Kamikaze** | Fast direct pressure on the ♥ body |
| **Cob Charger** | Telegraph → charge → recover |
| **Pop-Gunner** | Ranged popcorn pressure |
| **Prism Popper** | Curved multi-shot patterns for Graze/Parry play |
| **Husk Bruiser** | Slow armored threat |
| **Husk Ram** | Heavy armored charger |
| **Maize Monarch** | Four-phase mid-campaign boss |
| **Husk Architect** | Dynamic-geometry miniboss |
| **Cobtopus** | Final radial-pattern corn monstrosity |

Different enemies are intended to combine into decision pressure rather than simply larger health bars.

---

# 🧱 Dynamic arena geometry: Husk Shift

Later encounters introduce blocks that **materialize, harden, protect, disappear and return in new layouts**.

Every formation has a readable cycle:

```text
WARNING / MATERIALIZING   2.0 s
          ↓
SOLID COVER               2.35 s
          ↓
OPEN ARENA
          ↓
new layout + repeat
```

One incoming footprint is frozen around the player's current ♥ body position when the warning begins.

The block does **not** chase the player. It simply says:

> You were standing here. In two seconds this space will become dangerous.

If the ♥ body remains inside when the block hardens, the player loses one life and is knocked out of the new geometry.

Then the same block immediately changes roles.

### Warning phase

**Get out.**

### Solid phase

**Can I use this as cover?**

Hardened blocks:

- collide with the vulnerable body,
- constrain head/rainbow extension through them,
- absorb hostile kernels,
- create temporary projectile-safe lanes.

### Open phase

**Now there is no cover.**

The point is not simply to add another hazard. It is to make the arena repeatedly change what the player should value.

## Anti-cheese rule

Enemies inside a forming block are ejected **without taking damage**. Arena geometry can alter positioning, but it cannot automatically defeat the encounter for the player.

---

# 🌽 Trial 9: The Husk Architect

Trial 9 introduces the dynamic-geometry language through a dedicated **16-HP armored miniboss**.

The Husk Architect changes behavior with the arena state:

- while blocks are warning/solid, it orbits and fires compact **three-kernel fans**,
- during the completely open interval, it accelerates and fires wider **five-kernel fans**,
- it takes **no wall-collision damage**,
- charged Rainbow Snaps remain the efficient answer to its armor.

The intended loop is:

```text
READ incoming footprint
      ↓
RELOCATE body
      ↓
USE temporary cover
      ↓
SURVIVE open arena
      ↓
CHARGE + SNAP through a good lane
```

Trial 9 teaches the mechanic before the final fight asks the player to solve it under heavier pressure.

---

# 🐙 Cobtopus

The final boss remixes everything the player has learned.

Cobtopus combines:

- radial projectile patterns,
- increasingly aggressive health phases,
- Graze and Parry opportunities,
- Snap routing,
- dynamic three-block Husk Shift formations,
- deliberate **2.5-second no-cover windows**.

There are no permanent defensive walls in the final fight.

Every health-phase transition also clears the current geometry before the next warning cycle begins:

```text
phase changes
      ↓
cover disappears
      ↓
open-arena pressure
      ↓
new 2.0 s warning
      ↓
new tactical layout
```

Cover is useful, but camping is unstable. The player has to continually reinterpret the arena.

---

# 13 trials

The campaign contains 13 escalating encounters:

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

The progression is designed to add decisions gradually:

```text
early game     → body/head separation + Spring
mid game       → projectiles + Graze/Parry + armor
late game      → mixed enemy roles + geometry
Trial 9        → learn dynamic cover rhythm
Trial 13       → solve dynamic cover while fighting Cobtopus
```

The game begins with **13 hearts** because the control language is intentionally unfamiliar. A first run should provide enough runway to learn rather than turning onboarding into a restart loop.

---

# 🔊 POP DROP: procedural gaming-EDM

Stretchicorn contains **no music file**.

The current soundtrack is synthesized from Web Audio oscillators and a compact rhythmic sequencer.

Earlier experiments tried to fit sustained growls and talking/yoi bass into the background. The sounds were technically interesting, but in actual play they competed with the information carried by Snap, Parry, Graze, damage, pickups and enemy fire.

The final direction is more game-specific:

> **If kernels are already popping constantly, make the pop itself part of the instrument.**

## Kernel-pop voice

The main melodic percussion is a short pitched transient:

```text
high starting pitch
        ↓
rapid sine fall
        ↓
target note
```

The same sonic family is reused for enemy deaths, Parries, Grazes, shield breaks and pickups, so gameplay naturally adds accents to the musical texture instead of fighting it.

## Arcade / EDM / trap macro set

The compact eight-bar set moves between high-BPM arcade energy, sparse breaks and trap-flavored rhythm changes:

```text
168 → 174 BPM   build
178 BPM         pop drop
150 BPM         half-time trap switch
162 BPM         sparse break
184 BPM         high-speed peak
176 BPM         drop variation
154 BPM         trap fill
repeat on a new root
```

Kick/snare patterns are stored as compact bitmasks. Trap bars use more syncopated kicks, a half-time snare center and tiny late hat rolls. The melodic pop hook repeats a small recognizable pitch motif instead of producing random-note soup.

## Browser-safe audio

Every keyboard gesture calls a tiny `wake()` helper. The first user input creates/resumes Web Audio while execution is still user-initiated, preventing browsers from leaving a perfectly valid soundtrack trapped inside a suspended `AudioContext`.

## Audio-reactive background

The sequencer exposes one tiny shared `beat` envelope to the renderer.

```text
music event
    ↓
beat envelope
    ↓
rainbow tears / sparks / specks
```

No FFT. No analyser node. The game already knows where the beat is, so it reuses that knowledge.

The effect is intentionally restrained so gameplay remains more readable than the decoration.

---

# Visual and UX design

The entire runtime is procedural Canvas 2D.

The game uses:

- a dark storm/cornfield arena for contrast,
- a bright white unicorn silhouette,
- rainbow spring geometry as both character and state feedback,
- distinctive corn silhouettes for enemy recognition,
- large stage cards between encounters,
- direct in-world aim/pull indicators,
- character illumination instead of relying only on HUD meters,
- dedicated Controls, Rules and Settings pages so the title screen remains clean.

A recurring principle is:

> **Important information should live as close as possible to the thing it describes.**

The unicorn glows when Snap is ready. The pull arrow shows where to move. Future blocks draw their own warning footprints. The aim reticle shows exactly where the horn will fire.

---

# Design philosophy under 13KB

Stretchicorn optimizes three budgets at once.

### Byte budget

Can the feature fit, and can one implementation do several jobs?

### Attention budget

Can a first-time player understand the feature while angry corn is attacking them?

### Decision budget

Does the feature create an interesting choice, or merely another rule to memorize?

The strongest systems deliberately multiply their value:

**Rainbow spring** = character animation + charge feedback + attack + movement + traversal + pickup routing + theme.

**Projectiles** = danger + Graze + Parry + reflected damage + recharge + boss patterns.

**Husk blocks** = warning hazard + collision + cover + head constraint + projectile blocker + boss phase punctuation.

**Music clock** = song timing + kick/snare timing + kernel-pop hook + ambient visual timing.

That multiplicative approach is how a tiny game can feel substantially larger than its source budget.

---

# Implementation overview

## Runtime

- Canvas 2D rendering
- procedural Web Audio
- fixed 60 Hz simulation
- continuous arbitrary-angle keyboard aiming
- attack-angle snapshotting for deterministic horn strikes
- persistent custom keybindings
- independent Music / SFX mixer
- dynamic telegraphed arena geometry
- 13 hearts / 13 trials / Lucky 13
- single-file competition runtime
- no external runtime dependencies or assets

## Source layout

```text
stretchicorn/
├── README.md
├── CHANGELOG.md
├── index.html
├── package.json
├── netlify.toml
├── src/
│   ├── style.css
│   ├── 00-core.js       # world, geometry, audio, stages, Husk Shift data
│   ├── 01-combat.js     # Snap, Double Rainbow, damage, Parry, Lucky 13
│   ├── 02-update.js     # fixed-step movement, spring, AI, dynamic geometry
│   ├── 03-render.js     # Canvas world, corn, warnings, reactive ambience
│   └── 04-ui-input.js   # title/rules/settings/controls/rebinding/loop
├── scripts/
│   ├── build.mjs
│   ├── package.py
│   ├── check-size.mjs
│   ├── test.mjs
│   └── release-smoke.mjs
├── dist/
│   └── stretchicorn-desktop-v0.20.6.zip
└── docs/
    └── repository artwork
```

The readable source keeps descriptive names and comments. The competition artifact is generated from it.

---

# Build and run locally

No JavaScript dependencies are required for the game runtime.

```bash
npm run build
```

Then serve the repository with any simple local HTTP server, for example:

```bash
python3 -m http.server 8080
```

and open:

```text
http://localhost:8080
```

## Validate the release

```bash
npm test
npm run smoke
npm run package
npm run check:size
```

Or run the complete path:

```bash
npm run verify
```

The automated suite checks gameplay state, control rebinding, audio unlock, POP DROP sequencing, deterministic horn direction, all 13 stage layouts, Husk Shift warning/hardening behavior, Architect anti-cheese behavior, Cobtopus no-cover windows and the final archive size.

---

# Current release

## v0.20.6 · HUSKSHIFT

[**Download the competition ZIP**](dist/stretchicorn-desktop-v0.20.6.zip)

```text
13,311 / 13,312 bytes
1 byte free
```

v0.20.6 is the current stable competition build.

It combines the complete elastic-controller game with:

- POP DROP procedural gaming-EDM,
- persistent Music / SFX settings,
- custom Enter-based rebinding,
- precise horn-angle snapshots,
- Snap-ready unicorn illumination,
- corn-themed power-ups and enemy roster,
- the Husk Architect Trial 9 redesign,
- dynamic Husk Shift geometry,
- Cobtopus no-cover intervals,
- hardened release verification.

The competition runtime contains **no image assets, audio files, fonts, frameworks or game engine**. Everything players see and hear is generated at runtime.

---

# Why Trial 9 was redesigned

The previous late-game encounter used a **Cob Crusher** whose charge could damage itself against permanent walls.

In playtesting, that created an unintended dominant strategy:

> wait near the middle and let the boss repeatedly collide with the arena.

The problem was not that the boss needed more health. The problem was that the arena could solve the encounter for the player.

The redesign therefore followed six rules:

1. standing still should not be optimal,
2. danger should be telegraphed before becoming lethal,
3. the same geometry should be hazard and opportunity,
4. the boss must not die from environmental automation,
5. the mechanic should teach a skill that returns later,
6. the mechanic must respect the rule that only the ♥ body is vulnerable.

That thinking produced the Husk Architect and Husk Shift system described above.

---

# v0.20.6 release-engineering fix

v0.20.5 exposed an important build-system failure.

The source itself worked, but an unsafe identifier-golf pass rewrote the native Canvas call:

```js
X.save()
```

because the game also contained an internal helper named `save`.

The final competition HTML therefore ended up calling an invalid renamed Canvas member and stopped rendering partway through the title screen.

v0.20.6 fixes the **pipeline**, not merely the generated file.

### New rule

> **Never golf browser/API member names. Only explicitly vetted internal identifiers may be shortened.**

The release path is now:

```text
readable source
      ↓
safe comment / whitespace compaction
      ↓
vetted internal-only compaction
      ↓
dist/index.html
      ↓
TEST THIS EXACT FILE
      ↓
real-browser smoke validation
      ↓
ZIP THIS EXACT FILE
```

The regression tooling also rejects suspicious rewritten Canvas member calls before a release can pass.

The lesson is simple: under an extreme byte limit, **the final artifact is the product**. Source-level correctness is not enough if the optimization pipeline can silently change browser semantics.

---

# Release history

For the full development history, including CORNSTORM, BASSBOW, WUBCORN, SETFLOW, MIXER, POP DROP and HUSKSHIFT, see [CHANGELOG.md](CHANGELOG.md).

---

## Why this game exists

The 13KB constraint rewards mechanics that can be **understood visually, reused systemically and expressed with tiny amounts of code**.

Stretchicorn's central bet is that one unusual relationship between two points can support an entire action game:

```text
move the vulnerable body
steer the safe head
stretch the rainbow
turn tension into movement
turn danger into energy
turn temporary walls into decisions
```

The goal is not to imitate a much larger game at miniature scale. It is to make something that feels as if it could only have emerged from the constraint.

**Stretch the rainbow. Drop the pop. Read the husks. Shuck everything.** 🌈🔊🦄🌽
