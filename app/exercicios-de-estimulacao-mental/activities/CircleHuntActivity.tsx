"use client";

import { useEffect, useRef, useState } from "react";

type Level = "leve" | "moderado" | "intenso";
type ShapeCell = { id: string; symbol: string; isCircle: boolean };

const levels: Record<Level, { label: string; cells: number; targets: number; seconds: number }> = {
  leve: { label: "Leve", cells: 24, targets: 5, seconds: 18 },
  moderado: { label: "Moderado", cells: 36, targets: 7, seconds: 15 },
  intenso: { label: "Intenso", cells: 48, targets: 9, seconds: 12 },
};

const distractors = ["■", "▲", "◆", "⬟", "✦", "▰", "▼"];
const totalRounds = 4;

function createBoard(cellCount: number, targetCount: number): ShapeCell[] {
  const cells: ShapeCell[] = [];
  for (let index = 0; index < targetCount; index += 1) {
    cells.push({ id: `circle-${index}-${Math.random()}`, symbol: "●", isCircle: true });
  }
  for (let index = targetCount; index < cellCount; index += 1) {
    cells.push({
      id: `shape-${index}-${Math.random()}`,
      symbol: distractors[Math.floor(Math.random() * distractors.length)],
      isCircle: false,
    });
  }
  return cells.sort(() => Math.random() - 0.5);
}

export function CircleHuntActivity() {
  const [level, setLevel] = useState<Level>("leve");
  const [phase, setPhase] = useState<"idle" | "playing" | "roundResult" | "done">("idle");
  const [board, setBoard] = useState<ShapeCell[]>([]);
  const [found, setFound] = useState<string[]>([]);
  const [round, setRound] = useState(0);
  const [points, setPoints] = useState(0);
  const [hits, setHits] = useState(0);
  const [errors, setErrors] = useState(0);
  const [timeLeft, setTimeLeft] = useState(levels.leve.seconds);
  const [feedback, setFeedback] = useState("Encontre todos os círculos preenchidos entre as outras formas.");
  const roundToken = useRef(0);
  const roundResolved = useRef(false);
  const foundIds = useRef(new Set<string>());
  const settings = levels[level];

  function claimRound(token = roundToken.current) {
    if (token !== roundToken.current || roundResolved.current) return false;
    roundResolved.current = true;
    return true;
  }

  useEffect(() => {
    if (phase !== "playing" || timeLeft <= 0) return;
    const token = roundToken.current;
    const timer = window.setTimeout(() => {
      if (timeLeft <= 1) {
        if (!claimRound(token)) return;
        const missing = settings.targets - foundIds.current.size;
        setTimeLeft(0);
        setErrors((value) => value + missing);
        setFeedback(`Tempo encerrado. Faltaram ${missing} círculo${missing === 1 ? "" : "s"}.`);
        setPhase("roundResult");
      } else {
        setTimeLeft((value) => value - 1);
      }
    }, 1000);
    return () => window.clearTimeout(timer);
  }, [phase, settings.targets, timeLeft]);

  function prepareRound() {
    roundToken.current += 1;
    roundResolved.current = false;
    foundIds.current = new Set();
    setBoard(createBoard(settings.cells, settings.targets));
    setFound([]);
    setTimeLeft(settings.seconds);
    setFeedback("Faça uma varredura organizada e selecione somente os círculos.");
    setPhase("playing");
  }

  function startSession() {
    setRound(1);
    setPoints(0);
    setHits(0);
    setErrors(0);
    prepareRound();
  }

  function chooseShape(cell: ShapeCell) {
    if (phase !== "playing" || roundResolved.current || foundIds.current.has(cell.id)) return;
    if (!cell.isCircle) {
      setErrors((value) => value + 1);
      setFeedback("Essa forma não é um círculo. Retome a busca por linhas.");
      return;
    }

    foundIds.current.add(cell.id);
    const nextFound = [...foundIds.current];
    setFound(nextFound);
    setHits((value) => value + 1);
    setPoints((value) => value + 10);
    if (nextFound.length === settings.targets) {
      if (!claimRound()) return;
      setPoints((value) => value + timeLeft * 2);
      setFeedback(`Todos encontrados com ${timeLeft} segundos restantes.`);
      setPhase("roundResult");
    } else {
      setFeedback(`Círculo encontrado. Restam ${settings.targets - nextFound.length}.`);
    }
  }

  function nextRound() {
    if (round >= totalRounds) {
      setPhase("done");
      return;
    }
    setRound((value) => value + 1);
    prepareRound();
  }

  return (
    <section className="exercise-game" aria-labelledby="circle-hunt-title">
      <div className="game-toolbar">
        <div>
          <p className="eyebrow">Atenção visual e velocidade de busca</p>
          <h2 id="circle-hunt-title">Caça-Círculos</h2>
          <p>Localize todos os círculos preenchidos antes que o tempo termine.</p>
        </div>
        <label className="game-control">
          Nível
          <select value={level} onChange={(event) => setLevel(event.target.value as Level)} disabled={phase === "playing" || phase === "roundResult"}>
            {Object.entries(levels).map(([value, option]) => (
              <option key={value} value={value}>{option.label}</option>
            ))}
          </select>
        </label>
      </div>

      <div className="game-stats" aria-label="Desempenho da sessão">
        <span className="game-stat"><strong>Rodada</strong>{round}/{totalRounds}</span>
        <span className="game-stat"><strong>Pontos</strong>{points}</span>
        <span className="game-stat"><strong>Acertos</strong>{hits}</span>
        <span className="game-stat"><strong>Erros</strong>{errors}</span>
        <span className="game-stat"><strong>Tempo</strong>{timeLeft}s</span>
      </div>

      <div
        className="game-board circle-hunt-board"
        style={{ gridTemplateColumns: `repeat(${level === "leve" ? 6 : level === "moderado" ? 6 : 8}, minmax(2.5rem, 1fr))` }}
        aria-label="Quadro de formas"
      >
        {phase === "idle" ? <p>Inicie a sessão para montar o quadro.</p> : board.map((cell, index) => (
          <button
            type="button"
            className={found.includes(cell.id) ? "shape-cell shape-found" : "shape-cell"}
            key={cell.id}
            onClick={() => chooseShape(cell)}
            disabled={phase !== "playing" || found.includes(cell.id)}
            aria-label={`Forma na posição ${index + 1}${found.includes(cell.id) ? ", já selecionada" : ""}`}
          >
            <span aria-hidden="true">{found.includes(cell.id) ? "✓" : cell.symbol}</span>
          </button>
        ))}
      </div>

      <p className="game-feedback" role="status" aria-live="polite">
        {phase === "done" ? `Sessão concluída: ${hits} círculos encontrados e ${errors} erros.` : feedback}
      </p>
      {(phase === "idle" || phase === "done") && (
        <button type="button" className="game-primary" onClick={startSession}>
          {phase === "idle" ? "Iniciar exercício" : "Nova sessão"}
        </button>
      )}
      {phase === "roundResult" && (
        <button type="button" className="game-primary" onClick={nextRound}>
          {round >= totalRounds ? "Ver resultado" : "Próxima rodada"}
        </button>
      )}
    </section>
  );
}
