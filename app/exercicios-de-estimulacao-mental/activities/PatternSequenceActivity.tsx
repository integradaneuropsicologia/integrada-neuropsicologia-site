"use client";

import { useState } from "react";

type SequenceQuestion = {
  sequence: string[];
  options: string[];
  answer: string;
  explanation: string;
};

const levels: Array<{ name: string; questions: SequenceQuestion[] }> = [
  {
    name: "Regular",
    questions: [
      {
        sequence: ["2", "4", "6", "8", "?"],
        options: ["9", "10", "11", "12"],
        answer: "10",
        explanation: "A sequência aumenta de 2 em 2.",
      },
      {
        sequence: ["20", "18", "16", "14", "?"],
        options: ["10", "11", "12", "13"],
        answer: "12",
        explanation: "Cada número é 2 unidades menor que o anterior.",
      },
      {
        sequence: ["5", "10", "15", "20", "?"],
        options: ["22", "24", "25", "30"],
        answer: "25",
        explanation: "A progressão soma 5 a cada etapa.",
      },
    ],
  },
  {
    name: "Estratégica",
    questions: [
      {
        sequence: ["3", "6", "12", "24", "?"],
        options: ["30", "36", "42", "48"],
        answer: "48",
        explanation: "Cada termo é o dobro do anterior.",
      },
      {
        sequence: ["1", "4", "9", "16", "?"],
        options: ["20", "24", "25", "32"],
        answer: "25",
        explanation: "São os quadrados de 1, 2, 3, 4 e 5.",
      },
      {
        sequence: ["2", "5", "11", "23", "?"],
        options: ["35", "45", "46", "47"],
        answer: "47",
        explanation: "Cada termo é o anterior multiplicado por 2, mais 1.",
      },
    ],
  },
  {
    name: "Avançada",
    questions: [
      {
        sequence: ["2", "5", "4", "7", "6", "9", "?"],
        options: ["7", "8", "10", "11"],
        answer: "8",
        explanation: "Duas sequências se alternam: 2, 4, 6, 8 e 5, 7, 9.",
      },
      {
        sequence: ["1", "2", "4", "7", "11", "?"],
        options: ["14", "15", "16", "17"],
        answer: "16",
        explanation: "As diferenças crescem: +1, +2, +3, +4 e +5.",
      },
      {
        sequence: ["81", "27", "9", "3", "?"],
        options: ["0", "1", "2", "6"],
        answer: "1",
        explanation: "Cada termo é o anterior dividido por 3.",
      },
    ],
  },
];

export function PatternSequenceActivity() {
  const [levelIndex, setLevelIndex] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [rounds, setRounds] = useState(0);
  const [feedback, setFeedback] = useState(
    "Observe como os termos mudam antes de escolher uma alternativa.",
  );

  const level = levels[levelIndex];
  const question = level.questions[questionIndex % level.questions.length];
  const answeredCorrectly = selectedAnswer === question.answer;

  function selectLevel(index: number) {
    setLevelIndex(index);
    setQuestionIndex(0);
    setSelectedAnswer(null);
    setFeedback(`Nível ${levels[index].name} selecionado. Procure a regra da sequência.`);
  }

  function answer(option: string) {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(option);
    setRounds((value) => value + 1);

    if (option === question.answer) {
      const earned = (levelIndex + 1) * 100 + streak * 20;
      setScore((value) => value + earned);
      setStreak((value) => value + 1);
      setCorrectAnswers((value) => value + 1);
      setFeedback(`Correto. ${question.explanation} Você ganhou ${earned} pontos.`);
    } else {
      setStreak(0);
      setFeedback(`Ainda não. A resposta é ${question.answer}. ${question.explanation}`);
    }
  }

  function nextQuestion() {
    setQuestionIndex((value) => (value + 1) % level.questions.length);
    setSelectedAnswer(null);
    setFeedback("Nova sequência. Compare as diferenças e relações entre os termos.");
  }

  function restartSession() {
    setQuestionIndex(0);
    setSelectedAnswer(null);
    setScore(0);
    setStreak(0);
    setCorrectAnswers(0);
    setRounds(0);
    setFeedback("Sessão reiniciada. Observe a sequência com calma.");
  }

  return (
    <section className="exercise-game pattern-game" aria-labelledby="pattern-title">
      <div className="game-toolbar">
        <div>
          <p className="eyebrow">Raciocínio lógico e identificação de padrões</p>
          <h2 id="pattern-title">Sequência Inteligente</h2>
          <p>
            Descubra a regra que relaciona os termos e escolha a alternativa que
            completa corretamente a sequência.
          </p>
        </div>
        <div className="game-control" aria-label="Selecionar nível">
          {levels.map((item, index) => (
            <button
              type="button"
              className={index === levelIndex ? "game-primary" : "game-secondary"}
              aria-pressed={index === levelIndex}
              key={item.name}
              onClick={() => selectLevel(index)}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>

      <div className="game-stats" aria-label="Desempenho da sessão">
        <div className="game-stat"><span>Nível</span><strong>{level.name}</strong></div>
        <div className="game-stat"><span>Pontos</span><strong>{score}</strong></div>
        <div className="game-stat"><span>Sequência de acertos</span><strong>{streak}</strong></div>
        <div className="game-stat"><span>Acertos</span><strong>{correctAnswers}/{rounds}</strong></div>
      </div>

      <div className="game-board pattern-board">
        <div className="pattern-sequence" aria-label={`Sequência: ${question.sequence.join(", ")}`}>
          {question.sequence.map((term, index) => (
            <span className={term === "?" ? "is-question" : ""} key={`${term}-${index}`}>
              {term}
            </span>
          ))}
        </div>

        <div className="pattern-options" role="group" aria-label="Alternativas">
          {question.options.map((option) => {
            const isChosen = selectedAnswer === option;
            const isCorrect = selectedAnswer !== null && option === question.answer;
            return (
              <button
                type="button"
                className={`game-secondary pattern-option${isChosen ? " is-selected" : ""}${isCorrect ? " is-correct" : ""}`}
                aria-pressed={isChosen}
                disabled={selectedAnswer !== null}
                key={option}
                onClick={() => answer(option)}
              >
                {option}
              </button>
            );
          })}
        </div>
      </div>

      <p className={`game-feedback${answeredCorrectly ? " is-success" : ""}`} aria-live="polite">
        {feedback}
      </p>

      <div className="game-control">
        <button type="button" className="game-secondary" onClick={restartSession}>
          Reiniciar sessão
        </button>
        <button type="button" className="game-primary" onClick={nextQuestion}>
          Nova sequência
        </button>
      </div>
    </section>
  );
}
