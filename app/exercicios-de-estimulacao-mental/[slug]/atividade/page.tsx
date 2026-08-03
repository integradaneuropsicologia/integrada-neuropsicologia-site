import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ExercisePlayer } from "../../ExercisePlayer";
import { exerciseCatalog, getExercise } from "../../exerciseData";

type ExerciseActivityPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return exerciseCatalog.map((exercise) => ({ slug: exercise.slug }));
}

export async function generateMetadata({ params }: ExerciseActivityPageProps): Promise<Metadata> {
  const { slug } = await params;
  const exercise = getExercise(slug);

  if (!exercise) {
    return { title: "Exercício não encontrado | Integrada Neuropsicologia" };
  }

  return {
    title: `${exercise.title} — atividade | Integrada Neuropsicologia`,
    description: `Pratique ${exercise.title} em uma janela dedicada, gratuita e sem cadastro.`,
    robots: { index: false, follow: false },
  };
}

export default async function ExerciseActivityPage({ params }: ExerciseActivityPageProps) {
  const { slug } = await params;
  const exercise = getExercise(slug);

  if (!exercise) notFound();

  const instructionsHref = `/exercicios-de-estimulacao-mental/${exercise.slug}`;

  return (
    <main className="exercise-window-page">
      <header className="exercise-window-header">
        <Link className="exercise-window-brand" href="/">
          <span aria-hidden="true">●</span>
          <strong>Integrada Neuropsicologia</strong>
        </Link>
        <div className="exercise-window-title">
          <small>{exercise.category}</small>
          <h1>{exercise.title}</h1>
        </div>
        <Link className="game-secondary exercise-window-back" href={instructionsHref}>
          Voltar às instruções
        </Link>
      </header>

      <section className="exercise-window-stage" aria-label={`Exercício ${exercise.title}`}>
        <ExercisePlayer slug={exercise.slug} standalone />
      </section>

      <footer className="exercise-window-footer">
        <p>Prática educativa e recreativa. Não substitui avaliação ou acompanhamento profissional.</p>
        <Link href="/exercicios-de-estimulacao-mental">Ver outros exercícios</Link>
      </footer>
    </main>
  );
}
