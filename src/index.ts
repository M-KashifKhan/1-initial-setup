import { parse } from "https://deno.land/std@0.207.0/flags/mod.ts";
import { serve } from "https://deno.land/std@0.207.0/http/server.ts";

const flags = parse(Deno.args, {
  string: ["port"],
  default: { port: 8080 },
});

console.log(`File server running on http://localhost:${flags.port}/`);

async function handleHttp(req: Request): Promise<Response> {
  const url = new URL(req.url);
  const filepath = decodeURIComponent(url.pathname);

  let file;
  try {
    // Adjust the path based on your directory structure (outside of public)
    file = await Deno.open(`./public${filepath}`, { read: true });
  } catch {
    const notFoundResponse = new Response("404 Not Found", { status: 404 });
    return notFoundResponse;
  }

  const readableStream = file.readable;
  const response = new Response(readableStream);
  return response;
}

serve(handleHttp, { port: flags.port });
