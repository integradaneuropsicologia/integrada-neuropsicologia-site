"use client";

import { useEffect, useMemo, useState } from "react";

type Tile = { id: number; emoji: string; label: string };
type PuzzleCell = Tile | null;

const TILES: Tile[] = [
  { id: 1, emoji: "🌱", label: "broto" },
  { id: 2, emoji: "🌿", label: "folhas" },
  { id: 3, emoji: "🌳", label: "árvore" },
  { id: 4, emoji: "🐝", label: "abelha" },
  { id: 5, emoji: "🌸", label: "flor" },
  { id: 6, emoji: "🍯", label: "mel" },
  { id: 7, emoji: "🌦️", label: "chuva e sol" },
  { id: 8, emoji: "🌈", label: "arco-íris" },
];

const GOAL: PuzzleCell[] = [...TILES, null];
const INITIAL_ORDER = [1, 2, 3, 4, 8, 5, 7, 6, 0];

function boardFromOrder(order: number[]): PuzzleCell[] {
  return order.map((id) => (id === 0 ? null : TILES.find((tile) => tile.id === id) ?? null));
}

function isSolved(board: PuzzleCell[]): boolean {
  return board.every((tile, index) => tile?.id === GOAL[index]?.id);
}

function adjacent(first: number, second: number): boolean {
  const firstRow = Math.floor(first / 3);
  const firstColumn = first % 3;
  const secondRow = Math.floor(second / 3);
  const secondColumn = second % 3;
  return Math.abs(firstRow - secondRow) + Math.abs(firstColumn - secondColumn) === 1;
}

function shuffledBoard(seed: number): PuzzleCell[] {
  const board = [...GOAL];
  let blank = 8;
  let value = seed * 7919 + 17;
  let previousBlank = -1;

  for (let move = 0; move < 70; move += 1) {
    const candidates = board
      .map((_, index) => index)
      .filter((index) => adjacent(index, blank) && index !== previousBlank);
    value = (value * 48271) % 2147483647;
    const target = candidates[value % candidates.length];
    board[blank] = board[target];
    board[target] = null;
    previousBlank = blank;
    blank = target;
  }

  return isSolved(board) ? boardFromOrder(INITIAL_ORDER) : board;
}

export function EmojiPuzzleActivity() {
  const [board, setBoard] = useState<PuzzleCell[]>(() => boardFromOrder(INITIAL_ORDER));
  const [moves, setMoves] = useState(0);
  const [errors, setErrors] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const [started, setStarted] = useState(false);
  const [startedAt, setStartedAt] = useState(0);
  const [round, setRound] = useState(0);
  const [feedback, setFeedback] = useState(
    "Leia as instruções e selecione Iniciar quando estiver pronto.",
  );
  const solved = isSolved(board);

  useEffect(() => {
    if (!started || solved) return;
    const timer = window.setInterval(
      () => setElapsed(Math.floor((Date.now() - startedAt) / 1000)),
      1000,
    );
    return () => window.clearInterval(timer);
  }, [solved, started, startedAt]);

  const movableTiles = useMemo(() => {
    const blank = board.findIndex((tile) => tile === null);
    return new Set(board.map((_, index) => index).filter((index) => adjacent(index, blank)));
  }, [board]);

  function moveTile(index: number) {
    if (!started || solved) return;
    const blank = board.findIndex((tile) => tile === null);
    if (!adjacent(index, blank)) {
      setErrors((value) => value + 1);
      setFeedback("Essa peça não alcança o espaço vazio. Escolha uma peça ao lado dele.");
      return;
    }

    const next = [...board];
    next[blank] = next[index];
    next[index] = null;
    const nextMoves = moves + 1;
    setBoard(next);
    setMoves(nextMoves);
    setFeedback(
      isSolved(next)
        ? `Sequência concluída em ${nextMoves} movimentos. Excelente planejamento!`
        : "Boa escolha. Planeje o próximo movimento.",
    );
  }

  function startGame() {
    const nextRound = round + 1;
    setRound(nextRound);
    setBoard(shuffledBoard(nextRound));
    setMoves(0);
    setErrors(0);
    setElapsed(0);
    setStarted(true);
    setStartedAt(Date.now());
    setFeedback("Novo desafio iniciado. Organize as peças de 1 a 8.");
  }

  const points = solved ? Math.max(100, 1200 - moves * 12 - errors * 25 - elapsed * 2) : 0;

  return (
    <section className="exercise-game" aria-labelledby="emoji-puzzle-title">
      <div className="game-toolbar">
        <div>
          <h2 id="emoji-puzzle-title">Quebra-cabeça deslizante</h2>
          <p>
            Organize os emojis na ordem numérica. Apenas peças vizinhas ao espaço vazio
            podem ser movidas.
          </p>
        </div>
        <button
          type="button"
          className={`${started ? "game-secondary" : "game-primary"} game-control`}
          onClick={startGame}
        >
          {started ? "Novo tabuleiro" : "Iniciar"}
        </button>
      </div>

      <div className="game-stats" aria-label="Desempenho atual">
        <span className="game-stat">Nível: 3 × 3</span>
        <span className="game-stat">Movimentos: {moves}</span>
        <span className="game-stat">Tentativas inválidas: {errors}</span>
        <span className="game-stat">Tempo: {elapsed}s</span>
        <span className="game-stat">Pontos: {points}</span>
      </div>

      <div className="game-board" role="group" aria-label="Quebra-cabeça de nove posições">
        {board.map((tile, index) =>
          tile ? (
            <button
              type="button"
              key={tile.id}
              className={`game-control${movableTiles.has(index) ? " is-movable" : ""}`}
              onClick={() => moveTile(index)}
              disabled={!started || solved}
              aria-label={`Peça ${tile.id}, ${tile.label}, na linha ${Math.floor(index / 3) + 1}, coluna ${(index % 3) + 1}${
                movableTiles.has(index) ? ", pode ser movida" : ""
              }`}
            >
              <span aria-hidden="true">{tile.emoji}</span>
              <small>{tile.id}</small>
            </button>
          ) : (
            <span
              key="blank"
              className="game-control is-empty"
              aria-label={`Espaço vazio na linha ${Math.floor(index / 3) + 1}, coluna ${(index % 3) + 1}`}
            />
          ),
        )}
      </div>

      <p className="game-feedback" role="status" aria-live="polite">
        {feedback}
      </p>
      {solved && (
        <button type="button" className="game-primary game-control" onClick={startGame}>
          Jogar novamente
        </button>
      )}
    </section>
  );
}
