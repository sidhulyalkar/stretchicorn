<div align="center">

<a href="docs/stretchicorn-hero.png"><img src="docs/stretchicorn-hero.png" alt="Stretchicorn key art" width="1000"></a>

# 🌽🦄 STRETCHICORN

### **STRETCH · SNAP · SHUCK.**

A 13KB desktop arcade-action game about a dead unicorn revived by the last surviving rainbow and sent through a wounded meadow kingdom to return color to the world.

Built for **js13kGames 2026 · Unicorns & Rainbows**.

[**Download the current js13k competition ZIP**](dist/stretchicorn-js13k.zip)  
[**Download the one-file local playtest**](dist/stretchicorn-local.html)

**v0.25.0 · STORYBOOK MEADOW · story → First Flight → Easy → mastery**

</div>

---

## The premise

Stretchicorn begins **dead**.

A catastrophe tore the unicorn apart and drained the world almost completely of color. One surviving ribbon of rainbow light finds the two halves. It cannot rebuild the missing body, so it becomes the missing body itself: an elastic living scar that stitches Stretchicorn back into motion.

```text
PULL ←     ♥ BODY ═══════ 🌈 LIVING SCAR ═══════ 🦄 HEAD / HORN     → AIM
           vulnerable          life-force                 safe
```

The same rainbow that resurrects Stretchicorn becomes the movement system, spring, weapon, shield and the world's remaining source of full-spectrum color.

**Stretchicorn is not carrying the magic. Stretchicorn is being held alive by it.**

The world never gives the player a lore dump explaining the catastrophe. The landscape and the bosses are the evidence. As skill and restoration increase, the countryside slowly remembers color.

---

# First Flight

Stretchicorn has an unusual controller, so the game does not throw a new player directly into combat or ask them to choose a difficulty they do not understand.

Every first run follows one authored path:

**Living Scar origin → safe First Flight practice → three real Rainbow Snaps → Easy campaign.**

First Flight uses the same production movement, tension and Snap physics as combat, but removes enemies, damage, walls and pickups. It teaches one physical idea at a time:

1. **WASD · move the heart.** The rear half is vulnerable.
2. **Arrow keys · aim the horn.** The head and horn are safe.
3. **Pull away.** Separation stores energy in the living scar.
4. **Space · Rainbow Snap.** Stored tension becomes movement and attack.
5. Repeat until three genuine charged Snaps have been completed.

The mental model is deliberately smaller than the key list:

> **BODY PULLS · HORN POINTS · RAINBOW SNAPS**

After the third Snap, Easy starts automatically. Returning players can skip story/practice or select a difficulty directly, and `T` replays the complete origin from the title screen.

Easy then teaches strategy in context: keep the vulnerable heart behind the safe half, create charge by pulling back, Snap through enemies, and eventually turn Graze/Parry into faster recharge tools.

---

# v0.25 Storybook Meadow

v0.25 replaces the previous diagram-heavy environment direction with one continuous illustrated countryside.

The visual rule is now:

> **Filled silhouettes describe the world. Fine strokes are reserved for texture, weather and magic.**

Every arena shares the same visual anatomy:

- rolling distant hills,
- a faded rainbow hanging low on the horizon,
- a dark meadow ground plane,
- swaying grass clusters,
- small flower heads,
- tiny luminous glints that appear as restoration returns,
- restrained pastoral objects rather than abstract arena diagrams.

The result is meant to feel like one place changing as Stretchicorn travels deeper into it, not thirteen disconnected level backgrounds.

## The Withered Meadow

The opening trials return to the pastoral language that originally made Stretchicorn feel most distinctive.

A broken fence crosses the foreground. A small windmill turns slowly in the distance. Bent grasses and dull flowers sit against rolling hills while the rainbow is barely visible through the dark sky. A tiny bird silhouette occasionally rewards looking away from the combat for a moment.

At low restoration, the countryside is almost monochrome. As skill rises, flower heads and small points of light begin borrowing colors from Stretchicorn's rainbow.

## The Scarecrow Court

The Maize Monarch does not live in a geometric throne room. It has claimed a ruined farmstead.

A dark barn, open doorway, sunflower remnants and a broad scarecrow silhouette turn the same meadow into a folk-horror court. The Monarch's authority is deliberately false: it rules agricultural wreckage as though it were a palace.

This keeps the boss absurd enough to remain a giant corn monarch while giving the scene atmosphere rather than another collection of symbols.

## The Drowned Furrows

The Husk Architect appears where the old meadow irrigation system has sunk into water.

Shallow puddles catch thin rainbow reflections as restoration returns. Reeds lean in the wind. A heavy waterwheel is partially embedded in the wetland rather than presented as a floating diagram.

The Architect's actual Husk Shift walls provide the rigid geometry. The background stays organic, so the boss's ability to impose rectangular structure feels invasive rather than visually redundant.

## The Prism Thicket

Late in the campaign the meadow becomes strange without ceasing to be natural.

A gnarled dark tree and heavy botanical branches replace architectural line work. Small crystal-flower shapes grow near the ground. Their color is conditional on restoration, so the magical endgame emerges out of the same countryside instead of switching to a separate neon world.

Cobtopus deepens that corruption with roots pulling toward a dark organic center. The Impossible Encore tears the same meadow rather than inventing a fourth abstract visual system.

---

## Restoration

The rainbow is the only object allowed to carry the full spectrum continuously.

The world earns color back through play. Campaign progress, combo, Lucky 13 and stage clears feed the restoration state. The response is deliberately environmental rather than confetti-heavy:

- the horizon rainbow becomes more legible,
- flowers regain spectral color,
- puddles begin catching colored reflections,
- small glints appear in the meadow,
- prism growth becomes luminous,
- restored-stage tableaux hold the healed scene for a moment before the next trial.

