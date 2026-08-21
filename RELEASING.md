# Stretchicorn js13k release workflow

Stretchicorn treats the competition ZIP as a release artifact, not as a hand-made upload. The repository keeps the exact submission bytes in `dist/` and CI rebuilds them from source on every relevant pull request and push.

## Canonical artifacts

Every competition release writes the same bytes to two names:

- `dist/stretchicorn-desktop-v<VERSION>.zip` — immutable/versioned release artifact
- `dist/stretchicorn-js13k.zip` — stable link to the current competition submission

Both archives must contain exactly one self-contained file at the ZIP root:

```text
index.html
```

No wrapper directory, extra files, symlinks, external runtime assets, or network services are permitted in the competition artifact.

The version comes from `package.json`; release scripts must not hard-code it.

## Build a competition release

Install the deterministic compressor used by CI:

```bash
python3 -m pip install --user zopfli==0.4.3
```

Then run the canonical release command:

```bash
npm run release:competition
```

That command fails closed unless all of the following pass:

1. `dist/index.html` is rebuilt from the readable `src/` files.
2. The production VM regression suite passes.
3. The exact built-artifact smoke suite passes.
4. The built HTML contains no external resource references or network-capable runtime APIs.
5. Deterministic Zopfli ZIPs are generated.
6. Each ZIP contains exactly one root-level `index.html`.
7. ZIP CRC, metadata, path safety, and extracted-content parity are valid.
8. The stable and versioned ZIPs are byte-identical.
9. Each ZIP is at or below the js13k `13,312` byte ceiling.
10. A SHA-256 fingerprint is printed for the canonical submission bytes.

After any gameplay or source change intended for release, commit the regenerated `dist/index.html`, versioned ZIP, and stable ZIP together with the source changes.

## Real-browser smoke tests

The deterministic release checks are complemented by real Chromium and Firefox smoke tests in GitHub Actions. CI first extracts the committed `dist/stretchicorn-js13k.zip`, then serves that exact root-level `index.html`. The browser harness verifies the 960×640 Canvas is visible, starts a run from keyboard input, exercises pause/menu controls, fails on page or console errors, and blocks/fails any external request attempt.

To run the same exact-ZIP browser harness locally:

```bash
npm install --no-save --package-lock=false playwright@1.55.0
npx playwright install chromium firefox
rm -rf .tmp-js13k && mkdir .tmp-js13k
python3 -m zipfile -e dist/stretchicorn-js13k.zip .tmp-js13k
BROWSER=chromium BROWSER_HTML=.tmp-js13k/index.html npm run browser:smoke
BROWSER=firefox BROWSER_HTML=.tmp-js13k/index.html npm run browser:smoke
```

Playwright is intentionally a CI/developer harness only. It is never bundled into the competition ZIP.

## Version bump

For a new release:

1. Update `version` in `package.json`.
2. Update release notes/changelog.
3. Run `npm run release:competition`.
4. Run or review the Chromium and Firefox smoke checks.
5. Playtest the generated `dist/index.html` on real desktop hardware.
6. Commit the newly generated versioned ZIP and stable ZIP.

Old versioned ZIPs may remain in `dist/` as historical release snapshots. `stretchicorn-js13k.zip` always points at the newest release bytes.

## CI invariants

`Verify js13k competition release` has two layers and can also be launched manually with `workflow_dispatch`:

- **Competition integrity** rebuilds the canonical package and validates gameplay, offline behavior, archive structure, deterministic bytes, content parity, and size.
- **Browser smoke** extracts the exact stable submission ZIP and runs it independently in Chromium and Firefox.

The integrity job then checks `git status` for `dist/`. If rebuilding changes a tracked artifact or creates a missing versioned/stable ZIP, CI fails with:

```text
Competition artifact is stale. Run: npm run release:competition
```

This prevents source changes from merging without refreshing the exact submission package.

## Submission preflight

Before uploading `dist/stretchicorn-js13k.zip`, confirm:

- the js13k submission form accepts the ZIP,
- the ZIP size reported by the operating system is no more than `13,312` bytes,
- opening the archive shows `index.html` immediately at the top level,
- the latest `Competition integrity`, `Browser smoke (chromium)`, and `Browser smoke (firefox)` checks are green,
- the game receives one final manual keyboard/audio playtest in current Chrome and Firefox.

Do not manually unzip and re-zip the artifact. The release package has very little byte headroom and recompression can change its size.

## Wavedash isolation

Wavedash is a publishing layer only. Its SDK/bootstrap code must never enter either js13k ZIP. The competition builder reads `src/` directly and produces `dist/index.html`; Wavedash uses its own platform output.
