# Stretchicorn js13k release workflow

Stretchicorn treats the competition ZIP as a reproducible release artifact, not as a hand-made upload. The repository keeps the exact current submission bytes in `dist/`, and CI rebuilds them from source before accepting the candidate.

## Current qualified submission

```text
version: 0.39.0
dist/stretchicorn-js13k.zip
dist/stretchicorn-desktop-v0.39.0.zip
13,311 / 13,312 bytes
1 byte free
SHA-256 31c2d2e32fb30755405f7821b34e05f9cbae9f0ec52fb010fa2f1fe6234daf3f
```

The stable and versioned ZIPs are byte-identical.

## Canonical artifacts

A release produces:

- `dist/index.html`: exact packed competition HTML placed in the ZIP
- `dist/stretchicorn-local.html`: byte-identical packed HTML for direct `file://` playtesting
- `dist/stretchicorn-desktop-v<VERSION>.zip`: versioned competition artifact
- `dist/stretchicorn-js13k.zip`: stable alias for the current submission

The competition ZIP must contain exactly one self-contained file at ZIP root:

```text
index.html
```

No wrapper directory, extra files, symlinks, external runtime assets or network services are allowed.

Historical ZIP snapshots are kept in Git history rather than accumulating in the working-tree `dist/` directory. The working tree should contain only the current versioned ZIP plus the stable alias.

## Required environment

CI currently qualifies with:

- Node.js 22
- Python 3.12
- `zopfli==0.4.3`

Install the pinned compressor locally:

```bash
python3 -m pip install zopfli==0.4.3
```

## Canonical release command

```bash
npm run release:competition
```

This is the release gate. It fails closed unless the full chain succeeds.

### 1. Build current source

`scripts/build.mjs` composes the readable modules, removes explicitly retired seams from the competition composition, applies the safe identifier-golf map and writes the readable generated forms used by the VM regression chain.

The readable repository can therefore retain historical context in versioned source modules without shipping duplicate runtime systems.

### 2. Run the current VM regression chain

`scripts/run-regressions.mjs` is the single regression manifest used by `npm test` and the competition release gate. Keeping the suite list in one place prevents `test`, `smoke` and `release:competition` from silently drifting apart.

The suite currently includes:

- final legacy-settings / input-authority / deterministic soak audit,
- explicit boxed menu hitboxes and pointer OFF/ON behavior,
- title/pause/Guide/Controls/Game Over/result click authority,
- Guide **G** shortcut and exact return-to-origin behavior,
- centered Controls action geometry,
- number-free title difficulty cards with retired **1–4** title shortcuts,
- boss anti-farm Style / combo / Lucky-count isolation,
- Hard/Impossible last-enemy pickup gating and restored Impossible Lucky sustain,
- Impossible **3× run-end Style premium**, Hard score-scale preservation and Controls-save isolation,
- victory/result semantics,
- Easy Morning Stretch,
- final 13-trial naming contract,
- Field Guide and hay integration,
- pause/retry/storage/boss/Encore authority,
- nested rainbow restoration,
- direct-title flow and cyan pressure,
- boss art and base shape grammar,
- boss/counterplay runtime invariants,
- sky contract.

A failed regression stops packaging.

### 3. Pack the competition HTML

`scripts/pack-competition.mjs` runs:

```text
Terser 5.50.0
      ↓
Roadroller 2.1.0 with a pinned model/configuration
      ↓
packed dist/index.html
      ↓
byte-identical dist/stretchicorn-local.html
```

Roadroller is run twice. The two packed outputs must be byte-identical or the release aborts. Only after the readable VM regressions pass does the packer replace the final local-playtest file with the exact packed competition payload. This makes direct `file://` testing another launch path for the submitted bytes rather than a separate browser build.

### 4. Verify offline behavior

`scripts/check-offline.mjs` rejects external resource references and network-capable runtime APIs in the competition HTML.

### 5. Generate deterministic ZIPs

`scripts/package.py` uses pinned Zopfli and deterministic archive metadata to produce both ZIP names.

### 6. Verify archive integrity

`scripts/verify-archive.py` checks:

- exactly one archive member,
- exact root-level `index.html` path,
- safe path semantics,
- extracted content parity,
- CRC/ZIP validity,
- stable/versioned byte identity,
- deterministic metadata,
- hard `13,312` byte ceiling,
- SHA-256 fingerprint.

### 7. Check final size

`scripts/check-size.mjs` prints the used/free byte count and fails above 13,312 bytes.

The current candidate is exactly **13,311 / 13,312 bytes** with **1 byte free**. Any source change should be treated as a release change and requalified from zero.

### 8. Audit release metadata and working-tree hygiene

`scripts/audit-release.mjs` makes the documentation and repository shape part of the release contract. It requires:

- `dist/` to contain exactly the current competition HTML, standalone HTML, stable ZIP and current versioned ZIP,
- stable and versioned ZIPs to remain byte-identical,
- the final ZIP to remain within the 13,312-byte ceiling,
- `README.md` and `RELEASING.md` to contain the actual current versioned filename, byte count, free-byte count and SHA-256.

This catches a different class of release bug: a perfectly valid game artifact accompanied by stale public documentation or an accidental pile of historical binaries.

## Committed artifact parity

CI rebuilds the release and then checks `git status -- dist`.

