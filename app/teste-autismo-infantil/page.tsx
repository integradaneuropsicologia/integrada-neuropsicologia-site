import type { Metadata } from "next";
import { ScreeningPage } from "../ScreeningPage";
import { childAutismScreening } from "../screeningContent";

export const metadata: Metadata = {
  title: "Rastreamento de Autismo Infantil | Integrada Neuropsicologia",
  description:
    "Questionário gratuito de rastreamento de sinais relacionados à comunicação, interação, flexibilidade e sensorialidade infantil.",
};

export default function ChildAutismScreeningPage() {
  return <ScreeningPage content={childAutismScreening} />;
}
