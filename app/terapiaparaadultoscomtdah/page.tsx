import type { Metadata } from "next";
import { ServiceDetailPage, type ServiceDetailContent } from "../ServiceDetailPage";

export const metadata: Metadata = {
  title: "Psicoterapia para Adultos com TDAH | Integrada Neuropsicologia",
  description:
    "Psicoterapia para adultos com TDAH, com estratégias individualizadas para organização, regulação emocional, relacionamentos e rotina.",
};

const content = {
  eyebrow: "Psicoterapia para adultos com TDAH",
  title: "Estratégias possíveis para uma rotina que respeite seu funcionamento.",
  introduction:
    "A psicoterapia ajuda a compreender padrões, reduzir sofrimento e experimentar ferramentas para lidar com atenção, impulsividade, emoções e demandas cotidianas.",
  image: "/terapia.png",
  imageAlt: "Conversa entre profissional e pessoa adulta durante psicoterapia",
  whatsappMessage:
    "Olá! Gostaria de receber orientação sobre psicoterapia para adultos com TDAH.",
  indicators: [
    { label: "Sessões", value: "Periodicidade combinada" },
    { label: "Formato", value: "On-line" },
    { label: "Abordagem", value: "TCC individualizada" },
  ],
  signsTitle: "Quando saber o que fazer não é suficiente para conseguir fazer.",
  signsIntroduction:
    "O acompanhamento considera tanto as dificuldades associadas ao TDAH quanto a história, o ambiente e outras questões emocionais presentes.",
  signs: [
    "Procrastinação, atrasos, esquecimentos ou acúmulo recorrente de tarefas.",
    "Dificuldade para definir prioridades, estimar tempo ou sustentar hábitos.",
    "Impulsividade, oscilação de motivação ou emoções vividas com muita intensidade.",
    "Autocrítica, frustração ou sensação de incapacidade após anos de dificuldades.",
    "Impactos no trabalho, nos estudos, nas finanças ou nos relacionamentos.",
  ],
  scopeEyebrow: "O que podemos trabalhar",
  scopeTitle: "Ferramentas práticas e compreensão emocional no mesmo processo.",
  topics: [
    { title: "Planejamento e tempo", description: "Priorização, divisão de tarefas, lembretes e estratégias externas de organização." },
    { title: "Regulação emocional", description: "Reconhecimento de gatilhos, manejo de impulsos e respostas mais flexíveis." },
    { title: "Hábitos e ambiente", description: "Ajustes que reduzem barreiras e favorecem constância sem depender apenas de motivação." },
    { title: "Autoconhecimento e relações", description: "Compreensão de padrões, comunicação de necessidades e reparação da autocrítica." },
  ],
  processTitle: "Pequenas mudanças são planejadas, testadas e ajustadas.",
  processIntroduction:
    "O processo não segue uma receita única: as estratégias são selecionadas conforme objetivos, contexto e recursos disponíveis.",
  steps: [
    { title: "Compreensão da demanda", description: "Mapeamento das dificuldades atuais, da história e dos pontos fortes." },
    { title: "Definição de prioridades", description: "Escolha conjunta de objetivos específicos e viáveis para o momento." },
    { title: "Análise de padrões", description: "Observação de pensamentos, emoções, comportamentos e condições do ambiente." },
    { title: "Aplicação de estratégias", description: "Experimentação de ferramentas entre as sessões e adaptação ao cotidiano." },
    { title: "Revisão e manutenção", description: "Acompanhamento dos avanços e planejamento para lidar com obstáculos e recaídas." },
  ],
  disclaimer:
    "A psicoterapia não substitui avaliação diagnóstica nem acompanhamento médico quando indicados. Os resultados variam conforme as necessidades e o contexto de cada pessoa, e o plano pode incluir encaminhamentos ou cuidado multiprofissional.",
  finalTitle: "Você não precisa resolver tudo de uma vez para começar.",
  finalText:
    "Explique quais situações mais pesam hoje. A equipe orienta sobre o acompanhamento e ajuda a definir um primeiro passo possível.",
} satisfies ServiceDetailContent;

export default function AdhdAdultTherapyPage() {
  return <ServiceDetailPage content={content} />;
}
