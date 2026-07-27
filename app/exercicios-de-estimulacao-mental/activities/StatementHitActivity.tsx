"use client";

import { useEffect, useRef, useState } from "react";

type Level = "leve" | "moderado" | "intenso";
type Prompt = { word: string; arrow: string; arrowName: string; matches: boolean };

const levels: Record<Level, { label: string; seconds: number }> = {
  leve: { label: "Leve", seconds: 8 },
  moderado: { label: "Moderado", seconds: 5 },
  intenso: { label: "Intenso", seconds: 3 },
};

const prompts: Prompt[] = [
  { word: "DIREITA", arrow: "→", arrowName: "direita", matches: true },
  { word: "ESQUERDA", arrow: "→", arrowName: "direita", matches: false },
  { word: "ACIMA", arrow: "↑", arrowName: "acima", matches: true },
  { word: "ABAIXO", arrow: "↑", arrowName: "acima", matches: false },
  { word: "ESQUERDA", arrow: "←", arrowName: "esquerda", matches: true },
  { word: "DIREITA", arrow: "←", arrowName: "esquerda", matches: false },
  { word: "ABAIXO", arrow: "↓", arrowName: "abaixo", matches: true },
  { word: "ACIMA", arrow: "↓", arrowName: "abaixo", matches: false },
  { word: "ACIMA", arrow: "→", arrowName: "direita", matches: false },
  { word: "DIREITA", arrow: "↓", arrowName: "abaixo", matches: false },
];

function shuffledPrompts() {
  return [...prompts].sort(() => Math.random() - 0.5);
}

export function StatementHitActivity() {
  const [level, setLevel] = useState<Level>("leve");
  const [questions, setQuestions] = useState<Prompt[]>(prompts);
  const [phase, setPhase] = useState<"idle" | "playing" | "done">("idle");
  const [index, setIndex] = useState(0);
  const [points, setPoints] = useState(0);
  const [hits, setHits] = useState(0);
  const [errors, setErrors] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const [feedback, setFeedback] = useState("Decida se a palavra e a seta indicam a mesma direção.");
  const roundToken = useRef(0);
  const roundResolved = useRef(false);

  const current = questions[index];

  function beginQuestion(nextIndex: number) {
    roundToken.current += 1;
    roundResolved.current = false;
    setIndex(nextIndex);
  }

  function claimQuestion(token = roundToken.current) {
    if (token !== roundToken.current || roundResolved.current) return false;
    roundResolved.current = true;
    return true;
  }

  useEffect(() => {
    if (phase !== "playing") return;
    const timer = window.setInterval(() => setElapsed((value) => value + 1), 1000);
    return () => window.clearInterval(timer);
  }, [phase]);

  useEffect(() => {
    if (phase !== "playing") return;
    const token = roundToken.current;
    const timer = window.setTimeout(() => {
      if (!claimQuestion(token)) return;
      setErrors((value) => value + 1);
      setFeedback("Tempo esgotado. Observe palavra e direção antes de responder.");
      if (index >= questions.length - 1) setPhase("done");
      else beginQuestion(index + 1);
    }, levels[level].seconds * 1000);
    return () => window.clearTimeout(timer);
  }, [index, level, phase, questions.length]);

  function startSession() {
    setQuestions(shuffledPrompts());
    beginQuestion(0);
    setPoints(0);
    setHits(0);
    setErrors(0);
    setElapsed(0);
    setFeedback("A afirmação está correta? Responda sim ou não.");
    setPhase("playing");
  }

  function answer(value: boolean) {
    if (phase !== "playing" || !claimQuestion()) return;
    if (value === current.matches) {
      setHits((count) => count + 1);
      setPoints((score) => score + 10);
      setFeedback("Resposta correta. Continue evitando respostas automáticas.");
    } else {
      setErrors((count) => count + 1);
      setFeedback(`Não corresponde: a seta aponta para ${current.arrowName}.`);
    }
    if (index >= questions.length - 1) setPhase("done");
    else beginQuestion(index + 1);
  }

  return (
    <section className="exercise-game" aria-labelledby="statement-hit-title">
      <div className="game-toolbar">
        <div>
          <p className="eyebrow">Controle inibitório e tomada de decisão</p>
          <h2 id="statement-hit-title">Afirmou, Bateu!</h2>
          <p>Compare a palavra com a direção da seta e responda se as duas informações combinam.</p>
        </div>
        <label className="game-control">
          Ritmo
          <select value={level} onChange={(event) => setLevel(event.target.value as Level)} disabled={phase === "playing"}>
            {Object.entries(levels).map(([value, option]) => (
              <option key={value} value={value}>{option.label} — {option.seconds}s</option>
            ))}
          </select>
        </label>
      </div>

      <div className="game-stats" aria-label="Desempenho da sessão">
        <span className="game-stat"><strong>Rodada</strong>{phase === "idle" ? 0 : Math.min(index + 1, questions.length)}/{questions.length}</span>
        <span className="game-stat"><strong>Pontos</strong>{points}</span>
        <span className="game-stat"><strong>Acertos</strong>{hits}</span>
        <span className="game-stat"><strong>Erros</strong>{errors}</span>
        <span className="game-stat"><strong>Tempo</strong>{elapsed}s</span>
      </div>

      <div className="game-board statement-board" aria-live="polite">
        {phase === "idle" ? (
          <p>Pressione “Iniciar exercício” quando estiver pronto.</p>
        ) : (
          <>
            <span className="statement-word">{current.word}</span>
            <span className="statement-arrow" role="img" aria-label={`Seta apontando para ${current.arrowName}`}>{current.arrow}</span>
            <p>A palavra descreve corretamente a seta?</p>
          </>
        )}
      </div>

      {phase === "playing" && (
        <div className="game-actions" aria-label="Escolha sua resposta">
          <button type="button" className="game-primary" onClick={() => answer(true)}>Sim</button>
          <button type="button" className="game-secondary" onClick={() => answer(false)}>Não</button>
        </div>
      )}
      <p className="game-feedback" role="status" aria-live="polite">
        {phase === "done" ? `Sessão concluída: ${hits} acertos em ${questions.length} rodadas.` : feedback}
      </p>
      {phase !== "playing" && (
        <button type="button" className="game-primary" onClick={startSession}>
          {phase === "idle" ? "Iniciar exercício" : "Nova sessão"}
        </button>
      )}
    </section>
  );
}
