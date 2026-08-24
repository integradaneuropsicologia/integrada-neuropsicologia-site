import type { MetadataRoute } from "next";
import { blogArticleSlugs } from "./blogArticles";
import { exerciseSlugs } from "./exercicios-de-estimulacao-mental/exerciseData";
import { absoluteUrl } from "./siteConfig";

const staticRoutes = [
  "/",
  "/avaliacao-neuropsicologica-online-adultos",
  "/avaliacaoinfantil",
  "/avaliacaoneuropsicologicaadulto",
  "/avaliacaoneuropsicologicaidoso",
  "/avaliacaotdah",
  "/avaliacaoautismo",
  "/terapiaparaadultos",
  "/terapiaparaadultoscomautismo",
  "/terapiaparaadultoscomtdah",
  "/terapiafasedavida",
  "/testetdahadulto",
  "/teste-autismo-adulto",
  "/teste-tdah-infantil",
  "/teste-autismo-infantil",
  "/sobre",
  "/carla-luciana-conceicao-lima",
  "/blog",
  "/exercicios-de-estimulacao-mental",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const articles = blogArticleSlugs.map((slug) => `/post/${slug}`);
  const exercises = exerciseSlugs.map((slug) => `/exercicios-de-estimulacao-mental/${slug}`);

  return [...staticRoutes, ...articles, ...exercises].map((route) => ({
    url: absoluteUrl(route),
    changeFrequency: route === "/" ? "weekly" : route.startsWith("/post/") ? "monthly" : "monthly",
    priority: route === "/" ? 1 : route === "/avaliacao-neuropsicologica-online-adultos" ? 0.9 : 0.7,
  }));
}
