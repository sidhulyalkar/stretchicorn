# v0.21.1 Impossible Anti-Chain + Splitcorn Encore

Impossible is now an expert ruleset, not simply a larger swarm. Playtesting showed that adding more enemies can make strong players safer by creating easier chains, more Lucky 13 triggers, and more targets for perpetual Rainbow movement.

| Key | Mode | Pressure | Population | Expert rules |
|---|---|---:|---|---|
| `1` | Easy | `0.7` | reduced | onboarding |
| `2` | Normal | `1.0` | baseline | canonical campaign |
| `3` | Hard | `1.6` | high | high-density campaign |
| `4` | Impossible | `2.4` hostile clock | **capped at Hard density** | piercing volleys, no Lucky 13 healing, +50% HP, +25% hostile movement/projectiles, +25% Husk Shift cadence, scarce pickups, boss-rush encore |

Space / Enter still starts Normal. Game Over retry preserves the selected mode.

## Design principle

Impossible should challenge mastery instead of feeding it. The unicorn keeps the responsive movement, full combo scoring, normal Rainbow Snap, and normal Double Rainbow timing. The difficulty comes from threats that cannot all be converted into offense.

Starting populations and reinforcement ceilings therefore stop at the Hard `1.6×` multiplier. Impossible keeps the `2.4×` attack clock and adds durability, speed, terrain pressure, resource scarcity, and must-dodge projectiles.

Representative starting populations:

| Trial | Easy | Normal | Hard | Impossible |
|---|---:|---:|---:|---:|
| 1 · Pastel Patch | 3 | 5 | 8 | **8** |
| 5 · Maize Monarch | 3 | 4 | 6 | **6** |
| 9 · Husk Architect | 1 | 1 | 2 | **2** |
| 11 · Kernel Gauntlet | 14 | 21 | 34 | **34** |
| 13 · Cobtopus | 8 | 11 | 16 | **16** |

## Splitcorn death hierarchy

Every difficulty now gets a second-stage enemy-death mechanic. Tough regular corn does not simply disappear when defeated: it breaks into **two easier descendants**.

The hierarchy is deliberately one-generation only:

- **Cob Charger → 2 Kernel Kamikazes**
- **Pop-Gunner → 2 Kernel Kamikazes**
- **Prism Popper → 2 Pop-Gunners**
- **Husk Bruiser → 2 Pop-Gunners**

Split-born children are marked terminal and **never split again**. This creates a readable kill → burst → cleanup rhythm without exponential enemy growth. Major campaign bosses also do not use the regular split table.

This makes high-value targets more tactically interesting: deleting an elite creates immediate local pressure, so a Snap that kills the parent must also account for where its two descendants will occupy the arena. Initial stage population is unchanged; the extra pressure is earned dynamically through combat.

### Impossible encore duplication

The final three-boss encore has its own one-time split rule. On Impossible, the first lethal hit against each original encore boss destroys that original and creates **two full-strength copies of the same boss**:

- Maize Monarch → 2 Maize Monarchs, preserving Monarch aimed-fan behavior,
- Cobtopus → 2 Cobtopuses, preserving radial/curved pressure,
- Husk Architect → 2 Husk Architects, preserving projectile and terrain pressure.

Those six descendants are terminal: they cannot duplicate again. The encounter therefore has a controlled false-death escalation from **3 originals to up to 6 terminal boss copies**, rather than an unbounded boss recursion. Victory remains locked until every terminal copy is gone.

## Cyan piercing kernels

From the first ranged encounters onward, every third ranged volley on Impossible can become a larger cyan piercing volley.

Piercing kernels deliberately sit outside the normal counter economy:

- the horn cannot parry them,
- grazing them gives no +13 score and no spring charge,
- Rainbow Snap, Double Rainbow, and sling/dash invulnerability do not negate the hit,
- a Husk Shield can still absorb one,
- their larger cyan presentation distinguishes them from ordinary gold kernels.

The Rules screen now states: **“Graze/parry gold. Cyan must be dodged.”**

This is the main anti-dash check. Aggressive movement remains powerful, but invulnerability is no longer a universal answer.

## Lucky 13 on Impossible

Lucky 13 remains a core identity mechanic, but it is no longer a renewable life engine on Impossible.

On Easy, Normal, and Hard, every 13 kills still grants the familiar heart + shield + spring reward. On Impossible it grants:

- spring charge / Snap readiness,
- `+130` score,
- the Lucky 13 celebration.

It does **not** restore a heart or grant a shield. High-level chaining remains valuable for score and offense without manufacturing survivability.

## Existing Impossible pressure retained

Impossible still keeps:

- `2.4×` enemy attack/cooldown pressure,
- `1.5×` enemy HP,
- `1.25×` hostile movement speed,
- `1.25×` hostile projectile speed,
- `1.25×` Husk Shift progression,
- substantially scarcer pickups,
- the three-boss encore.

## Impossible Encore

Defeating Trial 13 Cobtopus on Impossible is a false summit. The arena clears and deploys the three signature bosses together:

- Cobtopus,
- Maize Monarch,
- Husk Architect.

Victory remains locked until all three are defeated, which unlocks the special **IMPOSSIBLE!** ending. Hard and lower still finish immediately after Trial 13 Cobtopus.

## Verification

The production VM regression suite covers:

- all four launch modes and retry behavior,
- the Hard-density cap on Impossible,
- Hard-vs-Impossible HP separation,
- pickup scarcity and hostile speed scaling,
- accelerated Husk Shift timing,
- Lucky 13 with no Impossible heart/shield sustain,
- real piercing-volley generation,
- zero graze charge from piercing kernels,
- piercing damage through dash/Rainbow invulnerability,
- safe stage spawns,
- input and blur/pause invariants,
- one-generation regular elite split mapping and no-recursion behavior,
- one-time duplication of each Impossible encore boss into two same-identity copies,
- terminal boss copies that cannot duplicate again,
- the full three-boss transition and six-copy cleanup,
- a bounded 600-frame Impossible encore stress run.

The exact production build passes the suite and packages to **13,293 bytes / 13,312 bytes**, leaving **19 bytes** of competition headroom.
