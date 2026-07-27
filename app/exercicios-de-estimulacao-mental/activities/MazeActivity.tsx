"use client";

import type { CSSProperties, KeyboardEvent as ReactKeyboardEvent } from "react";
import { useCallback, useMemo, useState } from "react";

type Position = { row: number; column: number };

type MazeLevel = {
  name: string;
  grid: string[];
};

const levels: MazeLevel[] = [
  {
    name: "Inicial",
    grid: [
      "#######",
      "#S....#",
      "###.#.#",
      "#...#.#",
      "#.###.#",
      "#....G#",
      "#######",
    ],
  },
  {
    name: "Intermediário",
    grid: [
      "#########",
      "#S#.....#",
      "#.#.###.#",
      "#.#...#.#",
      "#.###.#.#",
      "#.....#.#",
      "#####.#.#",
      "#......G#",
      "#########",
    ],
  },
  {
    name: "Avançado",
    grid: [
      "###########",
      "#S..#.....#",
      "###.#.###.#",
      "#...#...#.#",
      "#.#####.#.#",
      "#.#.....#.#",
      "#.#.#####.#",
      "#.#.......#",
      "#.#######.#",
      "#........G#",
      "###########",
    ],
  },
];

const directions = {
  up: { row: -1, column: 0, label: "cima" },
  down: { row: 1, column: 0, label: "baixo" },
  left: { row: 0, column: -1, label: "esquerda" },
  right: { row: 0, column: 1, label: "direita" },
} as const;

type Direction = keyof typeof directions;

function findCell(grid: string[], value: "S" | "G"): Position {
  for (let row = 0; row < grid.length; row += 1) {
    const column = grid[row].indexOf(value);
    if (column >= 0) return { row, column };
  }
  return { row: 1, column: 1 };
}

function shortestPathLength(grid: string[]) {
  const start = findCell(grid, "S");
  const goal = findCell(grid, "G");
  const queue: Array<{ position: Position; distance: number }> = [
    { position: start, distance: 0 },
  ];
  const visited = new Set([`${start.row}:${start.column}`]);

  while (queue.length > 0) {
    const current = queue.shift();
    if (!current) break;
    if (
      current.position.row === goal.row &&
      current.position.column === goal.column
    ) {
      return current.distance;
    }

    Object.values(directions).forEach((direction) => {
      const next = {
        row: current.position.row + direction.row,
        column: current.position.column + direction.column,
      };
      const key = `${next.row}:${next.column}`;
      if (grid[next.row]?.[next.column] !== "#" && !visited.has(key)) {
        visited.add(key);
        queue.push({ position: next, distance: current.distance + 1 });
      }
    });
  }

  return 0;
}

