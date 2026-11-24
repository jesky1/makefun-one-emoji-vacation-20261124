// Entry for make.fun's u-grand-elephant-19-one-emoji-one-dream-vacation-62879a35,
// "One Emoji, One Dream Vacation".
//
// The whole program is one job: put a single emoji — the one most likely
// to make a stranger want to book the flight — into entry.txt inside the
// output directory, byte for byte the same on every run. The grader points
// MAKEFUN_OUTPUT_DIR at its own scratch output folder; on a plain machine
// the fallback is /output, the path the competition reads.
//
// Run it locally with:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
// and the emoji lands in out/entry.txt, with no trailing newline: the judge
// reads exactly what is in the file, so the emoji below is the entire entry.

import { writeFileSync } from 'node:fs';
import { join } from 'node:path';

// The emoji itself: U+1F30C MILKY WAY — one night under a sky full of stars.
// A dream vacation as a postcard at a glance: a faraway place (a dark-sky
// desert, an aurora night, an island with no light pollution) that people
// save for years to see once. It is specific rather than generic — not just
// "a holiday" but one particular dream trip — and surprising rather than the
// first beach or plane that comes to mind, yet instantly readable on any
// screen at any size: a sky full of stars needs no explaining.
const EMOJI = '🌌';

// Gate check, mirroring the competition's own gate: entry.txt must be
// UTF-8 text of 1 to 8 characters, not only white space — and this entry
// is exactly one emoji, nothing else. Refuse to write anything invalid.
function isSingleEmoji(text: string): boolean {
  // Exactly one Unicode code point, and that code point must be pictographic.
  if ([...text].length !== 1) return false;
  if (/^\s+$/.test(text)) return false;
  return /^\p{Extended_Pictographic}$/u.test(text);
}

if (!isSingleEmoji(EMOJI)) {
  throw new Error(`entry is not exactly one emoji: ${JSON.stringify(EMOJI)}`);
}

const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

writeFileSync(join(outputDir, 'entry.txt'), EMOJI, 'utf8');
