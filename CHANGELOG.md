# Changelog

## v0.20.2 — Mixer

- Added a dedicated Settings page from the title screen.
- Added independent Music and Game Sounds volume controls: Off, 25%, 50%, 75%, 100%.
- Persisted both volume settings through localStorage.
- Removed the old all-or-nothing V mute shortcut to avoid conflicting audio controls.
- Preserved v0.20.1 recovery gameplay, precise horn direction, custom key rebinding, and safe build pipeline.

## v0.20.1 — Recovery Build

- Reverted to the last proven-working v0.20.0 SETFLOW gameplay/audio/controller source.
- Removed the experimental v0.21.0 competition-only identifier-golf transform from the build path.
- Restored one canonical build artifact: the same `dist/index.html` that is regression-tested is the file packaged for submission.
- Preserved precise horn-angle snapshots, faster continuous aiming, directional pull indicator, corn-themed power-ups, custom Enter-based rebinding, and the variable set-style procedural soundtrack from v0.20.0.
- Added a release smoke test that exercises the exact built HTML through title, play, controls, combat, all 13 stages, and procedural audio scheduling.

## v0.20.0 — SETFLOW

- Reworked procedural music into two-bar BUILD / DROP / BREAK / DROP 2 sections with frequent BPM movement.
- Added compact build risers, drop impacts, syncopated bass masks, and slower breakdown contrast.
- Increased head steering response while preserving continuous arbitrary-angle aiming.
- Snapshot horn attack direction so movement/rotation cannot bend the active attack.
- Added an exact attack-ray reticle and a subtle opposite-direction pull arrow for spring setup.
- Preserved custom-control rebinding, corn power-ups, 13 stages, Graze/Parry, Double Rainbow, and Lucky 13.

## v0.19.0 — Wubcorn

- Rebuilt the procedural soundtrack around compact four-section dubstep song form: build, drop, breakdown, and second drop.
- Added pitch-swept kick synthesis, filtered saw growls, sine sub-bass, swing, fills, and boss intensity without audio assets.
- Increased head steering response while preserving smooth analog-feeling angular interpolation.
- Added a whole-unicorn rainbow readiness aura at the exact Snap-ready threshold.
- Re-themed power-ups as magical corn pickups: Heart Kernel, Husk Shield, Butter Boost, Prism Cob, and Gold Cob.
- Fixed Enter-based control rebinding and added duplicate-binding swap semantics.
- Added stronger binding/music regression coverage and a whitespace-safe competition minifier.

## v0.18.0 — BASSBOW

- Added a tiny procedural 140-BPM gaming-EDM / dubstep-inspired soundtrack using Web Audio oscillators only.
- Added a half-time kick/snare groove, alternating low bass pattern, and sparse arcade plucks.
- Added a shared beat envelope so the background reacts without FFT analysis or extra audio nodes.
- Added subtle rainbow tears, sparks, and specks that brighten and move on strong beats without competing with gameplay.
- Music begins after the player starts the game, respecting browser user-gesture audio policies.
- Preserved the complete v0.17 gameplay, controls, corn roster, bosses, and deterministic 60 Hz simulation.

## v0.17.0 — Title & UX polish

- Rebuilt the title screen around an animated Stretchicorn-vs-Cobtopus showdown instead of a wall of instructions.
- Simplified the game name to **Stretchicorn** and added the concise `STRETCH • SNAP • SHUCK.` hook.
- Added dedicated **Controls** and **Rules** screens.
- Added persistent custom keyboard rebinding with reset-to-default support.
- Added large procedural trial title cards for cleaner stage transitions.
- Re-themed walls as husk barricades and kept the cornfield/rainbow visual hierarchy.
- Renamed the final victory state to **SKY RESTORED!** while retaining the Cobtopus pop transformation.
- Preserved the complete v0.16 spring/combat model and 13-stage campaign.

## v0.16.0 — Cornstorm

- Re-themed the full enemy roster around the Stretchi**CORN** name.
- Added Kernel Kamikaze, Cob Charger, Pop-Gunner, Prism Popper, Husk Bruiser, and Husk Ram visual identities while preserving their proven combat roles.
- Rebuilt both bosses as the Maize Monarch and the final Cobtopus.
- Hostile magic is now procedural popcorn/kernel fire; parries and grazes keep the same high-skill combat behavior.
- Corn enemies burst into kernels and popcorn on defeat.
- Added faint corn-stalk silhouettes to the storm arena while retaining the Unicorns & Rainbows restoration arc.
- Preserved Rainbow Spring, Snap, Double Rainbow, Lucky 13, body-only damage, power-ups, boss phase logic, and all 13 stages.
- Competition ZIP remains under 13,312 bytes.
