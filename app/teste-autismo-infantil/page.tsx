import type { Metadata } from "next";
import { ScreeningPage } from "../ScreeningPage";
import { childAutismScreening } from "../screeningContent";

export const metadata: Metadata = {
  title: "Reflexão sobre Autismo na Infância | Integrada Neuropsicologia",
  description:
    "Conteúdo educativo para responsáveis refletirem sobre comunicação, interação e sensorialidade infantil, sem pontuação ou diagnóstico.",
};

export default function ChildAutismScreeningPage() {
  return <ScreeningPage content={childAutismScreening} />;
}
