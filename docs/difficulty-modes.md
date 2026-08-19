# v0.21.0 Difficulty Modes RC

This feature candidate adds four launch modes while keeping **Normal mechanically identical to the v0.21.0 PERFORMANCE LOCK baseline**.

| Key | Mode | Pressure scalar | Stage density | Enemy attack cadence | Friendly power-up cadence |
|---|---|---:|---|---|---|
| `1` | Easy | `0.7` | lower | 0.7× cooldown clock | pickups arrive sooner |
| `2` | Normal | `1.0` | baseline | baseline | baseline |
| `3` | Hard | `1.3` | higher | 1.3× cooldown clock | pickups take about 1.3× as long |
| `4` | Impossible | `1.6` | highest | 1.6× cooldown clock | pickups take about 1.6× as long |

**Space / Enter** from the title always launches Normal. A retry after Game Over preserves the chosen difficulty. Returning to the title lets the player choose another mode.

## Design rules

Difficulty is deliberately concentrated into one scalar, `D`. It scales:

- initial stage populations,
- enemy attack/cooldown clocks,
- boss reinforcement ceilings,
- inverse friendly pickup cadence.

It deliberately does **not** scale player movement, spring physics, damage rules, enemy movement speed or telegraph duration. In particular, Cob Charger warnings stay real-time, so harder modes increase decision density without hiding information from the player.

The stage-density formula preserves at least one enemy for every nonzero role on Easy, keeps Normal at the baseline counts, and creates a deliberate two-Architect Trial 9 only on Impossible.

| Trial | Easy | Normal | Hard | Impossible |
|---|---:|---:|---:|---:|
| 1 | 3 | 5 | 6 | 8 |
| 5 | 3 | 4 | 5 | 6 |
| 9 | 1 Architect | 1 Architect | 1 Architect | 2 Architects |
| 11 | 14 | 21 | 28 | 34 |
| 13 | 8 | 11 | 14 | 16 |

## Verification

The exact built artifact is tested for all four launch keys, the Normal shortcut, retry preservation, the complete 13-stage density matrix, inverse pickup cadence, enemy attack cadence, unscaled Charger warnings, Architect scaling, boss reinforcement scaling, HUSKSHIFT/Cobtopus behavior, 120 Hz attack retention, and 30-second Impossible stress simulations for both the densest swarm trial and Cobtopus.

Current candidate archive: **13,294 / 13,312 bytes (18 bytes free)**.
