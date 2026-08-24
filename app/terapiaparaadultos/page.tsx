import type { Metadata } from "next";
import { ServiceDetailPage, type ServiceDetailContent } from "../ServiceDetailPage";

export const metadata: Metadata = {
  title: "Psicoterapia TCC para Adultos | Integrada Neuropsicologia",
  description:
    "Psicoterapia para adultos com abordagem cognitivo-comportamental, objetivos individualizados e estratégias aplicáveis à rotina.",
};

const content = {
  eyebrow: "Psicoterapia para adultos — TCC",
  title: "Acolhimento, objetivos claros e estratégias para a vida cotidiana.",
  introduction:
    "A psicoterapia cognitivo-comportamental oferece um espaço de escuta e construção conjunta para compreender padrões, desenvolver recursos e promover mudanças possíveis no seu contexto.",
  image: "/terapia.png",
  imageAlt: "Sessão de psicoterapia em ambiente acolhedor",
  whatsappMessage: "Olá! Gostaria de receber orientação sobre psicoterapia para adultos.",
  secondaryActionLabel: "Veja quando a psicoterapia pode ser indicada",
  indicators: [
    { label: "Acompanhamento", value: "Periodicidade definida em conjunto" },
    { label: "Formato", value: "On-line" },
    { label: "Abordagem", value: "Terapia cognitivo-comportamental" },
  ],
  signsTitle: "A terapia pode fazer sentido em diferentes momentos.",
  signsIntroduction:
    "Não é necessário esperar uma crise ou ter um diagnóstico definido para buscar acompanhamento psicológico.",
  signs: [
    "Ansiedade, sobrecarga, autocrítica ou dificuldade para regular emoções.",
    "Procrastinação, desorganização ou desafios para sustentar hábitos e limites.",
    "Dificuldades de comunicação, relacionamento, adaptação ou tomada de decisões.",
    "Impactos cotidianos relacionados a TDAH, TEA ou outras condições já avaliadas.",
    "Desejo de compreender padrões e construir uma rotina mais coerente com suas necessidades.",
  ],
  scopeEyebrow: "O que podemos trabalhar",
  scopeTitle: "Um plano terapêutico conectado aos seus objetivos.",
  topics: [
    {
      title: "Organização da rotina",
      description: "Estratégias para prioridades, tempo, energia, hábitos e prevenção de sobrecarga.",
    },
    {
      title: "Regulação emocional",
      description: "Reconhecimento de emoções, manejo de ansiedade e ampliação de respostas possíveis.",
    },
    {
      title: "Relações e comunicação",
      description: "Limites, habilidades sociais, resolução de conflitos e expressão de necessidades.",
    },
    {
      title: "Autoconhecimento e autonomia",
      description: "Compreensão de padrões, valores e escolhas alinhadas ao contexto de vida.",
    },
  ],
  processTitle: "Objetivos construídos em conjunto e revistos ao longo do caminho.",
  processIntroduction:
    "A duração e a frequência do acompanhamento dependem das necessidades, dos objetivos e da evolução de cada pessoa.",
  steps: [
    {
      title: "Conversa inicial",
      description: "Acolhimento da demanda, da história e das expectativas sobre o acompanhamento.",
    },
    {
      title: "Definição de objetivos",
      description: "Construção conjunta de prioridades terapêuticas realistas e significativas.",
    },
    {
      title: "Plano terapêutico",
      description: "Seleção de estratégias da TCC adequadas ao momento e ao contexto da pessoa.",
    },
    {
      title: "Sessões e prática",
      description: "Reflexões, exercícios e estratégias que podem ser aplicados entre os encontros.",
    },
    {
      title: "Acompanhamento de progresso",
      description: "Revisão periódica dos objetivos, avanços, dificuldades e próximos passos.",
    },
  ],
  disclaimer:
    "A psicoterapia é individualizada e não oferece garantia de resultados específicos. Quando houver necessidade de avaliação médica ou de outros cuidados, serão discutidos os encaminhamentos pertinentes. Este serviço não se destina ao atendimento de situações de urgência ou emergência.",
  finalTitle: "O primeiro encontro começa com uma conversa.",
  finalText:
    "Conte o que você deseja trabalhar. A equipe explica como funciona o acompanhamento, e a psicóloga responsável analisa a adequação do serviço à demanda apresentada.",
  technicalResponsibility:
    "Responsável técnica: Carla Luciana da Conceição Lima — Psicóloga — CRP 08/39739",
} satisfies ServiceDetailContent;

export default function AdultTherapyPage() {
  return <ServiceDetailPage content={content} />;
}
