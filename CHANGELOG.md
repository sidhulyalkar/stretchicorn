# Changelog

## v0.23.1 - FIRST FLIGHT

- Rebuilt first-time onboarding around an actual safe practice field using production Stretchicorn physics rather than passive control demonstrations.
- New players now follow Living Scar story → First Flight practice → automatic Easy campaign. The difficulty menu is no longer the first gameplay decision.
- First Flight requires moving the vulnerable heart, aiming the safe horn, pulling opposite the horn until the rainbow is charged, and completing three real charged Rainbow Snaps before normal combat begins.
- Added a rainbow Snap target/guide and concise visual coaching around the core mental model: body pulls, horn points, rainbow snaps.
- Added explicit story/practice skip escape hatches for returning experts while keeping onboarding the default path.
- Changed Space / Enter on the title screen from Normal to Easy and visually recommends progressing upward only after the player has learned the mechanic.
- Added post-clear mastery guidance from Easy → Normal → Hard → Impossible, while retaining direct numeric difficulty access for experienced players.
- Added Easy-only early-stage strategy coaching for safe-half positioning, tension/Snap usage, and Graze/Parry recharge.
- Expanded source, packed-artifact, Chromium, Firefox, and standalone-file smoke coverage around story → First Flight → Easy handoff and the new Easy default.

## v0.23.0 - STORYBOOK REFRAME

- Replaced the v0.22 decorative-background strategy after playtesting showed that generic stars, sparkles, tiny symbolic motifs, and low-alpha flourishes consumed visual attention without making the world feel authored.
- Added a mandatory first-run **Living Scar** cinematic before difficulty selection. The scene shows the dead field, the unicorn separated in two, the last rainbow becoming the missing body, and visual demonstrations of WASD movement, arrow-key horn aiming, pull-to-charge, and Space-to-Snap.
- Added explicit skip affordances without making onboarding optional by default: Space / Enter / Escape, a visible clickable Canvas Skip control, and `T` on the title screen to replay the origin/tutorial.
- Removed the old Trial 1 tooltip gate so the player learns the unusual two-ended control model before combat rather than while enemies are already active.
- Collapsed thirteen unrelated decorative motif systems into four coherent environmental acts: Mourning Field, Sunken Court, Husk Foundry, and Black Prism.
- Rebuilt world rendering around large procedural silhouettes, architectural masses, foreground/midground depth, negative space, and structural restoration rather than particle wallpaper.
- Reworked restoration so performance increasingly repairs alignment and reveals restrained color-veins in ancient geometry instead of simply adding more ambient stars and spectral confetti.
- Rebuilt the Maize Monarch arena as a false monumental court with ritual arch/crown geometry and strengthened the boss silhouette with authority/halo details.
- Rebuilt the Husk Architect arena around radial measurements, drafting circles, construction plans, and plated construct details that visually support Husk Shift.
- Rebuilt the Cobtopus arena around thick organic tendrils, central void imagery, and convergent curved pressure so the corruption reads as a living system rather than another decorated room.
- Preserved the Impossible Encore by colliding the three established visual languages rather than inventing a fourth unrelated effect set.
- Renamed several trial chapters away from gag-like labels toward the darker world narrative while preserving encounter order and gameplay semantics.
- Preserved Heavy Drop audio, kick-driven camera, Chromatic Overload, critical-health scar fray, mastery grades, the final scar-release ending, all v0.21.1 Impossible hardening, and Wavedash isolation.
- Expanded VM/browser qualification for Canvas gradients and the mandatory story handoff. The exact competition ZIP and standalone `file://` HTML both pass Chromium and Firefox from story → skip → title → gameplay.
- Final qualified competition ZIP: **12,985 / 13,312 bytes (327 bytes free)**.
- Qualified SHA-256: `316a17876f513771d78828d21ca89ba8dcdf9c5dde3ee2e540a2c50e3ce74154`.

