import type { ScreeningContent, ScreeningQuestion } from "./screeningContent";

export type CalculatedScreeningResult = {
  tone: "positive" | "attention" | "low";
  title: string;
  description: string;
  metrics: Array<{ label: string; value: string }>;
  disclaimer: string;
  whatsappMessage: string;
};

type CalculateInput = {
  content: ScreeningContent;
  questions: ScreeningQuestion[];
  answers: Record<number, number>;
  variantLabel?: string;
};

function categoryTotals(questions: ScreeningQuestion[], answers: Record<number, number>) {
  return questions.reduce<Record<string, number>>((totals, question, index) => {
    if (question.category) totals[question.category] = (totals[question.category] ?? 0) + answers[index];
    return totals;
  }, {});
}

function resultCopy(tone: CalculatedScreeningResult["tone"], profile: ScreeningContent["scoring"]) {
  if (profile === "adult-adhd") {
    if (tone === "positive") return {
      type: "indicadores relevantes para investigação de TDAH",
      title: "Resultado: há indicadores relevantes para investigação",
      description: "Suas respostas indicam sinais importantes que podem estar associados ao TDAH em adultos. Isso não significa diagnóstico fechado, mas sugere que vale buscar uma avaliação profissional, especialmente se essas dificuldades causam prejuízo no trabalho, nos estudos, nos relacionamentos ou na rotina.",
    };
    if (tone === "attention") return {
      type: "alguns sinais de atenção clínica",
      title: "Resultado: apareceram alguns sinais de atenção",
      description: "Suas respostas mostram alguns sinais que merecem observação. Eles podem estar ligados ao TDAH, mas também podem aparecer em ansiedade, estresse, burnout, depressão, sono ruim ou sobrecarga de rotina.",
    };
    return {
      type: "poucos indicadores neste rastreamento",
      title: "Resultado: poucos indicadores apareceram neste rastreamento",
      description: "Neste questionário, suas respostas não apontaram muitos indicadores frequentes de TDAH. Mesmo assim, esse resultado não exclui completamente a possibilidade de dificuldades atencionais ou executivas. Se você sente prejuízo importante na rotina, a avaliação profissional ainda pode ser útil.",
    };
  }

  if (profile === "child-adhd") {
    if (tone === "positive") return {
      type: "indicadores relevantes para investigação",
      title: "Resultado: há indicadores relevantes para investigação",
      description: "As respostas indicam sinais importantes que merecem atenção profissional. Isso não significa diagnóstico fechado, mas sugere que pode haver dificuldades de atenção, autorregulação, impulsividade, agitação ou comportamento opositor impactando a rotina da criança.",
    };
    if (tone === "attention") return {
      type: "alguns sinais de atenção clínica",
      title: "Resultado: apareceram alguns sinais de atenção",
      description: "As respostas mostram alguns sinais que merecem observação. Eles podem não indicar um transtorno, mas se existe prejuízo escolar, familiar, emocional ou social, vale conversar com um profissional para entender melhor.",
    };
    return {
      type: "poucos indicadores neste rastreamento",
      title: "Resultado: poucos indicadores apareceram neste rastreamento",
      description: "Neste questionário, apareceram poucos indicadores frequentes. Mesmo assim, esse resultado não exclui completamente dificuldades de atenção, aprendizagem, comportamento ou regulação emocional. Se há sofrimento ou prejuízo real, investigue.",
    };
  }

  if (profile === "adult-autism") {
    if (tone === "positive") return {
      type: "indicadores relevantes para investigação de TEA",
      title: "Resultado: há indicadores relevantes para investigação",
      description: "Suas respostas indicam sinais importantes em áreas relacionadas à comunicação social, interação, rigidez, sensibilidade sensorial, masking e impacto funcional. Isso não significa diagnóstico fechado, mas sugere que uma avaliação profissional é recomendada.",
    };
    if (tone === "attention") return {
      type: "alguns sinais de atenção clínica",
      title: "Resultado: apareceram alguns sinais de atenção",
      description: "Suas respostas mostram alguns sinais que merecem observação. Eles podem estar relacionados ao espectro autista, mas também podem aparecer em ansiedade, TDAH, depressão, trauma, altas habilidades, estresse crônico ou dificuldades sociais específicas. Se há prejuízo real, vale investigar.",
    };
    return {
      type: "poucos indicadores neste rastreamento",
      title: "Resultado: poucos indicadores apareceram neste rastreamento",
      description: "Neste rastreamento, apareceram poucos indicadores frequentes. Mesmo assim, esse resultado não exclui completamente autismo ou outras dificuldades sociais, sensoriais e emocionais. Se existe sofrimento ou prejuízo, procure orientação profissional.",
    };
  }

  if (tone === "positive") return {
    type: "indicadores relevantes para investigação de TEA",
    title: "Resultado: há indicadores relevantes para investigação",
    description: "As respostas indicam sinais importantes em áreas relacionadas à comunicação social, flexibilidade, sensibilidade sensorial e padrões repetitivos de comportamento. Isso não significa diagnóstico fechado, mas sugere que uma avaliação profissional é recomendada.",
  };
  if (tone === "attention") return {
    type: "alguns sinais de atenção clínica",
    title: "Resultado: apareceram alguns sinais de atenção",
    description: "As respostas mostram alguns sinais que merecem observação. Eles podem estar relacionados ao desenvolvimento, ao perfil sensorial, à ansiedade, à linguagem, à adaptação escolar ou a características do espectro autista. Se há prejuízo real, vale investigar.",
  };
  return {
    type: "poucos indicadores neste rastreamento",
    title: "Resultado: poucos indicadores apareceram neste rastreamento",
    description: "Neste rastreamento, apareceram poucos indicadores frequentes. Mesmo assim, esse resultado não exclui completamente dificuldades sociais, comunicativas, sensoriais ou comportamentais. Se existe sofrimento ou prejuízo, procure orientação profissional.",
  };
}

