# vinext-starter

A clean full-stack starter running on
[vinext](https://github.com/cloudflare/vinext), with optional Cloudflare D1 and
Drizzle support.

## Prerequisites

- Node.js `>=22.13.0`

## Quick Start

```bash
npm install
npm run dev
npm run build
```

Cloudflare Workers publishing is configured in `wrangler.jsonc` (see below).

## Included Shape

- edit site code under `app/`
- `.openai/hosting.json` declares optional Sites D1 and R2 bindings
- `vite.config.ts` simulates declared bindings for local development
- `db/schema.ts` starts intentionally empty
- `examples/d1/` contains an optional D1 example surface
- `drizzle.config.ts` supports local migration generation when needed

## Workspace Auth Headers

OpenAI workspace sites can read the current user's email from
`oai-authenticated-user-email`.

SIWC-authenticated workspace sites may also receive
`oai-authenticated-user-full-name` when the user's SIWC profile has a non-empty
`name` claim. The full-name value is percent-encoded UTF-8 and is accompanied by
`oai-authenticated-user-full-name-encoding: percent-encoded-utf-8`.

Treat the full name as optional and fall back to email when it is absent:

```tsx
import { headers } from "next/headers";

export default async function Home() {
  const requestHeaders = await headers();
  const email = requestHeaders.get("oai-authenticated-user-email");
  const encodedFullName = requestHeaders.get("oai-authenticated-user-full-name");
  const fullName =
    encodedFullName &&
    requestHeaders.get("oai-authenticated-user-full-name-encoding") ===
      "percent-encoded-utf-8"
      ? decodeURIComponent(encodedFullName)
      : null;

  const displayName = fullName ?? email;
  // ...
}
```

## Optional Dispatch-Owned ChatGPT Sign-In

Import the ready-to-use helpers from `app/chatgpt-auth.ts` when the site needs
optional or required ChatGPT sign-in:

- Use `getChatGPTUser()` for optional signed-in UI.
- Use `requireChatGPTUser(returnTo)` for server-rendered pages that should send
  anonymous visitors through Sign in with ChatGPT.
- Use `chatGPTSignInPath(returnTo)` and `chatGPTSignOutPath(returnTo)` for
  browser links or actions.
- Pass a same-origin relative `returnTo` path for the destination after sign-in
  or sign-out. The helper validates and safely encodes it.
- Mark protected pages with `export const dynamic = "force-dynamic"` because
  they depend on per-request identity headers.

Dispatch owns `/signin-with-chatgpt`, `/signout-with-chatgpt`, `/callback`, the
OAuth cookies, and identity header injection. Do not implement app routes for
those reserved paths. Routes that do not import and call the helper remain
anonymous-compatible.

SIWC establishes identity only; it does not prove workspace membership. Use the
Sites hosting platform's access policy controls for workspace-wide restrictions,
or enforce explicit server-side membership or allowlist checks.

Use SIWC for account pages, user-specific dashboards, saved records, and write
actions tied to the current ChatGPT user. Leave public content anonymous.

## Publicação (Cloudflare Workers)

O site é publicado como Worker `integrada-neuropsicologia` na conta Cloudflare
da clínica (Workers Paid). O `wrangler.jsonc` da raiz é combinado pelo plugin
Vite da Cloudflare na build; o arquivo final fica em `dist/server/wrangler.json`.

Autenticação: o Wrangler lê o token da variável de ambiente
`CLOUDFLARE_API_TOKEN`, definida pela responsável no próprio terminal. O token
tem permissão só para publicar Workers (sem DNS) e nunca é versionado nem
colocado em arquivos do projeto (`.env*`, `.dev.vars*` e `.wrangler/` são
ignorados pelo Git).

- Prévia: `npm run deploy:preview` roda os testes e envia uma nova versão sem
  colocá-la em produção, com o alias
  `https://previa-integrada-neuropsicologia.integradaneuropsicologia.workers.dev`.
  Endereços `*.workers.dev` respondem com `X-Robots-Tag: noindex`.
- Produção: `npm run deploy` roda os testes e publica a versão para todo o
  tráfego do Worker.
- Reverter: `npx wrangler deployments list` mostra as publicações e os IDs das
  versões; `npx wrangler rollback <version-id>` volta para uma versão anterior.

Durante a janela de retorno para o Sites, `.openai/hosting.json` e o plugin
`sites()` do `vite.config.ts` continuam no projeto sem alteração.

## Useful Commands

- `npm run dev`: start local development
- `npm run build`: verify the vinext build output
- `npm test`: build the starter and verify its rendered loading skeleton
- `npm run db:generate`: generate Drizzle migrations after schema changes

## Learn More

- [vinext Documentation](https://github.com/cloudflare/vinext)
- [Drizzle D1 Guide](https://orm.drizzle.team/docs/get-started/d1-new)
