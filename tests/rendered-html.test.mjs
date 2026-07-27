import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);

async function render(pathname = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(new URL(pathname, "http://localhost").href, { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("server-renders the Integrada homepage", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<html[^>]*lang="pt-BR"/i);
  assert.match(html, /<title>Integrada Neuropsicologia \| Avaliação neuropsicológica<\/title>/i);
  assert.match(html, /Entender abre/);
  assert.match(html, /Mais de 15 anos/);
  assert.match(html, /Cuidado em cada etapa da vida/);
  assert.match(html, /Como funciona/);
  assert.match(html, /Dúvidas frequentes/);
  assert.match(html, /wa\.me\/5541992113665/);
  assert.match(html, /name="interest"/);
  assert.match(html, /src="\/logo-horizontal\.jpg"/);
  for (const href of [
    "/avaliacaoinfantil",
    "/avaliacaoneuropsicologicaadulto",
    "/avaliacaoneuropsicologicaidoso",
    "/avaliacaoonline",
    "/terapiaparaadultos",
  ]) {
    assert.match(html, new RegExp(`href="${href}"`));
  }
  assert.ok((html.match(/Saber mais/g) ?? []).length >= 5);
  assert.doesNotMatch(html, /codex-preview|SkeletonPreview|react-loading-skeleton/i);
});

test("server-renders every service detail route", async () => {
  const routes = [
    ["/avaliacaoinfantil", "Compreender o desenvolvimento"],
    ["/avaliacaoneuropsicologicaadulto", "Clareza para compreender"],
    ["/avaliacaoneuropsicologicaidoso", "Compreender as mudanças"],
    ["/avaliacaoonline", "Cuidado e rigor técnico"],
    ["/terapiaparaadultos", "Acolhimento, objetivos claros"],
  ];

  for (const [pathname, marker] of routes) {
    const response = await render(pathname);
    assert.equal(response.status, 200, pathname);
    assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i, pathname);
    const html = await response.text();
    assert.match(html, new RegExp(marker), pathname);
    assert.match(html, /logo-horizontal\.jpg/, pathname);
    assert.match(html, /wa\.me\/5541992113665/, pathname);
  }
});

test("ships production metadata, local imagery, and responsive styles", async () => {
  const [layout, page, css, packageJson] = await Promise.all([
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
  ]);

  assert.match(layout, /metadataBase/);
  assert.match(layout, /\/og\.png/);
  assert.match(layout, /lang="pt-BR"/);
  assert.match(page, /\/hero\.png/);
  assert.match(page, /ContactForm/);
  assert.match(css, /@media \(max-width: 760px\)/);
  assert.match(css, /prefers-reduced-motion/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);

  await Promise.all([
    "hero.png",
    "infantojuvenil.png",
    "adulto.png",
    "idoso.png",
    "online.png",
    "terapia.png",
    "og.png",
    "logo-horizontal.jpg",
    "logo-icon.jpg",
  ].map((file) => access(new URL(`../public/${file}`, import.meta.url))));
});
