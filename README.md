<div align="center">

<a href="docs/cover.webp"><img src="docs/cover.webp" alt="Stretchicorn: Rainbow Eternal cover art" width="1000"></a>

# Stretchicorn: Rainbow Eternal

### 13 hearts · 13 trials · restore the sky 🌈🦄⚡

**A tiny desktop action game where the unicorn's body is your health, its head is your weapon, and the rainbow between them is a spring.**  
Built for **js13kGames 2026 — Unicorns & Rainbows**.

[Download the v0.15.0 competition ZIP](dist/stretchicorn-rainbow-eternal-desktop-v0.15.0.zip)

</div>

---

## What is Stretchicorn?

**Stretchicorn: Rainbow Eternal** is a fast, skill-based arcade game built around one absurd physical rule:

> **Move the vulnerable unicorn body, steer the safe head, stretch the rainbow between them, then weaponize the stored tension.**

You begin with **13 hearts** and face **13 trials** across a storm-darkened sky. The goal is not simply to destroy enemies. Every cleared stage restores a little more color to the world until the final storm breaks and the rainbow becomes eternal.

The competition build is intentionally tiny and self-contained. Everything in the game is produced with **Canvas 2D + JavaScript + procedural Web Audio**. There are no runtime image assets, audio files, frameworks, or game engines inside the submission archive.

<div align="center">

<a href="docs/title-screen.webp"><img src="docs/title-screen.webp" alt="Stretchicorn title screen showing controls and 13-trial premise" width="1000"></a>

</div>

---

# Quick Start

| Input | Action |
|---|---|
| **W A S D** | Move the vulnerable ♥ body |
| **Arrow Keys** | Smoothly steer the safe head |
| **Space** | Horn strike / Rainbow Snap |
| **P** | Pause |
| **M** | Return to menu |

## The one rule to understand first

> **Only the ♥ body takes damage. The head and rainbow are safe.**

This is not merely a generous hitbox rule. It is the foundation of the game.

You are encouraged to put the **safe head and rainbow into dangerous spaces** while keeping the vulnerable body somewhere survivable. The result is closer to controlling a strange articulated weapon than piloting an ordinary character sprite.

---

# The Core Loop

```text
steer head
    ↓
position body
    ↓
pull body away from horn
    ↓
🌈 charge the rainbow spring
    ↓
SPACE
    ↓
RAINBOW SNAP
    ↓
attack / escape / collect / reposition
    ↓
set up the next spring
```

At higher skill levels that becomes:

```text
Snap → Graze → Parry → Recharge → Double Rainbow → Power-up route → Snap
```

The important design goal is that **movement, offense, defense, scoring, and resource collection all feed the same spring system** rather than existing as unrelated subsystems.

---

# Core Mechanics

## 🌈 Rainbow Spring

Move the ♥ body **away from the direction the horn is pointing** to load the spring.

The game measures how strongly your movement opposes the head direction. A short intentional pull is enough. You do not need to drag the unicorn across half the arena.

Once charged, the head emits a rainbow pulse, the body produces small sparks, and a procedural **boing** signals that a Snap is ready.

### Why it works this way

Earlier prototypes used a freely floating 2-D spring head. It looked elastic, but the head constantly followed the body and ruined aiming. The final controller keeps the expressive spring motion while making aim authoritative:

- **Arrow keys control the angle.**
- **A single scalar spring controls head distance.**
- The head can stretch/rebound along that ray, but cannot drift sideways away from your aim.

That compromise is the mechanical heart of Stretchicorn.

---

## ⚡ Rainbow Snap

When the spring is ready, press **Space**.

Stretchicorn launches forward, compresses the rainbow body, extends the horn, produces rainbow exhaust, and gains a brief safety window.

A Snap is simultaneously:

- an attack,
- an evasive dash,
- a traversal tool,
- a combo extender,
- a power-up collection route,
- a way to cross projectile patterns.

The game is most fun when Snap is treated as normal movement rather than a rare super attack.

---

## 🌈🌈 Double Rainbow

After a Rainbow Snap, a short chaining window remains active.

Recharge and Snap again before it expires to trigger **Double Rainbow**.

