import { createPageMetadata } from "../seo";
import { ScreeningPage } from "../ScreeningPage";
import { childAutismScreening } from "../screeningContent";

export const metadata = createPageMetadata({
  title: "Rastreamento de Autismo Infantil | Integrada Neuropsicologia",
  description:
    "Questionário gratuito de rastreamento de sinais relacionados à comunicação, interação, flexibilidade e sensorialidade infantil.",
  path: "/teste-autismo-infantil",
});

export default function ChildAutismScreeningPage() {
  return <ScreeningPage content={childAutismScreening} />;
}
