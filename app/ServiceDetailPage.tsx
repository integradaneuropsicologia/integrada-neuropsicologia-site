import Link from "next/link";
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
  technicalResponsibility?: string;
};

function whatsappHref(message: string) {
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export function ServiceDetailPage({ content }: { content: ServiceDetailContent }) {
  const contactHref = whatsappHref(content.whatsappMessage);

  return (
    <main className="detail-page">
      <SiteHeader />

      <section className="detail-hero">
        <div className="detail-container detail-hero-grid">
          <div className="detail-hero-copy">
            <Link className="detail-back-link" href="/#atendimentos">← Voltar aos atendimentos</Link>
            <p className="detail-eyebrow">{content.eyebrow}</p>
            <h1>{content.title}</h1>
            <p className="detail-hero-lead">{content.introduction}</p>
            <div className="detail-hero-actions">
              <a className="detail-button" href={contactHref} target="_blank" rel="noreferrer">
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

      <section className="detail-final-cta">
        <div className="detail-container detail-final-cta-inner">
          <div>
            <p className="detail-eyebrow">Próximo passo</p>
            <h2>{content.finalTitle}</h2>
            <p>{content.finalText}</p>
          </div>
          <a className="detail-button detail-button-light" href={contactHref} target="_blank" rel="noreferrer">
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
            <Link href="/#duvidas">Dúvidas frequentes</Link>
            <Link href="/exercicios-de-estimulacao-mental">Exercícios de estimulação mental</Link>
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
