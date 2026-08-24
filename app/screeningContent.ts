export type ScreeningQuestion = { text: string; category?: string };
export type ScreeningSection = { title: string; questions: ScreeningQuestion[] };
export type ScreeningVariant = { id: string; label: string; sections: ScreeningSection[] };
export type ScreeningOption = { label: string; value: number };
export type ScreeningTopic = { title: string; description: string };

export type ScreeningContent = {
  slug: string;
  eyebrow: string;
  title: string;
  introduction: string;
  image: string;
  imageAlt: string;
  questionnaireTitle: string;
  questionnaireIntroduction: string;
  options: ScreeningOption[];
  sections?: ScreeningSection[];
  variants?: ScreeningVariant[];
  categoryLabels?: Record<string, string>;
  scoring: "adult-adhd" | "adult-autism" | "child-adhd" | "child-autism";
  contextTitle: string;
  contextIntroduction: string;
  contextTopics: ScreeningTopic[];
  nextStepTitle: string;
  nextStepText: string;
  assessmentHref: string;
  assessmentLabel: string;
  whatsappMessage: string;
};

const frequencyOptions = [
  { label: "NUNCA", value: 0 },
  { label: "RARAMENTE", value: 1 },
  { label: "ALGUMAS VEZES", value: 2 },
  { label: "FREQUENTEMENTE", value: 3 },
  { label: "MUITO FREQUENTEMENTE", value: 4 },
];

const intensityOptions = [
  { label: "Não acontece", value: 0 },
  { label: "Acontece pouco", value: 1 },
  { label: "Acontece bastante", value: 2 },
  { label: "Acontece muito", value: 3 },
];

const childAdhdOptions = [
  { label: "Nenhum pouco", value: 0 },
  { label: "Só um pouco", value: 1 },
  { label: "Bastante", value: 2 },
  { label: "Demais", value: 3 },
];

const contextTopics = [
  {
    title: "Frequência e duração",
    description: "Uma observação isolada diz pouco. Considere se o padrão se repete, há quanto tempo e em quais momentos aparece.",
  },
  {
    title: "Impacto cotidiano",
    description: "O mais importante é compreender se há sofrimento ou prejuízo relevante nos estudos, trabalho, relações, autocuidado ou rotina.",
  },
  {
    title: "Mais de um contexto",
    description: "Compare ambientes, demandas e percepções de pessoas próximas. O contexto pode facilitar ou aumentar uma dificuldade.",
  },
  {
    title: "Outras explicações",
    description: "Sono, ansiedade, humor, saúde física, uso de substâncias, sobrecarga e condições ambientais também podem influenciar sinais semelhantes.",
  },
];

const adultAdhdSections: ScreeningSection[] = [
  {
    title: "Parte A — Desatenção e organização",
    questions: [
      { text: "Com que frequência você comete erros por falta de atenção quando tem de trabalhar num projeto chato ou difícil?" },
      { text: "Com que frequência você tem dificuldade para manter a atenção quando está fazendo um trabalho chato ou repetitivo?" },
      { text: "Com que frequência você tem dificuldade para se concentrar no que as pessoas dizem, mesmo quando elas estão falando diretamente com você?" },
      { text: "Com que frequência você deixa um projeto pela metade depois de já ter feito as partes mais difíceis?" },
      { text: "Com que frequência você tem dificuldade para fazer um trabalho que exige organização?" },
      { text: "Quando você precisa fazer algo que exige muita concentração, com que frequência você evita ou adia o início?" },
      { text: "Com que frequência você coloca as coisas fora do lugar ou tem dificuldade de encontrar as coisas em casa ou no trabalho?" },
      { text: "Com que frequência você se distrai com atividades ou barulho à sua volta?" },
      { text: "Com que frequência você tem dificuldade para lembrar de compromissos ou obrigações?" },
    ],
  },
  {
    title: "Parte B — Hiperatividade e impulsividade",
    questions: [
      { text: "Com que frequência você fica se mexendo na cadeira ou balançando as mãos ou os pés quando precisa ficar sentado(a) por muito tempo?" },
      { text: "Com que frequência você se levanta da cadeira em reuniões ou em outras situações onde deveria ficar sentado(a)?" },
      { text: "Com que frequência você se sente inquieto(a) ou agitado(a)?" },
      { text: "Com que frequência você tem dificuldade para sossegar e relaxar quando tem tempo livre para você?" },
      { text: "Com que frequência você se sente ativo(a) demais e necessitando fazer coisas, como se estivesse ‘com um motor ligado’?" },
      { text: "Com que frequência você se pega falando demais em situações sociais?" },
      { text: "Quando você está conversando, com que frequência você se pega terminando as frases das pessoas antes delas?" },
      { text: "Com que frequência você tem dificuldade para esperar nas situações onde cada um tem a sua vez?" },
      { text: "Com que frequência você interrompe os outros quando eles estão ocupados?" },
    ],
  },
];