The second release gains:

- more damage,
- more horn reach,
- additional rainbow particles,
- a larger safety window,
- better combo retention.

Double Rainbow exists to reward players who stay aggressive after committing to a Snap instead of retreating to neutral every time.

---

## ✨ Glitter Graze

Enemy projectiles have two relevant radii around the vulnerable body:

```text
far away      → safe, no reward
near miss     → GLITTER GRAZE
body contact  → damage
```

A close pass that does not hit you grants:

- **+13 score**,
- spring energy,
- a small sparkle effect,
- the possibility of turning defense into another Snap.

Each projectile can only reward one Graze, so orbiting inside the same projectile does not farm score.

The mechanic creates a deliberate risk ladder: **avoid → graze → parry**.

---

## 💎 Prism Parry

A hostile projectile that meets the extended horn can be reflected.

A successful parry:

- reverses projectile ownership,
- sends it back at high speed,
- grants score,
- restores more spring energy than a Graze,
- gives a tiny invulnerability slice so the parry itself feels fair.

Reflected projectiles can damage enemies, which creates sequences such as:

```text
Snap → enemy shoots → horn parry → projectile kills bird → recharge → Double Rainbow
```

This is one of the main ways advanced play turns enemy pressure into ammunition.

---

## 🍀 Lucky 13

Every **13 defeated enemies** triggers a Lucky 13 burst.

It grants:

- +1 heart, up to 13,
- an instant Cloud Shield,
- spring charge,
- Snap-ready time,
- +130 score,
- a rainbow-ring spectacle.

Lucky 13 is both a thematic rule and a pacing tool. In difficult stages, the player can intentionally clear smaller enemies to reach the next 13-kill breakpoint before committing to the boss.

---

# Power-ups

| Power-up | Effect | Best use |
|---|---|---|
| ♥ **Heart** | Restore one heart | Stabilize long runs and boss attempts |
| ☁ **Cloud Puff** | Absorb the next hit | Bank it before dense projectile phases |
| » **Sugar Rush** | Temporary movement boost | Faster repositioning and wider Snap routes |
| ★ **Star Power** | Easier spring charging | Excellent for aggressive Snap chains |
| **2× Horseshoe** | Temporary score multiplier | Combine with high combo / boss add waves |

### Important routing rule

You do **not** need to touch a power-up with the body.

The entire stretched rainbow segment can collect it, and the pickup radius increases during a Snap. This makes power-up collection another geometry problem:

```text
♥ body -------- 🌈 rainbow -------- head
                    ↑
                 power-up
```

A good route can attack an enemy, cross the arena, and collect a Star or Shield in one motion.

---

# Enemies and Encounter Design

Stretchicorn uses one compact enemy object shape and a small integer `type` instead of separate class hierarchies. Different behaviors emerge from a shared update loop.

## Storm flock

### Small storm birds

Fast pressure units that pursue the vulnerable body. They keep the player moving and are useful Lucky 13 fuel.

### Diving / lightning birds

Use a three-state pattern:

```text
idle → telegraph → charge → recover
```

Their charge can be baited into walls. Geometry is therefore not only cover; it is a weapon.

### Gloom shooters

Maintain distance and fire projectiles, introducing Graze and Parry opportunities.

### Prism birds

Orbit the player and fire multi-projectile curved spreads. They are designed to turn the arena into a Graze/Parry playground rather than simply increasing enemy HP.

### Hail armor

Armored enemies resist weak horn taps. Charged attacks, Snap damage, reflected projectiles, or wall interactions are the intended answers.

---

# Boss Design

Bosses use **four health-derived phases** rather than long scripted timelines.

```text
100–75%  → Phase 1
75–50%   → Phase 2
50–25%   → Phase 3
25–0%    → Phase 4
```

Each phase increases combinations of:

- pursuit speed,
- projectile count,
- projectile speed,
- curvature,
- attack cadence,
- summon pressure.

The phase number is derived directly from health, which keeps the implementation tiny while still giving the fight a readable dramatic arc.

The final Level 13 boss, **The Voidbow**, reuses the same phase model but adds radial storm geometry and a dedicated entrance. On defeat, the storm transforms into a smiling cloud and the game transitions into the **Rainbow Eternal** finale.

