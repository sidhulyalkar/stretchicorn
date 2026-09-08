# Changelog

## v0.39.0 - SUBMISSION CANDIDATE / STRETCH SNAP SHUCK

- Consolidated Stretchicorn into the current finite **13-trial** campaign with direct title-to-gameplay flow, four difficulty modes, three authored bosses and an Impossible Encore.
- Finalized the core two-point control model: **WASD** moves the vulnerable heart/body, **Mouse or Arrow Keys** aim the safe horn, and **Click or Space** releases stored rainbow tension as a Snap.
- Added persistent **MOUSE AIM + CLICK ON/OFF** controls so laptop players can disable touchpad/mouse gameplay authority without losing Arrow aim, Space Snap or Canvas menu clicks. Legacy settings migrate to pointer gameplay ON and stale pointer authority is cleared when toggling.
- Reframed Easy Trial 1 as **FIRST FLIGHT** inside the real campaign. Five one-at-a-time practice targets require genuine charged Snap kills before Trial 2 begins.
- Added the compact in-game **Field Guide** covering objective, vulnerable/safe geometry, charge, Snap, Double Rainbow, gold/cyan projectiles, Style, powerups, enemies, hay, boss counterplay and Impossible Encore.
- Finalized **Rainbow Snap → recharge → Double Rainbow** as the central advanced rhythm, including stronger chained hits and a brief defensive window.
- Preserved gold-kernel **Graze +13**, **Parry +25** and distance-scaled **RETURN x2/x3/x4** scoring while separating cyan piercing spikes into an explicit dodge-only threat class.
- Finalized procedural hay barriers with warning/forming, solid collision and disappearing states. Hardened overlap handling so player/enemy bodies are ejected rather than left embedded when a bale forms.
- Finalized **Hideaway Husk** around a real firing/open vulnerability window, **Kernel Colonel** around reflected-kernel shield opening, and **Cobtopus Prime** around Phase I windows followed by two independently gated Phase II cores.
- Preserved deterministic three-hit anti-pin **PHASE SHIFT** behavior so boss damage remains earned while repetitive stationary pinning is broken.
- Finalized Easy/Normal/Hard/Impossible return-gate scaling and the expert **Impossible Encore**, including bounded defeat-order handling and projectile cleanup on transition.
- Reframed the end-of-run number as **STYLE** rather than victory itself. Results now report Style, per-difficulty Best, run time and hearts remaining.
- Rebuilt the victory beat so Stretchicorn stays intact in the final gameplay pose while the defeated boss erupts into procedural **rainbow popcorn** and expanding rainbow rings.
- Finalized the single → double → triple nested procedural rainbow sky, with shared natural red-outside/violet-inside ordering and the same visual family reused on the title screen.
- Kept all runtime art procedural: no sprite sheets, raster game art, audio files, web fonts or external resources in the competition ZIP.
- Kept all runtime audio procedural through Web Audio oscillator/percussion/pop/bass voices, including heavier Impossible/Encore coloration.
- Added `test-v044.mjs`, a final release audit covering legacy pointer migration, laptop-safe input authority, pause return, stale-pointer suppression and deterministic multi-difficulty/boss soak bounds.
- Expanded Chromium and Firefox smoke tests to toggle pointer gameplay OFF and back ON through the real Canvas Controls UI before exercising gameplay/pause flows.
- Removed stale one-off packing workflow, retired v0.29/v0.31 harnesses, obsolete Living Color smoke/capture helpers and the old v0.24 trim utility.
- Removed historical binary ZIP snapshots from the working tree. Git history remains the archive; `dist/` now keeps only the current versioned ZIP and stable submission alias.
- Rebuilt `README.md`, `PLAY_LOCAL.md` and `RELEASING.md` around the actual final game, current controls, exact artifact and current qualification path.
- Current competition ZIP: **13,310 / 13,312 bytes (2 bytes free)**.
- Qualified SHA-256: `074b379ed4d3dbaec326b07cb0ae0b1313af77b6a4e5d5ae5791e9360102401a`.

## v0.28.0 - BOSS TRILOGY

