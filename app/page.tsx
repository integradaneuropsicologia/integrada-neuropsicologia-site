import Link from "next/link";
import { blogArticles } from "./blogArticles";
import { ContactForm } from "./ContactForm";
import { createPageMetadata } from "./seo";
import { SiteHeader } from "./SiteHeader";
import { TestimonialsCarousel } from "./TestimonialsCarousel";

export const metadata = createPageMetadata({
  title: "Avaliação Neuropsicológica | Integrada Neuropsicologia",
  description:
    "Avaliação neuropsicológica para crianças, adolescentes, adultos e pessoas idosas, com atendimento presencial em Curitiba e modalidades on-line conforme o serviço.",
  path: "/",
});

const whatsapp =
  "https://wa.me/5541992113665?text=Ol%C3%A1%21%20Gostaria%20de%20entender%20qual%20atendimento%20%C3%A9%20mais%20indicado%20para%20mim.";

const services = [
  {
    number: "01",
    title: "Infantojuvenil",
    description:
      "Desenvolvimento, aprendizagem, TDAH, TEA, altas habilidades e regulação emocional.",
    image: "/infantojuvenil.webp",
    alt: "Criança em atividade lúdica durante acompanhamento profissional",
    message: "avaliação infantojuvenil",
    href: "/avaliacaoinfantil",
  },
  {
    number: "02",
    title: "Adultos",
    description:
      "Atenção, memória, organização, ansiedade e mudanças no funcionamento cognitivo.",
    image: "/adulto.webp",
    alt: "Aplicação de instrumento de avaliação neuropsicológica em adulto",
    message: "avaliação neuropsicológica para adultos",
    href: "/avaliacaoneuropsicologicaadulto",
  },
  {
    number: "03",
    title: "Idosos",
    description:
      "Esquecimentos, autonomia, avaliação pré-operatória e monitoramento cognitivo.",
    image: "/idoso.webp",
    alt: "Pessoa idosa em atividade de cuidado e atenção",
    message: "avaliação neuropsicológica para idosos",
    href: "/avaliacaoneuropsicologicaidoso",
  },
  {
    number: "04",
    title: "Avaliação on-line",
    description:
      "Um processo remoto, seguro e criterioso para adultos em qualquer lugar do Brasil.",
    image: "/online.webp",
    alt: "Computador preparado para atendimento profissional on-line",
    message: "avaliação neuropsicológica on-line",
    href: "/avaliacao-neuropsicologica-online-adultos",
  },
  {
    number: "05",
    title: "Psicoterapia (TCC)",
    description:
      "Metas claras e estratégias práticas para rotina, relações e qualidade de vida.",
    image: "/terapia.webp",
    alt: "Sessão de psicoterapia em ambiente acolhedor",
    message: "psicoterapia TCC",
    href: "/terapiaparaadultos",
  },
];

function WhatsAppLink({
  children,
  className = "",
  message,
  analyticsContext = "home",
}: {
  children: React.ReactNode;
  className?: string;
  message?: string;
  analyticsContext?: string;
}) {
  const href = message
    ? `https://wa.me/5541992113665?text=${encodeURIComponent(
        `Olá! Gostaria de saber mais sobre ${message}.`,
      )}`
    : whatsapp;

  return (
    <a
      className={className}
      href={href}
      target="_blank"
      rel="noreferrer"
      data-analytics-event="whatsapp_click"
      data-analytics-context={analyticsContext}
    >
      {children}
    </a>
  );
}

