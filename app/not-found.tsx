import Link from "next/link";
import { InformationalFooter } from "./InformationalFooter";
import { SiteHeader } from "./SiteHeader";

export default function NotFoundPage() {
  return (
    <main className="detail-page not-found-page">
      <SiteHeader />
      <section className="not-found-content">
        <div className="detail-container">
          <p className="detail-eyebrow">Erro 404</p>
          <h1>Página não encontrada.</h1>
          <p>O endereço pode ter mudado durante a migração do site. Use os caminhos abaixo para continuar.</p>
          <div className="detail-hero-actions">
            <Link className="detail-button" href="/">Ir para o início</Link>
            <Link className="detail-text-link" href="/#atendimentos">Ver atendimentos <span aria-hidden="true">→</span></Link>
            <Link className="detail-text-link" href="/blog">Acessar conteúdos <span aria-hidden="true">→</span></Link>
          </div>
        </div>
      </section>
      <InformationalFooter />
    </main>
  );
}
