"use client";

import { useEffect, useRef, useState } from "react";

type Level = "leve" | "moderado" | "intenso";
type Phase = "idle" | "waiting" | "stimulus" | "done";
type Stimulus = "target" | "distractor";

const levels: Record<Level, { label: string; rounds: number; exposure: number }> = {
  leve: { label: "Leve", rounds: 10, exposure: 1250 },
  moderado: { label: "Moderado", rounds: 14, exposure: 900 },
  intenso: { label: "Intenso", rounds: 18, exposure: 650 },
};

export function GhostReflexActivity() {
  const [level, setLevel] = useState<Level>("leve");
  const [phase, setPhase] = useState<Phase>("idle");
  const [stimulus, setStimulus] = useState<Stimulus>("target");
  const [round, setRound] = useState(0);
  const [points, setPoints] = useState(0);
  const [hits, setHits] = useState(0);
  const [errors, setErrors] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const [session, setSession] = useState(0);
  const [feedback, setFeedback] = useState("Escolha um nível e inicie a sessão.");
  const roundToken = useRef(0);
  const roundResolved = useRef(false);

  const settings = levels[level];
  const active = phase === "waiting" || phase === "stimulus";

  function beginRound(nextRound: number) {
    roundToken.current += 1;
    roundResolved.current = false;
    setRound(nextRound);
    setPhase("waiting");
  }

  function claimRound(token = roundToken.current) {
    if (token !== roundToken.current || roundResolved.current) return false;
    roundResolved.current = true;
    return true;
  }

  function finishRound(correct: boolean, message: string, reward: number, token = roundToken.current) {
    if (!claimRound(token)) return;
    if (correct) {
      setHits((value) => value + 1);
      setPoints((value) => value + reward);
    } else {
      setErrors((value) => value + 1);
    }
    setFeedback(message);
    if (round >= settings.rounds) setPhase("done");
    else beginRound(round + 1);
  }

  useEffect(() => {
    if (!active) return;
    const timer = window.setInterval(() => setElapsed((value) => value + 1), 1000);
    return () => window.clearInterval(timer);
  }, [active]);

  useEffect(() => {
    if (phase !== "waiting") return;
    const token = roundToken.current;
    const delay = 550 + Math.floor(Math.random() * 950);
    const timer = window.setTimeout(() => {
      if (token !== roundToken.current || roundResolved.current) return;
      setStimulus(Math.random() < 0.68 ? "target" : "distractor");
      setPhase("stimulus");
      setFeedback("Observe antes de responder.");
    }, delay);
    return () => window.clearTimeout(timer);
  }, [phase, round, session]);

  useEffect(() => {
    if (phase !== "stimulus") return;
    const token = roundToken.current;
    const timer = window.setTimeout(() => {
      if (stimulus === "target") {
        finishRound(false, "O fantasma-alvo passou. Tente manter o foco no próximo estímulo.", 0, token);
      } else {
        finishRound(true, "Boa inibição: você não respondeu ao distrator.", 5, token);
      }
    }, settings.exposure);
    return () => window.clearTimeout(timer);
    // O token invalida callbacks antigos; finishRound depende do estado desta renderização.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, round, session, settings.exposure, settings.rounds, stimulus]);

  function startSession() {
    setPoints(0);
    setHits(0);
    setErrors(0);
    setElapsed(0);
    setSession((value) => value + 1);
    setFeedback("Aguarde o estímulo. Clique somente no fantasma branco.");
    beginRound(1);
  }

  function resolveClick() {
    if (phase === "idle" || phase === "done") return;

    if (phase === "waiting") {
      finishRound(false, "Resposta antecipada. Espere o estímulo aparecer.", 0);
    } else if (stimulus === "target") {
      finishRound(true, "Alvo identificado com precisão.", 10);
    } else {
      finishRound(false, "Era um distrator. Tente conter a resposta automática.", 0);
    }
  }

  return (
    <section className="exercise-game" aria-labelledby="ghost-reflex-title">
      <div className="game-toolbar">
        <div>
          <p className="eyebrow">Atenção sustentada e controle inibitório</p>
          <h2 id="ghost-reflex-title">Reflexo Fantasmas</h2>
          <p>Clique apenas quando o fantasma branco aparecer. Não responda aos outros personagens.</p>
        </div>
        <label className="game-control">
          Nível
          <select value={level} onChange={(event) => setLevel(event.target.value as Level)} disabled={active}>
            {Object.entries(levels).map(([value, option]) => (
              <option key={value} value={value}>{option.label}</option>
            ))}
          </select>
        </label>
      </div>

      <div className="game-stats" aria-label="Desempenho da sessão">
        <span className="game-stat"><strong>Rodada</strong>{round || 0}/{settings.rounds}</span>
        <span className="game-stat"><strong>Pontos</strong>{points}</span>
        <span className="game-stat"><strong>Acertos</strong>{hits}</span>
        <span className="game-stat"><strong>Erros</strong>{errors}</span>
        <span className="game-stat"><strong>Tempo</strong>{elapsed}s</span>
      </div>

      <button
        type="button"
        className={`game-board ghost-reflex-board ghost-${phase}${phase === "stimulus" ? ` is-${stimulus}` : ""}`}
        onClick={resolveClick}
        disabled={phase === "idle" || phase === "done"}
        aria-label={phase === "stimulus" ? (stimulus === "target" ? "Fantasma alvo" : "Personagem distrator") : "Área de estímulo vazia"}
      >
        <span aria-hidden="true">
          {phase === "stimulus" ? (stimulus === "target" ? "👻" : "👾") : active ? "•" : "—"}
        </span>
      </button>

      <p className="game-feedback" role="status" aria-live="polite">
        {phase === "done" ? `Sessão concluída: ${hits} respostas corretas e ${errors} erros.` : feedback}
      </p>
      <button type="button" className="game-primary" onClick={startSession}>
        {phase === "idle" ? "Iniciar exercício" : "Nova sessão"}
      </button>
    </section>
  );
}
