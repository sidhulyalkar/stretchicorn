<div align="center">

<a href="docs/stretchicorn-hero.png"><img src="docs/stretchicorn-hero.png" alt="Stretchicorn key art" width="1000"></a>

# 🌽🦄 STRETCHICORN

### **STRETCH · SNAP · SHUCK.**

A 13KB desktop arcade-action game about a dead unicorn revived by the last surviving rainbow and forced through a corrupted corn world to return color and order to it.

Built for **js13kGames 2026 · Unicorns & Rainbows**.

[**Download the current js13k competition ZIP**](dist/stretchicorn-js13k.zip)  
[**Download the one-file local playtest**](dist/stretchicorn-local.html)

**v0.23.0 · STORYBOOK REFRAME · 12,985 / 13,312 bytes · 327 bytes free**

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

# v0.23 - STORYBOOK REFRAME

v0.23 is a visual-direction reset based on playtest feedback. The previous build spent too many bytes on decorative stars, sparkles, low-alpha motifs, and symbolic background flourishes that did not make the world feel more authored.

The new rule is stricter:

> **Every background mark must describe a place, a threat, restoration, or a control concept. If it is only decoration, remove it.**

The result is less visual confetti and much more composition, depth, architecture, negative space, and environmental storytelling.

See [`docs/storybook-reframe-v0.23.md`](docs/storybook-reframe-v0.23.md).

---

## Mandatory origin + tutorial

A new player no longer lands on a menu and then discovers the unusual controls while enemies are already active.

Every fresh load begins with a short visual prologue:

1. **The Dead Field** - the world has lost its color and the unicorn lies separated in two pieces.
2. **The Last Rainbow** - a surviving ribbon of color descends and crosses the wound.
3. **Resurrection** - the rainbow cannot rebuild the body, so it becomes the connection between the halves.
4. **WASD · MOVE THE HEART** - the player sees which half is vulnerable.
5. **ARROWS · AIM THE HORN** - the independent safe head is demonstrated visually.
6. **PULL AWAY · CHARGE THE SCAR** - distance visibly becomes tension.
7. **SPACE · RAINBOW SNAP** - the spring contracts and the central combat verb is shown before combat begins.

The sequence is mandatory as the first scene, but never imprisoning:

- **Space / Enter / Escape** skips it.
- A visible **SPACE SKIP** Canvas control appears in the scene.
- The skip control is clickable.
- **T** on the title screen replays the story at any time.

This is not a separate instruction manual. The tutorial is the resurrection scene.

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
| **T** | Replay origin/tutorial from title |
| **C** | Rebind controls |
| **R** | Rules |
| **S** | Music + SFX |

Pull the body away from the horn to charge the scar. A charged **Rainbow Snap** is attack, dash, dodge, traversal, pickup route, and combo setup at once.

Only the ♥ body takes damage. The head and rainbow can safely enter danger to attack, Graze ordinary kernels, Parry projectiles, and collect powerups.

---

## Combat systems retained from v0.22

The visual rewrite does not soften the combat model.

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

The v0.23 story/tutorial and visual reframe qualify at:

```text
12,985 / 13,312 bytes
327 bytes free
```

SHA-256:

```text
316a17876f513771d78828d21ca89ba8dcdf9c5dde3ee2e540a2c50e3ce74154
```

Runtime contains no external image, font, music, framework, or game-engine assets.

---

## Qualification

The frozen v0.23 artifact passes:

- gameplay/Impossible regression suite,
- mandatory story/menu release smoke,
- deterministic Terser + Roadroller packaging,
- offline/no-network audit,
- deterministic single-file ZIP verification,
- 13,312-byte hard limit,
- exact submitted ZIP in Chromium,
- exact submitted ZIP in Firefox,
- standalone `file://` HTML in Chromium,
- standalone `file://` HTML in Firefox,
- Wavedash isolation.

The local-file browser tests explicitly verify the sequence **story → skip → difficulty menu → gameplay**.

---

## Build and play

Fastest playtest:

[`dist/stretchicorn-local.html`](dist/stretchicorn-local.html)

Download that one HTML file and double-click it. No server is required.

Competition ZIP:

[`dist/stretchicorn-js13k.zip`](dist/stretchicorn-js13k.zip)

Versioned competition snapshot:

[`dist/stretchicorn-desktop-v0.23.0.zip`](dist/stretchicorn-desktop-v0.23.0.zip)

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
src/04-ui-input.js   origin cinematic, tutorial, menus, victory flow
```

Designed for **js13kGames 2026** around **Unicorns & Rainbows**.