---

# Strategy Guide

## Beginner: survive long enough to learn the instrument

1. **Watch the ♥ body, not the head.** That is the thing enemies can actually hurt.
2. Use the arrows to point the head where you expect danger or targets to appear.
3. Pull the body in the opposite direction for a brief moment.
4. When the head/rainbow pulses, press Space.
5. Use Snap to escape as often as you use it to attack.

The first goal is not maximum damage. It is learning the rhythm:

**aim → pull → Snap → recover**.

## Intermediate: separate safety from aggression

Because the head is safe, you can attack from angles that would be impossible in a conventional shooter.

Try to:

- keep the ♥ body behind a wall while the safe head reaches around it,
- stretch the rainbow across power-ups,
- point the head through a projectile lane while the body stays outside it,
- Snap through enemies rather than stopping directly in front of them.

## Advanced: never let enemy pressure be wasted

A strong player sees several possible resources in every projectile:

- avoid it if survival matters,
- Graze it if you need charge,
- Parry it if the horn angle is good,
- let a reflected shot solve another enemy for you.

The ideal boss rhythm often becomes:

```text
Snap
  ↓
turn during recovery
  ↓
Graze / Parry incoming pattern
  ↓
short pull
  ↓
Double Rainbow
```

## Combo play

Snap kills preserve combo longer and add more combo than ordinary attacks. Double Rainbow is therefore not only stronger, it is one of the best ways to keep a run's scoring momentum alive.

When a 2× Horseshoe appears, think about **routing**, not merely grabbing it immediately. If possible, collect it with the rainbow immediately before a dense add wave or boss phase.

## Wall play

Charging enemies can damage themselves by hitting walls at speed.

Instead of treating every wall as an inconvenience:

1. place the ♥ body near a wall,
2. wait for the enemy telegraph,
3. move or Snap away,
4. let the charger collide with geometry,
5. punish the recovery.

This is especially useful against armored chargers.

## Lucky 13 planning

The HUD shows progress toward the next 13-kill burst.

If you are at something like **11/13** during a boss encounter, killing two summoned birds can be more valuable than immediately attacking the boss because Lucky 13 gives health, shield, charge, and score at once.

## The most important expert idea

**The rainbow is not baggage. It is usable space.**

Once that clicks, Stretchicorn changes from a difficult shooter into a geometry game. Your safe head and rainbow can occupy dangerous territory, collect resources, intercept projectiles, and create attacks while the vulnerable body stays somewhere else.

---

# Why 13?

The js13kGames constraint inspired more than the archive size.

The number became part of the rules:

- **13 hearts**,
- **13 trials**,
- **Lucky 13 every 13 kills**,
- **+13 for a Glitter Graze**,
- **+130 for Lucky 13**.

The intention was to make the size constraint visible in the game's identity instead of leaving it only in the build pipeline.

---

# Theme Integration: Unicorns & Rainbows

The project deliberately avoids treating the competition theme as decoration.

### Unicorn

The unicorn's anatomy defines the control system:

- body = vulnerable player anchor,
- head = safe aiming platform,
- horn = attack origin,
- tail/rear = movement identity.

### Rainbow

The rainbow is simultaneously:

1. the elastic body,
2. the spring-charge visualization,
3. the movement/attack connection,
4. the Dash/Snap exhaust,
5. the Double Rainbow mechanic,
6. a pickup-routing surface,
7. progression color returning to the sky,
8. the final victory transformation.

### Restoring rather than destroying

Enemy deaths reinforce the premise:

- birds shed rainbow feathers,
- storm clouds briefly become smiling white clouds,
- the dark arena gradually reveals more color,
- Voidbow's defeat literally breaks the storm.

The fantasy is intentionally silly but coherent: **Stretchicorn weaponizes rainbows to make hostile weather happy again.**

---

# Design Principles

The project evolved through many prototypes. The final design is guided by a few constraints.

## 1. The spring is the primary verb

If a mechanic can be connected to stretching, aiming, releasing, or routing the rainbow, it is preferable to adding another button.

## 2. One system should solve several problems

