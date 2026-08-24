import type { Metadata } from "next";
import { ServiceDetailPage, type ServiceDetailContent } from "../ServiceDetailPage";

export const metadata: Metadata = {
  title: "Avaliação Neuropsicológica para Idosos | Integrada Neuropsicologia",
  description:
    "Avaliação neuropsicológica para idosos em Curitiba, com investigação cognitiva, orientação familiar e recomendações para autonomia e qualidade de vida.",
};

const content = {
  eyebrow: "Avaliação neuropsicológica para pessoas idosas",
  title: "Compreender as mudanças ajuda a cuidar com mais segurança.",
  introduction:
    "A avaliação investiga memória, atenção e outras habilidades cognitivas, considerando condições de saúde, aspectos emocionais e atividades do dia a dia. Os resultados podem subsidiar orientações à pessoa idosa e, quando pertinente e autorizado, à família e à rede de cuidado.",
  image: "/idoso.png",
  imageAlt: "Pessoa idosa em atividade de cuidado e atenção",
  whatsappMessage:
    "Olá! Gostaria de receber orientação sobre avaliação neuropsicológica para idosos.",
  secondaryActionLabel: "Veja quando a avaliação pode ser indicada",
  indicators: [
    { label: "Processo", value: "8 encontros" },
    { label: "Formato", value: "Presencial em Curitiba" },
    { label: "Entrega", value: "Devolutiva e laudo psicológico" },
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
    "A avaliação é organizada em 8 encontros. A distribuição das etapas e a seleção dos procedimentos consideram as condições de saúde, o ritmo, as necessidades de acessibilidade e os objetivos da avaliação.",
  steps: [
    {
      title: "Entrevista inicial",
      description: "Conversa com a pessoa idosa e, quando pertinente, com familiar ou cuidador, mediante consentimento da pessoa avaliada ou de seu responsável legal.",
    },
    {
      title: "Planejamento",
      description: "Definição dos procedimentos e instrumentos adequados ao histórico, às condições de saúde e aos objetivos da avaliação.",
    },
    {
      title: "Sessões de avaliação",
      description: "Investigação de habilidades cognitivas e emocionais, com pausas e adaptações quando necessárias.",
    },
    {
      title: "Análise funcional",
      description: "Integração dos resultados com informações sobre autonomia, segurança e atividades da vida diária.",
    },
    {
      title: "Devolutiva e laudo psicológico",
      description: "Apresentação dos achados, das hipóteses consideradas, dos limites da avaliação e das recomendações para acompanhamento, rotina e rede de saúde.",
    },
  ],
  disclaimer:
    "A avaliação não tem como objetivo confirmar automaticamente um diagnóstico ou uma hipótese previamente formulada. Seu propósito é investigar, de forma integrada, o funcionamento cognitivo, emocional e funcional da pessoa idosa, considerando sua história, suas condições de saúde e sua rotina. Os resultados podem contribuir para compreender as mudanças observadas, analisar hipóteses clínicas e subsidiar recomendações, encaminhamentos e estratégias de cuidado, respeitando a autonomia da pessoa avaliada.",
  finalTitle: "Cuidar começa por compreender o que mudou.",
  finalText:
    "Conte quais sinais foram percebidos e há quanto tempo. A equipe explica como funciona o processo, e a psicóloga responsável analisa se a avaliação é indicada para a demanda apresentada, respeitando a autonomia da pessoa idosa.",
  technicalResponsibility:
    "Responsável técnica: Carla Luciana da Conceição Lima — Psicóloga — CRP 08/39739",
} satisfies ServiceDetailContent;

export default function OlderAdultAssessmentPage() {
  return <ServiceDetailPage content={content} />;
}
