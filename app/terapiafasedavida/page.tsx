import { createPageMetadata } from "../seo";
import { ServiceDetailPage, type ServiceDetailContent } from "../ServiceDetailPage";

export const metadata = createPageMetadata({
  title: "Psicoterapia para Jovens e Adolescentes | Integrada Neuropsicologia",
  description:
    "Psicoterapia para adolescentes e jovens, com acolhimento, participação familiar responsável e estratégias para emoções, relações, estudos e transições.",
  path: "/terapiafasedavida",
});

const content = {
  canonicalPath: "/terapiafasedavida",
  eyebrow: "Psicoterapia para jovens e adolescentes",
  title: "Acolhimento para compreender mudanças e construir novos recursos.",
  introduction:
    "A adolescência e o início da vida adulta trazem transformações importantes. A terapia oferece um espaço protegido para falar sobre emoções, relações, identidade, escolhas e desafios da rotina.",
  image: "/infantojuvenil.webp",
  imageAlt: "Jovem em atividade durante acompanhamento psicológico",
  whatsappMessage:
    "Olá! Gostaria de receber orientação sobre psicoterapia para jovens e adolescentes.",
  secondaryActionLabel: "Veja quando a psicoterapia pode ser indicada",
  indicators: [
    { label: "Acompanhamento", value: "Periodicidade definida em conjunto" },
    { label: "Formato", value: "Definido na conversa inicial" },
    { label: "Abordagem", value: "TCC individualizada" },
  ],
  signsTitle: "Mudanças persistentes podem indicar que é hora de buscar apoio.",
  signsIntroduction:
    "Nem todo desconforto é sinal de um transtorno. O acompanhamento pode ajudar quando o sofrimento ou as dificuldades começam a limitar a vida do jovem.",
  signs: [
    "Ansiedade, irritabilidade, tristeza ou isolamento que persistem e afetam a rotina.",
    "Dificuldades de autoestima, identidade, pertencimento ou imagem corporal.",
    "Conflitos familiares, desafios nas amizades ou experiências de bullying.",
    "Procrastinação, queda no desempenho, pressão acadêmica ou dúvidas profissionais.",
    "Impactos cotidianos relacionados a TDAH, TEA ou outras condições já avaliadas.",
  ],
  scopeEyebrow: "O que podemos trabalhar",
  scopeTitle: "Um espaço para desenvolver voz própria, segurança e autonomia.",
  topics: [
    { title: "Emoções e autocuidado", description: "Reconhecimento de necessidades, manejo de ansiedade e construção de práticas de cuidado." },
    { title: "Relações e comunicação", description: "Limites, habilidades sociais, conflitos e expressão mais segura de sentimentos." },
    { title: "Estudos e rotina", description: "Organização, hábitos, motivação e estratégias para lidar com demandas acadêmicas." },
    { title: "Identidade e escolhas", description: "Valores, autoconhecimento, transições e decisões compatíveis com o momento de vida." },
  ],
  processTitle: "Vínculo, privacidade e participação responsável da família.",
  processIntroduction:
    "A participação dos responsáveis é definida conforme a idade, a demanda e as necessidades do acompanhamento, preservando o sigilo e os princípios éticos aplicáveis.",
  steps: [
    { title: "Conversa inicial", description: "Acolhimento da demanda e compreensão da história e do contexto atual." },
    { title: "Combinados do acompanhamento", description: "Explicação sobre objetivos, sigilo, seus limites, participação dos responsáveis e funcionamento das sessões." },
    { title: "Construção de vínculo", description: "Criação de um espaço seguro, respeitando ritmo, linguagem e interesses do jovem." },
    { title: "Estratégias terapêuticas", description: "Desenvolvimento de recursos emocionais e práticos conectados às situações reais." },
    { title: "Revisão dos objetivos", description: "Acompanhamento das mudanças e alinhamento dos próximos passos com o jovem." },
  ],
  disclaimer:
    "A psicoterapia não oferece garantia de resultados específicos. Quando houver necessidade de avaliação médica ou de outros cuidados, serão discutidos os encaminhamentos pertinentes. Este serviço não se destina ao atendimento de situações de urgência ou emergência. Em atendimentos de adolescentes, a participação dos responsáveis e os limites do sigilo são conduzidos conforme critérios técnicos e éticos.",
  finalTitle: "Buscar apoio pode ajudar a atravessar esta fase com mais recursos.",
  finalText:
    "Conte brevemente o que vem acontecendo. A equipe explica como funciona o atendimento, e a psicóloga responsável analisa a adequação do serviço à demanda apresentada.",
  technicalResponsibility:
    "Responsável técnica: Carla Luciana da Conceição Lima — Psicóloga — CRP 08/39739",
} satisfies ServiceDetailContent;

export default function YouthTherapyPage() {
  return <ServiceDetailPage content={content} />;
}
