// gta6-meme-x-01 entry (Node 22, standard library only).
//
// The entry itself is the X post: a GTA 6 launch-week meme whose picture
// carries make.fun's ghost, posted from a public account with make.fun and
// the entrant's play code in its text. POST.json at the repository root
// names that post, and this program's only job is to hand POST.json to the
// grader: it copies it from the repository root to /output/POST.json.
// The house reads the post from X itself; nothing this program writes
// about the post is judged.
//
// Local run (as the grader does, with its own dirs):
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, mkdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const BOT_DIR = process.env.MAKEFUN_BOT_DIR ?? "/bot";
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

// Read POST.json first so a malformed file (or one with no url) fails
// loudly here instead of silently shipping a broken copy to the gate.
const post = JSON.parse(readFileSync(join(BOT_DIR, "POST.json"), "utf8"));
if (typeof post?.url !== "string" || post.url.length === 0) {
  console.error("POST.json has no url string");
  process.exit(1);
}
if (post.url.includes("<handle>")) {
  console.error("POST.json still holds the placeholder address: replace it with the real post URL before submitting.");
}

mkdirSync(OUTPUT_DIR, { recursive: true });
copyFileSync(join(BOT_DIR, "POST.json"), join(OUTPUT_DIR, "POST.json"));
