"use client";

import { useEffect, useState } from "react";

type EmojiChoice = { emoji: string; label: string };
type AssociationRound = {
  word: string;
  hint: string;
  choices: EmojiChoice[];
  answer: string;
  explanation: string;
  level: string;
};

const ROUNDS: AssociationRound[] = [
  {
    word: "Navegação",
    hint: "Objeto usado para encontrar direções.",
    choices: [
      { emoji: "🧭", label: "bússola" },
      { emoji: "🎻", label: "violino" },
      { emoji: "🧁", label: "bolinho" },
      { emoji: "🧤", label: "luva" },
    ],
    answer: "🧭",
    explanation: "A bússola orienta direções e está diretamente ligada à navegação.",
    level: "Associação direta",
  },
  {
    word: "Investigação",
    hint: "Ação de procurar detalhes e pistas.",
    choices: [
      { emoji: "🎁", label: "presente" },
      { emoji: "🔎", label: "lupa" },
      { emoji: "🏖️", label: "praia" },
      { emoji: "🎈", label: "balão" },
    ],
    answer: "🔎",
    explanation: "A lupa representa a busca atenta por pistas e detalhes.",
    level: "Associação direta",
  },
  {
    word: "Comunicação",
    hint: "Troca de mensagens e ideias.",
    choices: [
      { emoji: "🔒", label: "cadeado" },
      { emoji: "💬", label: "balão de conversa" },
      { emoji: "🪴", label: "planta" },
      { emoji: "🥾", label: "bota" },
    ],
    answer: "💬",
    explanation: "O balão de conversa simboliza a troca de mensagens.",
    level: "Associação direta",
  },
  {
    word: "Planejamento",
    hint: "Organização antecipada de compromissos e etapas.",
    choices: [
      { emoji: "🎲", label: "dado" },
      { emoji: "🗓️", label: "calendário" },
      { emoji: "🌊", label: "onda" },
      { emoji: "🎨", label: "paleta de pintura" },
    ],
    answer: "🗓️",
    explanation: "O calendário ajuda a organizar etapas, datas e compromissos.",
    level: "Associação direta",
  },
  {
    word: "Precisão",
    hint: "Capacidade de atingir algo com exatidão.",
    choices: [
      { emoji: "🎯", label: "alvo" },
      { emoji: "🎭", label: "máscaras de teatro" },
      { emoji: "🛶", label: "canoa" },
      { emoji: "🧶", label: "novelo" },
    ],
    answer: "🎯",
    explanation: "Acertar o centro do alvo representa precisão.",
    level: "Relação contextual",
  },
  {
    word: "Proteção",
    hint: "Ação de reduzir riscos e preservar algo.",
    choices: [
      { emoji: "🛡️", label: "escudo" },
      { emoji: "🎤", label: "microfone" },
      { emoji: "🪁", label: "pipa" },
      { emoji: "🧺", label: "cesta" },
    ],
    answer: "🛡️",
    explanation: "O escudo é um símbolo de defesa e proteção.",
    level: "Relação contextual",
  },
  {
    word: "Crescimento",
    hint: "Desenvolvimento gradual ao longo do tempo.",
    choices: [
      { emoji: "🧊", label: "gelo" },
      { emoji: "🌱", label: "broto" },
      { emoji: "🧲", label: "ímã" },
      { emoji: "🪨", label: "pedra" },
    ],
    answer: "🌱",
    explanation: "O broto representa algo que está começando a crescer e se desenvolver.",
    level: "Relação contextual",
  },
  {
    word: "Cooperação",
    hint: "Pessoas agindo juntas para alcançar um objetivo.",
    choices: [
      { emoji: "🤝", label: "aperto de mãos" },
      { emoji: "🚪", label: "porta" },
      { emoji: "⌛", label: "ampulheta" },
      { emoji: "🎧", label: "fones de ouvido" },
    ],
    answer: "🤝",
    explanation: "O aperto de mãos representa acordo, parceria e cooperação.",
    level: "Relação contextual",
  },
  {
    word: "Persistência",
    hint: "Continuar tentando mesmo diante de obstáculos.",
    choices: [
      { emoji: "🏔️", label: "montanha" },
      { emoji: "🛏️", label: "cama" },
      { emoji: "🍿", label: "pipoca" },
      { emoji: "📪", label: "caixa de correio" },
    ],
    answer: "🏔️",
    explanation: "Subir uma montanha simboliza esforço contínuo para superar desafios.",
    level: "Inferência",
  },
  {
    word: "Equilíbrio",
    hint: "Manter estabilidade entre partes ou demandas diferentes.",
    choices: [
      { emoji: "⚖️", label: "balança" },
      { emoji: "🚂", label: "trem" },
      { emoji: "🧃", label: "suco" },
      { emoji: "📷", label: "câmera" },
    ],
    answer: "⚖️",
    explanation: "A balança representa estabilidade e distribuição equilibrada.",
    level: "Inferência",
  },
];

