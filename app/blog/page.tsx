import type { Metadata } from "next";
import Link from "next/link";
import { InformationalFooter } from "../InformationalFooter";
import { SiteHeader } from "../SiteHeader";

export const metadata: Metadata = {
  title: "Conteúdos sobre Neuropsicologia | Integrada Neuropsicologia",
  description:
    "Informações claras sobre avaliação neuropsicológica, atenção, memória, devolutiva e estimulação mental para diferentes fases da vida.",
};

const articles = [
  {
    id: "quando-avaliar",
    eyebrow: "Avaliação neuropsicológica",
    title: "Quando vale a pena procurar uma avaliação neuropsicológica?",
    introduction:
      "A avaliação pode ser útil quando mudanças ou dificuldades cognitivas, emocionais ou comportamentais começam a interferir na rotina. O objetivo não é procurar um rótulo, mas compreender o funcionamento da pessoa e orientar decisões de cuidado.",
    points: [
      "Dificuldades persistentes de atenção, memória, organização, aprendizagem ou tomada de decisões.",
      "Mudanças percebidas pela própria pessoa, família, escola ou equipe de saúde.",
      "Dúvidas diagnósticas que exigem integrar história, comportamento e desempenho em tarefas padronizadas.",
      "Necessidade de planejar apoios, adaptações, tratamento ou acompanhamento ao longo do tempo.",
    ],
    closing:
      "A primeira conversa ajuda a verificar se a avaliação é indicada, qual pergunta precisa ser respondida e que formato combina com a demanda.",
    href: "/#atendimentos",
    linkLabel: "Conhecer as modalidades de avaliação",
  },
  {
    id: "atencao-memoria-rotina",
    eyebrow: "Vida cotidiana",
    title: "Atenção e memória não funcionam separadas da rotina.",
    introduction:
      "Esquecimentos e distrações nem sempre significam um transtorno. Sono, estresse, ansiedade, sobrecarga, dor, medicamentos e excesso de estímulos podem modificar o desempenho cognitivo de forma importante.",
    points: [
      "Antes de concluir, observe quando a dificuldade começou e em quais situações ela aumenta ou diminui.",
      "Reduza a quantidade de tarefas simultâneas e deixe pistas visuais para compromissos importantes.",
      "Faça pausas reais: alternar rapidamente entre telas nem sempre permite recuperação da atenção.",
      "Procure orientação quando a mudança é nova, progressiva, intensa ou traz risco e perda de autonomia.",
    ],
    closing:
      "Estratégias de rotina podem ajudar, mas não substituem investigação quando há impacto relevante ou mudança em relação ao funcionamento habitual.",
    href: "/exercicios-de-estimulacao-mental",
    linkLabel: "Acessar exercícios de estimulação mental",
  },
  {
    id: "devolutiva",
    eyebrow: "Etapas do processo",
    title: "A devolutiva transforma dados em orientações compreensíveis.",
    introduction:
      "Depois das entrevistas, observações e tarefas, os resultados precisam ser integrados à história e ao contexto. A devolutiva é o momento de explicar o que foi compreendido, acolher dúvidas e discutir recomendações possíveis.",
    points: [
      "Os resultados são apresentados em linguagem clara, incluindo habilidades preservadas e pontos que merecem apoio.",
      "Uma medida isolada não deve ser interpretada fora do conjunto de informações reunidas.",
      "As recomendações podem envolver rotina, escola, trabalho, psicoterapia, reabilitação ou avaliação de outros profissionais.",
      "O laudo registra o processo, mas a conversa de devolutiva é essencial para que as conclusões tenham utilidade prática.",
    ],
    closing:
      "Perguntar, pedir exemplos e conversar sobre prioridades ajuda a transformar a avaliação em um plano de cuidado aplicável à realidade.",
    href: "/avaliacaoonline",
    linkLabel: "Entender como funciona a avaliação on-line",
  },
  {
    id: "estimulacao-mental",
    eyebrow: "Cuidado contínuo",
    title: "Estimulação mental funciona melhor quando faz sentido para a pessoa.",
    introduction:
      "Atividades cognitivas podem ser uma forma leve de variar desafios e manter curiosidade, mas saúde cerebral não depende de um exercício isolado. Movimento, sono, vínculos, alimentação, lazer e cuidado clínico também fazem parte do conjunto.",
    points: [
      "Escolha tarefas com dificuldade possível: nem automáticas demais, nem frustrantes a ponto de impedir continuidade.",
      "Varie entre linguagem, atenção, raciocínio, memória, planejamento e atividades manuais ou sociais.",
      "Priorize regularidade e interesse pessoal em vez de longas sessões ocasionais.",
      "Exercícios recreativos não medem capacidade cognitiva, não previnem sozinhos doenças e não substituem tratamento.",
    ],
    closing:
      "Uma prática prazerosa e conectada à vida cotidiana tende a ser mais sustentável do que perseguir pontuações ou comparações.",
    href: "/exercicios-de-estimulacao-mental",
    linkLabel: "Escolher uma atividade",
  },
];

