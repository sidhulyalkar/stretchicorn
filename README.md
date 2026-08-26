<div align="center">

<a href="docs/stretchicorn-hero.png"><img src="docs/stretchicorn-hero.png" alt="Stretchicorn key art" width="1000"></a>

# 🌽🦄 STRETCHICORN

### **STRETCH · SNAP · SHUCK.**

A 13KB desktop arcade-action game about a dead unicorn revived by the last surviving rainbow and forced through a corrupted corn world to return color and order to it.

Built for **js13kGames 2026 · Unicorns & Rainbows**.

[**Download the current js13k competition ZIP**](dist/stretchicorn-js13k.zip)  
[**Download the one-file local playtest**](dist/stretchicorn-local.html)

**v0.23.1 · FIRST FLIGHT · story → practice → Easy → mastery ladder**

</div>

---

## The living scar

Stretchicorn begins **dead**.

A catastrophe tore the unicorn into two pieces and drained almost all color from the world. One surviving ribbon of rainbow light finds the separated halves. It cannot reconstruct the missing body, so it becomes the missing body itself, stitching the creature back into motion as an elastic living scar.

```text
PULL ←     ♥ BODY ═══════ 🌈 LIVING SCAR ═══════ 🦄 HEAD / HORN     → AIM
           vulnerable          life-force                 safe
```

The rainbow is resurrection, scar, spring, weapon, movement system, and the world's last continuous source of full-spectrum color.

**Stretchicorn is not carrying the magic. Stretchicorn is being held alive by it.**

The game deliberately leaves the catastrophe partly unexplained. The world, the bosses, and the way color returns are the evidence.

---

# v0.23.1 - FIRST FLIGHT

The first-time experience no longer asks a new player to choose difficulty before they understand the game. Every fresh load follows one authored path:

**Living Scar origin → safe First Flight practice → three successful Rainbow Snaps → Easy campaign.**

First Flight uses the real movement/spring/Snap implementation with enemies, walls, pickups, and damage removed. It teaches one concept at a time: move the vulnerable heart, point the safe horn, pull in the opposite direction until the living scar glows, then release that stored tension with Space. The player must complete three charged Snaps before the campaign starts.

Easy then continues teaching through concise contextual strategy prompts: keep the heart behind the horn, use the safe rainbow/horn aggressively, pull back to create charge, and begin learning Graze/Parry as faster recharge tools.

The title screen now defaults to **Easy**, while Normal, Hard, and Impossible remain available for returning/expert players. Clearing each tier explicitly points toward the next pressure level so difficulty feels like a mastery ladder rather than four arbitrary buttons.

The compact first-time mental model is:

> **BODY PULLS · HORN POINTS · RAINBOW SNAPS**

---

# v0.23 - STORYBOOK REFRAME

v0.23 is a visual-direction reset based on playtest feedback. The previous build spent too many bytes on decorative stars, sparkles, low-alpha motifs, and symbolic background flourishes that did not make the world feel more authored.

The new rule is stricter:

> **Every background mark must describe a place, a threat, restoration, or a control concept. If it is only decoration, remove it.**

The result is less visual confetti and much more composition, depth, architecture, negative space, and environmental storytelling.

See [`docs/storybook-reframe-v0.23.md`](docs/storybook-reframe-v0.23.md).

---

## Living Scar origin + First Flight

A new player no longer lands on a difficulty menu and then discovers the unusual controls while enemies are already active.

Every fresh load begins with a short visual prologue:

1. **The Dead Field** - the world has lost its color and the unicorn lies separated in two pieces.
2. **The Last Rainbow** - a surviving ribbon of color descends and crosses the wound.
3. **Resurrection** - the rainbow cannot rebuild the body, so it becomes the connection between the halves.

The game then moves directly into **First Flight**, a safe practice field using the real production physics. The player must demonstrate:

4. **WASD · MOVE THE HEART** - learn that the heart/body is vulnerable.
5. **ARROWS · POINT THE HORN** - learn that the independent head/horn is safe and defines direction.
6. **PULL AWAY · MAKE TENSION** - separate heart from horn until the living rainbow visibly charges.
7. **SPACE · RAINBOW SNAP ×3** - convert stored tension into three real dash-attacks.
8. **FIRST FLIGHT COMPLETE · EASY** - the first campaign begins automatically without returning to a menu.

The onboarding is the default path, but returning players are never trapped:

- **Space / Enter / Escape** skips the story forward into First Flight.
- A visible **SKIP STORY** Canvas control is clickable.
- First Flight has a visible **SKIP PRACTICE** control and Escape path that starts Easy.
- **T** on the title screen replays the complete onboarding.

