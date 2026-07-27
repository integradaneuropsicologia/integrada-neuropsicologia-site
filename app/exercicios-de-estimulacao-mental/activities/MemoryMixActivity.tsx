"use client";

import { useEffect, useState } from "react";

type Level = 4 | 6 | 8;
type Card = {
  uid: string;
  pairId: string;
  symbol: string;
  label: string;
};

const SYMBOLS = [
  { pairId: "brain", symbol: "🧠", label: "cérebro" },
  { pairId: "book", symbol: "📖", label: "livro" },
  { pairId: "music", symbol: "🎵", label: "nota musical" },
  { pairId: "leaf", symbol: "🍃", label: "folha" },
  { pairId: "compass", symbol: "🧭", label: "bússola" },
  { pairId: "lamp", symbol: "💡", label: "lâmpada" },
  { pairId: "puzzle", symbol: "🧩", label: "quebra-cabeça" },
  { pairId: "target", symbol: "🎯", label: "alvo" },
];

const LEVEL_LABELS: Record<Level, string> = {
  4: "Inicial",
  6: "Intermediário",
  8: "Avançado",
};

function shuffledCards(pairCount: Level, seed: number): Card[] {
  const cards = SYMBOLS.slice(0, pairCount).flatMap((item) => [
    { ...item, uid: `${item.pairId}-a` },
    { ...item, uid: `${item.pairId}-b` },
  ]);
  let value = seed * 104729 + pairCount;

  for (let index = cards.length - 1; index > 0; index -= 1) {
    value = (value * 48271) % 2147483647;
    const target = value % (index + 1);
    [cards[index], cards[target]] = [cards[target], cards[index]];
  }
  return cards;
}

