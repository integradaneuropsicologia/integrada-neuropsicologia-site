"use client";

import { useEffect, useState } from "react";

type Round = {
  category: string;
  words: string[];
  intruder: string;
  explanation: string;
};

const ROUNDS: Round[] = [
  {
    category: "Frutas",
    words: ["Maçã", "Pera", "Cenoura", "Uva"],
    intruder: "Cenoura",
    explanation: "Cenoura é um legume; as demais palavras nomeiam frutas.",
  },
  {
    category: "Instrumentos musicais",
    words: ["Violão", "Piano", "Telescópio", "Flauta"],
    intruder: "Telescópio",
    explanation: "Telescópio é um instrumento de observação, não um instrumento musical.",
  },
  {
    category: "Meios de transporte",
    words: ["Navio", "Bicicleta", "Avião", "Almofada"],
    intruder: "Almofada",
    explanation: "Almofada não é usada para transportar pessoas ou objetos.",
  },
  {
    category: "Ações de comunicação",
    words: ["Conversar", "Escrever", "Escutar", "Cozinhar"],
    intruder: "Cozinhar",
    explanation: "Cozinhar não é uma ação diretamente ligada à comunicação.",
  },
  {
    category: "Unidades de tempo",
    words: ["Minuto", "Semana", "Litro", "Hora"],
    intruder: "Litro",
    explanation: "Litro mede volume; as outras palavras representam unidades de tempo.",
  },
  {
    category: "Processos cognitivos",
    words: ["Atenção", "Memória", "Planejamento", "Temperatura"],
    intruder: "Temperatura",
    explanation: "Temperatura é uma grandeza física; as demais são funções cognitivas.",
  },
  {
    category: "Palavras relacionadas à leitura",
    words: ["Parágrafo", "Capítulo", "Índice", "Semáforo"],
    intruder: "Semáforo",
    explanation: "Semáforo não pertence à estrutura ou organização de textos e livros.",
  },
  {
    category: "Relações de causa e resultado",
    words: ["Pergunta", "Resposta", "Problema", "Solução", "Janela"],
    intruder: "Janela",
    explanation: "Janela não compõe os pares pergunta–resposta ou problema–solução.",
  },
  {
    category: "Organização de uma tarefa",
    words: ["Objetivo", "Etapas", "Revisão", "Acaso", "Prazo"],
    intruder: "Acaso",
    explanation: "Acaso não é um elemento planejado para organizar e concluir uma tarefa.",
  },
];

function levelForRound(round: number): string {
  if (round < 3) return "Inicial";
  if (round < 6) return "Intermediário";
  return "Avançado";
}

export function IntruderWordsActivity() {
  const [round, setRound] = useState(0);
  const [hits, setHits] = useState(0);
  const [errors, setErrors] = useState(0);
  const [points, setPoints] = useState(0);
  const [wrongChoices, setWrongChoices] = useState<string[]>([]);
  const [roundComplete, setRoundComplete] = useState(false);
  const [finished, setFinished] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [started, setStarted] = useState(false);
  const [startedAt, setStartedAt] = useState(0);
  const [feedback, setFeedback] = useState(
    "Leia as instruções e selecione Iniciar quando estiver pronto.",
  );
  const current = ROUNDS[round];

  useEffect(() => {
    if (!started || finished) return;
    const timer = window.setInterval(
      () => setElapsed(Math.floor((Date.now() - startedAt) / 1000)),
      1000,
    );
    return () => window.clearInterval(timer);
  }, [finished, started, startedAt]);

  function chooseWord(word: string) {
    if (!started || roundComplete || finished || wrongChoices.includes(word)) return;

    if (word === current.intruder) {
      const isLast = round === ROUNDS.length - 1;
      setHits((value) => value + 1);
      setPoints((value) => value + 100 + round * 10);
      setFeedback(`Correto! ${current.explanation}`);
      setRoundComplete(true);
      if (isLast) {
        setFinished(true);
        setFeedback(`Desafio concluído! ${current.explanation}`);
      }
      return;
    }

    setErrors((value) => value + 1);
    setPoints((value) => Math.max(0, value - 10));
    setWrongChoices((choices) => [...choices, word]);
    setFeedback(`${word} pertence ao grupo “${current.category}”. Procure outra opção.`);
  }

  function nextRound() {
    if (!roundComplete || finished) return;
    setRound((value) => value + 1);
    setWrongChoices([]);
    setRoundComplete(false);
    setFeedback("Nova rodada: encontre a palavra intrusa.");
  }

  function startGame() {
    setRound(0);
    setHits(0);
    setErrors(0);
    setPoints(0);
    setWrongChoices([]);
    setRoundComplete(false);
    setFinished(false);
    setElapsed(0);
    setStarted(true);
    setStartedAt(Date.now());
    setFeedback("Atividade iniciada. Identifique a palavra que não pertence ao grupo.");
  }

  return (
    <section className="exercise-game" aria-labelledby="intruder-words-title">
      <div className="game-toolbar">
        <div>
          <h2 id="intruder-words-title">Palavra intrusa</h2>
          <p>
            Compare os significados e escolha a palavra que não pertence à categoria das
            demais.
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
        <span className="game-stat">Rodada: {Math.min(round + 1, ROUNDS.length)}/{ROUNDS.length}</span>
        <span className="game-stat">Nível: {levelForRound(round)}</span>
        <span className="game-stat">Acertos: {hits}</span>
        <span className="game-stat">Erros: {errors}</span>
        <span className="game-stat">Pontos: {points}</span>
        <span className="game-stat">Tempo: {elapsed}s</span>
      </div>

      {!finished ? (
        <div className="game-board" aria-label={`Categoria: ${current.category}`}>
          <p>
            <strong>Qual palavra não combina com as outras?</strong>
          </p>
          {current.words.map((word) => {
            const wrong = wrongChoices.includes(word);
            const correct = roundComplete && word === current.intruder;
            return (
              <button
                type="button"
                key={word}
                className={`game-control${wrong ? " is-wrong" : ""}${correct ? " is-correct" : ""}`}
                onClick={() => chooseWord(word)}
                disabled={!started || wrong || roundComplete}
                aria-label={`${word}${wrong ? ", tentativa incorreta" : correct ? ", resposta correta" : ""}`}
              >
                {word}
              </button>
            );
          })}
        </div>
      ) : (
        <div className="game-board">
          <h3>Treino concluído</h3>
          <p>Você acertou {hits} de {ROUNDS.length} categorias em {elapsed} segundos.</p>
          <button type="button" className="game-primary game-control" onClick={startGame}>
            Treinar novamente
          </button>
        </div>
      )}

      {started && roundComplete && !finished && (
        <button type="button" className="game-primary game-control" onClick={nextRound}>
          Próxima rodada
        </button>
      )}

      <p className="game-feedback" role="status" aria-live="polite">
        {feedback}
      </p>
    </section>
  );
}
