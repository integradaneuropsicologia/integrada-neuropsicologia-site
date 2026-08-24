import Link from "next/link";
import { InformationalFooter } from "../InformationalFooter";
import { OnlineContactForm } from "../OnlineContactForm";
import { breadcrumbJsonLd, createPageMetadata, faqJsonLd, JsonLd, serviceJsonLd } from "../seo";
import { siteConfig } from "../siteConfig";
import { SiteHeader } from "../SiteHeader";

const path = "/avaliacao-neuropsicologica-online-adultos";
const title = "Avaliação Neuropsicológica On-line para Adultos | Integrada";
const description =
  "Avaliação neuropsicológica on-line para adultos, com 8 encontros, procedimentos compatíveis com a modalidade remota, devolutiva e laudo psicológico digital.";

export const metadata = createPageMetadata({ title, description, path });

const signs = [
  "Dificuldades persistentes de atenção, foco ou conclusão de tarefas.",
  "Problemas de organização, planejamento, manejo do tempo ou produtividade.",
  "Esquecimentos e mudanças percebidas na memória ou no raciocínio.",
  "Impacto no trabalho, nos estudos, nas relações ou na autonomia.",
  "Sobrecarga, sensibilidade a estímulos ou necessidade intensa de recuperação.",
  "Dúvidas sobre interação social, comunicação ou adaptação a diferentes contextos.",
  "Mudanças em relação ao funcionamento habitual que precisam ser compreendidas.",
  "Uso constante de estratégias para esconder ou compensar dificuldades.",
  "Hipóteses como TDAH, TEA, ansiedade ou alterações de humor que apresentam manifestações semelhantes.",
];

const domains = [
  ["Atenção", "Atenção sustentada, seletiva e alternada, distrações e manutenção do foco."],
  ["Memória e aprendizagem", "Registro, organização, armazenamento e recuperação de informações."],
  ["Funções executivas", "Planejamento, flexibilidade, controle inibitório, tomada de decisões e manejo do tempo."],
  ["Linguagem e raciocínio", "Compreensão, expressão, resolução de problemas e velocidade de processamento."],
  ["Cognição social", "Percepção de situações sociais, comunicação e compreensão de diferentes perspectivas."],
  ["Aspectos emocionais e funcionais", "Humor, ansiedade, comportamento, rotina e impacto percebido no cotidiano."],
];

const processSteps = [
  ["Entrevista clínica por vídeo", "Levantamento da história de vida, saúde, desenvolvimento, demandas atuais e condições necessárias para participação."],
  ["Definição do plano e orientação técnica", "Escolha dos procedimentos, instrumentos e fontes de informação adequados à demanda e à modalidade, além da verificação de equipamentos e ambiente reservado."],
  ["Encontros de avaliação", "Aplicação de instrumentos, escalas e tarefas compatíveis com o atendimento remoto e com os objetivos da investigação."],
  ["Integração clínica", "Análise dos resultados com a história e o funcionamento cotidiano. Quando pertinente e autorizado, podem ser consideradas informações de pessoas próximas ou de outros profissionais."],
  ["Devolutiva e laudo psicológico digital", "Apresentação dos achados, das hipóteses consideradas, dos limites da avaliação e das recomendações em linguagem clara."],
];

