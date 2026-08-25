# v0.22 Heavy Drop + Boss Theatre

This document defines the audiovisual grammar for the Rainbow Theatre impact pass. The objective is not to add a separate cinematic framework. Every effect should be a visible or audible projection of state the game already owns.

## State-first rule

The major presentation systems reuse existing gameplay signals:

| Existing state | Presentation authority |
|---|---|
| `queen == 3` | Impossible Encore half-time / Heavy Drop state |
| `beat` | kick camera displacement and Chromatic Overload intensity |
| `hearts` | living-scar integrity / fraying |
| `combo` | Chromatic Overload gate and restoration energy |
| `lit` | hostile-to-crystalline environmental interpolation |
| `winT` | final release / separation timing |

This keeps audio, art, story, and gameplay synchronized without another timeline system.

---

## Spectrum law

Stretchicorn's living scar is the world's spectral authority.

The arena may acquire isolated color as restoration grows, but ordinary scenery and bosses should not become continuous rainbow objects. Bosses receive narrow palette families and distinctive geometry instead.

- player scar: complete spectrum
- normal danger: warm amber / orange / yellow
- piercing danger: sharp icy cyan silhouette
- Maize Monarch: earthen gold / dried green / ritual amber
- Husk Architect: desaturated olive / drafting cream / warning yellow
- Cobtopus: bruised violet / husk brown / deep storm tones
- Impossible Encore: broken warm/cool fragments, not a clean rainbow

The world can remember color. Stretchicorn remains the thing that knows the whole spectrum.

---

# Audio: the Heavy Drop

## NOT YET transition

The false ending should create negative space before impact. Cobtopus dies, pressure clears, and the player is allowed to believe the run is over. `NOT YET.` then changes the musical grammar instead of merely increasing intensity.

The Encore state uses a sparse half-time pulse around 110 BPM-equivalent timing. The goal is enormous perceived weight with very few oscillator events.

## Wobble voice

The bass voice is synthesized from:

```text
sawtooth oscillator
        ↓
resonant low-pass filter
        ↑
6 Hz sine LFO → filter cutoff
        ↓
gain decay
        ↓
master music level
```

A low fundamental and aggressive filter modulation create movement without samples, wavetable assets, convolution, or FFT analysis.

The voice should appear as punctuation, not a continuous drone. Empty space is part of the drop.

## Boss sonic signatures

### Maize Monarch

Low, ceremonial, and vertical. Use sparse low triangle/brass-like punctuation around major phase moments. The boss should sound as if a dead court is announcing itself.

### Husk Architect

Short, rigid, mechanical square-wave accents. Timing should feel measured and constructed. Husk Shift materialization is the natural place for precise synthetic punctuation.

### Cobtopus

Deep sub pulses and rounder low sine energy. The sound language is less mechanical and more tidal, matching radial projectile pressure and organic arena curvature.

### Impossible Encore

Do not layer all three full musical identities at once. The Encore's identity is the Heavy Drop itself. Individual boss cues remain small accents inside the shared half-time space.

---

# Camera impact

The camera does not listen to an independent timer. It reads the same `beat` envelope generated when music schedules a kick.

Normal combat receives a restrained displacement. The Encore multiplies the displacement so each half-time kick physically moves the arena.

Design constraints:

- keep displacement brief enough that aiming remains legible,
- prefer vertical shove with a smaller horizontal component,
- never alter simulation coordinates,
- do not move UI in a way that obscures critical information,
- tune comfort before maximizing spectacle.

The visual world can recoil. The deterministic game state cannot.

---

# Chromatic Overload

Near maximum combo, the world should look unable to contain the amount of color Stretchicorn is injecting into it.

One persistent off-screen Canvas captures the completed gameplay scene. The main Canvas then receives two low-alpha offset copies using `screen` compositing and opposing hue rotations.

Offset magnitude is tied to `beat`, so Overload pulses with the soundtrack rather than becoming a static post-processing filter.

Rules:

- gate to elite combo only,
- keep alpha low enough to preserve projectile silhouettes,
- preserve cyan piercing readability,
- avoid permanent RGB noise,
- reuse one off-screen buffer rather than allocate per frame,
- leave HUD readability above the effect where possible.

The intended feeling is a short laser-like spectral rupture, not generic VHS glitch.

---

# The living scar under damage

The rainbow is life support, so health loss should be visible in the scar itself.

As hearts fall:

1. interior control points gain increasing stochastic displacement,
2. individual spectral strands narrow,
3. alpha becomes unstable,
4. high-frequency flicker suggests electrical or magical failure.

The distortion is deliberately render-only. It must never change collision, charge math, aim math, or the actual locations of Stretchicorn's two vulnerable/safe halves.

