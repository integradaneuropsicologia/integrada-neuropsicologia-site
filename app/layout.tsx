import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://integrada-neuropsicologia-site.elieltonlimacosta.chatgpt.site"),
  title: "Integrada Neuropsicologia | Avaliação neuropsicológica",
  description:
    "Avaliação neuropsicológica para compreender atenção, memória, linguagem, aprendizagem e emoções. Atendimento presencial em Curitiba e on-line em todo o Brasil.",
  icons: {
    icon: [{ url: "/logo-icon.jpg", type: "image/jpeg" }],
    apple: [{ url: "/logo-icon.jpg", type: "image/jpeg" }],
  },
  openGraph: {
    title: "Integrada Neuropsicologia",
    description: "Entender abre caminhos. Avaliação neuropsicológica com escuta, precisão e direcionamento.",
    locale: "pt_BR",
    type: "website",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Integrada Neuropsicologia — Entender abre caminhos." }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Integrada Neuropsicologia",
    description: "Entender abre caminhos. Avaliação neuropsicológica com escuta, precisão e direcionamento.",
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
