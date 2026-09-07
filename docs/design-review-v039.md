# Stretchicorn v0.39 design review

Reviewed against main `07d38322d5b9927a9b9eca6fec38546925801c16` (v0.38.0), September 2, 2026.

The best immediate investment is trustworthy combat and shorter learning loops. Stretchicorn already has a distinctive two-ended character, a useful multifunction Snap, thirteen trials, authored bosses, and a procedural world that restores color. More content would be difficult to justify while a return can hit twice or a advertised finale cannot be reached.

## Lessons from the last three overall winners

Scope: all three **first-place overall winners** from the last three completed competitions, 2023–2025. This is a source-based comparison of the official entries and developer writing, not a claim to have completed every game or played all 39 top-thirteen entries. Rankings establish successful examples; they do not prove that a particular feature caused a win.

| Winner | Evidence from the game or developer | Application to Stretchicorn |
|---|---|---|
| [Path to Glory, 2023](https://js13kgames.com/2023/blog/winners-announced) | The developer describes three-button combat, warned attacks, an aggression-token system, procedural scenery, and a finite conclusion in the [postmortem](https://remvst.medium.com/path-to-glory-post-mortem-js13k-2023-be74a5272621). | Keep the body/horn/Snap identity. Test simultaneous attack pressure before adding enemies. Deliver a real final victory. Reuse the existing drawing vocabulary. |
| [13th Floor, 2024](https://js13kgames.com/2024/blog/winners-announced) | Its [official entry](https://js13kgames.com/2024/games/13th-floor) describes stealth horror built around vigilance and staying in shadows. | Presentation should communicate the rules. Gold kernels, cyan spikes, opening shields and forming blocks need distinct visible meanings. Preserve the coherent storm-to-rainbow world. |
| [CLAWSTRIKE, 2025](https://js13kgames.com/2025/blog/winners-announced) | Its [official entry](https://js13kgames.com/2025/games/clawstrike) emphasizes instant retries and an unlockable nine-lives challenge. | Separate learning access from expert run difficulty. Easy can retry its failed trial; the other modes keep full-run consequences. |

These applications are design judgments. They are not promises that matching a winner’s feature list will produce the same reception. In particular, Stretchicorn should keep its immediate title-to-play flow rather than add a mandatory tutorial to resemble another entry.

## Concrete problems fixed

| Problem in v0.38 | Player consequence | v0.39 behavior |
|---|---|---|
| The boss update wrapper advanced cover phases outside gameplay. | A forming wall could become solid during pause; the first resumed moment differed from the paused view. | Cover phases stop outside active play and during hitstop. Pause also freezes the clock used by return tiers. |
| Both the boss wrapper and base projectile loop resolved returned shots. | One kernel could deal extra damage or open a shield and damage the newly exposed boss in the same step. | One post-movement resolver handles shields and precision damage. Dead, expired, out-of-bounds and wall-blocked shots cannot damage an enemy. |
| The maintained split-core completion path entered victory directly, while the build removed the legacy Encore. | Impossible ended without the advertised final encounter. | After both cores, Impossible starts a finite trio using Husk, Colonel and core counterplay. All three must fall, in any order. The specialized soundtrack is restored. |
| Every loss restarted Trial 1. | A new player had to repeat early material to practice a late boss. | Easy retries the failed trial with 13 hearts and reset score/powers; the other modes retry the full run. |
| Scores were displayed but not retained. | Little persistent feedback for improving a run. | Best scores are stored separately per difficulty. Failed storage never blocks gameplay. |
| Several piercing impacts could continue after a terminal hit. | Hearts could fall below zero or a later event could compete with death. | Damage and terminal encounter handling stop once the game has ended. |

The README’s graze explanation was corrected too: the graze distance is measured around the vulnerable body, not the horn.

## Byte allocation

| Build | Competition ZIP | Space left under 13,312 bytes |
|---|---:|---:|
| v0.38.0 | 12,640 | 672 |
| v0.39.0 | 12,975 | 337 |
| Net change | +335 | −335 |

The delta covers all changes together. Compressed costs interact, so it is not valid to divide that number into exact per-feature prices without isolated builds.

The v0.39 ZIP SHA-256 is `949c6414af0512268fb8ce1af3e9a5f40ae8a988aaa9f51f4b013f39d081172b`.

Keep the remaining 337 bytes as a release reserve until human playtests identify a recurring misunderstanding. The first candidate for that space would be a short, contextual death or shield hint. Another boss, a new visual layer, an upgrade tree, or persistent checkpoint saves would have a much higher design and verification cost.

## Verification and limits

- The maintained regression suites cover boss windows, safe stage starts, procedural art/sky, difficulty and controls. v0.39 adds actual update-order checks for returns, pause, retries, storage, terminal damage and all six Encore boss defeat orders.
- Earlier boss-return fixtures held direct attacks or hitstop active and manually changed only a shield flag. They now isolate the projectile and set an actual closed/open boss state. This avoids testing a wrapper in isolation from the running simulation.
- A Canvas render pass inspected the title, retry panel, Encore and ending. It is a rendering check, not an interactive skill or difficulty evaluation.
- GitHub Actions builds the deterministic archive, checks byte-for-byte committed artifact parity, and opens both the submitted ZIP and the standalone file in Chromium and Firefox. Current results are attached to [PR #18](https://github.com/sidhulyalkar/stretchicorn/pull/18).

Automated mechanics checks do not establish whether the restored Encore is enjoyable or appropriately difficult. That needs a skilled human run.

## Next playtest decisions

1. **New player, Easy:** watch the first two minutes without coaching. Can they identify the vulnerable body, create a charged Snap, and understand what happened after a loss? Then test retrying at Trials 5 and 9.
2. **Experienced player, Impossible:** assess the simultaneous trio after the split cores. Record whether deaths come from misreading gold/cyan shots, overlapping firing windows, or simply failed execution. If overlap dominates, test staggered cooldowns before changing health or adding enemies.
3. **Combat readability:** inspect a return opening Colonel’s shield and compare it with a damaging return. The gate should consume the first shot visibly and the next opportunity should feel consistent.
4. **Byte decisions:** change one recurring player problem at a time and remeasure the ZIP. Do not spend the reserve merely because it exists.

Two architectural debts remain: the build still removes retired source through string seams, and gameplay is composed through function overrides. A future cleanup should reduce those seams under the current regression suite. That is separate from adding new gameplay.
