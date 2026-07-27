import type { Metadata } from "next";
import Link from "next/link";
import { InformationalFooter } from "../InformationalFooter";
import { SiteHeader } from "../SiteHeader";
import { exerciseCatalog } from "./exerciseData";

export const metadata: Metadata = {
  title: "Exercícios de Estimulação Mental | Integrada Neuropsicologia",
  description:
    "Exercícios interativos de atenção, memória, linguagem, raciocínio e planejamento, com acesso direto e sem cadastro.",
  alternates: { canonical: "/exercicios-de-estimulacao-mental" },
};

export default function MentalExercisesPage() {
  return (
    <main className="exercise-page">
      <SiteHeader />

      <section className="exercise-hero">
        <div className="container exercise-hero-grid">
          <div>
            <p className="eyebrow">Prática leve, gratuita e acessível</p>
            <h1>Exercícios para uma mente ativa.</h1>
            <p>
              Atividades interativas para mobilizar atenção, memória, linguagem,
              raciocínio e planejamento. Escolha uma habilidade, pratique no seu ritmo
              e acompanhe a evolução dentro de cada sessão.
            </p>
          </div>
          <aside className="exercise-access-note" aria-label="Informações de acesso">
            <span aria-hidden="true">19</span>
            <div>
              <strong>Atividades completas</strong>
              <p>Funcionais, responsivas e disponíveis sem cadastro ou identificação.</p>
            </div>
          </aside>
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
              Cada exercício explica seu objetivo, apresenta instruções claras e oferece
              retorno sobre a própria rodada. Comece pelo que despertar seu interesse e
              faça pausas sempre que precisar.
            </p>
          </div>

          <div className="exercise-grid">
            {exerciseCatalog.map((exercise) => (
              <Link
                className="exercise-card"
                href={`/exercicios-de-estimulacao-mental/${exercise.slug}`}
                key={exercise.slug}
                aria-label={`${exercise.title}: abrir exercício de ${exercise.category}`}
              >
                <span className="exercise-card-media">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={exercise.image}
                    alt={exercise.imageAlt}
                    width="720"
                    height="480"
                    loading="lazy"
                  />
                </span>
                <span className="exercise-card-body">
                  <span className="exercise-card-topline">
                    <span>{exercise.number}</span>
                    <small>{exercise.category}</small>
                  </span>
                  <h3>{exercise.title}</h3>
                  <p>{exercise.description}</p>
                  <span className="exercise-card-link">
                    Praticar agora <span aria-hidden="true">→</span>
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <aside className="exercise-guidance">
        <div className="container exercise-guidance-inner">
          <strong>Use como prática complementar</strong>
          <p>
            Estas atividades têm finalidade educativa e recreativa. Pontuações e tempos
            servem apenas como retorno da própria sessão; não avaliam capacidade cognitiva
            e não substituem avaliação, diagnóstico ou acompanhamento profissional.
          </p>
          <Link href="/#contato">Conversar com a equipe</Link>
        </div>
      </aside>

      <InformationalFooter />
    </main>
  );
}