## v0.22.0 - RAINBOW THEATRE / HEAVY DROP

- Rebuilt the js13k release pipeline around deterministic custom golf → Terser 5.50.0 → a pinned Roadroller 2.1.0 model → Zopfli 0.4.3 at 80 iterations. Roadroller is executed twice and byte-compared before packaging.
- Added the playable resurrection opening: Stretchicorn begins torn in two, the last rainbow re-stitches the halves as a living scar, and Trial 1 advances only after the player demonstrates movement, aiming, stretch, and Rainbow Snap.
- Added thirteen dark procedural chapter palettes and symbolic Canvas motifs, with restoration-driven interpolation from irregular hostile silhouettes toward cleaner crystalline geometry.
- Made successful play visibly restore the world. Combo, Lucky 13, campaign progress, and stage-clear state progressively reintroduce spectral particles, flowers, stars, horizon light, and motif clarity.
- Added subtle procedural life animation to Stretchicorn and corn, including charge squash/stretch, breathing, blinking, impact compression, and scar fade-in during resurrection.
- Added critical-health scar fraying: randomized control-point displacement, reduced strand width, and alpha instability make the rainbow visibly look close to failing without changing deterministic movement physics.
- Added distinct boss arena languages: Maize Monarch uses false-court crown/banner geometry, Husk Architect uses drafting grids and construction arcs, and Cobtopus uses organic curling vortex forms.
- Reworked the Impossible `NOT YET` reveal into a dedicated half-time Heavy Drop. A sawtooth bass is routed through a resonant low-pass filter whose cutoff is modulated by a 6 Hz LFO, with sparse sub kicks and false-death stings synthesized entirely through Web Audio.
- Connected the existing procedural kick envelope to Canvas translation so Heavy Drop beats physically jolt the arena, with a stronger multiplier during the Impossible Encore.
- Added max-combo Chromatic Overload using one reusable off-screen Canvas, `screen` compositing, beat-responsive offsets, and opposing hue rotations for a compact channel-split effect.
- Added mastery grades and short restored-stage tableaux so cleared arenas remain visible long enough for the player to register the color they brought back.
- Added a bittersweet final release: after restoration the living scar fades and shatters into spectral fragments while Stretchicorn's two halves drift apart and sink toward the restored earth. Final line: `THE LAST RAINBOW LETS GO.`
- Preserved the v0.21.1 anti-chain Impossible rules, piercing-shot dodge language, one-generation Splitcorn, bounded 3→6 Encore, fixed-step simulation, and Wavedash isolation.
- Added source, exact-artifact, and real-browser coverage for the new impact systems. The exact submission passes Chromium and Firefox smoke tests, plus forced max-combo, critical-scar, Encore-arena, and final-release rendering in both browsers.
- Final qualified competition ZIP: **12,420 / 13,312 bytes (892 bytes free)**.
- Qualified SHA-256: `a5d6bde0f3e3dbf134171550e962c5fb322c9a4b20629cbaff61e941bea70271`.

## v0.21.1 — SPLITCORN IMPOSSIBLE ENCORE

