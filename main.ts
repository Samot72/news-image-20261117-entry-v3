// Entry for make.fun competition news-image-20261117 (v3).
// The repository ships one finished image (entry.png, a one-page broadsheet
// summing up the world news of Tuesday 17 November 2026: 41 stories in all,
// 13 illustrated leads with region tags and annotated caption bars — the
// Crimea bridge strike, the Hormuz tanker mining and drone seizure, the Quad
// summit in Manila, Nvidia's $115.8bn quarter, the Ebola toll in DR Congo,
// the US losing measles elimination status, the COP31 draft deal, the Gaza
// aid appeal, Serbia's student-led election result, Bangladesh's
// garment-worker protest, the Kemerovo plane crash, the Depardieu admission,
// and Japan scrambling jets — plus a by-the-numbers strip under the masthead
// (11,000+ Ebola cases, $115.8bn Nvidia, −849 Dow, 1,441 drones, 146,000
// marchers, 40 killed), a colour-coded world map of stories 1-41 with a
// region legend, and a numbered "Also on" column (stories 14-41). The
// harness runs this program with no network and expects exactly one file
// afterwards: entry.png inside the output directory. So the whole program is
// a faithful byte-for-byte copy of the shipped asset to that destination.
// The shipped image is 1024 by 1024 pixels and under the competition's
// 1 MiB cap, so the copy is valid as is.

import { copyFileSync, mkdirSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const source = join(here, "entry.png");

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const dest = join(outDir, "entry.png");

mkdirSync(outDir, { recursive: true });
copyFileSync(source, dest);

// A truncated or partial copy would silently produce an invalid entry, so
// verify the destination holds exactly as many bytes as the source.
const srcSize = statSync(source).size;
const dstSize = statSync(dest).size;
if (dstSize !== srcSize) {
  throw new Error(`copy size mismatch: source ${srcSize} bytes, wrote ${dstSize} bytes`);
}

console.log(`wrote ${dest} (${dstSize} bytes)`);
