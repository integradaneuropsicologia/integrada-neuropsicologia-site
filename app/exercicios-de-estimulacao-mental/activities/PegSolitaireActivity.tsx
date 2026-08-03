"use client";

import { useMemo, useState } from "react";

type Cell = boolean | null;
type Board = Cell[][];
type Position = { row: number; column: number };

function createBoard(): Board {
  return Array.from({ length: 7 }, (_, row) =>
    Array.from({ length: 7 }, (_, column) => {
      const valid = (row >= 2 && row <= 4) || (column >= 2 && column <= 4);
      if (!valid) return null;
      return !(row === 3 && column === 3);
    }),
  );
}

function isLegalMove(board: Board, from: Position, to: Position) {
  if (board[from.row]?.[from.column] !== true || board[to.row]?.[to.column] !== false) {
    return false;
  }
  const rowDistance = to.row - from.row;
  const columnDistance = to.column - from.column;
  const isStraightJump =
    (Math.abs(rowDistance) === 2 && columnDistance === 0) ||
    (Math.abs(columnDistance) === 2 && rowDistance === 0);
  if (!isStraightJump) return false;

  const middle = {
    row: from.row + rowDistance / 2,
    column: from.column + columnDistance / 2,
  };
  return board[middle.row]?.[middle.column] === true;
}

function hasLegalMove(board: Board) {
  const offsets = [
    [-2, 0],
    [2, 0],
    [0, -2],
    [0, 2],
  ];
  return board.some((row, rowIndex) =>
    row.some((cell, columnIndex) =>
      cell === true &&
      offsets.some(([rowOffset, columnOffset]) =>
        isLegalMove(
          board,
          { row: rowIndex, column: columnIndex },
          { row: rowIndex + rowOffset, column: columnIndex + columnOffset },
        ),
      ),
    ),
  );
}

function countPegs(board: Board) {
  return board.flat().filter((cell) => cell === true).length;
}

