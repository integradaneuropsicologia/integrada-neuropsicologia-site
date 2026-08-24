import { createPageMetadata } from "../seo";
import { ScreeningPage } from "../ScreeningPage";
import { childAdhdScreening } from "../screeningContent";

export const metadata = createPageMetadata({
  title: "Rastreamento de TDAH Infantil | Integrada Neuropsicologia",
  description:
    "Questionário gratuito para responsáveis observarem sinais de desatenção, hiperatividade, impulsividade e comportamento infantil.",
  path: "/teste-tdah-infantil",
});

export default function ChildAdhdScreeningPage() {
  return <ScreeningPage content={childAdhdScreening} />;
}
