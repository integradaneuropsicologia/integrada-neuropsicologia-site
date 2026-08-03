"use client";

import { useEffect, useMemo, useState } from "react";

type GoogleReview = {
  id: string;
  author: string;
  authorUri?: string;
  rating: number;
  text: string;
  published?: string;
  googleMapsUri?: string;
};

type GoogleReviewsResponse = {
  placeName: string;
  rating?: number;
  reviewCount?: number;
  reviewsUri?: string;
  reviews: GoogleReview[];
};

const googleMapsSearchUrl =
  "https://www.google.com/maps/search/?api=1&query=Integrada+Neuropsicologia+Rua+Jacarezinho+1266+Curitiba+PR";

const fallbackReviews: GoogleReview[] = [
  {
    id: "mariana-sousa",
    author: "Mariana Sousa",
    rating: 5,
    text: "Atendimento excepcional! Do início do contato até o final das avaliações e as sessões de terapia, todo o processo foi absurdamente incrível.",
  },
  {
    id: "hugo-beraldi",
    author: "Hugo Beraldi",
    rating: 5,
    text: "Com sensibilidade, profissionalismo e escuta atenta, a Dra. Carla me ajudou a compreender aspectos da minha vida que por muito tempo estiveram sem explicação.",
  },
  {
    id: "maria-helena-hirata",
    author: "Maria Helena Hirata",
    rating: 5,
    text: "Obrigada Integrada Neuropsicologia por seu excelente trabalho!",
  },
  {
    id: "ana-paula",
    author: "Ana Paula",
    rating: 5,
    text: "A equipe da Integrada Neuropsicologia é incrível e muito profissional. Só tenho a elogiar e a agradecer!",
  },
];

const fallbackData: GoogleReviewsResponse = {
  placeName: "Integrada Neuropsicologia",
  reviewsUri: googleMapsSearchUrl,
  reviews: fallbackReviews,
};

function starsLabel(rating: number) {
  return `${rating.toLocaleString("pt-BR", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 1,
  })} de 5 estrelas`;
}

function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

export function GoogleReviewsCarousel() {
  const [data, setData] = useState<GoogleReviewsResponse>(fallbackData);
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
    const controller = new AbortController();

    async function loadGoogleReviews() {
      try {
        const response = await fetch("/api/google-reviews", {
          signal: controller.signal,
          headers: { accept: "application/json" },
        });
        if (!response.ok) return;

        const nextData = (await response.json()) as GoogleReviewsResponse;
        if (Array.isArray(nextData.reviews) && nextData.reviews.length > 0) {
          setData(nextData);
          setActiveIndex(0);
        }
      } catch (error) {
        if (!(error instanceof DOMException && error.name === "AbortError")) {
          // The locally rendered testimonials remain available when Google is unreachable.
        }
      }
    }

    void loadGoogleReviews();
    return () => controller.abort();
  }, []);

  useEffect(() => {
    if (isPaused || prefersReducedMotion || data.reviews.length < 2) return;

    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % data.reviews.length);
    }, 6500);

    return () => window.clearInterval(interval);
  }, [data.reviews.length, isPaused, prefersReducedMotion]);

  const review = data.reviews[activeIndex] ?? data.reviews[0];
  const reviewsUri = data.reviewsUri ?? googleMapsSearchUrl;
  const ratingLabel = useMemo(
    () => (typeof data.rating === "number" ? starsLabel(data.rating) : null),
    [data.rating],
  );

  function showReview(index: number) {
    const reviewCount = data.reviews.length;
    setActiveIndex((index + reviewCount) % reviewCount);
  }

  return (
    <div
      className="google-reviews"
      aria-roledescription="carrossel"
      aria-label="Avaliações da Integrada Neuropsicologia no Google Maps"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={() => setIsPaused(false)}
    >
      <aside className="google-review-summary">
        <p className="google-review-source" translate="no">Google Maps</p>
        {ratingLabel ? (
          <div className="google-average-rating">
            <strong>{data.rating?.toLocaleString("pt-BR", { minimumFractionDigits: 1, maximumFractionDigits: 1 })}</strong>
            <div>
              <span className="stars" aria-label={ratingLabel}>★★★★★</span>
              <small>{data.reviewCount?.toLocaleString("pt-BR")} avaliações</small>
            </div>
          </div>
        ) : (
          <p className="google-review-intro">Avaliações publicadas por pacientes no Google.</p>
        )}
        <a href={reviewsUri} target="_blank" rel="noreferrer">
          Ver todas as avaliações <span aria-hidden="true">↗</span>
        </a>
        <small className="google-review-order">
          Avaliações selecionadas pelo Google por relevância.
        </small>
      </aside>

      <div className="google-review-stage">
        <figure key={`${review.id}-${activeIndex}`}>
          <div className="review-card-topline">
            <span className="stars" aria-label={starsLabel(review.rating)}>
              {"★".repeat(Math.max(0, Math.min(5, Math.round(review.rating))))}
            </span>
            <span>{String(activeIndex + 1).padStart(2, "0")} / {String(data.reviews.length).padStart(2, "0")}</span>
          </div>
          <blockquote>“{review.text}”</blockquote>
          <figcaption>
            <span aria-hidden="true">{initials(review.author)}</span>
            <div>
              {review.authorUri ? (
                <a href={review.authorUri} target="_blank" rel="noreferrer">{review.author}</a>
              ) : (
                <strong>{review.author}</strong>
              )}
              <small>{review.published ?? "Avaliação publicada no Google"}</small>
            </div>
          </figcaption>
          {review.googleMapsUri ? (
            <a className="review-source-link" href={review.googleMapsUri} target="_blank" rel="noreferrer">
              Ver avaliação no <span translate="no">Google Maps</span>
            </a>
          ) : null}
          <span className="quote-mark" aria-hidden="true">“</span>
        </figure>

        <div className="testimonial-controls">
          <div className="testimonial-arrows">
            <button type="button" onClick={() => showReview(activeIndex - 1)} aria-label="Avaliação anterior">←</button>
            <button type="button" onClick={() => showReview(activeIndex + 1)} aria-label="Próxima avaliação">→</button>
          </div>
          <div className="testimonial-dots" aria-label="Escolher avaliação">
            {data.reviews.map((item, index) => (
              <button
                key={item.id}
                type="button"
                className={index === activeIndex ? "is-active" : ""}
                aria-label={`Mostrar avaliação ${index + 1}`}
                aria-current={index === activeIndex ? "true" : undefined}
                onClick={() => showReview(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
