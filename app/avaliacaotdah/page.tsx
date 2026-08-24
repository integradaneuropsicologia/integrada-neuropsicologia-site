import { createPageMetadata } from "../seo";
import { ServiceDetailPage, type ServiceDetailContent } from "../ServiceDetailPage";

export const metadata = createPageMetadata({
  title: "Avaliação Neuropsicológica para Investigação de TDAH | Integrada",
  description:
    "Avaliação neuropsicológica para investigar sinais de TDAH, considerando atenção, funções executivas, história de vida e impacto na rotina.",
  path: "/avaliacaotdah",
});

const content = {
  canonicalPath: "/avaliacaotdah",
  eyebrow: "Avaliação neuropsicológica para investigação de TDAH",
  title: "Uma investigação cuidadosa para compreender atenção, impulsividade e organização.",
  introduction:
    "A avaliação reúne história clínica, informações sobre a rotina e instrumentos apropriados para entender como as dificuldades aparecem em diferentes contextos e quais fatores podem estar envolvidos.",
  image: "/adulto.webp",
  imageAlt: "Pessoa adulta participando de avaliação neuropsicológica",
  whatsappMessage:
    "Olá! Gostaria de receber orientação sobre avaliação neuropsicológica para investigar TDAH.",
  secondaryActionLabel: "Veja quando a avaliação pode ser indicada",
  indicators: [
    { label: "Processo", value: "8 encontros" },
    { label: "Formato", value: "Presencial; on-line para adultos, após análise de adequação" },
    { label: "Entrega", value: "Devolutiva e laudo psicológico" },
  ],
  signsTitle: "Quando as dificuldades são persistentes e afetam mais de uma área da vida.",
  signsIntroduction:
    "Desatenção ou inquietude podem ter diferentes causas. A avaliação ajuda a organizar as informações e a examinar hipóteses de forma responsável.",
  signs: [
    "Dificuldade frequente para iniciar, organizar ou concluir tarefas.",
    "Esquecimentos, perda de prazos ou esforço excessivo para manter o foco.",
    "Impulsividade, inquietação ou dificuldade para regular o ritmo das atividades.",
    "Impacto no estudo, no trabalho, nos relacionamentos ou na administração da rotina.",
    "Dúvidas sobre TDAH ou outras condições que podem apresentar sinais semelhantes.",
  ],
  scopeEyebrow: "O que investigamos",
  scopeTitle: "O perfil cognitivo, a história e o impacto funcional em conjunto.",
  topics: [
    { title: "Atenção", description: "Atenção sustentada, seletiva e alternada em tarefas e situações do cotidiano." },
    { title: "Funções executivas", description: "Planejamento, organização, controle inibitório, flexibilidade e manejo do tempo." },
    { title: "Memória e aprendizagem", description: "Como as informações são registradas, organizadas e recuperadas." },
    { title: "Aspectos emocionais e contextuais", description: "Sono, ansiedade, humor, saúde e ambiente que podem influenciar o funcionamento." },
  ],
  processTitle: "As hipóteses são analisadas a partir de diferentes fontes de informação.",
  processIntroduction:
    "A avaliação é organizada em 8 encontros. A distribuição das etapas e a seleção dos procedimentos são definidas conforme a idade, a demanda e o histórico de cada pessoa.",
  steps: [
    { title: "Entrevista clínica", description: "Levantamento do desenvolvimento, da saúde, da escolarização e das dificuldades atuais." },
    { title: "Planejamento individual", description: "Definição dos procedimentos, instrumentos e fontes complementares de informação adequados aos objetivos da avaliação." },
    { title: "Sessões de avaliação", description: "Aplicação de testes, escalas e tarefas selecionados conforme a idade, a demanda e os objetivos da avaliação." },
    { title: "Análise integrada", description: "Interpretação integrada dos resultados, da história e do funcionamento da pessoa em diferentes contextos." },
    { title: "Devolutiva e laudo psicológico", description: "Explicação dos achados, das hipóteses consideradas, dos limites da avaliação e das recomendações para os próximos passos." },
  ],
  disclaimer:
    "A avaliação não tem como objetivo confirmar automaticamente um diagnóstico ou uma hipótese previamente formulada. Seu propósito é investigar, de forma integrada, o funcionamento cognitivo, emocional e comportamental da pessoa, considerando sua história e os diferentes contextos de vida. Os resultados podem contribuir para a análise da hipótese de TDAH, de outras condições que apresentem manifestações semelhantes e dos fatores que influenciam as dificuldades identificadas, além de subsidiar recomendações e encaminhamentos.",
  finalTitle: "Sua dúvida pode ser o começo de uma investigação mais clara.",
  finalText:
    "Conte quais dificuldades você percebe e como elas afetam a rotina. A equipe explica como funciona o processo, e a psicóloga responsável analisa se a avaliação é indicada e qual modalidade é adequada para a demanda apresentada.",
  relatedLinks: [
    { label: "Avaliação neuropsicológica on-line para adultos", href: "/avaliacao-neuropsicologica-online-adultos" },
    { label: "Avaliação para adultos em Curitiba", href: "/avaliacaoneuropsicologicaadulto" },
    { label: "Psicoterapia para adultos com TDAH", href: "/terapiaparaadultoscomtdah" },
  ],
  technicalResponsibility:
    "Responsável técnica: Carla Luciana da Conceição Lima — Psicóloga — CRP 08/39739",
} satisfies ServiceDetailContent;

export default function AdhdAssessmentPage() {
  return <ServiceDetailPage content={content} />;
}
