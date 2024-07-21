import * as path from "https://deno.land/std@0.224.0/path/mod.ts";
import { Eta } from "https://deno.land/x/eta@v3.0.3/src/index.ts";

const __dirname = path.dirname(path.fromFileUrl(import.meta.url));
const viewpath = path.join(__dirname, "public");
const eta = new Eta({ views: viewpath, cache: true });

// List of .eta files to render
const files = [
  "index.eta",
  "about.eta",
  "login.eta",
  "newsletter.eta",
  "profile.eta",
  "thank-you.eta"
];

for (const file of files) {
  try {
    const html = await eta.render(file, {});
    const htmlPath = path.join(viewpath, file.replace(".eta", ".html"));
    await Deno.writeTextFile(htmlPath, html);
    console.log(`Saved ${htmlPath}`);
  } catch (e) {
    console.error(`Error rendering ${file}:`, e);
  }
}