- Replaced the three normal campaign bosses with three distinct mastery encounters rather than reskins or raw-stat checks.
- Rebuilt Trial 5 as **Hideaway Husk**, a guarded defensive boss that telegraphs `COVER!`, commits to a seven-kernel blast, then opens its husks for a real punish window. Arena blocks now function as meaningful shelter during the attack.
- Enforced boss guard state in combat authority: guarded bosses reject both Rainbow Snap damage and friendly/parried projectile damage, so visual shielding and collision semantics cannot disagree.
- Rebuilt Trial 9 as **The Kernel Colonel**, an evasive commander that retreats, circles, and deploys four-soldier squads. Chaining three troop kills fills a visible `0/3 → 3/3` guard counter and creates a temporary `EXPOSED!` damage window.
- Preserved hit-stop as part of Colonel feedback and hardened tests so the guard transition is asserted on the first live simulation frame after the third kill rather than during cinematic freeze.
- Rebuilt Trial 13 as **The Cobnocopia**, which alternates guarded/open states while spawning interruptible healing kernels. Healers physically route toward the boss and restore +3 HP on contact.
- Added **FINAL FEAST** below 20% HP: Cobnocopia remains exposed, immediately creates six healers, and continues feeding additional healing targets so the final phase becomes a target-priority and DPS race.
- Added dedicated procedural silhouettes for all three bosses while removing the retired normal-boss costumes, old boss backdrop renderer, duplicate boss micro-HUD, and superseded Husk Shift machinery from the packed composition.
- Retained a compact fallback boss grammar for the Impossible Encore, preserving its bounded one-generation 3→6 false-death structure and true ending without paying for both old and new normal-boss systems.
- Replaced stale Husk Architect regression assertions with built-artifact contracts that exercise Hideaway guard/open behavior, Colonel chain/exposure/recovery/squad deployment, Cobnocopia healing and Final Feast, all 13 safe spawns, and bounded Impossible cleanup.
- Hardened exact-dist tests around the competition golfer's renamed runtime fields (`state`, `tele`, `team`) instead of accidentally injecting readable-source property names into the transformed runtime.
- Exact submitted ZIP and standalone `file://` builds pass Chromium and Firefox. Wavedash isolation also passes.
- Full v0.28 qualification run: `33045527163`.
- Final qualified competition ZIP: **13,305 / 13,312 bytes (7 bytes free)**.
- Qualified SHA-256: `c1072fde0e3e1fcb8e503d14aa71f88b22d4ce2ff8d3cce64601cdd7c79b7e3d`.
- Stable and versioned v0.28 ZIPs are byte-identical and share Git blob `b1cc87529ab56e0a3dddea1dc8a0af9c3d12118f`.

## v0.27.0 - LIVING COLOR

- Reframed the whole visual arc around one explicit rule: the world begins drained and **regains color through play**.
- Added `colorRise()` so campaign progress, combo, and restoration progressively reduce the grayscale/saturation suppression applied to the playable world.
- Rebuilt **The Living Scar** opening as a readable grayscale resurrection sequence: a broken unicorn, one surviving light, the rainbow stitching the missing body, the first return of color, then First Flight.
- Replaced the shorter passive transition with a longer staged cinematic using the existing key-art character renderer so the origin story and gameplay share one visual language.
- Preserved visible story Skip controls and the safe First Flight handoff. New players still perform three genuine charged Rainbow Snaps before Easy begins automatically.
- Added dedicated Chromium and Firefox visual regression checks proving the origin begins nearly grayscale and the late campaign contains substantially more color.
- Captured a nine-frame visual QA sequence spanning the broken opening, last light, stitching, awakening, and Trials 1/5/9/13 restoration progression.
- Preserved all v0.26 key-art rendering, v0.23.1 onboarding, anti-chain Impossible rules, bounded Encore, deterministic packaging, and Wavedash isolation.
- Full Living Color qualification run: `33024153248`.
- Final qualified competition ZIP: **13,300 / 13,312 bytes (12 bytes free)**.
- Qualified SHA-256: `27b18b6cce0ce4b4b0e7107fdcee6ac4764f2c43310c880f751ba0cd9b0728e2`.

## v0.26.0 - KEY-ART RENDER

- Adopted the supplied Stretchicorn hero image as the canonical runtime visual bible: luminous white unicorn, glossy rainbow, rounded golden kernel cells, deep plum/violet world values, green husks, purple Cobtopus limbs, selective bloom and expressive faces.
- Added a compact `gel()` material primitive for contact shadow + saturated body mass + white specular highlight and rebuilt Stretchicorn/corn rendering around the shared material language.
- Rebuilt the Living Scar with a stable white luminous core and six candy-saturated spectral bands while retaining health fray and charge readability without per-frame random visual noise.
- Rebuilt ordinary corn and bosses with individually highlighted kernels, stronger husk silhouettes, readable facial expressions and more imposing boss scale.
- Reframed the title around the key-art composition: Stretchicorn left, enlarged Cobtopus right and a broad rainbow arc overhead. The Living Scar origin now uses the same palette/material system.
- Unified stage palettes and HUD chrome around deep violet/plum values so gameplay, menus and key art share one visual world.
- Removed the legacy whole-frame Chromatic Overload compositor and suppresses random whole-scene shake during rendering, directly addressing background flicker/shimmer from the v0.25 playtest. Gameplay state and combat physics remain unchanged.
- Quantized restoration/background movement and kept environmental animation slow and deterministic so the world reads as a stable illustration while combat remains kinetic.
- Updated build composition so superseded character/world/title renderers are omitted before the v0.26 key-art module is concatenated, avoiding duplicate competition bytes.
- Updated regression contracts to require the key-art renderer and explicitly reject the retired full-frame chromatic compositor.
- Exact competition ZIP, standalone file build and Wavedash isolation all pass Chromium and Firefox. First Flight still requires three real charged Rainbow Snaps before automatic Easy handoff.
- Final qualified competition ZIP: **13,054 / 13,312 bytes (258 bytes free)**.
- Qualified SHA-256: `c6b82201849b5d3b1ed7ca20481e2a4006ad56e7c5e07b1edadb836ab564c9ea`.