export const adultAdhdScreening = {
  slug: "tdah-adulto",
  eyebrow: "TDAH em adultos • rastreamento gratuito",
  title: "Rastreamento de indicadores de TDAH em adultos",
  introduction: "Dificuldade de foco, desorganização, procrastinação, impulsividade e sensação de estar sempre atrasado podem ser sinais importantes. Este rastreamento ajuda você a perceber se existem indicadores que merecem uma investigação profissional.",
  image: "/adulto.webp",
  imageAlt: "Pessoa adulta em um momento tranquilo de reflexão",
  questionnaireTitle: "Responda às perguntas abaixo",
  questionnaireIntroduction: "Marque a opção que melhor descreve sua frequência nos últimos meses. Responda com sinceridade. Não existe resposta certa ou errada.",
  options: frequencyOptions,
  sections: adultAdhdSections,
  scoring: "adult-adhd",
  contextTitle: "Um sinal só não explica uma história inteira.",
  contextIntroduction: "A avaliação de TDAH na vida adulta considera desenvolvimento, funcionamento atual e possíveis condições associadas. Não se baseia em um questionário isolado.",
  contextTopics,
  nextStepTitle: "Quer compreender melhor o que está acontecendo?",
  nextStepText: "A equipe pode ouvir sua demanda, explicar o processo de avaliação e orientar o próximo passo mais adequado.",
  assessmentHref: "/avaliacao-neuropsicologica-online-adultos",
  assessmentLabel: "Conhecer a avaliação para adultos",
  whatsappMessage: "Olá! Gostaria de orientação sobre avaliação de atenção e possível TDAH em adultos.",
} satisfies ScreeningContent;

const adultAutismCategoryLabels = {
  social: "Interação social",
  comunicacao: "Comunicação social",
  rigidez: "Flexibilidade e rotina",
  repeticao: "Interesses e repetição",
  sensorial: "Sensibilidade sensorial",
  masking: "Masking e adaptação social",
  funcional: "Impacto funcional",
};

