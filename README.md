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

## The living scar

Stretchicorn begins **dead**.

A catastrophe tore the unicorn into two pieces and drained nearly all color from the world. One surviving ribbon of rainbow finds the separated halves. It cannot rebuild the missing body, so it becomes the body instead, stitching Stretchicorn back into motion as an elastic bridge of living light.

```text
PULL ←     ♥ BODY ═══════ 🌈 LIVING SCAR ═══════ 🦄 HEAD / HORN     → AIM
           vulnerable          life-force                 safe
```

The rainbow is the resurrection, scar, spring, weapon, movement system, and the last source of full-spectrum color. Stretchicorn is not carrying a magical weapon. **Stretchicorn is being held alive by one.**

The wider catastrophe remains deliberately mysterious. The story is communicated mainly through play, scenery, sound, boss architecture, and transitions rather than exposition.

See [`docs/rainbow-theatre-v0.22.md`](docs/rainbow-theatre-v0.22.md) for the full visual/narrative direction.

---

## 🎮 Controls

| Input | Action |
|---|---|
| **1 / 2 / 3 / 4** | Easy / Normal / Hard / Impossible |
| **W A S D** | Move the vulnerable heart-body |
| **Arrow Keys** | Steer the safe head / horn |
| **Space** | Horn strike / Rainbow Snap |
| **P** | Pause |
| **M** | Menu |
| **C** | Rebind controls |
| **R** | Rules |
| **S** | Music + SFX |

Pull the body away from the horn to charge the living scar. A charged **Rainbow Snap** is attack, dash, dodge, traversal, pickup route, and combo setup at once.

Only the ♥ body takes damage. The head and rainbow can safely reach into danger to attack, Graze ordinary kernels, Parry projectiles, and collect powerups.

---

# 🌈 v0.22 - RAINBOW THEATRE

The release goal is simple: make Stretchicorn feel like **procedural psychedelic storybook arcade art** while preserving the strange two-ended combat that makes it Stretchicorn.

## Resurrection as tutorial

Trial 1 teaches through required actions rather than a timed rules dump:

1. **WASD · MOVE THE HEART**
2. **ARROWS · AIM THE HORN**
3. **PULL AWAY · STRETCH THE RAINBOW**
4. **SPACE · RAINBOW SNAP**
5. **COLOR RETURNS.**

The first corn remains dormant until the player's first Snap. The rainbow fades into existence during the opening, so learning the controls simultaneously tells the resurrection story.

## Skill physically restores the world

The scene has a restoration intensity built from campaign progress, combo, Lucky 13, and victory state.

At weak play the world remains muted and hostile. As performance rises:

- procedural motifs brighten,
- spectral particles multiply,
- flowers and stars gain color,
- horizon rainbows become visible,
- hostile silhouettes align into cleaner crystalline geometry,
- stage clears hold the newly restored world for a short breathing beat.

**Playing well teaches the world how to be colorful again.**

## Thirteen procedural chapters

Every trial has its own restrained palette and symbolic Canvas-built visual language. There are no runtime image assets.

| Trial | Motif |
|---|---|
| Pastel Patch | sleeping blossoms |
| Kernel Panic | marching stalks |
| Popcorn Front | smoke fronts |
| Husk Maze | looming maze pillars |
| Maize Monarch | dead crowns and false court |
| Butter Blitz | horizontal golden streaks |
| Husk Armor | layered shells |
| Prism Popcorn | broken-spectrum diamonds |
| Husk Architect | drafting geometry |
| Sugar Corn | crystalline stars |
| Kernel Gauntlet | marching army teeth |
| Double Cornbow | paired arches |
| Cobtopus | curling vortex forms |

The player's scar remains the only object allowed to carry the full rainbow spectrum continuously.

---

# 👑 Boss worlds

The major bosses no longer feel like large enemies pasted onto the same arena. Each one imposes a different visual grammar on the world.

## Maize Monarch - the false court

The Monarch owns imperial verticality: earthen-gold banners, throne-like pillars, crown geometry, ritual symmetry, and slow low-register musical punctuation.

The arena should feel less like a field and more like a civilization trying to declare itself permanent after color vanished.

## Husk Architect - the machine that remakes space

The Architect owns grids, drafting lines, construction circles, measured arcs, and Husk Shift geometry. Its arena looks planned rather than grown.

That supports the gameplay fantasy: this boss does not merely attack Stretchicorn. It repeatedly **redesigns the room around it**.

## Cobtopus - the world turned organic

Cobtopus owns curling arms, vortex trajectories, radial pressure, and a submerged organic feel. Arena marks bend toward a shared center instead of obeying a grid.

The geometry suggests that the corruption has stopped constructing structures and started behaving like an organism.

## Impossible Encore - all rules collide

The Trial 13 victory is a false summit on Impossible.

Cobtopus falls. Pressure disappears. The music appears ready to resolve.

Then:

**NOT YET.**

Maize Monarch, Husk Architect, and Cobtopus arrive together. The arena deliberately combines incompatible visual grammars into broken concentric rings and fractured radial lines. The world itself appears unable to decide which boss owns it.

Each original boss gets one false death and tears into two same-identity terminal copies. The system is bounded at six descendants and victory remains locked until all terminal copies are gone.

---

# 🔊 The Heavy Drop

The Impossible Encore has its own procedural half-time music state rather than simply playing normal POP DROP faster.

When **NOT YET** triggers:

- the normal arrangement cuts into a sparse half-time pattern,
- a synthesized sawtooth bass enters,
- a resonant low-pass filter shapes the bass,
- a 6 Hz LFO modulates the filter cutoff into a trench-style wobble,
- sub kicks and sparse upper percussion leave room for the bass,
- false-death events receive their own low falling stings.

