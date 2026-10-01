/** Cloudflare Worker entry point for the vinext-starter template. */
import { handleImageOptimization, DEFAULT_DEVICE_SIZES, DEFAULT_IMAGE_SIZES } from "vinext/server/image-optimization";
import handler from "vinext/server/app-router-entry";

const canonicalOrigin = "https://integradaneuropsicologia.com.br";
const canonicalHostname = "integradaneuropsicologia.com.br";
const legacyHostname = "www.integradaneuropsicologia.com.br";

const permanentRedirects = new Map<string, string>([
  ["/home", "/"],
  ["/avaliacaoonline", "/avaliacao-neuropsicologica-online-adultos"],
  ["/avaliacao-neuropsicologica-online-adultos/como-funciona", "/avaliacao-neuropsicologica-online-adultos#como-funciona"],
  ["/avaliacao-neuropsicologica-online-adultos/para-quem", "/avaliacao-neuropsicologica-online-adultos#para-quem"],
  ["/avaliacao-neuropsicologica-online-adultos/o-que-investiga", "/avaliacao-neuropsicologica-online-adultos#o-que-investiga"],
  ["/avaliacao-neuropsicologica-online-adultos/duvidas", "/avaliacao-neuropsicologica-online-adultos#duvidas"],
  ["/avaliacao-neuropsicologica-online-adultos/avaliacoes", "/avaliacao-neuropsicologica-online-adultos#avaliacoes"],
  ["/avaliacao-neuropsicologica-online-adultos/contato", "/avaliacao-neuropsicologica-online-adultos#contato"],
  ["/jogos-de-estimulacao-mental", "/exercicios-de-estimulacao-mental"],
  ["/jogos-de-estimulação-mental", "/exercicios-de-estimulacao-mental"],
  ["/jogosdeestimulacaomental", "/exercicios-de-estimulacao-mental"],
  ["/jogosdeestimulaçãomental", "/exercicios-de-estimulacao-mental"],
  ["/caca-rapida", "/exercicios-de-estimulacao-mental"],
  ["/jogodolabirinto", "/exercicios-de-estimulacao-mental/labirinto"],
  ["/caca-palavras-estimulacao-cognitiva", "/exercicios-de-estimulacao-mental/caca-palavras"],
  ["/desafiohanoi", "/exercicios-de-estimulacao-mental/torre-de-hanoi"],
  ["/resta-um-raciocinio-visual", "/exercicios-de-estimulacao-mental/resta-um"],
  ["/sequênciainteligente", "/exercicios-de-estimulacao-mental/sequencia-inteligente"],
  ["/caca-fantasmas-agilidade-atencao", "/exercicios-de-estimulacao-mental/reflexo-fantasmas"],
  ["/torredelondresdigital", "/exercicios-de-estimulacao-mental/torre-de-londres"],
  ["/quebra-cabeçaemoji", "/exercicios-de-estimulacao-mental/quebra-cabeca-emoji"],
  ["/afirmou-bateu", "/exercicios-de-estimulacao-mental/afirmou-bateu"],
  ["/memóriamix", "/exercicios-de-estimulacao-mental/memoria-mix"],
  ["/desafiodascores", "/exercicios-de-estimulacao-mental/desafio-das-cores"],
  ["/emojialvo", "/exercicios-de-estimulacao-mental/emoji-alvo"],
  ["/intrusodaspalavras", "/exercicios-de-estimulacao-mental/intruso-das-palavras"],
  ["/cliquenomomentocerto", "/exercicios-de-estimulacao-mental/clique-no-momento-certo"],
  ["/cacacirculos", "/exercicios-de-estimulacao-mental/caca-circulos"],
  ["/memorianumerica", "/exercicios-de-estimulacao-mental/sequencia-numerica"],
  ["/buscadosímbolo", "/exercicios-de-estimulacao-mental/busca-do-simbolo"],
  ["/ordem-das-acoes", "/exercicios-de-estimulacao-mental/ordem-das-acoes"],
  ["/palavra-emoji", "/exercicios-de-estimulacao-mental/palavra-emoji"],
  ["/blank-4", "/teste-tdah-infantil"],
  ["/blank-5", "/teste-autismo-infantil"],
  ["/blank-6", "/teste-autismo-adulto"],
]);

function normalizedPathname(url: URL) {
  let pathname = url.pathname;

  try {
    pathname = decodeURIComponent(pathname).normalize("NFC");
  } catch {
    // Keep the encoded pathname when a malformed escape sequence is received.
  }

  return pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;
}

function permanentRedirect(requestUrl: URL, destination: string) {
  const target = new URL(destination, canonicalOrigin);
  if (!target.search) target.search = requestUrl.search;

  return new Response(null, {
    status: 301,
    headers: {
      Location: target.toString(),
      "Cache-Control": "public, max-age=3600",
    },
  });
}

