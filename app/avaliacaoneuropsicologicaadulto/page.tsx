import { createPageMetadata } from "../seo";
import { ServiceDetailPage, type ServiceDetailContent } from "../ServiceDetailPage";

export const metadata = createPageMetadata({
  title: "Avaliação Neuropsicológica para Adultos em Curitiba | Integrada",
  description:
    "Avaliação neuropsicológica para adultos em Curitiba, com investigação de atenção, memória, funções executivas e impacto na vida cotidiana.",
  path: "/avaliacaoneuropsicologicaadulto",
});

const content = {
  canonicalPath: "/avaliacaoneuropsicologicaadulto",
  eyebrow: "Avaliação neuropsicológica para adultos",
  title: "Clareza para compreender seu funcionamento e decidir os próximos passos.",
  introduction:
    "A avaliação reúne entrevista clínica, instrumentos padronizados e análise da rotina para investigar habilidades cognitivas, aspectos emocionais e seu impacto no estudo, no trabalho e nas relações.",
  image: "/adulto.webp",
  imageAlt: "Aplicação de instrumento de avaliação neuropsicológica em adulto",
  whatsappMessage:
    "Olá! Gostaria de receber orientação sobre avaliação neuropsicológica para adultos.",
  secondaryActionLabel: "Veja quando a avaliação pode ser indicada",
  indicators: [
    { label: "Processo", value: "8 encontros" },
    { label: "Formato", value: "Presencial, on-line ou híbrido, conforme indicação técnica" },
    { label: "Entrega", value: "Devolutiva e laudo psicológico" },
  ],
  signsTitle: "Quando as dificuldades começam a afetar a vida cotidiana.",
  signsIntroduction:
    "A avaliação ajuda a compreender melhor o que pode estar acontecendo e o quanto isso interfere no dia a dia, sem resumir sua história a um diagnóstico.",
  signs: [
    "Dificuldade frequente para manter o foco, organizar tarefas ou cumprir prazos.",
    "Esquecimentos, sensação de sobrecarga ou queda no desempenho acadêmico e profissional.",
    "Procrastinação, impulsividade ou esforço excessivo para sustentar a rotina.",
    "Dúvidas sobre TDAH, TEA, ansiedade, alterações de humor ou outras condições que podem apresentar manifestações semelhantes.",
    "Necessidade de compreender mudanças cognitivas percebidas por você ou por pessoas próximas.",
  ],
  scopeEyebrow: "O que investigamos",
  scopeTitle: "Resultados técnicos conectados à vida real.",
  topics: [
    {
      title: "Atenção e memória",
      description: "Diferentes formas de atenção, aprendizagem e recuperação de informações.",
    },
    {
      title: "Funções executivas",
      description: "Planejamento, organização, flexibilidade, inibição e tomada de decisões.",
    },
    {
      title: "Linguagem e raciocínio",
      description: "Compreensão, expressão, velocidade de processamento e resolução de problemas.",
    },
    {
      title: "Aspectos emocionais e funcionais",
      description: "Humor, ansiedade, comportamento e repercussões na autonomia e na rotina.",
    },
  ],
  processTitle: "Cada etapa responde a uma pergunta clínica.",
  processIntroduction:
    "A avaliação é organizada em 8 encontros. A distribuição das etapas e a seleção dos procedimentos são definidas conforme a demanda, o histórico e as condições de cada pessoa.",
  steps: [
    {
      title: "Entrevista clínica",
      description: "Levantamento da história de vida, saúde, desenvolvimento e demandas atuais.",
    },
    {
      title: "Definição do plano",
      description: "Definição dos procedimentos, instrumentos e fontes de informação adequados à demanda e à modalidade de atendimento.",
    },
    {
      title: "Sessões de avaliação",
      description: "Aplicação de testes, escalas e tarefas selecionados conforme os objetivos da avaliação, a modalidade de atendimento e as condições de participação.",
    },
    {
      title: "Integração clínica",
      description:
        "Análise integrada dos resultados com a história e o funcionamento cotidiano. Quando pertinente e mediante autorização da pessoa avaliada, podem ser consideradas informações de pessoas próximas ou de outros profissionais.",
    },
    {
      title: "Devolutiva e laudo psicológico",
      description: "Apresentação dos achados, hipóteses, limites da avaliação e recomendações individualizadas.",
    },
  ],
  disclaimer:
    "A avaliação não tem como objetivo confirmar automaticamente um diagnóstico ou uma hipótese previamente formulada. Seu propósito é investigar, de forma integrada, o funcionamento cognitivo, emocional e comportamental da pessoa, considerando sua história e seu contexto. Os resultados podem subsidiar recomendações, encaminhamentos e estratégias de cuidado compatíveis com as necessidades identificadas.",
  finalTitle: "Entender melhor é uma forma de cuidar de si.",
  finalText:
    "Fale sobre suas dúvidas e sua rotina. A equipe explica como funciona o processo, e a psicóloga responsável analisa se a avaliação é indicada para a demanda apresentada.",
  relatedLinks: [
    { label: "Entenda a avaliação neuropsicológica on-line para adultos", href: "/avaliacao-neuropsicologica-online-adultos" },
    { label: "Investigação de TDAH", href: "/avaliacaotdah" },
    { label: "Investigação de TEA (autismo)", href: "/avaliacaoautismo" },
  ],
  technicalResponsibility:
    "Responsável técnica: Carla Luciana da Conceição Lima — Psicóloga — CRP 08/39739",
} satisfies ServiceDetailContent;

export default function AdultAssessmentPage() {
  return <ServiceDetailPage content={content} />;
}