export function calculateScreeningResult({ content, questions, answers, variantLabel }: CalculateInput): CalculatedScreeningResult {
  if (content.scoring === "adult-adhd") {
    const firstSectionSize = content.sections?.[0]?.questions.length ?? 9;
    const inattentive = questions.slice(0, firstSectionSize).filter((_, index) => answers[index] >= 3).length;
    const hyperactive = questions.slice(firstSectionSize).filter((_, index) => answers[index + firstSectionSize] >= 3).length;
    const tone = inattentive >= 5 || hyperactive >= 5 ? "positive" : inattentive >= 3 || hyperactive >= 3 ? "attention" : "low";
    const copy = resultCopy(tone, content.scoring);
    return {
      tone,
      title: copy.title,
      description: copy.description,
      metrics: [
        { label: "Desatenção e organização", value: `${inattentive} indicadores frequentes.` },
        { label: "Hiperatividade e impulsividade", value: `${hyperactive} indicadores frequentes.` },
      ],
      disclaimer: "rastreamento não é diagnóstico. O diagnóstico exige análise clínica, história de vida, prejuízo funcional e investigação de outras possíveis causas.",
      whatsappMessage: `Olá, fiz o rastreamento de TDAH em adultos no site. Meu resultado foi: ${copy.type}. Pontuação por frequência: desatenção/organização ${inattentive}, hiperatividade/impulsividade ${hyperactive}. Quero orientação sobre avaliação neuropsicológica.`,
    };
  }

  if (content.scoring === "child-adhd") {
    const counts = {
      inattentive: questions.slice(0, 9).filter((_, index) => answers[index] >= 2).length,
      hyperactive: questions.slice(9, 18).filter((_, index) => answers[index + 9] >= 2).length,
      oppositional: questions.slice(18, 26).filter((_, index) => answers[index + 18] >= 2).length,
    };
    const tone = counts.inattentive >= 6 || counts.hyperactive >= 6 || counts.oppositional >= 6
      ? "positive"
      : counts.inattentive >= 3 || counts.hyperactive >= 3 || counts.oppositional >= 3 ? "attention" : "low";
    const copy = resultCopy(tone, content.scoring);
    return {
      tone,
      title: copy.title,
      description: copy.description,
      metrics: [
        { label: "Desatenção", value: `${counts.inattentive} indicador(es) frequente(s).` },
        { label: "Hiperatividade/impulsividade", value: `${counts.hyperactive} indicador(es) frequente(s).` },
        { label: "Comportamento opositor", value: `${counts.oppositional} indicador(es) frequente(s).` },
      ],
      disclaimer: "este rastreamento não substitui diagnóstico. O diagnóstico infantil precisa considerar histórico de desenvolvimento, comportamento em casa e na escola, intensidade dos sintomas, prejuízo funcional e avaliação profissional.",
      whatsappMessage: `Olá, fiz o rastreamento de TDAH infantil no site. Resultado: ${copy.type}. Indicadores: desatenção ${counts.inattentive}, hiperatividade/impulsividade ${counts.hyperactive}, comportamento opositor ${counts.oppositional}. Quero orientação sobre avaliação neuropsicológica infantil.`,
    };
  }

  const totals = categoryTotals(questions, answers);
  const total = questions.reduce((sum, _, index) => sum + answers[index], 0);
  const relevantIndicators = questions.filter((_, index) => answers[index] >= 2).length;
  const adult = content.scoring === "adult-autism";
  const tone = adult
    ? relevantIndicators >= 17 || total >= 50 || (totals.funcional ?? 0) >= 2 ? "positive" : relevantIndicators >= 8 || total >= 27 ? "attention" : "low"
    : relevantIndicators >= 14 || total >= 42 ? "positive" : relevantIndicators >= 7 || total >= 24 ? "attention" : "low";
  const copy = resultCopy(tone, content.scoring);
  const categoryMetrics = Object.entries(content.categoryLabels ?? {}).map(([key, label]) => ({
    label,
    value: String(totals[key] ?? 0),
  }));
  const metrics = [
    ...(variantLabel ? [{ label: "Faixa selecionada", value: variantLabel }] : []),
    { label: "Pontuação total", value: String(total) },
    { label: "Indicadores marcados como “acontece bastante” ou “acontece muito”", value: String(relevantIndicators) },
    ...categoryMetrics,
  ];

  if (adult) {
    return {
      tone,
      title: copy.title,
      description: copy.description,
      metrics,
      disclaimer: "este rastreamento não substitui avaliação diagnóstica. O diagnóstico de TEA em adultos exige análise clínica, histórico do desenvolvimento, funcionamento atual, prejuízo funcional e investigação de diagnósticos diferenciais.",
      whatsappMessage: `Olá, fiz o rastreamento de autismo em adultos no site. Resultado: ${copy.type}. Pontuação total: ${total}. Indicadores relevantes: ${relevantIndicators}. Áreas: social ${totals.social ?? 0}, comunicação ${totals.comunicacao ?? 0}, rigidez ${totals.rigidez ?? 0}, repetição/interesses ${totals.repeticao ?? 0}, sensorial ${totals.sensorial ?? 0}, masking ${totals.masking ?? 0}, impacto funcional ${totals.funcional ?? 0}. Quero orientação sobre avaliação neuropsicológica.`,
    };
  }

  return {
    tone,
    title: copy.title,
    description: copy.description,
    metrics,
    disclaimer: "este rastreamento não substitui avaliação diagnóstica. O diagnóstico de TEA exige análise clínica, histórico do desenvolvimento, observação do comportamento, informações da família e da escola, além de investigação de outras possibilidades.",
    whatsappMessage: `Olá, fiz o rastreamento de autismo infantil no site. Faixa: ${variantLabel}. Resultado: ${copy.type}. Pontuação total: ${total}. Indicadores relevantes: ${relevantIndicators}. Áreas: social ${totals.social ?? 0}, comunicação ${totals.comunicacao ?? 0}, repetição ${totals.repeticao ?? 0}, rigidez ${totals.rigidez ?? 0}, sensorial ${totals.sensorial ?? 0}, regulação emocional ${totals.comportamento ?? 0}. Quero orientação sobre avaliação neuropsicológica infantil.`,
  };
}
