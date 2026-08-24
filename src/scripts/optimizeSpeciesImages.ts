/**
 * optimizeSpeciesImages.ts
 *
 * Re-encodes every raster image under public/images/species/ in place:
 *   - downsizes anything wider than 1600px (withoutEnlargement, aspect kept)
 *   - re-encodes JPEG at quality 78 with mozjpeg
 *   - re-encodes PNG with its own compressor at a comparable effort level
 *
 * Filenames are preserved exactly (src/data/curated-species.json references
 * them by path). Each candidate is built into a temp file first and only
 * swapped in when it's smaller than the original — otherwise the original
 * is left untouched, so this script can never make an image larger.
 *
 * Run with: npx tsx src/scripts/optimizeSpeciesImages.ts
 */

import { promises as fs } from "fs";
import path from "path";
import sharp from "sharp";

const SPECIES_DIR = path.resolve(__dirname, "../../public/images/species");
const MAX_WIDTH = 1600;
const JPEG_QUALITY = 78;

const IMAGE_EXTENSIONS = new Set([".jpg", ".jpeg", ".png"]);

interface FileResult {
  file: string;
  beforeBytes: number;
  afterBytes: number;
  replaced: boolean;
  beforeWidth: number | null;
  afterWidth: number | null;
}

function formatKb(bytes: number): string {
  return `${(bytes / 1024).toFixed(1)} KB`;
}

function formatMb(bytes: number): string {
  return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
}

async function processFile(filePath: string): Promise<FileResult> {
  const fileName = path.basename(filePath);
  const ext = path.extname(filePath).toLowerCase();

  const beforeStat = await fs.stat(filePath);
  const beforeBytes = beforeStat.size;

  const originalBuffer = await fs.readFile(filePath);
  const metadata = await sharp(originalBuffer).metadata();
  const beforeWidth = metadata.width ?? null;

  let pipeline = sharp(originalBuffer, { failOn: "none" }).rotate();

  if (metadata.width && metadata.width > MAX_WIDTH) {
    pipeline = pipeline.resize({ width: MAX_WIDTH, withoutEnlargement: true });
  }

  let candidateBuffer: Buffer;
  if (ext === ".png") {
    candidateBuffer = await pipeline
      .png({ compressionLevel: 9, effort: 10, palette: false })
      .toBuffer();
  } else {
    // .jpg / .jpeg
    candidateBuffer = await pipeline
      .jpeg({ quality: JPEG_QUALITY, mozjpeg: true })
      .toBuffer();
  }

  const afterMeta = await sharp(candidateBuffer).metadata();
  const afterWidthCandidate = afterMeta.width ?? null;

  let replaced = false;
  let afterBytes = beforeBytes;
  let afterWidth = beforeWidth;

  if (candidateBuffer.byteLength < beforeBytes) {
    const tmpPath = `${filePath}.tmp-${process.pid}`;
    await fs.writeFile(tmpPath, candidateBuffer);
    await fs.rename(tmpPath, filePath);
    replaced = true;
    afterBytes = candidateBuffer.byteLength;
    afterWidth = afterWidthCandidate;
  }

  return {
    file: fileName,
    beforeBytes,
    afterBytes,
    replaced,
    beforeWidth,
    afterWidth,
  };
}

async function main() {
  const entries = await fs.readdir(SPECIES_DIR, { withFileTypes: true });
  const targets = entries
    .filter((e) => e.isFile() && IMAGE_EXTENSIONS.has(path.extname(e.name).toLowerCase()))
    .map((e) => path.join(SPECIES_DIR, e.name))
    .sort();

  if (targets.length === 0) {
    console.log(`No images found in ${SPECIES_DIR}`);
    return;
  }

  console.log(`Optimizing ${targets.length} image(s) in ${SPECIES_DIR}\n`);

  const results: FileResult[] = [];
  for (const filePath of targets) {
    try {
      const result = await processFile(filePath);
      results.push(result);

      const dims =
        result.beforeWidth && result.afterWidth && result.beforeWidth !== result.afterWidth
          ? ` (${result.beforeWidth}px -> ${result.afterWidth}px)`
          : result.beforeWidth
            ? ` (${result.beforeWidth}px)`
            : "";

      if (result.replaced) {
        const pct = (100 * (1 - result.afterBytes / result.beforeBytes)).toFixed(1);
        console.log(
          `  ${result.file}: ${formatKb(result.beforeBytes)} -> ${formatKb(result.afterBytes)} ` +
            `(-${pct}%)${dims}`
        );
      } else {
        console.log(
          `  ${result.file}: ${formatKb(result.beforeBytes)} (kept original, re-encode was not smaller)${dims}`
        );
      }
    } catch (err) {
      console.error(`  ${path.basename(filePath)}: FAILED — ${(err as Error).message}`);
    }
  }

  const totalBefore = results.reduce((sum, r) => sum + r.beforeBytes, 0);
  const totalAfter = results.reduce((sum, r) => sum + r.afterBytes, 0);
  const replacedCount = results.filter((r) => r.replaced).length;
  const totalPct = totalBefore > 0 ? (100 * (1 - totalAfter / totalBefore)).toFixed(1) : "0.0";

  console.log("\n--- Summary ---");
  console.log(`Files processed: ${results.length} (${replacedCount} re-encoded, ${results.length - replacedCount} kept original)`);
  console.log(`Total before: ${formatMb(totalBefore)}`);
  console.log(`Total after:  ${formatMb(totalAfter)}`);
  console.log(`Reduction:    ${formatMb(totalBefore - totalAfter)} (-${totalPct}%)`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
