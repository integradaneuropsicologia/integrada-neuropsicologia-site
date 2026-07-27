"use client";

import { useEffect, useRef, useState } from "react";

type Level = "leve" | "moderado" | "intenso";
type Color = { key: string; name: string; hex: string };
type Challenge = { word: Color; ink: Color };

const colors: Color[] = [
  { key: "blue", name: "AZUL", hex: "#1769aa" },
  { key: "red", name: "VERMELHO", hex: "#c62828" },
  { key: "green", name: "VERDE", hex: "#26734d" },
  { key: "yellow", name: "AMARELO", hex: "#a66b00" },
  { key: "purple", name: "ROXO", hex: "#6a3da3" },
  { key: "orange", name: "LARANJA", hex: "#c45316" },
];

const levels: Record<Level, { label: string; colorCount: number; rounds: number; seconds: number }> = {
  leve: { label: "Leve", colorCount: 4, rounds: 10, seconds: 7 },
  moderado: { label: "Moderado", colorCount: 5, rounds: 12, seconds: 5 },
  intenso: { label: "Intenso", colorCount: 6, rounds: 15, seconds: 3 },
};

function createChallenge(colorCount: number): Challenge {
  const palette = colors.slice(0, colorCount);
  const word = palette[Math.floor(Math.random() * palette.length)];
  let ink = palette[Math.floor(Math.random() * palette.length)];
  if (Math.random() < 0.82 && ink.key === word.key) {
    ink = palette[(palette.indexOf(word) + 1 + Math.floor(Math.random() * (palette.length - 1))) % palette.length];
  }
  return { word, ink };
}

export function ColorChallengeActivity() {
  const [level, setLevel] = useState<Level>("leve");
  const [phase, setPhase] = useState<"idle" | "playing" | "done">("idle");
  const [challenge, setChallenge] = useState<Challenge | null>(null);
  const [round, setRound] = useState(0);
  const [points, setPoints] = useState(0);
  const [hits, setHits] = useState(0);
  const [errors, setErrors] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const [feedback, setFeedback] = useState("Responda pela cor da tinta, não pelo significado da palavra.");
  const roundToken = useRef(0);
  const roundResolved = useRef(false);
  const settings = levels[level];
  const palette = colors.slice(0, settings.colorCount);

  function beginChallenge(nextRound: number) {
    roundToken.current += 1;
    roundResolved.current = false;
    setRound(nextRound);
    setChallenge(createChallenge(settings.colorCount));
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
      setFeedback("Tempo esgotado. Direcione a atenção para a cor da tinta.");
      if (round >= settings.rounds) setPhase("done");
      else beginChallenge(round + 1);
    }, settings.seconds * 1000);
    return () => window.clearTimeout(timer);
    // O objeto challenge identifica a rodada; beginChallenge faria o timer reiniciar a cada render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [challenge, phase, round, settings.colorCount, settings.rounds, settings.seconds]);

  function startSession() {
    setPoints(0);
    setHits(0);
    setErrors(0);
    setElapsed(0);
    setFeedback("Qual é a cor da tinta?");
    beginChallenge(1);
    setPhase("playing");
  }

  function chooseColor(color: Color) {
    if (phase !== "playing" || !challenge || !claimChallenge()) return;
    if (color.key === challenge.ink.key) {
      setHits((value) => value + 1);
      setPoints((value) => value + 10);
      setFeedback("Cor correta. Você separou o significado da informação visual.");
    } else {
      setErrors((value) => value + 1);
      setFeedback(`A tinta era ${challenge.ink.name.toLowerCase()}.`);
    }
    if (round >= settings.rounds) setPhase("done");
    else beginChallenge(round + 1);
  }

  return (
    <section className="exercise-game" aria-labelledby="color-challenge-title">
      <div className="game-toolbar">
        <div>
          <p className="eyebrow">Flexibilidade cognitiva e atenção seletiva</p>
          <h2 id="color-challenge-title">Desafio das Cores</h2>
          <p>Ignore a palavra escrita e selecione a cor em que ela foi pintada.</p>
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

      <div className="game-board color-challenge-board" aria-live="polite">
        {challenge && phase !== "idle" ? (
          <strong style={{ color: challenge.ink.hex }}>{challenge.word.name}</strong>
        ) : (
          <p>A palavra aparecerá aqui.</p>
        )}
      </div>

      {phase === "playing" && (
        <div className="game-actions color-options" aria-label="Escolha a cor da tinta">
          {palette.map((color) => (
            <button
              type="button"
              className="game-secondary"
              key={color.key}
              onClick={() => chooseColor(color)}
              aria-label={`Selecionar ${color.name.toLowerCase()}`}
            >
              <span className="color-swatch" style={{ backgroundColor: color.hex }} aria-hidden="true" />
              {color.name}
            </button>
          ))}
        </div>
      )}

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