The point is not to make the player memorize instructions. It is to give them enough consequence-free repetitions that the novel two-ended control scheme begins to live in their hands before combat begins.

---

## Four authored environmental acts

Instead of thirteen unrelated background doodles, the campaign now moves through four coherent visual regions. Individual trials still change encounters and palette, but the world has continuity.

### I. Mourning Field

**The Dead Field · First Stirring · Ash Front · Husk Passage**

The opening region is dominated by crooked dead stalks, black ground masses, distant broken curves, and the remains of an older geometry buried beneath the farmland.

The landscape should feel quiet before it feels dangerous. Stretchicorn is the brightest object because the world has forgotten how brightness works.

As restoration rises, traces of the old curved structures align and gain restrained spectral veins rather than exploding into arbitrary particles.

### II. Sunken Court

**The Maize Monarch · Golden Fever · The Shell Fields · Broken Spectrum**

The landscape becomes monumental. Large ruined pillars and arch fragments replace tiny motifs. The implication is that this was not always merely farmland. Something architectural existed beneath or before the corn world.

The Maize Monarch claims those ruins as a false court.

### III. Husk Foundry

**The Husk Architect · Crystal Night · The March**

The world becomes imposed structure: braced frames, measured lines, repeated construction geometry, and large angular masses.

This visual language supports Husk Shift directly. The Architect is not conjuring random rectangles. It is continuously revising a plan for the arena and forcing the player to live inside the revision.

### IV. Black Prism

**Prism War · The Cobtopus**

Architecture gives way to crystalline ribs and organic roots that bend toward a shared center. The scene becomes more asymmetrical and biological as the campaign approaches Cobtopus.

The final arena feels less like a room and more like the corrupted world developing a nervous system around the player.

---

# Boss worlds

The signature bosses should remain identifiable even if their sprites were temporarily hidden. Their arenas now carry their identity.

## Maize Monarch - false authority

The Monarch's court uses:

- monumental vertical pillars,
- a large ritual arch,
- crown-like structural geometry,
- restrained earthen gold,
- symmetry and ceremonial spacing.

The boss sprite also receives a stronger halo/mantle language so it reads as a ruler rather than simply a larger cob.

The environment tells the story: this creature inherited ruins and declared them a throne.

## Husk Architect - imposed order

The Architect owns:

- radial measurements,
- construction circles,
- drafting lines,
- ghost wall plans,
- rigid plated details on the boss itself,
- the existing Husk Shift barriers.

Its threat is spatial authorship. The player and the Architect are effectively fighting over who gets to define the room.

## Cobtopus - organic convergence

Cobtopus replaces right angles with:

- thick root-like tendrils entering from outside the frame,
- curves bending toward the arena core,
- a black central void,
- organic radial pressure,
- a darker central core in the boss silhouette.

By the final trial, corruption is no longer pretending to be architecture. It has become an organism.

## Impossible Encore - incompatible worlds collide

On Impossible, the apparent Trial 13 ending remains a false summit.

**NOT YET.**

Maize Monarch, Husk Architect, and Cobtopus return together. The arena does not introduce another decorative theme. Instead, the three established systems overlap incorrectly:

- Monarch ritual rings,
- Architect measured spokes,
- Cobtopus organic curves.

The world looks as though three incompatible rules are simultaneously trying to own the same space.

---

## Restoration is structural

Color restoration is still connected to performance, but v0.23 reduces the previous dependence on stars and ambient sparkle.

Restoration now primarily reveals **order**:

- malformed lines align,
- broken arcs become more legible,
- structural color veins appear,
- environmental silhouettes gain cleaner relationships,
- stage-clear tableaux hold the repaired scene long enough to inspect it.

The rainbow remains the only object allowed to carry the full spectrum continuously.

---

## Controls

| Input | Action |
|---|---|
| **1 / 2 / 3 / 4** | Easy / Normal / Hard / Impossible |
| **W A S D** | Move the vulnerable heart-body |
| **Arrow Keys** | Steer the safe head / horn |
| **Space** | Horn strike / Rainbow Snap |
| **P** | Pause |
| **M** | Menu |
| **T** | Replay Living Scar + First Flight from title |
| **C** | Rebind controls |
| **R** | Rules |
| **S** | Music + SFX |

Pull the body away from the horn to charge the scar. A charged **Rainbow Snap** is attack, dash, dodge, traversal, pickup route, and combo setup at once.

Only the ♥ body takes damage. The head and rainbow can safely enter danger to attack, Graze ordinary kernels, Parry projectiles, and collect powerups.

