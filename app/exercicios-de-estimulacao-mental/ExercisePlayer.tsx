"use client";

import type { ComponentType } from "react";
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

  if (!Activity) {
    return (
      <p className="game-feedback" role="alert">
        Esta atividade não está disponível no momento.
      </p>
    );
  }

  return <Activity />;
}
