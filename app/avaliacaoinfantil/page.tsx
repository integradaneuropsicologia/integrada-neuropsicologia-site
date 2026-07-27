import type { Metadata } from "next";
import { ServiceDetailPage, type ServiceDetailContent } from "../ServiceDetailPage";

export const metadata: Metadata = {
  title: "Avaliação Neuropsicológica Infantil | Integrada Neuropsicologia",
  description:
    "Avaliação neuropsicológica infantil em Curitiba, com investigação cuidadosa, orientação à família e recomendações para a rotina e a escola.",
};

const content = {
  eyebrow: "Avaliação neuropsicológica infantojuvenil",
  title: "Compreender o desenvolvimento é o primeiro passo para cuidar melhor.",
  introduction:
    "A avaliação investiga habilidades cognitivas, emocionais e comportamentais de crianças e adolescentes, considerando sua história, rotina familiar e contexto escolar.",
  image: "/infantojuvenil.png",
  imageAlt: "Criança em atividade lúdica durante acompanhamento profissional",
  whatsappMessage:
    "Olá! Gostaria de receber orientação sobre avaliação neuropsicológica infantojuvenil.",
  indicators: [
    { label: "Sessões", value: "Planejamento individual" },
    { label: "Formato", value: "Presencial em Curitiba" },
    { label: "Entrega", value: "Devolutiva e laudo" },
  ],
  signsTitle: "Alguns sinais merecem uma investigação cuidadosa.",
  signsIntroduction:
    "Uma dificuldade isolada não define uma condição. A avaliação ajuda a reunir informações e compreender como diferentes fatores se relacionam.",
  signs: [
    "Dificuldades persistentes de aprendizagem ou queda no rendimento escolar.",
    "Desatenção, impulsividade, agitação ou dificuldade para organizar tarefas.",
    "Desafios na comunicação, na socialização ou na regulação emocional.",
    "Dúvidas sobre desenvolvimento, altas habilidades, TDAH, TEA ou outras hipóteses clínicas.",
    "Solicitação de avaliação feita pela escola, pelo pediatra ou por outro profissional de saúde.",
  ],
  scopeEyebrow: "O que investigamos",
  scopeTitle: "Uma visão integrada da criança e de seu contexto.",
  topics: [
    {
      title: "Atenção e funções executivas",
      description: "Foco, controle de impulsos, flexibilidade, planejamento e organização.",
    },
    {
      title: "Aprendizagem e memória",
      description: "Processos ligados à aquisição, retenção e uso de novas informações.",
    },
    {
      title: "Linguagem e raciocínio",
      description: "Compreensão, expressão, resolução de problemas e perfil intelectual.",
    },
    {
      title: "Aspectos socioemocionais",
      description: "Comportamento, emoções, relações e impacto das dificuldades na rotina.",
    },
  ],
  processTitle: "Um processo construído com a família.",
  processIntroduction:
    "A quantidade de encontros e os instrumentos utilizados são definidos de acordo com a idade e a pergunta clínica.",
  steps: [
    {
      title: "Entrevista inicial",
      description: "Conversa com os responsáveis sobre desenvolvimento, saúde, rotina e principais preocupações.",
    },
    {
      title: "Planejamento da avaliação",
      description: "Seleção de instrumentos e estratégias adequados à idade e às hipóteses que precisam ser investigadas.",
    },
    {
      title: "Encontros com a criança ou adolescente",
      description: "Atividades, testes e observação clínica em um ambiente acolhedor e apropriado à faixa etária.",
    },
    {
      title: "Integração de informações",
      description: "Análise conjunta dos resultados e, quando pertinente e autorizado, diálogo com escola e outros profissionais.",
    },
    {
      title: "Devolutiva e laudo",
      description: "Explicação clara dos achados, das hipóteses consideradas e das recomendações para os próximos passos.",
    },
  ],
  disclaimer:
    "A avaliação não parte de um diagnóstico pronto e não garante a confirmação de uma hipótese específica. Seu objetivo é compreender o perfil da criança ou do adolescente e orientar cuidados coerentes com os resultados.",
  finalTitle: "Você não precisa organizar todas as dúvidas antes de conversar.",
  finalText:
    "Conte o que vem sendo observado. A equipe ajuda a entender se a avaliação é indicada e como o processo pode ser planejado.",
} satisfies ServiceDetailContent;

export default function ChildAssessmentPage() {
  return <ServiceDetailPage content={content} />;
}
