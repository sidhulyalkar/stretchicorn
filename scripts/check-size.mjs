import { statSync } from "node:fs";

const file = "dist/stretchicorn-rainbow-eternal-desktop-v0.15.0.zip";
const max = 13_312;
const size = statSync(file).size;
const remaining = max - size;
console.log(`${file}: ${size} / ${max} bytes (${remaining} bytes remaining)`);
if (size > max) process.exit(1);
