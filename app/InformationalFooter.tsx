import Link from "next/link";

export function InformationalFooter() {
  return (
    <footer className="detail-footer">
      <div className="detail-container detail-footer-main">
        <Link
          className="detail-brand detail-brand-footer"
          href="/"
          aria-label="Integrada Neuropsicologia — início"
        >
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
          <Link href="/blog">Conteúdos</Link>
          <Link href="/exercicios-de-estimulacao-mental">Exercícios de estimulação mental</Link>
          <Link href="/#contato">Contato</Link>
        </nav>
      </div>
      <div className="detail-container detail-footer-bottom">
        <p>© {new Date().getFullYear()} Integrada Neuropsicologia. Todos os direitos reservados.</p>
        <p>Conteúdo educativo. Não substitui avaliação ou acompanhamento profissional.</p>
      </div>
    </footer>
  );
}
