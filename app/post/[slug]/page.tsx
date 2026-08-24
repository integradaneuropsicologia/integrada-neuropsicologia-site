import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { blogArticleSlugs, getBlogArticle } from "../../blogArticles";
import { InformationalFooter } from "../../InformationalFooter";
import { articleJsonLd, breadcrumbJsonLd, createPageMetadata, JsonLd } from "../../seo";
import { SiteHeader } from "../../SiteHeader";

type ArticlePageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return blogArticleSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getBlogArticle(slug);
  if (!article) return { title: "Conteúdo não encontrado | Integrada Neuropsicologia", robots: { index: false } };

  return createPageMetadata({
    title: `${article.title} | Integrada Neuropsicologia`,
    description: article.description,
    path: `/post/${article.slug}`,
    type: "article",
  });
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = getBlogArticle(slug);
  if (!article) notFound();

  const path = `/post/${article.slug}`;

  return (
    <main className="detail-page article-page">
      <JsonLd data={[
        breadcrumbJsonLd([
          { name: "Início", path: "/" },
          { name: "Conteúdos", path: "/blog" },
          { name: article.title, path },
        ]),
        articleJsonLd({ title: article.title, description: article.description, path }),
      ]} />
      <SiteHeader />

      <article>
        <header className="article-hero">
          <div className="detail-container article-hero-inner">
            <nav className="breadcrumbs" aria-label="Navegação estrutural">
              <Link href="/">Início</Link><span aria-hidden="true">›</span>
              <Link href="/blog">Conteúdos</Link><span aria-hidden="true">›</span>
              <span aria-current="page">{article.title}</span>
            </nav>
            <p className="detail-eyebrow">{article.eyebrow}</p>
            <h1>{article.title}</h1>
            <p className="article-lead">{article.introduction}</p>
            <p className="article-byline">Conteúdo informativo da Integrada Neuropsicologia.</p>
          </div>
        </header>

        <div className="detail-container article-layout">
          <div className="article-content">
            {article.sections.map((section) => (
              <section key={section.title}>
                <h2>{section.title}</h2>
                {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                {section.points ? (
                  <ul>
                    {section.points.map((point) => <li key={point}>{point}</li>)}
                  </ul>
                ) : null}
              </section>
            ))}

            <aside className="article-disclaimer">
              <strong>Informação não substitui avaliação individual</strong>
              <p>
                Este conteúdo tem finalidade educativa. Diagnóstico, recomendações e encaminhamentos dependem da
                história, do contexto e da avaliação de cada pessoa.
              </p>
            </aside>
          </div>

          <aside className="article-related" aria-label="Leituras e serviços relacionados">
            <p className="detail-eyebrow">Próximos passos</p>
            <h2>Continue por aqui</h2>
            <nav>
              {article.relatedLinks.map((link) => (
                <Link href={link.href} key={link.href}>{link.label}<span aria-hidden="true">→</span></Link>
              ))}
              <Link href="/blog">Ver todos os conteúdos<span aria-hidden="true">→</span></Link>
            </nav>
          </aside>
        </div>
      </article>

      <InformationalFooter />
    </main>
  );
}
