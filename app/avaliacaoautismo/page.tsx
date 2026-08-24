import type { Metadata } from "next";
import { ServiceDetailPage, type ServiceDetailContent } from "../ServiceDetailPage";

export const metadata: Metadata = {
  title: "Avaliação para TEA e Autismo | Integrada Neuropsicologia",
  description:
    "Avaliação neuropsicológica para investigar sinais relacionados ao espectro autista, com análise do desenvolvimento, comunicação, comportamento e rotina.",
};

const content = {
  eyebrow: "Avaliação neuropsicológica para investigação de TEA (autismo)",
  title: "Compreender características, necessidades e potencialidades com respeito à singularidade.",
  introduction:
    "A investigação considera a história do desenvolvimento, a comunicação, as relações, os interesses, o perfil sensorial e o funcionamento cotidiano, sem reduzir a pessoa a uma lista de sinais.",
  image: "/avaliacao-tea-geral.png",
  imageAlt: "Pessoas de diferentes idades em conversa com uma psicóloga",
  whatsappMessage:
    "Olá! Gostaria de receber orientação sobre avaliação neuropsicológica para investigar TEA/autismo.",
  secondaryActionLabel: "Veja quando a avaliação pode ser indicada",
  indicators: [
    { label: "Processo", value: "8 encontros" },
    { label: "Formato", value: "Presencial para crianças e adolescentes; presencial ou on-line para adultos, após análise de adequação" },
    { label: "Entrega", value: "Devolutiva e laudo psicológico" },
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
    "A avaliação é organizada em 8 encontros. A distribuição das etapas e a seleção dos procedimentos são definidas conforme a idade, a linguagem, as necessidades de acessibilidade e os objetivos da avaliação.",
  steps: [
    { title: "Entrevista inicial", description: "Compreensão da história do desenvolvimento, da rotina e das principais dúvidas." },
    { title: "Plano de investigação", description: "Seleção de instrumentos, observações e fontes de informação adequadas." },
    { title: "Encontros de avaliação", description: "Atividades, testes e observação clínica com os ajustes necessários à participação." },
    { title: "Integração das informações", description: "Análise integrada dos resultados, da história e do funcionamento cotidiano. Quando pertinente e mediante autorização da pessoa avaliada ou de seus responsáveis legais, podem ser consideradas informações de familiares, da escola ou de outros profissionais." },
    { title: "Devolutiva e laudo psicológico", description: "Apresentação dos achados, das hipóteses consideradas, dos limites da avaliação e das recomendações para os próximos passos." },
  ],
  disclaimer:
    "A avaliação não tem como objetivo confirmar automaticamente um diagnóstico ou uma hipótese previamente formulada. Seu propósito é investigar, de forma integrada, o desenvolvimento e o funcionamento cognitivo, emocional, comportamental, social e sensorial da pessoa, considerando sua história e seus diferentes contextos de vida. Os resultados podem contribuir para a análise da hipótese de TEA, de outras condições que apresentem características semelhantes e das necessidades de apoio identificadas, além de subsidiar recomendações e encaminhamentos.",
  finalTitle: "Uma avaliação responsável também reconhece recursos e necessidades.",
  finalText:
    "Compartilhe suas dúvidas e o momento de vida da pessoa que será avaliada. A equipe explica como funciona o processo, e a psicóloga responsável analisa se a avaliação é indicada e qual modalidade é adequada para a demanda apresentada.",
  technicalResponsibility:
    "Responsável técnica: Carla Luciana da Conceição Lima — Psicóloga — CRP 08/39739",
} satisfies ServiceDetailContent;

export default function AutismAssessmentPage() {
  return <ServiceDetailPage content={content} />;
}