At critical health, the player should be able to read danger without looking at the heart counter: the thing holding the hero together looks close to snapping.

---

# Restoration geometry

The world begins spatially sick, not merely dark.

Low `lit` values introduce deterministic irregularity into repeated motifs. Positions wobble away from clean alignment and silhouettes feel improvised, thorny, or collapsed.

As `lit` rises:

- irregular offsets collapse toward regular spacing,
- repeated elements align,
- line weight gains confidence,
- crystalline diamond geometry begins appearing,
- the environment feels less corrupted and more ancient/intentional.

This makes restoration a geometric transformation in addition to a palette transformation.

The implication is that the beautiful world existed before the catastrophe. Stretchicorn is not painting a new universe on top of the corn world. It is revealing structure that the corruption had deformed.

---

# Boss arena grammar

## Maize Monarch: The False Court

### Narrative role

The Monarch is the corrupted world's claim to legitimacy. It behaves as if the dead order is still a kingdom and returning color is rebellion.

### Geometry

- strong vertical pillars
- banner-like rectangles
- large crown/sun outline
- mirrored ritual symmetry
- open central court around the boss

### Motion

Prefer slow ceremonial motion over jitter. Entrance rings and crown geometry should make the fight feel announced.

### Color

Gold is authority here, not rainbow. Use dirty amber, dry green, brown, and brief pale highlights.

### Combat resonance

Aimed fans and reinforcements read as royal command: the Monarch points and the field obeys.

---

## Husk Architect: The Rebuilder

### Narrative role

The Architect attempts to keep the broken world stable by continuously imposing structure on it. It is a boss that treats space itself as construction material.

### Geometry

- drafting grid
- measurement circles
- crosshair-like axes
- construction arcs
- rectangular warning footprints
- hard orthogonal Husk Shift walls

### Motion

Warnings should look plotted before they become physical. The visual progression is idea → blueprint → wall.

### Color

Desaturated olive, drafting cream, husk brown, and dangerous warning yellow. Avoid lush saturation.

### Combat resonance

The arena layout is its attack. When cover disappears, its projectile fans become the pressure created by an unfinished plan.

---

## Cobtopus: The Black Rainbow

### Narrative role

Cobtopus is corruption after it has stopped pretending to be civilization or architecture. It is excessive growth concentrated into one organism.

### Geometry

- curling arms
- radial lines
- concentric vortex pressure
- trajectories converging toward a center
- curved rather than orthogonal arena marks

### Motion

Everything should suggest circulation, pulling, orbit, or tide. Even static marks should appear to belong to a rotating field.

### Color

Bruised violet, storm charcoal, earthy corn tones, and narrow luminous accents.

### Combat resonance

Radial projectile patterns make the boss feel like the arena is breathing outward. Curved shots imply that straight Euclidean space is becoming unreliable near the creature.

---

# Impossible Encore: collision of worlds

The Encore is not a fourth clean visual language. It is the failure of the previous three to remain separate.

Arena art combines:

- Monarch concentric ritual geometry,
- Architect structural rings / measurements,
- Cobtopus radial curvature,
- fractured spokes that refuse to line up.

The result should look like three incompatible descriptions of the same world drawn on top of each other.

The Heavy Drop reinforces this collapse sonically. The player is no longer progressing through a chapter with one boss identity. They are surviving the whole corrupted world attempting to reject restoration at once.

---

# Final release

The ending should invert the entire game.

For thirteen trials, tension is survival. Stretching the scar farther creates power. Every major system teaches the player to keep the two halves connected and weaponize that connection.

Once restoration succeeds, the ending removes that necessity.

Using existing victory time:

1. the scar loses opacity and tension,
2. spectral fragments detach along its old path,
3. the head and body drift gently away from one another,
4. both halves descend toward the now-vibrant earth,
5. the environment reaches maximum restoration,
6. the rainbow fragments continue after the connection is gone.

`THE LAST RAINBOW LETS GO.`

The scene should be quiet enough that the player notices the reversal. The entire game was about maintaining a connection. Victory is finally allowing it to end.

---

# Release constraints

Current qualified artifact:

```text
12,420 / 13,312 bytes
892 bytes free
SHA-256 a5d6bde0f3e3dbf134171550e962c5fb322c9a4b20629cbaff61e941bea70271
```

The impact pass has qualified in:

- exact js13k package verification,
- Chromium exact-submission runtime,
- Firefox exact-submission runtime,
- forced Chromium max-combo / critical-scar / Encore / final-release rendering,
- forced Firefox max-combo / critical-scar / Encore / final-release rendering,
- Wavedash isolation.

Remaining tuning should protect a meaningful byte reserve and prioritize feel over adding another feature family.