const adultAutismSections: ScreeningSection[] = [
  {
    title: "Comunicação, interação, rotina e sensorialidade",
    questions: [
      { text: "Sinto dificuldade para entender indiretas, ironias, piadas ou duplo sentido em conversas.", category: "comunicacao" },
      { text: "Preciso observar ou imitar outras pessoas para saber como agir socialmente.", category: "masking" },
      { text: "Fico exausto depois de interações sociais, mesmo quando elas parecem simples para os outros.", category: "social" },
      { text: "Tenho dificuldade para manter conversas de ida e volta sem me perder, falar demais ou ficar sem resposta.", category: "comunicacao" },
      { text: "Sinto que preciso ensaiar falas, expressões ou respostas antes de situações sociais.", category: "masking" },
      { text: "Tenho dificuldade para perceber quando estou falando demais, sendo direto demais ou incomodando alguém.", category: "social" },
      { text: "Evito eventos sociais porque eles me sobrecarregam ou exigem esforço demais.", category: "social" },
      { text: "Tenho dificuldade para fazer ou manter amizades, mesmo quando tenho vontade de me aproximar.", category: "social" },
      { text: "Mudanças inesperadas na rotina me deixam muito irritado, ansioso ou desorganizado.", category: "rigidez" },
      { text: "Tenho preferência por fazer certas coisas sempre do mesmo jeito.", category: "rigidez" },
      { text: "Fico muito desconfortável quando planos mudam de última hora.", category: "rigidez" },
      { text: "Tenho dificuldade para trocar de tarefa, principalmente quando estou muito focado em algo.", category: "rigidez" },
      { text: "Tenho interesses muito intensos e posso passar muito tempo pesquisando, falando ou pensando neles.", category: "repeticao" },
      { text: "Repito mentalmente conversas, situações ou preocupações por muito tempo.", category: "repeticao" },
      { text: "Faço movimentos, repetições ou pequenas ações que me ajudam a regular ansiedade ou excesso de estímulos.", category: "repeticao" },
      { text: "Sons, cheiros, luzes, texturas, etiquetas, roupas ou alimentos me incomodam mais do que incomodam outras pessoas.", category: "sensorial" },
      { text: "Ambientes cheios, barulhentos ou imprevisíveis me deixam sobrecarregado.", category: "sensorial" },
      { text: "Tenho seletividade alimentar, desconforto com texturas ou preferência intensa por certos alimentos.", category: "sensorial" },
      { text: "Percebo detalhes sensoriais que outras pessoas parecem ignorar.", category: "sensorial" },
      { text: "Preciso de tempo sozinho para me recuperar depois de excesso de estímulos.", category: "sensorial" },
      { text: "Tenho dificuldade para expressar sentimentos de forma que os outros entendam.", category: "comunicacao" },
      { text: "Às vezes pareço frio, distante, rude ou desinteressado, mesmo sem essa intenção.", category: "social" },
      { text: "Tenho dificuldade para entender regras sociais que não são explicadas diretamente.", category: "comunicacao" },
      { text: "Sinto que fui considerado estranho, difícil, intenso ou diferente ao longo da vida.", category: "social" },
      { text: "Já ouvi que faço contato visual diferente, falo de forma muito direta ou tenho expressão facial difícil de interpretar.", category: "comunicacao" },
      { text: "Escondo desconfortos sensoriais ou sociais para não parecer exagerado ou inadequado.", category: "masking" },
      { text: "Depois de muito tempo tentando parecer normal, posso ter crises, isolamento ou esgotamento.", category: "masking" },
      { text: "Sinto que funciono melhor quando tenho previsibilidade, rotina e controle do ambiente.", category: "rigidez" },
      { text: "Tenho dificuldade para explicar minhas necessidades sem parecer exigente, frio ou complicado.", category: "comunicacao" },
      { text: "Minhas dificuldades sociais, sensoriais ou de flexibilidade prejudicam trabalho, relacionamentos, estudos ou qualidade de vida.", category: "funcional" },
    ],
  },
];

export const adultAutismScreening = {
  slug: "autismo-adulto",
  eyebrow: "Autismo em adultos • rastreamento gratuito",
  title: "Rastreamento de sinais de autismo em adultos",
  introduction: "Dificuldade social, exaustão após interações, sensação de ser “diferente”, rigidez, interesses intensos, sensibilidade sensorial e esforço constante para parecer normal podem ser sinais importantes. Este rastreamento ajuda a identificar indicadores que merecem investigação profissional.",
  image: "/adulto.webp",
  imageAlt: "Pessoa adulta observando o ambiente em um momento de reflexão",
  questionnaireTitle: "Responda às perguntas abaixo",
  questionnaireIntroduction: "Pense no seu funcionamento ao longo da vida, especialmente nos últimos meses. Marque a opção que melhor representa a frequência ou intensidade de cada situação.",
  options: intensityOptions,
  sections: adultAutismSections,
  categoryLabels: adultAutismCategoryLabels,
  scoring: "adult-autism",
  contextTitle: "A experiência autista é diversa e precisa ser compreendida com respeito.",
  contextIntroduction: "Uma investigação responsável considera desenvolvimento, contexto, estratégias de adaptação, sensorialidade, comunicação, autonomia e diagnósticos diferenciais.",
  contextTopics,
  nextStepTitle: "Sua história merece uma escuta individualizada.",
  nextStepText: "Converse com a equipe para entender como uma avaliação pode integrar suas experiências sem reduzir você a uma lista de sinais.",
  assessmentHref: "/avaliacao-neuropsicologica-online-adultos",
  assessmentLabel: "Conhecer a avaliação para adultos",
  whatsappMessage: "Olá! Gostaria de orientação sobre avaliação de possível autismo em adultos.",
} satisfies ScreeningContent;