export default function BlogPage() {
  return (
    <main className="detail-page">
      <SiteHeader />

      <section className="detail-hero">
        <div className="detail-container detail-hero-grid">
          <div className="detail-hero-copy">
            <Link className="detail-back-link" href="/">← Voltar ao início</Link>
            <p className="detail-eyebrow">Conteúdo Integrada</p>
            <h1>Informação clara para decisões de cuidado mais conscientes.</h1>
            <p className="detail-hero-lead">
              Leituras próprias sobre neuropsicologia, saúde cognitiva e acompanhamento profissional — com linguagem
              acessível e sem promessas simplistas.
            </p>
            <div className="detail-hero-actions">
              <a className="detail-button" href="#artigos">Explorar conteúdos</a>
              <Link className="detail-text-link" href="/#contato">
                Falar com a equipe <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
          <div className="detail-hero-media">
            <img
              src="/hero.png"
              alt="Profissional em ambiente acolhedor de atendimento"
              width="700"
              height="700"
              fetchPriority="high"
            />
          </div>
        </div>
      </section>

      <section className="detail-section detail-scope" id="artigos">
        <div className="detail-container">
          <div className="detail-section-heading detail-section-heading-centered">
            <p className="detail-eyebrow">Para começar</p>
            <h2>Escolha um tema para ler no seu ritmo.</h2>
            <p>Todos os links abaixo levam a conteúdos desta página e a serviços do novo site.</p>
          </div>
          <div className="detail-topic-grid">
            {articles.map((article, index) => (
              <article className="detail-topic-card" key={article.id}>
                <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                <h3><a href={`#${article.id}`}>{article.title}</a></h3>
                <p>{article.introduction}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {articles.map((article, index) => (
        <article
          className={`detail-section${index % 2 === 1 ? " detail-scope" : ""}`}
          id={article.id}
          key={article.id}
        >
          <div className="detail-container detail-two-columns">
            <div className="detail-section-heading">
              <p className="detail-eyebrow">{article.eyebrow}</p>
              <h2>{article.title}</h2>
              <p>{article.introduction}</p>
              <p>{article.closing}</p>
              <p><a className="detail-text-link" href={article.href}>{article.linkLabel} →</a></p>
            </div>
            <ul className="detail-check-list">
              {article.points.map((point) => (
                <li key={point}>
                  <span aria-hidden="true">✓</span>
                  <p>{point}</p>
                </li>
              ))}
            </ul>
          </div>
        </article>
      ))}

      <aside className="detail-disclaimer">
        <div className="detail-container">
          <strong>Sobre estes conteúdos</strong>
          <p>
            Os textos têm finalidade educativa e não substituem consulta, avaliação, diagnóstico ou tratamento.
            Recomendações individuais dependem da história, do contexto e das necessidades de cada pessoa.
          </p>
        </div>
      </aside>

      <section className="detail-final-cta">
        <div className="detail-container detail-final-cta-inner">
          <div>
            <p className="detail-eyebrow">Ainda tem dúvidas?</p>
            <h2>Uma conversa pode ajudar a encontrar o próximo passo.</h2>
            <p>Conheça os atendimentos ou envie sua dúvida para a equipe da Integrada Neuropsicologia.</p>
          </div>
          <Link className="detail-button detail-button-light" href="/#contato">Entrar em contato</Link>
        </div>
      </section>

      <InformationalFooter />
    </main>
  );
}
