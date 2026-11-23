/*
 * make.fun bounty: "The One-Line Laugh" (u-ronigrv-the-one-line-laugh-7ccca46f)
 *
 * The whole entry is the one line below: a single sentence of at most 200
 * characters on an everyday truth — a father, a sink, and what the visit
 * was actually for. The setup reads as a hardware problem; the ending
 * turns it into the family kind.
 *
 * The house gate reads /output/entry.txt as UTF-8 text of 1 to 200
 * characters, not only white space, and the house judge then compares
 * entries two at a time against its published brief (a real surprise at
 * the end that still makes sense, an everyday truth people recognise,
 * economy of words). So the program is deliberately trivial: no network,
 * no dependencies, no trailing newline (a newline would count as a 149th
 * character).
 */

import { mkdirSync, writeFileSync } from "node:fs";

const LINE =
  "I asked my dad how to fix the sink; he drove forty minutes, fixed it in ten, and spent three hours telling me about it, which was the actual repair.";

// The sandbox sets MAKEFUN_OUTPUT_DIR from its /output mount; in a container
// /output is the mount itself, so fall back to it.
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(`${outDir}/entry.txt`, LINE, "utf8");

// Guard the gate: UTF-8 text of 1 to 200 characters, not only white space.
const bytes = Buffer.byteLength(LINE, "utf8");
if (bytes < 1 || bytes > 200) {
  throw new Error(`line is ${bytes} bytes, outside the 1..200 gate`);
}
if (LINE.trim().length === 0) {
  throw new Error("line is only white space");
}
console.log(`wrote ${bytes} bytes to ${outDir}/entry.txt`);
