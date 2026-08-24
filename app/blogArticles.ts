export type BlogArticleSection = {
  title: string;
  paragraphs: string[];
  points?: string[];
};

export type BlogArticle = {
  slug: string;
  eyebrow: string;
  title: string;
  description: string;
  introduction: string;
  sections: BlogArticleSection[];
  relatedLinks: Array<{ label: string; href: string }>;
};

export const blogArticles: BlogArticle[] = [
  {
    slug: "tdah-ansiedade-ou-burnout-como-diferenciar-em-adultos",
    eyebrow: "Funcionamento adulto",
    title: "TDAH, ansiedade ou burnout: como diferenciar em adultos?",
    description:
      "Entenda por que desatenção, esquecimento e dificuldade de organização podem ter diferentes causas e como uma avaliação cuidadosa ajuda na diferenciação.",
    introduction:
      "Desatenção, esquecimento, procrastinação, irritabilidade e queda de produtividade podem aparecer em diferentes condições. A semelhança entre os sinais torna inadequado concluir apenas por listas ou testes isolados.",
    sections: [
      {
        title: "Sintomas semelhantes podem ter histórias diferentes",
        paragraphs: [
          "No TDAH, a investigação considera o desenvolvimento e a presença de dificuldades em diferentes momentos e contextos. Na ansiedade, preocupações, tensão e antecipação podem consumir recursos atencionais. No esgotamento relacionado ao trabalho, a relação temporal com sobrecarga prolongada também é relevante.",
          "Sono, humor, uso de medicamentos, condições clínicas, ambiente e demandas atuais podem influenciar o funcionamento e precisam fazer parte da análise.",
        ],
      },
      {
        title: "O que observar antes de procurar ajuda",
        paragraphs: ["Registrar quando as dificuldades surgem, onde aumentam e como afetam a rotina oferece informações importantes."],
        points: [
          "As dificuldades já estavam presentes antes do período atual de estresse?",
          "Elas aparecem no trabalho, em casa e nos estudos ou ficam concentradas em um contexto?",
          "Houve mudança recente de sono, saúde, medicação ou carga de trabalho?",
          "Existe prejuízo funcional persistente ou risco para a segurança e a autonomia?",
        ],
      },
      {
        title: "Por que a avaliação integra diferentes fontes",
        paragraphs: [
          "A avaliação neuropsicológica reúne entrevista clínica, tarefas padronizadas, escalas e informações sobre o cotidiano. Quando pertinente e autorizado, também pode considerar informações de pessoas próximas ou de outros profissionais.",
          "O objetivo não é encaixar a pessoa em um rótulo, mas compreender as hipóteses possíveis, os fatores associados e os cuidados compatíveis com os resultados.",
        ],
      },
    ],
    relatedLinks: [
      { label: "Avaliação neuropsicológica on-line para adultos", href: "/avaliacao-neuropsicologica-online-adultos" },
      { label: "Investigação de TDAH", href: "/avaliacaotdah" },
      { label: "Avaliação para adultos em Curitiba", href: "/avaliacaoneuropsicologicaadulto" },
    ],
  },
  {
    slug: "quanto-custa-uma-avaliação-neuropsicológica",
    eyebrow: "Planejamento do cuidado",
    title: "Quanto custa uma avaliação neuropsicológica?",
    description:
      "Conheça os fatores que compõem uma avaliação neuropsicológica e as perguntas importantes antes de comparar propostas e valores.",
    introduction:
      "O valor de uma avaliação neuropsicológica não corresponde apenas ao tempo das sessões. Ele envolve planejamento, seleção de procedimentos, correção e integração dos resultados, devolutiva e elaboração da documentação psicológica.",
    sections: [
      {
        title: "O que pode influenciar a composição do serviço",
        paragraphs: ["A idade, a demanda, a modalidade e as necessidades de acessibilidade influenciam o planejamento."],
        points: [
          "Quantidade e duração dos encontros previstos.",
          "Procedimentos e instrumentos adequados à pergunta clínica.",
          "Necessidade de contato autorizado com escola, familiares ou profissionais.",
          "Tempo técnico destinado à análise, devolutiva e documentação.",
        ],
      },
      {
        title: "O que perguntar antes de iniciar",
        paragraphs: [
          "Peça uma explicação clara sobre as etapas, a modalidade, o que está incluído e como funciona a devolutiva. A conversa inicial também deve esclarecer a forma de pagamento e os critérios para eventuais ajustes no planejamento.",
          "Comparar apenas o menor preço pode ocultar diferenças importantes de escopo. O mais útil é entender se a proposta responde à demanda apresentada e segue os cuidados técnicos e éticos necessários.",
        ],
      },
      {
        title: "Por que não publicamos um preço único",
        paragraphs: [
          "A avaliação é individualizada e a adequação do serviço precisa ser analisada antes do início. A equipe pode explicar o processo e apresentar as condições correspondentes depois de compreender a necessidade.",
        ],
      },
    ],
    relatedLinks: [
      { label: "Conhecer as modalidades de avaliação", href: "/#atendimentos" },
      { label: "Conversar com a equipe", href: "/#contato" },
    ],
  },
  {
    slug: "não-é-só-inteligência-o-que-você-precisa-saber-sobre-altas-habilidades-superdotação",
    eyebrow: "Desenvolvimento e aprendizagem",
    title: "Não é só inteligência: o que saber sobre altas habilidades/superdotação",
    description:
      "Altas habilidades envolvem diferentes formas de potencial e precisam ser compreendidas junto ao desenvolvimento, às emoções e aos contextos de vida.",
    introduction:
      "Altas habilidades/superdotação não se resumem a uma nota ou a um desempenho elevado em todas as áreas. O perfil pode ser desigual, mudar conforme o contexto e coexistir com dificuldades emocionais, sociais ou de aprendizagem.",
    sections: [
      {
        title: "Potencial e funcionamento cotidiano",
        paragraphs: [
          "A investigação considera raciocínio, criatividade, aprendizagem, interesses, motivação e oportunidades oferecidas pelo ambiente. Também observa como a criança ou o adolescente lida com frustração, expectativas, relações e rotina escolar.",
          "Um resultado isolado não descreve toda a pessoa. História do desenvolvimento, produções, observações e informações da escola ajudam a construir uma compreensão mais completa.",
        ],
      },
      {
        title: "Sinais que podem motivar uma investigação",
        paragraphs: ["Nenhum sinal isolado confirma altas habilidades, mas alguns padrões podem justificar uma conversa profissional."],
        points: [
          "Aprendizagem muito rápida em áreas de interesse.",
          "Curiosidade intensa, perguntas complexas ou produção criativa frequente.",
          "Descompasso entre habilidades avançadas e regulação emocional esperada para a idade.",
          "Desmotivação ou sofrimento quando o ambiente oferece pouco desafio ou compreensão.",
        ],
      },
      {
        title: "Avaliar também significa orientar",
        paragraphs: [
          "Os resultados podem subsidiar estratégias familiares e escolares, oportunidades de enriquecimento e cuidados para dificuldades que coexistam. O objetivo não é criar pressão por desempenho, mas favorecer desenvolvimento e bem-estar.",
        ],
      },
    ],
    relatedLinks: [
      { label: "Avaliação neuropsicológica infantojuvenil", href: "/avaliacaoinfantil" },
      { label: "Entender como funciona o processo", href: "/#como-funciona" },
    ],
  },
  {
    slug: "como-é-feito-o-diagnóstico-de-tdah-em-crianças-uma-abordagem-multidisciplinar",
    eyebrow: "Infância e contexto escolar",
    title: "Como é feita a investigação de TDAH em crianças?",
    description:
      "Veja por que a investigação de TDAH na infância considera desenvolvimento, família, escola, saúde e diferentes fontes de informação.",
    introduction:
      "Agitação, distração e dificuldade de organização podem ter várias explicações. Por isso, a investigação de TDAH na infância não deve depender de um teste ou de um relato isolado.",
    sections: [
      {
        title: "A história do desenvolvimento é o ponto de partida",
        paragraphs: [
          "A entrevista com os responsáveis reúne informações sobre desenvolvimento, saúde, sono, rotina, escolarização e situações em que as dificuldades aparecem. Também é importante compreender recursos, interesses e estratégias que já ajudam a criança.",
        ],
      },
      {
        title: "O contexto escolar amplia a compreensão",
        paragraphs: [
          "Quando pertinente, mediante autorização dos responsáveis e observância do sigilo, o contato com a escola e outros profissionais permite analisar o funcionamento em diferentes ambientes.",
          "As exigências da sala, o método de ensino, as relações, possíveis dificuldades de aprendizagem e fatores emocionais podem modificar o comportamento observado.",
        ],
      },
      {
        title: "A avaliação analisa hipóteses e necessidades",
        paragraphs: [
          "Testes, escalas, tarefas e observação clínica são selecionados conforme idade, demanda e objetivos. Os resultados são integrados à história; não há confirmação automática de uma hipótese previamente formulada.",
          "A conclusão pode subsidiar recomendações, encaminhamentos e estratégias de cuidado, inclusive quando os achados apontam para outra explicação ou para condições associadas.",
        ],
      },
    ],
    relatedLinks: [
      { label: "Avaliação para investigação de TDAH", href: "/avaliacaotdah" },
      { label: "Avaliação infantojuvenil", href: "/avaliacaoinfantil" },
      { label: "Rastreamento informativo de TDAH infantil", href: "/teste-tdah-infantil" },
    ],
  },
  {
    slug: "avaliação-neuropsicológica-x-avaliação-neurológica-qual-é-a-diferença",
    eyebrow: "Entenda os serviços",
    title: "Avaliação neuropsicológica e avaliação neurológica: qual é a diferença?",
    description:
      "Conheça os objetivos da avaliação neuropsicológica e da consulta neurológica e entenda quando os cuidados podem se complementar.",
    introduction:
      "Avaliação neuropsicológica e avaliação neurológica podem investigar aspectos relacionados ao cérebro e ao comportamento, mas têm objetivos, métodos e responsabilidades profissionais diferentes.",
    sections: [
      {
        title: "O que faz a avaliação neuropsicológica",
        paragraphs: [
          "Conduzida por psicóloga ou psicólogo com competência para a atividade, investiga o funcionamento cognitivo, emocional e comportamental por meio de entrevista, instrumentos, tarefas, escalas e integração do contexto de vida.",
          "Pode ajudar a compreender atenção, memória, linguagem, aprendizagem, funções executivas e impactos no cotidiano, produzindo recomendações compatíveis com os resultados.",
        ],
      },
      {
        title: "O que acontece na avaliação neurológica",
        paragraphs: [
          "A consulta com neurologista examina sinais e sintomas relacionados ao sistema nervoso, história clínica e exame físico neurológico. Conforme a necessidade, o médico pode solicitar exames complementares e discutir tratamento medicamentoso ou outras condutas médicas.",
        ],
      },
      {
        title: "Os cuidados podem ser complementares",
        paragraphs: [
          "Em algumas situações, informações neuropsicológicas auxiliam a equipe médica; em outras, dados clínicos e exames médicos são importantes para interpretar o funcionamento cognitivo. Encaminhamentos são discutidos conforme a demanda de cada pessoa.",
        ],
      },
    ],
    relatedLinks: [
      { label: "Avaliação neuropsicológica para adultos", href: "/avaliacaoneuropsicologicaadulto" },
      { label: "Avaliação para pessoas idosas", href: "/avaliacaoneuropsicologicaidoso" },
    ],
  },
  {
    slug: "sinal-da-necessidade-de-avaliação-neuropsicológica",
    eyebrow: "Quando procurar",
    title: "Sinais de que pode ser útil buscar uma avaliação neuropsicológica",
    description:
      "Dificuldades persistentes ou mudanças no funcionamento podem justificar uma avaliação. Conheça situações que merecem orientação profissional.",
    introduction:
      "Esquecimentos, distrações e oscilações fazem parte da vida. A avaliação costuma ser considerada quando as dificuldades são persistentes, representam uma mudança ou interferem de forma relevante na rotina, na autonomia, nos estudos ou no trabalho.",
    sections: [
      {
        title: "Situações que merecem atenção",
        paragraphs: ["A indicação depende do conjunto da história, mas alguns exemplos ajudam a reconhecer impactos funcionais."],
        points: [
          "Dificuldades de atenção, memória, linguagem ou organização que se repetem.",
          "Queda no desempenho escolar ou profissional sem explicação clara.",
          "Mudanças cognitivas percebidas após doença, acidente ou ao longo do envelhecimento.",
          "Dúvidas sobre desenvolvimento, aprendizagem, TDAH, TEA ou outras hipóteses.",
          "Necessidade de planejar adaptações, apoios ou acompanhamento.",
        ],
      },
      {
        title: "A primeira conversa ajuda a definir a pergunta",
        paragraphs: [
          "Nem toda queixa exige uma avaliação neuropsicológica completa. A psicóloga responsável analisa a demanda e pode orientar outro serviço, modalidade ou encaminhamento quando isso for mais adequado.",
        ],
      },
      {
        title: "A avaliação não começa por uma conclusão pronta",
        paragraphs: [
          "O processo investiga hipóteses de forma integrada e considera habilidades preservadas, dificuldades, aspectos emocionais, condições de saúde e contexto. Os resultados subsidiam cuidados; não garantem a confirmação de um diagnóstico específico.",
        ],
      },
    ],
    relatedLinks: [
      { label: "Conhecer as avaliações", href: "/#atendimentos" },
      { label: "Avaliação on-line para adultos", href: "/avaliacao-neuropsicologica-online-adultos" },
    ],
  },
  {
    slug: "quando-procurar-avaliacao-neuropsicologica",
    eyebrow: "Avaliação neuropsicológica",
    title: "Quando vale a pena procurar uma avaliação neuropsicológica?",
    description: "Entenda quando dificuldades cognitivas, emocionais ou comportamentais podem justificar uma avaliação.",
    introduction: "A avaliação pode ser útil quando mudanças ou dificuldades começam a interferir na rotina. O objetivo não é procurar um rótulo, mas compreender o funcionamento e orientar decisões de cuidado.",
    sections: [
      { title: "Impacto no cotidiano", paragraphs: ["A intensidade de um sinal importa menos do que sua persistência, a mudança em relação ao habitual e as consequências para estudos, trabalho, relações ou autonomia."], points: ["Atenção, memória ou organização comprometendo tarefas.", "Mudanças percebidas pela pessoa, família, escola ou equipe de saúde.", "Dúvidas que exigem integrar história, comportamento e desempenho."] },
      { title: "Planejamento individual", paragraphs: ["A conversa inicial ajuda a verificar se a avaliação é indicada, qual pergunta precisa ser respondida e que modalidade combina com a demanda."] },
    ],
    relatedLinks: [{ label: "Conhecer os atendimentos", href: "/#atendimentos" }],
  },
  {
    slug: "atencao-memoria-e-rotina",
    eyebrow: "Vida cotidiana",
    title: "Atenção e memória não funcionam separadas da rotina",
    description: "Sono, estresse, saúde, emoções e ambiente podem influenciar atenção e memória.",
    introduction: "Esquecimentos e distrações nem sempre significam um transtorno. Sono, estresse, ansiedade, sobrecarga, dor, medicamentos e excesso de estímulos podem modificar o desempenho cognitivo.",
    sections: [
      { title: "Observe padrões", paragraphs: ["Registrar quando a dificuldade começou e em quais situações ela aumenta ajuda a orientar uma investigação."], points: ["Reduza tarefas simultâneas.", "Use pistas visuais para compromissos.", "Procure orientação diante de mudança nova, progressiva ou com perda de autonomia."] },
      { title: "Estratégias não substituem investigação", paragraphs: ["Ajustes de rotina podem ajudar, mas uma mudança relevante precisa ser compreendida no contexto de saúde e vida da pessoa."] },
    ],
    relatedLinks: [{ label: "Exercícios de estimulação mental", href: "/exercicios-de-estimulacao-mental" }],
  },
  {
    slug: "devolutiva-na-avaliacao-neuropsicologica",
    eyebrow: "Etapas do processo",
    title: "A devolutiva transforma resultados em orientações compreensíveis",
    description: "Entenda o papel da devolutiva e do laudo psicológico no processo de avaliação neuropsicológica.",
    introduction: "Depois das entrevistas, observações e tarefas, os resultados precisam ser integrados à história e ao contexto. A devolutiva explica o que foi compreendido e discute recomendações possíveis.",
    sections: [
      { title: "Mais do que uma pontuação", paragraphs: ["Os achados incluem habilidades preservadas, dificuldades, hipóteses consideradas e limites do processo. Uma medida isolada não deve ser interpretada fora do conjunto."], points: ["Explicação em linguagem clara.", "Espaço para dúvidas.", "Recomendações conectadas à rotina.", "Encaminhamentos quando pertinentes."] },
      { title: "Utilidade prática", paragraphs: ["A documentação registra o processo, mas a conversa de devolutiva é essencial para transformar conclusões em próximos passos possíveis."] },
    ],
    relatedLinks: [{ label: "Avaliação on-line para adultos", href: "/avaliacao-neuropsicologica-online-adultos" }],
  },
  {
    slug: "estimulacao-mental-na-rotina",
    eyebrow: "Cuidado contínuo",
    title: "Estimulação mental funciona melhor quando faz sentido para a pessoa",
    description: "Veja como incluir desafios cognitivos de forma leve, variada e conectada à vida cotidiana.",
    introduction: "Atividades cognitivas podem variar desafios e manter curiosidade, mas saúde cerebral não depende de um exercício isolado. Movimento, sono, vínculos, alimentação, lazer e cuidado clínico também importam.",
    sections: [
      { title: "Prática possível e variada", paragraphs: ["Escolha tarefas com dificuldade possível e priorize regularidade e interesse pessoal."], points: ["Varie linguagem, atenção, raciocínio e memória.", "Faça sessões breves e consistentes.", "Evite comparações ou interpretações diagnósticas das pontuações."] },
      { title: "Limites dos exercícios", paragraphs: ["Exercícios recreativos não medem capacidade cognitiva, não previnem sozinhos doenças e não substituem avaliação ou tratamento."] },
    ],
    relatedLinks: [{ label: "Escolher um exercício", href: "/exercicios-de-estimulacao-mental" }],
  },
];

export const blogArticleSlugs = blogArticles.map((article) => article.slug);

export function getBlogArticle(slug: string) {
  const normalizedSlug = decodeURIComponent(slug).normalize("NFC");
  return blogArticles.find((article) => article.slug.normalize("NFC") === normalizedSlug);
}
