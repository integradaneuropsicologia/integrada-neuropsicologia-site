import type { Metadata } from "next";
import { ServiceDetailPage, type ServiceDetailContent } from "../ServiceDetailPage";

export const metadata: Metadata = {
  title: "Avaliação Neuropsicológica para Idosos | Integrada Neuropsicologia",
  description:
    "Avaliação neuropsicológica para idosos em Curitiba, com investigação cognitiva, orientação familiar e recomendações para autonomia e qualidade de vida.",
};

const content = {
  eyebrow: "Avaliação neuropsicológica para idosos",
  title: "Compreender as mudanças ajuda a cuidar com mais segurança.",
  introduction:
    "A avaliação investiga memória, atenção e outras habilidades cognitivas, considerando saúde, emoções e atividades do dia a dia para orientar a pessoa idosa, sua família e a rede de cuidado.",
  image: "/idoso.png",
  imageAlt: "Pessoa idosa em atividade de cuidado e atenção",
  whatsappMessage:
    "Olá! Gostaria de receber orientação sobre avaliação neuropsicológica para idosos.",
  indicators: [
    { label: "Sessões", value: "Planejamento individual" },
    { label: "Formato", value: "Presencial em Curitiba" },
    { label: "Entrega", value: "Laudo e orientação familiar" },
  ],
  signsTitle: "Mudanças persistentes merecem atenção profissional.",
  signsIntroduction:
    "O envelhecimento traz transformações naturais, mas alguns sinais podem justificar uma investigação mais detalhada.",
  signs: [
    "Esquecimentos frequentes, repetição de perguntas ou perda recorrente de objetos.",
    "Dificuldades novas para lidar com finanças, medicamentos, compromissos ou trajetos.",
    "Alterações de linguagem, orientação, iniciativa, humor ou comportamento.",
    "Necessidade de acompanhar a evolução cognitiva ao longo do tempo.",
    "Solicitação médica, planejamento de cuidados ou avaliação relacionada a procedimento de saúde.",
  ],
  scopeEyebrow: "O que investigamos",
  scopeTitle: "Cognição, funcionalidade e contexto de vida.",
  topics: [
    {
      title: "Memória e aprendizagem",
      description: "Registro, armazenamento e recuperação de informações verbais e visuais.",
    },
    {
      title: "Atenção e funções executivas",
      description: "Concentração, velocidade, planejamento, flexibilidade e tomada de decisões.",
    },
    {
      title: "Linguagem e percepção",
      description: "Nomeação, compreensão, comunicação e reconhecimento de informações.",
    },
    {
      title: "Autonomia e aspectos emocionais",
      description: "Atividades cotidianas, humor, comportamento e fatores que influenciam o desempenho.",
    },
  ],
  processTitle: "Uma avaliação atenta à pessoa e à família.",
  processIntroduction:
    "O planejamento considera condições de saúde, ritmo, necessidades de acessibilidade e a pergunta apresentada pela família ou pelo profissional solicitante.",
  steps: [
    {
      title: "Entrevista inicial",
      description: "Conversa com a pessoa idosa e, mediante concordância, com um familiar ou cuidador.",
    },
    {
      title: "Planejamento",
      description: "Seleção de instrumentos adequados ao histórico, às condições de saúde e às queixas atuais.",
    },
    {
      title: "Sessões de avaliação",
      description: "Investigação de habilidades cognitivas e emocionais, com pausas e adaptações quando necessárias.",
    },
    {
      title: "Análise funcional",
      description: "Integração dos resultados com autonomia, segurança e atividades da vida diária.",
    },
    {
      title: "Devolutiva e laudo",
      description: "Explicação dos achados e recomendações para acompanhamento, rotina e rede de saúde.",
    },
  ],
  disclaimer:
    "A avaliação não parte de um diagnóstico previamente estabelecido nem garante a confirmação de uma hipótese específica. Seu propósito é realizar uma investigação clínica aprofundada, buscando compreender o perfil global da pessoa avaliada e identificar os fatores que podem estar relacionados ao seu sofrimento. A partir dos resultados, será possível indicar o percurso terapêutico e os cuidados mais adequados, favorecendo um desenvolvimento saudável, seguro, com maior previsibilidade e bem-estar.",
  finalTitle: "Cuidar começa por compreender o que mudou.",
  finalText:
    "Conte quais sinais foram percebidos e há quanto tempo. A equipe orienta os próximos passos com respeito à autonomia da pessoa idosa.",
} satisfies ServiceDetailContent;

export default function OlderAdultAssessmentPage() {
  return <ServiceDetailPage content={content} />;
}
