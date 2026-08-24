import Link from "next/link";
import { InformationalFooter } from "../InformationalFooter";
import { breadcrumbJsonLd, createPageMetadata, JsonLd } from "../seo";
import { absoluteUrl, siteConfig } from "../siteConfig";
import { SiteHeader } from "../SiteHeader";

export const metadata = createPageMetadata({
  title: "Carla Luciana da Conceição Lima | Psicóloga CRP 08/39739",
  description:
    "Conheça Carla Luciana da Conceição Lima, psicóloga e responsável técnica pela Integrada Neuropsicologia, CRP 08/39739.",
  path: "/carla-luciana-conceicao-lima",
});

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${siteConfig.url}/carla-luciana-conceicao-lima#person`,
  name: "Carla Luciana da Conceição Lima",
  jobTitle: "Psicóloga e responsável técnica",
  description: "Psicóloga responsável técnica pela Integrada Neuropsicologia, com mais de 15 anos de experiência profissional.",
  identifier: "CRP 08/39739",
  url: absoluteUrl("/carla-luciana-conceicao-lima"),
  worksFor: { "@id": `${siteConfig.url}/#organization` },
};

export default function ProfessionalPage() {
  return (
    <main className="detail-page">
      <JsonLd data={[
        breadcrumbJsonLd([
          { name: "Início", path: "/" },
          { name: "Sobre a Integrada", path: "/sobre" },
          { name: "Carla Luciana da Conceição Lima", path: "/carla-luciana-conceicao-lima" },
        ]),
        personJsonLd,
      ]} />
      <SiteHeader />

      <section className="detail-hero professional-hero">
        <div className="detail-container detail-hero-grid">
          <div className="detail-hero-copy">
            <nav className="breadcrumbs" aria-label="Navegação estrutural">
              <Link href="/">Início</Link><span aria-hidden="true">›</span>
              <Link href="/sobre">Sobre</Link><span aria-hidden="true">›</span>
              <span aria-current="page">Responsável técnica</span>
            </nav>
            <p className="detail-eyebrow">Psicóloga — CRP 08/39739</p>
            <h1>Carla Luciana da Conceição Lima</h1>
            <p className="detail-hero-lead">
              Responsável técnica pela Integrada Neuropsicologia, com mais de 15 anos de experiência profissional e
              atuação voltada à compreensão cuidadosa das necessidades de cada pessoa.
            </p>
            <div className="detail-hero-actions">
              <Link className="detail-button" href="/#contato">Conversar com a equipe</Link>
              <Link className="detail-text-link" href="/#atendimentos">Conhecer os atendimentos <span aria-hidden="true">→</span></Link>
            </div>
          </div>
          <div className="detail-hero-media detail-logo-media">
            <img src="/logo-icon.jpg" alt="Símbolo da Integrada Neuropsicologia" width="700" height="700" fetchPriority="high" />
          </div>
        </div>
      </section>

      <section className="detail-section">
        <div className="detail-container detail-two-columns">
          <div className="detail-section-heading">
            <p className="detail-eyebrow">Responsabilidade técnica</p>
            <h2>Rigor, escuta e clareza em cada processo.</h2>
            <p>
              A avaliação e o acompanhamento são organizados conforme a demanda, a história e as condições de
              participação. As hipóteses são analisadas de forma integrada, sem reduzir a pessoa a um diagnóstico.
            </p>
          </div>
          <ul className="detail-check-list">
            <li><span aria-hidden="true">✓</span><p>Mais de 15 anos de experiência profissional.</p></li>
            <li><span aria-hidden="true">✓</span><p>Responsável técnica: CRP 08/39739.</p></li>
            <li><span aria-hidden="true">✓</span><p>Atendimentos presenciais em Curitiba e modalidades on-line conforme o serviço.</p></li>
            <li><span aria-hidden="true">✓</span><p>Integração com outros profissionais quando pertinente e autorizada.</p></li>
          </ul>
        </div>
      </section>

      <aside className="detail-disclaimer">
        <div className="detail-container"><strong>Informações profissionais</strong><p>Esta página apresenta somente informações confirmadas publicamente pela Integrada Neuropsicologia. Formação complementar e especializações poderão ser incluídas após validação documental.</p></div>
      </aside>

      <InformationalFooter />
    </main>
  );
}
