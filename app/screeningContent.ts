import type { ScreeningContent } from "./ScreeningPage";

const contextTopics = [
  {
    title: "Frequência e duração",
    description:
      "Uma observação isolada diz pouco. Considere se o padrão se repete, há quanto tempo e em quais momentos aparece.",
  },
  {
    title: "Impacto cotidiano",
    description:
      "O mais importante é compreender se há sofrimento ou prejuízo relevante nos estudos, trabalho, relações, autocuidado ou rotina.",
  },
  {
    title: "Mais de um contexto",
    description:
      "Compare ambientes, demandas e percepções de pessoas próximas. O contexto pode facilitar ou aumentar uma dificuldade.",
  },
  {
    title: "Outras explicações",
    description:
      "Sono, ansiedade, humor, saúde física, uso de substâncias, sobrecarga e condições ambientais também podem influenciar sinais semelhantes.",
  },
];

export const adultAdhdScreening = {
  slug: "tdah-adulto",
  eyebrow: "TDAH em adultos • reflexão educativa",
  title: "Observe atenção, organização e impulsividade na vida adulta.",
  introduction:
    "Este checklist ajuda a reunir situações do cotidiano para uma conversa profissional. Ele não é um teste psicológico, não calcula risco e não indica diagnóstico.",
  image: "/adulto.png",
  imageAlt: "Pessoa adulta em um momento tranquilo de reflexão",
  checklistTitle: "O que você tem percebido na sua rotina?",
  checklistIntroduction:
    "Pense em exemplos recentes e também na sua história. Não existem respostas certas ou erradas, e cada item pode ter muitas explicações.",
  checklist: [
    "Tenho dificuldade para iniciar ou concluir tarefas com várias etapas, mesmo quando elas são importantes para mim.",
    "Perco o fio de conversas, leituras ou reuniões e preciso retomar informações com frequência.",
    "Prazos, compromissos ou objetos escapam da minha organização mesmo quando tento usar lembretes e rotinas.",
    "Adio atividades repetitivas ou que exigem esforço mental prolongado e depois preciso agir sob pressão.",
    "Às vezes respondo, decido ou interrompo antes de conseguir avaliar com calma as consequências.",
    "Sinto inquietação física ou mental que torna difícil permanecer em tarefas ou momentos de espera.",
    "Essas experiências aparecem em diferentes áreas da vida e não somente em um período excepcional de cansaço.",
  ],
  contextTitle: "Um sinal só não explica uma história inteira.",
  contextIntroduction:
    "A avaliação de TDAH na vida adulta considera desenvolvimento, funcionamento atual e possíveis condições associadas. Não se baseia em um checklist isolado.",
  contextTopics,
  nextStepTitle: "Quer compreender melhor o que está acontecendo?",
  nextStepText:
    "A equipe pode ouvir sua demanda, explicar o processo de avaliação e orientar o próximo passo mais adequado.",
  assessmentHref: "/avaliacaoneuropsicologicaadulto",
  assessmentLabel: "Conhecer a avaliação para adultos",
  whatsappMessage: "Olá! Gostaria de orientação sobre avaliação de atenção e possível TDAH em adultos.",
} satisfies ScreeningContent;

export const adultAutismScreening = {
  slug: "autismo-adulto",
  eyebrow: "Autismo em adultos • reflexão educativa",
  title: "Reflita sobre comunicação, sensorialidade e necessidade de previsibilidade.",
  introduction:
    "Este material organiza percepções sobre experiências ao longo da vida. Não é instrumento de rastreio validado, não gera pontuação e não confirma autismo.",
  image: "/adulto.png",
  imageAlt: "Pessoa adulta observando o ambiente em um momento de reflexão",
  checklistTitle: "Quais experiências fazem parte da sua história?",
  checklistIntroduction:
    "Considere seu jeito singular de funcionar, incluindo recursos, interesses e dificuldades. Diferenças não são, por si só, sinais de transtorno.",
  checklist: [
    "Interações sociais intensas ou prolongadas podem exigir preparação e deixar um cansaço que pede tempo de recuperação.",
    "Costumo precisar de comunicação direta para compreender ironias, indiretas, expectativas implícitas ou mudanças de tom.",
    "Mudanças inesperadas de plano podem exigir bastante esforço para eu me reorganizar emocionalmente e na prática.",
    "Sons, luzes, texturas, cheiros ou muitos estímulos ao mesmo tempo podem provocar desconforto ou sobrecarga.",
    "Interesses específicos ocupam um papel importante na minha motivação, organização ou sensação de bem-estar.",
    "Às vezes observo e imito comportamentos sociais para me adaptar, e esse esforço pode ser difícil de sustentar.",
    "Reconheço aspectos semelhantes desde fases anteriores da vida, ainda que tenham mudado de forma com o tempo.",
  ],
  contextTitle: "A experiência autista é diversa e precisa ser compreendida com respeito.",
  contextIntroduction:
    "Uma investigação responsável considera desenvolvimento, contexto, estratégias de adaptação, sensorialidade, comunicação, autonomia e diagnósticos diferenciais.",
  contextTopics,
  nextStepTitle: "Sua história merece uma escuta individualizada.",
  nextStepText:
    "Converse com a equipe para entender como uma avaliação pode integrar suas experiências sem reduzir você a uma lista de sinais.",
  assessmentHref: "/avaliacaoneuropsicologicaadulto",
  assessmentLabel: "Conhecer a avaliação para adultos",
  whatsappMessage: "Olá! Gostaria de orientação sobre avaliação de possível autismo em adultos.",
} satisfies ScreeningContent;

