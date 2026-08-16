<div align="center">

<a href="docs/stretchicorn-hero.png"><img src="docs/stretchicorn-hero.png" alt="Stretchicorn key art: a rainbow-stretched unicorn battling a chaotic corn army" width="1000"></a>

# 🌽🦄 STRETCHICORN

### **STRETCH · SNAP · SHUCK.**

A tiny desktop action game where **your body is your health, your head is your weapon, and the rainbow between them is a spring**.

Built for **js13kGames 2026 · Unicorns & Rainbows**.

[**Download the v0.20.2 competition ZIP**](dist/stretchicorn-desktop-v0.20.2.zip)

**13 hearts · 13 trials · way too much corn**

</div>

---

## What is Stretchicorn?

Stretchicorn started with one deliberately strange control idea:

> **Move the vulnerable unicorn body, independently steer the safe head, pull the body away from the horn to load the rainbow, then release the stored tension as movement and attack.**

That rule became the entire game.

You are not moving a conventional single hitbox. You are controlling a two-point elastic creature:

```text
PULL ←     ♥ BODY ═══════ 🌈 RAINBOW ═══════ 🦄 HEAD / HORN     → AIM
           vulnerable         safe                 safe
```

Only the **♥ body** can be hurt. The head and rainbow can deliberately occupy dangerous space, intercept projectiles, collect pickups, attack around obstacles, and establish the geometry for the next launch.

Then the corn arrived.

The enemy roster, bosses, projectiles, power-ups and arena language were rebuilt around the Stretchi**CORN** joke so the name is no longer just a pun. You now fight Kernel Kamikazes, Pop-Gunners, Husk Rams, the Maize Monarch and finally the deeply unreasonable **Cobtopus**.

<div align="center">

<a href="docs/stretchicorn-title-v017.png"><img src="docs/stretchicorn-title-v017.png" alt="Stretchicorn title screen and animated unicorn-versus-corn presentation" width="1000"></a>

</div>

---

# Current release: v0.20.2 MIXER

v0.20.2 is the current stable competition build. It preserves the responsive SETFLOW controller and procedural dubstep system while adding a proper **Settings** page with independent **Music** and **Game Sounds** volume controls.

This release deliberately favors reliability over exotic build tricks. After an experimental v0.21 branch failed to load reliably in a playtest, the project was rebuilt from the last proven working gameplay branch and returned to one canonical release path:

```text
readable source
      ↓
safe comment / whitespace compaction
      ↓
dist/index.html
      ↓
TEST THIS EXACT HTML
      ↓
ZIP THIS EXACT HTML
```

There is no hidden competition-only gameplay rewrite after testing.

### Current archive

```text
13,308 / 13,312 bytes
4 bytes free
```

Yes, four. 🌽

The competition runtime contains **no image assets, audio files, fonts, frameworks or game engine**. The promotional images above live only in the repository and are not part of the submission ZIP.

---

# Quick start

### Default controls

| Input | Action |
|---|---|
| **W A S D** | Move the vulnerable ♥ body |
| **Arrow Keys** | Smoothly steer the safe head |
| **Space** | Horn strike / Rainbow Snap |
| **P** | Pause / resume |
| **M** | Return to menu |
| **C** | Controls page from title screen |
| **R** | Rules page from title screen |
| **S** | Settings page from title screen |

The game intentionally has very few gameplay buttons. Depth comes from the relationship between body movement, aim direction, stored spring energy, projectile geometry and timing.

## Custom controls

The **Controls** page supports real persistent rebinding for all nine gameplay actions:

```text
↑ / ↓         select action
ENTER         start rebinding
press a key   assign it
D             restore defaults
M / ESC       back
```

Rebinding is not cosmetic. The input layer actually reads the customized mapping during gameplay.

If the requested key is already used by another action, the two bindings **swap** instead of creating an ambiguous duplicate. Bindings are saved through `localStorage` and restored on the next session.

## Settings

Press **S** on the title screen.

Music and gameplay sound effects are controlled independently:

```text
MUSIC       OFF · 25% · 50% · 75% · 100%
SFX         OFF · 25% · 50% · 75% · 100%
```

Use **Up/Down** to choose a row and **Left/Right or Enter** to change the level. Settings persist locally.

That separation matters because the soundtrack is intentionally energetic while Graze, Parry, Snap, hit and boss sounds carry gameplay information. A player can lower the music without losing combat feedback, or mute SFX without disabling the procedural set.

---

# The elastic controller

Stretchicorn is represented by two important points:

```text
A = vulnerable ♥ body / rear anchor
P = safe head / horn endpoint
```