The spring handles animation, movement, charging, attack geometry, feedback, pickup collection, and theme expression.

The projectile system handles danger, Graze, Parry, reflected damage, combo setup, and spring recharge.

The wall system handles navigation, cover, head-length constraints, enemy self-damage, and stage variety.

## 3. The character is also the interface

Important state should be visible on Stretchicorn itself whenever possible:

- rainbow extension communicates stored energy,
- sparks and the head pulse communicate Snap readiness,
- the ♥ marks the damage anchor,
- rainbow exhaust communicates a special launch,
- shield circles communicate protection.

HUD text reinforces these signals instead of replacing them.

## 4. Difficulty should generate decisions, not only statistics

Later stages add:

- geometry,
- curved fire,
- armor,
- telegraphed charges,
- boss phases,
- overlapping enemy roles.

The aim is to create more possible responses, not merely larger health bars.

## 5. Theme and mechanics should be inseparable

A generic character reskin would break the game design. The stretchy unicorn and rainbow are the actual mechanical model.

---

# Architecture / Source Tour

The readable source is split by responsibility while preserving the same compact state model used by the competition build.

```text
src/
├── 00-core.js       shared state, helpers, enemies, walls, stage data
├── 01-combat.js     Snap, Double Rainbow, damage, kills, Parry
├── 02-update.js     spring physics, movement, AI, boss phases, Graze
├── 03-render.js     procedural world, unicorn, enemies, HUD, particles
├── 04-ui-input.js   title/victory UI, fixed-step loop, keyboard, test hooks
└── style.css
```

The files intentionally include explanatory comments around the systems that are hardest to infer from compressed code.

## Player model

There are only two important player points:

```text
A = vulnerable body / rear anchor
P = safe head endpoint
```

The head is reconstructed each update as:

```text
P = A + aimVector × springLength
```

This makes collision and aiming substantially easier to reason about than a full articulated-body simulation.

## Spring physics

The rainbow has a scalar length `hlen` and scalar spring velocity `hv`.

Conceptually:

```text
hv += (targetLength - currentLength) × springStrength × dt
hv *= damping
currentLength += hv × dt
```

Charge changes the target length. A Snap rapidly changes that target and injects spring velocity, producing the visible compression/rebound.

The head is then shortened if the aim ray intersects a wall.

## Charge model

Spring charge is based on the relationship between body movement and horn direction.

Conceptually:

```text
away = dot(movementDirection, -aimDirection)
```

Moving directly away gives maximum charging. Diagonal movement still contributes, while moving toward the horn drains charge more strongly.

A short `ready` timer remains after the threshold is crossed so the player does not have to press Space on a single perfect frame.

## Horn collision

The horn attack is modeled as a short segment extending from the head. Enemies are tested against the closest point on that segment.

This provides a forgiving directional hitbox without turning the attack into a giant invisible circle.

## Graze collision

Projectile collision around the ♥ body uses two radii:

```text
inside 29px   → hit
29–54px       → one Glitter Graze
outside 54px  → nothing
```

A small flag on the projectile prevents repeated Graze rewards.

## Wall collision and safe spawning

The body is resolved axis-by-axis against rectangles.

The head is not collision-resolved as an independent object; instead, a ray/rectangle test limits its maximum legal spring length.

When a new stage creates different wall geometry, `safeSpawn()` validates both the body and derived head. If necessary it searches a small grid for the nearest valid location and clears velocities. This specifically prevents the historical bug where a new level could spawn Stretchicorn inside a block.

## Enemy AI

Enemy behavior uses compact state rather than classes.

Chargers, for example, use:

```text
state 0 = wait
state 1 = telegraph and lock direction
state 2 = charge and recover
```

This makes their behavior readable to the player and lets one state integer replace a larger scripted system.

## Boss phases

Boss phase is derived directly from the remaining-health quartile:

```text
phase = floor((1 - hp / maxHp) × 4)
```

The phase then feeds pursuit, bullet count, curvature, projectile speed, and cooldown. The Voidbow adds radial placement to the same machinery rather than maintaining a separate boss engine.

## Fixed timestep

Gameplay updates at **1/60 second** steps independent of rendering frequency.

