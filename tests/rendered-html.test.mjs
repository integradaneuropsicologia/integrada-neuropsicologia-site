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

async function requestAbsolute(url) {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-absolute`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(url, { headers: { accept: "text/html" } }),
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
  assert.match(html, /<title>Avaliação Neuropsicológica \| Integrada Neuropsicologia<\/title>/i);
  assert.match(html, /Entender abre/);
  assert.match(html, /Mais de 15 anos/);
  assert.match(html, /Cuidado em cada etapa da vida/);
  assert.match(html, /Como funciona/);
  assert.match(html, /Dúvidas frequentes/);
  assert.match(html, /Avaliação Neuropsicológica/);
  assert.match(html, /Psicoterapia/);
  assert.match(html, /Rastreamentos informativos/);
  assert.match(html, /Exercícios de estimulação mental/);
  assert.match(html, /href="\/exercicios-de-estimulacao-mental"/);
  assert.match(html, /wa\.me\/5541992113665/);
  assert.match(html, /name="interest"/);
  assert.match(html, /src="\/logo-horizontal\.jpg"/);
  for (const href of [
    "/avaliacaoinfantil",
    "/avaliacaoneuropsicologicaadulto",
    "/avaliacaoneuropsicologicaidoso",
    "/avaliacao-neuropsicologica-online-adultos",
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
    ["/avaliacao-neuropsicologica-online-adultos", "Avaliação neuropsicológica on-line para adultos"],
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

test("renders the revised adult psychotherapy content", async () => {
  const response = await render("/terapiaparaadultos");
  assert.equal(response.status, 200);

  const html = normalizeHtml(await response.text());
  assert.match(html, /Veja quando a psicoterapia pode ser indicada/i);
  assert.match(html, /Acompanhamento<\/span><strong>Periodicidade definida em conjunto/i);
  assert.match(html, /Formato<\/span><strong>On-line/i);
  assert.match(html, /Abordagem<\/span><strong>Terapia cognitivo-comportamental/i);
  assert.match(html, /Reflexões, exercícios e estratégias que podem ser aplicados entre os encontros/i);
  assert.match(html, /Este serviço não se destina ao atendimento de situações de urgência ou emergência/i);
  assert.match(html, /a psicóloga responsável analisa a adequação do serviço à demanda apresentada/i);
  assert.match(html, /Responsável técnica: Carla Luciana da Conceição Lima — Psicóloga — CRP 08\/39739/i);
  assert.doesNotMatch(html, /Periodicidade combinada/i);
  assert.doesNotMatch(html, /Plano terapêutico individual/i);
  assert.doesNotMatch(html, /experimentos e ferramentas/i);
});

test("renders the revised psychotherapy content for autistic adults", async () => {
  const response = await render("/terapiaparaadultoscomautismo");
  assert.equal(response.status, 200);

  const html = normalizeHtml(await response.text());
  assert.match(html, /Veja quando a psicoterapia pode ser indicada/i);
  assert.match(html, /Acompanhamento<\/span><strong>Periodicidade definida em conjunto/i);
  assert.match(html, /Formato<\/span><strong>On-line/i);
  assert.match(html, /Abordagem<\/span><strong>TCC individualizada/i);
  assert.match(html, /não tem como objetivo normalizar comportamentos nem oferece garantia/i);
  assert.match(html, /Este serviço não se destina ao atendimento de situações de urgência ou emergência/i);
  assert.match(html, /a psicóloga responsável analisa a adequação do serviço à demanda apresentada/i);
  assert.match(html, /Responsável técnica: Carla Luciana da Conceição Lima — Psicóloga — CRP 08\/39739/i);
  assert.doesNotMatch(html, /Periodicidade combinada/i);
  assert.doesNotMatch(html, /Quando houver demanda médica/i);
});

test("renders the revised psychotherapy content for adults with ADHD", async () => {
  const response = await render("/terapiaparaadultoscomtdah");
  assert.equal(response.status, 200);

  const html = normalizeHtml(await response.text());
  assert.match(html, /Veja quando a psicoterapia pode ser indicada/i);
  assert.match(html, /Acompanhamento<\/span><strong>Periodicidade definida em conjunto/i);
  assert.match(html, /Formato<\/span><strong>On-line/i);
  assert.match(html, /Abordagem<\/span><strong>TCC individualizada/i);
  assert.match(html, /comunicação de necessidades e manejo da autocrítica/i);
  assert.match(html, /obstáculos, oscilações e retomadas/i);
  assert.match(html, /não oferece garantia de resultados específicos/i);
  assert.match(html, /Este serviço não se destina ao atendimento de situações de urgência ou emergência/i);
  assert.match(html, /a psicóloga responsável analisa a adequação do serviço à demanda apresentada/i);
  assert.match(html, /Responsável técnica: Carla Luciana da Conceição Lima — Psicóloga — CRP 08\/39739/i);
  assert.doesNotMatch(html, /Periodicidade combinada/i);
  assert.doesNotMatch(html, /reparação da autocrítica/i);
  assert.doesNotMatch(html, /obstáculos e recaídas/i);
});

test("renders the revised psychotherapy content for young people and adolescents", async () => {
  const response = await render("/terapiafasedavida");
  assert.equal(response.status, 200);

  const html = normalizeHtml(await response.text());
  assert.match(html, /Veja quando a psicoterapia pode ser indicada/i);
  assert.match(html, /Acompanhamento<\/span><strong>Periodicidade definida em conjunto/i);
  assert.match(html, /Formato<\/span><strong>Definido na conversa inicial/i);
  assert.match(html, /Abordagem<\/span><strong>TCC individualizada/i);
  assert.match(html, /A participação dos responsáveis é definida conforme a idade/i);
  assert.match(html, /preservando o sigilo e os princípios éticos aplicáveis/i);
  assert.match(html, /sigilo, seus limites, participação dos responsáveis/i);
  assert.match(html, /Este serviço não se destina ao atendimento de situações de urgência ou emergência/i);
  assert.match(html, /os limites do sigilo são conduzidos conforme critérios técnicos e éticos/i);
  assert.match(html, /Buscar apoio pode ajudar a atravessar esta fase com mais recursos/i);
  assert.match(html, /a psicóloga responsável analisa a adequação do serviço à demanda apresentada/i);
  assert.match(html, /Responsável técnica: Carla Luciana da Conceição Lima — Psicóloga — CRP 08\/39739/i);
  assert.doesNotMatch(html, /Periodicidade combinada/i);
  assert.doesNotMatch(html, /privacidade, participação familiar/i);
  assert.doesNotMatch(html, /pode transformar a forma de atravessar/i);
});

test("describes the school-context analysis in the child assessment process", async () => {
  const response = await render("/avaliacaoinfantil");
  assert.equal(response.status, 200);

  const html = normalizeHtml(await response.text());
  assert.match(html, /Atendimentos presenciais em Curitiba e on-line em todo o Brasil, conforme o serviço/i);
  assert.match(html, /Rastreamentos informativos/i);
  assert.match(html, /Veja quando a avaliação pode ser indicada/i);
  assert.match(html, /Processo<\/span><strong>Média de 10 sessões/i);
  assert.match(html, /Formato<\/span><strong>Presencial em Curitiba/i);
  assert.match(html, /Entrega<\/span><strong>Devolutiva e laudo psicológico/i);
  assert.match(html, /altas habilidades\/superdotação/i);
  assert.match(html, /A avaliação é organizada em 10 encontros/i);
  assert.match(html, /Definição dos procedimentos e instrumentos adequados à idade/i);
  assert.match(html, /mediante autorização dos responsáveis legais/i);
  assert.match(html, /observância do sigilo profissional/i);
  assert.match(html, /Devolutiva e laudo psicológico/i);
  assert.match(html, /funcionamento cognitivo, emocional e comportamental/i);
  assert.match(html, /contextos familiar, escolar e social/i);
  assert.match(html, /a psicóloga responsável analisa se a avaliação é indicada/i);
  assert.match(html, /Responsável técnica: Carla Luciana da Conceição Lima — Psicóloga — CRP 08\/39739/i);
  assert.doesNotMatch(html, /Planejamento individual/i);
  assert.doesNotMatch(html, /professores e pedagogos da criança/i);
});

test("renders the revised adult assessment content", async () => {
  const response = await render("/avaliacaoneuropsicologicaadulto");
  assert.equal(response.status, 200);

  const html = normalizeHtml(await response.text());
  assert.match(html, /Atendimentos presenciais em Curitiba e on-line em todo o Brasil, conforme o serviço/i);
  assert.match(html, /Rastreamentos informativos/i);
  assert.match(html, /Veja quando a avaliação pode ser indicada/i);
  assert.match(html, /Processo<\/span><strong>8 encontros/i);
  assert.match(html, /Presencial, on-line ou híbrido, conforme indicação técnica/i);
  assert.match(html, /Entrega<\/span><strong>Devolutiva e laudo psicológico/i);
  assert.match(html, /o quanto isso interfere no dia a dia/i);
  assert.match(html, /sem resumir sua história a um diagnóstico/i);
  assert.match(html, /alterações de humor/i);
  assert.match(html, /manifestações semelhantes/i);
  assert.match(html, /A avaliação é organizada em 8 encontros/i);
  assert.match(html, /procedimentos, instrumentos e fontes de informação adequados/i);
  assert.match(html, /tarefas selecionados conforme os objetivos da avaliação/i);
  assert.match(html, /mediante autorização da pessoa avaliada/i);
  assert.match(html, /pessoas próximas ou de outros profissionais/i);
  assert.match(html, /Devolutiva e laudo psicológico/i);
  assert.match(html, /funcionamento cognitivo, emocional e comportamental da pessoa/i);
  assert.match(html, /a psicóloga responsável analisa se a avaliação é indicada/i);
  assert.match(html, /Responsável técnica: Carla Luciana da Conceição Lima — Psicóloga — CRP 08\/39739/i);
  assert.doesNotMatch(html, /Planejamento individual/i);
  assert.doesNotMatch(html, /incorporando outros olhares à investigação/i);
});

test("renders the revised older-adult assessment content", async () => {
  const response = await render("/avaliacaoneuropsicologicaidoso");
  assert.equal(response.status, 200);

  const html = normalizeHtml(await response.text());
  assert.match(html, /Avaliação neuropsicológica para pessoas idosas/i);
  assert.match(html, /condições de saúde, aspectos emocionais e atividades do dia a dia/i);
  assert.match(html, /quando pertinente e autorizado, à família e à rede de cuidado/i);
  assert.match(html, /Veja quando a avaliação pode ser indicada/i);
  assert.match(html, /Processo<\/span><strong>8 encontros/i);
  assert.match(html, /Formato<\/span><strong>Presencial em Curitiba/i);
  assert.match(html, /Entrega<\/span><strong>Devolutiva e laudo psicológico/i);
  assert.match(html, /A avaliação é organizada em 8 encontros/i);
  assert.match(html, /necessidades de acessibilidade e os objetivos da avaliação/i);
  assert.match(html, /mediante consentimento da pessoa avaliada ou de seu responsável legal/i);
  assert.match(html, /procedimentos e instrumentos adequados ao histórico/i);
  assert.match(html, /informações sobre autonomia, segurança e atividades da vida diária/i);
  assert.match(html, /Devolutiva e laudo psicológico/i);
  assert.match(html, /das hipóteses consideradas, dos limites da avaliação/i);
  assert.match(html, /funcionamento cognitivo, emocional e funcional da pessoa idosa/i);
  assert.match(html, /respeitando a autonomia da pessoa avaliada/i);
  assert.match(html, /psicóloga responsável analisa se a avaliação é indicada/i);
  assert.match(html, /Responsável técnica: Carla Luciana da Conceição Lima — Psicóloga — CRP 08\/39739/i);
  assert.doesNotMatch(html, /Planejamento individual/i);
  assert.doesNotMatch(html, /Laudo e orientação familiar/i);
});

test("renders the revised autism assessment content and general image", async () => {
  await access(new URL("../public/avaliacao-tea-geral.webp", import.meta.url));
  const response = await render("/avaliacaoautismo");
  assert.equal(response.status, 200);

  const html = normalizeHtml(await response.text());
  assert.match(html, /Avaliação neuropsicológica para investigação de TEA \(autismo\)/i);
  assert.match(html, /Veja quando a avaliação pode ser indicada/i);
  assert.match(html, /Processo<\/span><strong>8 encontros/i);
  assert.match(html, /Presencial para crianças e adolescentes; presencial ou on-line para adultos, após análise de adequação/i);
  assert.match(html, /Entrega<\/span><strong>Devolutiva e laudo psicológico/i);
  assert.match(html, /A avaliação é organizada em 8 encontros/i);
  assert.match(html, /necessidades de acessibilidade e os objetivos da avaliação/i);
  assert.match(html, /mediante autorização da pessoa avaliada ou de seus responsáveis legais/i);
  assert.match(html, /informações de familiares, da escola ou de outros profissionais/i);
  assert.match(html, /Devolutiva e laudo psicológico/i);
  assert.match(html, /das hipóteses consideradas, dos limites da avaliação/i);
  assert.match(html, /funcionamento cognitivo, emocional, comportamental, social e sensorial/i);
  assert.match(html, /análise da hipótese de TEA/i);
  assert.match(html, /necessidades de apoio identificadas/i);
  assert.match(html, /psicóloga responsável analisa se a avaliação é indicada/i);
  assert.match(html, /qual modalidade é adequada/i);
  assert.match(html, /Responsável técnica: Carla Luciana da Conceição Lima — Psicóloga — CRP 08\/39739/i);
  assert.match(html, /src="\/avaliacao-tea-geral\.webp"/i);
  assert.match(html, /alt="Pessoas de diferentes idades em conversa com uma psicóloga"/i);
  assert.doesNotMatch(html, /src="\/infantojuvenil\.webp"/i);
  assert.doesNotMatch(html, /Planejamento por faixa etária/i);
});

test("renders the revised ADHD assessment content", async () => {
  const response = await render("/avaliacaotdah");
  assert.equal(response.status, 200);

  const html = normalizeHtml(await response.text());
  assert.match(html, /Avaliação neuropsicológica para investigação de TDAH/i);
  assert.match(html, /Veja quando a avaliação pode ser indicada/i);
  assert.match(html, /Processo<\/span><strong>8 encontros/i);
  assert.match(html, /Presencial; on-line para adultos, após análise de adequação/i);
  assert.match(html, /Entrega<\/span><strong>Devolutiva e laudo psicológico/i);
  assert.match(html, /As hipóteses são analisadas a partir de diferentes fontes de informação/i);
  assert.match(html, /A avaliação é organizada em 8 encontros/i);
  assert.match(html, /procedimentos, instrumentos e fontes complementares de informação/i);
  assert.match(html, /tarefas selecionados conforme a idade, a demanda e os objetivos/i);
  assert.match(html, /funcionamento da pessoa em diferentes contextos/i);
  assert.match(html, /Devolutiva e laudo psicológico/i);
  assert.match(html, /das hipóteses consideradas, dos limites da avaliação/i);
  assert.match(html, /análise da hipótese de TDAH/i);
  assert.match(html, /outras condições que apresentem manifestações semelhantes/i);
  assert.match(html, /psicóloga responsável analisa se a avaliação é indicada/i);
  assert.match(html, /qual modalidade é adequada/i);
  assert.match(html, /Responsável técnica: Carla Luciana da Conceição Lima — Psicóloga — CRP 08\/39739/i);
  assert.doesNotMatch(html, /Planejamento individual<\/strong>/i);
  assert.doesNotMatch(html, /\*A viabilidade on-line depende de triagem prévia/i);
});

test("combines the adult clinical process with the online format", async () => {
  const response = await render("/avaliacao-neuropsicologica-online-adultos");
  assert.equal(response.status, 200);

  const html = normalizeHtml(await response.text());
  assert.match(html, /funcionamento cognitivo, emocional e funcional de adultos/i);
  assert.match(html, /indicação técnica e condições adequadas de participação/i);
  assert.match(html, /Veja quando pode ser indicada/i);
  assert.match(html, /Processo<\/span><strong>8 encontros/i);
  assert.match(html, /On-line, após análise de adequação/i);
  assert.match(html, /Devolutiva e laudo psicológico digital/i);
  assert.match(html, /alterações de humor/i);
  assert.match(html, /manifestações semelhantes/i);
  assert.match(html, /procedimentos são definidos conforme a demanda e as condições do atendimento remoto/i);
  assert.match(html, /A avaliação é organizada em 8 encontros/i);
  assert.match(html, /procedimentos e instrumentos compatíveis com aplicação remota/i);
  assert.match(html, /Entrevista clínica por vídeo/i);
  assert.match(html, /Definição do plano e orientação técnica/i);
  assert.match(html, /instrumentos e fontes de informação adequados à demanda e à modalidade/i);
  assert.match(html, /ambiente reservado/i);
  assert.match(html, /Integração clínica/i);
  assert.match(html, /quando pertinente e autorizado/i);
  assert.match(html, /pessoas próximas ou de outros profissionais/i);
  assert.match(html, /limites da avaliação e das recomendações/i);
  assert.match(html, /funcionamento cognitivo, emocional e comportamental da pessoa/i);
  assert.match(html, /modalidade presencial ou outro encaminhamento/i);
  assert.match(html, /Verifique se a modalidade on-line é adequada para a sua necessidade/i);
  assert.match(html, /psicóloga responsável analisa a adequação da modalidade/i);
  assert.match(html, /Responsável técnica: Carla Luciana da Conceição Lima — Psicóloga — CRP 08\/39739/i);
  assert.doesNotMatch(html, /Planejamento individual/i);
  assert.doesNotMatch(html, /incorporando outros olhares à investigação/i);
  assert.doesNotMatch(html, /Antes de iniciar, a equipe verifica/i);
  assert.doesNotMatch(html, /Quando o formato não for indicado/i);
  assert.doesNotMatch(html, /Nem toda demanda pode ser avaliada integralmente on-line/i);
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
  }

  const blogResponse = await render("/blog");
  assert.equal(blogResponse.status, 200);
  const blogHtml = await blogResponse.text();
  assert.match(blogHtml, /Integrada Neuropsicologia/);
  assert.match(blogHtml, /href="\/post\//i);
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

    const activityPathname = `${pathname}/atividade`;
    const activityResponse = await render(activityPathname);
    assert.equal(activityResponse.status, 200, activityPathname);
    assert.match(activityResponse.headers.get("content-type") ?? "", /^text\/html\b/i, activityPathname);

    const activityHtml = normalizeHtml(await activityResponse.text());
    assert.ok(activityHtml.includes(title), `${activityPathname} must render its title`);
    assert.match(activityHtml, /exercise-window-page/, activityPathname);
    assert.match(activityHtml, /exercise-play-shell is-standalone/, activityPathname);
    assert.match(activityHtml, /Voltar às instruções/, activityPathname);
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
  assert.match(layout, /\/og\.webp/);
  assert.match(layout, /lang="pt-BR"/);
  assert.match(page, /\/hero\.webp/);
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
    "hero.webp",
    "infantojuvenil.webp",
    "adulto.webp",
    "idoso.webp",
    "online.webp",
    "terapia.webp",
    "og.webp",
    "avaliacao-tea-geral.webp",
    "icon-192.png",
    "icon-512.png",
    "logo-horizontal.jpg",
    "logo-icon.jpg",
  ].map((file) => access(new URL(`../public/${file}`, import.meta.url))));
});

test("serves canonical SEO metadata, sitemap, robots and a real 404", async () => {
  const coreRoutes = [
    "/",
    "/avaliacao-neuropsicologica-online-adultos",
    "/avaliacaoinfantil",
    "/avaliacaoneuropsicologicaadulto",
    "/avaliacaoneuropsicologicaidoso",
    "/avaliacaotdah",
    "/avaliacaoautismo",
    "/sobre",
    "/carla-luciana-conceicao-lima",
    "/blog",
  ];

  for (const pathname of coreRoutes) {
    const response = await render(pathname);
    assert.equal(response.status, 200, pathname);
    const html = await response.text();
    const canonical = `https://www.integradaneuropsicologia.com.br${pathname === "/" ? "/" : pathname}`;
    assert.match(html, new RegExp(`<link rel="canonical" href="${canonical.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}"`), pathname);
    assert.match(html, /<meta property="og:url" content="https:\/\/www\.integradaneuropsicologia\.com\.br\//, pathname);
    assert.equal((html.match(/<h1\b/g) ?? []).length, 1, `${pathname} must have exactly one H1`);
    assert.doesNotMatch(html, /content="noindex/i, pathname);
  }

  const sitemapResponse = await render("/sitemap.xml");
  assert.equal(sitemapResponse.status, 200);
  const sitemap = await sitemapResponse.text();
  assert.match(sitemap, /https:\/\/www\.integradaneuropsicologia\.com\.br\/avaliacao-neuropsicologica-online-adultos/);
  assert.match(sitemap, /https:\/\/www\.integradaneuropsicologia\.com\.br\/post\/tdah-ansiedade-ou-burnout/);
  assert.doesNotMatch(sitemap, /\/avaliacaoonline<\/loc>/);
  assert.doesNotMatch(sitemap, /\/atividade<\/loc>/);
  assert.doesNotMatch(sitemap, /politica-de-privacidade/);

  const robotsResponse = await render("/robots.txt");
  assert.equal(robotsResponse.status, 200);
  const robots = await robotsResponse.text();
  assert.match(robots, /User-Agent:\s*\*/i);
  assert.match(robots, /Sitemap:\s*https:\/\/www\.integradaneuropsicologia\.com\.br\/sitemap\.xml/i);

  const missingResponse = await render("/pagina-que-nao-existe-para-teste");
  assert.equal(missingResponse.status, 404);
  assert.match(await missingResponse.text(), /Página não encontrada/i);
});