export function PegSolitaireActivity() {
  const [board, setBoard] = useState<Board>(() => createBoard());
  const [selected, setSelected] = useState<Position | null>(null);
  const [moves, setMoves] = useState(0);
  const [history, setHistory] = useState<Board[]>([]);
  const [complete, setComplete] = useState(false);
  const [feedback, setFeedback] = useState(
    "Selecione uma peça e depois um espaço vazio a duas casas de distância.",
  );

  const remaining = useMemo(() => countPegs(board), [board]);
  const score = (32 - remaining) * 30 + (complete ? 100 : 0);

  function reset() {
    setBoard(createBoard());
    setSelected(null);
    setMoves(0);
    setHistory([]);
    setComplete(false);
    setFeedback("Tabuleiro reiniciado. Procure um salto que termine em uma casa vazia.");
  }

  function chooseCell(position: Position) {
    if (complete) return;
    const cell = board[position.row][position.column];

    if (!selected) {
      if (!cell) {
        setFeedback("Primeiro selecione uma peça que possa saltar.");
        return;
      }
      setSelected(position);
      setFeedback("Peça selecionada. Escolha a casa vazia de destino.");
      return;
    }

    if (selected.row === position.row && selected.column === position.column) {
      setSelected(null);
      setFeedback("Seleção cancelada.");
      return;
    }

    if (cell === true) {
      setSelected(position);
      setFeedback("Nova peça selecionada. Agora escolha uma casa vazia.");
      return;
    }

    if (!isLegalMove(board, selected, position)) {
      setFeedback("Esse salto não é válido. Salte exatamente uma peça na horizontal ou vertical.");
      return;
    }

    const nextBoard = board.map((row) => [...row]);
    const middle = {
      row: (selected.row + position.row) / 2,
      column: (selected.column + position.column) / 2,
    };
    nextBoard[selected.row][selected.column] = false;
    nextBoard[middle.row][middle.column] = false;
    nextBoard[position.row][position.column] = true;

    const nextRemaining = remaining - 1;
    const won = nextRemaining === 1;
    const noMoreMoves = !won && !hasLegalMove(nextBoard);

    setHistory((items) => [...items, board]);
    setBoard(nextBoard);
    setSelected(null);
    setMoves((value) => value + 1);
    setComplete(won);

    if (won) {
      const endedInCenter = nextBoard[3][3] === true;
      setFeedback(
        endedInCenter
          ? "Solução completa: restou uma única peça no centro."
          : "Muito bem: restou apenas uma peça no tabuleiro.",
      );
    } else if (noMoreMoves) {
      setFeedback("Não há mais saltos disponíveis. Desfaça uma jogada ou reinicie para testar outra estratégia.");
    } else {
      setFeedback("Salto válido. Antes da próxima jogada, observe todas as possibilidades.");
    }
  }

  function undo() {
    const previous = history[history.length - 1];
    if (!previous) return;
    setBoard(previous);
    setHistory((items) => items.slice(0, -1));
    setMoves((value) => Math.max(0, value - 1));
    setSelected(null);
    setComplete(false);
    setFeedback("Última jogada desfeita. Tente uma alternativa.");
  }

  return (
    <section className="exercise-game peg-game" aria-labelledby="peg-title">
      <div className="game-toolbar">
        <div>
          <p className="eyebrow">Raciocínio visual e resolução de problemas</p>
          <h2 id="peg-title">Resta Um</h2>
          <p>
            Salte uma peça sobre outra para uma casa vazia. A peça ultrapassada é
            removida; o objetivo é terminar com apenas uma.
          </p>
        </div>
        <div className="game-control">
          <button type="button" className="game-secondary" onClick={undo} disabled={history.length === 0}>
            Desfazer
          </button>
          <button type="button" className="game-primary" onClick={reset}>
            Nova partida
          </button>
        </div>
      </div>

      <div className="game-stats" aria-label="Desempenho da partida">
        <div className="game-stat"><span>Peças restantes</span><strong>{remaining}</strong></div>
        <div className="game-stat"><span>Movimentos</span><strong>{moves}</strong></div>
        <div className="game-stat"><span>Peças removidas</span><strong>{32 - remaining}</strong></div>
        <div className="game-stat"><span>Pontos</span><strong>{score}</strong></div>
      </div>

      <div
        className="game-board peg-board"
        role="group"
        aria-label={`Tabuleiro Resta Um com ${remaining} peças`}
        style={{ gridTemplateColumns: "repeat(7, 1fr)" }}
      >
        {board.flatMap((row, rowIndex) =>
          row.map((cell, columnIndex) => {
            const isSelected = selected?.row === rowIndex && selected.column === columnIndex;
            const isValidTarget = Boolean(
              selected &&
              cell === false &&
              isLegalMove(board, selected, { row: rowIndex, column: columnIndex }),
            );
            if (cell === null) {
              return <span className="peg-cell is-outside" aria-hidden="true" key={`${rowIndex}-${columnIndex}`} />;
            }
            return (
              <button
                type="button"
                className={`peg-cell${cell ? " has-peg" : " is-empty"}${isSelected ? " is-selected" : ""}${isValidTarget ? " is-valid-target" : ""}`}
                aria-label={`Linha ${rowIndex + 1}, coluna ${columnIndex + 1}: ${cell ? "com peça" : "vazia"}${isSelected ? ", selecionada" : ""}${isValidTarget ? ", destino válido" : ""}`}
                aria-pressed={isSelected}
                key={`${rowIndex}-${columnIndex}`}
                onClick={() => chooseCell({ row: rowIndex, column: columnIndex })}
              >
                {cell ? <span aria-hidden="true" /> : null}
              </button>
            );
          }),
        )}
      </div>

      <p className={`game-feedback${complete ? " is-success" : ""}`} aria-live="polite">
        {feedback}
      </p>

      <div className="game-control">
        <button type="button" className="game-secondary" onClick={reset}>
          Reiniciar
        </button>
      </div>
    </section>
  );
}
