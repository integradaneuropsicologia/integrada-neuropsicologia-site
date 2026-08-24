import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Integrada Neuropsicologia",
    short_name: "Integrada",
    description: "Avaliação neuropsicológica e psicoterapia em Curitiba e on-line conforme o serviço.",
    start_url: "/",
    display: "standalone",
    background_color: "#f8f5ef",
    theme_color: "#17302d",
    lang: "pt-BR",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
