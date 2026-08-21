import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const mentalExercises = [
  ["labirinto", "Labirinto", "rota eficiente"],
  ["caca-palavras", "Caça-Palavras", "varredura visual organizada"],
  ["torre-de-hanoi", "Torre de Hanói", "Transferir toda a torre"],
  ["resta-um", "Resta Um", "Remover peças por saltos válidos"],
  ["sequencia-inteligente", "Sequência Inteligente", "Inferir regras numéricas"],
  ["reflexo-fantasmas", "Reflexo Fantasmas", "inibir respostas diante de distratores"],
  ["torre-de-londres", "Torre de Londres", "Reproduzir um modelo-alvo"],
  ["quebra-cabeca-emoji", "Quebra-Cabeça Emoji", "tabuleiro deslizante numerado"],
  ["afirmou-bateu", "Afirmou, Bateu!", "palavra e direção visual"],
  ["memoria-mix", "Memória Mix", "identidade e a posição de cartas"],
  ["desafio-das-cores", "Desafio das Cores", "ignorar o significado automático"],
  ["emoji-alvo", "Emoji Alvo", "única figura idêntica"],
  ["intruso-das-palavras", "Intruso das Palavras", "categorias semânticas"],
  ["clique-no-momento-certo", "Clique no Momento Certo", "sem antecipar o clique"],
  ["caca-circulos", "Caça-Círculos", "círculos preenchidos"],
  ["sequencia-numerica", "Sequência Numérica", "série breve de dígitos"],
  ["busca-do-simbolo", "Busca do Símbolo", "símbolo-modelo"],
  ["ordem-das-acoes", "Ordem das Ações", "dependências entre ações"],
  ["palavra-emoji", "Palavra & Emoji", "representações visuais"],
];

const oldWixUrl = /https?:\/\/(?:www\.)?integradaneuropsicologia\.com\.br/i;

function normalizeHtml(html) {
  return html
    .replaceAll("&amp;", "&")
    .replaceAll("&quot;", '"')
    .replaceAll("&#x27;", "'")
    .replaceAll("&apos;", "'");
}

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
  assert.match(html, /Avaliação Neuropsicológica/);
  assert.match(html, /Psicoterapia/);
  assert.match(html, /Teste grátis/);
  assert.match(html, /Exercícios de estimulação mental/);
  assert.match(html, /href="\/exercicios-de-estimulacao-mental"/);
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
    ["/avaliacaotdah", "TDAH"],
    ["/avaliacaoautismo", "autismo"],
    ["/terapiaparaadultoscomautismo", "autismo"],
    ["/terapiaparaadultoscomtdah", "TDAH"],
    ["/terapiafasedavida", "adolescentes"],
  ];

  for (const [pathname, marker] of routes) {
    const response = await render(pathname);
    assert.equal(response.status, 200, pathname);
    assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i, pathname);
    const html = await response.text();
    assert.match(html, new RegExp(marker, "i"), pathname);
    assert.match(html, /logo-horizontal\.jpg/, pathname);
    assert.match(html, /wa\.me\/5541992113665/, pathname);
    assert.match(html, /Exercícios de estimulação mental/, pathname);
  }
});

test("describes the school-context analysis in the child assessment process", async () => {
  const response = await render("/avaliacaoinfantil");
  assert.equal(response.status, 200);

  const html = normalizeHtml(await response.text());
  assert.match(html, /professores e pedagogos da criança/i);
  assert.match(html, /compreender o contexto escolar/i);
  assert.match(html, /autorização da família/i);
});

test("serves original local pages for every screening and the blog", async () => {
  const screenings = [
    ["/testetdahadulto", 18, "comete erros por falta de atenção"],
    ["/teste-autismo-adulto", 30, "Minhas dificuldades sociais"],
    ["/teste-tdah-infantil", 26, "controlar suas emoções"],
    ["/teste-autismo-infantil", 25, "desenvolvimento social ou comunicativo"],
  ];

  for (const [pathname, questionCount, finalQuestionMarker] of screenings) {
    const response = await render(pathname);
    assert.equal(response.status, 200, pathname);
    assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i, pathname);
    const html = await response.text();
    assert.match(html, /Integrada Neuropsicologia/, pathname);
    assert.match(html, /Ver meu resultado/, pathname);
    assert.match(html, new RegExp(finalQuestionMarker, "i"), pathname);
    assert.equal(
      (html.match(/<fieldset\b[^>]*class="screening-question"/g) ?? []).length,
      questionCount,
      `${pathname} must render every base question`,
    );
    assert.doesNotMatch(html, /Auto-observação educativa|Sem pontuação diagnóstica|Nenhuma resposta é enviada/i, pathname);
    assert.doesNotMatch(html, /https?:\/\/(?:www\.)?integradaneuropsicologia\.com\.br/i, pathname);
  }

  const blogResponse = await render("/blog");
  assert.equal(blogResponse.status, 200);
  const blogHtml = await blogResponse.text();
  assert.match(blogHtml, /Integrada Neuropsicologia/);
  assert.doesNotMatch(blogHtml, /https?:\/\/(?:www\.)?integradaneuropsicologia\.com\.br/i);
});

test("keeps the base scoring thresholds and result WhatsApp action", async () => {
  const [screeningPage, scoring] = await Promise.all([
    readFile(new URL("../app/ScreeningPage.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/screeningScoring.ts", import.meta.url), "utf8"),
  ]);

  assert.match(screeningPage, /Saber mais sobre resultado/);
  assert.match(screeningPage, /Refazer teste/);
  assert.match(scoring, /inattentive >= 5 \|\| hyperactive >= 5/);
  assert.match(scoring, /counts\.inattentive >= 6 \|\| counts\.hyperactive >= 6 \|\| counts\.oppositional >= 6/);
  assert.match(scoring, /relevantIndicators >= 17 \|\| total >= 50/);
  assert.match(scoring, /relevantIndicators >= 14 \|\| total >= 42/);
  assert.match(scoring, /wa\.me|whatsappMessage/);
});

