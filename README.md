<div align="center">

<a href="docs/stretchicorn-hero.png"><img src="docs/stretchicorn-hero.png" alt="Stretchicorn key art" width="1000"></a>

# 🌽🦄 STRETCHICORN

### **STRETCH · SNAP · SHUCK.**

A **12.64 KB desktop arcade-action game** where one unicorn is split across two control points and held together by a living rainbow.

**Move the vulnerable body. Aim the safe horn. Pull them apart. Snap through an army of corn.**

Built for **js13kGames 2026 · Unicorns & Rainbows**.

[**▶ Play the standalone build**](dist/stretchicorn-local.html) · [**⬇ Download the js13k ZIP**](dist/stretchicorn-js13k.zip)

**v0.38.0 · 13 trials · 3 authored bosses · 4 difficulties · 1 Impossible Encore · 12,640 bytes**

</div>

---

<div align="center">

## Three inputs. One very strange unicorn.

<img src="docs/stretchicorn-controls.svg" alt="Stretchicorn controls: WASD moves the vulnerable body, arrow keys aim the safe horn, and Space releases rainbow tension as a Snap" width="1100">

</div>

Stretchicorn is intentionally simple to *operate* and surprisingly difficult to *master*.

| Input | Immediate meaning | What expert play turns it into |
|---|---|---|
| **WASD** | move the vulnerable body | anchoring, baiting, spacing, retreat geometry |
| **Arrow Keys** | aim the safe horn | attack lines, orbiting, parries, target routing |
| **Space** | release stored tension | attack, dash, dodge, traversal, combo setup |

There is no separate dash button, parry button, grapple button, or special-move wheel. The depth comes from the relationship between the two ends of the creature.

> **The body is the thing you protect. The horn is the thing you throw into danger. The rainbow between them is the game.**

---

# The hook

Most action games move one avatar and point a weapon from it.

Stretchicorn asks you to control **two related points at once**.

The heart-body can retreat while the horn attacks. The horn can circle an enemy while the body anchors near safety. Pulling farther creates more useful attack geometry, but also creates a longer creature that is harder to manage.

A single well-placed Rainbow Snap can:

- cross the arena,
- hit several enemies,
- dodge one projectile lane,
- parry another,
- collect a pickup,
- extend a combo,
- and leave the horn positioned for the next route.

The interesting part is not memorizing a move list. It is continually drawing a better line through danger.

---

# A tiny combat language with a high ceiling

### 🌈 Rainbow Snap

Pull the two halves apart to store tension, then press **Space**.

The rainbow contracts violently and turns positioning into momentum. A Snap is simultaneously offense, movement, defense, traversal and combo routing.

### 🌽 Kernel Parry

Large **gold round kernels** can be met with the horn and returned to sender.

Returned shots reward spacing rather than only timing:

- **RETURN x2** · close return
- **RETURN x3** · medium return
- **RETURN x4** · long return

That makes a difficult cross-arena counter more valuable than simply batting the nearest projectile back.

### ✨ Graze

The safe offensive half can skim danger to sustain momentum. Good play often means getting *closer* to the dangerous geometry, not running from everything on screen.

### 13-chain rhythm

Kills, charge, scoring and the recurring **Lucky 13** motif turn crowds into routing opportunities. At lower pressure, density can help a skilled player chain attacks. Higher difficulties deliberately attack that assumption.

### 🔷 Cyan means move

Late Hard and Impossible introduce **cyan piercing spikes** that cannot be returned.

Gold becomes an opportunity. Cyan remains a threat.

The player has to classify while moving:

**parry gold · dodge cyan · keep the Snap line alive**.

---

# Thirteen trials that build one skill set

Stretchicorn is not thirteen disconnected gimmicks. The campaign gradually recombines the same small mechanical vocabulary under more demanding conditions.

**Early game** teaches the body/horn relationship and basic Snap routing.  
**Mid game** introduces ranged kernels, parries, changing cover and shield logic.  
**Late game** mixes dense enemy formations, temporary geometry, returnable fire and dodge-only pressure.  
**Trial 13** asks for nearly everything at once.

The result is a game that can be understood almost immediately but still gives an experienced player something new to optimize several runs later.

---

# Three bosses, three different questions

The bosses are not ordinary enemies with larger HP bars. Each one changes what "good geometry" means.

| Trial | Boss | The question it asks |
|---|---|---|
| **5** | **Hideaway Husk** | Can you wait for the attack window, then punish decisively? |
| **9** | **Kernel Colonel** | Can you turn incoming fire into the key that opens the boss? |
| **13** | **Cobtopus Prime** | Can you combine movement, parries, arena pressure and split targets? |

## 🌽 Hideaway Husk

A little cob hides inside layered husk armor.