Everything is generated with Web Audio. No audio samples are stored in the submission.

## Kick-driven camera

The same `beat` envelope that represents a procedural kick also drives the Canvas translation matrix. Normal music produces a small physical pulse. The Impossible Encore multiplies that pulse so the half-time hits shove the arena itself.

There is no second cinematic clock to drift out of sync with the soundtrack.

---

# ⚡ Chromatic Overload

Near maximum combo, the game enters an audiovisual overdrive state.

The completed scene is copied into one reusable off-screen Canvas and composited back with `globalCompositeOperation = 'screen'`. Two tiny beat-responsive offset copies use opposing hue rotations to create a laser-like channel split.

The effect is conditional, reuses one persistent canvas, and appears only at elite combo. The main rainbow still reads as the source of the spectrum rather than turning every object into permanent rainbow noise.

---

# 💔 The scar can fail

Health now has a direct visual consequence.

At critical hearts the living scar becomes unstable:

- internal control points pick up high-frequency randomized displacement,
- the spectral strands narrow,
- alpha begins to flicker,
- the cable looks increasingly frayed and over-tensioned.

This is presentation only. The player's movement physics remain predictable. The game communicates danger by making the thing keeping Stretchicorn alive look as if it is coming apart.

---

# 🌅 The final release

The ending pays off the resurrection premise instead of merely displaying a score card.

Once the world is restored, the scar no longer needs to keep fighting. During the victory tableau:

- its tension visually fades,
- the rainbow breaks into spectral shards,
- the body and head drift gently apart,
- both halves sink toward the now-vibrant earth,
- the world reaches its fullest restoration state.

The final line is:

**THE LAST RAINBOW LETS GO.**

The ending is intentionally bittersweet. The force that resurrected Stretchicorn succeeds by eventually making itself unnecessary.

---

## 🌽 Splitcorn and Impossible anti-chain rules

The v0.21.1 combat redesign remains intact.

Splitcorn is one generation only:

- Cob Charger → 2 Kernel Kamikazes
- Pop-Gunner → 2 Kernel Kamikazes
- Prism Popper → 2 Pop-Gunners
- Husk Bruiser → 2 Pop-Gunners

Split-born children never split again.

Impossible caps population at Hard density rather than becoming easier through infinite chain fodder. It adds:

- 2.4x hostile attack pressure,
- 1.5x enemy HP,
- 1.25x hostile movement and projectile speed,
- 1.25x Husk Shift cadence,
- scarcer pickups,
- cyan piercing shots that must be dodged,
- no heart/shield sustain from Lucky 13.

Piercing shots use a sharp directional comet/spear shape so their mandatory-dodge rule is readable by shape, not color alone.

See [`docs/difficulty-modes.md`](docs/difficulty-modes.md).

---

## 🏆 Mastery grades

Non-final stages generate a compact restoration grade from existing telemetry:

- **S** - zero damage and strong finishing combo
- **A** - zero damage
- **B** - 1 to 2 hits
- **C** - 3+ hits

A short `RESTORED · grade` tableau holds the stage after combat so the player can see what changed.

---

## 📦 13KB engineering

v0.21.1 had reached:

```text
13,293 / 13,312 bytes
19 bytes free
```

A compression tournament was used to discover a stronger release architecture. Production releases now use:

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

Roadroller is run twice under the fixed model and the outputs are byte-compared before packaging. The exploratory optimizer is not part of normal releases.

After Rainbow Theatre, all thirteen chapter motifs, Heavy Drop audio, kick camera, living-scar damage, Chromatic Overload, boss arena languages, and the final release ending, the qualified competition artifact is:

```text
12,420 / 13,312 bytes
892 bytes free
```

SHA-256:

```text
a5d6bde0f3e3dbf134171550e962c5fb322c9a4b20629cbaff61e941bea70271
```

Runtime still contains no external images, fonts, music files, framework, or game engine.

---

## 🧪 Qualification

The exact submission build is checked for:

- all four difficulty modes,
- 120 Hz input retention and fixed-step simulation behavior,
- Impossible density/HP/speed/attack-pressure invariants,
- piercing-shot rules,
- Splitcorn terminal children,
- bounded 3 → 6 Impossible Encore duplication,
- Husk Shift geometry,
- safe spawns and bounded populations,
- offline/no-network runtime,
- Canvas API safety,
- deterministic one-file root-level ZIP structure,
- exact 13,312-byte ceiling,
- Wavedash isolation from the competition packer,
- real Chromium exact-submission smoke,
- real Firefox exact-submission smoke,
- forced Chromium max-combo + critical-scar + final-release rendering,
- forced Firefox max-combo + critical-scar + final-release rendering.

All qualification gates are green for the current Heavy Drop build.

---

## 🚀 Build and play

Competition ZIP:

[`dist/stretchicorn-js13k.zip`](dist/stretchicorn-js13k.zip)

Versioned snapshot:

[`dist/stretchicorn-desktop-v0.22.0.zip`](dist/stretchicorn-desktop-v0.22.0.zip)

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
npm run wavedash:test
npm run release:competition
```

---

## Architecture

```text
src/00-core.js       state, spawning, geometry, procedural audio
src/01-combat.js     Snap, Parry, Graze, Splitcorn, scoring
src/02-update.js     fixed-step simulation, AI, Impossible pressure
src/03-render.js     storybook world, scar, boss arenas, overload
src/04-ui-input.js   menus, tutorial, controls, victory flow
```

Designed and built for **js13kGames 2026** around **Unicorns & Rainbows**.

No external runtime assets. Just JavaScript, Canvas, Web Audio, one resurrected elastic unicorn, and a corn world learning what color feels like. 🌈🦄🌽
