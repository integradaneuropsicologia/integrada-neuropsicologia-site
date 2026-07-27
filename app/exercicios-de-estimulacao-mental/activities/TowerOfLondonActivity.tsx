"use client";

import { useMemo, useState } from "react";

type Ball = "azul" | "vermelha" | "verde";
type Stacks = Ball[][];

type TowerLevel = {
  name: string;
  initial: Stacks;
  target: Stacks;
};

const capacities = [3, 2, 1];

const ballClassNames: Record<Ball, string> = {
  azul: "is-blue",
  vermelha: "is-red",
  verde: "is-green",
};

const levels: TowerLevel[] = [
  {
    name: "Direto",
    initial: [["azul", "vermelha"], ["verde"], []],
    target: [["azul"], ["verde", "vermelha"], []],
  },
  {
    name: "Planejado",
    initial: [["azul", "vermelha"], ["verde"], []],
    target: [["vermelha", "azul"], [], ["verde"]],
  },
  {
    name: "Estratégico",
    initial: [["azul", "vermelha"], ["verde"], []],
    target: [["verde", "azul"], ["vermelha"], []],
  },
];

function cloneStacks(stacks: Stacks): Stacks {
  return stacks.map((stack) => [...stack]);
}

function serialize(stacks: Stacks) {
  return stacks.map((stack) => stack.join(",")).join("|");
}

function stacksMatch(first: Stacks, second: Stacks) {
  return serialize(first) === serialize(second);
}

function describeStacks(stacks: Stacks) {
  return stacks
    .map((stack, index) =>
      stack.length === 0
        ? `Haste ${index + 1}, vazia`
        : `Haste ${index + 1}, de baixo para cima: ${stack.join(", ")}`,
    )
    .join(". ");
}

function calculateMinimumMoves(level: TowerLevel) {
  const target = serialize(level.target);
  const queue: Array<{ stacks: Stacks; distance: number }> = [
    { stacks: cloneStacks(level.initial), distance: 0 },
  ];
  const visited = new Set([serialize(level.initial)]);

  while (queue.length > 0) {
    const current = queue.shift();
    if (!current) break;
    if (serialize(current.stacks) === target) return current.distance;

    current.stacks.forEach((source, sourceIndex) => {
      if (source.length === 0) return;
      current.stacks.forEach((destination, destinationIndex) => {
        if (sourceIndex === destinationIndex || destination.length >= capacities[destinationIndex]) return;
        const next = cloneStacks(current.stacks);
        const ball = next[sourceIndex].pop();
        if (!ball) return;
        next[destinationIndex].push(ball);
        const key = serialize(next);
        if (!visited.has(key)) {
          visited.add(key);
          queue.push({ stacks: next, distance: current.distance + 1 });
        }
      });
    });
  }

  return 0;
}

function BallStack({ stack }: { stack: Ball[] }) {
  return (
    <span className="london-ball-stack" aria-hidden="true">
      {stack.map((ball) => (
        <span className={`london-ball ${ballClassNames[ball]}`} key={ball} />
      ))}
    </span>
  );
}

