import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "../SiteHeader";

export const metadata: Metadata = {
  title: "Exercícios de Estimulação Mental | Integrada Neuropsicologia",
  description:
    "Exercícios gratuitos de atenção, memória, linguagem, raciocínio e planejamento, com acesso direto e sem cadastro.",
};

const exerciseBase = "https://www.integradaneuropsicologia.com.br";

const exercises = [
  {
    number: "01",
    title: "Labirinto",
    category: "Planejamento",
    description: "Planeje caminhos, antecipe movimentos e acompanhe sua orientação visual.",
    href: `${exerciseBase}/jogodolabirinto`,
  },
  {
    number: "02",
    title: "Caça-Palavras",
    category: "Linguagem",
    description: "Localize palavras enquanto exercita atenção visual e reconhecimento verbal.",
    href: `${exerciseBase}/caca-palavras-estimulacao-cognitiva`,
  },
  {
    number: "03",
    title: "Torre de Hanói",
    category: "Raciocínio",
    description: "Organize os movimentos com estratégia, respeitando as regras do desafio.",
    href: `${exerciseBase}/desafiohanoi`,
  },
  {
    number: "04",
    title: "Resta Um",
    category: "Raciocínio visual",
    description: "Avalie possibilidades e encontre uma sequência eficiente de jogadas.",
    href: `${exerciseBase}/resta-um-raciocinio-visual`,
  },
  {
    number: "05",
    title: "Sequência Inteligente",
    category: "Lógica",
    description: "Observe o padrão apresentado e escolha o elemento que dá continuidade à sequência.",
    href: `${exerciseBase}/sequ%C3%AAnciainteligente`,
  },
  {
    number: "06",
    title: "Reflexo Fantasmas",
    category: "Atenção",
    description: "Responda aos estímulos visuais com foco, rapidez e precisão.",
    href: `${exerciseBase}/caca-fantasmas-agilidade-atencao`,
  },
  {
    number: "07",
    title: "Torre de Londres",
    category: "Funções executivas",
    description: "Antecipe etapas e organize movimentos para alcançar o objetivo proposto.",
    href: `${exerciseBase}/torredelondresdigital`,
  },
  {
    number: "08",
    title: "Quebra-Cabeça Emoji",
    category: "Percepção visual",
    description: "Reconstrua a imagem observando posições, detalhes e relações entre as peças.",
    href: `${exerciseBase}/quebra-cabe%C3%A7aemoji`,
  },
  {
    number: "09",
    title: "Afirmou, Bateu!",
    category: "Controle inibitório",
    description: "Escolha a resposta adequada e pratique o controle de respostas automáticas.",
    href: `${exerciseBase}/afirmou-bateu`,
  },
  {
    number: "10",
    title: "Memória Mix",
    category: "Memória",
    description: "Encontre associações e mantenha informações ativas ao longo da atividade.",
    href: `${exerciseBase}/mem%C3%B3riamix`,
  },
  {
    number: "11",
    title: "Desafio das Cores",
    category: "Flexibilidade cognitiva",
    description: "Alterne critérios e mantenha o foco diante de informações concorrentes.",
    href: `${exerciseBase}/desafiodascores`,
  },
  {
    number: "12",
    title: "Emoji Alvo",
    category: "Atenção seletiva",
    description: "Procure o alvo entre diferentes estímulos e exercite a varredura visual.",
    href: `${exerciseBase}/emojialvo`,
  },
  {
    number: "13",
    title: "Intruso das Palavras",
    category: "Linguagem",
    description: "Compare significados e identifique qual palavra não pertence ao grupo.",
    href: `${exerciseBase}/intrusodaspalavras`,
  },
  {
    number: "14",
    title: "Clique no Momento Certo",
    category: "Tempo de resposta",
    description: "Aguarde o sinal correto para responder com atenção e precisão.",
    href: `${exerciseBase}/cliquenomomentocerto`,
  },
  {
    number: "15",
    title: "Caça-Círculos",
    category: "Atenção visual",
    description: "Localize estímulos específicos em uma atividade de busca visual.",
    href: `${exerciseBase}/cacacirculos`,
  },
  {
    number: "16",
    title: "Sequência Numérica",
    category: "Memória de trabalho",
    description: "Mantenha números na memória e reproduza a sequência apresentada.",
    href: `${exerciseBase}/memorianumerica`,
  },
  {
    number: "17",
    title: "Busca do Símbolo",
    category: "Velocidade de processamento",
    description: "Compare símbolos e encontre correspondências com agilidade e cuidado.",
    href: `${exerciseBase}/buscados%C3%ADmbolo`,
  },
  {
    number: "18",
    title: "Ordem das Ações",
    category: "Sequenciamento",
    description: "Organize etapas em uma ordem coerente e pratique o planejamento cotidiano.",
    href: `${exerciseBase}/ordem-das-acoes`,
  },
  {
    number: "19",
    title: "Palavra & Emoji",
    category: "Associação",
    description: "Relacione linguagem e informação visual para encontrar a combinação correta.",
    href: `${exerciseBase}/palavra-emoji`,
  },
];

