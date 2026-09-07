import type { Metadata } from "next";
import { CookieConsent } from "@/components/CookieConsent";
import {
  GoogleConsentDefaults,
  GoogleTagManagerHead,
  GoogleTagManagerNoScript,
  resolveGtmContainerId,
} from "@/components/GoogleTagManager";
import { JsonLd, organizationJsonLd, websiteJsonLd } from "./seo";
import { siteConfig } from "./siteConfig";
import "./globals.css";
import "./landing.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: "Integrada Neuropsicologia | Avaliação em Curitiba e on-line",
  description:
    "Avaliação neuropsicológica para compreender atenção, memória, linguagem, aprendizagem e emoções. Atendimento presencial em Curitiba e modalidades on-line conforme o serviço.",
  applicationName: siteConfig.name,
  manifest: "/manifest.webmanifest",
  icons: {
    icon: [{ url: "/logo-icon.jpg", type: "image/jpeg" }],
    apple: [{ url: "/logo-icon.jpg", type: "image/jpeg" }],
  },
  openGraph: {
    title: "Integrada Neuropsicologia",
    description: "Entender abre caminhos. Avaliação neuropsicológica com escuta, precisão e direcionamento.",
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: "pt_BR",
    type: "website",
    images: [{ url: "/og.webp", width: 1200, height: 630, alt: "Integrada Neuropsicologia — Entender abre caminhos." }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Integrada Neuropsicologia",
    description: "Entender abre caminhos. Avaliação neuropsicológica com escuta, precisão e direcionamento.",
    images: ["/og.webp"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const gtmContainerId = resolveGtmContainerId(siteConfig.googleTagManagerId);

  return (
    <html lang="pt-BR">
      <head>
        <GoogleConsentDefaults />
        <GoogleTagManagerHead containerId={gtmContainerId} />
      </head>
      <body>
        <GoogleTagManagerNoScript containerId={gtmContainerId} />
        <JsonLd data={[organizationJsonLd, websiteJsonLd]} />
        {children}
        <CookieConsent />
      </body>
    </html>
  );
}