const childAdhdSections: ScreeningSection[] = [
  {
    title: "Desatenção",
    questions: [
      { text: "Costuma cometer erros por descuido em tarefas simples?" },
      { text: "Tem dificuldade em manter a atenção por longos períodos?" },
      { text: "Parece não ouvir quando é chamado diretamente?" },
      { text: "Frequentemente não termina o que começa?" },
      { text: "Tem dificuldade para se organizar?" },
      { text: "Evita ou desiste de tarefas que exigem esforço mental contínuo?" },
      { text: "Costuma perder objetos necessários para tarefas ou atividades?" },
      { text: "Distrai-se facilmente com coisas ao redor?" },
      { text: "Esquece compromissos e tarefas do dia a dia?" },
    ],
  },
  {
    title: "Hiperatividade e impulsividade",
    questions: [
      { text: "Fica inquieto(a), mexendo mãos ou pés com frequência?" },
      { text: "Levanta-se em momentos em que deveria estar sentado(a)?" },
      { text: "Corre ou sobe em locais inadequados para a situação?" },
      { text: "Tem dificuldade em realizar atividades tranquilas?" },
      { text: "Está sempre 'ligado(a) no 220V'?" },
      { text: "Fala em excesso, mesmo sem necessidade?" },
      { text: "Interrompe ou responde antes da pergunta ser finalizada?" },
      { text: "Tem dificuldade em esperar sua vez?" },
      { text: "Se intromete nas conversas ou atividades dos outros?" },
    ],
  },
  {
    title: "Comportamento opositor e regulação emocional",
    questions: [
      { text: "Geralmente contesta ou enfrenta adultos?" },
      { text: "Recusa ou desafia regras impostas por adultos?" },
      { text: "Provoca outras pessoas de propósito?" },
      { text: "Culpa os outros por erros próprios?" },
      { text: "Fica irritado com facilidade?" },
      { text: "Guarda ressentimentos e raiva?" },
      { text: "Age de forma vingativa com frequência?" },
      { text: "Tem dificuldade para controlar suas emoções?" },
    ],
  },
];

export const childAdhdScreening = {
  slug: "tdah-infantil",
  eyebrow: "TDAH na infância • rastreamento para responsáveis",
  title: "Rastreamento de TDAH em crianças e adolescentes",
  introduction: "Este rastreamento ajuda responsáveis a observar sinais de desatenção, hiperatividade, impulsividade, comportamento opositor e regulação emocional que podem estar impactando a rotina da criança.",
  image: "/infantojuvenil.webp",
  imageAlt: "Criança em atividade acompanhada por uma pessoa adulta",
  questionnaireTitle: "Responda às perguntas abaixo",
  questionnaireIntroduction: "Pense no comportamento da criança nos últimos meses e marque a opção que melhor representa a intensidade de cada situação.",
  options: childAdhdOptions,
  sections: childAdhdSections,
  scoring: "child-adhd",
  contextTitle: "Comportamento infantil sempre precisa de contexto.",
  contextIntroduction: "Sono, aprendizagem, emoções, mudanças familiares, ambiente escolar e outras condições do desenvolvimento podem produzir desafios parecidos e devem ser considerados.",
  contextTopics,
  nextStepTitle: "Uma avaliação cuidadosa escuta a criança e sua rede.",
  nextStepText: "A equipe pode orientar responsáveis sobre entrevistas, informações escolares e etapas de uma avaliação infantojuvenil.",
  assessmentHref: "/avaliacaoinfantil",
  assessmentLabel: "Conhecer a avaliação infantojuvenil",
  whatsappMessage: "Olá! Gostaria de orientação sobre atenção e possível TDAH na infância.",
} satisfies ScreeningContent;

const childAutismCategoryLabels = {
  social: "Interação social",
  comunicacao: "Comunicação",
  repeticao: "Comportamentos repetitivos",
  rigidez: "Flexibilidade e rotina",
  sensorial: "Sensibilidade sensorial",
  comportamento: "Regulação emocional",
};

