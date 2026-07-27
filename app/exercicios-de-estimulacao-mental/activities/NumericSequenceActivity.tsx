"use client";

import { useEffect, useState } from "react";

type Phase = "idle" | "showing" | "input" | "feedback" | "finished";

const FIRST_LENGTH = 3;
const LAST_LENGTH = 9;
const TOTAL_STAGES = LAST_LENGTH - FIRST_LENGTH + 1;

function createSequence(length: number, seed: number): string {
  let value = seed * 15485863 + length * 97;
  const digits: string[] = [];
  for (let index = 0; index < length; index += 1) {
    value = (value * 48271) % 2147483647;
    let digit = value % 10;
    if (index > 0 && String(digit) === digits[index - 1]) digit = (digit + 3) % 10;
    digits.push(String(digit));
  }
  return digits.join("");
}

export function NumericSequenceActivity() {
  const [length, setLength] = useState(FIRST_LENGTH);
  const [seed, setSeed] = useState(1);
  const [sequence, setSequence] = useState(() => createSequence(FIRST_LENGTH, 1));
  const [attempt, setAttempt] = useState("");
  const [phase, setPhase] = useState<Phase>("idle");
  const [pendingNext, setPendingNext] = useState<"advance" | "retry" | null>(null);
  const [hits, setHits] = useState(0);
  const [errors, setErrors] = useState(0);
  const [assists, setAssists] = useState(0);
  const [points, setPoints] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const [startedAt, setStartedAt] = useState(0);
  const [feedback, setFeedback] = useState(
    "Leia as instruções e selecione Iniciar quando estiver pronto.",
  );

  function evaluateAttempt(value: string) {
    if (value === sequence) {
      const finalStage = length === LAST_LENGTH;
      setHits((current) => current + 1);
      setPoints((current) => current + length * 30);
      if (finalStage) {
        setPhase("finished");
        setFeedback("Treino concluído! Você reproduziu a sequência mais longa.");
      } else {
        setPhase("feedback");
        setPendingNext("advance");
        setFeedback(`Sequência correta! O próximo nível terá ${length + 1} números.`);
      }
      return;
    }

    setErrors((current) => current + 1);
    setPoints((current) => Math.max(0, current - 15));
    setPhase("feedback");
    setPendingNext("retry");
    setFeedback(`A ordem correta era ${sequence}. Uma nova sequência do mesmo tamanho será apresentada.`);
  }

  function enterDigit(digit: string) {
    if (phase !== "input" || attempt.length >= sequence.length) return;
    const nextAttempt = attempt + digit;
    setAttempt(nextAttempt);
    if (nextAttempt.length === sequence.length) evaluateAttempt(nextAttempt);
  }

  useEffect(() => {
    if (phase !== "showing") return;
    const displayTime = Math.max(1100, 2400 - length * 120);
    const timer = window.setTimeout(() => {
      setPhase("input");
      setFeedback("Agora reproduza a sequência na mesma ordem.");
    }, displayTime);
    return () => window.clearTimeout(timer);
  }, [length, phase, sequence]);

  useEffect(() => {
    if (!pendingNext) return;
    const timer = window.setTimeout(() => {
      const nextLength = pendingNext === "advance" ? length + 1 : length;
      const nextSeed = seed + 1;
      setLength(nextLength);
      setSeed(nextSeed);
      setSequence(createSequence(nextLength, nextSeed));
      setAttempt("");
      setPendingNext(null);
      setPhase("showing");
      setFeedback("Observe a nova sequência e memorize a ordem.");
    }, 1500);
    return () => window.clearTimeout(timer);
  }, [length, pendingNext, seed]);

  useEffect(() => {
    if (phase === "idle" || phase === "finished") return;
    const timer = window.setInterval(
      () => setElapsed(Math.floor((Date.now() - startedAt) / 1000)),
      1000,
    );
    return () => window.clearInterval(timer);
  }, [phase, startedAt]);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (phase !== "input") return;
      if (/^[0-9]$/.test(event.key)) {
        event.preventDefault();
        enterDigit(event.key);
      } else if (event.key === "Backspace") {
        event.preventDefault();
        setAttempt((value) => value.slice(0, -1));
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  });

  function showAgain() {
    if (phase !== "input") return;
    setAssists((value) => value + 1);
    setPoints((value) => Math.max(0, value - 20));
    setAttempt("");
    setPhase("showing");
    setFeedback("Observe novamente. Esta ajuda reduz 20 pontos.");
  }

  function startGame() {
    const nextSeed = seed + 1;
    setLength(FIRST_LENGTH);
    setSeed(nextSeed);
    setSequence(createSequence(FIRST_LENGTH, nextSeed));
    setAttempt("");
    setPhase("showing");
    setPendingNext(null);
    setHits(0);
    setErrors(0);
    setAssists(0);
    setPoints(0);
    setElapsed(0);
    setStartedAt(Date.now());
    setFeedback("Observe a sequência e memorize a ordem dos números.");
  }

  const currentStage = Math.min(length - FIRST_LENGTH + 1, TOTAL_STAGES);

  return (
    <section className="exercise-game" aria-labelledby="numeric-sequence-title">
      <div className="game-toolbar">
        <div>
          <h2 id="numeric-sequence-title">Sequência numérica</h2>
          <p>
            Memorize os números apresentados e depois reproduza a sequência na mesma ordem.
            Você também pode usar o teclado.
          </p>
        </div>
        <button
          type="button"
          className={`${phase === "idle" ? "game-primary" : "game-secondary"} game-control`}
          onClick={startGame}
        >
          {phase === "idle" ? "Iniciar" : "Reiniciar"}
        </button>
      </div>

      <div className="game-stats" aria-label="Desempenho atual">
        <span className="game-stat">Etapa: {currentStage}/{TOTAL_STAGES}</span>
        <span className="game-stat">Nível: {length} dígitos</span>
        <span className="game-stat">Acertos: {hits}</span>
        <span className="game-stat">Erros: {errors}</span>
        <span className="game-stat">Ajudas: {assists}</span>
        <span className="game-stat">Pontos: {points}</span>
        <span className="game-stat">Tempo: {elapsed}s</span>
      </div>

      <div className="game-board" aria-label="Área da sequência numérica">
        {phase === "idle" ? (
          <p>Os números aparecerão somente depois que você selecionar Iniciar.</p>
        ) : phase === "showing" ? (
          <div aria-label={`Sequência: ${sequence.split("").join(", ")}`}>
            {sequence.split("").map((digit, index) => (
              <strong className="game-stat" key={`${digit}-${index}`} aria-hidden="true">
                {digit}
              </strong>
            ))}
          </div>
        ) : (
          <div aria-label={`Sua resposta: ${attempt || "vazia"}`}>
            {Array.from({ length: sequence.length }, (_, index) => (
              <strong className="game-stat" key={index} aria-hidden="true">
                {attempt[index] ?? "•"}
              </strong>
            ))}
          </div>
        )}

        <div aria-label="Teclado numérico">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((digit) => (
            <button
              type="button"
              key={digit}
              className="game-control"
              onClick={() => enterDigit(String(digit))}
              disabled={phase !== "input"}
              aria-label={`Digitar ${digit}`}
            >
              {digit}
            </button>
          ))}
          <button
            type="button"
            className="game-control game-secondary"
            onClick={() => setAttempt((value) => value.slice(0, -1))}
            disabled={phase !== "input" || attempt.length === 0}
            aria-label="Apagar último número"
          >
            Apagar
          </button>
        </div>
      </div>

      {phase === "input" && (
        <button type="button" className="game-secondary game-control" onClick={showAgain}>
          Ver sequência novamente (−20 pontos)
        </button>
      )}
      {phase === "finished" && (
        <button type="button" className="game-primary game-control" onClick={startGame}>
          Treinar novamente
        </button>
      )}

      <p className="game-feedback" role="status" aria-live="polite">
        {feedback}
      </p>
    </section>
  );
}