When the husk is closed, the shield is mechanically real: direct Snaps and returned kernels are blocked. When Husk commits to firing, the leaves peel apart and expose the angry cob inside.

**Its offense creates its vulnerability.**

That makes the first boss a readable duel instead of a health sponge.

## 🎖 Kernel Colonel

A decorated corn commander with a curled mustache, evil brows, military cap and layered husk shield.

The Colonel's defense is opened with **reflected kernels**, turning a defensive read into the route to offense. Long returned shots remain valuable after the shield falls because precision returns carry amplified damage.

## 🐙 Cobtopus Prime

A corrupted purple-and-gold corn core wrapped in husk armor and tentacles.

Phase I alternates protected states with short attack openings while arena pressure and projectiles force movement.

Destroying the shell triggers **Phase II**: Prime ruptures into two independent cores, each with its own reflected-kernel shield requirement.

| Difficulty | Returns required per split core |
|---|---:|
| Easy | 1 |
| Normal | 2 |
| Hard | 3 |
| Impossible | 4 |

Defeating one core does not end the fight. Both must be opened and destroyed.

### PHASE SHIFT: anti-cheese without anti-fun

Aggressive play should be rewarded, but bosses should not become stationary collision targets.

Three rapid successful direct hits trigger a deterministic **PHASE SHIFT** to a new part of the arena. The player keeps the earned damage, but must rebuild the attack line.

It breaks repetitive pinning without inflating HP or arbitrarily rejecting a successful combo.

---

# Four difficulties that change decisions, not just numbers

| Key | Mode | What changes |
|---|---|---|
| `1` | **Easy** | learn the geometry with forgiving pressure |
| `2` | **Normal** | the intended campaign rhythm |
| `3` | **Hard** | denser late fights + gold/cyan projectile decisions |
| `4` | **Impossible** | expert anti-chain pressure + stricter boss gates + Encore |

**Space starts Easy immediately.** There is no mandatory intro cutscene and no tutorial scene between the title and the game.

Impossible was specifically designed around an unusual playtest finding: simply spawning more enemies can make Stretchicorn *easier* for advanced players because more targets create more chaining opportunities.

So Impossible does not solve difficulty with endless population growth. It increases hostile pressure, restricts easy sustain, raises boss counterplay requirements and mixes in more threats that cannot be converted into free offense.

Finish Trial 13 on Impossible and the game still has one last answer:

**NOT YET.**

The bounded Impossible Encore pushes the system to its final readable limit rather than becoming endless survival sludge.

---

# The world restores with you

The background is not just decoration. It is a visual record of the run.

Stretchicorn begins in a dark, partially drained storm world. Progress and restoration return saturation, meadow detail and increasingly improbable rainbow structure.

### 🌈 Early · single rainbow
A broad six-band arch appears as the first promise of color.

### 🌈🌈 Mid · double rainbow
A second, smaller rainbow forms inside the first.

### 🌈🌈🌈 Late · triple rainbow
A third nested arch completes the restored sky.

The rainbows use one procedural geometry, share one center and follow natural radial color order: **red outside, violet inside**. The title screen uses the same rainbow family, so menu, world progression and theme all speak the same visual language.

The game gets more colorful because the player is succeeding, not because a level counter swapped in a different background asset.

---

# Everything is drawn. Nothing is downloaded.

The competition build ships **no sprite sheets, no raster game art, no audio files, no fonts, no external resources and no network calls**.

Stretchicorn, corn enemies, boss faces, kernels, husks, medals, mustaches, tentacles, shields, particles, title art, terrain and the single/double/triple rainbow sky are built procedurally from Canvas primitives.

The same few shapes repeatedly change jobs:

- ellipses become bodies, kernels, eyes, highlights and medals,
- arcs become shields, telegraphs and rainbow skies,
- Bézier curves become husks, tentacles, mane, tail and terrain,
- the six-color rainbow palette becomes character art, combat feedback and world restoration,
- one corn grammar scales from tiny enemies into highly authored bosses.

That reuse is not only compression. It gives the game a consistent visual language.

---

# Procedural audio

The soundtrack and combat feedback are synthesized with the Web Audio API.

Oscillators, percussion, pitched corn pops and bass voices share a compact sound vocabulary. The Impossible Encore shifts into a heavier arrangement instead of merely speeding up the normal track.

The music, hit feedback and corn-popping sounds come from the same tiny instrument rack.

---

# Why Stretchicorn is a js13k game at heart

The 13 KB restriction is not something applied after the design. It shaped the design.

### 1. The theme is mechanical
The unicorn and rainbow are not decorative wrappers. The rainbow physically connects the two control points, stores tension, moves the player and deals damage.

### 2. One mechanic produces many verbs
Three primary inputs create movement, aiming, dashing, parrying, grazing, traversal, combo routing and boss counterplay.

