# v0.21.1 Impossible Encore

Stretchicorn keeps four launch modes, but v0.21.1 now treats Impossible as an expert ruleset rather than a larger swarm. Playtesting showed that simply adding enemies can backfire: strong players turn extra bodies into easier chains, more Lucky 13 triggers, and near-continuous Rainbow movement.

| Key | Mode | Pressure scalar | Enemy population | Resources | Extra rules |
|---|---|---:|---|---|---|
| `1` | Easy | `0.7` | reduced | friendlier pickup cadence | onboarding |
| `2` | Normal | `1.0` | original baseline | original baseline | canonical campaign |
| `3` | Hard | `1.6` | high | scarcer pickups | preserves the former top-end swarm |
| `4` | Impossible | `2.4` hostile clock | **capped at Hard density** | much scarcer pickups | piercing volleys, anti-chain economy, +50% HP, +25% hostile motion/projectiles, +25% Husk Shift cadence, boss-rush encore |

**Space / Enter** always starts Normal. Game Over retry preserves the chosen mode. Returning to the title lets the player choose again.

## Scaling philosophy

Easy, Normal and Hard retain the same readable control contract: player movement, rainbow spring physics, damage taken per hit and warning presentation are unchanged.

Impossible is designed to attack the dominant advanced strategy instead of feeding it. Enemy population and boss reinforcement ceilings are capped at the Hard multiplier (`1.6×`), while the hostile simulation keeps the `2.4×` attack clock and its other expert modifiers:

- every spawned enemy receives **1.5× HP**,
- hostile enemies move **1.25× faster**,
- hostile projectiles travel **1.25× faster**,
- Husk Shift cycles progress **1.25× faster**,
- friendly pickup opportunities are substantially less frequent,
- combo multiplier is capped at **2.5×** instead of 4×,
- Impossible combo windows decay after roughly **1.2 s**, or **1.8 s** for sling kills, instead of 2.5 / 3.5 s,
- Double Rainbow's long invulnerability window is reduced from **0.55 s to 0.18 s**.

The point is not to make the unicorn sluggish. The controls remain responsive. Impossible makes old mastery loops less self-sustaining and asks the player to make cleaner spatial decisions.

## Cyan piercing kernels

From Trial 3 onward, every third ranged volley on Impossible can become a **cyan piercing volley**.

These larger kernels are deliberately outside the normal counter economy:

- the horn **cannot parry** them,
- grazing them grants **no +13 score and no spring charge**,
- Rainbow Snap, Double Rainbow and sling/dash invulnerability **do not negate the hit**,
- a Husk Shield can still absorb one, preserving a scarce defensive resource,
- they are larger and rendered cyan so the player can read them as a distinct threat.

They must therefore be dodged with positioning rather than converted into offense. This is the main answer to perpetual dash-and-chain play: the player can still move aggressively, but no longer has a universal counter state.

## Lucky 13 on Impossible

Lucky 13 remains part of the game's identity, but it no longer becomes a renewable life engine in Impossible.

On Easy / Normal / Hard, every 13 kills still grants the familiar heart + shield + spring reward. On Impossible it grants only:

- spring charge / Snap readiness,
- `+130` score,
- the Lucky 13 visual celebration.

It does **not** restore a heart or grant a shield. The player can celebrate the streak without turning a dense encounter into extra health.

## Representative starting populations

Impossible now deliberately matches Hard population so additional targets cannot make chaining easier. The challenge comes from attack cadence, durability, piercing patterns, resource scarcity and the encore.

| Trial | Easy | Normal | Hard | Impossible |
|---|---:|---:|---:|---:|
| 1 · Pastel Patch | 3 | 5 | 8 | **8** |
| 5 · Maize Monarch | 3 | 4 | 6 | **6** |
| 9 · Husk Architect | 1 | 1 | 2 | **2** |
| 11 · Kernel Gauntlet | 14 | 21 | 34 | **34** |
| 13 · Cobtopus | 8 | 11 | 16 | **16** |

The full 13-trial starting populations are:

```text
Easy       3  5  6  7  3   7   8   9  1  11  14  14   8
Normal     5  7  9 11  4  11  12  15  1  17  21  20  11
Hard       8 12 15 17  6  18  20  23  2  27  34  32  16
Impossible 8 12 15 17  6  18  20  23  2  27  34  32  16
```

## Impossible Encore

Defeating Cobtopus on Impossible is still a false summit.

The arena clears, Husk Shift starts a fresh warning cycle, and Stretchicorn must fight the three signature bosses **at the same time**:

- **The Cobtopus** keeps its radial / curved projectile identity and can emit piercing volleys.
- **The Maize Monarch** returns with its phased aimed-fan behavior and can emit piercing volleys.
- **The Husk Architect** adds dynamic terrain and projectile fans, including piercing cycles.

The normal victory sequence is locked until all three encore bosses are defeated. Clearing the trio unlocks the special **IMPOSSIBLE!** ending.

Hard and lower difficulties still finish immediately when Trial 13 Cobtopus is defeated.

## Verification

The regression suite now covers all four launch scalars, the Hard-density cap on Impossible, retry behavior, Hard-vs-Impossible HP separation, pickup scarcity, hostile movement/projectile scaling, accelerated Husk Shift timing, Lucky 13's no-heal/no-shield expert rule, piercing-volley creation, zero graze charge from piercing kernels, piercing damage through dash invulnerability, safe spawns, fixed-step input behavior, the complete three-boss transition and a bounded Impossible encore stress run.

The source candidate has changed since the previous 13,270-byte archive. The release ZIP must be rebuilt and size-verified before replacing the competition artifact.