const childAutismPreSchool: ScreeningQuestion[] = [
  { text: "Tem pouco interesse em brincar junto com outras crianças.", category: "social" },
  { text: "Prefere brincar sozinha por longos períodos, mesmo quando há outras crianças por perto.", category: "social" },
  { text: "Tem dificuldade para compartilhar atenção, como mostrar algo interessante ou olhar para onde outra pessoa aponta.", category: "social" },
  { text: "Usa pouco gestos, expressões faciais ou contato visual para se comunicar.", category: "social" },
  { text: "Parece não responder ao nome ou aos chamados em algumas situações.", category: "social" },
  { text: "Tem dificuldade para imitar gestos, brincadeiras ou ações simples de outras pessoas.", category: "social" },
  { text: "Apresenta dificuldade em brincadeiras de faz-de-conta ou brincadeiras imaginativas.", category: "social" },
  { text: "Tem dificuldade para perceber quando outra pessoa está triste, brava ou precisando de ajuda.", category: "social" },
  { text: "Repete palavras, frases, sons ou trechos de desenhos de forma frequente.", category: "repeticao" },
  { text: "Faz movimentos repetitivos, como balançar o corpo, bater as mãos, girar objetos ou andar na ponta dos pés.", category: "repeticao" },
  { text: "Fica muito presa a um tipo específico de brinquedo, objeto, tema ou atividade.", category: "repeticao" },
  { text: "Brinca de forma repetitiva, usando os brinquedos sempre do mesmo jeito.", category: "repeticao" },
  { text: "Fica muito incomodada quando há mudança de rotina, caminho, ordem das atividades ou combinados.", category: "rigidez" },
  { text: "Tem crises ou grande irritação diante de pequenas mudanças.", category: "rigidez" },
  { text: "Insiste para que certas coisas aconteçam sempre do mesmo jeito.", category: "rigidez" },
  { text: "Tem dificuldade para trocar de atividade, mesmo quando avisada antes.", category: "rigidez" },
  { text: "Demonstra incômodo intenso com sons, cheiros, texturas, luzes, etiquetas, roupas ou alimentos.", category: "sensorial" },
  { text: "Busca estímulos sensoriais de forma intensa, como cheirar objetos, tocar superfícies, girar ou pular repetidamente.", category: "sensorial" },
  { text: "Fica muito desconfortável em lugares cheios, barulhentos ou com muitas informações ao mesmo tempo.", category: "sensorial" },
  { text: "Apresenta seletividade alimentar importante por textura, cheiro, cor, temperatura ou marca.", category: "sensorial" },
  { text: "Tem dificuldade para expressar o que sente ou o que deseja de forma compreensível.", category: "comunicacao" },
  { text: "Quando frustrada, tem explosões emocionais difíceis de acalmar.", category: "comportamento" },
  { text: "Parece não entender bem regras sociais simples, como esperar, dividir ou alternar a vez.", category: "social" },
  { text: "Tem dificuldade para manter uma interação simples de ida e volta.", category: "comunicacao" },
  { text: "A família percebe que o desenvolvimento social ou comunicativo parece diferente do esperado.", category: "comunicacao" },
];