export function MemoryMixActivity() {
  const [level, setLevel] = useState<Level>(4);
  const [seed, setSeed] = useState(1);
  const [cards, setCards] = useState<Card[]>(() => shuffledCards(4, 1));
  const [openCards, setOpenCards] = useState<number[]>([]);
  const [matchedPairs, setMatchedPairs] = useState<string[]>([]);
  const [pendingTurn, setPendingTurn] = useState<{ first: number; second: number } | null>(null);
  const [hits, setHits] = useState(0);
  const [errors, setErrors] = useState(0);
  const [moves, setMoves] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const [started, setStarted] = useState(false);
  const [startedAt, setStartedAt] = useState(0);
  const [feedback, setFeedback] = useState(
    "Escolha um nível e selecione Iniciar quando estiver pronto.",
  );
  const completed = matchedPairs.length === level;

  useEffect(() => {
    if (!started || completed) return;
    const timer = window.setInterval(
      () => setElapsed(Math.floor((Date.now() - startedAt) / 1000)),
      1000,
    );
    return () => window.clearInterval(timer);
  }, [completed, started, startedAt]);

  useEffect(() => {
    if (!pendingTurn) return;
    const firstCard = cards[pendingTurn.first];
    const secondCard = cards[pendingTurn.second];
    const isMatch = firstCard.pairId === secondCard.pairId;
    const delay = isMatch ? 500 : 1100;
    const timer = window.setTimeout(() => {
      setOpenCards([]);
      setPendingTurn(null);
    }, delay);
    return () => window.clearTimeout(timer);
  }, [cards, pendingTurn]);

  function chooseCard(index: number) {
    const card = cards[index];
    if (
      !started ||
      pendingTurn ||
      openCards.includes(index) ||
      matchedPairs.includes(card.pairId) ||
      completed
    ) {
      return;
    }

    if (openCards.length === 0) {
      setOpenCards([index]);
      setFeedback("Agora encontre a carta correspondente.");
      return;
    }

    const first = openCards[0];
    const firstCard = cards[first];
    const isMatch = firstCard.pairId === card.pairId;
    setOpenCards([first, index]);
    setPendingTurn({ first, second: index });
    setMoves((value) => value + 1);

    if (isMatch) {
      const nextPairs = [...matchedPairs, card.pairId];
      setHits((value) => value + 1);
      setMatchedPairs(nextPairs);
      setFeedback(
        nextPairs.length === level
          ? "Todos os pares foram encontrados. Ótimo trabalho de memória visual!"
          : `Par de ${card.label} encontrado!`,
      );
    } else {
      setErrors((value) => value + 1);
      setFeedback("As cartas são diferentes. Memorize as posições antes que elas virem.");
    }
  }

  function startGame() {
    const nextSeed = seed + 1;
    setSeed(nextSeed);
    setCards(shuffledCards(level, nextSeed));
    setOpenCards([]);
    setMatchedPairs([]);
    setPendingTurn(null);
    setHits(0);
    setErrors(0);
    setMoves(0);
    setElapsed(0);
    setStarted(true);
    setStartedAt(Date.now());
    setFeedback(`Nível ${LEVEL_LABELS[level]} iniciado. Encontre os pares.`);
  }

  function prepareLevel(nextLevel: Level) {
    setLevel(nextLevel);
    setCards(shuffledCards(nextLevel, seed));
    setOpenCards([]);
    setMatchedPairs([]);
    setPendingTurn(null);
    setHits(0);
    setErrors(0);
    setMoves(0);
    setElapsed(0);
    setStarted(false);
    setStartedAt(0);
    setFeedback(`Nível ${LEVEL_LABELS[nextLevel]} selecionado. Clique em Iniciar quando estiver pronto.`);
  }

  const points = Math.max(0, hits * 120 - errors * 15);

  return (
    <section className="exercise-game" aria-labelledby="memory-mix-title">
      <div className="game-toolbar">
        <div>
          <h2 id="memory-mix-title">Memória mix</h2>
          <p>Vire duas cartas por vez e use a memória visual para localizar todos os pares.</p>
        </div>
        <label className="game-control">
          Nível
          <select
            value={level}
            onChange={(event) => prepareLevel(Number(event.target.value) as Level)}
            aria-label="Selecionar nível do jogo da memória"
          >
            <option value={4}>Inicial · 4 pares</option>
            <option value={6}>Intermediário · 6 pares</option>
            <option value={8}>Avançado · 8 pares</option>
          </select>
        </label>
        <button
          type="button"
          className={`${started ? "game-secondary" : "game-primary"} game-control`}
          onClick={startGame}
        >
          {started ? "Reiniciar" : "Iniciar"}
        </button>
      </div>

      <div className="game-stats" aria-label="Desempenho atual">
        <span className="game-stat">Pares: {matchedPairs.length}/{level}</span>
        <span className="game-stat">Acertos: {hits}</span>
        <span className="game-stat">Erros: {errors}</span>
        <span className="game-stat">Jogadas: {moves}</span>
        <span className="game-stat">Pontos: {points}</span>
        <span className="game-stat">Tempo: {elapsed}s</span>
      </div>

      <div className="game-board" role="group" aria-label={`Jogo da memória com ${level} pares`}>
        {cards.map((card, index) => {
          const revealed = openCards.includes(index) || matchedPairs.includes(card.pairId);
          const matched = matchedPairs.includes(card.pairId);
          return (
            <button
              type="button"
              key={card.uid}
              className={`game-control${revealed ? " is-open" : ""}${matched ? " is-correct" : ""}`}
              onClick={() => chooseCard(index)}
              disabled={!started || matched}
              aria-label={
                revealed
                  ? `Carta ${index + 1}: ${card.label}${matched ? ", par encontrado" : ""}`
                  : `Carta ${index + 1}, virada para baixo`
              }
            >
              <span aria-hidden="true">{revealed ? card.symbol : "?"}</span>
            </button>
          );
        })}
      </div>

      <p className="game-feedback" role="status" aria-live="polite">
        {feedback}
      </p>
      {completed && (
        <button type="button" className="game-primary game-control" onClick={startGame}>
          Jogar novamente
        </button>
      )}
    </section>
  );
}
