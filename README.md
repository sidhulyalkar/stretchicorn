<div align="center">

<a href="docs/stretchicorn-hero.png"><img src="docs/stretchicorn-hero.png" alt="Stretchicorn promotional key art" width="1100"></a>

# STRETCHICORN

### **STRETCH · SNAP · SHUCK.** 🌈🦄🌽

**A 13KB desktop action game about stretching a unicorn into a rainbow weapon against an inexplicably hostile corn civilization.**

Built for **js13kGames 2026 — Unicorns & Rainbows**.

</div>

---

## The pitch

**Stretchicorn** is built around one ridiculous physical rule:

> **Your unicorn's ♥ body is vulnerable, its head is safe, and the rainbow between them is a spring.**

Move the body with **WASD**, steer the head with the **Arrow Keys**, pull away from the horn to store spring energy, then hit **Space** to turn the whole creature into a rainbow slingshot.

The result sits somewhere between an arcade shooter, an elastic movement game, a geometry puzzle, and a very strange Saturday morning cartoon.

You begin with **13 hearts**, survive **13 trials**, and fight your way through an escalating army of weaponized corn before facing the final **Cobtopus**.

<div align="center">

<a href="docs/stretchicorn-title-v017.png"><img src="docs/stretchicorn-title-v017.png" alt="Stretchicorn v0.17 title screen" width="1000"></a>

</div>

---

# Why the game feels different

Most action games bind movement, aiming, attacking, dodging, and item collection to separate systems.

Stretchicorn tries to make them consequences of the **same elastic body**.

```text
steer head
    ↓
position vulnerable body
    ↓
pull body away from horn
    ↓
🌈 load the rainbow spring
    ↓
SPACE
    ↓
RAINBOW SNAP
    ↓
attack / dodge / travel / collect / reposition
    ↓
set up the next spring
```

At higher skill levels, that loop becomes:

```text
Snap → Graze → Parry → Recharge → Double Rainbow → Power-up route → Snap
```

The goal was not to squeeze many unrelated features into 13KB. It was to make **a few small systems interact so strongly that they create more game than their byte cost suggests**.

---

# Controls

| Input | Action |
|---|---|
| **W A S D** | Move the vulnerable ♥ body |
| **Arrow Keys** | Smoothly steer the safe head |
| **Space** | Horn strike / Rainbow Snap |
| **P** | Pause |
| **M** | Menu |

v0.17 also includes a dedicated **Controls** screen with custom keyboard remapping, plus a separate **Rules** page so the title screen can stay visual and inviting instead of becoming a wall of instructions.

## The one rule to learn first

> **Only the ♥ body takes damage. The head and rainbow are safe.**

That rule is intentionally generous, but it is also the foundation of the tactics.

The safe head and rainbow can occupy dangerous space, collect power-ups, intercept projectiles, and attack around obstacles while the body stays somewhere else.

Once that clicks, Stretchicorn stops behaving like a conventional shooter and starts behaving like an articulated weapon.

---

# Core mechanics

## 🌈 Rainbow Spring

Move the body **away from the direction the horn is pointing** to charge the spring.

A short deliberate pull is enough. The player should be springing constantly, not dragging across half the arena waiting for a super meter.

When Snap is ready:

- the rainbow visibly stretches,
- the head gains a rainbow pulse,
- small sparks appear,
- a procedural elastic **boing** plays.

### Why the head is not a normal physics object

Early prototypes used a freely moving 2-D spring head. It looked elastic, but the head followed the body too aggressively and made precise aiming frustrating.

The final controller separates **angle** from **stretch**:

```text
Arrow Keys → authoritative aim angle
                      +
scalar spring → elastic head distance
                      =
precise aiming + expressive spring motion
```

The head can overshoot and rebound along the aim ray, but it cannot drift sideways away from the player's intended direction.

That small architectural choice is the mechanical heart of the game.

---

## ⚡ Rainbow Snap

A charged Space attack becomes a **Rainbow Snap**.

Snap simultaneously acts as:

- a high-damage attack,
- an evasive dash,
- a traversal move,
- a combo extender,
- a power-up collection route,
- a way through dense projectile patterns.

The game is strongest when Snap becomes ordinary locomotion rather than a rare special move.

---

## 🌈🌈 Double Rainbow

Snap again quickly after a successful Rainbow Snap to trigger **Double Rainbow**.

The second release gains additional damage, horn reach, visual spectacle, combo value, and a short safety burst.

The design purpose is simple: after committing to an aggressive move, the game should tempt you to become **more aggressive**, not immediately retreat into neutral play.