The head is reconstructed every fixed update from the body position, aim angle and one scalar spring length:

```text
P = A + aimVector × springLength
```

That decision is one of the most important pieces of the project.

Earlier prototypes allowed the head to behave as a freely moving 2-D spring body. It looked elastic, but movement continuously dragged the head away from the player's intended attack direction. The final architecture separates precision from elasticity:

```text
Arrow keys       → authoritative angle
Spring length    → elastic distance
WASD             → body movement + spring loading
```

The result keeps the visual rebound and stretch while preserving predictable aiming.

## Continuous aiming

Arrow input is converted into a target angle and the current aim rotates toward it smoothly. The final tuning uses a fast angular response while retaining arbitrary intermediate angles.

The player is not restricted to eight discrete directions.

A dashed attack ray and endpoint reticle communicate the exact current horn trajectory. A second indicator behind the ♥ body points in the opposite direction and brightens when body movement is correctly aligned to charge the spring.

So the arena itself answers both questions:

```text
Where will I attack?     → reticle
Where should I pull?     → rear arrow
```

## Deterministic horn direction

Horn attacks snapshot the aim angle the instant **Space** is pressed.

```text
aim ↗
SPACE
   ↓
kickA = aim
   ↓
render + hitbox + parry + knockback all use kickA
```

That means rotating or moving during the short active horn animation cannot bend the collision direction away from what the player saw when they committed.

Movement remains available. Only the attack direction is stabilized for the strike.

---

# Rainbow Spring

Spring charge comes from the relationship between movement and horn direction.

Conceptually:

```text
away = dot(movementDirection, -aimDirection)
```

Pull directly away from the horn and charge rises quickly. Move sideways and the contribution falls. Move toward the horn and the spring does not load.

The threshold is intentionally reached with a **short purposeful pull**, not a full-arena stretch. Rainbow Snap is meant to become normal movement vocabulary rather than a rare super move.

## Snap-ready feedback

When the player crosses the spring threshold, several cues fire together:

- a procedural **boing**,
- rainbow sparks along the stretched body,
- a pulsing ring at the head,
- a whole-character rainbow aura.

The unicorn itself becomes the meter.

That is an intentional usability principle: in a dense boss pattern, the player should not need to stare at a tiny HUD bar to know that the main movement verb is ready.

---

# Combat grammar

## 🌈 Rainbow Snap

A charged attack does several jobs at once:

- horn attack,
- forward launch,
- evasive dash,
- traversal,
- brief safety window,
- combo extension,
- power-up routing,
- visual payoff.

This multi-use design is crucial to both the gameplay and the byte budget. Movement and offense reinforce one another instead of living in separate systems.

## 🌈🌈 Double Rainbow

A short chaining window remains after a Snap. Recharge and Snap again before it expires to trigger **Double Rainbow**.

The follow-up gets additional reach, damage, particles and safety, encouraging players to stay active after committing instead of resetting to passive neutral play.

A strong rhythm becomes:

```text
Snap
  ↓
turn during recovery
  ↓
Graze / Parry incoming fire
  ↓
short pull
  ↓
Double Rainbow
  ↓
route into the next setup
```

## 🍿 Popcorn Graze

Hostile kernels use two meaningful radii around the ♥ body:

```text
far away     → safe
near miss    → POPCORN GRAZE +13 + spring energy
body contact → damage
```

Each projectile can award the Graze only once.

This transforms enemy bullets from a binary hazard into a resource. A skilled player can deliberately fly close enough to recharge without accepting the hit.

## 💥 Kernel Parry

Strike hostile popcorn with the horn and ownership flips.

The reflected kernel:

- travels back at high speed,
- damages corn enemies,
- awards score,
- restores spring energy,
- grants a tiny fairness window around the reflection.

Enemy pressure can therefore become ammunition.

## 🍀 Lucky 13

Every 13 defeated enemies triggers a Lucky 13 burst:

- +1 heart, capped at 13,
- Husk Shield,
- spring energy,
- Snap-ready time,
- +130 score,
- rainbow-ring spectacle.

The number 13 is part of the actual rules rather than only the archive limit.

---

# 🌽 Power-ups that belong in the world

The pickups were redesigned from abstract rings into tiny magical cobs with husks, kernel texture and distinctive colors.

| Pickup | Effect | Good use |
|---|---|---|
| **♥ Heart Kernel** | Restore one heart | Stabilize a long run |
| **Husk Shield** | Absorb the next hit | Carry into dense boss patterns |
| **Butter Boost** | Faster body movement | Reposition and create wider Snap routes |
| **Prism Cob** | Easier spring charging | Aggressive chain setups |
| **Gold Cob** | Temporary 2× score | Combine with high combo / add waves |

