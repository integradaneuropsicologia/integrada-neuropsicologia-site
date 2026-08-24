import type { Metadata } from "next";
import { ServiceDetailPage, type ServiceDetailContent } from "../ServiceDetailPage";

export const metadata: Metadata = {
  title: "Avaliação para TDAH | Integrada Neuropsicologia",
  description:
    "Avaliação neuropsicológica para investigar sinais de TDAH, considerando atenção, funções executivas, história de vida e impacto na rotina.",
};

const content = {
  eyebrow: "Avaliação neuropsicológica para TDAH",
  title: "Uma investigação cuidadosa para compreender atenção, impulsividade e organização.",
  introduction:
    "A avaliação reúne história clínica, informações sobre a rotina e instrumentos apropriados para entender como as dificuldades aparecem em diferentes contextos e quais fatores podem estar envolvidos.",
  image: "/adulto.png",
  imageAlt: "Pessoa adulta participando de avaliação neuropsicológica",
  whatsappMessage:
    "Olá! Gostaria de receber orientação sobre avaliação neuropsicológica para investigar TDAH.",
  indicators: [
    { label: "Sessões", value: "Planejamento individual" },
    { label: "Formato", value: "Presencial ou on-line*" },
    { label: "Entrega", value: "Devolutiva e laudo" },
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
  processTitle: "A hipótese é examinada por diferentes fontes de informação.",
  processIntroduction:
    "A composição da avaliação varia conforme a idade, a demanda e o histórico de cada pessoa.",
  steps: [
    { title: "Entrevista clínica", description: "Levantamento do desenvolvimento, da saúde, da escolarização e das dificuldades atuais." },
    { title: "Planejamento individual", description: "Definição dos instrumentos e das informações complementares necessárias." },
    { title: "Sessões de avaliação", description: "Aplicação de testes, escalas e tarefas selecionados para a pergunta clínica." },
    { title: "Análise integrada", description: "Interpretação dos resultados junto à história e ao funcionamento nos diversos ambientes." },
    { title: "Devolutiva e orientações", description: "Explicação dos achados, limites, hipóteses e recomendações para os próximos passos." },
  ],
  disclaimer:
    "A avaliação não parte de um diagnóstico previamente estabelecido nem garante a confirmação de uma hipótese específica. Seu propósito é realizar uma investigação clínica aprofundada, buscando compreender o perfil global da pessoa avaliada e identificar os fatores que podem estar relacionados ao seu sofrimento. A partir dos resultados, será possível indicar o percurso terapêutico e os cuidados mais adequados, favorecendo um desenvolvimento saudável, seguro, com maior previsibilidade e bem-estar.",
  finalTitle: "Sua dúvida pode ser o começo de uma investigação mais clara.",
  finalText:
    "Conte quais dificuldades você percebe e como elas afetam a rotina. A equipe orienta sobre a indicação e o formato possível da avaliação. *A viabilidade on-line depende de triagem prévia.",
} satisfies ServiceDetailContent;

export default function AdhdAssessmentPage() {
  return <ServiceDetailPage content={content} />;
}