---

## 🍿 Popcorn Graze

Enemy kernels and popcorn are not only hazards.

Projectiles have two meaningful zones around the ♥ body:

```text
far away      → safe
near miss     → POPCORN GRAZE
body contact  → damage
```

A Graze awards **+13**, restores spring energy, creates a small visual pop, and can push the player toward another Snap.

Each projectile can only be grazed once, preventing passive score farming.

The risk ladder becomes:

> **avoid → graze → parry**

---

## 💥 Kernel Parry

Strike hostile projectiles with the horn to reflect them.

A successful parry:

- flips projectile ownership,
- sends the kernel back at high speed,
- restores spring energy,
- gives score,
- grants a tiny fairness window,
- allows reflected projectiles to hurt enemies.

This creates sequences such as:

```text
Rainbow Snap
      ↓
Pop-Gunner fires
      ↓
Kernel Parry
      ↓
reflected kernel kills another cob
      ↓
short pull
      ↓
DOUBLE RAINBOW
```

Enemy pressure becomes ammunition.

---

## 🍀 Lucky 13

Every **13 defeated enemies** triggers Lucky 13.

It grants:

- +1 heart, up to 13,
- an instant shield,
- spring energy,
- Snap-ready time,
- +130 score,
- expanding rainbow-ring spectacle.

The number 13 is therefore not merely a reference to the competition limit. It changes how players route fights.

If the counter reads **11/13** during a boss encounter, two weak kernels may be more valuable than immediately attacking the boss.

---

# The corn problem 🌽

Stretchicorn originally fought generic storm creatures. The game became far more memorable when the title itself became the enemy roster.

The world is now populated by an aggressively unnecessary corn civilization.

| Enemy | Role |
|---|---|
| **Kernel Kamikaze** | Fast pursuit pressure |
| **Cob Charger** | Telegraph → charge → recover |
| **Pop-Gunner** | Ranged kernel artillery |
| **Prism Popper** | Curved multi-shot pressure |
| **Husk Bruiser** | Armored heavy |
| **Husk Ram** | Armored charging threat |
| **Maize Monarch** | Mid-campaign boss |
| **Cobtopus** | Final Level 13 boss |

The joke also helps readability. Silhouette, color, armor, movement, and projectile behavior communicate what each cob is trying to do without requiring a large enemy-art pipeline.

### Environment as a weapon

Charging corn can be baited into husk barricades.

Walls therefore serve several jobs:

- cover for the vulnerable body,
- spring-length constraints,
- navigation obstacles,
- projectile blockers,
- offensive tools against chargers.

A good stage object should earn its bytes more than once.

---

# Power-ups

| Power-up | Effect | Good use |
|---|---|---|
| ♥ **Heart** | Restore one heart | Stabilize long boss attempts |
| ☁ **Shield** | Absorb the next hit | Bank before dense phases |
| » **Sugar Rush** | Temporary speed boost | Wider routes and faster repositioning |
| ★ **Star Power** | Easier spring charging | Aggressive Snap chains |
| **2× Horseshoe** | Score multiplier | Dense waves / boss summons |

## The rainbow can collect them

You do **not** need to touch a power-up with the ♥ body.

The closest-point test runs against the stretched body segment, and Snap temporarily expands the collection radius.

```text
♥ body -------- 🌈 rainbow -------- head
                    ↑
                 power-up
```

That means one movement can simultaneously:

1. attack a corn enemy,
2. cross the arena,
3. collect a Star,
4. begin the next spring setup.

---

# Boss design

Bosses use four **health-derived phases** instead of long scripted timelines:

```text
100–75%  → Phase 1
75–50%   → Phase 2
50–25%   → Phase 3
25–0%    → Phase 4
```

As health falls, the same compact equations increase combinations of:

- pursuit speed,
- projectile count,
- projectile speed,
- curvature,
- attack cadence,
- summon pressure.

This produces a readable dramatic arc without paying for a large scripting system.

The **Cobtopus** reuses this phase model while adding radial fire and tentacle-like visual language. The final encounter gets its own entrance and a dedicated transformation into the victory state.

---

# Strategy guide

## Beginner: learn the rhythm

Do not begin by trying to maximize damage.

Learn this first:

> **aim → pull → Snap → recover**

1. Watch the ♥ body.
2. Point the safe head toward a target or escape lane.
3. Move the body briefly in the opposite direction.
4. Wait for the pulse / boing.
5. Snap.

Use Snap to escape as often as you use it to attack.