## v0.25.0 - STORYBOOK MEADOW

- Rejected the diagram-heavy v0.24 arena-background direction after screenshot and human playtest feedback, while preserving the stronger dimensional character/enemy rendering introduced there.
- Reframed the entire campaign as **one wounded pastoral kingdom** rather than four unrelated visual systems: the world now shares rolling hill masses, a faded horizon rainbow, meadow ground, grass clusters, flower heads, and restrained ambient glints.
- Added a dedicated modular `src/03-world-v025.js` world renderer so the pastoral direction remains readable and isolated from combat rendering.
- Updated `scripts/build.mjs` to remove the superseded v0.24 `worldArt()` / `bossArt()` range before concatenating v0.25, so the readable repository can retain history without paying for two world renderers in the 13KB submission.
- Rebuilt the opening region as **The Withered Meadow**, with broken fence rhythm, a distant rotating windmill, bent grasses, dull flowers, a tiny bird silhouette, rolling hills, and a deliberately subdued rainbow.
- Rebuilt the Maize Monarch region as **The Scarecrow Court**, using a barn silhouette, dark doorway, a full-bodied scarecrow, sunflower remnants, and agricultural decay instead of monumental court diagrams.
- Rebuilt the Husk Architect region as **The Drowned Furrows**, using shallow puddles, spectral water reflections, reeds, and a partially embedded waterwheel. The actual Husk Shift walls now provide the fight's imposed geometry instead of duplicating that idea in the background.
- Rebuilt the late campaign as **The Prism Thicket**, replacing drafting/architectural lines with a gnarled dark tree, heavy botanical branches, and small crystal-flower growth that gains color through restoration.
- Simplified Cobtopus and Impossible scenery into dark organic roots / world tears so the endgame damages the same meadow instead of introducing a fourth abstract arena language.
- Changed the visual hierarchy so filled silhouettes carry form while fine strokes are reserved for texture, weather, grass, reeds, and returning rainbow light.
- Reduced the horizon rainbow's baseline opacity so it reads as atmospheric evidence of the lost world rather than a bright six-band UI diagram; restoration makes it progressively more legible.
- Kept small noticed-later details such as flower color recovery, puddle reflections, meadow glints, windmill motion, reeds, bird marks, and spectral prism growth rather than generic stars/confetti.
- Tightened several competition-only HUD/tutorial strings for readability and byte efficiency while preserving the complete Living Scar → First Flight → three real Snaps → automatic Easy onboarding.
- Screenshot-reviewed the origin, First Flight, Withered Meadow, Scarecrow Court / Monarch, Drowned Furrows / Architect, Prism Thicket, Cobtopus, and Impossible Encore before freezing artifacts.
- Removed all one-shot v0.24/v0.25 render transform, optimizer, finalizer, qualification, and screenshot workflows after qualification; only permanent js13k and Wavedash verification workflows remain.
- Final qualified competition ZIP: **13,286 / 13,312 bytes (26 bytes free)**.
- Qualified SHA-256: `900f27ceb341cfd609f2a6f332ed476a2183f6cb238014349861ebdaf2f4983b`.
- Exact submission, standalone `file://` build, three-Snap First Flight path, and Wavedash isolation all pass in Chromium/Firefox where applicable.

## v0.24.0 - LUMINOUS WORLD

- Rebuilt Stretchicorn itself with layered procedural volume: body/head shading, highlights, more dimensional muzzle/ears/eyes, stronger horn treatment, multi-strand mane/tail motion, and a luminous six-band Living Scar.
- Rebuilt corn enemies with foreground/rear husks, kernel geometry, shadows, highlights, eyes/brows, and stronger material separation between enemy roles.
- Improved bosses with larger visual scale and secondary silhouette forms while leaving collision geometry unchanged.
- Added greater material depth to Husk Shift barriers, projectiles, pickups, HUD typography, and combat feedback using Canvas-only primitives.
- Performed screenshot QA on late boss arenas and reduced visual overdraw after the first pass proved that more lines did not necessarily create better art.
- Retained First Flight, Heavy Drop audio, kick-driven camera, critical-health scar fray, Chromatic Overload, mastery grades, final release, Impossible anti-chain pressure, and Wavedash isolation.
- Final qualified competition ZIP after composition refinement: **13,292 / 13,312 bytes (20 bytes free)**.
- Qualified SHA-256: `a8655e087b8f67ef1c5d20c4229cd3b7bf39c2729ed6a38941734a545349326f`.

## v0.23.1 - FIRST FLIGHT

- Rebuilt first-time onboarding around an actual safe practice field using production Stretchicorn physics rather than passive control demonstrations.
- New players now follow Living Scar story → First Flight practice → automatic Easy campaign. The difficulty menu is no longer the first gameplay decision.
- First Flight requires moving the vulnerable heart, aiming the safe horn, pulling opposite the horn until the rainbow is charged, and completing three real charged Rainbow Snaps before normal combat begins.
- Added a rainbow Snap target/guide and concise visual coaching around the core mental model: body pulls, horn points, rainbow snaps.
- Added explicit story/practice skip escape hatches for returning experts while keeping onboarding the default experience.
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