- Reworked Impossible around expert anti-chain pressure instead of raw population inflation. Starting populations and reinforcement ceilings now stop at the Hard `1.6×` density while Impossible keeps a `2.4×` hostile attack clock.
- Added +50% enemy HP, +25% hostile movement/projectile speed, +25% Husk Shift cadence, and substantially scarcer pickups on Impossible.
- Added cyan piercing volleys that cannot be parried or grazed and can damage through Rainbow Snap / dash invulnerability, forcing true dodge decisions.
- Changed Impossible Lucky 13 so it still grants spring readiness and `+130` score but no longer restores a heart or grants a shield.
- Added a one-generation Splitcorn hierarchy across all difficulties: Cob Charger and Pop-Gunner split into two Kernel Kamikazes; Prism Popper and Husk Bruiser split into two Pop-Gunners.
- Marked all split-born regular enemies terminal so the mechanic cannot recurse into exponential swarm growth.
- Added the Impossible three-boss Encore after Trial 13, combining Cobtopus, Maize Monarch, and Husk Architect simultaneously.
- Added one false death for each original Encore boss. Each duplicates into two full-strength same-identity terminal copies, bounding the finale at six descendants and locking victory until cleanup is complete.
- Added Easy / Normal / Hard / Impossible title-screen selection while preserving Space / Enter as the Normal shortcut and selected-difficulty retry behavior.
- Expanded production-VM regression coverage for difficulty mapping, anti-chain rules, piercing shots, Lucky 13 behavior, Splitcorn mappings, terminal-copy cleanup, true Impossible victory, safe spawns, 120 Hz input retention, focus pause, Husk Shift, and bounded Encore populations.
- Added a dedicated 13KB GitHub Actions verification workflow and aligned release documentation with the final Hard-density Impossible population cap.
- Final competition ZIP: **13,293 / 13,312 bytes (19 bytes free)**.

## v0.21.0 — PERFORMANCE LOCK

- Gated Canvas rendering to fixed 60 Hz simulation ticks, eliminating redundant full-scene redraws on 120/144/240 Hz displays without changing gameplay cadence.
- Stabilized screen-shake decay across monitor refresh rates by tying scene draws to the fixed simulation cadence.
- Reset the Canvas transform before drawing the title so a strong shake frame cannot leak an offset into menu rendering.
- Restored persisted Music/SFX values as numbers; saved OFF settings now remain true zero after reload and skip silent oscillator allocation.
- Auto-pause active gameplay on window blur after clearing held controls and the pending attack latch.
- Added a 110 px safety radius for edge enemy spawns, mirroring unsafe spawn points to the opposite arena edge.
- Replaced `hitW()`'s `Array.find()` callback with a direct early-return loop and removed a redundant nested Charger type check.
- Extended exact-artifact regression coverage for persisted mute, blur pause, edge-spawn safety and simulated 120 Hz render gating while preserving the existing HUSKSHIFT, audio, controls and 13-stage checks.
- No new gameplay systems were added; this is a performance/robustness-only release.
- Final competition ZIP: **13,293 / 13,312 bytes (19 bytes free)**.

## v0.20.8 — RELEASE LOCK

- Replaced the render-frame attack edge map with a fixed-step `fire` latch so short Space taps cannot disappear between simulation ticks on 120/144/240 Hz displays.
- Preserved browser key-repeat suppression so holding Space still cannot auto-chain horn attacks or Rainbow Snaps.
- Preserved `M` and `P` as reserved menu/pause keys during gameplay rebinding.
- Restricted environmental wall-smash HP damage to Cob Chargers; bosses and other enemies can collide with geometry without the arena defeating them.
- Preserved the 3:2 canvas aspect ratio on short browser windows.
- Hardened exact-artifact tests so semantic aliases reference the real golfed lexical state instead of possible shadow globals.
- Added a 120 Hz release-smoke check proving an attack press survives a render-only frame and is consumed once by the next 60 Hz update.
- Preserved HUSKSHIFT, POP DROP audio, mixer/settings, custom controls, 13 hearts and all 13 trials.
- Final competition ZIP: **13,274 / 13,312 bytes (38 bytes free)**.

## v0.20.7 — FINAL HARDENING

- Ignored browser key-repeat events so holding Space cannot auto-chain horn attacks or Rainbow Snaps.
- Kept `M` and `P` reserved while rebinding controls so custom bindings cannot silently conflict with menu/pause shortcuts.
- Removed the unused `nearest()` helper, reclaiming submission bytes without changing gameplay.
- Preserved the complete HUSKSHIFT campaign, POP DROP audio, settings, custom controls and exact-artifact validation.
- Final competition ZIP: **13,284 / 13,312 bytes (28 bytes free)**.

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
