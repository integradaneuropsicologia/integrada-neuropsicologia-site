import { createPageMetadata } from "../seo";
import { ServiceDetailPage, type ServiceDetailContent } from "../ServiceDetailPage";

export const metadata = createPageMetadata({
  title: "Avaliação Neuropsicológica Infantojuvenil em Curitiba | Integrada",
  description:
    "Avaliação neuropsicológica infantil em Curitiba, com investigação cuidadosa, orientação à família e recomendações para a rotina e a escola.",
  path: "/avaliacaoinfantil",
});

const content = {
  canonicalPath: "/avaliacaoinfantil",
  eyebrow: "Avaliação neuropsicológica infantojuvenil",
  title: "Compreender o desenvolvimento é o primeiro passo para cuidar melhor.",
  introduction:
    "A avaliação investiga habilidades cognitivas, emocionais e comportamentais de crianças e adolescentes, considerando sua história, rotina familiar e contexto escolar.",
  image: "/infantojuvenil.webp",
  imageAlt: "Criança em atividade lúdica durante acompanhamento profissional",
  whatsappMessage:
    "Olá! Gostaria de receber orientação sobre avaliação neuropsicológica infantojuvenil.",
  secondaryActionLabel: "Veja quando a avaliação pode ser indicada",
  indicators: [
    { label: "Processo", value: "Média de 10 sessões" },
    { label: "Formato", value: "Presencial em Curitiba" },
    { label: "Entrega", value: "Devolutiva e laudo psicológico" },
  ],
  signsTitle: "Alguns sinais merecem uma investigação cuidadosa.",
  signsIntroduction:
    "Uma dificuldade isolada não define uma condição. A avaliação ajuda a reunir informações e compreender como diferentes fatores se relacionam.",
  signs: [
    "Dificuldades persistentes de aprendizagem ou queda no rendimento escolar.",
    "Desatenção, impulsividade, agitação ou dificuldade para organizar tarefas.",
    "Desafios na comunicação, na socialização ou na regulação emocional.",
    "Dúvidas relacionadas ao desenvolvimento, a altas habilidades/superdotação ou a hipóteses clínicas como TDAH e TEA.",
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
    "A avaliação é organizada em 10 encontros. A distribuição das etapas e os procedimentos utilizados são definidos conforme a idade, a demanda e os objetivos da avaliação.",
  steps: [
    {
      title: "Entrevista inicial",
      description: "Conversa com os responsáveis sobre desenvolvimento, saúde, rotina e principais preocupações.",
    },
    {
      title: "Planejamento da avaliação",
      description: "Definição dos procedimentos e instrumentos adequados à idade, à demanda e aos objetivos da avaliação.",
    },
    {
      title: "Encontros com a criança ou adolescente",
      description: "Atividades, testes e observação clínica em um ambiente acolhedor e apropriado à faixa etária.",
    },
    {
      title: "Integração de informações",
      description:
        "Análise integrada dos resultados e, quando pertinente, contato com a escola e outros profissionais envolvidos, mediante autorização dos responsáveis legais e observância do sigilo profissional.",
    },
    {
      title: "Devolutiva e laudo psicológico",
      description: "Explicação clara dos achados, das hipóteses consideradas e das recomendações para os próximos passos.",
    },
  ],
  disclaimer:
    "A avaliação não tem como objetivo confirmar automaticamente um diagnóstico ou uma hipótese previamente formulada. Seu propósito é investigar, de forma integrada, o funcionamento cognitivo, emocional e comportamental da criança ou do adolescente, considerando sua história e os contextos familiar, escolar e social. Os resultados podem subsidiar recomendações, encaminhamentos e estratégias de cuidado compatíveis com as necessidades identificadas.",
  finalTitle: "Você não precisa organizar todas as dúvidas antes de conversar.",
  finalText:
    "Conte o que vem sendo observado. A equipe esclarece como funciona o processo, e a psicóloga responsável analisa se a avaliação é indicada para a demanda apresentada.",
  technicalResponsibility:
    "Responsável técnica: Carla Luciana da Conceição Lima — Psicóloga — CRP 08/39739",
} satisfies ServiceDetailContent;

export default function ChildAssessmentPage() {
  return <ServiceDetailPage content={content} />;
}
