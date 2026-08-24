import Link from "next/link";
import { blogArticles } from "../blogArticles";
import { InformationalFooter } from "../InformationalFooter";
import { breadcrumbJsonLd, createPageMetadata, JsonLd } from "../seo";
import { SiteHeader } from "../SiteHeader";

export const metadata = createPageMetadata({
  title: "Conteúdos sobre Neuropsicologia | Integrada Neuropsicologia",
  description:
    "Informações claras sobre avaliação neuropsicológica, atenção, memória, desenvolvimento, TDAH, TEA e estimulação mental.",
  path: "/blog",
});

export default function BlogPage() {
  return (
    <main className="detail-page blog-page">
      <JsonLd data={breadcrumbJsonLd([
        { name: "Início", path: "/" },
        { name: "Conteúdos", path: "/blog" },
      ])} />
      <SiteHeader />

      <section className="detail-hero">
        <div className="detail-container detail-hero-grid">
          <div className="detail-hero-copy">
            <nav className="breadcrumbs" aria-label="Navegação estrutural">
              <Link href="/">Início</Link><span aria-hidden="true">›</span><span aria-current="page">Conteúdos</span>
            </nav>
            <p className="detail-eyebrow">Conteúdo Integrada</p>
            <h1>Neuropsicologia explicada com clareza e responsabilidade.</h1>
            <p className="detail-hero-lead">
              Leituras sobre avaliação, funcionamento cognitivo e cuidado em diferentes fases da vida, sem promessas
              simplistas ou conclusões por listas de sintomas.
            </p>
            <div className="detail-hero-actions">
              <a className="detail-button" href="#artigos">Explorar conteúdos</a>
              <Link className="detail-text-link" href="/#contato">Falar com a equipe <span aria-hidden="true">→</span></Link>
            </div>
          </div>
          <div className="detail-hero-media">
            <img src="/hero.webp" alt="Família reunida ao ar livre" width="700" height="700" fetchPriority="high" />
          </div>
        </div>
      </section>

      <section className="detail-section detail-scope" id="artigos">
        <div className="detail-container">
          <div className="detail-section-heading detail-section-heading-centered">
            <p className="detail-eyebrow">Biblioteca</p>
            <h2>Escolha um tema para ler no seu ritmo.</h2>
            <p>Os artigos têm finalidade educativa e direcionam para páginas próprias do novo site.</p>
          </div>
          <div className="blog-card-grid">
            {blogArticles.map((article) => (
              <article className="blog-card" key={article.slug}>
                <p className="detail-eyebrow">{article.eyebrow}</p>
                <h3><Link href={`/post/${article.slug}`}>{article.title}</Link></h3>
                <p>{article.description}</p>
                <Link className="detail-text-link" href={`/post/${article.slug}`}>
                  Ler conteúdo <span aria-hidden="true">→</span>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <aside className="detail-disclaimer">
        <div className="detail-container">
          <strong>Sobre estes conteúdos</strong>
          <p>
            Os textos não substituem consulta, avaliação, diagnóstico ou tratamento. Recomendações individuais
            dependem da história, do contexto e das necessidades de cada pessoa.
          </p>
        </div>
      </aside>

      <section className="detail-final-cta">
        <div className="detail-container detail-final-cta-inner">
          <div>
            <p className="detail-eyebrow">Ainda tem dúvidas?</p>
            <h2>Uma conversa pode ajudar a encontrar o próximo passo.</h2>
            <p>Conheça os atendimentos ou explique brevemente sua necessidade para a equipe.</p>
          </div>
          <Link className="detail-button detail-button-light" href="/#contato">Entrar em contato</Link>
        </div>
      </section>

      <InformationalFooter />
    </main>
  );
}