export function MazeActivity() {
  const [levelIndex, setLevelIndex] = useState(0);
  const [position, setPosition] = useState(() => findCell(levels[0].grid, "S"));
  const [moves, setMoves] = useState(0);
  const [complete, setComplete] = useState(false);
  const [feedback, setFeedback] = useState(
    "Observe o percurso antes de começar e conduza o marcador até a chegada.",
  );
  const [bestScores, setBestScores] = useState<Record<number, number>>({});

  const level = levels[levelIndex];
  const goal = useMemo(() => findCell(level.grid, "G"), [level.grid]);
  const optimalMoves = useMemo(() => shortestPathLength(level.grid), [level.grid]);
  const currentScore = complete
    ? Math.max(100, 1000 - Math.max(0, moves - optimalMoves) * 40)
    : 0;

  const resetLevel = useCallback(
    (nextLevelIndex = levelIndex) => {
      setLevelIndex(nextLevelIndex);
      setPosition(findCell(levels[nextLevelIndex].grid, "S"));
      setMoves(0);
      setComplete(false);
      setFeedback("Percurso reiniciado. Planeje a rota antes de mover.");
    },
    [levelIndex],
  );

  const move = useCallback(
    (directionName: Direction) => {
      if (complete) return;

      const direction = directions[directionName];
      const next = {
        row: position.row + direction.row,
        column: position.column + direction.column,
      };

      if (!level.grid[next.row] || level.grid[next.row][next.column] === "#") {
        setFeedback(`Há uma parede à ${direction.label}. Tente outra rota.`);
        return;
      }

      const nextMoves = moves + 1;
      setPosition(next);
      setMoves(nextMoves);

      if (next.row === goal.row && next.column === goal.column) {
        const score = Math.max(
          100,
          1000 - Math.max(0, nextMoves - optimalMoves) * 40,
        );
        setComplete(true);
        setBestScores((scores) => ({
          ...scores,
          [levelIndex]: Math.max(scores[levelIndex] ?? 0, score),
        }));
        setFeedback(
          nextMoves === optimalMoves
            ? "Excelente: você encontrou o caminho mais curto."
            : "Chegada alcançada. Reinicie para tentar uma rota mais eficiente.",
        );
      } else {
        setFeedback(`Movimento para ${direction.label} realizado.`);
      }
    },
    [complete, goal, level.grid, levelIndex, moves, optimalMoves, position],
  );

  function handleBoardKeyDown(event: ReactKeyboardEvent<HTMLDivElement>) {
    const keyMap: Record<string, Direction | undefined> = {
      ArrowUp: "up",
      w: "up",
      W: "up",
      ArrowDown: "down",
      s: "down",
      S: "down",
      ArrowLeft: "left",
      a: "left",
      A: "left",
      ArrowRight: "right",
      d: "right",
      D: "right",
    };
    const direction = keyMap[event.key];
    if (!direction) return;
    event.preventDefault();
    move(direction);
  }

  function nextLevel() {
    resetLevel((levelIndex + 1) % levels.length);
  }

  return (
    <section className="exercise-game maze-game" aria-labelledby="maze-title">
      <div className="game-toolbar">
        <div>
          <p className="eyebrow">Planejamento e orientação visuoespacial</p>
          <h2 id="maze-title">Labirinto</h2>
          <p id="maze-keyboard-instructions">
            Leve o ponto azul até a chegada. Use as setas do teclado, W/A/S/D ou
            os botões de direção. Para usar o teclado, primeiro focalize o tabuleiro.
          </p>
        </div>
        <div className="game-control" aria-label="Selecionar nível">
          {levels.map((item, index) => (
            <button
              type="button"
              className={index === levelIndex ? "game-primary" : "game-secondary"}
              aria-pressed={index === levelIndex}
              key={item.name}
              onClick={() => resetLevel(index)}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>

      <div className="game-stats" aria-label="Desempenho da rodada">
        <div className="game-stat"><span>Nível</span><strong>{level.name}</strong></div>
        <div className="game-stat"><span>Movimentos</span><strong>{moves}</strong></div>
        <div className="game-stat"><span>Referência</span><strong>{optimalMoves}</strong></div>
        <div className="game-stat">
          <span>Pontos</span><strong>{currentScore || bestScores[levelIndex] || 0}</strong>
        </div>
      </div>

      <div
        className="game-board maze-board"
        role="group"
        tabIndex={0}
        onKeyDown={handleBoardKeyDown}
        aria-describedby="maze-keyboard-instructions"
        aria-label={`Labirinto ${level.name}, com ${level.grid.length} linhas e ${level.grid[0].length} colunas. Sua posição está na linha ${position.row + 1}, coluna ${position.column + 1}. A chegada está na linha ${goal.row + 1}, coluna ${goal.column + 1}.`}
        style={{ "--maze-columns": level.grid[0].length } as CSSProperties}
      >
        {level.grid.flatMap((row, rowIndex) =>
          [...row].map((cell, columnIndex) => {
            const isPlayer =
              position.row === rowIndex && position.column === columnIndex;
            const isGoal = cell === "G";
            const isWall = cell === "#";
            return (
              <span
                className={`maze-cell${isWall ? " is-wall" : ""}${isGoal ? " is-goal" : ""}${isPlayer ? " is-player" : ""}`}
                aria-hidden="true"
                key={`${rowIndex}-${columnIndex}`}
              >
                {isPlayer ? "●" : isGoal ? "◆" : ""}
              </span>
            );
          }),
        )}
      </div>

      <div className="maze-controls game-control" aria-label="Controles do labirinto">
        <button type="button" className="game-secondary maze-up" onClick={() => move("up")} aria-label="Mover para cima">↑</button>
        <button type="button" className="game-secondary" onClick={() => move("left")} aria-label="Mover para a esquerda">←</button>
        <button type="button" className="game-secondary" onClick={() => move("down")} aria-label="Mover para baixo">↓</button>
        <button type="button" className="game-secondary" onClick={() => move("right")} aria-label="Mover para a direita">→</button>
      </div>

      <p className={`game-feedback${complete ? " is-success" : ""}`} aria-live="polite">
        {feedback}
      </p>

      <div className="game-control">
        <button type="button" className="game-secondary" onClick={() => resetLevel()}>
          Reiniciar nível
        </button>
        <button type="button" className="game-primary" onClick={nextLevel}>
          Próximo nível
        </button>
      </div>
    </section>
  );
}