export default function Home() {
  return (
    <main>
      <SiteHeader />

      <section className="hero" id="inicio">
        <div className="container hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">Avaliação neuropsicológica com clareza e acolhimento</p>
            <h1>
              <span className="hero-title-kicker">Avaliação neuropsicológica</span>
              Entender abre <em>caminhos.</em>
            </h1>
            <p className="hero-lead">
              A avaliação neuropsicológica investiga, de forma integrada, como atenção,
              memória, linguagem, aprendizagem e emoções participam da rotina — com
              rigor técnico, escuta cuidadosa e orientações práticas.
            </p>
            <div className="hero-actions">
              <WhatsAppLink className="button">Quero entender a avaliação</WhatsAppLink>
              <a className="text-link" href="#como-funciona">
                Entenda o processo <span aria-hidden="true">↓</span>
              </a>
            </div>
            <ul className="trust-list" aria-label="Diferenciais">
              <li><span aria-hidden="true">✓</span> Atendimento humanizado</li>
              <li><span aria-hidden="true">✓</span> Laudo claro e direcionado</li>
              <li><span aria-hidden="true">✓</span> Integração com outros profissionais</li>
            </ul>
          </div>

          <div className="hero-visual">
            <div className="hero-image-frame">
              <img
                src="/hero.webp"
                alt="Família reunida ao ar livre em um momento de alegria"
                width="1000"
                height="1000"
                fetchPriority="high"
              />
            </div>
            <div className="hero-note hero-note-top">
              <strong>Mais de 15 anos</strong>
              <span>de experiência clínica</span>
            </div>
            <div className="hero-note hero-note-bottom">
              <span className="note-icon" aria-hidden="true">✦</span>
              <span>Ciência para compreender.<br />Cuidado para transformar.</span>
            </div>
          </div>
        </div>
      </section>

      <section className="signal-strip" aria-label="Quando buscar ajuda">
        <div className="container signal-grid">
          <p className="signal-intro">A avaliação pode ajudar a…</p>
          <div><span>01</span><p>Compreender mudanças no funcionamento cognitivo e emocional</p></div>
          <div><span>02</span><p>Investigar dificuldades que afetam estudos, trabalho ou rotina</p></div>
          <div><span>03</span><p>Transformar resultados em orientações e próximos passos possíveis</p></div>
        </div>
      </section>

      <section className="home-online-feature" aria-labelledby="home-online-title">
        <div className="container home-online-feature-grid">
          <div>
            <p className="eyebrow">Atendimento para adultos</p>
            <h2 id="home-online-title">Avaliação neuropsicológica on-line, planejada para o formato remoto.</h2>
          </div>
          <div>
            <p>
              Quando houver indicação técnica e condições adequadas de participação, o processo
              pode ser realizado on-line, com procedimentos compatíveis com essa modalidade.
            </p>
            <Link
              className="text-link"
              href="/avaliacao-neuropsicologica-online-adultos"
              data-analytics-event="internal_cta_click"
              data-analytics-context="home_online_feature"
            >
              Conheça a avaliação on-line <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="section services" id="atendimentos">
        <div className="container">
          <div className="section-heading split-heading">
            <div>
              <p className="eyebrow">Cuidado em cada etapa da vida</p>
              <h2>Um atendimento que começa pela sua história.</h2>
            </div>
            <p>
              O processo começa com uma compreensão ampla da necessidade. Depois,
              cada avaliação é planejada de acordo com o momento de vida, o contexto
              e os objetivos de cada pessoa.
            </p>
          </div>

          <div className="service-grid">
            {services.map((service) => (
              <article className="service-card" key={service.title}>
                <div className="service-image">
                  <img src={service.image} alt={service.alt} width="500" height="500" loading="lazy" />
                  <span>{service.number}</span>
                </div>
                <div className="service-body">
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                  <div className="service-actions">
                    <WhatsAppLink className="card-link" message={service.message}>
                      Conhecer atendimento <span aria-hidden="true">↗</span>
                    </WhatsAppLink>
                    <a className="card-link card-link-more" href={service.href}>
                      Saber mais <span aria-hidden="true">→</span>
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section process" id="como-funciona">
        <div className="container process-grid">
          <div className="process-intro">
            <p className="eyebrow eyebrow-light">Como funciona</p>
            <h2>Clareza em cada etapa do processo.</h2>
            <p>
              Você entende o que está sendo investigado, por que cada etapa importa e
              quais serão os próximos passos.
            </p>
            <WhatsAppLink className="button button-light">Conversar com a equipe</WhatsAppLink>
          </div>

          <ol className="process-list">
            <li>
              <span>01</span>
              <div><h3>Conversa inicial</h3><p>Escutamos suas queixas, sua rotina e o histórico de vida.</p></div>
            </li>
            <li>
              <span>02</span>
              <div><h3>Plano personalizado</h3><p>Selecionamos instrumentos e estratégias adequados à sua necessidade.</p></div>
            </li>
            <li>
              <span>03</span>
              <div><h3>Avaliação cuidadosa</h3><p>As sessões combinam testes, entrevistas e observação clínica.</p></div>
            </li>
            <li>
              <span>04</span>
              <div><h3>Devolutiva e direcionamento</h3><p>Você recebe uma explicação clara, laudo e recomendações práticas.</p></div>
            </li>
          </ol>
        </div>
      </section>

      <section className="section difference">
        <div className="container difference-grid">
          <div className="difference-copy">
            <p className="eyebrow">Por que a Integrada</p>
            <h2>Um diagnóstico não é um rótulo. É um caminho.</h2>
            <p>
              Nosso trabalho transforma informação técnica em compreensão e possibilidades
              reais para a vida, os estudos, o trabalho e as relações.
            </p>
          </div>
          <div className="difference-cards">
            <article><span aria-hidden="true">01</span><h3>Rigor técnico</h3><p>Instrumentos atualizados e investigação criteriosa.</p></article>
            <article><span aria-hidden="true">02</span><h3>Escuta sem pressa</h3><p>Um espaço seguro para compreender a sua história.</p></article>
            <article><span aria-hidden="true">03</span><h3>Laudo que orienta</h3><p>Linguagem clara e recomendações que cabem na rotina.</p></article>
            <article><span aria-hidden="true">04</span><h3>Cuidado em rede</h3><p>Diálogo com escola, médicos e outros profissionais quando indicado.</p></article>
          </div>
        </div>
      </section>

      <section className="section home-professional" aria-labelledby="responsavel-tecnica">
        <div className="container home-professional-grid">
          <div className="home-professional-mark" aria-hidden="true">15+</div>
          <div>
            <p className="eyebrow">Responsabilidade técnica</p>
            <h2 id="responsavel-tecnica">Mais de 15 anos de experiência dedicados ao cuidado psicológico.</h2>
            <p>
              A Integrada tem como responsável técnica Carla Luciana da Conceição Lima,
              psicóloga inscrita no CRP 08/39739. Cada processo é conduzido com critérios
              técnicos, sigilo e atenção à história de quem busca atendimento.
            </p>
            <div className="home-professional-links">
              <Link className="text-link" href="/carla-luciana-conceicao-lima">Conheça a responsável técnica <span aria-hidden="true">→</span></Link>
              <Link className="text-link" href="/sobre">Sobre a Integrada <span aria-hidden="true">→</span></Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section testimonials" id="depoimentos">
        <div className="container">
          <div className="section-heading testimonial-heading">
            <p className="eyebrow">Quem passou por aqui recomenda</p>
            <h2>Histórias de quem encontrou respostas.</h2>
          </div>
          <TestimonialsCarousel />
        </div>
      </section>

      <section className="section home-content-preview" aria-labelledby="conteudos-title">
        <div className="container">
          <div className="section-heading split-heading">
            <div>
              <p className="eyebrow">Conteúdo informativo</p>
              <h2 id="conteudos-title">Informação para tomar decisões com mais clareza.</h2>
            </div>
            <p>Artigos educativos sobre avaliação neuropsicológica, desenvolvimento e funcionamento cognitivo.</p>
          </div>
          <div className="home-blog-grid">
            {blogArticles.slice(0, 3).map((article) => (
              <article className="home-blog-card" key={article.slug}>
                <p className="eyebrow">{article.eyebrow}</p>
                <h3>{article.title}</h3>
                <p>{article.description}</p>
                <Link className="text-link" href={`/post/${article.slug}`}>Ler artigo <span aria-hidden="true">→</span></Link>
              </article>
            ))}
          </div>
          <Link className="button button-outline home-content-all" href="/blog">Ver todos os conteúdos</Link>
        </div>
      </section>

      <section className="section faq" id="duvidas">
        <div className="container faq-grid">
          <div>
            <p className="eyebrow">Dúvidas frequentes</p>
            <h2>Antes de começar, é natural querer entender.</h2>
            <p>Se a sua dúvida não estiver aqui, fale com a nossa equipe.</p>
          </div>
          <div className="faq-list">
            <details>
              <summary>Quando devo procurar uma avaliação neuropsicológica?</summary>
              <p>Quando dificuldades de atenção, memória, aprendizagem, comportamento ou autonomia passam a afetar a rotina. A avaliação também ajuda a investigar hipóteses como TDAH e TEA.</p>
            </details>
            <details>
              <summary>Quanto tempo dura o processo?</summary>
              <p>O número de sessões depende da idade, da demanda e dos instrumentos necessários. Após a conversa inicial, explicamos o planejamento completo do seu caso.</p>
            </details>
            <details>
              <summary>A avaliação on-line tem validade?</summary>
              <p>Quando indicada e realizada com instrumentos adequados ao formato remoto, ela segue os mesmos princípios de rigor, sigilo e responsabilidade profissional.</p>
            </details>
            <details>
              <summary>Vocês atendem crianças, adultos e idosos?</summary>
              <p>Sim. A equipe atua em todas as fases da vida, adaptando o processo às necessidades de cada faixa etária e contexto.</p>
            </details>
          </div>
        </div>
      </section>

      <section className="contact-section" id="contato">
        <div className="container contact-grid">
          <div className="contact-copy">
            <p className="eyebrow eyebrow-light">Vamos conversar?</p>
            <h2>O primeiro passo pode ser mais simples do que parece.</h2>
            <p>
              Conte brevemente o que você procura. Nossa equipe vai orientar o atendimento
              mais adequado — sem compromisso.
            </p>
            <div className="contact-details">
              <a href="tel:+5541992113665" data-analytics-event="phone_click" data-analytics-context="home_contact"><small>Telefone e WhatsApp</small><strong>(41) 99211-3665</strong></a>
              <a href="https://maps.google.com/?q=Rua+Jacarezinho+1266+Mercês+Curitiba+PR" target="_blank" rel="noreferrer">
                <small>Atendimento presencial</small><strong>Rua Jacarezinho, 1266 — Mercês, Curitiba/PR</strong>
              </a>
            </div>
          </div>
          <ContactForm />
        </div>
      </section>

      <footer>
        <div className="container footer-main">
          <a className="brand brand-footer brand-logo-link" href="#inicio" aria-label="Integrada Neuropsicologia — início">
            <span className="brand-logo-crop" aria-hidden="true">
              <img src="/logo-horizontal.jpg" alt="" width="500" height="500" />
            </span>
          </a>
          <p>Avaliando o presente,<br />transformando o futuro.</p>
          <nav aria-label="Links do rodapé">
            <a href="#atendimentos">Atendimentos</a>
            <a href="#como-funciona">Como funciona</a>
            <Link href="/sobre">Sobre a Integrada</Link>
            <Link href="/carla-luciana-conceicao-lima">Responsável técnica</Link>
            <Link href="/blog">Conteúdos</Link>
            <Link href="/exercicios-de-estimulacao-mental">Exercícios de estimulação mental</Link>
            <Link href="/politica-de-privacidade">Privacidade</Link>
          </nav>
        </div>
        <div className="container footer-responsibility">
          <p>Responsável técnica: Carla Luciana da Conceição Lima — Psicóloga — CRP 08/39739</p>
        </div>
        <div className="container footer-bottom">
          <p>© {new Date().getFullYear()} Integrada Neuropsicologia. Todos os direitos reservados.</p>
          <p>Conteúdo informativo. Não substitui avaliação profissional.</p>
        </div>
      </footer>

      <WhatsAppLink className="floating-whatsapp">
        <span aria-hidden="true">✦</span>
        <span>Fale com a equipe</span>
      </WhatsAppLink>
    </main>
  );
}
