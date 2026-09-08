# Stretchicorn v0.39.0 submission candidate

**STRETCH · SNAP · SHUCK.**

This is the current js13kGames 2026 submission candidate.

```text
13,310 / 13,312 bytes
2 bytes free
SHA-256 074b379ed4d3dbaec326b07cb0ae0b1313af77b6a4e5d5ae5791e9360102401a
```

## What changed since the earlier boss-trilogy builds

The current game has converged on a finite 13-trial arcade campaign with direct title-to-gameplay flow and a much clearer mechanical identity.

- **Two-point Stretchicorn control**: WASD moves the vulnerable body while Mouse or Arrow Keys aim the safe horn. Click or Space releases stored rainbow tension as a Snap.
- **Laptop-safe pointer controls**: Controls can persistently disable mouse/touchpad aiming and gameplay clicks while keeping Arrow aim, Space Snap and Canvas UI clicks active.
- **Easy First Flight**: Trial 1 introduces five one-at-a-time practice targets using the real production charge/Snap rules before entering Trial 2.
- **Field Guide**: objective, body/horn safety, charge, Snap, Double Rainbow, gold/cyan projectiles, Style, powerups, enemy roles, hay, bosses and Encore are explained in-game.
- **Double Rainbow**: recharge and Snap again quickly for a stronger chained attack and brief defensive window.
- **Projectile language**: gold kernels support Graze +13, Parry +25 and distance-scaled RETURN x2/x3/x4. Cyan spikes cannot be converted into offense and must be dodged.
- **Procedural hay**: temporary barriers warn, become solid collision, interact with player/enemies/projectiles, then disappear.
- **Three authored boss grammars**: Hideaway Husk opens while firing; Kernel Colonel requires reflected-kernel counterplay; Cobtopus Prime progresses from Phase I windows to two independently gated Phase II cores.
- **Four meaningful difficulties**: Impossible reduces easy sustain, increases hostile pressure, tightens boss return requirements and ends in an Encore rather than simply multiplying enemy population.
- **Style results**: victory and mastery are separated. The ending reports Style, per-difficulty Best, time and hearts.
- **Rainbow-popcorn finale**: Stretchicorn stays intact in its final pose while the defeated boss bursts into procedural rainbow popcorn and restoration rings.
- **Procedural presentation**: all shipping game art and audio remain generated at runtime from Canvas and Web Audio primitives. No runtime images, audio files, fonts or external network resources are present in the competition ZIP.

## Final hardening pass

The final cleanup added a deterministic soak/input audit, extended Chromium and Firefox browser checks through the real Controls UI, refreshed the public documentation, and removed retired one-off tuning/test helpers and old binary ZIP snapshots from the working tree.

Historical binary candidates remain available through Git history. The working `dist/` directory now represents the current submission rather than acting as an artifact museum.

For the complete feature tour, see [`../README.md`](../README.md). For packaging and submission invariants, see [`../RELEASING.md`](../RELEASING.md).
