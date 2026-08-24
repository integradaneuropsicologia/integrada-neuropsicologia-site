import type { Metadata } from "next";
import { ServiceDetailPage, type ServiceDetailContent } from "../ServiceDetailPage";

export const metadata: Metadata = {
  title: "Avaliação Neuropsicológica para Adultos | Integrada Neuropsicologia",
  description:
    "Avaliação neuropsicológica para adultos em Curitiba, com investigação de atenção, memória, funções executivas e impacto na vida cotidiana.",
};

const content = {
  eyebrow: "Avaliação neuropsicológica para adultos",
  title: "Clareza para compreender seu funcionamento e decidir os próximos passos.",
  introduction:
    "A avaliação reúne entrevista clínica, instrumentos padronizados e análise da rotina para investigar habilidades cognitivas, aspectos emocionais e seu impacto no estudo, no trabalho e nas relações.",
  image: "/adulto.png",
  imageAlt: "Aplicação de instrumento de avaliação neuropsicológica em adulto",
  whatsappMessage:
    "Olá! Gostaria de receber orientação sobre avaliação neuropsicológica para adultos.",
  indicators: [
    { label: "Sessões", value: "Planejamento individual" },
    { label: "Formato", value: "Presencial, on-line ou híbrido" },
    { label: "Entrega", value: "Devolutiva e laudo" },
  ],
  signsTitle: "Quando as dificuldades começam a afetar a vida cotidiana.",
  signsIntroduction:
    "A avaliação ajuda a compreender melhor o que pode estar acontecendo e o quanto isso interfere no dia a dia, sem resumir sua história a um diagnóstico.",
  signs: [
    "Dificuldade frequente para manter o foco, organizar tarefas ou cumprir prazos.",
    "Esquecimentos, sensação de sobrecarga ou queda no desempenho acadêmico e profissional.",
    "Procrastinação, impulsividade ou esforço excessivo para sustentar a rotina.",
    "Dúvidas sobre TDAH, TEA, ansiedade, humor ou outras condições que podem apresentar sintomas semelhantes.",
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
    "O número de sessões e a composição da bateria variam conforme a demanda, o histórico e as condições de cada pessoa.",
  steps: [
    {
      title: "Entrevista clínica",
      description: "Levantamento da história de vida, saúde, desenvolvimento e demandas atuais.",
    },
    {
      title: "Definição do plano",
      description: "Escolha dos instrumentos e das fontes de informação relevantes para a investigação.",
    },
    {
      title: "Sessões de avaliação",
      description: "Aplicação de testes, escalas e tarefas, respeitando ritmo, contexto e condições de participação.",
    },
    {
      title: "Integração clínica",
      description:
        "Análise dos resultados em conjunto com a história, o funcionamento cotidiano e, com autorização do paciente, informações de pessoas próximas indicadas pelo próprio paciente, incorporando outros olhares à investigação.",
    },
    {
      title: "Devolutiva e laudo",
      description: "Apresentação dos achados, hipóteses, limites da avaliação e recomendações individualizadas.",
    },
  ],
  disclaimer:
    "A avaliação não parte de um diagnóstico previamente estabelecido nem garante a confirmação de uma hipótese específica. Seu propósito é realizar uma investigação clínica aprofundada, buscando compreender o perfil global da pessoa avaliada e identificar os fatores que podem estar relacionados ao seu sofrimento. A partir dos resultados, será possível indicar o percurso terapêutico e os cuidados mais adequados, favorecendo um desenvolvimento saudável, seguro, com maior previsibilidade e bem-estar.",
  finalTitle: "Entender melhor é uma forma de cuidar de si.",
  finalText:
    "Fale sobre suas dúvidas e sua rotina. A equipe orienta se a avaliação é adequada para a sua necessidade.",
} satisfies ServiceDetailContent;

export default function AdultAssessmentPage() {
  return <ServiceDetailPage content={content} />;
}
