import type { Metadata } from "next";
import { ScreeningPage } from "../ScreeningPage";
import { adultAdhdScreening } from "../screeningContent";

export const metadata: Metadata = {
  title: "Reflexão sobre TDAH em Adultos | Integrada Neuropsicologia",
  description:
    "Checklist educativo para organizar observações sobre atenção, organização e impulsividade na vida adulta, sem pontuação ou diagnóstico.",
};

export default function AdultAdhdScreeningPage() {
  return <ScreeningPage content={adultAdhdScreening} />;
}
