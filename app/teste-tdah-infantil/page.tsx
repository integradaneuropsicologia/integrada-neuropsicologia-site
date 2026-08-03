import type { Metadata } from "next";
import { ScreeningPage } from "../ScreeningPage";
import { childAdhdScreening } from "../screeningContent";

export const metadata: Metadata = {
  title: "Rastreamento de TDAH Infantil | Integrada Neuropsicologia",
  description:
    "Questionário gratuito para responsáveis observarem sinais de desatenção, hiperatividade, impulsividade e comportamento infantil.",
};

export default function ChildAdhdScreeningPage() {
  return <ScreeningPage content={childAdhdScreening} />;
}
