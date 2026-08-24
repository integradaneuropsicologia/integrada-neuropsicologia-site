import { createPageMetadata } from "../seo";
import { ScreeningPage } from "../ScreeningPage";
import { adultAutismScreening } from "../screeningContent";

export const metadata = createPageMetadata({
  title: "Rastreamento de Autismo em Adultos | Integrada Neuropsicologia",
  description:
    "Questionário gratuito de rastreamento de sinais relacionados à comunicação social, rigidez, sensorialidade e masking em adultos.",
  path: "/teste-autismo-adulto",
});

export default function AdultAutismScreeningPage() {
  return <ScreeningPage content={adultAutismScreening} />;
}
