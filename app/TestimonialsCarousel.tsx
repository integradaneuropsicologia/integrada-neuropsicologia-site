"use client";

import { useEffect, useState } from "react";

type Testimonial = {
  id: string;
  author: string;
  quote: string;
};

const testimonials: Testimonial[] = [
  {
    id: "mariana-sousa",
    author: "Mariana Sousa",
    quote:
      "Atendimento excepcional! Do início do contato até o final das avaliações e as sessões de terapia, todo o processo foi absurdamente incrível.",
  },
  {
    id: "hugo-beraldi",
    author: "Hugo Beraldi",
    quote:
      "Com sensibilidade, profissionalismo e escuta atenta, a Dra. Carla me ajudou a compreender aspectos da minha vida que por muito tempo estiveram sem explicação.",
  },
  {
    id: "maria-helena-hirata",
    author: "Maria Helena Hirata",
    quote: "Obrigada Integrada Neuropsicologia por seu excelente trabalho!",
  },
  {
    id: "ana-paula",
    author: "Ana Paula",
    quote:
      "A equipe da Integrada Neuropsicologia é incrível e muito profissional. Só tenho a elogiar e a agradecer!",
  },
];

function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

export function TestimonialsCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotionPreference = () => setPrefersReducedMotion(mediaQuery.matches);
    updateMotionPreference();
    mediaQuery.addEventListener("change", updateMotionPreference);

    return () => mediaQuery.removeEventListener("change", updateMotionPreference);
  }, []);

  useEffect(() => {
    if (isPaused || prefersReducedMotion) return;

    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % testimonials.length);
    }, 4000);

    return () => window.clearInterval(interval);
  }, [isPaused, prefersReducedMotion]);

  const testimonial = testimonials[activeIndex];

  function showTestimonial(index: number) {
    setActiveIndex((index + testimonials.length) % testimonials.length);
  }

  return (
    <div
      className="testimonial-carousel"
      aria-roledescription="carrossel"
      aria-label="Depoimentos sobre a Integrada Neuropsicologia"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={() => setIsPaused(false)}
    >
      <aside className="testimonial-carousel-intro">
        <p className="testimonial-carousel-label">Experiências reais</p>
        <p className="testimonial-carousel-copy">
          Alguns relatos de quem encontrou acolhimento, clareza e novos caminhos.
        </p>
        <small className="testimonial-carousel-note">
          Os depoimentos mudam automaticamente a cada 4 segundos. A troca pausa durante a interação.
        </small>
      </aside>

      <div className="testimonial-carousel-stage">
        <figure key={`${testimonial.id}-${activeIndex}`}>
          <div className="review-card-topline">
            <span className="stars" aria-label="5 de 5 estrelas">★★★★★</span>
            <span>
              {String(activeIndex + 1).padStart(2, "0")} / {String(testimonials.length).padStart(2, "0")}
            </span>
          </div>
          <blockquote>“{testimonial.quote}”</blockquote>
          <figcaption>
            <span aria-hidden="true">{initials(testimonial.author)}</span>
            <div>
              <strong>{testimonial.author}</strong>
              <small>Depoimento de paciente</small>
            </div>
          </figcaption>
          <span className="quote-mark" aria-hidden="true">“</span>
        </figure>

        <div className="testimonial-controls">
          <div className="testimonial-arrows">
            <button type="button" onClick={() => showTestimonial(activeIndex - 1)} aria-label="Depoimento anterior">←</button>
            <button type="button" onClick={() => showTestimonial(activeIndex + 1)} aria-label="Próximo depoimento">→</button>
          </div>
          <div className="testimonial-dots" aria-label="Escolher depoimento">
            {testimonials.map((item, index) => (
              <button
                key={item.id}
                type="button"
                className={index === activeIndex ? "is-active" : ""}
                aria-label={`Mostrar depoimento ${index + 1}`}
                aria-current={index === activeIndex ? "true" : undefined}
                onClick={() => showTestimonial(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
