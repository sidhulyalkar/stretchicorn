# v0.21.1 Impossible Encore

Stretchicorn keeps four launch modes, but v0.21.1 deliberately widens the top end after the previous Impossible proved beatable on a first run.

| Key | Mode | Pressure scalar | Enemy density / attacks | Resources | Extra rules |
|---|---|---:|---|---|---|
| `1` | Easy | `0.7` | reduced | friendlier pickup cadence | onboarding |
| `2` | Normal | `1.0` | original baseline | original baseline | canonical campaign |
| `3` | Hard | `1.6` | former Impossible | scarcer pickups | preserves the previous top mode |
| `4` | Impossible | `2.4` | extreme | much scarcer pickups | +50% enemy HP, +25% hostile motion/projectiles, +25% Husk Shift cadence, boss-rush encore |

**Space / Enter** always starts Normal. Game Over retry preserves the chosen mode. Returning to the title lets the player choose again.

## Scaling philosophy

Easy, Normal and Hard retain the same readable control contract: player movement, rainbow spring physics, damage taken per hit and warning presentation are unchanged.

Impossible adds pressure across the hostile side of the game instead of relying on enemy count alone:

- initial stage populations use the `2.4` pressure scalar,
- enemy cooldown / attack clocks run at 2.4× the Normal pressure clock,
- boss reinforcement ceilings rise with the same scalar,
- friendly pickup opportunities become substantially less frequent,
- every spawned enemy receives **1.5× HP**,
- hostile enemies move **1.25× faster**,
- hostile projectiles travel **1.25× faster**,
- Husk Shift warning / harden / open cycles progress **1.25× faster**.

The player still gets the same responsive unicorn. Impossible makes the world more hostile rather than making the controls worse.

## Representative starting populations

| Trial | Easy | Normal | Hard | Impossible |
|---|---:|---:|---:|---:|
| 1 · Pastel Patch | 3 | 5 | 8 | **12** |
| 5 · Maize Monarch | 3 | 4 | 6 | **8** |
| 9 · Husk Architect | 1 | 1 | 2 | **2** |
| 11 · Kernel Gauntlet | 14 | 21 | 34 | **50** |
| 13 · Cobtopus | 8 | 11 | 16 | **22** |

The full 13-trial starting populations are:

```text
Easy       3  5  6  7  3   7   8   9  1  11  14  14   8
Normal     5  7  9 11  4  11  12  15  1  17  21  20  11
Hard       8 12 15 17  6  18  20  23  2  27  34  32  16
Impossible 12 16 21 27  8  26  28  37  2  41  50  48  22
```

## Impossible Encore

Defeating Cobtopus on Impossible is intentionally a false summit.

The arena clears, Husk Shift starts a fresh warning cycle, and Stretchicorn must fight the three signature bosses **at the same time**:

- **The Cobtopus** keeps its radial / curved projectile identity.
- **The Maize Monarch** returns with its phased aimed-fan behavior.
- **The Husk Architect** adds dynamic terrain and its own projectile fans.

The normal victory sequence is locked until all three encore bosses are defeated. Clearing the trio unlocks the special **IMPOSSIBLE!** ending.

Hard and lower difficulties still finish immediately when Trial 13 Cobtopus is defeated.

## Verification

The exact artifact regression suite checks all four launch scalars, Normal shortcut and retry behavior, Hard-vs-Impossible HP separation, pickup scarcity, hostile movement and projectile scaling, accelerated Husk Shift timing, safe spawns, fixed-step input behavior, and the complete Impossible boss-rush state transition. A bounded stress simulation also runs the encore with an invulnerable player to guard against runaway entity/projectile growth.

Current v0.21.1 candidate archive: **13,270 / 13,312 bytes (42 bytes free)**.