The same magic operates at two scales:

**Rainbow + dead unicorn → remembers life.**  
**Rainbow + wounded meadow → remembers color.**

---

# Bosses

The three signature bosses remain mechanically distinct, but v0.25 makes their environments part of their character rather than surrounding them with abstract explanatory graphics.

### Maize Monarch

A false ruler occupying a barn-and-scarecrow court. Its crown, mantle and ceremonial entrance contrast against a world that is visibly agricultural and broken.

### Husk Architect

A spatial adversary inside drowned farmland. The pastoral scene stays soft and wet while the Architect materializes hard rectangular barriers on top of it. The visual conflict is intentional: **the meadow grows; the Architect imposes.**

### Cobtopus

The corruption becomes biological. Gnarled branches, roots and a dark center pull the familiar meadow inward. By Trial 13, the threat no longer looks built. It looks grown.

### Impossible Encore

The false clear still triggers **NOT YET** and the half-time Heavy Drop. The world itself is torn by broad dark scars while Monarch, Architect and Cobtopus return together. The finale reuses the established countryside and damages it rather than covering it in another layer of diagrammatic effects.

---

## Controls

| Input | Action |
|---|---|
| **W A S D** | Move the vulnerable heart-body |
| **Arrow Keys** | Aim / steer the safe head and horn |
| **Space** | Horn strike / charged Rainbow Snap |
| **1 / 2 / 3 / 4** | Easy / Normal / Hard / Impossible |
| **P** | Pause |
| **M** | Menu |
| **T** | Replay Living Scar + First Flight from title |
| **C** | Rebind controls |
| **S** | Music + SFX |

A charged Rainbow Snap is simultaneously attack, dash, dodge, traversal, pickup route and combo setup.

Only the ♥ body takes damage. The head and rainbow can safely enter danger to attack, collect powerups, Graze ordinary kernels and Parry counterable shots.

---

## Difficulty is a mastery ladder

The intended first-player path is:

**First Flight → Easy → Normal → Hard → Impossible**

Space / Enter defaults to Easy on the title. Experienced players can still press `1`, `2`, `3`, or `4` directly.

Impossible remains an expert anti-chain mode rather than a population spam mode. It uses Hard-capped enemy density with stronger attack cadence, health, movement, projectiles, Husk Shift pressure, scarcer sustain and cyan piercing attacks that cannot be countered and must truly be dodged.

Its finale preserves the bounded three-boss → six-terminal-copy Encore rather than creating an unbounded Splitcorn swarm.

---

## Audio and impact systems

The renderer rewrite does not remove the v0.22/v0.24 combat presentation work:

- procedural Web Audio soundtrack,
- half-time Impossible Heavy Drop,
- filtered saw wobble bass,
- kick-driven camera response,
- critical-health Living Scar fraying,
- max-combo Chromatic Overload,
- mastery grades and restored-stage tableaux,
- bittersweet final scar release.

The ending remains the inverse of the game's control language. For thirteen trials, tension and connection mean survival. Once the world is restored, the living scar can finally stop holding the two halves together.

**THE LAST RAINBOW LETS GO.**

---

## 13KB engineering

The competition build is deterministic:

```text
readable source
      ↓
custom safe identifier golf
      ↓
Terser 5.50.0
      ↓
pinned Roadroller 2.1.0 model
      ↓
Zopfli 0.4.3 / 80 iterations
      ↓
js13k ZIP
```

v0.25 keeps the readable v0.24 renderer in the repository for history, then loads the Storybook Meadow renderer as a small dedicated module. During production build, `scripts/build.mjs` removes the superseded `worldArt()` / `bossArt()` range before concatenating the v0.25 module, so the submitted game never pays for two world renderers.

Final qualified v0.25 artifact:

```text
13,286 / 13,312 bytes
26 bytes free
```

SHA-256:

```text
900f27ceb341cfd609f2a6f332ed476a2183f6cb238014349861ebdaf2f4983b
```

Runtime contains no external image, font, music, framework or game-engine assets.

---

## Qualification

The exact v0.25 competition artifact passes:

- deterministic gameplay and Impossible regression tests,
- Living Scar + First Flight assertions,
- three genuine First Flight Snaps before automatic Easy handoff,
- deterministic packed-artifact verification,
- offline / no-network audit,
- single-root-`index.html` ZIP validation,
- the 13,312-byte hard limit,
- exact submitted ZIP in Chromium,
- exact submitted ZIP in Firefox,
- standalone `file://` HTML in Chromium,
- standalone `file://` HTML in Firefox,
- Wavedash isolation.

The visual direction was also screenshot-reviewed across the origin, First Flight, Withered Meadow, Scarecrow Court / Monarch, Drowned Furrows / Architect, Prism Thicket, Cobtopus and Impossible Encore before the release artifacts were frozen.

---

## Build and play

Fastest local playtest:

[`dist/stretchicorn-local.html`](dist/stretchicorn-local.html)

Download that one file and double-click it. No server is required.

Competition submission:

[`dist/stretchicorn-js13k.zip`](dist/stretchicorn-js13k.zip)

Versioned snapshot:

[`dist/stretchicorn-desktop-v0.25.0.zip`](dist/stretchicorn-desktop-v0.25.0.zip)

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
src/00-core.js         state, spawning, geometry, procedural audio
src/01-combat.js       Snap, Parry, Graze, Splitcorn, scoring
src/02-update.js       fixed-step simulation, AI, Impossible pressure
src/03-render.js       character/enemy/combat rendering
src/03-world-v025.js   Storybook Meadow world + boss scenery
src/04-ui-input.js     Living Scar, First Flight, menus, victory flow
```

Designed for **js13kGames 2026** around **Unicorns & Rainbows**.
