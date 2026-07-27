const navigationGroups = [
  {
    label: "Avaliação Neuropsicológica",
    links: [
      { label: "Infantojuvenil", href: "/avaliacaoinfantil" },
      { label: "Adultos", href: "/avaliacaoneuropsicologicaadulto" },
      { label: "On-line", href: "/avaliacaoonline" },
      {
        label: "TDAH",
        href: "https://www.integradaneuropsicologia.com.br/avaliacaotdah",
      },
      {
        label: "TEA/Autismo",
        href: "https://www.integradaneuropsicologia.com.br/avaliacaoautismo",
      },
      { label: "Idosos", href: "/avaliacaoneuropsicologicaidoso" },
    ],
  },
  {
    label: "Psicoterapia",
    links: [
      { label: "Para adultos", href: "/terapiaparaadultos" },
      {
        label: "Adultos com autismo",
        href: "https://www.integradaneuropsicologia.com.br/terapiaparaadultoscomautismo",
      },
      {
        label: "Adultos com TDAH",
        href: "https://www.integradaneuropsicologia.com.br/terapiaparaadultoscomtdah",
      },
      {
        label: "Jovens e adolescentes",
        href: "https://www.integradaneuropsicologia.com.br/terapiafasedavida",
      },
    ],
  },
  {
    label: "Teste grátis",
    links: [
      {
        label: "TDAH em adultos",
        href: "https://www.integradaneuropsicologia.com.br/testetdahadulto",
      },
      {
        label: "Autismo em adultos",
        href: "https://www.integradaneuropsicologia.com.br/teste-autismo-adulto",
      },
      {
        label: "TDAH em crianças",
        href: "https://www.integradaneuropsicologia.com.br/teste-tdah-infantil",
      },
      {
        label: "Autismo em crianças",
        href: "https://www.integradaneuropsicologia.com.br/teste-autismo-infantil",
      },
    ],
  },
] as const;

const directLinks = [
  {
    label: "Blog",
    href: "https://www.integradaneuropsicologia.com.br/blog",
  },
  {
    label: "Exercícios de estimulação mental",
    href: "/exercicios-de-estimulacao-mental",
  },
] as const;

export function SiteHeader() {
  return (
    <>
      <div className="topbar">
        <div className="container topbar-inner">
          <p>Presencial em Curitiba e on-line em todo o Brasil</p>
          <a href="tel:+5541992113665">(41) 99211-3665</a>
        </div>
      </div>

      <header className="site-header">
        <div className="container nav-wrap">
          <a
            className="brand brand-logo-link"
            href="/"
            aria-label="Integrada Neuropsicologia — início"
          >
            <span className="brand-logo-crop" aria-hidden="true">
              <img src="/logo-horizontal.jpg" alt="" width="500" height="500" />
            </span>
          </a>

          <nav className="site-nav" aria-label="Navegação principal">
            {navigationGroups.map((group) => (
              <details className="nav-dropdown" key={group.label}>
                <summary>
                  {group.label}
                  <span aria-hidden="true">⌄</span>
                </summary>
                <div className="nav-dropdown-panel">
                  {group.links.map((link) => (
                    <a href={link.href} key={link.href}>
                      {link.label}
                    </a>
                  ))}
                </div>
              </details>
            ))}

            {directLinks.map((link) => (
              <a className="nav-direct-link" href={link.href} key={link.href}>
                {link.label}
              </a>
            ))}
          </nav>

          <details className="mobile-menu">
            <summary aria-label="Abrir menu principal">Menu</summary>
            <nav className="mobile-menu-panel" aria-label="Navegação para celular">
              {navigationGroups.map((group) => (
                <details className="mobile-nav-group" key={group.label}>
                  <summary>
                    {group.label}
                    <span aria-hidden="true">⌄</span>
                  </summary>
                  <div className="mobile-nav-links">
                    {group.links.map((link) => (
                      <a href={link.href} key={link.href}>
                        {link.label}
                      </a>
                    ))}
                  </div>
                </details>
              ))}

              {directLinks.map((link) => (
                <a className="nav-direct-link" href={link.href} key={link.href}>
                  {link.label}
                </a>
              ))}
            </nav>
          </details>
        </div>
      </header>
    </>
  );
}