export function WordEmojiActivity() {
  const [round, setRound] = useState(0);
  const [hits, setHits] = useState(0);
  const [errors, setErrors] = useState(0);
  const [points, setPoints] = useState(0);
  const [streak, setStreak] = useState(0);
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

  function chooseEmoji(choice: EmojiChoice) {
    if (!started || roundComplete || finished || wrongChoices.includes(choice.emoji)) return;
    if (choice.emoji === current.answer) {
      const nextStreak = streak + 1;
      const bonus = Math.min(nextStreak, 5) * 10;
      const isLast = round === ROUNDS.length - 1;
      setHits((value) => value + 1);
      setStreak(nextStreak);
      setPoints((value) => value + 100 + bonus);
      setRoundComplete(true);
      setFeedback(`Correto! ${current.explanation}`);
      if (isLast) {
        setFinished(true);
        setFeedback(`Treino concluído! ${current.explanation}`);
      }
      return;
    }

    setErrors((value) => value + 1);
    setStreak(0);
    setPoints((value) => Math.max(0, value - 10));
    setWrongChoices((choices) => [...choices, choice.emoji]);
    setFeedback(`${choice.label} não é a melhor associação neste contexto. Tente novamente.`);
  }

  function nextRound() {
    if (!roundComplete || finished) return;
    setRound((value) => value + 1);
    setWrongChoices([]);
    setRoundComplete(false);
    setFeedback("Observe a nova palavra e escolha a associação mais adequada.");
  }

  function startGame() {
    setRound(0);
    setHits(0);
    setErrors(0);
    setPoints(0);
    setStreak(0);
    setWrongChoices([]);
    setRoundComplete(false);
    setFinished(false);
    setElapsed(0);
    setStarted(true);
    setStartedAt(Date.now());
    setFeedback("Atividade iniciada. Escolha o emoji que melhor representa a palavra.");
  }

  return (
    <section className="exercise-game" aria-labelledby="word-emoji-title">
      <div className="game-toolbar">
        <div>
          <h2 id="word-emoji-title">Palavra e emoji</h2>
          <p>
            Relacione cada palavra ao símbolo mais adequado, usando significado, contexto e
            inferência.
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
        <span className="game-stat">Nível: {current.level}</span>
        <span className="game-stat">Acertos: {hits}</span>
        <span className="game-stat">Erros: {errors}</span>
        <span className="game-stat">Sequência de acertos: {streak}</span>
        <span className="game-stat">Pontos: {points}</span>
        <span className="game-stat">Tempo: {elapsed}s</span>
      </div>

      {!finished ? (
        <div className="game-board" aria-label={`Associar a palavra ${current.word}`}>
          <p>Qual emoji melhor representa:</p>
          <h3>{current.word}</h3>
          <p>{current.hint}</p>
          <div>
            {current.choices.map((choice) => {
              const wrong = wrongChoices.includes(choice.emoji);
              const correct = roundComplete && choice.emoji === current.answer;
              return (
                <button
                  type="button"
                  key={choice.emoji}
                  className={`game-control${wrong ? " is-wrong" : ""}${correct ? " is-correct" : ""}`}
                  onClick={() => chooseEmoji(choice)}
                  disabled={!started || wrong || roundComplete}
                  aria-label={`${choice.label}${wrong ? ", tentativa incorreta" : correct ? ", resposta correta" : ""}`}
                >
                  <span aria-hidden="true">{choice.emoji}</span>
                  <small>{choice.label}</small>
                </button>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="game-board">
          <h3>Associações concluídas</h3>
          <p>Você completou {ROUNDS.length} relações semânticas em {elapsed} segundos.</p>
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