export default function MentalExercisesPage() {
  return (
    <main className="exercise-page">
      <SiteHeader />

      <section className="exercise-hero">
        <div className="container exercise-hero-grid">
          <div>
            <p className="eyebrow">Prática leve e acessível</p>
            <h1>Exercícios de estimulação mental.</h1>
            <p>
              Atividades breves para exercitar atenção, memória, linguagem,
              raciocínio e planejamento. Escolha uma opção e comece no seu ritmo.
            </p>
          </div>
          <div className="exercise-access-note">
            <span aria-hidden="true">19</span>
            <div>
              <strong>Acesso direto</strong>
              <p>Todos os exercícios estão disponíveis sem cadastro ou identificação.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="exercise-library" aria-labelledby="exercise-library-title">
        <div className="container">
          <div className="exercise-library-heading">
            <div>
              <p className="eyebrow">Escolha uma atividade</p>
              <h2 id="exercise-library-title">Uma prática diferente para cada habilidade.</h2>
            </div>
            <p>
              Não há pontuação obrigatória nem comparação entre participantes. Faça uma
              pausa quando precisar e repita as atividades que considerar interessantes.
            </p>
          </div>

          <div className="exercise-grid">
            {exercises.map((exercise) => (
              <article className="exercise-card" key={exercise.title}>
                <div className="exercise-card-topline">
                  <span>{exercise.number}</span>
                  <small>{exercise.category}</small>
                </div>
                <h3>{exercise.title}</h3>
                <p>{exercise.description}</p>
                <a href={exercise.href} target="_blank" rel="noreferrer">
                  Abrir exercício <span aria-hidden="true">↗</span>
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <aside className="exercise-guidance">
        <div className="container exercise-guidance-inner">
          <strong>Use como prática complementar</strong>
          <p>
            Estas atividades têm finalidade educativa e recreativa. Elas não avaliam
            desempenho clínico e não substituem avaliação neuropsicológica, diagnóstico
            ou acompanhamento profissional.
          </p>
          <Link href="/#contato">Conversar com a equipe</Link>
        </div>
      </aside>

      <footer className="exercise-footer">
        <div className="container footer-main">
          <Link className="brand brand-footer brand-logo-link" href="/" aria-label="Integrada Neuropsicologia — início">
            <span className="brand-logo-crop" aria-hidden="true">
              <img src="/logo-horizontal.jpg" alt="" width="500" height="500" />
            </span>
          </Link>
          <p>Avaliando o presente,<br />transformando o futuro.</p>
          <nav aria-label="Links do rodapé">
            <Link href="/#atendimentos">Atendimentos</Link>
            <Link href="/#como-funciona">Como funciona</Link>
            <Link href="/#duvidas">Dúvidas frequentes</Link>
            <Link href="/exercicios-de-estimulacao-mental">Exercícios</Link>
          </nav>
        </div>
        <div className="container footer-bottom">
          <p>© {new Date().getFullYear()} Integrada Neuropsicologia. Todos os direitos reservados.</p>
          <p>Conteúdo informativo. Não substitui avaliação profissional.</p>
        </div>
      </footer>
    </main>
  );
}
