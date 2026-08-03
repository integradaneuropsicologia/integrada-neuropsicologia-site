import type { Metadata } from "next";
import { ScreeningPage } from "../ScreeningPage";
import { adultAutismScreening } from "../screeningContent";

export const metadata: Metadata = {
  title: "Rastreamento de Autismo em Adultos | Integrada Neuropsicologia",
  description:
    "Questionário gratuito de rastreamento de sinais relacionados à comunicação social, rigidez, sensorialidade e masking em adultos.",
};

export default function AdultAutismScreeningPage() {
  return <ScreeningPage content={adultAutismScreening} />;
}