## Intermediate: separate danger from offense

Because the head and rainbow are safe, try to:

- keep the ♥ body behind a barricade while reaching the head around it,
- stretch the rainbow through a power-up,
- put the head into a projectile lane while the body stays outside it,
- Snap **through** enemies rather than stopping in front of them.

## Advanced: convert pressure into momentum

A projectile can be:

- avoided,
- grazed for charge,
- parried for more charge,
- reflected into another enemy.

A strong boss rhythm becomes:

```text
Snap
 ↓
turn during recovery
 ↓
Graze / Parry incoming kernel pattern
 ↓
short pull
 ↓
Double Rainbow
 ↓
use the new position to start another route
```

## Wall baiting

Chargers can hurt themselves against barricades.

```text
body near wall
     ↓
enemy telegraphs
     ↓
Snap away
     ↓
CORN → WALL 💥
     ↓
punish recovery
```

## Lucky 13 routing

Watch the kill counter.

Being at `12/13` changes the value of every weak enemy on screen because the next kill can immediately generate health, shield, spring charge, score, and breathing room.

## The expert idea

> **The rainbow is not baggage. It is usable space.**

Once this becomes intuitive, the game changes from a difficult shooter into a spatial-routing game.

---

# Player-experience design

A 13KB game has another constraint besides file size: **attention**.

The title screen therefore avoids presenting every mechanic at once.

v0.17 uses a small front-end structure:

```text
TITLE
 ├── SPACE → PLAY
 ├── C → CONTROLS / custom bindings
 └── R → RULES
```

The main title screen exists to sell the toy visually.

The Rules page teaches the four concepts that matter most. Contextual messages then introduce Graze, Parry, Double Rainbow, armor, walls, and boss behavior only when they become relevant.

### Why 13 hearts?

The game deliberately starts generously.

Stretchicorn has a novel controller, and early deaths are often learning deaths. Giving players 13 hearts lets them discover the spring, survive mistakes, reach later mechanics, and form an opinion of the whole game before being thrown back to the menu.

Difficulty then comes from overlapping decisions rather than starving the player of attempts.

### Why custom controls?

WASD + Arrow Keys + Space is the intended Desktop layout, but keyboard comfort varies dramatically. The rebinding screen improves accessibility without changing the mechanical model or adding more gameplay buttons.

---

# Theme integration

The 2026 theme is **Unicorns & Rainbows**, but the goal was to make the theme structural rather than decorative.

## Unicorn

The unicorn anatomy defines the rules:

- ♥ body = vulnerable anchor,
- head = safe aiming platform,
- horn = attack geometry,
- body/head separation = spring charge.

## Rainbow

The rainbow simultaneously acts as:

1. the elastic body,
2. spring-charge feedback,
3. movement geometry,
4. Snap exhaust,
5. Double Rainbow identity,
6. pickup-routing surface,
7. visual reward language.

## Corn

The corn layer gives the project its own absurd identity beyond the competition theme.

**Stretchicorn** is no longer only a name. It is a promise that the player will stretch a unicorn while being assaulted by corn.

---

# Designing for 13KB

The final archive constraint is not approached as "write a normal game and minify it later."

The design itself is built around **multi-purpose systems**.

## One spring, many jobs

The rainbow spring handles:

1. animation,
2. charge visualization,
3. movement,
4. attack setup,
5. traversal,
6. pickup routing,
7. combo expression,
8. theme.

## One projectile representation, many interactions

A tiny projectile object handles:

- enemy fire,
- curved fire,
- Graze,
- Parry,
- reflected friendly fire,
- boss patterns.

## One enemy state vocabulary

Rather than separate class hierarchies, enemies reuse small states such as:

```text
idle → telegraph → charge → recover
```

or compact steering/shooting rules inside a shared update loop.

## One particle pool

The same lightweight effect objects become:

- rainbow exhaust,
- Snap sparks,
- Lucky 13 bursts,
- impacts,
- popcorn / kernel debris,
- victory effects.

The target is **emergent depth per byte**, not feature count per byte.

---

# Technical architecture

The public repository keeps a readable source layout separate from the byte-constrained competition artifact.

```text
src/
├── 00-core.js       state, helpers, stages, enemies, geometry
├── 01-combat.js     Snap, Double Rainbow, damage, kills, Parry
├── 02-update.js     spring physics, movement, AI, bosses, Graze
├── 03-render.js     procedural world, unicorn, corn, HUD, effects
├── 04-ui-input.js   title/rules/controls, fixed loop, bindings
└── style.css
```

