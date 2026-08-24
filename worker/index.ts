/** Cloudflare Worker entry point for the vinext-starter template. */
import { handleImageOptimization, DEFAULT_DEVICE_SIZES, DEFAULT_IMAGE_SIZES } from "vinext/server/image-optimization";
import handler from "vinext/server/app-router-entry";

const canonicalOrigin = "https://www.integradaneuropsicologia.com.br";
const canonicalHostname = "www.integradaneuropsicologia.com.br";

const permanentRedirects = new Map<string, string>([
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

const worker = {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);
    const pathname = normalizedPathname(url);
    const mappedDestination = permanentRedirects.get(pathname);
    const isPreviewHostname = url.hostname.endsWith(".chatgpt.site");
    const isKnownProductionHostname =
      url.hostname === canonicalHostname ||
      url.hostname === "integradaneuropsicologia.com.br" ||
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

    return handler.fetch(request, env, ctx);
  },
};

export default worker;
