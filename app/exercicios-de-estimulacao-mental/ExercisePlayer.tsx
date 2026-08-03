"use client";

import { useCallback, useEffect, useRef, useState, type ComponentType } from "react";
import { ActionOrderActivity } from "./activities/ActionOrderActivity";
import { CircleHuntActivity } from "./activities/CircleHuntActivity";
import { ColorChallengeActivity } from "./activities/ColorChallengeActivity";
import { EmojiPuzzleActivity } from "./activities/EmojiPuzzleActivity";
import { EmojiTargetActivity } from "./activities/EmojiTargetActivity";
import { GhostReflexActivity } from "./activities/GhostReflexActivity";
import { HanoiActivity } from "./activities/HanoiActivity";
import { IntruderWordsActivity } from "./activities/IntruderWordsActivity";
import { MazeActivity } from "./activities/MazeActivity";
import { MemoryMixActivity } from "./activities/MemoryMixActivity";
import { NumericSequenceActivity } from "./activities/NumericSequenceActivity";
import { PatternSequenceActivity } from "./activities/PatternSequenceActivity";
import { PegSolitaireActivity } from "./activities/PegSolitaireActivity";
import { ReactionTimeActivity } from "./activities/ReactionTimeActivity";
import { StatementHitActivity } from "./activities/StatementHitActivity";
import { SymbolSearchActivity } from "./activities/SymbolSearchActivity";
import { TowerOfLondonActivity } from "./activities/TowerOfLondonActivity";
import { WordEmojiActivity } from "./activities/WordEmojiActivity";
import { WordSearchActivity } from "./activities/WordSearchActivity";
import type { ExerciseSlug } from "./exerciseData";

const activityBySlug: Record<ExerciseSlug, ComponentType> = {
  "labirinto": MazeActivity,
  "caca-palavras": WordSearchActivity,
  "torre-de-hanoi": HanoiActivity,
  "resta-um": PegSolitaireActivity,
  "sequencia-inteligente": PatternSequenceActivity,
  "reflexo-fantasmas": GhostReflexActivity,
  "torre-de-londres": TowerOfLondonActivity,
  "quebra-cabeca-emoji": EmojiPuzzleActivity,
  "afirmou-bateu": StatementHitActivity,
  "memoria-mix": MemoryMixActivity,
  "desafio-das-cores": ColorChallengeActivity,
  "emoji-alvo": EmojiTargetActivity,
  "intruso-das-palavras": IntruderWordsActivity,
  "clique-no-momento-certo": ReactionTimeActivity,
  "caca-circulos": CircleHuntActivity,
  "sequencia-numerica": NumericSequenceActivity,
  "busca-do-simbolo": SymbolSearchActivity,
  "ordem-das-acoes": ActionOrderActivity,
  "palavra-emoji": WordEmojiActivity,
};

export function ExercisePlayer({ slug }: { slug: ExerciseSlug }) {
  const Activity = activityBySlug[slug];
  const [focusMode, setFocusMode] = useState(false);
  const shellRef = useRef<HTMLDivElement>(null);
  const openFocusButtonRef = useRef<HTMLButtonElement>(null);
  const closeFocusButtonRef = useRef<HTMLButtonElement>(null);
  const restoreOpenButtonFocus = useCallback(() => {
    window.requestAnimationFrame(() => openFocusButtonRef.current?.focus());
  }, []);

  useEffect(() => {
    if (!focusMode) return;

    const previousBodyOverflow = document.body.style.overflow;
    const previousHtmlOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    closeFocusButtonRef.current?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setFocusMode(false);
        return;
      }
      if (event.key !== "Tab") return;

      const focusableElements = Array.from(
        shellRef.current?.querySelectorAll<HTMLElement>(
          'button:not(:disabled), select:not(:disabled), [tabindex]:not([tabindex="-1"])',
        ) ?? [],
      ).filter((element) => element.offsetParent !== null);
      const first = focusableElements[0];
      const last = focusableElements[focusableElements.length - 1];
      if (!first || !last) return;

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousHtmlOverflow;
      restoreOpenButtonFocus();
    };
  }, [focusMode, restoreOpenButtonFocus]);

  if (!Activity) {
    return (
      <p className="game-feedback" role="alert">
        Esta atividade não está disponível no momento.
      </p>
    );
  }

  return (
    <div
      ref={shellRef}
      className={`exercise-play-shell${focusMode ? " is-focus-mode" : ""}`}
      role={focusMode ? "dialog" : undefined}
      aria-modal={focusMode ? true : undefined}
      aria-label={focusMode ? "Exercício em modo foco" : undefined}
    >
      <div className="exercise-play-shell-bar">
        <div>
          <span aria-hidden="true">●</span>
          <p><strong>Área de prática</strong><small>Tabuleiro e controles organizados na mesma tela</small></p>
        </div>
        {focusMode ? (
          <button
            ref={closeFocusButtonRef}
            type="button"
            className="game-secondary"
            onClick={() => setFocusMode(false)}
          >
            Sair do modo foco <span aria-hidden="true">×</span>
          </button>
        ) : (
          <button
            ref={openFocusButtonRef}
            type="button"
            className="game-secondary"
            onClick={() => setFocusMode(true)}
          >
            Ampliar exercício <span aria-hidden="true">⛶</span>
          </button>
        )}
      </div>
      <div className="exercise-play-canvas">
        <Activity />
      </div>
    </div>
  );
}