The important geometric rule remains: **the entire stretched rainbow can collect a pickup**.

During a Snap, the collection radius expands further. A single route can therefore attack an enemy, cross a projectile lane and sweep through a power-up without putting the vulnerable body directly on the item.

---

# 🌽 The corn roster

Different enemies share one compact object representation and a small integer `type`. Variety comes from tiny state-machine branches rather than separate class hierarchies.

| Enemy | Tactical role |
|---|---|
| **Kernel Kamikaze** | Fast direct pressure on the ♥ body |
| **Cob Charger** | Telegraph → charge → recover; can be baited into walls |
| **Pop-Gunner** | Maintains range and creates Graze/Parry opportunities |
| **Prism Popper** | Curved multi-shot pressure and lateral movement |
| **Husk Bruiser** | Slow armored threat requiring committed damage |
| **Husk Ram** | Heavy armored charger with valuable wall-crash interactions |
| **Maize Monarch** | Four-phase mid-campaign boss |
| **Cobtopus** | Final radial-pattern corn monstrosity |

## Walls are weapons

Charging enemies can damage themselves when they hit geometry at speed.

That converts walls from static blockers into tactical tools:

```text
♥ lure charger toward barricade
          ↓
telegraph
          ↓
Snap away
          ↓
🌽💥 WALL
          ↓
punish recovery
```

Husk barricades simultaneously provide navigation, cover, head-ray constraints and enemy self-damage. Again, one tiny system performs several jobs.

---

# 🔊 Procedural dubstep / gaming-EDM

Stretchicorn ships with no music file.

The soundtrack is synthesized entirely with Web Audio oscillators and a tiny sequencer. Rather than storing a song, the game stores compact rhythmic rules and recreates musical structure at runtime.

The current set moves through contrasting two-bar sections:

```text
BUILD
  ↓
DROP
  ↓
BREAK
  ↓
DROP 2
  ↓
repeat with root movement
```

Tempo is recomputed from section and step state, giving builds acceleration and drops noticeably different pacing instead of a single monotonous four-on-the-floor loop.

### Tiny musical vocabulary

The engine combines:

- pitch-swept low kicks,
- syncopated kick masks,
- filtered saw growls,
- dedicated sine sub-bass,
- sparse high percussion,
- arcade-like melodic punctuation,
- rising build gestures,
- heavier drop entrances,
- slower breakdown contrast,
- boss-dependent intensity.

Rhythmic patterns are bit-packed integers rather than verbose arrays.

### Bass without samples

A bass hit is approximately:

```text
filtered saw growl
       +
clean sine sub
```

The growl's low-pass cutoff moves during the note, creating a compact `wub` gesture while the sine layer preserves low-frequency weight.

No MP3, OGG, sample pack or decoded buffer is needed.

---

# ✨ Audio-reactive environment

The arena reacts to the music, but there is no FFT or analyser pipeline.

Because the game itself generates the sequencer, it already knows when musically important events occur. Those events raise a tiny shared `beat` envelope:

```text
sequencer event
      │
      ├── synthesize sound
      │
      └── raise beat envelope
                 ↓
        rainbow tears / sparks / specks
```

The renderer uses that envelope to make faint colored streaks lengthen and small background particles brighten slightly.

This is intentionally restrained. Enemy bullets, the ♥ body, the horn, the aim reticle and pickups remain higher contrast than the decoration. The background should make the game feel alive without becoming another thing the player must parse.

---

# 13 trials

The campaign contains 13 increasingly mixed encounters:

1. **Pastel Patch**
2. **Kernel Panic**
3. **Popcorn Front**
4. **Husk Maze**
5. **The Maize Monarch**
6. **Butter Blitz**
7. **Husk Armor**
8. **Prism Popcorn**
9. **The Cob Crusher**
10. **Sugar Corn**
11. **Kernel Gauntlet**
12. **Double Cornbow**
13. **The Cobtopus**

Large trial cards provide rhythm between encounters and make progression legible without introducing a separate campaign UI.

Bosses derive four phases directly from remaining health rather than running a large scripted timeline:

```text
100–75% → Phase 1
75–50%  → Phase 2
50–25%  → Phase 3
25–0%   → Phase 4
```

Projectile count, curvature, pursuit and cadence intensify as health falls. The final Cobtopus reuses the same compact phase grammar with denser radial geometry.

---

# Player-experience design

The 13KB constraint is not only a compression problem. The game is designed around three simultaneous budgets.

### 1. Byte budget

Can the feature fit, and can one implementation do multiple jobs?

### 2. Attention budget

Can a first-time player understand the feature while angry corn is firing popcorn at them?