## Two-point player model

The entire Stretchicorn is built around two important points:

```text
A = vulnerable ♥ body
P = safe head / horn endpoint
```

Each update reconstructs the head approximately as:

```text
P = A + aimVector × springLength
```

This is dramatically cheaper and easier to reason about than a full articulated-body simulation.

## Scalar spring

The rainbow uses a scalar spring length and scalar spring velocity:

```text
velocity += (targetLength - length) × strength × dt
velocity *= damping
length += velocity × dt
```

Charge increases the target length. Snap changes the target and injects spring velocity, creating visible compression and rebound.

## Directional charge

Charging uses the relationship between movement and the opposite aim vector:

```text
away = dot(moveDirection, -aimDirection)
```

The result is remapped into a forgiving charge rate. This makes diagonal pulls work and prevents the mechanic from depending on one perfect axis.

## Collision model

The collision contract is intentionally asymmetric:

- ♥ body collides with enemies and hostile projectiles,
- head/rainbow do not take normal contact damage,
- horn attack uses segment-distance geometry,
- the head is shortened by wall ray intersection,
- the body resolves wall movement axis by axis,
- `safeSpawn()` repairs invalid stage-transition configurations.

Those rules create the safe-head / vulnerable-body strategy without requiring expensive articulated collision.

## Fixed timestep

Gameplay updates at a fixed **60 Hz** timestep while rendering follows `requestAnimationFrame`.

That keeps spring tuning, AI timers, charge timing, and collisions substantially more predictable across display refresh rates.

---

# Three budgets

A useful way to summarize the project is that Stretchicorn is designed against three budgets at once.

### 1. Byte budget

Can the mechanic justify its compressed cost?

### 2. Attention budget

Can a new player understand what matters without reading a manual?

### 3. Decision budget

Does the mechanic create a meaningful choice during play?

A feature that is cheap in bytes but expensive in confusion is not actually cheap.

This is why the final game asks for only:

> **WASD + Arrow Keys + Space**

while still supporting movement, aiming, charging, attacking, dodging, grazing, parrying, chaining, item routing, wall baiting, and boss strategy.

---

# Running locally

Serve the repository with any static HTTP server:

```bash
python3 -m http.server 8080
```

Then open:

```text
http://localhost:8080
```

The repository root is also configured for simple Netlify deployment.

---

# Repository layout

```text
stretchicorn/
├── README.md
├── CHANGELOG.md
├── index.html
├── docs/
│   ├── stretchicorn-hero.png          # new README hero artwork
│   └── stretchicorn-title-v017.png    # v0.17 title screenshot
├── src/
│   ├── style.css
│   ├── 00-core.js
│   ├── 01-combat.js
│   ├── 02-update.js
│   ├── 03-render.js
│   └── 04-ui-input.js
├── dist/
│   └── ... competition artifact
├── scripts/
├── package.json
└── netlify.toml
```

> **Artwork note:** the README intentionally references `docs/stretchicorn-hero.png` and `docs/stretchicorn-title-v017.png`. Upload the two current images with those exact filenames and they will appear automatically without another README edit.

---

# Playtesting checklist

Fresh-player confusion is useful data. If you test the game, the most valuable questions are:

- Did you understand that only the ♥ body takes damage?
- Did you understand Rainbow Snap within the first minute?
- Did aiming feel controllable at arbitrary angles?
- Did you discover Graze or Parry naturally?
- Did the corn enemies read differently from one another?
- Did boss phases feel difficult but understandable?
- Did any wall, spawn, input, or transition state trap the player?
- What was the most fun thing you discovered without being told?
- Would you immediately play another run?

---

# js13kGames 2026

Stretchicorn is being developed for **js13kGames 2026**, targeting the **Desktop** category and the **Unicorns & Rainbows** theme.

The submission philosophy is simple:

> Make the constraint visible in the design, not only in the ZIP size.

That is why the game has **13 hearts**, **13 trials**, **Lucky 13**, +13 Graze rewards, and a combat system whose central object is literally a rainbow stretched between two pieces of a unicorn.

---

# Credits

**Game design, development, and direction:** Sidharth Hulyalkar  
**Technology:** HTML5 Canvas, JavaScript, Web Audio  
**Promotional artwork:** created for the Stretchicorn project  
**Runtime artwork:** procedurally rendered by the game

---

<div align="center">

## 🌈🦄🌽

# **STRETCH · SNAP · SHUCK.**

**13 hearts. 13 trials. Way too much corn.**

</div>
