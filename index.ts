import * as path from "https://deno.land/std@0.224.0/path/mod.ts";
import { Eta } from "https://deno.land/x/eta@v3.0.3/src/index.ts";
import { parse } from "https://deno.land/std@0.224.0/flags/mod.ts"; // Correct import

const __dirname = path.dirname(path.fromFileUrl(import.meta.url));

// Adjust the path for .eta views
const viewpath = path.join(Deno.cwd(), "public"); // Root path for ETA templates
const eta = new Eta({ views: viewpath, cache: true });

const flags = parse(Deno.args, {
  string: ["port"],
  default: { port: "3000" },
});

async function handler(request: Request) {
  const url = new URL(request.url);
  let filepath = decodeURIComponent(url.pathname);
  if (filepath === "/") {
    filepath = "/index.eta";
  } else if (filepath.toLowerCase().indexOf(".eta") < 0 && filepath.endsWith("/")) {
    filepath += "index.eta";
  } else if (filepath.toLowerCase().indexOf(".") <= 0) {
    filepath += ".eta";
  }

  let file;
  let response;
  try {
    console.log(filepath);
    if (filepath.endsWith(".eta")) {
      // Render .eta files
      response = new Response(await eta.render(filepath, {}), {
        headers: { "content-type": "text/html" },
      });
    } else {
      // Serve static files
      file = await Deno.open(path.join(Deno.cwd(), "public", filepath), { read: true });
      const readableStream = file.readable;
      response = new Response(readableStream);
    }
  } catch (e) {
    console.error(e);
    response = new Response("404 Not Found", { status: 404 });
  }

  return response;
}

Deno.serve({ port: parseInt(flags.port) }, handler);
