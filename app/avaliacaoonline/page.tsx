import type { Metadata } from "next";
import { ServiceDetailPage, type ServiceDetailContent } from "../ServiceDetailPage";

export const metadata: Metadata = {
  title: "Avaliação Neuropsicológica On-line | Integrada Neuropsicologia",
  description:
    "Avaliação neuropsicológica on-line para adultos, com instrumentos adequados ao formato remoto, devolutiva e laudo digital.",
};

const content = {
  eyebrow: "Avaliação neuropsicológica on-line",
  title: "Cuidado e rigor técnico, onde você estiver.",
  introduction:
    "A modalidade on-line permite investigar o funcionamento cognitivo de adultos com segurança e privacidade, usando procedimentos compatíveis com o atendimento remoto e respeitando os limites desse formato.",
  image: "/online.png",
  imageAlt: "Pessoa participando de atendimento profissional por videochamada",
  whatsappMessage:
    "Olá! Gostaria de receber orientação sobre avaliação neuropsicológica on-line.",
  indicators: [
    { label: "Sessões", value: "Planejamento individual" },
    { label: "Formato", value: "On-line para adultos" },
    { label: "Entrega", value: "Devolutiva e laudo digital" },
  ],
  signsTitle: "Uma alternativa para quem precisa de flexibilidade.",
  signs: [
    "Dificuldades de atenção, memória, organização ou produtividade que afetam a rotina.",
    "Dúvidas sobre TDAH, TEA, ansiedade, humor ou outras hipóteses em adultos.",
    "Impossibilidade de comparecer presencialmente por distância, mobilidade ou rotina.",
    "Acesso a computador ou tablet, câmera, internet estável e ambiente reservado.",
    "Disponibilidade para seguir orientações técnicas durante cada encontro.",
  ],
  scopeEyebrow: "O que investigamos",
  scopeTitle: "Uma bateria definida para a pergunta clínica e para o formato remoto.",
  topics: [
    {
      title: "Atenção e memória",
      description: "Processos atencionais, aprendizagem e recuperação de informações.",
    },
    {
      title: "Funções executivas",
      description: "Organização, planejamento, flexibilidade, inibição e tomada de decisões.",
    },
    {
      title: "Raciocínio e linguagem",
      description: "Resolução de problemas, compreensão, expressão e velocidade de processamento.",
    },
    {
      title: "Aspectos emocionais e funcionais",
      description: "Sintomas, rotina, relações e impacto percebido no estudo e no trabalho.",
    },
  ],
  processTitle: "Tecnologia a serviço de um processo cuidadoso.",
  processIntroduction:
    "O número de sessões e a composição da bateria variam conforme a demanda, o histórico e as condições de cada pessoa. Somente procedimentos apropriados para aplicação remota são utilizados.",
  steps: [
    {
      title: "Entrevista clínica por vídeo",
      description: "Levantamento da história de vida, saúde, desenvolvimento, demandas atuais e condições necessárias para participação.",
    },
    {
      title: "Definição do plano e orientação técnica",
      description: "Escolha dos instrumentos e das fontes de informação relevantes, além da checagem de equipamentos, privacidade e combinados para os encontros.",
    },
    {
      title: "Sessões de avaliação",
      description: "Aplicação de instrumentos e tarefas adequados ao atendimento remoto.",
    },
    {
      title: "Integração clínica",
      description:
        "Análise dos resultados em conjunto com a história, o funcionamento cotidiano e, com autorização do paciente, informações de pessoas próximas indicadas pelo próprio paciente, incorporando outros olhares à investigação.",
    },
    {
      title: "Devolutiva e laudo digital",
      description: "Apresentação dos achados, hipóteses e recomendações em linguagem clara.",
    },
  ],
  disclaimer:
    "A avaliação não parte de um diagnóstico previamente estabelecido nem garante a confirmação de uma hipótese específica. Seu propósito é realizar uma investigação clínica aprofundada, buscando compreender o perfil global da pessoa avaliada e identificar os fatores que podem estar relacionados ao seu sofrimento. A partir dos resultados, será possível indicar o percurso terapêutico e os cuidados mais adequados, favorecendo um desenvolvimento saudável, seguro, com maior previsibilidade e bem-estar.",
  finalTitle: "Descubra se a modalidade on-line é adequada para você.",
  finalText:
    "Explique brevemente sua necessidade e onde você está. A equipe avalia a viabilidade do formato antes do início do processo.",
} satisfies ServiceDetailContent;

export default function OnlineAssessmentPage() {
  return <ServiceDetailPage content={content} />;
}