### 3. Complexity comes from recombination
Bosses and difficulty modes mostly remix existing rules instead of introducing expensive isolated subsystems.

### 4. The art system is also the compression system
Boss personality comes from recombining shapes already paid for elsewhere. A husk leaf can become armor. A kernel dot can become a medal. The same cob renderer can become a regular enemy, Colonel, or corrupted Prime.

### 5. The byte budget improved the game
Several weaker ideas were deleted rather than endlessly accumulated: mandatory story scenes, round grading, redundant backgrounds and duplicate rendering dialects. Their bytes were reinvested into clearer bosses, stronger difficulty and a more coherent sky.

The constraint repeatedly forced the question:

> **Is this feature important enough to exist?**

That is why the final game is both denser and cleaner than many earlier versions.

---

# 12,640 bytes

The deterministic production pipeline is:

```text
readable source
      ↓
custom source slicing + safe identifier golf
      ↓
Terser 5.50.0
      ↓
pinned Roadroller 2.1.0 model
      ↓
Zopfli 0.4.3
      ↓
one root-level index.html
```

Current competition artifact:

```text
dist/stretchicorn-js13k.zip
dist/stretchicorn-desktop-v0.38.0.zip
12,640 / 13,312 bytes
672 bytes free
```

SHA-256:

```text
2753615971b736a5e0e0c2636c94276344ed0cb846cedfeaf8a5c7fdc9138cf9
```

The committed artifact rebuilds byte-for-byte from source and contains exactly one root-level `index.html`.

---

# Release confidence

The current `main` release is tested against the failure modes most likely to sneak in during extreme byte optimization:

- direct title → gameplay launch with no hidden intro/training state,
- all 13 safe-spawn invariants,
- closed/open boss-shield authority,
- Hideaway firing vulnerability,
- Kernel Colonel reflected-kernel gate,
- Cobtopus Prime Phase I + independent split-core Phase II,
- Easy/Normal/Hard/Impossible return-count scaling,
- `RETURN x2/x3/x4` precision tiers,
- three-hit anti-pin Phase Shift,
- late-Hard cyan dodge-only pressure,
- deterministic single → double → triple rainbow restoration,
- natural outer-red / inner-violet rainbow ordering,
- deterministic archive generation,
- offline/no-network validation,
- hard 13,312-byte ceiling,
- exact submitted ZIP in Chromium and Firefox,
- standalone `file://` build in Chromium and Firefox.

The authoritative post-promotion `main` CI run is **`33428468123`**, with Competition Integrity, Chromium and Firefox all green.

---

# Controls

| Input | Action |
|---|---|
| **W A S D** | Move the vulnerable body / heart |
| **Arrow Keys** | Aim / steer the safe head and horn |
| **Space** | Horn strike / charged Rainbow Snap |
| **1 / 2 / 3 / 4** | Easy / Normal / Hard / Impossible |
| **P** | Pause |
| **M** | Return to menu |
| **C** | Rebind controls |
| **S** | Music + SFX settings |

---

# Build and play

Fastest playtest: download [`dist/stretchicorn-local.html`](dist/stretchicorn-local.html) and double-click it. No server is required.

Competition archive: [`dist/stretchicorn-js13k.zip`](dist/stretchicorn-js13k.zip)

```bash
python3 -m pip install zopfli==0.4.3
npm run release:competition
```

Useful development commands:

```bash
npm run build
npm test
npm run smoke
npm run browser:smoke
npm run browser:file-smoke
npm run release:competition
```

---

# Architecture

```text
src/00-core.js              state, geometry, spawning, procedural audio
src/01-combat.js            Snap, Parry, Graze, scoring, combat authority
src/02-update.js            fixed-step simulation and enemy behavior
src/03-render.js            base scene / combat rendering
src/03-keyart-v026.js       glossy character/material vocabulary
src/03-living-color-v027.js dark → restored color progression
src/03-bosses-v028.js       boss mechanics and encounter authority
src/03-boss-art-v034.js     compact procedural boss-detail grammar
src/03-sky-v030.js          nested single/double/triple rainbow world
src/03-title-v037.js        procedural title tableau
src/04-ui-input.js          menu, victory flow, controls, input
scripts/build.mjs           source composition, slicing and identifier golf
scripts/test-v038.mjs       current rainbow-world regression contract
scripts/test-v037.mjs       no-intro + late-Hard regression contract
scripts/test-v032.mjs       boss/counterplay runtime regression contract
```

---

<div align="center">

## **STRETCH · SNAP · SHUCK.**

**Three inputs. Thirteen trials. A living rainbow. An unreasonable amount of corn.**

### **12.64 KB.** 🌈🌽🦄

</div>