export const childAdhdScreening = {
  slug: "tdah-infantil",
  eyebrow: "TDAH na infância • reflexão para responsáveis",
  title: "Observe atenção, movimento e autorregulação no desenvolvimento infantil.",
  introduction:
    "Este checklist foi escrito para ajudar responsáveis a organizar observações. Ele não é um teste validado, não deve ser respondido pela criança e não produz diagnóstico.",
  image: "/infantojuvenil.png",
  imageAlt: "Criança em atividade acompanhada por uma pessoa adulta",
  checklistTitle: "O que os adultos têm observado?",
  checklistIntroduction:
    "Considere idade, etapa de desenvolvimento, ambiente e demandas. Sempre que possível, compare percepções da família e da escola sem rotular a criança.",
  checklist: [
    "A criança encontra dificuldade para manter a atenção em brincadeiras, conversas ou tarefas adequadas à sua idade.",
    "Instruções com várias etapas se perdem com facilidade, mesmo quando foram compreendidas no início.",
    "Materiais, horários e pequenas responsabilidades exigem ajuda muito maior do que o esperado para a fase de desenvolvimento.",
    "O movimento ou a necessidade de levantar aparecem em situações nas quais isso traz dificuldade para a própria criança.",
    "Esperar a vez, pausar uma resposta ou avaliar consequências pode ser especialmente difícil.",
    "As dificuldades são percebidas em mais de um ambiente ou por diferentes adultos de referência.",
    "O padrão persiste ao longo do tempo e afeta aprendizagem, relações, autoestima ou rotina familiar.",
  ],
  contextTitle: "Comportamento infantil sempre precisa de contexto.",
  contextIntroduction:
    "Sono, aprendizagem, emoções, mudanças familiares, ambiente escolar e outras condições do desenvolvimento podem produzir desafios parecidos e devem ser considerados.",
  contextTopics,
  nextStepTitle: "Uma avaliação cuidadosa escuta a criança e sua rede.",
  nextStepText:
    "A equipe pode orientar responsáveis sobre entrevistas, informações escolares e etapas de uma avaliação infantojuvenil.",
  assessmentHref: "/avaliacaoinfantil",
  assessmentLabel: "Conhecer a avaliação infantojuvenil",
  whatsappMessage: "Olá! Gostaria de orientação sobre atenção e possível TDAH na infância.",
} satisfies ScreeningContent;

export const childAutismScreening = {
  slug: "autismo-infantil",
  eyebrow: "Autismo na infância • reflexão para responsáveis",
  title: "Observe comunicação, interação e sensorialidade ao longo do desenvolvimento.",
  introduction:
    "Este conteúdo ajuda responsáveis a reunir exemplos para uma conversa profissional. Não é um instrumento de rastreio validado, não pontua e não confirma autismo.",
  image: "/infantojuvenil.png",
  imageAlt: "Criança em um ambiente acolhedor de aprendizagem",
  checklistTitle: "Quais características chamam atenção no cotidiano?",
  checklistIntroduction:
    "Observe necessidades e também habilidades, interesses e formas próprias de comunicação. O desenvolvimento varia, e nenhum comportamento isolado define uma criança.",
  checklist: [
    "A criança parece precisar de ajuda extra para compartilhar interesses, iniciar trocas ou compreender pistas sociais esperadas para sua fase.",
    "Linguagem muito literal, gestos, expressões ou formas alternativas de comunicação têm papel importante nas interações.",
    "Rotinas, repetições ou movimentos ajudam na organização, e mudanças inesperadas podem gerar sofrimento significativo.",
    "Sons, luzes, texturas, cheiros, alimentos ou contato físico provocam reações intensas ou busca sensorial frequente.",
    "Alguns assuntos ou atividades despertam interesse muito concentrado e podem favorecer aprendizagem e bem-estar.",
    "Brincadeiras compartilhadas, flexibilidade ou transições entre atividades exigem apoio maior em certos contextos.",
    "Características semelhantes são percebidas ao longo do desenvolvimento e em mais de um ambiente.",
  ],
  contextTitle: "Cada criança tem um percurso e uma forma própria de se comunicar.",
  contextIntroduction:
    "Uma investigação respeitosa considera desenvolvimento, linguagem, aprendizagem, sensorialidade, saúde, relações e informações de diferentes cuidadores e educadores.",
  contextTopics,
  nextStepTitle: "Compreender necessidades ajuda a construir apoios melhores.",
  nextStepText:
    "A equipe pode explicar como funciona a avaliação infantojuvenil e quais informações de família, escola e profissionais podem contribuir.",
  assessmentHref: "/avaliacaoinfantil",
  assessmentLabel: "Conhecer a avaliação infantojuvenil",
  whatsappMessage: "Olá! Gostaria de orientação sobre desenvolvimento e possível autismo na infância.",
} satisfies ScreeningContent;
