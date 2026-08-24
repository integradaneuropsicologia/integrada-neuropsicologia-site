import Link from "next/link";
import { InformationalFooter } from "../InformationalFooter";
import { breadcrumbJsonLd, createPageMetadata, JsonLd } from "../seo";
import { SiteHeader } from "../SiteHeader";

export const metadata = createPageMetadata({
  title: "Política de Privacidade | Integrada Neuropsicologia",
  description: "Saiba como a Integrada Neuropsicologia trata dados de contato, preferências de cookies e informações de navegação.",
  path: "/politica-de-privacidade",
  noIndex: true,
});

export default function PrivacyPage() {
  return (
    <main className="detail-page policy-page">
      <JsonLd data={breadcrumbJsonLd([
        { name: "Início", path: "/" },
        { name: "Política de Privacidade", path: "/politica-de-privacidade" },
      ])} />
      <SiteHeader />

      <header className="article-hero">
        <div className="detail-container article-hero-inner">
          <nav className="breadcrumbs" aria-label="Navegação estrutural">
            <Link href="/">Início</Link><span aria-hidden="true">›</span><span aria-current="page">Política de Privacidade</span>
          </nav>
          <p className="detail-eyebrow">Privacidade e transparência</p>
          <h1>Política de Privacidade</h1>
          <p className="article-lead">Este documento explica, em linguagem direta, como os dados são tratados ao navegar no site ou iniciar uma conversa com a equipe.</p>
          <p className="article-byline">Atualizada em 24 de agosto de 2026.</p>
        </div>
      </header>

      <div className="detail-container policy-content">
        <section><h2>1. Quem é responsável</h2><p>A Integrada Neuropsicologia é responsável pelas decisões relacionadas aos dados tratados neste site. Responsável técnica: Carla Luciana da Conceição Lima — Psicóloga — CRP 08/39739. Atendimento presencial na Rua Jacarezinho, 1266 — Mercês, Curitiba/PR.</p></section>
        <section><h2>2. Dados de contato</h2><p>Os formulários pedem somente os dados necessários para iniciar a conversa, como nome, telefone, interesse e uma mensagem opcional. Não envie laudos, documentos, senhas ou informações clínicas detalhadas pelo formulário do site.</p></section>
        <section><h2>3. Como o formulário funciona</h2><p>O preenchimento é processado no próprio navegador e prepara uma mensagem para o WhatsApp. O site não mantém um banco de dados com essas respostas. Depois que o WhatsApp é aberto, o tratamento passa a envolver os serviços e as políticas da Meta/WhatsApp.</p></section>
        <section><h2>4. Finalidades</h2><p>Os dados informados são usados para responder ao contato, explicar o funcionamento dos serviços, organizar uma orientação inicial e cumprir obrigações profissionais ou legais quando aplicáveis. Informações clínicas do atendimento seguem regras próprias de sigilo e não são tratadas pelas ferramentas de métricas do site.</p></section>
        <section><h2>5. Cookies e métricas</h2><p>A ferramenta de métricas só é carregada após sua escolha no aviso de privacidade. A preferência de aceitar ou recusar fica registrada no armazenamento local do navegador. Os eventos enviados descrevem ações gerais, como clique em um serviço ou envio do formulário, sem nome, telefone, mensagem ou hipótese clínica.</p></section>
        <section><h2>6. Fornecedores</h2><p>O site utiliza infraestrutura de hospedagem da OpenAI/Sites, Google Tag Manager para medição consentida, Google Maps para localização e WhatsApp para comunicação. Esses fornecedores podem processar dados técnicos conforme suas próprias políticas e infraestrutura internacional.</p></section>
        <section><h2>7. Retenção e segurança</h2><p>O site procura limitar a coleta ao necessário e adota recursos técnicos de conexão segura. Mensagens mantidas no WhatsApp e informações decorrentes de uma relação profissional obedecem aos prazos e critérios aplicáveis a cada finalidade.</p></section>
        <section><h2>8. Seus direitos</h2><p>Você pode solicitar confirmação de tratamento, acesso, correção, informações sobre compartilhamento, revogação de consentimento e eliminação quando aplicável. A <a href="https://www.gov.br/anpd/pt-br/assuntos/titular-de-dados-1/direito-dos-titulares" target="_blank" rel="noreferrer">ANPD apresenta a relação dos direitos dos titulares</a>.</p></section>
        <section><h2>9. Como fazer uma solicitação</h2><p>Use o telefone ou WhatsApp <a href="tel:+5541992113665" data-analytics-event="phone_click" data-analytics-context="privacy_page">(41) 99211-3665</a> e informe que deseja tratar de privacidade. Poderemos solicitar informações mínimas para confirmar a identidade e proteger os dados envolvidos.</p></section>
        <section><h2>10. Crianças, adolescentes e alterações</h2><p>Contatos sobre crianças ou adolescentes devem ser realizados por responsável legal. Esta política poderá ser atualizada quando o site, os serviços ou as exigências aplicáveis mudarem; a data da versão será informada nesta página.</p></section>
      </div>

      <InformationalFooter />
    </main>
  );
}
