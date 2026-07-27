"use client";

import { useMemo, useState } from "react";

type Rods = number[][];

const levelDisks = [3, 4, 5];

function createRods(disks: number): Rods {
  return [
    Array.from({ length: disks }, (_, index) => disks - index),
    [],
    [],
  ];
}

export function HanoiActivity() {
  const [levelIndex, setLevelIndex] = useState(0);
  const [rods, setRods] = useState<Rods>(() => createRods(levelDisks[0]));
  const [selectedRod, setSelectedRod] = useState<number | null>(null);
  const [moves, setMoves] = useState(0);
  const [complete, setComplete] = useState(false);
  const [feedback, setFeedback] = useState(
    "Selecione a estaca de origem e depois a estaca de destino.",
  );
  const [bestMoves, setBestMoves] = useState<Record<number, number>>({});

  const disks = levelDisks[levelIndex];
  const minimumMoves = 2 ** disks - 1;
  const score = useMemo(() => {
    if (!complete) return 0;
    return Math.max(100, 1000 - Math.max(0, moves - minimumMoves) * 30);
  }, [complete, minimumMoves, moves]);

  function reset(nextLevelIndex = levelIndex) {
    setLevelIndex(nextLevelIndex);
    setRods(createRods(levelDisks[nextLevelIndex]));
    setSelectedRod(null);
    setMoves(0);
    setComplete(false);
    setFeedback("Nova rodada iniciada. Escolha uma estaca com discos.");
  }

  function selectRod(rodIndex: number) {
    if (complete) return;

    if (selectedRod === null) {
      if (rods[rodIndex].length === 0) {
        setFeedback("Essa estaca está vazia. Escolha uma estaca com discos.");
        return;
      }
      setSelectedRod(rodIndex);
      setFeedback(
        `Disco ${rods[rodIndex][rods[rodIndex].length - 1]} selecionado. Agora escolha o destino.`,
      );
      return;
    }

    if (selectedRod === rodIndex) {
      setSelectedRod(null);
      setFeedback("Seleção cancelada.");
      return;
    }

    const movingDisk = rods[selectedRod][rods[selectedRod].length - 1];
    const targetTop = rods[rodIndex][rods[rodIndex].length - 1];

    if (targetTop !== undefined && targetTop < movingDisk) {
      setFeedback("Movimento inválido: um disco maior não pode ficar sobre um menor.");
      return;
    }

    const nextRods = rods.map((rod) => [...rod]);
    nextRods[selectedRod].pop();
    nextRods[rodIndex].push(movingDisk);
    const nextMoves = moves + 1;
    const hasWon = nextRods[2].length === disks;

    setRods(nextRods);
    setMoves(nextMoves);
    setSelectedRod(null);

    if (hasWon) {
      setComplete(true);
      setBestMoves((values) => ({
        ...values,
        [levelIndex]: Math.min(values[levelIndex] ?? nextMoves, nextMoves),
      }));
      setFeedback(
        nextMoves === minimumMoves
          ? "Solução ideal: você concluiu com o menor número possível de movimentos."
          : "Desafio concluído. Tente novamente para reduzir seus movimentos.",
      );
    } else {
      setFeedback(`Disco ${movingDisk} movido para a estaca ${rodIndex + 1}.`);
    }
  }

  return (
    <section className="exercise-game hanoi-game" aria-labelledby="hanoi-title">
      <div className="game-toolbar">
        <div>
          <p className="eyebrow">Raciocínio e antecipação</p>
          <h2 id="hanoi-title">Torre de Hanói</h2>
          <p>
            Transfira a torre para a terceira estaca. Mova apenas um disco por vez
            e nunca coloque um disco maior sobre um menor.
          </p>
        </div>
        <div className="game-control" aria-label="Selecionar dificuldade">
          {levelDisks.map((amount, index) => (
            <button
              type="button"
              className={index === levelIndex ? "game-primary" : "game-secondary"}
              aria-pressed={index === levelIndex}
              key={amount}
              onClick={() => reset(index)}
            >
              {amount} discos
            </button>
          ))}
        </div>
      </div>

      <div className="game-stats" aria-label="Desempenho da rodada">
        <div className="game-stat"><span>Movimentos</span><strong>{moves}</strong></div>
        <div className="game-stat"><span>Mínimo</span><strong>{minimumMoves}</strong></div>
        <div className="game-stat"><span>Melhor marca</span><strong>{bestMoves[levelIndex] ?? "—"}</strong></div>
        <div className="game-stat"><span>Pontos</span><strong>{score}</strong></div>
      </div>

      <div className="game-board hanoi-board" role="group" aria-label="Três estacas da Torre de Hanói">
        {rods.map((rod, rodIndex) => {
          const topDisk = rod[rod.length - 1];
          return (
            <button
              type="button"
              className={`hanoi-rod${selectedRod === rodIndex ? " is-selected" : ""}`}
              aria-pressed={selectedRod === rodIndex}
              aria-label={`Estaca ${rodIndex + 1}, ${rod.length === 0 ? "vazia" : `${rod.length} discos, de baixo para cima: ${rod.join(", ")}; disco do topo: ${topDisk}`}${selectedRod === rodIndex ? "; selecionada" : ""}`}
              key={rodIndex}
              onClick={() => selectRod(rodIndex)}
            >
              <span className="hanoi-post" aria-hidden="true" />
              <span className="hanoi-disc-stack" aria-hidden="true">
                {rod.map((disk) => (
                  <span
                    className="hanoi-disc"
                    data-size={disk}
                    key={disk}
                    style={{ width: `${30 + (disk / disks) * 62}%` }}
                  >
                    {disk}
                  </span>
                ))}
              </span>
              <span className="hanoi-base" aria-hidden="true" />
              <span className="hanoi-rod-label">Estaca {rodIndex + 1}</span>
            </button>
          );
        })}
      </div>

      <p className={`game-feedback${complete ? " is-success" : ""}`} aria-live="polite">
        {feedback}
      </p>

      <div className="game-control">
        <button type="button" className="game-secondary" onClick={() => reset()}>
          Reiniciar
        </button>
        <button
          type="button"
          className="game-primary"
          onClick={() => reset((levelIndex + 1) % levelDisks.length)}
        >
          Nova rodada
        </button>
      </div>
    </section>
  );
}
