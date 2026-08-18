# Changelog

## v0.20.7 — FINAL HARDENING

- Ignore browser key-repeat events so holding Space cannot auto-chain horn attacks or Rainbow Snaps.
- Keep one-shot attack input pending until the next fixed simulation step, so a Space press cannot be dropped on 120/144 Hz displays when a render frame occurs without a 60 Hz update.
- Keep `M` and `P` reserved while rebinding controls so custom bindings cannot silently conflict with menu/pause shortcuts.
- Remove the unused `nearest()` helper, reclaiming submission bytes with no gameplay change.
- Preserve the complete HUSKSHIFT campaign, POP DROP audio, settings, custom controls, and exact-artifact validation.
- Final competition ZIP: **13,291 / 13,312 bytes**.

## v0.20.6 — HUSKSHIFT FIX

- Fixed a competition-build identifier-golf bug that renamed the native Canvas `save()` method and froze the title screen mid-render.
- Build golfing now preserves browser/API member names while still shortening explicitly whitelisted internal object properties.
- Added a compiled-artifact guard that rejects any generated `X._*` / `X.$*` Canvas calls before release.
- Retains the full v0.20.5 Husk Architect and Cobtopus dynamic-block redesign, POP DROP audio, mixer, rebinding, and precise horn controller.
- Corrected the readable root `index.html` title/version to v0.20.6.
- Verified the exact compiled artifact in a real Chromium Canvas runtime with zero page errors before packaging.
- Final competition ZIP: **13,311 / 13,312 bytes (1 byte free)**.

## v0.20.5 — HUSKSHIFT

- Completely replaced Trial 9's self-destructing Cob Crusher encounter with **The Husk Architect**, a 16-HP armored miniboss.
- Removed wall-collision damage from the Architect, eliminating the passive "wait in the middle" solution.
- Added state-responsive Architect pressure: three-kernel fans when cover exists and faster five-kernel fans during exposed arena windows.
- Added dynamic Husk Shift geometry to Trials 9 and 13.
- Every new block formation has an exact **2.0-second warning/materialization phase** before becoming collidable.
- Warning footprints visibly fill toward hardening and display **MOVE!** when the vulnerable body remains in danger.
- Hardening on top of the ♥ body costs a hit and applies directional knockback/ejection.
- Enemies inside a forming block are ejected without damage so geometry cannot kill bosses for the player.
- Hardened blocks absorb hostile kernels and constrain movement/head extension, making them temporary tactical cover.
- Added true block-free intervals: 1.4 seconds in the Architect fight and 2.5 seconds in the Cobtopus fight.
- Cobtopus phase changes immediately clear existing cover before the next warning cycle.
- Preserved v0.20.4 POP DROP audio, Music/SFX mixer, custom Enter rebinding, precise horn snapshots, and spring physics.
- Added regression coverage for 2-second warnings, hardening damage/knockback, Architect wall immunity, and Cobtopus no-cover windows.
- Exact tested competition ZIP: **13,305 / 13,312 bytes (7 bytes free)**.

## v0.20.4 — POP DROP

- Scrapped the hard-to-hear WUB / YOI layer and rebuilt the soundtrack around short, speaker-friendly kernel-pop percussion.
- Added explicit AudioContext creation/resume on keyboard input so browser autoplay suspension cannot silently swallow the soundtrack.
- Added an eight-bar 150–184 BPM arcade-EDM macro set with builds, bright high-speed peaks, sparse breaks, and trap-flavored half-time switches.
- Added syncopated kick masks, snare/clap pops, tiny hat rolls, and a repeating pitched bubble/kernel hook with root movement.
- Reused the same kernel-pop oscillator voice for enemy kills, parries, grazes, shield pops, and pickups so gameplay naturally joins the musical texture.
- Removed band-pass/formant filters and sustained bass layers, reducing audio-node density and preserving headroom for combat sounds.
- Preserved independent Music/SFX settings, persistent custom rebinding, precise horn snapshots, spring physics, all 13 stages, and the exact-artifact smoke-test pipeline.

## v0.20.3 — YOI MIX

- Replaced the previous repeating bass phrase with an eight-bar dubstep/trap micro-set.
- Added WUB / YOI call-and-response with intentional negative space.
- Added a dedicated oscillator-only YOI voice with pitch bounce and two crossing resonant band-pass formants.
- Kept a clean sine sub underneath the moving mid-bass layer.
- Added sidechain-style gain recovery to filtered WUB notes.
- Added stepped square-wave grit and growl-stab punctuation.
- Added two trap-flavored bars with syncopated kick masks, half-time snare placement and compact hat rolls.
- Retained the persistent Music / SFX Settings mixer and custom control rebinding.
- Removed the runtime debug export and rewrote regression tests to inspect the exact built artifact directly, reclaiming competition bytes without changing gameplay.
- Exact competition ZIP: 13,262 / 13,312 bytes.

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
