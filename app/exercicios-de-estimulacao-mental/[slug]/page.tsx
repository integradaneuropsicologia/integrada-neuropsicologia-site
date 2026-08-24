import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { InformationalFooter } from "../../InformationalFooter";
import { breadcrumbJsonLd, createPageMetadata, JsonLd } from "../../seo";
import { SiteHeader } from "../../SiteHeader";
import {
  exerciseCatalog,
  getExercise,
  type ExerciseDefinition,
} from "../exerciseData";

type ExercisePageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return exerciseCatalog.map((exercise) => ({ slug: exercise.slug }));
}

export async function generateMetadata({ params }: ExercisePageProps): Promise<Metadata> {
  const { slug } = await params;
  const exercise = getExercise(slug);

  if (!exercise) {
    return { title: "Exercício não encontrado | Integrada Neuropsicologia" };
  }

  const title = `${exercise.title} — exercício de ${exercise.category} | Integrada Neuropsicologia`;
  return createPageMetadata({
    title,
    description: `${exercise.description} Atividade gratuita, interativa e sem cadastro.`,
    path: `/exercicios-de-estimulacao-mental/${exercise.slug}`,
    image: exercise.image,
    imageAlt: exercise.imageAlt,
  });
}

function isExercise(value: ExerciseDefinition | undefined): value is ExerciseDefinition {
  return Boolean(value);
}

export default async function ExerciseDetailPage({ params }: ExercisePageProps) {
  const { slug } = await params;
  const exercise = getExercise(slug);

  if (!exercise) notFound();

  const relatedExercises = exercise.related.map(getExercise).filter(isExercise);
  const activityHref = `/exercicios-de-estimulacao-mental/${exercise.slug}/atividade`;

  return (
    <main className="exercise-detail-page">
      <JsonLd data={breadcrumbJsonLd([
        { name: "Início", path: "/" },
        { name: "Exercícios de estimulação mental", path: "/exercicios-de-estimulacao-mental" },
        { name: exercise.title, path: `/exercicios-de-estimulacao-mental/${exercise.slug}` },
      ])} />
      <SiteHeader />

      <section className="exercise-detail-hero">
        <div className="container exercise-detail-hero-grid">
          <div className="exercise-detail-hero-copy">
            <nav className="exercise-breadcrumbs" aria-label="Navegação estrutural">
              <Link href="/">Início</Link>
              <span aria-hidden="true">/</span>
              <Link href="/exercicios-de-estimulacao-mental">Exercícios</Link>
              <span aria-hidden="true">/</span>
              <span aria-current="page">{exercise.title}</span>
            </nav>
            <p className="eyebrow">{exercise.category}</p>
            <h1>{exercise.title}</h1>
            <p className="exercise-detail-lead">{exercise.description}</p>
            <div className="exercise-detail-actions">
              <Link
                className="game-primary"
                href={activityHref}
                target="_blank"
                rel="noopener noreferrer"
              >
                Iniciar exercício <span aria-hidden="true">↗</span>
              </Link>
              <Link className="game-secondary" href="/exercicios-de-estimulacao-mental">
                Ver biblioteca
              </Link>
            </div>
          </div>
          <figure className="exercise-detail-media">
            {/* eslint-disable-next-line @next/next/no-img-element -- WebP local já otimizado para entrega direta no vinext. */}
            <img
              src={exercise.image}
              alt={exercise.imageAlt}
              width="960"
              height="960"
              fetchPriority="high"
              decoding="async"
            />
          </figure>
        </div>
      </section>

      <section className="exercise-detail-facts" aria-label="Características do exercício">
        <div className="container game-stats">
          <div className="game-stat"><span>Foco principal</span><strong>{exercise.category}</strong></div>
          <div className="game-stat"><span>Tempo sugerido</span><strong>{exercise.estimatedTime}</strong></div>
          <div className="game-stat"><span>Dificuldade</span><strong>{exercise.level}</strong></div>
          <div className="game-stat"><span>Acesso</span><strong>Livre e sem cadastro</strong></div>
        </div>
      </section>

      <section className="exercise-detail-overview">
        <div className="container exercise-detail-overview-grid">
          <article className="exercise-objective">
            <p className="eyebrow">Objetivo da prática</p>
            <h2>O que este exercício propõe</h2>
            <p>{exercise.objective}</p>
            <p>
              Faça no seu ritmo. O valor da atividade está em observar a estratégia,
              revisar erros e tentar novamente — não em competir com outras pessoas.
            </p>
          </article>

          <article className="exercise-skills">
            <p className="eyebrow">Habilidades mobilizadas</p>
            <h2>Durante a atividade</h2>
            <ul className="exercise-skill-list">
              {exercise.skills.map((skill) => <li key={skill}>{skill}</li>)}
            </ul>
          </article>
        </div>
      </section>

      <section className="exercise-instruction-section" aria-labelledby="instructions-title">
        <div className="container exercise-instruction-grid">
          <div>
            <p className="eyebrow">Antes de começar</p>
            <h2 id="instructions-title">Como fazer</h2>
          </div>
          <ol className="exercise-instruction-list">
            {exercise.instructions.map((instruction, index) => (
              <li key={instruction}>
                <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                <p>{instruction}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="exercise-launch-section" aria-labelledby="launch-title">
        <div className="container exercise-launch-inner">
          <div>
            <p className="eyebrow">Pronto para praticar?</p>
            <h2 id="launch-title">Abra o exercício em uma janela própria.</h2>
            <p>
              Assim, o tabuleiro e todos os controles ficam em destaque, enquanto esta
              página permanece aberta para você consultar as instruções quando precisar.
            </p>
          </div>
          <div className="exercise-launch-action">
            <Link
              className="game-primary exercise-launch-button"
              href={activityHref}
              target="_blank"
              rel="noopener noreferrer"
              aria-describedby="launch-window-note"
            >
              Iniciar exercício <span aria-hidden="true">↗</span>
            </Link>
            <small id="launch-window-note">Abre em uma nova janela.</small>
          </div>
        </div>
      </section>

      <aside className="exercise-guidance">
        <div className="container exercise-guidance-inner">
          <strong>Prática educativa, não avaliação</strong>
          <p>
            Este exercício é uma atividade recreativa de estimulação mental. Pontos,
            tempo e erros servem somente como retorno da própria rodada e não medem
            capacidade cognitiva, não produzem diagnóstico e não substituem avaliação
            ou acompanhamento profissional.
          </p>
          <Link href="/#contato">Conversar com a equipe</Link>
        </div>
      </aside>

      <section className="exercise-related" aria-labelledby="related-title">
        <div className="container">
          <div className="exercise-related-heading">
            <div>
              <p className="eyebrow">Continue praticando</p>
              <h2 id="related-title">Exercícios relacionados</h2>
            </div>
            <Link href="/exercicios-de-estimulacao-mental">Ver todos</Link>
          </div>
          <div className="exercise-related-grid">
            {relatedExercises.map((related) => (
              <article className="exercise-related-card" key={related.slug}>
                <Link href={`/exercicios-de-estimulacao-mental/${related.slug}`}>
                  {/* eslint-disable-next-line @next/next/no-img-element -- WebP local já otimizado para carregamento lazy. */}
                  <img
                    src={related.image}
                    alt=""
                    width="960"
                    height="960"
                    loading="lazy"
                    decoding="async"
                  />
                  <div>
                    <small>{related.category}</small>
                    <h3>{related.title}</h3>
                    <p>{related.description}</p>
                    <span>Praticar agora <span aria-hidden="true">→</span></span>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <InformationalFooter />
    </main>
  );
}
