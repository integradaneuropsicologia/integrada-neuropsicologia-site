export const siteConfig = {
  name: "Integrada Neuropsicologia",
  shortName: "Integrada",
  url: "https://www.integradaneuropsicologia.com.br",
  description:
    "Avaliação neuropsicológica e psicoterapia com atendimento presencial em Curitiba e modalidades on-line conforme o serviço.",
  phoneDisplay: "(41) 99211-3665",
  phoneInternational: "+5541992113665",
  whatsappNumber: "5541992113665",
  googleTagManagerId: "GTM-KHPMDWM9",
  googleReviewsUrl: "https://maps.app.goo.gl/UTfmE9ovaxSuGaCc9",
  address: {
    streetAddress: "Rua Jacarezinho, 1266",
    addressLocality: "Curitiba",
    addressRegion: "PR",
    addressCountry: "BR",
    neighborhood: "Mercês",
  },
  technicalResponsibility:
    "Responsável técnica: Carla Luciana da Conceição Lima — Psicóloga — CRP 08/39739",
} as const;

export function absoluteUrl(path = "/") {
  return new URL(path, siteConfig.url).toString();
}
