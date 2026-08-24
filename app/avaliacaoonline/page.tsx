import type { Metadata } from "next";
import { ServiceDetailPage, type ServiceDetailContent } from "../ServiceDetailPage";

export const metadata: Metadata = {
  title: "Avaliação Neuropsicológica On-line | Integrada Neuropsicologia",
  description:
    "Avaliação neuropsicológica on-line para adultos, com instrumentos adequados ao formato remoto, devolutiva e laudo digital.",
};

const content = {
  eyebrow: "Avaliação neuropsicológica on-line",
  title: "Cuidado e rigor técnico, onde você estiver.",
  introduction:
    "A modalidade on-line pode ser utilizada para investigar o funcionamento cognitivo, emocional e funcional de adultos, quando houver indicação técnica e condições adequadas de participação. O processo utiliza procedimentos compatíveis com o atendimento remoto e respeita os limites desse formato.",
  image: "/online.png",
  imageAlt: "Pessoa participando de atendimento profissional por videochamada",
  whatsappMessage:
    "Olá! Gostaria de receber orientação sobre avaliação neuropsicológica on-line.",
  secondaryActionLabel: "Veja quando a modalidade on-line pode ser indicada",
  indicators: [
    { label: "Processo", value: "8 encontros" },
    { label: "Formato", value: "On-line para adultos, após análise de adequação" },
    { label: "Entrega", value: "Devolutiva e laudo psicológico digital" },
  ],
  signsTitle: "Uma alternativa para quem precisa de flexibilidade.",
  signs: [
    "Dificuldades de atenção, memória, organização ou produtividade que afetam a rotina.",
    "Dúvidas sobre TDAH, TEA, ansiedade, alterações de humor ou outras condições que podem apresentar manifestações semelhantes.",
    "Impossibilidade de comparecer presencialmente por distância, mobilidade ou rotina.",
    "Acesso a computador ou tablet, câmera, internet estável e ambiente reservado.",
    "Disponibilidade para seguir orientações técnicas durante cada encontro.",
  ],
  scopeEyebrow: "O que investigamos",
  scopeTitle: "Procedimentos definidos conforme a demanda e as condições do atendimento remoto.",
  topics: [
    {
      title: "Atenção e memória",
      description: "Processos atencionais, aprendizagem e recuperação de informações.",
    },
    {
      title: "Funções executivas",
      description: "Organização, planejamento, flexibilidade, inibição e tomada de decisões.",
    },
    {
      title: "Raciocínio e linguagem",
      description: "Resolução de problemas, compreensão, expressão e velocidade de processamento.",
    },
    {
      title: "Aspectos emocionais e funcionais",
      description: "Sintomas, rotina, relações e impacto percebido no estudo e no trabalho.",
    },
  ],
  processTitle: "Tecnologia a serviço de um processo cuidadoso.",
  processIntroduction:
    "A avaliação é organizada em 8 encontros. A distribuição das etapas e a seleção dos procedimentos são definidas conforme a demanda, o histórico, os objetivos da avaliação e as condições de participação. São utilizados apenas procedimentos e instrumentos compatíveis com a modalidade remota.",
  steps: [
    {
      title: "Entrevista clínica por vídeo",
      description: "Levantamento da história de vida, saúde, desenvolvimento, demandas atuais e condições necessárias para participação.",
    },
    {
      title: "Definição do plano e orientação técnica",
      description: "Definição dos procedimentos, instrumentos e fontes de informação adequados à demanda e à modalidade, além da verificação dos equipamentos, do ambiente reservado e das orientações para os encontros.",
    },
    {
      title: "Sessões de avaliação",
      description: "Aplicação de instrumentos e tarefas adequados ao atendimento remoto.",
    },
    {
      title: "Integração clínica",
      description:
        "Análise integrada dos resultados com a história e o funcionamento cotidiano. Quando pertinente e mediante autorização da pessoa avaliada, podem ser consideradas informações de pessoas próximas ou de outros profissionais.",
    },
    {
      title: "Devolutiva e laudo psicológico digital",
      description: "Apresentação dos achados, das hipóteses consideradas, dos limites da avaliação e das recomendações em linguagem clara.",
    },
  ],
  disclaimer:
    "A avaliação não tem como objetivo confirmar automaticamente um diagnóstico ou uma hipótese previamente formulada. Seu propósito é investigar, de forma integrada, o funcionamento cognitivo, emocional e comportamental da pessoa, considerando sua história e seu contexto. Os resultados podem subsidiar recomendações, encaminhamentos e estratégias de cuidado compatíveis com as necessidades identificadas. Quando as condições técnicas ou clínicas não forem adequadas ao formato remoto, poderá ser indicada a modalidade presencial ou outro encaminhamento.",
  finalTitle: "Verifique se a modalidade on-line é adequada para a sua necessidade.",
  finalText:
    "Explique brevemente sua necessidade e informe onde você está. A equipe esclarece como funciona o processo, e a psicóloga responsável analisa a adequação da modalidade antes do início.",
  technicalResponsibility:
    "Responsável técnica: Carla Luciana da Conceição Lima — Psicóloga — CRP 08/39739",
} satisfies ServiceDetailContent;

export default function OnlineAssessmentPage() {
  return <ServiceDetailPage content={content} />;
}
