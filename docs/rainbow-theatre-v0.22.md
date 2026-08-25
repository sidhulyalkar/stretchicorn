# v0.22 — Rainbow Theatre

## Core fantasy

Stretchicorn does not begin as a healthy hero entering a colorful world.

It begins dead.

Somewhere before the game starts, the unicorn was torn apart in a catastrophe that also drained the world of its color. Its two halves lie separated in a silent, dark cornfield. The sky has collapsed into bruised charcoal. Plants have become papery silhouettes. Corn still moves, but it has become warped, territorial, and hostile.

One thing survived intact: a thin ribbon of rainbow light.

The ribbon finds the two halves of the unicorn and pulls them toward one another. It cannot restore the original body, so it does something stranger: it becomes the missing body between them. The rainbow stitches the creature back into motion as a living elastic bridge.

That makes the central mechanic the story itself:

- the **heart-body** is the revived, vulnerable half,
- the **horn/head** is the safe leading half,
- the **rainbow spring** is the supernatural scar holding them together,
- stretching is the act of loading that life-force,
- Rainbow Snap is the resurrected creature weaponizing the force that brought it back,
- damage threatens the fragile revived half,
- skill restores color to the world because the rainbow is the last source capable of producing it.

Stretchicorn is not carrying a magical weapon. **Stretchicorn is being held alive by one.**

## The mystery

The game should not explain exactly who killed the unicorn or why the world became monochrome in an opening paragraph. The player wakes in the aftermath and reconstructs the meaning through places, enemy behavior, boss imagery, and the progressive return of color.

The corn world is not simply evil farmland. Something has gone wrong with it.

The Maize Monarch behaves like a ruler protecting an empire that should already be dead. The Husk Architect keeps rebuilding walls and cages as if trying to preserve a failing order. Cobtopus is less a normal animal than a grotesque concentration of the world's corrupted growth. The deeper Stretchicorn travels, the more it should feel that the corn has adapted to a world where rainbow light disappeared.

This leaves useful ambiguity for the player:

- Did the corn destroy the rainbow world, or did it merely survive what destroyed everything else?
- Was Stretchicorn killed while trying to stop the catastrophe?
- Is the rainbow a remnant of Stretchicorn's own former magic, or an independent force that chose the unicorn as its vessel?
- Why do the most powerful corn creatures react so violently when color returns?

The game does not need to answer every question. Mystery is part of the atmosphere.

## Color as progression

The visual arc should make the story legible without exposition.

At the beginning of a run, the world is restrained:

- blue-black / charcoal sky,
- muted earth,
- dead cream corn,
- dirty amber danger,
- sparse cool highlights,
- almost no full-spectrum color outside the player.

The rainbow is initially the only object allowed to use the complete spectral palette.

Successful play gradually contaminates the world with color:

### Low performance / fresh stage

The world is nearly monochrome. Background silhouettes barely move. Music is thin. The rainbow looks vivid because everything around it has forgotten what vividness is.

### Graze / Parry / clean hits

Tiny chromatic flecks appear in grass, dust, clouds, enemy fragments, and impact particles. These should not look like generic score effects. They are evidence that the world is remembering color.

### Combo growth

The arena receives subtle spectral echoes: horizon glow, colored motes, flower pixels, faint aurora streaks, richer particle trails, slightly more harmonic content in the soundtrack.

### Double Rainbow

For a short moment the world is almost fully awake. Background silhouettes gain rim light, particles bloom, and the soundtrack opens into a higher register.

### Lucky 13

Lucky 13 becomes a tiny restoration event. The arena flashes through a brief storybook prism burst and then settles with slightly more persistent color than before.

### Stage clear

The restored color should not disappear instantly. During the transition beat, the player sees the place they just survived in a healthier state. That gives victory meaning beyond a score increment.

## The rainbow remembers

Each restored region can contribute one tiny reusable motif to later rainbow effects. The implementation should reuse existing procedural particle primitives rather than store art assets.

Examples:

- Pastel Patch → tiny petal / blossom flecks
- Husk Maze → angular shard motifs
- Maize Monarch → crown sparks
- Prism Popcorn → diamond glints
- Husk Architect → little geometric blocks
- Sugar Corn → crystalline stars
- Cobtopus → curling spiral droplets

By late game, a strong Rainbow Snap should feel visually richer because it carries echoes of places already restored.

The rainbow therefore becomes a compact visual memory of the journey.

## Stage identity