test("keeps legacy content URLs and applies one-hop permanent redirects", async () => {
  const legacyArticles = [
    "/post/tdah-ansiedade-ou-burnout-como-diferenciar-em-adultos",
    "/post/quanto-custa-uma-avaliação-neuropsicológica",
    "/post/não-é-só-inteligência-o-que-você-precisa-saber-sobre-altas-habilidades-superdotação",
    "/post/como-é-feito-o-diagnóstico-de-tdah-em-crianças-uma-abordagem-multidisciplinar",
    "/post/avaliação-neuropsicológica-x-avaliação-neurológica-qual-é-a-diferença",
    "/post/sinal-da-necessidade-de-avaliação-neuropsicológica",
  ];

  for (const pathname of legacyArticles) {
    const response = await render(pathname);
    assert.equal(response.status, 200, pathname);
    assert.match(await response.text(), /"@type":"Article"/, pathname);
  }

  const redirects = [
    ["/avaliacaoonline?origem=legado", "https://www.integradaneuropsicologia.com.br/avaliacao-neuropsicologica-online-adultos?origem=legado"],
    ["/jogodolabirinto", "https://www.integradaneuropsicologia.com.br/exercicios-de-estimulacao-mental/labirinto"],
    ["/jogosdeestimula%C3%A7%C3%A3omental", "https://www.integradaneuropsicologia.com.br/exercicios-de-estimulacao-mental"],
    ["/blank-5", "https://www.integradaneuropsicologia.com.br/teste-autismo-infantil"],
  ];

  for (const [source, destination] of redirects) {
    const response = await render(source);
    assert.equal(response.status, 301, source);
    assert.equal(response.headers.get("location"), destination, source);
  }

  const apexResponse = await requestAbsolute("http://integradaneuropsicologia.com.br/avaliacaotdah?ref=apex");
  assert.equal(apexResponse.status, 301);
  assert.equal(apexResponse.headers.get("location"), "https://www.integradaneuropsicologia.com.br/avaliacaotdah?ref=apex");

  const previewResponse = await requestAbsolute("https://integrada-neuropsicologia-site.elieltonlimacosta.chatgpt.site/blog");
  assert.equal(previewResponse.status, 301);
  assert.equal(previewResponse.headers.get("location"), "https://www.integradaneuropsicologia.com.br/blog");
});
