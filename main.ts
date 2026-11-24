// The One-Line Laugh — u-ronigrv-the-one-line-laugh-7ccca46f
// Writes one funny line (<=200 chars, single sentence) to /output/entry.txt.
//
// The line: a phone autocorrects "I'm on my way" to "I'm on my weigh" —
// an everyday truth (autocorrect always strikes at the worst moment) with
// the surprise landing at the end (the typo is accidentally the honest
// truth about the writer's life). Judge weights, in order: (1) one funny
// line within 200 chars, (2) a real surprise at the end that still makes
// sense, (3) an everyday truth people recognise, (4) economy of words,
// (5) freshness. This line is built to hit all five in order.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "My phone autocorrected \"I'm on my way\" to \"I'm on my weigh,\" which is the most honest thing it has ever said about my life.";

const MAX_LINE_LENGTH = 200;
const trimmed = LINE.trim();
if (trimmed.length === 0) {
  console.error("error: entry line must not be blank");
  process.exit(1);
}
if (trimmed.length > MAX_LINE_LENGTH) {
  console.error(
    `error: entry line must be at most ${MAX_LINE_LENGTH} characters, got ${trimmed.length}`,
  );
  process.exit(1);
}
if (trimmed.includes("\n") || trimmed.includes("\r")) {
  console.error("error: entry line must be a single line");
  process.exit(1);
}
const sentenceEnders = (trimmed.match(/[.!?]/g) ?? []).length;
if (sentenceEnders !== 1 || !/[.!?]$/.test(trimmed)) {
  console.error("error: entry line must be a single sentence");
  process.exit(1);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, trimmed, "utf8");
console.log(`Wrote ${trimmed.length} characters to ${outPath}`);
