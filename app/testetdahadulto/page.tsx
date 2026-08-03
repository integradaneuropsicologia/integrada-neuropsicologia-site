import type { Metadata } from "next";
import { ScreeningPage } from "../ScreeningPage";
import { adultAdhdScreening } from "../screeningContent";

export const metadata: Metadata = {
  title: "Rastreamento de TDAH em Adultos | Integrada Neuropsicologia",
  description:
    "Questionário gratuito de rastreamento de sinais de desatenção, organização, hiperatividade e impulsividade em adultos.",
};

export default function AdultAdhdScreeningPage() {
  return <ScreeningPage content={adultAdhdScreening} />;
}
