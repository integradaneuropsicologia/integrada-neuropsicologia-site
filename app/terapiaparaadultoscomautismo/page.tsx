import { createPageMetadata } from "../seo";
import { ServiceDetailPage, type ServiceDetailContent } from "../ServiceDetailPage";

export const metadata = createPageMetadata({
  title: "Psicoterapia para Adultos Autistas | Integrada Neuropsicologia",
  description:
    "Psicoterapia para adultos autistas com abordagem individualizada, respeito à neurodiversidade e estratégias conectadas à rotina e aos objetivos pessoais.",
  path: "/terapiaparaadultoscomautismo",
});

const content = {
  canonicalPath: "/terapiaparaadultoscomautismo",
  eyebrow: "Psicoterapia para adultos autistas",
  title: "Um espaço de cuidado que respeita seu modo de perceber e estar no mundo.",
  introduction:
    "O acompanhamento parte das necessidades, dos valores e dos objetivos de cada pessoa, com adaptações de comunicação e estratégias práticas para reduzir sofrimento e ampliar autonomia.",
  image: "/terapia.webp",
  imageAlt: "Sessão de psicoterapia em ambiente acolhedor",
  whatsappMessage:
    "Olá! Gostaria de receber orientação sobre psicoterapia para adultos autistas.",
  secondaryActionLabel: "Veja quando a psicoterapia pode ser indicada",
  indicators: [
    { label: "Acompanhamento", value: "Periodicidade definida em conjunto" },
    { label: "Formato", value: "On-line" },
    { label: "Abordagem", value: "TCC individualizada" },
  ],
  signsTitle: "O acompanhamento pode apoiar diferentes desafios da vida adulta.",
  signsIntroduction:
    "A terapia não busca apagar características autistas. O foco é compreender necessidades, construir recursos e favorecer bem-estar no contexto real da pessoa.",
  signs: [
    "Sobrecarga sensorial, emocional ou social que interfere na rotina.",
    "Cansaço relacionado ao mascaramento e à tentativa constante de atender expectativas externas.",
    "Dificuldades com mudanças, organização, autocuidado ou transições de vida.",
    "Ansiedade, autocrítica, conflitos ou dificuldade para comunicar necessidades e limites.",
    "Desejo de compreender melhor o diagnóstico, a identidade e as próprias formas de regulação.",
  ],
  scopeEyebrow: "O que podemos trabalhar",
  scopeTitle: "Estratégias construídas com a pessoa, não impostas a ela.",
  topics: [
    { title: "Regulação e prevenção de sobrecarga", description: "Reconhecimento de sinais, planejamento de pausas e recursos para momentos difíceis." },
    { title: "Necessidades sensoriais", description: "Identificação de gatilhos e adaptações possíveis nos ambientes do cotidiano." },
    { title: "Comunicação e relações", description: "Expressão de necessidades, limites, acordos e construção de vínculos mais seguros." },
    { title: "Rotina e autonomia", description: "Organização, flexibilidade, tomada de decisões e estratégias compatíveis com o perfil individual." },
  ],
  processTitle: "O plano terapêutico considera preferências e acessibilidade.",
  processIntroduction:
    "Objetivos, ritmo, recursos visuais e formas de comunicação podem ser ajustados ao longo do acompanhamento.",
  steps: [
    { title: "Acolhimento da demanda", description: "Conversa sobre o momento atual, as experiências anteriores e as expectativas para a terapia." },
    { title: "Mapeamento de necessidades", description: "Identificação de desafios, recursos, interesses, sensibilidades e apoios disponíveis." },
    { title: "Objetivos compartilhados", description: "Definição de prioridades concretas e significativas para a pessoa." },
    { title: "Estratégias e experimentos", description: "Construção de ferramentas aplicáveis à rotina, com respeito ao ritmo individual." },
    { title: "Revisão do percurso", description: "Avaliação periódica do que ajuda, do que precisa ser adaptado e dos próximos passos." },
  ],
  disclaimer:
    "A psicoterapia é individualizada e não tem como objetivo normalizar comportamentos nem oferece garantia de resultados específicos. Quando houver necessidade de avaliação médica ou de outros cuidados, serão discutidos os encaminhamentos pertinentes. Este serviço não se destina ao atendimento de situações de urgência ou emergência.",
  finalTitle: "O cuidado pode começar por um espaço em que você não precise se encaixar.",
  finalText:
    "Conte o que você gostaria de trabalhar e quais adaptações favorecem sua participação. A equipe explica como funciona o acompanhamento, e a psicóloga responsável analisa a adequação do serviço à demanda apresentada.",
  relatedLinks: [
    { label: "Avaliação neuropsicológica on-line para adultos", href: "/avaliacao-neuropsicologica-online-adultos" },
    { label: "Como funciona a investigação de TEA", href: "/avaliacaoautismo" },
    { label: "Rastreamento informativo de autismo em adultos", href: "/teste-autismo-adulto" },
  ],
  technicalResponsibility:
    "Responsável técnica: Carla Luciana da Conceição Lima — Psicóloga — CRP 08/39739",
} satisfies ServiceDetailContent;

export default function AutismAdultTherapyPage() {
  return <ServiceDetailPage content={content} />;
}
