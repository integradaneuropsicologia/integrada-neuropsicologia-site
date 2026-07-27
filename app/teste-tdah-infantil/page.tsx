import type { Metadata } from "next";
import { ScreeningPage } from "../ScreeningPage";
import { childAdhdScreening } from "../screeningContent";

export const metadata: Metadata = {
  title: "Reflexão sobre TDAH na Infância | Integrada Neuropsicologia",
  description:
    "Checklist educativo para responsáveis organizarem observações sobre atenção e autorregulação infantil, sem pontuação ou diagnóstico.",
};

export default function ChildAdhdScreeningPage() {
  return <ScreeningPage content={childAdhdScreening} />;
}
