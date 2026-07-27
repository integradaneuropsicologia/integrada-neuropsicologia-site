"use client";

import { useEffect, useRef, useState } from "react";

type Level = "leve" | "moderado" | "intenso";
type Challenge = { target: string; options: string[] };

const symbolGroups = [
  ["◆", "◇", "◈", "⬖", "⬗", "⬘", "⬙"],
  ["↗", "↖", "↘", "↙", "↑", "→", "↓"],
  ["⊕", "⊗", "⊙", "⊖", "⊚", "⊛", "⊝"],
  ["♠", "♣", "♥", "♦", "♤", "♧", "♡"],
  ["Ψ", "Φ", "Ω", "Σ", "Ξ", "Π", "Δ"],
];

const levels: Record<Level, { label: string; options: number; rounds: number; seconds: number }> = {
  leve: { label: "Leve", options: 4, rounds: 10, seconds: 8 },
  moderado: { label: "Moderado", options: 6, rounds: 12, seconds: 5 },
  intenso: { label: "Intenso", options: 7, rounds: 15, seconds: 3 },
};

function createChallenge(optionCount: number): Challenge {
  const group = symbolGroups[Math.floor(Math.random() * symbolGroups.length)];
  const target = group[Math.floor(Math.random() * group.length)];
  const others = group.filter((symbol) => symbol !== target).sort(() => Math.random() - 0.5);
  return { target, options: [target, ...others.slice(0, optionCount - 1)].sort(() => Math.random() - 0.5) };
}

export function SymbolSearchActivity() {
  const [level, setLevel] = useState<Level>("leve");
  const [phase, setPhase] = useState<"idle" | "playing" | "done">("idle");
  const [challenge, setChallenge] = useState<Challenge | null>(null);
  const [round, setRound] = useState(0);
  const [points, setPoints] = useState(0);
  const [hits, setHits] = useState(0);
  const [errors, setErrors] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const [feedback, setFeedback] = useState("Compare o modelo e localize sua correspondência exata.");
  const roundToken = useRef(0);
  const roundResolved = useRef(false);
  const settings = levels[level];

  function beginChallenge(nextRound: number) {
    roundToken.current += 1;
    roundResolved.current = false;
    setRound(nextRound);
    setChallenge(createChallenge(settings.options));
  }

  function claimChallenge(token = roundToken.current) {
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
      if (!claimChallenge(token)) return;
      setErrors((value) => value + 1);
      setFeedback("Tempo esgotado. Compare cada detalhe do contorno e da orientação.");
      if (round >= settings.rounds) setPhase("done");
      else beginChallenge(round + 1);
    }, settings.seconds * 1000);
    return () => window.clearTimeout(timer);
    // O objeto challenge identifica a rodada; beginChallenge faria o timer reiniciar a cada render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [challenge, phase, round, settings.options, settings.rounds, settings.seconds]);

  function startSession() {
    setPoints(0);
    setHits(0);
    setErrors(0);
    setElapsed(0);
    setFeedback("Encontre o símbolo exatamente igual ao modelo.");
    beginChallenge(1);
    setPhase("playing");
  }

  function chooseSymbol(symbol: string) {
    if (phase !== "playing" || !challenge || !claimChallenge()) return;
    if (symbol === challenge.target) {
      setHits((value) => value + 1);
      setPoints((value) => value + 10);
      setFeedback("Correspondência exata encontrada.");
    } else {
      setErrors((value) => value + 1);
      setFeedback("Os símbolos são parecidos, mas não idênticos. Observe orientação e preenchimento.");
    }
    if (round >= settings.rounds) setPhase("done");
    else beginChallenge(round + 1);
  }

  return (
    <section className="exercise-game" aria-labelledby="symbol-search-title">
      <div className="game-toolbar">
        <div>
          <p className="eyebrow">Velocidade de processamento e discriminação visual</p>
          <h2 id="symbol-search-title">Busca do Símbolo</h2>
          <p>Compare rapidamente o modelo com as alternativas e escolha a correspondência exata.</p>
        </div>
        <label className="game-control">
          Nível
          <select value={level} onChange={(event) => setLevel(event.target.value as Level)} disabled={phase === "playing"}>
            {Object.entries(levels).map(([value, option]) => (
              <option key={value} value={value}>{option.label}</option>
            ))}
          </select>
        </label>
      </div>

      <div className="game-stats" aria-label="Desempenho da sessão">
        <span className="game-stat"><strong>Rodada</strong>{round}/{settings.rounds}</span>
        <span className="game-stat"><strong>Pontos</strong>{points}</span>
        <span className="game-stat"><strong>Acertos</strong>{hits}</span>
        <span className="game-stat"><strong>Erros</strong>{errors}</span>
        <span className="game-stat"><strong>Tempo</strong>{elapsed}s</span>
      </div>

      <div className="game-board symbol-search-board" aria-live="polite">
        <div className="symbol-model">
          <span>Modelo</span>
          <strong aria-label={`Símbolo modelo ${challenge?.target ?? "não apresentado"}`}>{challenge?.target ?? "?"}</strong>
        </div>
        {phase === "playing" && challenge && (
          <div className="symbol-options" aria-label="Alternativas de símbolos">
            {challenge.options.map((symbol, index) => (
              <button
                type="button"
                className="game-secondary symbol-option"
                key={`${symbol}-${index}`}
                onClick={() => chooseSymbol(symbol)}
                aria-label={`Alternativa ${index + 1}: símbolo ${symbol}`}
              >
                <span aria-hidden="true">{symbol}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      <p className="game-feedback" role="status" aria-live="polite">
        {phase === "done" ? `Sessão concluída: ${hits} acertos e ${errors} erros.` : feedback}
      </p>
      {phase !== "playing" && (
        <button type="button" className="game-primary" onClick={startSession}>
          {phase === "idle" ? "Iniciar exercício" : "Nova sessão"}
        </button>
      )}
    </section>
  );
}