### 3. Decision budget

Does the feature create an interesting choice, or merely another rule to memorize?

Those questions drove many of the final decisions.

## Why 13 hearts?

The control scheme is unusual. A new player needs enough runway to discover that the head is safe, learn the pull direction, understand Snap, then encounter Graze, Parry, walls and bosses.

Thirteen hearts make the first serious run educational rather than forcing a restart every few seconds.

## Why separate Controls, Rules and Settings pages?

Earlier title screens became walls of instructions. The current first screen has one job: make the premise memorable and get the player into the game.

Optional information lives behind three simple choices:

```text
C → Controls
R → Rules
S → Settings
```

Players who want chaos can press Space immediately. Players who want precision can configure first.

## Progressive teaching

Early gameplay messages are contextual rather than modal:

- first identify the vulnerable ♥ body,
- then explain body/head control separation,
- then teach pulling,
- then announce Snap readiness,
- then introduce chaining.

The tutorial therefore grows with the player's actions instead of front-loading a manual.

## The character is the UI

Important information is embedded into Stretchicorn whenever possible:

- ♥ marks the damage anchor,
- rainbow length communicates stored tension,
- whole-character glow communicates Snap readiness,
- aim ray communicates horn geometry,
- pull arrow communicates charge geometry,
- shield ring communicates protection,
- rainbow exhaust communicates a committed launch.

The HUD reinforces these signals rather than replacing them.

---

# Strategy ladder

### Beginner

Learn one rhythm first:

```text
aim → short pull → Snap → recover
```

Watch the ♥ body more than the head. Use Snap to escape just as often as you use it to attack.

### Intermediate

Exploit the safe parts of the creature.

Keep the ♥ body behind geometry while the head threatens open space. Sweep pickups with the rainbow. Snap *through* enemies rather than stopping in front of them.

### Advanced

Treat every hostile projectile as a decision:

```text
avoid  → safest
graze  → spring energy
parry  → spring energy + reflected weapon
```

Rotate during recovery so the next pull is already aligned.

### Expert

Plan around **Lucky 13**, Gold Cob timing, combo decay, reflected projectiles, wall crashes, pickup routes and boss add timing at the same time.

At that point the arena stops feeling like a conventional shooter and becomes a moving geometry puzzle.

> **The rainbow is not baggage. It is usable space.**

---

# Why this fits 13KB

The goal has never been to build ten unrelated systems and then crush them until the ZIP accepts them. The game instead tries to make every important system perform multiple roles.

| System | Jobs it performs |
|---|---|
| **Rainbow spring** | character animation, charge feedback, movement, attack, traversal, pickup routing, theme |
| **Projectiles** | danger, Graze, Parry, reflected damage, spring recharge, boss patterns |
| **Walls** | navigation, cover, spring/head constraint, enemy self-damage, encounter variety |
| **Music clock** | song structure, rhythm, bass timing, background visual timing |
| **Enemy state field** | telegraphs, charges, recovery, boss sequencing |
| **Character rendering** | personality plus gameplay-state communication |

The joke, control scheme, visuals and byte strategy all point in the same direction.

---

# Architecture / source tour

```text
stretchicorn/
├── index.html
├── README.md
├── CHANGELOG.md
├── docs/
│   ├── stretchicorn-hero.png
│   └── stretchicorn-title-v017.png
├── src/
│   ├── style.css
│   ├── 00-core.js       # state, geometry, audio, stages, corn roster
│   ├── 01-combat.js     # Snap, damage, Parry, Lucky 13
│   ├── 02-update.js     # fixed-step movement, spring physics, AI, Graze
│   ├── 03-render.js     # procedural world, corn, pickups, reactive ambience
│   └── 04-ui-input.js   # title/rules/controls/settings, rebinding, test hook
├── scripts/
│   ├── build.mjs
│   ├── package.py
│   ├── check-size.mjs
│   ├── test.mjs
│   └── release-smoke.mjs
├── dist/
│   ├── index.html
│   └── stretchicorn-desktop-v0.20.2.zip
├── package.json
├── netlify.toml
└── .gitignore
```

The readable `src/` files intentionally keep descriptive names and comments around the unusual systems. The competition build derives from those same files.

## Fixed timestep

Rendering uses `requestAnimationFrame`, but gameplay advances in fixed 1/60-second steps.

That keeps spring constants, collision timing, enemy telegraphs and attack windows much less dependent on monitor refresh rate.

## Wall-safe head projection

The head is not independently collision-resolved as a conventional body. Once spring length is calculated, the head is projected along the current aim ray and shortened by `rayW()` when arena geometry would block it.