const childAutismSchool: ScreeningQuestion[] = [
  { text: "Tem dificuldade para fazer ou manter amizades com crianças da mesma idade.", category: "social" },
  { text: "Parece não entender bem ironias, piadas, expressões faciais ou pistas sociais.", category: "social" },
  { text: "Tem dificuldade para participar de conversas de ida e volta, falando muito de um tema ou respondendo pouco ao outro.", category: "comunicacao" },
  { text: "Evita ou demonstra desconforto em situações sociais, mesmo quando deseja participar.", category: "social" },
  { text: "Tem dificuldade para ajustar o comportamento conforme o ambiente, como escola, casa, visita ou passeio.", category: "social" },
  { text: "Interpreta falas de forma muito literal, sem perceber indiretas, brincadeiras ou duplo sentido.", category: "comunicacao" },
  { text: "Tem dificuldade para perceber quando está incomodando, interrompendo ou invadindo o espaço de outra pessoa.", category: "social" },
  { text: "Prefere interagir com adultos, crianças muito mais novas ou ficar sozinha.", category: "social" },
  { text: "Tem interesses muito intensos, específicos ou repetitivos, falando muito sobre os mesmos temas.", category: "repeticao" },
  { text: "Fica muito irritada ou ansiosa quando precisa mudar planos, horários, caminhos ou rotinas.", category: "rigidez" },
  { text: "Insiste em regras próprias e tem dificuldade para aceitar o jeito dos outros brincarem ou fazerem algo.", category: "rigidez" },
  { text: "Tem comportamentos repetitivos, como balançar, mexer as mãos, repetir sons, frases ou movimentos.", category: "repeticao" },
  { text: "Organiza objetos, brinquedos, materiais ou atividades de forma muito rígida.", category: "rigidez" },
  { text: "Tem dificuldade para lidar com imprevistos, frustrações ou mudanças pequenas.", category: "rigidez" },
  { text: "Demonstra incômodo intenso com sons, cheiros, texturas, luzes, etiquetas, roupas ou alimentos.", category: "sensorial" },
  { text: "Busca estímulos sensoriais de forma intensa, como tocar tudo, cheirar objetos, girar, pular ou apertar coisas.", category: "sensorial" },
  { text: "Fica sobrecarregada em ambientes cheios, barulhentos ou com muitas pessoas.", category: "sensorial" },
  { text: "Apresenta seletividade alimentar importante ou resistência intensa a experimentar novos alimentos.", category: "sensorial" },
  { text: "Tem dificuldade para expressar sentimentos, pedir ajuda ou explicar o que aconteceu.", category: "comunicacao" },
  { text: "Parece ter reações emocionais muito intensas para situações que outras pessoas consideram pequenas.", category: "comportamento" },
  { text: "Tem dificuldade para compreender limites sociais, combinados ou regras implícitas.", category: "social" },
  { text: "Pode parecer rude, fria ou desinteressada, mesmo sem intenção de magoar.", category: "social" },
  { text: "Apresenta sofrimento importante depois de interações sociais, escola, festas ou eventos familiares.", category: "social" },
  { text: "Tem dificuldade para brincar, conversar ou trabalhar em grupo sem conflitos ou isolamento.", category: "social" },
  { text: "A família ou a escola percebe diferenças persistentes na comunicação, socialização ou flexibilidade.", category: "comunicacao" },
];

export const childAutismScreening = {
  slug: "autismo-infantil",
  eyebrow: "Autismo na infância • rastreamento para responsáveis",
  title: "Rastreamento de sinais de autismo infantil",
  introduction: "Este rastreamento ajuda responsáveis a observar sinais relacionados à comunicação social, interação, flexibilidade, sensibilidade sensorial e comportamentos repetitivos em diferentes fases da infância.",
  image: "/infantojuvenil.webp",
  imageAlt: "Criança em um ambiente acolhedor de aprendizagem",
  questionnaireTitle: "Responda às perguntas abaixo",
  questionnaireIntroduction: "Selecione a faixa da criança e marque a opção que melhor representa a frequência ou intensidade de cada situação.",
  options: intensityOptions,
  variants: [
    { id: "pre", label: "Pré-escolar", sections: [{ title: "Faixa pré-escolar", questions: childAutismPreSchool }] },
    { id: "escolar", label: "Escolar", sections: [{ title: "Faixa escolar", questions: childAutismSchool }] },
  ],
  categoryLabels: childAutismCategoryLabels,
  scoring: "child-autism",
  contextTitle: "Cada criança tem um percurso e uma forma própria de se comunicar.",
  contextIntroduction: "Uma investigação respeitosa considera desenvolvimento, linguagem, aprendizagem, sensorialidade, saúde, relações e informações de diferentes cuidadores e educadores.",
  contextTopics,
  nextStepTitle: "Compreender necessidades ajuda a construir apoios melhores.",
  nextStepText: "A equipe pode explicar como funciona a avaliação infantojuvenil e quais informações de família, escola e profissionais podem contribuir.",
  assessmentHref: "/avaliacaoinfantil",
  assessmentLabel: "Conhecer a avaliação infantojuvenil",
  whatsappMessage: "Olá! Gostaria de orientação sobre desenvolvimento e possível autismo na infância.",
} satisfies ScreeningContent;
