import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.integradaneuropsicologia.com.br"),
  title: "Integrada Neuropsicologia | Avaliação e Psicoterapia",
  description:
    "Avaliação neuropsicológica e psicoterapia para crianças, adultos e idosos. Atendimento presencial em Curitiba e on-line em todo o Brasil.",
  openGraph: {
    title: "Integrada Neuropsicologia",
    description: "Entender muda tudo. Avaliação neuropsicológica com escuta, precisão e direcionamento.",
    locale: "pt_BR",
    type: "website",
    images: [{ url: "/og.png", width: 1745, height: 909, alt: "Integrada Neuropsicologia — Entender muda tudo." }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Integrada Neuropsicologia",
    description: "Entender muda tudo. Avaliação neuropsicológica com escuta, precisão e direcionamento.",
    images: ["/og.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