export function TowerOfLondonActivity() {
  const [levelIndex, setLevelIndex] = useState(0);
  const [stacks, setStacks] = useState<Stacks>(() => cloneStacks(levels[0].initial));
  const [selectedPeg, setSelectedPeg] = useState<number | null>(null);
  const [moves, setMoves] = useState(0);
  const [history, setHistory] = useState<Stacks[]>([]);
  const [complete, setComplete] = useState(false);
  const [feedback, setFeedback] = useState(
    "Compare sua montagem com o modelo e planeje os movimentos antes de começar.",
  );

  const level = levels[levelIndex];
  const minimumMoves = useMemo(() => calculateMinimumMoves(level), [level]);
  const score = complete
    ? Math.max(100, 1000 - Math.max(0, moves - minimumMoves) * 60)
    : 0;

  function reset(nextLevelIndex = levelIndex) {
    setLevelIndex(nextLevelIndex);
    setStacks(cloneStacks(levels[nextLevelIndex].initial));
    setSelectedPeg(null);
    setMoves(0);
    setHistory([]);
    setComplete(false);
    setFeedback("Nova rodada iniciada. Observe o modelo antes do primeiro movimento.");
  }

  function selectPeg(pegIndex: number) {
    if (complete) return;

    if (selectedPeg === null) {
      const topBall = stacks[pegIndex][stacks[pegIndex].length - 1];
      if (!topBall) {
        setFeedback("Essa haste está vazia. Selecione uma haste com uma bola no topo.");
        return;
      }
      setSelectedPeg(pegIndex);
      setFeedback(`Bola ${topBall} selecionada. Agora escolha uma haste de destino.`);
      return;
    }

    if (selectedPeg === pegIndex) {
      setSelectedPeg(null);
      setFeedback("Seleção cancelada.");
      return;
    }

    if (stacks[pegIndex].length >= capacities[pegIndex]) {
      setFeedback(`A haste ${pegIndex + 1} atingiu sua capacidade máxima.`);
      return;
    }

    const nextStacks = cloneStacks(stacks);
    const ball = nextStacks[selectedPeg].pop();
    if (!ball) return;
    nextStacks[pegIndex].push(ball);
    const nextMoves = moves + 1;
    const hasWon = stacksMatch(nextStacks, level.target);

    setHistory((items) => [...items, stacks]);
    setStacks(nextStacks);
    setSelectedPeg(null);
    setMoves(nextMoves);
    setComplete(hasWon);

    if (hasWon) {
      setFeedback(
        nextMoves === minimumMoves
          ? "Objetivo alcançado com o menor número possível de movimentos."
          : "Objetivo alcançado. Refaça o desafio tentando antecipar uma rota mais curta.",
      );
    } else {
      setFeedback(`Bola ${ball} movida. Compare novamente com o modelo-alvo.`);
    }
  }

  function undo() {
    const previous = history[history.length - 1];
    if (!previous) return;
    setStacks(previous);
    setHistory((items) => items.slice(0, -1));
    setMoves((value) => Math.max(0, value - 1));
    setSelectedPeg(null);
    setComplete(false);
    setFeedback("Movimento desfeito. Reavalie o plano antes de continuar.");
  }

  return (
    <section className="exercise-game london-game" aria-labelledby="london-title">
      <div className="game-toolbar">
        <div>
          <p className="eyebrow">Planejamento e funções executivas</p>
          <h2 id="london-title">Torre de Londres</h2>
          <p>
            Reproduza o modelo-alvo movendo apenas a bola do topo de cada haste.
            As hastes comportam três, duas e uma bola, respectivamente.
          </p>
        </div>
        <div className="game-control" aria-label="Selecionar nível">
          {levels.map((item, index) => (
            <button
              type="button"
              className={index === levelIndex ? "game-primary" : "game-secondary"}
              aria-pressed={index === levelIndex}
              key={item.name}
              onClick={() => reset(index)}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>

      <div className="game-stats" aria-label="Desempenho da rodada">
        <div className="game-stat"><span>Nível</span><strong>{level.name}</strong></div>
        <div className="game-stat"><span>Movimentos</span><strong>{moves}</strong></div>
        <div className="game-stat"><span>Melhor solução</span><strong>{minimumMoves}</strong></div>
        <div className="game-stat"><span>Pontos</span><strong>{score}</strong></div>
      </div>

      <div
        className="london-target"
        role="img"
        aria-label={`Modelo-alvo. ${describeStacks(level.target)}.`}
      >
        <strong>Modelo-alvo</strong>
        <div className="game-board london-board is-target">
          {level.target.map((stack, index) => (
            <div className="london-peg" key={index}>
              <span className="london-post" aria-hidden="true" />
              <BallStack stack={stack} />
              <span className="london-capacity">máx. {capacities[index]}</span>
            </div>
          ))}
        </div>
      </div>

      <div
        className="game-board london-board"
        role="group"
        aria-label={`Sua torre. ${describeStacks(stacks)}.`}
      >
        {stacks.map((stack, index) => {
          const topBall = stack[stack.length - 1];
          return (
            <button
              type="button"
              className={`london-peg${selectedPeg === index ? " is-selected" : ""}`}
              aria-pressed={selectedPeg === index}
              aria-label={`Haste ${index + 1}, capacidade ${capacities[index]}, ${stack.length === 0 ? "vazia" : `bolas de baixo para cima: ${stack.join(", ")}; bola do topo: ${topBall}`}${selectedPeg === index ? "; selecionada" : ""}`}
              key={index}
              onClick={() => selectPeg(index)}
            >
              <span className="london-post" aria-hidden="true" />
              <BallStack stack={stack} />
              <span className="london-capacity">máx. {capacities[index]}</span>
            </button>
          );
        })}
      </div>

      <p className={`game-feedback${complete ? " is-success" : ""}`} aria-live="polite">
        {feedback}
      </p>

      <div className="game-control">
        <button type="button" className="game-secondary" onClick={undo} disabled={history.length === 0}>
          Desfazer
        </button>
        <button type="button" className="game-secondary" onClick={() => reset()}>
          Reiniciar
        </button>
        <button
          type="button"
          className="game-primary"
          onClick={() => reset((levelIndex + 1) % levels.length)}
        >
          Nova rodada
        </button>
      </div>
    </section>
  );
}
