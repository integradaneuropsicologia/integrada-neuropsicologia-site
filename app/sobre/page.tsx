import Link from "next/link";
import { InformationalFooter } from "../InformationalFooter";
import { breadcrumbJsonLd, createPageMetadata, JsonLd } from "../seo";
import { SiteHeader } from "../SiteHeader";

export const metadata = createPageMetadata({
  title: "Sobre a Integrada Neuropsicologia | Curitiba e on-line",
  description:
    "Conheça a Integrada Neuropsicologia, sua forma de trabalho e os atendimentos presenciais em Curitiba e on-line conforme o serviço.",
  path: "/sobre",
});

export default function AboutPage() {
  return (
    <main className="detail-page">
      <JsonLd data={breadcrumbJsonLd([
        { name: "Início", path: "/" },
        { name: "Sobre a Integrada", path: "/sobre" },
      ])} />
      <SiteHeader />

      <section className="detail-hero">
        <div className="detail-container detail-hero-grid">
          <div className="detail-hero-copy">
            <nav className="breadcrumbs" aria-label="Navegação estrutural">
              <Link href="/">Início</Link><span aria-hidden="true">›</span><span aria-current="page">Sobre</span>
            </nav>
            <p className="detail-eyebrow">Sobre a Integrada</p>
            <h1>Ciência para compreender. Cuidado para transformar.</h1>
            <p className="detail-hero-lead">
              A Integrada Neuropsicologia oferece avaliação neuropsicológica e psicoterapia com escuta cuidadosa,
              planejamento individual e comunicação clara sobre cada etapa do atendimento.
            </p>
            <div className="detail-hero-actions">
              <Link className="detail-button" href="/#atendimentos">Conhecer os atendimentos</Link>
              <Link className="detail-text-link" href="/carla-luciana-conceicao-lima">
                Conhecer a responsável técnica <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
          <div className="detail-hero-media detail-logo-media">
            <img src="/logo-horizontal.jpg" alt="Integrada Neuropsicologia" width="700" height="700" fetchPriority="high" />
          </div>
        </div>
      </section>

      <section className="detail-indicators" aria-label="Informações sobre a clínica">
        <div className="detail-container detail-indicator-grid">
          <div className="detail-indicator"><span>Experiência</span><strong>Mais de 15 anos</strong></div>
          <div className="detail-indicator"><span>Presencial</span><strong>Mercês, Curitiba/PR</strong></div>
          <div className="detail-indicator"><span>On-line</span><strong>Conforme o serviço</strong></div>
        </div>
      </section>

      <section className="detail-section">
        <div className="detail-container detail-two-columns">
          <div className="detail-section-heading">
            <p className="detail-eyebrow">Nossa forma de trabalhar</p>
            <h2>Compreensão ampla antes de conclusões.</h2>
            <p>
              O atendimento considera história, contexto, habilidades, dificuldades e objetivos. A seleção de
              procedimentos e estratégias depende da demanda apresentada e das condições de participação.
            </p>
          </div>
          <ul className="detail-check-list">
            <li><span aria-hidden="true">✓</span><p>Escuta acolhedora e comunicação sem simplificações.</p></li>
            <li><span aria-hidden="true">✓</span><p>Rigor técnico e integração de diferentes fontes de informação.</p></li>
            <li><span aria-hidden="true">✓</span><p>Orientações conectadas à rotina e às necessidades identificadas.</p></li>
            <li><span aria-hidden="true">✓</span><p>Diálogo autorizado com familiares, escola e profissionais quando pertinente.</p></li>
          </ul>
        </div>
      </section>

      <section className="detail-section detail-scope">
        <div className="detail-container">
          <div className="detail-section-heading detail-section-heading-centered">
            <p className="detail-eyebrow">Atendimentos</p>
            <h2>Cuidado em diferentes fases da vida.</h2>
          </div>
          <div className="detail-topic-grid">
            <article className="detail-topic-card"><span>01</span><h3>Avaliação neuropsicológica</h3><p>Investigação do funcionamento cognitivo, emocional, comportamental e funcional conforme a demanda.</p><Link href="/#atendimentos">Ver modalidades →</Link></article>
            <article className="detail-topic-card"><span>02</span><h3>Psicoterapia</h3><p>Acompanhamento individual com abordagem cognitivo-comportamental e objetivos definidos em conjunto.</p><Link href="/terapiaparaadultos">Conhecer a psicoterapia →</Link></article>
            <article className="detail-topic-card"><span>03</span><h3>Conteúdo educativo</h3><p>Artigos, rastreamentos informativos e exercícios sem finalidade diagnóstica.</p><Link href="/blog">Acessar conteúdos →</Link></article>
          </div>
        </div>
      </section>

      <section className="detail-final-cta">
        <div className="detail-container detail-final-cta-inner">
          <div><p className="detail-eyebrow">Próximo passo</p><h2>Conte brevemente o que você procura.</h2><p>A equipe explica como funciona o processo, e a psicóloga responsável analisa a adequação do serviço.</p></div>
          <Link className="detail-button detail-button-light" href="/#contato">Conversar com a equipe</Link>
        </div>
      </section>

      <InformationalFooter />
    </main>
  );
}
