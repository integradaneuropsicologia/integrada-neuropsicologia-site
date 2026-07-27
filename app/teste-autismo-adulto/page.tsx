import type { Metadata } from "next";
import { ScreeningPage } from "../ScreeningPage";
import { adultAutismScreening } from "../screeningContent";

export const metadata: Metadata = {
  title: "Reflexão sobre Autismo em Adultos | Integrada Neuropsicologia",
  description:
    "Conteúdo educativo para refletir sobre comunicação, sensorialidade e previsibilidade na vida adulta, sem pontuação ou diagnóstico.",
};

export default function AdultAutismScreeningPage() {
  return <ScreeningPage content={adultAutismScreening} />;
}