If rebuilding changes a tracked artifact or creates a missing artifact, CI fails. This prevents a source commit from silently carrying stale submission bytes. Because the final local playtest is now the packed payload, this parity check also requires `dist/stretchicorn-local.html` and `dist/index.html` to agree exactly.

Expected failure message:

```text
Generated artifacts are stale. Run: npm run release:competition
```

## Real-browser qualification

After competition integrity succeeds, GitHub Actions tests the exact committed submission in **Chromium, Firefox and WebKit**.

For the ZIP path, CI:

1. extracts `dist/stretchicorn-js13k.zip`,
2. serves that exact `index.html` locally,
3. blocks external requests,
4. verifies Canvas geometry,
5. opens Controls from the real title screen,
6. verifies the rendered pointer state starts ON,
7. toggles pointer gameplay OFF and verifies the rendered OFF state,
8. reopens Controls with a Canvas click while pointer gameplay is disabled,
9. toggles pointer gameplay back ON and verifies the rendered ON state,
10. starts gameplay,
11. pauses/resumes,
12. starts a non-default difficulty,
13. fails on page errors, console errors or network attempts.

CI then opens the **same packed payload** as `dist/stretchicorn-local.html` directly through `file://` in the same browser and repeats the critical Controls/title/gameplay/pause path. The two browser routes therefore differ in launch environment, not game bytes.

The VM suite separately verifies the complete boxed menu matrix, including Resume, Guide, Controls, Menu, Back, Retry, Replay and next-difficulty actions. This catches click-routing failures without relying only on browser smoke.

## Run the browser harness locally

```bash
npm install --no-save --package-lock=false playwright@1.55.0
npx playwright install chromium firefox webkit

rm -rf .tmp-js13k
mkdir .tmp-js13k
python3 -m zipfile -e dist/stretchicorn-js13k.zip .tmp-js13k

BROWSER=chromium BROWSER_HTML=.tmp-js13k/index.html npm run browser:smoke
BROWSER=firefox BROWSER_HTML=.tmp-js13k/index.html npm run browser:smoke
BROWSER=webkit BROWSER_HTML=.tmp-js13k/index.html npm run browser:smoke

BROWSER=chromium BROWSER_HTML=dist/stretchicorn-local.html npm run browser:file-smoke
BROWSER=firefox BROWSER_HTML=dist/stretchicorn-local.html npm run browser:file-smoke
BROWSER=webkit BROWSER_HTML=dist/stretchicorn-local.html npm run browser:file-smoke
```

Playwright is a developer/CI harness only and is never bundled into the submission.

## Source-change protocol

Because the candidate has **1 byte of headroom**, do not treat even tiny gameplay copy edits as harmless.

For any change that can alter `dist/index.html`:

1. make the smallest source change possible,
2. run `npm run release:competition`,
3. confirm size is still `<= 13,312`,
4. inspect the generated standalone file manually,
5. commit source and all regenerated current `dist/` artifacts together,
6. wait for Competition integrity,
7. wait for Chromium smoke,
8. wait for Firefox smoke,
9. wait for WebKit smoke,
10. wait for Wavedash isolation when relevant,
11. perform one final human playtest before submission.

Documentation/test-only changes should still leave `dist/` byte-identical.

## Version bump protocol

For a new named release:

1. update `version` in `package.json`,
2. update `CHANGELOG.md`,
3. run `npm run release:competition`,
4. confirm the new `dist/stretchicorn-desktop-v<VERSION>.zip`,
5. delete the previous versioned ZIP from the working tree if it is no longer the current candidate,
6. keep `dist/stretchicorn-js13k.zip` as the stable alias,
7. update README/release fingerprints,
8. re-run browser qualification.

The old artifact remains available from Git history.

## Submission preflight

Before uploading `dist/stretchicorn-js13k.zip`, confirm all of the following:

- [ ] ZIP is at or below `13,312` bytes
- [ ] archive opens directly to `index.html`
- [ ] no wrapper directory exists
- [ ] stable/versioned ZIPs are byte-identical
- [ ] SHA-256 matches the qualified README/current release-note value
- [ ] `npm run release:competition` passes on the intended commit
- [ ] `npm run audit:release` confirms metadata and `dist/` hygiene
- [ ] committed `dist/` matches the rebuild
- [ ] `dist/stretchicorn-local.html` is byte-identical to packed `dist/index.html`
- [ ] Chromium exact-ZIP smoke is green
- [ ] Firefox exact-ZIP smoke is green
- [ ] WebKit exact-ZIP smoke is green
- [ ] Chromium standalone `file://` smoke is green
- [ ] Firefox standalone `file://` smoke is green
- [ ] WebKit standalone `file://` smoke is green
- [ ] Wavedash isolation is green when the publishing layer changed
- [ ] manual title → Controls → Easy → pause → Guide/Back → boss sampling → result flow still feels correct
- [ ] no manual unzip/re-zip step has touched the submission

Do not manually re-compress the archive. With **1 byte free**, a different ZIP tool can move the candidate over the limit immediately.

## Wavedash isolation

Wavedash is a publishing layer only. Its SDK/bootstrap output must never enter the js13k ZIP.

The competition builder reads the game source directly and produces `dist/index.html`; Wavedash uses a separate generated publishing artifact and its own isolation test.
