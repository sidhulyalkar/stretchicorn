# Stretchicorn v0.39.0 submission candidate

**STRETCH · SNAP · SHUCK.**

This is the current js13kGames 2026 submission candidate.

```text
13,310 / 13,312 bytes
2 bytes free
SHA-256 ff8dc4532a654407be15d4b8f14f4c0a695b9cc712e13be56882c1347dd66912
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

The final UI pass moves control instructions off the title and into the translucent Controls panel, names the Field Guide explicitly, and shows the highest locally saved Style on the title after a player has recorded a score. Difficulty shortcuts now live directly on the four difficulty cards.

The final cleanup also retires legacy keyboard-rebind and Music/SFX preference migration now that those editing screens no longer ship. Returning players therefore cannot be stranded on invisible old bindings or muted audio; the supported default keyboard/audio behavior is authoritative, while the current pointer ON/OFF preference still migrates and persists. This simplification reclaimed 26 compressed bytes.


The final cleanup added a deterministic soak/input audit, extended Chromium and Firefox browser checks through the real Controls UI, refreshed the public documentation, and removed retired one-off tuning/test helpers and old binary ZIP snapshots from the working tree.

Historical binary candidates remain available through Git history. The working `dist/` directory now represents the current submission rather than acting as an artifact museum. The full development history remains preserved in [`../CHANGELOG.md`](../CHANGELOG.md); this file is the concise current-candidate release note.

For the complete feature tour, see [`../README.md`](../README.md). For packaging and submission invariants, see [`../RELEASING.md`](../RELEASING.md).
