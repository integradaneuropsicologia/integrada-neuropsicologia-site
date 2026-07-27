"use client";

import { useEffect, useRef, useState } from "react";

type Level = "leve" | "moderado" | "intenso";
type Cell = { id: string; emoji: string; isTarget: boolean };

const emojiGroups = [
  ["😀", "😃", "😄", "😁", "😆", "😅"],
  ["🐶", "🐺", "🦊", "🐱", "🦁", "🐯"],
  ["🍎", "🍅", "🍒", "🍓", "🌶️", "🥭"],
  ["⚽", "🏀", "🏐", "🎾", "🏉", "⚾"],
];

const levels: Record<Level, { label: string; cells: number; rounds: number; seconds: number }> = {
  leve: { label: "Leve", cells: 20, rounds: 8, seconds: 12 },
  moderado: { label: "Moderado", cells: 35, rounds: 10, seconds: 10 },
  intenso: { label: "Intenso", cells: 48, rounds: 12, seconds: 8 },
};

function shuffle<T>(items: T[]) {
  return [...items].sort(() => Math.random() - 0.5);
}

function createBoard(cellCount: number): { target: string; cells: Cell[] } {
  const group = emojiGroups[Math.floor(Math.random() * emojiGroups.length)];
  const target = group[Math.floor(Math.random() * group.length)];
  const distractors = group.filter((emoji) => emoji !== target);
  const cells: Cell[] = Array.from({ length: cellCount - 1 }, (_, index) => ({
    id: `d-${index}-${Math.random()}`,
    emoji: distractors[Math.floor(Math.random() * distractors.length)],
    isTarget: false,
  }));
  cells.push({ id: `target-${Math.random()}`, emoji: target, isTarget: true });
  return { target, cells: shuffle(cells) };
}

export function EmojiTargetActivity() {
  const [level, setLevel] = useState<Level>("leve");
  const [phase, setPhase] = useState<"idle" | "playing" | "done">("idle");
  const [target, setTarget] = useState("🎯");
  const [cells, setCells] = useState<Cell[]>([]);
  const [round, setRound] = useState(0);
  const [points, setPoints] = useState(0);
  const [hits, setHits] = useState(0);
  const [errors, setErrors] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const [feedback, setFeedback] = useState("Encontre o único emoji igual ao alvo.");
  const roundToken = useRef(0);
  const roundResolved = useRef(false);
  const settings = levels[level];

  function beginBoard(nextRound: number) {
    const board = createBoard(settings.cells);
    roundToken.current += 1;
    roundResolved.current = false;
    setRound(nextRound);
    setTarget(board.target);
    setCells(board.cells);
  }

  function claimBoard(token = roundToken.current) {
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
      if (!claimBoard(token)) return;
      setErrors((value) => value + 1);
      setFeedback("Tempo esgotado. Faça uma varredura ordenada por linhas.");
      if (round >= settings.rounds) setPhase("done");
      else beginBoard(round + 1);
    }, settings.seconds * 1000);
    return () => window.clearTimeout(timer);
    // A troca de células identifica o começo de uma nova rodada.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cells, phase, round, settings.rounds, settings.seconds]);

  function startSession() {
    setPoints(0);
    setHits(0);
    setErrors(0);
    setElapsed(0);
    setFeedback("Localize o alvo com atenção aos pequenos detalhes.");
    beginBoard(1);
    setPhase("playing");
  }

  function selectCell(cell: Cell) {
    if (phase !== "playing" || roundResolved.current) return;
    if (!cell.isTarget) {
      setErrors((value) => value + 1);
      setFeedback("Esse é um distrator. Continue a busca com calma.");
      return;
    }
    if (!claimBoard()) return;
    setHits((value) => value + 1);
    setPoints((value) => value + 10);
    setFeedback("Alvo encontrado.");
    if (round >= settings.rounds) setPhase("done");
    else beginBoard(round + 1);
  }

  return (
    <section className="exercise-game" aria-labelledby="emoji-target-title">
      <div className="game-toolbar">
        <div>
          <p className="eyebrow">Atenção seletiva e varredura visual</p>
          <h2 id="emoji-target-title">Emoji Alvo</h2>
          <p>Procure no quadro o único emoji idêntico ao modelo apresentado.</p>
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

      <div className="target-preview" aria-label={`Emoji alvo: ${target}`}>
        <span>Alvo</span><strong aria-hidden="true">{target}</strong>
      </div>
      <div
        className="game-board emoji-target-board"
        style={{ gridTemplateColumns: `repeat(${level === "leve" ? 5 : level === "moderado" ? 7 : 8}, minmax(2.5rem, 1fr))` }}
        aria-label="Quadro de busca visual"
      >
        {phase === "idle" ? <p>Inicie a sessão para montar o quadro.</p> : cells.map((cell, index) => (
          <button
            type="button"
            className="emoji-cell"
            key={cell.id}
            onClick={() => selectCell(cell)}
            disabled={phase !== "playing"}
            aria-label={`Emoji na posição ${index + 1}: ${cell.emoji}`}
          >
            <span aria-hidden="true">{cell.emoji}</span>
          </button>
        ))}
      </div>

      <p className="game-feedback" role="status" aria-live="polite">
        {phase === "done" ? `Sessão concluída: ${hits} alvos encontrados e ${errors} erros.` : feedback}
      </p>
      {phase !== "playing" && (
        <button type="button" className="game-primary" onClick={startSession}>
          {phase === "idle" ? "Iniciar exercício" : "Nova sessão"}
        </button>
      )}
    </section>
  );
}
