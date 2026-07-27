import Link from "next/link";
import { InformationalFooter } from "./InformationalFooter";
import { SiteHeader } from "./SiteHeader";

const whatsappNumber = "5541992113665";

type Topic = { title: string; description: string };

export type ScreeningContent = {
  slug: string;
  eyebrow: string;
  title: string;
  introduction: string;
  image: string;
  imageAlt: string;
  checklistTitle: string;
  checklistIntroduction: string;
  checklist: string[];
  contextTitle: string;
  contextIntroduction: string;
  contextTopics: Topic[];
  nextStepTitle: string;
  nextStepText: string;
  assessmentHref: string;
  assessmentLabel: string;
  whatsappMessage: string;
};

function whatsappHref(message: string) {
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export function ScreeningPage({ content }: { content: ScreeningContent }) {
  return (
    <main className="detail-page">
      <SiteHeader />

      <section className="detail-hero">
        <div className="detail-container detail-hero-grid">
          <div className="detail-hero-copy">
            <Link className="detail-back-link" href="/">← Voltar ao início</Link>
            <p className="detail-eyebrow">{content.eyebrow}</p>
            <h1>{content.title}</h1>
            <p className="detail-hero-lead">{content.introduction}</p>
            <div className="detail-hero-actions">
              <a className="detail-button" href="#reflexao">Começar a reflexão</a>
              <a className="detail-text-link" href="#como-interpretar">
                Como usar este conteúdo <span aria-hidden="true">↓</span>
              </a>
            </div>
          </div>
          <div className="detail-hero-media">
            <img src={content.image} alt={content.imageAlt} width="700" height="700" fetchPriority="high" />
          </div>
        </div>
      </section>

      <section className="detail-indicators" aria-label="Características do conteúdo">
        <div className="detail-container detail-indicator-grid">
          <div className="detail-indicator"><span>Finalidade</span><strong>Auto-observação educativa</strong></div>
          <div className="detail-indicator"><span>Resultado</span><strong>Sem pontuação diagnóstica</strong></div>
          <div className="detail-indicator"><span>Privacidade</span><strong>Nenhuma resposta é enviada</strong></div>
        </div>
      </section>

      <section className="detail-section detail-signs" id="reflexao">
        <div className="detail-container detail-two-columns">
          <div className="detail-section-heading">
            <p className="detail-eyebrow">Checklist reflexivo</p>
            <h2>{content.checklistTitle}</h2>
            <p>{content.checklistIntroduction}</p>
            <p>
              Marque apenas para organizar suas observações. A marcação fica nesta tela, não é salva e não gera
              resultado, classificação ou diagnóstico.
            </p>
          </div>
          <ul className="detail-check-list" aria-label="Itens para reflexão">
            {content.checklist.map((item, index) => {
              const inputId = `${content.slug}-item-${index + 1}`;
              return (
                <li key={item}>
                  <input
                    id={inputId}
                    type="checkbox"
                    aria-describedby={`${content.slug}-orientation`}
                    style={{ width: 22, height: 22, marginTop: 5, accentColor: "#174d47" }}
                  />
                  <p><label htmlFor={inputId}>{item}</label></p>
                </li>
              );
            })}
          </ul>
        </div>
        <p id={`${content.slug}-orientation`} hidden>
          Este checklist é educativo, não validado e não produz diagnóstico.
        </p>
      </section>

      <section className="detail-section detail-scope" id="como-interpretar">
        <div className="detail-container">
          <div className="detail-section-heading detail-section-heading-centered">
            <p className="detail-eyebrow">Leitura cuidadosa</p>
            <h2>{content.contextTitle}</h2>
            <p>{content.contextIntroduction}</p>
          </div>
          <div className="detail-topic-grid">
            {content.contextTopics.map((topic, index) => (
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
            <p className="detail-eyebrow">Próximos passos</p>
            <h2>Observação é um ponto de partida, não uma conclusão.</h2>
            <p>
              Se os desafios são persistentes ou trazem impacto à vida cotidiana, uma conversa profissional pode
              ajudar a compreender o contexto e definir o cuidado adequado.
            </p>
          </div>
          <ol className="detail-process-list">
            <li><span>01</span><div><h3>Observe situações concretas</h3><p>Anote quando as dificuldades aparecem, há quanto tempo e o que ajuda ou piora.</p></div></li>
            <li><span>02</span><div><h3>Considere diferentes contextos</h3><p>Rotina, sono, saúde, demandas ambientais e momento emocional também influenciam o comportamento.</p></div></li>
            <li><span>03</span><div><h3>Procure orientação qualificada</h3><p>Uma avaliação integra história, entrevistas, observação e instrumentos adequados — nunca um item isolado.</p></div></li>
          </ol>
        </div>
      </section>

      <aside className="detail-disclaimer">
        <div className="detail-container">
          <strong>Importante</strong>
          <p>
            Este é um material educativo e não validado, sem valor de teste, laudo ou diagnóstico. Os itens não
            reproduzem instrumentos psicológicos e não substituem avaliação com profissional habilitado. Marcar um ou
            vários itens não confirma nem exclui nenhuma condição.
          </p>
        </div>
      </aside>

      <section className="detail-final-cta">
        <div className="detail-container detail-final-cta-inner">
          <div>
            <p className="detail-eyebrow">Orientação individualizada</p>
            <h2>{content.nextStepTitle}</h2>
            <p>{content.nextStepText}</p>
            <p><Link href={content.assessmentHref}>{content.assessmentLabel} →</Link></p>
          </div>
          <a
            className="detail-button detail-button-light"
            href={whatsappHref(content.whatsappMessage)}
            target="_blank"
            rel="noreferrer"
          >
            Conversar com a equipe
          </a>
        </div>
      </section>

      <InformationalFooter />
    </main>
  );
}