// workers.dev hosts only serve previews (version and alias URLs) and must never
// be indexed; production traffic arrives on the canonical domain instead.
function isWorkersDevHostname(hostname: string) {
  return hostname.endsWith(".workers.dev");
}

function withNoindex(response: Response) {
  const headers = new Headers(response.headers);
  headers.set("X-Robots-Tag", "noindex");

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

// Proposta 9b: on the Google Ads landing (fully server-rendered), the ~96 KB of
// hydration scripts were preloaded in <head> and finished before the first paint,
// delaying LCP on slow mobile connections. Here the modulepreload hints are removed
// and the React bootstrap import starts only after the first contentful paint, on
// the first interaction, or at most 3 s after parsing. Local A/B (Lighthouse 13.5,
// mobile, 6 rounds): LCP 3.33 s -> 2.22 s, FCP 2.67 s -> 1.55 s; hydration completes
// ~0.2 s after FCP. If the expected markup is not found, the HTML is left unchanged.
const deferredHydrationPaths = new Set(["/avaliacao-neuropsicologica-online-adultos"]);
const reactBootstrapPattern = /<script id="_R_">import\("(\/assets\/[A-Za-z0-9_-]+\.js)"\)<\/script>/;

function deferLandingHydration(html: string): string {
  const entry = html.match(reactBootstrapPattern);
  if (!entry) return html;
  const gate =
    '<script id="_R_">(function(){var s=0;function go(){if(s)return;s=1;import(' + JSON.stringify(entry[1]) + ")}" +
    'try{new PerformanceObserver(function(l){if(l.getEntriesByName("first-contentful-paint").length)setTimeout(go,0)}).observe({type:"paint",buffered:true})}catch(e){}' +
    '["pointerdown","keydown","focusin","touchstart"].forEach(function(t){document.addEventListener(t,go,{once:true,capture:true,passive:true})});' +
    "setTimeout(go,3000)})()</script>";
  return html.replace(/<link rel="modulepreload"[^>]*>/g, "").replace(entry[0], gate);
}

async function withDeferredHydration(response: Response): Promise<Response> {
  const contentType = response.headers.get("content-type") ?? "";
  const contentEncoding = response.headers.get("content-encoding");
  if (response.status !== 200 || !response.body || !/^text\/html\b/i.test(contentType) || (contentEncoding && contentEncoding !== "identity")) {
    return response;
  }
  const html = await response.text();
  const headers = new Headers(response.headers);
  headers.delete("content-length");
  return new Response(deferLandingHydration(html), { status: response.status, statusText: response.statusText, headers });
}

interface Env {
  ASSETS: Fetcher;
  DB: D1Database;
  IMAGES: {
    input(stream: ReadableStream): {
      transform(options: Record<string, unknown>): {
        output(options: { format: string; quality: number }): Promise<{ response(): Response }>;
      };
    };
  };
}

interface ExecutionContext {
  waitUntil(promise: Promise<unknown>): void;
  passThroughOnException(): void;
}

// Image security config. SVG sources with .svg extension auto-skip the
// optimization endpoint on the client side (served directly, no proxy).
// To route SVGs through the optimizer (with security headers), set
// dangerouslyAllowSVG: true in next.config.js and uncomment below:
// const imageConfig: ImageConfig = { dangerouslyAllowSVG: true };

async function handleRequest(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
  const url = new URL(request.url);
  const pathname = normalizedPathname(url);
  const mappedDestination = permanentRedirects.get(pathname);
  const isPreviewHostname = url.hostname.endsWith(".chatgpt.site");
  const isKnownProductionHostname =
    url.hostname === canonicalHostname ||
    url.hostname === legacyHostname ||
    isPreviewHostname;

  if (mappedDestination) {
    return permanentRedirect(url, mappedDestination);
  }

  if (isKnownProductionHostname && (url.protocol !== "https:" || url.hostname !== canonicalHostname)) {
    return permanentRedirect(url, `${pathname}${url.search}`);
  }

  if (url.pathname === "/_vinext/image") {
    const allowedWidths = [...DEFAULT_DEVICE_SIZES, ...DEFAULT_IMAGE_SIZES];
    return handleImageOptimization(request, {
      fetchAsset: (path) => env.ASSETS.fetch(new Request(new URL(path, request.url))),
      transformImage: async (body, { width, format, quality }) => {
        const result = await env.IMAGES.input(body).transform(width > 0 ? { width } : {}).output({ format, quality });
        return result.response();
      },
    }, allowedWidths);
  }

  const handlerResponse = await handler.fetch(request, env, ctx);
  const response = deferredHydrationPaths.has(pathname)
    ? await withDeferredHydration(handlerResponse)
    : handlerResponse;

  if (response.status !== 404) {
    return response;
  }

  return withNoindex(response);
}

const worker = {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const response = await handleRequest(request, env, ctx);

    if (!isWorkersDevHostname(new URL(request.url).hostname)) {
      return response;
    }

    return withNoindex(response);
  },
};

export default worker;
