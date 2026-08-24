import Link from "next/link";
import { breadcrumbJsonLd, faqJsonLd, JsonLd, serviceJsonLd } from "./seo";
import { SiteHeader } from "./SiteHeader";

const whatsappNumber = "5541992113665";

type DetailIndicator = {
  label: string;
  value: string;
};

type DetailTopic = {
  title: string;
  description: string;
};

type DetailStep = {
  title: string;
  description: string;
};

export type ServiceDetailContent = {
  canonicalPath: string;
  breadcrumbLabel?: string;
  eyebrow: string;
  title: string;
  introduction: string;
  image: string;
  imageAlt: string;
  whatsappMessage: string;
  secondaryActionLabel?: string;
  indicators: DetailIndicator[];
  signsTitle: string;
  signsIntroduction?: string;
  signs: string[];
  scopeEyebrow: string;
  scopeTitle: string;
  topics: DetailTopic[];
  processTitle: string;
  processIntroduction: string;
  steps: DetailStep[];
  disclaimer: string;
  finalTitle: string;
  finalText: string;
  faqs?: Array<{ question: string; answer: string }>;
  relatedLinks?: Array<{ label: string; href: string }>;
  technicalResponsibility?: string;
};

function whatsappHref(message: string) {
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export function ServiceDetailPage({ content }: { content: ServiceDetailContent }) {
  const contactHref = whatsappHref(content.whatsappMessage);

  return (
    <main className="detail-page">
      <JsonLd data={[
        breadcrumbJsonLd([
          { name: "Início", path: "/" },
          { name: "Atendimentos", path: "/#atendimentos" },
          { name: content.breadcrumbLabel ?? content.eyebrow, path: content.canonicalPath },
        ]),
        serviceJsonLd({
          name: content.eyebrow,
          description: content.introduction,
          path: content.canonicalPath,
        }),
        ...(content.faqs?.length ? [faqJsonLd(content.faqs)] : []),
      ]} />
      <SiteHeader />

      <section className="detail-hero">
        <div className="detail-container detail-hero-grid">
          <div className="detail-hero-copy">
            <nav className="breadcrumbs" aria-label="Navegação estrutural">
              <Link href="/">Início</Link><span aria-hidden="true">›</span>
              <Link href="/#atendimentos">Atendimentos</Link><span aria-hidden="true">›</span>
              <span aria-current="page">{content.breadcrumbLabel ?? content.eyebrow}</span>
            </nav>
            <h1>{content.eyebrow}</h1>
            <p className="detail-hero-tagline">{content.title}</p>
            <p className="detail-hero-lead">{content.introduction}</p>
            <div className="detail-hero-actions">
              <a className="detail-button" href={contactHref} target="_blank" rel="noreferrer" data-analytics-event="whatsapp_click" data-analytics-context={content.canonicalPath}>
                Quero receber orientação
              </a>
              <a className="detail-text-link" href="#quando-procurar">
                {content.secondaryActionLabel ?? "Entenda se faz sentido para você"} <span aria-hidden="true">↓</span>
              </a>
            </div>
          </div>
          <div className="detail-hero-media">
            <img src={content.image} alt={content.imageAlt} width="700" height="700" fetchPriority="high" />
          </div>
        </div>
      </section>

      <section className="detail-indicators" aria-label="Informações sobre o atendimento">
        <div className="detail-container detail-indicator-grid">
          {content.indicators.map((indicator) => (
            <div className="detail-indicator" key={indicator.label}>
              <span>{indicator.label}</span>
              <strong>{indicator.value}</strong>
            </div>
          ))}
        </div>
      </section>

      <section className="detail-section detail-signs" id="quando-procurar">
        <div className="detail-container detail-two-columns">
          <div className="detail-section-heading">
            <p className="detail-eyebrow">Quando procurar</p>
            <h2>{content.signsTitle}</h2>
            {content.signsIntroduction ? <p>{content.signsIntroduction}</p> : null}
          </div>
          <ul className="detail-check-list">
            {content.signs.map((sign) => (
              <li key={sign}>
                <span aria-hidden="true">✓</span>
                <p>{sign}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="detail-section detail-scope">
        <div className="detail-container">
          <div className="detail-section-heading detail-section-heading-centered">
            <p className="detail-eyebrow">{content.scopeEyebrow}</p>
            <h2>{content.scopeTitle}</h2>
          </div>
          <div className="detail-topic-grid">
            {content.topics.map((topic, index) => (
              <article className="detail-topic-card" key={topic.title}>
                <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                <h3>{topic.title}</h3>
                <p>{topic.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="detail-section detail-process">
        <div className="detail-container detail-process-grid">
          <div className="detail-section-heading">
            <p className="detail-eyebrow">Etapas do atendimento</p>
            <h2>{content.processTitle}</h2>
            <p>{content.processIntroduction}</p>
          </div>
          <ol className="detail-process-list">
            {content.steps.map((step, index) => (
              <li key={step.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <aside className="detail-disclaimer">
        <div className="detail-container">
          <strong>Importante</strong>
          <p>{content.disclaimer}</p>
        </div>
      </aside>

      {content.faqs?.length ? (
        <section className="detail-section detail-faq-section" id="duvidas-do-servico">
          <div className="detail-container detail-two-columns">
            <div className="detail-section-heading">
              <p className="detail-eyebrow">Dúvidas frequentes</p>
              <h2>Informações para começar com mais clareza.</h2>
            </div>
            <div className="faq-list">
              {content.faqs.map((faq) => (
                <details key={faq.question}>
                  <summary>{faq.question}</summary>
                  <p>{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {content.relatedLinks?.length ? (
        <section className="detail-section detail-related-section" aria-label="Atendimentos relacionados">
          <div className="detail-container">
            <div className="detail-section-heading detail-section-heading-centered">
              <p className="detail-eyebrow">Continue explorando</p>
              <h2>Outras páginas que podem ajudar.</h2>
            </div>
            <nav className="detail-related-links">
              {content.relatedLinks.map((link) => <Link href={link.href} key={link.href}>{link.label}<span aria-hidden="true">→</span></Link>)}
            </nav>
          </div>
        </section>
      ) : null}

      <section className="detail-final-cta">
        <div className="detail-container detail-final-cta-inner">
          <div>
            <p className="detail-eyebrow">Próximo passo</p>
            <h2>{content.finalTitle}</h2>
            <p>{content.finalText}</p>
          </div>
          <a className="detail-button detail-button-light" href={contactHref} target="_blank" rel="noreferrer" data-analytics-event="whatsapp_click" data-analytics-context={content.canonicalPath}>
            Conversar com a equipe
          </a>
        </div>
      </section>

      <footer className="detail-footer">
        <div className="detail-container detail-footer-main">
          <Link className="detail-brand detail-brand-footer" href="/" aria-label="Integrada Neuropsicologia — início">
            <img
              src="/logo-horizontal.jpg"
              alt="Integrada Neuropsicologia"
              width="500"
              height="500"
              loading="lazy"
            />
          </Link>
          <p>Avaliando o presente, transformando o futuro.</p>
          <nav aria-label="Links do rodapé">
            <Link href="/#atendimentos">Atendimentos</Link>
            <Link href="/#como-funciona">Como funciona</Link>
            <Link href="/sobre">Sobre a Integrada</Link>
            <Link href="/blog">Conteúdos</Link>
            <Link href="/exercicios-de-estimulacao-mental">Exercícios de estimulação mental</Link>
            <Link href="/politica-de-privacidade">Privacidade</Link>
          </nav>
        </div>
        {content.technicalResponsibility ? (
          <div className="detail-container detail-footer-responsibility">
            <p>{content.technicalResponsibility}</p>
          </div>
        ) : null}
        <div className="detail-container detail-footer-bottom">
          <p>© {new Date().getFullYear()} Integrada Neuropsicologia. Todos os direitos reservados.</p>
          <p>Conteúdo informativo. Não substitui avaliação ou acompanhamento profissional.</p>
        </div>
      </footer>
    </main>
  );
}