const faqs = [
  ["Para quem a avaliação on-line pode ser indicada?", "Para adultos com 18 anos ou mais quando a demanda, as condições de participação e os procedimentos necessários forem compatíveis com a modalidade remota."],
  ["É possível investigar TDAH e TEA on-line?", "Essas hipóteses podem fazer parte da investigação em adultos, mas não são confirmadas por um teste isolado. A psicóloga analisa a adequação da modalidade e integra história, contexto e diferentes fontes de informação."],
  ["O processo acontece integralmente on-line?", "Quando a modalidade é tecnicamente adequada, entrevistas, encontros, devolutiva e entrega da documentação acontecem on-line. Caso as condições não sejam suficientes, poderá ser indicada outra modalidade ou encaminhamento."],
  ["Os instrumentos são os mesmos do atendimento presencial?", "São utilizados somente procedimentos e instrumentos compatíveis com aplicação remota. A seleção depende da demanda, dos objetivos e das condições de participação."],
  ["Quanto tempo dura?", "A avaliação é organizada em 8 encontros. A distribuição das etapas e a duração de cada encontro são explicadas no planejamento inicial."],
  ["Quais equipamentos são necessários?", "É necessário computador ou tablet com câmera e áudio, conexão estável e um ambiente reservado. O uso de celular pode não ser adequado a todas as tarefas."],
  ["Posso fazer a avaliação estando fora do Brasil?", "O atendimento a brasileiros em outros países depende de análise da demanda, das condições técnicas e da aplicabilidade profissional. A aceitação de documentos deve ser confirmada com a instituição que irá recebê-los."],
  ["Como funciona a devolutiva?", "A devolutiva ocorre por vídeo, com explicação dos achados, das hipóteses consideradas, dos limites e das recomendações. Também há espaço para dúvidas."],
  ["Preciso de encaminhamento ou diagnóstico prévio?", "Não. Você pode apresentar suas dúvidas sem uma conclusão pronta. A psicóloga responsável analisa se a avaliação é indicada e quais informações são necessárias."],
  ["Como garantir privacidade e confiabilidade?", "Os encontros exigem ambiente reservado, identificação da pessoa avaliada, conexão adequada e cumprimento dos combinados técnicos. O atendimento segue deveres de sigilo e responsabilidade profissional."],
  ["O laudo digital pode ser usado em outro país?", "A documentação corresponde ao processo realizado no Brasil. Regras de tradução, autenticação ou aceitação variam; confirme previamente os requisitos da instituição estrangeira."],
];

