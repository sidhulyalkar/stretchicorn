# Changelog

## v0.20.6 - HUSKSHIFT FIX

- Fixed the release-blocking competition-build bug that froze the title screen after partially rendering Stretchicorn.
- Root cause: the identifier-golf pass renamed an internal `save` helper and accidentally rewrote the native Canvas `X.save()` member call as well.
- Changed build golfing so browser/API member names are preserved while only explicitly vetted internal identifiers may be shortened.
- Added a compiled-artifact guard that rejects suspicious rewritten Canvas calls before release.
- Corrected the readable root `index.html` title/version to v0.20.6.
- Preserved the complete Husk Architect and Cobtopus dynamic-block redesign from v0.20.5.
- Preserved POP DROP audio, explicit Web Audio wake/resume behavior, Music/SFX mixer, custom Enter rebinding, precise horn snapshots, Snap-ready glow and spring physics.
- Verified the exact compiled artifact in a real Chromium Canvas runtime with zero page errors before packaging.
- Exact verified competition ZIP: **13,311 / 13,312 bytes (1 byte free)**.

## v0.20.5 - HUSKSHIFT

- Completely replaced Trial 9's exploitable Cob Crusher encounter with **The Husk Architect**, a dedicated 16-HP armored miniboss.
- Removed wall-collision self-damage from the Architect, eliminating the passive strategy of waiting while the arena kills the boss.
- Added dynamic Husk Shift geometry to Trials 9 and 13.
- Every new formation has an exact **2.0-second warning/materialization phase** before becoming solid.
- One warning block freezes around the player's current vulnerable body location when the warning begins, punishing camping without unfairly tracking the player afterward.
- Warning footprints visibly fill toward hardening and display **MOVE!** when the ♥ body remains inside the future block.
- Hardening on top of the ♥ body costs a hit and applies directional knockback/ejection.
- Enemies inside a forming block are ejected without taking damage, preventing the environmental system from defeating bosses for the player.
- Hardened blocks absorb hostile kernels and constrain movement/head extension, turning the same object from hazard into temporary tactical cover.
- Added block-free intervals: 1.4 seconds in the Architect fight and 2.5 seconds in the Cobtopus fight.
- The Architect fires compact three-kernel fans while cover exists, then accelerates and fires wider five-kernel fans during exposed windows.
- Cobtopus phase changes immediately clear existing cover before the next warning cycle, giving each phase a physical open-arena transition.
- Added regression coverage for warning timing, hardening damage/knockback, Architect wall immunity and Cobtopus no-cover windows.
- Exact tested competition ZIP: **13,305 / 13,312 bytes (7 bytes free)**.

## v0.20.4 - POP DROP

- Scrapped the hard-to-hear WUB / YOI layer and rebuilt the soundtrack around short, speaker-friendly pitched kernel-pop percussion.
- Added explicit AudioContext creation/resume on keyboard input so browser autoplay suspension cannot silently swallow the soundtrack.
- Added an eight-bar 150-184 BPM arcade/gaming-EDM macro set with builds, high-speed peaks, sparse breaks and trap-flavored half-time switches.
- Added syncopated kick masks, snare/clap pops, tiny hat rolls and a repeating pitched bubble/kernel hook with root movement.
- Reused the same kernel-pop voice for enemy kills, Parries, Grazes, shield pops and pickups so gameplay naturally joins the musical texture.
- Removed sustained formant/bass layers that competed with combat audio.
- Preserved independent Music/SFX settings, persistent custom rebinding, precise horn snapshots and all 13 stages.

## v0.20.3 - YOI MIX

- Experimented with an eight-bar dubstep/trap micro-set and WUB / YOI call-and-response.
- Added oscillator-only talking-bass formant movement, clean sine sub, sidechain-style gain recovery and trap-flavored bars.
- Reclaimed bytes by removing the runtime debug export and moving validation onto the exact built artifact.
- Exact competition ZIP: **13,262 / 13,312 bytes**.

## v0.20.2 - MIXER

- Added a dedicated Settings page from the title screen.
- Added independent Music and Game Sounds volume controls: Off, 25%, 50%, 75%, 100%.
- Persisted both settings through `localStorage`.
- Preserved custom Enter-based control rebinding and duplicate-key swapping.

## v0.20.1 - Recovery Build

- Reverted from the experimental v0.21 path to the last proven-working v0.20.0 gameplay/audio/controller foundation.
- Restored one canonical release artifact: the same `dist/index.html` tested by the regression suite is the file packaged for submission.
- Added an exact-artifact release smoke test.

## v0.20.0 - SETFLOW

- Reworked procedural music into changing BUILD / DROP / BREAK / DROP 2 sections.
- Increased continuous head-steering response while retaining arbitrary-angle aiming.
- Snapshot horn attack direction so rotation cannot bend an active strike.
- Added the exact attack-ray reticle and opposite-direction pull arrow.

## v0.19.0 - WUBCORN

- Rebuilt procedural music around compact song form, pitch-swept kicks, filtered growls and sine sub-bass.
- Added whole-unicorn Snap-readiness illumination.
- Re-themed power-ups as magical corn pickups.
- Fixed Enter rebinding and added duplicate-binding swap semantics.

## v0.18.0 - BASSBOW

- Added the first procedural gaming-EDM soundtrack with Web Audio oscillators only.
- Added a shared beat envelope for subtle audio-reactive rainbow tears, sparks and specks without FFT analysis.

## v0.17.0 - Title & UX polish

- Rebuilt the title screen around an animated Stretchicorn-versus-Cobtopus presentation.
- Simplified branding to **Stretchicorn** with `STRETCH • SNAP • SHUCK.`
- Added dedicated Controls and Rules screens.
- Added persistent keyboard rebinding and procedural trial title cards.

## v0.16.0 - CORNSTORM

- Re-themed the enemy roster around the Stretchi**CORN** identity.
- Added Kernel Kamikaze, Cob Charger, Pop-Gunner, Prism Popper, Husk Bruiser and Husk Ram identities.
- Rebuilt bosses as the Maize Monarch and final Cobtopus.
- Preserved Rainbow Spring, Snap, Double Rainbow, Lucky 13, body-only damage and all 13 stages.