The 13 trials should feel like chapters in one dark storybook rather than thirteen enemy-count configurations.

1. **Pastel Patch — The First Color**
   - dead meadow silhouettes
   - first flowers wake as the tutorial progresses
   - distant soft hills and slow cloud drift

2. **Kernel Panic — The Fields Stir**
   - crooked corn rows and low amber haze
   - movement in the far field suggests the world noticing Stretchicorn

3. **Popcorn Front — The First Barrage**
   - burnt-orange horizon
   - drifting husks and smoke-like pollen

4. **Husk Maze — The Dead Orchard**
   - angular black-green walls
   - narrow shafts of moonlight

5. **The Maize Monarch — The False Court**
   - dead banners / crown silhouettes
   - warmer regal gold used sparingly around the boss

6. **Butter Blitz — Golden Fever**
   - oily luminous streaks
   - fast horizon parallax

7. **Husk Armor — The Shell Fields**
   - heavier shapes and low oppressive sky
   - thicker earth tones, less open air

8. **Prism Popcorn — Broken Spectrum**
   - fractured light appears for the first time outside the player
   - enemies seem to be imitating rainbow color incorrectly

9. **The Husk Architect — The Rebuilder**
   - moving geometry should look constructed, not merely spawned
   - warning shapes read like sinister blueprint marks

10. **Sugar Corn — Crystal Night**
    - sparkling frost / sugar motifs
    - darker sky with tiny chromatic stars

11. **Kernel Gauntlet — The March**
    - violent sunset or storm horizon
    - distant silhouettes imply an army beyond the arena

12. **Double Cornbow — Color War**
    - the world now contains significant reclaimed color
    - enemy and player effects visually collide rather than the player being the only luminous object

13. **The Cobtopus — The Black Rainbow**
    - storm-dark arena
    - curved clouds / vortex motifs
    - restored colors from prior stages circle the arena edge
    - defeating the normal finale should feel like the world nearly waking

### Impossible Encore

The false ending should weaponize relief.

1. Cobtopus dies.
2. Projectiles disappear.
3. Music resolves.
4. The arena brightens and a victory cue begins.
5. A tiny pause lets the player believe the run is over.
6. Color suddenly drains inward.
7. Boss fragments reverse direction.
8. The three signature bosses return.
9. Each original later performs its one false death and tears into two terminal copies.

The encore should feel like the corrupted world refusing resurrection one final time.

## Storybook presentation rules

The target is **procedural psychedelic storybook arcade art**, not conventional pixel art and not generic neon.

### Palette hierarchy

- backgrounds: dark restrained hues
- terrain: muted green / brown / cream / charcoal
- normal hostile danger: amber / orange / warm yellow
- cyan piercing danger: icy cyan with a sharp comet / spear silhouette so it remains identifiable without relying only on color
- player: luminous white + controlled rainbow spectrum
- restored world: increasingly saturated but never as saturated as the player's strongest effects

### Shape language

- the player uses curves, ribbons, rounded shapes, and elastic motion
- ordinary corn uses chunky organic shapes
- Husk Architect / corrupted structures use angular geometry
- cyan piercing projectiles use sharp directional silhouettes
- restoration effects use petals, stars, arcs, glints, and tiny recurring stage motifs

## Narrative delivery

Avoid an exposition dump.

The story should be delivered through:

- a wordless resurrection intro,
- the invisible tutorial,
- palette restoration during skilled play,
- short post-stage tableaux,
- boss entrances and deaths,
- music becoming fuller as color returns,
- the rainbow accumulating motifs,
- the Impossible false ending.

A few extremely short phrases can be used if bytes permit, but the visual language should carry the story even if all prose is removed.

Potential minimal phrases:

- `...COLOR?`
- `PULL.`
- `LIVE.`
- `THE FIELD REMEMBERS.`
- `NOT YET.`
- `RAINBOW RESTORED.`

These are optional seasoning, not required plot delivery.

## v0.22 implementation order after compression

1. **Resurrection + invisible tutorial**
2. **13-stage procedural palette/background identity**
3. **Player/enemy procedural life animation**
4. **Boss theatre + Impossible false-death reveal**
5. **Performance-reactive POP DROP layers**
6. **Trial grade/mastery feedback using existing telemetry**
7. **1–2 second post-stage storybook breathing beats**

No new core combat verb should be added in v0.22. The release should make the game dramatically clearer, richer, stranger, and more memorable without diluting the two-ended elastic-unicorn idea.
