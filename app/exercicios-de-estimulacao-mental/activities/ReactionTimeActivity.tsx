"use client";

import { useEffect, useRef, useState } from "react";

type Phase = "idle" | "waiting" | "ready" | "result" | "done";

const totalTrials = 5;

export function ReactionTimeActivity() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [trial, setTrial] = useState(0);
  const [points, setPoints] = useState(0);
  const [hits, setHits] = useState(0);
  const [errors, setErrors] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const [lastTime, setLastTime] = useState<number | null>(null);
  const [times, setTimes] = useState<number[]>([]);
  const [feedback, setFeedback] = useState("Aguarde o sinal verde e responda o mais rápido possível.");
  const signalAt = useRef(0);
  const trialToken = useRef(0);
  const trialResolved = useRef(false);

  const active = phase === "waiting" || phase === "ready";
  const average = times.length ? Math.round(times.reduce((sum, value) => sum + value, 0) / times.length) : 0;

  function beginTrial(nextTrial: number) {
    trialToken.current += 1;
    trialResolved.current = false;
    setTrial(nextTrial);
    setPhase("waiting");
  }

  function claimTrial(token = trialToken.current) {
    if (token !== trialToken.current || trialResolved.current) return false;
    trialResolved.current = true;
    return true;
  }

  useEffect(() => {
    if (!active) return;
    const timer = window.setInterval(() => setElapsed((value) => value + 1), 1000);
    return () => window.clearInterval(timer);
  }, [active]);

  useEffect(() => {
    if (phase !== "waiting") return;
    const token = trialToken.current;
    const delay = 1400 + Math.floor(Math.random() * 2600);
    const timer = window.setTimeout(() => {
      if (token !== trialToken.current || trialResolved.current) return;
      signalAt.current = performance.now();
      setFeedback("Agora! Clique no sinal verde.");
      setPhase("ready");
    }, delay);
    return () => window.clearTimeout(timer);
  }, [phase, trial]);

  useEffect(() => {
    if (phase !== "ready") return;
    const token = trialToken.current;
    const timer = window.setTimeout(() => {
      if (!claimTrial(token)) return;
      setErrors((value) => value + 1);
      setLastTime(null);
      setFeedback("O sinal passou sem resposta. Prepare-se para a próxima tentativa.");
      setPhase("result");
    }, 1800);
    return () => window.clearTimeout(timer);
  }, [phase]);

  function startSession() {
    setPoints(0);
    setHits(0);
    setErrors(0);
    setElapsed(0);
    setLastTime(null);
    setTimes([]);
    setFeedback("Espere. O intervalo muda a cada tentativa.");
    beginTrial(1);
  }

  function pressSignal() {
    if ((phase !== "waiting" && phase !== "ready") || !claimTrial()) return;
    if (phase === "waiting") {
      setErrors((value) => value + 1);
      setLastTime(null);
      setFeedback("Resposta antecipada. Espere a área ficar verde.");
      setPhase("result");
      return;
    }
    const reaction = Math.round(performance.now() - signalAt.current);
    const gained = reaction < 250 ? 20 : reaction < 400 ? 15 : reaction < 650 ? 10 : 5;
    setLastTime(reaction);
    setTimes((values) => [...values, reaction]);
    setHits((value) => value + 1);
    setPoints((value) => value + gained);
    setFeedback(`Resposta registrada em ${reaction} milissegundos.`);
    setPhase("result");
  }

  function nextTrial() {
    if (trial >= totalTrials) {
      setPhase("done");
      return;
    }
    setLastTime(null);
    setFeedback("Espere o próximo sinal verde.");
    beginTrial(trial + 1);
  }

  return (
    <section className="exercise-game" aria-labelledby="reaction-time-title">
      <div className="game-toolbar">
        <div>
          <p className="eyebrow">Vigilância e tempo de resposta</p>
          <h2 id="reaction-time-title">Clique no Momento Certo</h2>
          <p>Mantenha a atenção, evite antecipar e clique somente depois que o quadro ficar verde.</p>
        </div>
      </div>

      <div className="game-stats" aria-label="Desempenho da sessão">
        <span className="game-stat"><strong>Rodada</strong>{trial}/{totalTrials}</span>
        <span className="game-stat"><strong>Pontos</strong>{points}</span>
        <span className="game-stat"><strong>Acertos</strong>{hits}</span>
        <span className="game-stat"><strong>Erros</strong>{errors}</span>
        <span className="game-stat"><strong>Tempo</strong>{elapsed}s</span>
        <span className="game-stat"><strong>Média</strong>{average ? `${average} ms` : "—"}</span>
      </div>

      <button
        type="button"
        className={`game-board reaction-board reaction-${phase}`}
        onClick={pressSignal}
        disabled={phase === "idle" || phase === "result" || phase === "done"}
        aria-label={phase === "ready" ? "Sinal verde. Clique agora" : phase === "waiting" ? "Aguarde o sinal verde" : "Área do teste de reação"}
      >
        <strong>
          {phase === "ready" ? "CLIQUE AGORA" : phase === "waiting" ? "AGUARDE" : lastTime ? `${lastTime} ms` : "PRONTO?"}
        </strong>
      </button>

      <p className="game-feedback" role="status" aria-live="assertive">
        {phase === "done" ? `Sessão concluída. Média de ${average || 0} ms em ${hits} respostas válidas.` : feedback}
      </p>

      {(phase === "idle" || phase === "done") && (
        <button type="button" className="game-primary" onClick={startSession}>
          {phase === "idle" ? "Iniciar exercício" : "Nova sessão"}
        </button>
      )}
      {phase === "result" && (
        <button type="button" className="game-primary" onClick={nextTrial}>
          {trial >= totalTrials ? "Ver resultado" : "Próxima tentativa"}
        </button>
      )}
    </section>
  );
}