---

## Easy is the first strategy lesson

First Flight teaches *how* the creature works. Easy begins teaching *why* that geometry is useful.

The first three Easy encounters surface one compact strategy at a time:

- **HEART HURTS · HORN + RAINBOW SAFE** - keep the vulnerable half out of the dangerous line while reaching in with the safe half.
- **PULL BACK · SNAP THROUGH CORN** - retreating the heart can be an offensive setup because separation is stored power.
- **GRAZE OR PARRY · RECHARGE FASTER** - once movement is comfortable, danger itself becomes a resource for faster flow.

Easy is therefore not a disposable low-pressure mode. It is the second half of onboarding.

---

## Mastery ladder

The default progression is deliberately legible:

**First Flight → Easy → Normal → Hard → Impossible**

Space / Enter defaults to Easy on the title. Expert players can still press `1`, `2`, `3`, or `4` directly. After a clear, the victory panel points toward the next pressure tier instead of dropping the player back into an unexplained four-choice menu.

The goal is to let confidence rise before complexity and punishment rise.

---

## Combat systems retained from v0.22

The visual rewrite and novice onboarding do not soften the later combat model.

Impossible still uses:

- Hard-density population caps rather than chain-friendly swarm inflation,
- 2.4x hostile attack pressure,
- 1.5x enemy HP,
- 1.25x hostile movement/projectile speed,
- 1.25x Husk Shift cadence,
- scarcer pickups,
- cyan piercing attacks that must be dodged,
- no heart/shield sustain from Impossible Lucky 13,
- one-generation terminal Splitcorn,
- the bounded three-boss to six-terminal-copy Encore.

The Heavy Drop, kick-driven camera, critical-health scar fray, Chromatic Overload, mastery grades, and final scar-release ending also remain.

---

## The final release

Once the world is restored, the connection that kept Stretchicorn alive is allowed to stop fighting.

The living scar loses tension, fractures into colored remnants, and releases the two halves toward the restored earth.

**THE LAST RAINBOW LETS GO.**

The ending is intentionally the inverse of the whole control language. The campaign teaches that tension and connection mean survival. Victory is the first moment connection is allowed to end.

---

## 13KB engineering

The readable source is converted into the competition build through:

```text
readable source
      ↓
custom safe golf
      ↓
Terser 5.50.0
      ↓
pinned Roadroller 2.1.0 model
      ↓
Zopfli 0.4.3 / 80 iterations
      ↓
js13k ZIP
```

The fully qualified v0.23.1 First Flight artifact is:

```text
13,260 / 13,312 bytes
52 bytes free
```

SHA-256:

```text
467524f93161f18985fc335da7270d139e71ef58e82976bf40b1f5e87deeb8d4
```

Runtime contains no external image, font, music, framework, or game-engine assets.

---

## Qualification

The frozen v0.23.1 artifact passes:

- gameplay/Impossible regression suite,
- Living Scar + First Flight source/artifact assertions,
- Easy-default and direct 1–4 difficulty mapping,
- deterministic Terser + Roadroller packaging,
- offline/no-network audit,
- deterministic single-file ZIP verification,
- 13,312-byte hard limit,
- exact submitted ZIP in Chromium,
- exact submitted ZIP in Firefox,
- standalone `file://` HTML in Chromium,
- standalone `file://` HTML in Firefox,
- Wavedash isolation.

A second real-input browser qualification drives the packed competition ZIP with ordinary keyboard events in **both Chromium and Firefox**. It moves the heart, aims the horn, creates real tension, performs three charged Rainbow Snaps, and verifies the game automatically starts Easy. The test does not skip practice or mutate internal game state.

---

## Build and play

Fastest playtest:

[`dist/stretchicorn-local.html`](dist/stretchicorn-local.html)

Download that one HTML file and double-click it. No server is required.

Competition ZIP:

[`dist/stretchicorn-js13k.zip`](dist/stretchicorn-js13k.zip)

Versioned competition snapshot:

[`dist/stretchicorn-desktop-v0.23.1.zip`](dist/stretchicorn-desktop-v0.23.1.zip)

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

## Architecture

```text
src/00-core.js       state, spawning, geometry, procedural audio
src/01-combat.js     Snap, Parry, Graze, Splitcorn, scoring
src/02-update.js     fixed-step simulation, AI, Impossible pressure
src/03-render.js     authored procedural world, bosses, scar, overload
src/04-ui-input.js   Living Scar, First Flight, menus, victory flow
```

Designed for **js13kGames 2026** around **Unicorns & Rainbows**.
