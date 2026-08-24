"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

const navigationGroups = [
  {
    label: "Avaliação Neuropsicológica",
    links: [
      { label: "Infantojuvenil", href: "/avaliacaoinfantil" },
      { label: "Adultos", href: "/avaliacaoneuropsicologicaadulto" },
      { label: "On-line", href: "/avaliacaoonline" },
      { label: "TDAH", href: "/avaliacaotdah" },
      { label: "TEA/Autismo", href: "/avaliacaoautismo" },
      { label: "Idosos", href: "/avaliacaoneuropsicologicaidoso" },
    ],
  },
  {
    label: "Psicoterapia",
    links: [
      { label: "Para adultos", href: "/terapiaparaadultos" },
      {
        label: "Adultos com autismo",
        href: "/terapiaparaadultoscomautismo",
      },
      {
        label: "Adultos com TDAH",
        href: "/terapiaparaadultoscomtdah",
      },
      {
        label: "Jovens e adolescentes",
        href: "/terapiafasedavida",
      },
    ],
  },
  {
    label: "Rastreamentos informativos",
    links: [
      {
        label: "TDAH em adultos",
        href: "/testetdahadulto",
      },
      {
        label: "Autismo em adultos",
        href: "/teste-autismo-adulto",
      },
      {
        label: "TDAH em crianças",
        href: "/teste-tdah-infantil",
      },
      {
        label: "Autismo em crianças",
        href: "/teste-autismo-infantil",
      },
    ],
  },
] as const;

const directLinks = [
  {
    label: "Blog",
    href: "/blog",
  },
  {
    label: "Exercícios de estimulação mental",
    href: "/exercicios-de-estimulacao-mental",
  },
] as const;

export function SiteHeader() {
  const headerRef = useRef<HTMLElement>(null);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openMobileGroup, setOpenMobileGroup] = useState<string | null>(null);

  const closeAllMenus = useCallback(() => {
    setOpenMenu(null);
    setMobileMenuOpen(false);
    setOpenMobileGroup(null);
  }, []);

  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target;
      const clickedInsideMenu =
        target instanceof Element &&
        Boolean(target.closest(".nav-dropdown, .mobile-menu"));

      if (
        !(target instanceof Node) ||
        !headerRef.current?.contains(target) ||
        !clickedInsideMenu
      ) {
        closeAllMenus();
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeAllMenus();
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [closeAllMenus]);

  return (
    <>
      <div className="topbar">
        <div className="container topbar-inner">
          <p>Atendimentos presenciais em Curitiba e modalidades on-line conforme o serviço</p>
          <a href="tel:+5541992113665">(41) 99211-3665</a>
        </div>
      </div>

      <header className="site-header" ref={headerRef}>
        <div className="container nav-wrap">
          <Link
            className="brand brand-logo-link"
            href="/"
            aria-label="Integrada Neuropsicologia — início"
            onClick={closeAllMenus}
          >
            <span className="brand-logo-crop" aria-hidden="true">
              <img src="/logo-horizontal.jpg" alt="" width="500" height="500" />
            </span>
          </Link>

          <nav className="site-nav" aria-label="Navegação principal">
            {navigationGroups.map((group, index) => {
              const isOpen = openMenu === group.label;
              const panelId = `desktop-menu-${index}`;

              return (
                <div
                  className="nav-dropdown"
                  data-open={isOpen}
                  key={group.label}
                >
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => {
                      setOpenMenu(isOpen ? null : group.label);
                      setMobileMenuOpen(false);
                      setOpenMobileGroup(null);
                    }}
                  >
                    {group.label}
                    <span aria-hidden="true">⌄</span>
                  </button>
                  <div
                    className="nav-dropdown-panel"
                    id={panelId}
                    hidden={!isOpen}
                  >
                    {group.links.map((link) => (
                      <a
                        href={link.href}
                        key={link.href}
                        onClick={closeAllMenus}
                      >
                        {link.label}
                      </a>
                    ))}
                  </div>
                </div>
              );
            })}

            {directLinks.map((link) => (
              <a
                className="nav-direct-link"
                href={link.href}
                key={link.href}
                onClick={closeAllMenus}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="mobile-menu" data-open={mobileMenuOpen}>
            <button
              type="button"
              className="mobile-menu-trigger"
              aria-label={
                mobileMenuOpen
                  ? "Fechar menu principal"
                  : "Abrir menu principal"
              }
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu-panel"
              onClick={() => {
                setMobileMenuOpen((current) => {
                  if (current) {
                    setOpenMobileGroup(null);
                  }
                  return !current;
                });
                setOpenMenu(null);
              }}
            >
              Menu
            </button>
            <nav
              className="mobile-menu-panel"
              id="mobile-menu-panel"
              aria-label="Navegação para celular"
              hidden={!mobileMenuOpen}
            >
              {navigationGroups.map((group, index) => {
                const isOpen = openMobileGroup === group.label;
                const panelId = `mobile-menu-${index}`;

                return (
                  <div
                    className="mobile-nav-group"
                    data-open={isOpen}
                    key={group.label}
                  >
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() =>
                        setOpenMobileGroup(isOpen ? null : group.label)
                      }
                    >
                      {group.label}
                      <span aria-hidden="true">⌄</span>
                    </button>
                    <div
                      className="mobile-nav-links"
                      id={panelId}
                      hidden={!isOpen}
                    >
                      {group.links.map((link) => (
                        <a
                          href={link.href}
                          key={link.href}
                          onClick={closeAllMenus}
                        >
                          {link.label}
                        </a>
                      ))}
                    </div>
                  </div>
                );
              })}

              {directLinks.map((link) => (
                <a
                  className="nav-direct-link"
                  href={link.href}
                  key={link.href}
                  onClick={closeAllMenus}
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </header>
    </>
  );
}
