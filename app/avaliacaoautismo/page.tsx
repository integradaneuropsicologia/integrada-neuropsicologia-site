import type { Metadata } from "next";
import { ServiceDetailPage, type ServiceDetailContent } from "../ServiceDetailPage";

export const metadata: Metadata = {
  title: "Avaliação para TEA e Autismo | Integrada Neuropsicologia",
  description:
    "Avaliação neuropsicológica para investigar sinais relacionados ao espectro autista, com análise do desenvolvimento, comunicação, comportamento e rotina.",
};

const content = {
  eyebrow: "Avaliação neuropsicológica para TEA / Autismo",
  title: "Compreender características, necessidades e potencialidades com respeito à singularidade.",
  introduction:
    "A investigação considera a história do desenvolvimento, a comunicação, as relações, os interesses, o perfil sensorial e o funcionamento cotidiano, sem reduzir a pessoa a uma lista de sinais.",
  image: "/infantojuvenil.png",
  imageAlt: "Pessoa participando de atividade durante avaliação neuropsicológica",
  whatsappMessage:
    "Olá! Gostaria de receber orientação sobre avaliação neuropsicológica para investigar TEA/autismo.",
  indicators: [
    { label: "Sessões", value: "Planejamento por faixa etária" },
    { label: "Formato", value: "Definido após triagem" },
    { label: "Entrega", value: "Devolutiva e laudo" },
  ],
  signsTitle: "Algumas características podem justificar uma avaliação especializada.",
  signsIntroduction:
    "Uma característica isolada não define autismo. O processo busca compreender padrões presentes ao longo do desenvolvimento e seu impacto no contexto atual.",
  signs: [
    "Diferenças persistentes na comunicação, na reciprocidade social ou na leitura de situações sociais.",
    "Necessidade intensa de previsibilidade ou sofrimento diante de mudanças e imprevistos.",
    "Interesses muito específicos, movimentos repetitivos ou formas próprias de autorregulação.",
    "Sensibilidade ou busca acentuada por sons, luzes, texturas, cheiros e outros estímulos.",
    "Esforço elevado para se adaptar socialmente, com cansaço, sobrecarga ou sensação de não pertencimento.",
  ],
  scopeEyebrow: "O que investigamos",
  scopeTitle: "Uma leitura integrada do desenvolvimento e do funcionamento atual.",
  topics: [
    { title: "Comunicação e interação", description: "Reciprocidade, linguagem, compreensão social e formas de estabelecer vínculos." },
    { title: "Comportamentos e interesses", description: "Padrões de repetição, preferências, flexibilidade e necessidade de previsibilidade." },
    { title: "Perfil cognitivo e sensorial", description: "Atenção, memória, funções executivas e respostas a estímulos do ambiente." },
    { title: "Autonomia e qualidade de vida", description: "Demandas, recursos, barreiras e apoios relevantes em casa, na escola ou no trabalho." },
  ],
  processTitle: "A avaliação reúne perspectivas e contextos diferentes.",
  processIntroduction:
    "Os procedimentos são escolhidos de acordo com idade, linguagem, necessidades de acessibilidade e pergunta clínica.",
  steps: [
    { title: "Entrevista inicial", description: "Compreensão da história do desenvolvimento, da rotina e das principais dúvidas." },
    { title: "Plano de investigação", description: "Seleção de instrumentos, observações e fontes de informação adequadas." },
    { title: "Encontros de avaliação", description: "Atividades, testes e observação clínica com os ajustes necessários à participação." },
    { title: "Integração das informações", description: "Análise do conjunto de dados e, quando autorizado, diálogo com familiares ou profissionais." },
    { title: "Devolutiva e recomendações", description: "Apresentação dos achados, das hipóteses e dos apoios que podem favorecer o cotidiano." },
  ],
  disclaimer:
    "A avaliação não parte de um diagnóstico previamente estabelecido nem garante a confirmação de uma hipótese específica. Seu propósito é realizar uma investigação clínica aprofundada, buscando compreender o perfil global da pessoa avaliada e identificar os fatores que podem estar relacionados ao seu sofrimento. A partir dos resultados, será possível indicar o percurso terapêutico e os cuidados mais adequados, favorecendo um desenvolvimento saudável, seguro, com maior previsibilidade e bem-estar.",
  finalTitle: "Uma avaliação responsável também reconhece recursos e necessidades.",
  finalText:
    "Compartilhe suas dúvidas e o momento de vida da pessoa que será avaliada. A equipe orienta como a investigação pode ser organizada.",
} satisfies ServiceDetailContent;

export default function AutismAssessmentPage() {
  return <ServiceDetailPage content={content} />;
}
