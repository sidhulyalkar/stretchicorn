# Stretchicorn js13k release workflow

The repository keeps the exact competition-ready ZIP in `dist/` so the current submission can always be downloaded directly from GitHub.

## Canonical artifacts

Every release writes the same bytes to two names:

- `dist/stretchicorn-desktop-v<VERSION>.zip` — immutable/versioned release artifact
- `dist/stretchicorn-js13k.zip` — stable link to the current competition submission

Both archives contain only one self-contained file: `index.html`.

The version comes from `package.json`; release scripts must not hard-code it.

## Build a competition release

Install the deterministic compressor used by CI:

```bash
python3 -m pip install --user zopfli==0.4.3
```

Then run:

```bash
npm run release:competition
```

That command:

1. rebuilds `dist/index.html` from readable `src/` files,
2. runs the production VM regression suite,
3. runs the exact built-artifact smoke test,
4. creates the deterministic versioned ZIP,
5. updates `dist/stretchicorn-js13k.zip`,
6. verifies both ZIPs are byte-identical, and
7. fails if either archive exceeds the js13k `13,312` byte limit.

After any gameplay/source change intended for a release, commit the resulting `dist/index.html`, versioned ZIP, and stable ZIP along with the source changes.

## Version bump

For a new release:

1. update `version` in `package.json`,
2. update release notes/changelog,
3. run `npm run release:competition`,
4. playtest the generated `dist/index.html`,
5. commit the newly generated versioned ZIP and stable ZIP.

Old versioned ZIPs may remain in `dist/` as tiny historical release snapshots. `stretchicorn-js13k.zip` always points at the newest release bytes.

## CI invariant

`Verify 13KB build` runs the same deterministic release pipeline and then checks `git status` for `dist/`.

If rebuilding changes a tracked artifact or creates a missing versioned/stable ZIP, CI fails with:

```text
Competition artifact is stale. Run: npm run release:competition
```

This prevents merging source changes that forgot to update the committed competition submission package.

## Wavedash isolation

Wavedash is a publishing layer only. Its SDK/bootstrap code must never enter either js13k ZIP. The competition builder reads `src/` directly and produces `dist/index.html`; Wavedash uses its own platform output.