export default function OnlineAssessmentLandingPage() {
  return (
    <main className="detail-page online-landing">
      <JsonLd data={[
        breadcrumbJsonLd([
          { name: "Início", path: "/" },
          { name: "Avaliações", path: "/#atendimentos" },
          { name: "Avaliação neuropsicológica on-line para adultos", path },
        ]),
        serviceJsonLd({
          name: "Avaliação neuropsicológica on-line para adultos",
          description,
          path,
          serviceType: "Avaliação neuropsicológica on-line",
        }),
        faqJsonLd(faqs),
      ]} />
      <SiteHeader />

      <section className="detail-hero online-hero">
        <div className="detail-container detail-hero-grid">
          <div className="detail-hero-copy">
            <nav className="breadcrumbs" aria-label="Navegação estrutural">
              <Link href="/">Início</Link><span aria-hidden="true">›</span>
              <Link href="/#atendimentos">Avaliações</Link><span aria-hidden="true">›</span>
              <span aria-current="page">On-line para adultos</span>
            </nav>
            <p className="detail-eyebrow">Processo remoto, individual e criterioso</p>
            <h1>Avaliação neuropsicológica on-line para adultos</h1>
            <p className="online-hero-tagline">Compreenda seu funcionamento com rigor técnico, onde você estiver.</p>
            <p className="detail-hero-lead">
              A modalidade on-line pode investigar o funcionamento cognitivo, emocional e funcional de adultos,
              quando houver indicação técnica e condições adequadas de participação.
            </p>
            <div className="detail-hero-actions">
              <a className="detail-button" href="#contato" data-analytics-event="service_interest" data-analytics-context="online_assessment">Verificar adequação da modalidade</a>
              <a className="detail-text-link" href="#para-quem">Veja quando pode ser indicada <span aria-hidden="true">↓</span></a>
            </div>
            <ul className="trust-list" aria-label="Informações de confiança">
              <li><span aria-hidden="true">✓</span> Para adultos com 18 anos ou mais</li>
              <li><span aria-hidden="true">✓</span> Mais de 15 anos de experiência profissional</li>
              <li><span aria-hidden="true">✓</span> Devolutiva e laudo psicológico digital</li>
            </ul>
          </div>
          <div className="detail-hero-media">
            <img src="/online.webp" alt="Computador preparado para atendimento profissional on-line" width="700" height="700" fetchPriority="high" />
          </div>
        </div>
      </section>

      <section className="detail-indicators" aria-label="Informações sobre a avaliação">
        <div className="detail-container detail-indicator-grid online-indicator-grid">
          <div className="detail-indicator"><span>Público</span><strong>Adultos com 18 anos ou mais</strong></div>
          <div className="detail-indicator"><span>Processo</span><strong>8 encontros</strong></div>
          <div className="detail-indicator"><span>Formato</span><strong>On-line, após análise de adequação</strong></div>
          <div className="detail-indicator"><span>Entrega</span><strong>Devolutiva e laudo psicológico digital</strong></div>
        </div>
      </section>

      <section className="online-contact-section" id="contato">
        <div className="detail-container online-contact-grid">
          <div className="detail-section-heading">
            <p className="detail-eyebrow">Comece por uma orientação</p>
            <h2>Explique sua necessidade sem precisar chegar com um diagnóstico pronto.</h2>
            <p>A equipe esclarece como funciona o processo, e a psicóloga responsável analisa a adequação da modalidade antes do início.</p>
            <p className="online-privacy-note"><strong>Privacidade:</strong> não envie documentos, laudos ou informações clínicas detalhadas neste primeiro contato.</p>
            <a
              className="detail-text-link online-direct-contact"
              href={`https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent("Olá! Gostaria de entender se a avaliação neuropsicológica on-line é adequada para a minha necessidade.")}`}
              target="_blank"
              rel="noreferrer"
              data-analytics-event="whatsapp_click"
              data-analytics-context="online_assessment"
            >
              Prefiro falar diretamente pelo WhatsApp <span aria-hidden="true">↗</span>
            </a>
          </div>
          <OnlineContactForm />
        </div>
      </section>

      <section className="detail-section detail-signs" id="para-quem">
        <div className="detail-container detail-two-columns">
          <div className="detail-section-heading">
            <p className="detail-eyebrow">Quando procurar</p>
            <h2>Dificuldades que afetam rotina, trabalho, estudos ou relações.</h2>
            <p>Os sinais abaixo podem motivar uma conversa, mas não confirmam diagnóstico e precisam ser compreendidos no contexto de cada pessoa.</p>
          </div>
          <ul className="detail-check-list">
            {signs.map((sign) => <li key={sign}><span aria-hidden="true">✓</span><p>{sign}</p></li>)}
          </ul>
        </div>
      </section>

      <section className="detail-section detail-scope" id="o-que-investiga">
        <div className="detail-container">
          <div className="detail-section-heading detail-section-heading-centered">
            <p className="detail-eyebrow">O que investigamos</p>
            <h2>Um perfil integrado, não uma pontuação isolada.</h2>
            <p>Os procedimentos são definidos conforme a demanda e as condições do atendimento remoto.</p>
          </div>
          <div className="detail-topic-grid online-domain-grid">
            {domains.map(([domain, text], index) => <article className="detail-topic-card" key={domain}><span>{String(index + 1).padStart(2, "0")}</span><h3>{domain}</h3><p>{text}</p></article>)}
          </div>
          <p className="online-context-links">Conheça também as páginas específicas sobre <Link href="/avaliacaotdah">investigação de TDAH</Link> e <Link href="/avaliacaoautismo">investigação de TEA (autismo)</Link>.</p>
        </div>
      </section>

      <section className="detail-section online-benefits">
        <div className="detail-container">
          <div className="detail-section-heading detail-section-heading-centered"><p className="detail-eyebrow">O que você recebe</p><h2>Resultados explicados e conectados aos próximos passos.</h2></div>
          <div className="detail-topic-grid">
            <article className="detail-topic-card"><span>01</span><h3>Compreensão do perfil</h3><p>Integração de habilidades, dificuldades, história e impacto funcional.</p></article>
            <article className="detail-topic-card"><span>02</span><h3>Devolutiva individual</h3><p>Explicação dos achados, hipóteses consideradas e limites da avaliação.</p></article>
            <article className="detail-topic-card"><span>03</span><h3>Laudo psicológico digital</h3><p>Documentação correspondente ao processo realizado, conforme as normas aplicáveis.</p></article>
            <article className="detail-topic-card"><span>04</span><h3>Recomendações</h3><p>Orientações e encaminhamentos compatíveis com as necessidades identificadas.</p></article>
          </div>
        </div>
      </section>

      <section className="detail-section professional-section">
        <div className="detail-container detail-two-columns">
          <div className="detail-section-heading"><p className="detail-eyebrow">Responsável técnica</p><h2>Carla Luciana da Conceição Lima</h2><p>Psicóloga — CRP 08/39739, com mais de 15 anos de experiência profissional.</p><p>A análise da indicação, o planejamento e a interpretação dos resultados são conduzidos com responsabilidade técnica e respeito à singularidade.</p><Link className="detail-text-link" href="/carla-luciana-conceicao-lima">Conhecer a responsável técnica →</Link></div>
          <div className="professional-mark"><img src="/logo-icon.jpg" alt="Símbolo da Integrada Neuropsicologia" width="500" height="500" loading="lazy" /></div>
        </div>
      </section>

      <section className="detail-section detail-process" id="como-funciona">
        <div className="detail-container detail-process-grid">
          <div className="detail-section-heading"><p className="detail-eyebrow">Etapas do atendimento</p><h2>Tecnologia a serviço de um processo cuidadoso.</h2><p>A avaliação é organizada em 8 encontros. A distribuição das etapas e a seleção dos procedimentos são definidas conforme demanda, histórico, objetivos e condições de participação.</p></div>
          <ol className="detail-process-list">
            {processSteps.map(([step, text], index) => <li key={step}><span>{String(index + 1).padStart(2, "0")}</span><div><h3>{step}</h3><p>{text}</p></div></li>)}
          </ol>
        </div>
      </section>

      <section className="detail-section online-requirements">
        <div className="detail-container detail-two-columns">
          <div className="detail-section-heading"><p className="detail-eyebrow">Condições de participação</p><h2>Um ambiente adequado protege a qualidade e a privacidade.</h2><p>A equipe orienta os combinados antes dos encontros e verifica se os recursos disponíveis são compatíveis com o processo.</p></div>
          <ul className="detail-check-list">
            <li><span aria-hidden="true">✓</span><p>Computador ou tablet com câmera, microfone e conexão estável.</p></li>
            <li><span aria-hidden="true">✓</span><p>Ambiente reservado, silencioso e sem interrupções durante as tarefas.</p></li>
            <li><span aria-hidden="true">✓</span><p>Disponibilidade para seguir orientações técnicas e apresentar identificação quando solicitado.</p></li>
            <li><span aria-hidden="true">✓</span><p>Comunicação prévia caso alguma adaptação de acessibilidade seja necessária.</p></li>
          </ul>
        </div>
      </section>

      <section className="detail-section detail-scope online-reviews" id="avaliacoes">
        <div className="detail-container detail-two-columns">
          <div className="detail-section-heading"><p className="detail-eyebrow">Avaliações públicas</p><h2>Consulte relatos sempre na fonte original.</h2><p>Para preservar contexto e privacidade, não reproduzimos depoimentos no site. Avaliações individuais refletem experiências próprias e não garantem resultados específicos.</p></div>
          <div className="online-review-card"><strong>Perfil da Integrada no Google</strong><p>Confira as avaliações publicadas diretamente no perfil da clínica.</p><a className="detail-button" href={siteConfig.googleReviewsUrl} target="_blank" rel="noreferrer" data-analytics-event="google_reviews_click" data-analytics-context="online_assessment">Ver avaliações no Google</a></div>
        </div>
      </section>

      <aside className="detail-disclaimer"><div className="detail-container"><strong>Importante</strong><p>A avaliação não tem como objetivo confirmar automaticamente um diagnóstico ou uma hipótese previamente formulada. Seu propósito é investigar, de forma integrada, o funcionamento cognitivo, emocional e comportamental da pessoa, considerando sua história e seu contexto. Os resultados podem subsidiar recomendações, encaminhamentos e estratégias de cuidado compatíveis com as necessidades identificadas. Quando as condições técnicas ou clínicas não forem adequadas ao formato remoto, poderá ser indicada a modalidade presencial ou outro encaminhamento.</p></div></aside>

      <section className="detail-section online-faq" id="duvidas">
        <div className="detail-container detail-two-columns">
          <div className="detail-section-heading"><p className="detail-eyebrow">Dúvidas frequentes</p><h2>Informação clara para um próximo passo consciente.</h2><p>Se sua dúvida não estiver aqui, utilize o formulário ou converse diretamente pelo WhatsApp.</p></div>
          <div className="faq-list">
            {faqs.map(([question, answer]) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}
          </div>
        </div>
      </section>

      <section className="detail-final-cta">
        <div className="detail-container detail-final-cta-inner"><div><p className="detail-eyebrow">Próximo passo</p><h2>Verifique se a modalidade on-line é adequada para a sua necessidade.</h2><p>Explique brevemente sua necessidade e informe onde você está. A equipe esclarece como funciona o processo, e a psicóloga responsável analisa a adequação da modalidade antes do início.</p></div><a className="detail-button detail-button-light" href="#contato">Solicitar orientação</a></div>
      </section>

      <InformationalFooter />
    </main>
  );
}