The browser frame delta is accumulated and consumed in fixed-size updates. This keeps spring constants, cooldowns, and collision behavior far more stable across machines.

## Test surface

`window.__SR` exposes a deliberately small set of state and control hooks used during development for deterministic regression checks such as:

- 13-heart initialization,
- stage spawn safety,
- spring charging,
- arbitrary-angle aiming,
- Snap / Double Rainbow transitions,
- Lucky 13 cadence,
- boss phases,
- victory transitions,
- wall embedding checks.

It does not participate in normal gameplay.

---

# Technical Snapshot

Stretchicorn is intentionally built inside the js13kGames constraint box.

- **Single-file HTML competition artifact**
- **Canvas 2D rendering**
- **Procedural Web Audio**
- **No external runtime assets in the competition ZIP**
- **No framework or game engine**
- **Desktop keyboard controls**
- **13,312-byte compressed competition limit**
- **v0.15.0 competition ZIP: 11,805 bytes**
- **1,507 bytes of compressed headroom**

The readable repository source is intentionally not byte-golfed to the same degree as the competition artifact. The goal of `src/` is to make the implementation understandable; `dist/` preserves the exact constrained build.

---

# Running Locally

The root `index.html` loads the readable split source from `src/`.

```bash
python3 -m http.server 8080
```

Then open:

```text
http://localhost:8080
```

The exact js13k-ready archive is stored under `dist/`.

Check the current archive against the size limit with:

```bash
npm run check:size
```

---

# Netlify Playtest Deployment

The repository includes `netlify.toml` and can be deployed directly from `main`.

When connecting it in Netlify:

- **Build command:** none
- **Publish directory:** repository root (`.`)

Every push to the production branch can update one stable playtest URL, which makes external stress testing much easier.

---

# Repository Layout

```text
stretchicorn/
├── index.html
├── README.md
├── CHANGELOG.md
├── docs/
│   ├── cover.webp
│   └── title-screen.webp
├── src/
│   ├── style.css
│   ├── 00-core.js
│   ├── 01-combat.js
│   ├── 02-update.js
│   ├── 03-render.js
│   └── 04-ui-input.js
├── dist/
│   └── stretchicorn-rainbow-eternal-desktop-v0.15.0.zip
├── scripts/
│   └── check-size.mjs
├── package.json
└── netlify.toml
```

---

# Playtesting

The current focus is stress testing and submission polish.

The most useful feedback is not simply whether the game is difficult. It is **where the player's mental model diverges from the game's rules**.

If you test it, useful questions are:

- How far did you reach on your first run?
- Did you understand Rainbow Snap within the first minute?
- Was it obvious that only the ♥ body takes damage?
- Did the head feel controllable at diagonal / arbitrary angles?
- What felt unfair rather than merely difficult?
- Which mechanic did you discover without being told?
- Did you use Graze, Parry, Double Rainbow, wall baits, or Lucky 13 intentionally?
- Which power-up changed your decisions the most?
- Did a boss phase feel readable?
- Did anything freeze, trap the player, embed in geometry, or behave differently across browsers?
- Would you immediately play another run?

For onboarding tests, please consider playing once **before reading the strategy sections above**.

---

# Browser Target

Primary desktop targets:

- modern **Chrome**
- modern **Firefox**
- modern **Safari**

The competition version is designed around simultaneous keyboard movement, steering, and attack timing.

---

# js13kGames 2026

Stretchicorn was created for **js13kGames 2026** under the theme:

> **Unicorns & Rainbows**

The project targets the **Desktop** category.

The final submission archive must remain within the official **13 KB / 13,312-byte** compressed limit.

---

# Credits

**Game design, development, and direction:** Sidharth Hulyalkar  
**Built with:** HTML5 Canvas, JavaScript, Web Audio, and an unreasonable quantity of elastic unicorn energy.

Cover artwork was created as promotional artwork for the project.  
All visuals used by the competition game itself are generated procedurally at runtime.

---

<div align="center">

### 🌩️ Break the storm. Stretch the rainbow. Restore the sky. 🌈

**STRETCHICORN: RAINBOW ETERNAL**

</div>
