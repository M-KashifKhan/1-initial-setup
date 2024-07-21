import { Eta } from "https://deno.land/x/eta@v3.0.3/src/index.ts";
import * as path from "https://deno.land/std@0.224.0/path/mod.ts";

const __dirname = path.dirname(path.fromFileUrl(import.meta.url));
const inputDir = path.join(__dirname, "public");
const outputDir = path.join(__dirname, "public_html");

// Ensure output directory exists
await Deno.mkdir(outputDir, { recursive: true });

const eta = new Eta({ views: inputDir, cache: true });

async function convertEtaToHtml(filePath: string) {
  try {
    const relativePath = path.relative(inputDir, filePath);
    const html = await eta.render(relativePath, {}); // Pass an empty object if no data is needed
    const outputPath = path.join(outputDir, relativePath.replace('.eta', '.html'));
    
    // Ensure the output directory exists
    await Deno.mkdir(path.dirname(outputPath), { recursive: true });
    await Deno.writeTextFile(outputPath, html);
    console.log(`Converted ${filePath} to ${outputPath}`);
  } catch (e) {
    console.error(`Failed to convert ${filePath}:`, e);
  }
}

async function convertDirectory(dir: string) {
  for await (const entry of Deno.readDir(dir)) {
    const entryPath = path.join(dir, entry.name);
    if (entry.isDirectory) {
      if (entry.name === 'layouts' || entry.name === 'partials') {
        await convertDirectory(entryPath); // Recursively convert these directories
      }
    } else if (entry.name.endsWith('.eta')) {
      await convertEtaToHtml(entryPath);
    }
  }
}

// Convert only the 'layouts' and 'partials' directories
await convertDirectory(path.join(inputDir, 'layouts'));
await convertDirectory(path.join(inputDir, 'partials'));