test("serves every mental exercise without an access gate", async () => {
  const response = await render("/exercicios-de-estimulacao-mental");
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /Exercícios de estimulação mental/);
  assert.match(html, /Torre de Hanói/);
  assert.match(html, /Caça-Palavras/);
  assert.match(html, /Emoji Alvo/);
  assert.match(html, /Palavra &amp; Emoji|Palavra & Emoji/);
  assert.ok((html.match(/Praticar agora/g) ?? []).length >= 19);
  assert.equal(
    (html.match(/<a\b[^>]*class="[^"]*\bexercise-card\b[^"]*"/g) ?? []).length,
    19,
  );

  const localExerciseHrefs = new Set(
    [...html.matchAll(/href="(\/exercicios-de-estimulacao-mental\/[^"#?]+)"/g)].map(
      (match) => match[1],
    ),
  );
  assert.equal(localExerciseHrefs.size, 19);
  for (const [slug] of mentalExercises) {
    assert.ok(
      localExerciseHrefs.has(`/exercicios-de-estimulacao-mental/${slug}`),
      `missing local exercise link for ${slug}`,
    );
  }

  const localExerciseImages = new Set(
    [...html.matchAll(/src="(\/exercises\/[^"?]+\.webp)"/g)].map((match) => match[1]),
  );
  assert.equal(localExerciseImages.size, 19);
  for (const [slug] of mentalExercises) {
    assert.ok(localExerciseImages.has(`/exercises/${slug}.webp`), `missing card image for ${slug}`);
  }

  assert.doesNotMatch(html, oldWixUrl);
  assert.doesNotMatch(html, /name="cpf"|cpfPaciente|SheetDB|data-access|prescrito|restrito/i);
});

test("server-renders all 19 exercise guides and isolated activity windows", async () => {
  for (const [slug, title, contentMarker] of mentalExercises) {
    const pathname = `/exercicios-de-estimulacao-mental/${slug}`;
    const response = await render(pathname);
    assert.equal(response.status, 200, pathname);
    assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i, pathname);

    const html = await response.text();
    const normalizedHtml = normalizeHtml(html);
    assert.ok(normalizedHtml.includes(title), `${pathname} must render its title`);
    assert.match(normalizedHtml, new RegExp(contentMarker, "i"), pathname);
    assert.match(html, new RegExp(`src="/exercises/${slug}\\.webp"`), pathname);
    assert.match(normalizedHtml, /Iniciar exercício/, pathname);
    assert.match(html, new RegExp(`href="${pathname}/atividade"`), pathname);
    assert.match(html, /target="_blank"/, pathname);
    assert.match(html, /rel="noopener noreferrer"/, pathname);
    assert.doesNotMatch(html, /exercise-play-shell/, pathname);
    assert.doesNotMatch(html, oldWixUrl, pathname);

    const activityPathname = `${pathname}/atividade`;
    const activityResponse = await render(activityPathname);
    assert.equal(activityResponse.status, 200, activityPathname);
    assert.match(activityResponse.headers.get("content-type") ?? "", /^text\/html\b/i, activityPathname);

    const activityHtml = normalizeHtml(await activityResponse.text());
    assert.ok(activityHtml.includes(title), `${activityPathname} must render its title`);
    assert.match(activityHtml, /exercise-window-page/, activityPathname);
    assert.match(activityHtml, /exercise-play-shell is-standalone/, activityPathname);
    assert.match(activityHtml, /Voltar às instruções/, activityPathname);
    assert.doesNotMatch(activityHtml, oldWixUrl, activityPathname);
  }
});

test("ships all 19 optimized exercise card images", async () => {
  assert.equal(mentalExercises.length, 19);
  await Promise.all(
    mentalExercises.map(([slug]) =>
      access(new URL(`../public/exercises/${slug}.webp`, import.meta.url)),
    ),
  );
});

test("ships production metadata, local imagery, and responsive styles", async () => {
  const [layout, page, siteHeader, exercisePage, css, packageJson] = await Promise.all([
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/SiteHeader.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/exercicios-de-estimulacao-mental/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
  ]);

  assert.match(layout, /metadataBase/);
  assert.match(layout, /\/og\.png/);
  assert.match(layout, /lang="pt-BR"/);
  assert.match(page, /\/hero\.png/);
  assert.match(page, /ContactForm/);
  assert.match(siteHeader, /Exercícios de estimulação mental/);
  assert.match(siteHeader, /["']use client["']/);
  assert.match(siteHeader, /pointerdown/);
  assert.match(siteHeader, /Escape/);
  assert.match(siteHeader, /openMenu/);
  assert.doesNotMatch(siteHeader, /<details/);
  assert.doesNotMatch(siteHeader, /https?:\/\/(?:www\.)?integradaneuropsicologia\.com\.br/i);
  for (const href of [
    "/avaliacaotdah",
    "/avaliacaoautismo",
    "/terapiaparaadultoscomautismo",
    "/terapiaparaadultoscomtdah",
    "/terapiafasedavida",
    "/testetdahadulto",
    "/teste-autismo-adulto",
    "/teste-tdah-infantil",
    "/teste-autismo-infantil",
    "/blog",
  ]) {
    assert.match(siteHeader, new RegExp(`href: ["']${href}["']`));
  }
  assert.doesNotMatch(`${siteHeader}\n${exercisePage}`, /cpfPaciente|SheetDB|data-access|prescrito|restrito/i);
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
