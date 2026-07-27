"use client";

import { useEffect, useMemo, useState } from "react";

type Cell = { row: number; column: number };
type WordPlacement = { word: string; cells: Cell[] };

const SIZE = 10;
const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

function line(row: number, column: number, dr: number, dc: number, word: string): Cell[] {
  return [...word].map((_, index) => ({
    row: row + dr * index,
    column: column + dc * index,
  }));
}

const PLACEMENTS: WordPlacement[] = [
  { word: "MEMORIA", cells: line(0, 0, 0, 1, "MEMORIA") },
  { word: "FOCO", cells: line(1, 8, 1, 0, "FOCO") },
  { word: "IDEIA", cells: line(2, 0, 1, 1, "IDEIA") },
  { word: "ATENCAO", cells: line(9, 0, 0, 1, "ATENCAO") },
  { word: "LOGICA", cells: line(0, 9, 1, 0, "LOGICA") },
  { word: "LEITURA", cells: line(7, 9, 0, -1, "LEITURA") },
];

function buildBoard(): string[][] {
  const board = Array.from({ length: SIZE }, (_, row) =>
    Array.from({ length: SIZE }, (_, column) => ALPHABET[(row * 7 + column * 11 + 3) % ALPHABET.length]),
  );

  for (const placement of PLACEMENTS) {
    placement.cells.forEach((cell, index) => {
      board[cell.row][cell.column] = placement.word[index];
    });
  }

  return board;
}

const BOARD = buildBoard();

function cellKey(cell: Cell): string {
  return `${cell.row}-${cell.column}`;
}

function samePath(first: Cell[], second: Cell[]): boolean {
  if (first.length !== second.length) return false;
  const forward = first.every((cell, index) => cellKey(cell) === cellKey(second[index]));
  const reverse = first.every(
    (cell, index) => cellKey(cell) === cellKey(second[second.length - 1 - index]),
  );
  return forward || reverse;
}

function pathBetween(start: Cell, end: Cell): Cell[] | null {
  const rowDistance = end.row - start.row;
  const columnDistance = end.column - start.column;
  const isStraight = rowDistance === 0 || columnDistance === 0;
  const isDiagonal = Math.abs(rowDistance) === Math.abs(columnDistance);
  if (!isStraight && !isDiagonal) return null;

  const steps = Math.max(Math.abs(rowDistance), Math.abs(columnDistance));
  const dr = steps === 0 ? 0 : rowDistance / steps;
  const dc = steps === 0 ? 0 : columnDistance / steps;
  return Array.from({ length: steps + 1 }, (_, index) => ({
    row: start.row + dr * index,
    column: start.column + dc * index,
  }));
}

export function WordSearchActivity() {
  const [start, setStart] = useState<Cell | null>(null);
  const [found, setFound] = useState<string[]>([]);
  const [errors, setErrors] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const [started, setStarted] = useState(false);
  const [startedAt, setStartedAt] = useState(0);
  const [feedback, setFeedback] = useState(
    "Leia as instruções e selecione Iniciar quando estiver pronto.",
  );

  const completed = found.length === PLACEMENTS.length;
  const foundCells = useMemo(() => {
    const keys = new Set<string>();
    PLACEMENTS.filter((placement) => found.includes(placement.word)).forEach((placement) =>
      placement.cells.forEach((cell) => keys.add(cellKey(cell))),
    );
    return keys;
  }, [found]);

  useEffect(() => {
    if (!started || completed) return;
    const timer = window.setInterval(
      () => setElapsed(Math.floor((Date.now() - startedAt) / 1000)),
      1000,
    );
    return () => window.clearInterval(timer);
  }, [completed, started, startedAt]);

  function selectCell(cell: Cell) {
    if (!started || completed) return;

    if (!start) {
      setStart(cell);
      setFeedback("Agora escolha a última letra da palavra.");
      return;
    }

    const path = pathBetween(start, cell);
    setStart(null);
    if (!path || path.length < 2) {
      setErrors((value) => value + 1);
      setFeedback("A seleção deve formar uma linha horizontal, vertical ou diagonal.");
      return;
    }

    const placement = PLACEMENTS.find((candidate) => samePath(candidate.cells, path));
    if (!placement) {
      setErrors((value) => value + 1);
      setFeedback("Essa sequência não está na lista. Observe a grade e tente novamente.");
      return;
    }

    if (found.includes(placement.word)) {
      setFeedback(`${placement.word} já foi encontrada. Procure outra palavra.`);
      return;
    }

    const nextFound = [...found, placement.word];
    setFound(nextFound);
    setFeedback(
      nextFound.length === PLACEMENTS.length
        ? "Excelente! Você localizou todas as palavras."
        : `${placement.word} encontrada! Continue procurando.`,
    );
  }

  function startGame() {
    setStart(null);
    setFound([]);
    setErrors(0);
    setElapsed(0);
    setStarted(true);
    setStartedAt(Date.now());
    setFeedback("Atividade iniciada. Escolha a primeira e a última letra de uma palavra.");
  }

  const score = found.length * 100 - errors * 10;

  return (
    <section className="exercise-game" aria-labelledby="word-search-title">
      <div className="game-toolbar">
        <div>
          <h2 id="word-search-title">Caça-palavras cognitivo</h2>
          <p>
            Encontre as seis palavras. Selecione a primeira e depois a última letra; elas
            podem estar na horizontal, vertical ou diagonal.
          </p>
        </div>
        <button
          type="button"
          className={`${started ? "game-secondary" : "game-primary"} game-control`}
          onClick={startGame}
        >
          {started ? "Reiniciar" : "Iniciar"}
        </button>
      </div>

      <div className="game-stats" aria-label="Desempenho atual">
        <span className="game-stat">Encontradas: {found.length}/{PLACEMENTS.length}</span>
        <span className="game-stat">Erros: {errors}</span>
        <span className="game-stat">Pontos: {Math.max(0, score)}</span>
        <span className="game-stat">Tempo: {elapsed}s</span>
      </div>

      <div className="game-board" role="group" aria-label="Grade do caça-palavras">
        {BOARD.map((row, rowIndex) =>
          row.map((letter, columnIndex) => {
            const cell = { row: rowIndex, column: columnIndex };
            const key = cellKey(cell);
            const isStart = start ? cellKey(start) === key : false;
            const isFound = foundCells.has(key);
            return (
              <button
                type="button"
                key={key}
                className={`game-control${isStart ? " is-selected" : ""}${isFound ? " is-correct" : ""}`}
                aria-label={`Linha ${rowIndex + 1}, coluna ${columnIndex + 1}: letra ${letter}${
                  isFound ? ", palavra encontrada" : isStart ? ", início selecionado" : ""
                }`}
                onClick={() => selectCell(cell)}
                disabled={!started || completed}
              >
                {letter}
              </button>
            );
          }),
        )}
      </div>

      <div aria-label="Palavras a encontrar">
        <strong>Palavras:</strong>{" "}
        {PLACEMENTS.map((placement) => (
          <span key={placement.word} className="game-stat">
            {found.includes(placement.word) ? `✓ ${placement.word}` : placement.word}
          </span>
        ))}
      </div>

      <p className="game-feedback" role="status" aria-live="polite">
        {feedback}
      </p>
    </section>
  );
}