This preserves aiming direction while preventing the safe head from visibly penetrating walls.

## Safe stage spawning

`safeSpawn()` validates both the ♥ body and the projected head against arena geometry. If a stage transition ever produces an invalid placement, it searches a small deterministic grid for the nearest safe anchor and reconstructs the spring from there.

This exists because a rare spawn-inside-wall bug was exactly the kind of tiny-game failure that can ruin an otherwise good run.

---

# Build pipeline

No JavaScript package dependencies are required.

```bash
npm run build
npm test
npm run smoke
npm run package
```

Or run the full release verification:

```bash
npm run verify
```

### `build.mjs`

Concatenates the readable source and performs a conservative competition compaction pass:

- removes block comments,
- removes redundant whitespace outside strings,
- preserves player-facing string content,
- produces the single `dist/index.html` runtime.

### `package.py`

Packages that exact HTML as a deterministic standards-compliant DEFLATE ZIP.

The official v0.20.2 artifact uses **Zopfli** compression and is **13,308 bytes**. A normal zlib fallback is still a valid ZIP but is larger than the current competition ceiling, so Zopfli is required when reproducing the final submission-sized artifact.

### `check-size.mjs`

Hard-checks the official `13,312` byte ceiling and fails if the archive is too large.

---

# Testing the thing we actually ship

The project has two levels of lightweight regression coverage.

## `scripts/test.mjs`

Exercises the readable/build logic and checks:

- 13-heart initialization,
- custom binding persistence behavior,
- **Enter** entering rebind mode,
- duplicate-binding swap semantics,
- independent Music/SFX settings,
- procedural soundtrack scheduling,
- filtered growl/sub synthesis,
- responsive continuous aiming,
- spring charging and Snap combat,
- safe spawn placement across all 13 stages,
- finite player state under sustained simulated input.

## `scripts/release-smoke.mjs`

Loads the JavaScript from the **actual generated `dist/index.html`** and drives it through:

```text
title
  ↓
Enter → play
  ↓
Controls → rebind
  ↓
Settings → alter Music and SFX independently
  ↓
procedural audio scheduling
  ↓
all 13 stages
  ↓
movement + attack simulation
```

That smoke test was added specifically so the byte-constrained artifact cannot quietly diverge from the version we believe we tested.

The current v0.20.2 release passes both suites and ZIP integrity testing.

---

# Technical snapshot

- **Canvas 2D** procedural rendering
- **Web Audio** procedural soundtrack and SFX
- **no runtime image/audio assets**
- **fixed 60 Hz** gameplay simulation
- continuous arbitrary-angle keyboard aiming
- deterministic horn-angle snapshot per attack
- persistent custom key bindings
- independent persistent Music/SFX volume settings
- 13 hearts
- 13 trials
- Lucky 13 every 13 kills
- compact health-derived boss phases
- single-file competition runtime
- Desktop category target
- **13,308 / 13,312 bytes**

---

# Playtesting

For a useful first-play test, ask the player **not to read this README first**.

The questions that matter most are:

- Did they understand within the first minute that only the ♥ body takes damage?
- Did they discover how to pull opposite the horn and trigger a Snap?
- Did the aim reticle make horn direction trustworthy?
- Did the whole-unicorn glow make Snap readiness obvious?
- Did they naturally discover Graze or Parry?
- Did the corn enemies read as mechanically different, not just differently colored?
- Did the music feel energetic without covering combat sounds?
- Were Music/SFX settings easy to find and understand?
- Which death felt unfair rather than deserved?
- How far did they reach?
- Did they immediately want another attempt?
- Did Firefox / Chrome / Safari behave differently?

Fresh-player confusion is more valuable than polite praise at this stage.

---

# js13kGames 2026

Stretchicorn targets the **Desktop** category and the 2026 theme **Unicorns & Rainbows**.

The theme is implemented mechanically rather than used as a skin:

- the unicorn's anatomy defines the control system,
- the rainbow is literally the spring, attack and movement connection,
- color returns as the run progresses,
- the 13KB constraint appears in the rules through 13 hearts, 13 trials and Lucky 13.

The corn army is the absurd counterweight that gives the game its own identity.

---

# Credits

**Game design, development and direction:** Sidharth Hulyalkar  
**Built with:** JavaScript, HTML5 Canvas, Web Audio, aggressively reused systems, and an unreasonable quantity of corn.

Promotional README artwork is repository-only. All visuals and audio in the actual competition runtime are generated procedurally.

---

<div align="center">

## 🌈 STRETCH · SNAP · SHUCK. 🌽

**Protect the heart. Weaponize the rainbow. Parry the popcorn.**

</div>
