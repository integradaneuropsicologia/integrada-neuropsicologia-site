"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { InformationalFooter } from "./InformationalFooter";
import { calculateScreeningResult, type CalculatedScreeningResult } from "./screeningScoring";
import type { ScreeningContent } from "./screeningContent";
import { SiteHeader } from "./SiteHeader";

const whatsappNumber = "5541992113665";

function whatsappHref(message: string) {
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export function ScreeningPage({ content }: { content: ScreeningContent }) {
  const initialVariant = content.variants?.[0]?.id ?? "default";
  const [variantId, setVariantId] = useState(initialVariant);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showErrors, setShowErrors] = useState(false);
  const [result, setResult] = useState<CalculatedScreeningResult | null>(null);

  const activeVariant = content.variants?.find((variant) => variant.id === variantId);
  const activeSections = activeVariant ? activeVariant.sections : (content.sections ?? []);
  const questions = activeSections.flatMap((section) => section.questions);
  const answeredCount = questions.reduce(
    (total, _, index) => total + (answers[index] === undefined ? 0 : 1),
    0,
  );

  function chooseAnswer(questionIndex: number, value: number) {
    setAnswers((current) => ({ ...current, [questionIndex]: value }));
    setResult(null);
  }

  function chooseVariant(nextVariantId: string) {
    setVariantId(nextVariantId);
    setAnswers({});
    setShowErrors(false);
    setResult(null);
  }

  function submitScreening(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const firstMissingIndex = questions.findIndex((_, index) => answers[index] === undefined);

    if (firstMissingIndex >= 0) {
      setShowErrors(true);
      setResult(null);
      requestAnimationFrame(() => {
        document.getElementById(`${content.slug}-question-${firstMissingIndex + 1}`)?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      });
      return;
    }

    setShowErrors(false);
    setResult(calculateScreeningResult({ content, questions, answers, variantLabel: activeVariant?.label }));
    requestAnimationFrame(() => {
      document.getElementById(`${content.slug}-result`)?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  function resetScreening() {
    setAnswers({});
    setShowErrors(false);
    setResult(null);
    document.getElementById("rastreamento")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  let runningIndex = 0;

  return (
    <main className="detail-page screening-page">
      <SiteHeader />

      <section className="detail-hero screening-hero">
        <div className="detail-container detail-hero-grid">
          <div className="detail-hero-copy">
            <Link className="detail-back-link" href="/">← Voltar ao início</Link>
            <p className="detail-eyebrow">{content.eyebrow}</p>
            <h1>{content.title}</h1>
            <p className="detail-hero-lead">{content.introduction}</p>
            <div className="detail-hero-actions">
              <a className="detail-button" href="#rastreamento">Começar o rastreamento</a>
              <a className="detail-text-link" href="#como-interpretar">
                Como interpretar <span aria-hidden="true">↓</span>
              </a>
            </div>
          </div>
          <div className="detail-hero-media">
            <img src={content.image} alt={content.imageAlt} width="700" height="700" fetchPriority="high" />
          </div>
        </div>
      </section>

      <section className="screening-questionnaire" id="rastreamento">
        <div className="detail-container">
          <div className="screening-heading">
            <p className="detail-eyebrow">Teste gratuito de rastreamento</p>
            <h2>{content.questionnaireTitle}</h2>
            <p>{content.questionnaireIntroduction}</p>
          </div>

          {content.variants && (
            <fieldset className="screening-variant-picker">
              <legend>Selecione a faixa da criança</legend>
              <div>
                {content.variants.map((variant) => (
                  <label key={variant.id}>
                    <input
                      type="radio"
                      name={`${content.slug}-variant`}
                      value={variant.id}
                      checked={variantId === variant.id}
                      onChange={() => chooseVariant(variant.id)}
                    />
                    <span>{variant.label}</span>
                  </label>
                ))}
              </div>
            </fieldset>
          )}

          <form className="screening-form" onSubmit={submitScreening} noValidate>
            <div className="screening-progress" aria-live="polite">
              <span>{answeredCount} de {questions.length} respondidas</span>
              <progress value={answeredCount} max={questions.length} aria-label="Progresso do rastreamento" />
            </div>

            {activeSections.map((section) => (
              <section className="screening-question-section" key={section.title}>
                {section.title && <h3>{section.title}</h3>}
                <div className="screening-question-list">
                  {section.questions.map((question) => {
                    const questionIndex = runningIndex++;
                    const questionNumber = questionIndex + 1;
                    const isMissing = showErrors && answers[questionIndex] === undefined;
                    const questionId = `${content.slug}-question-${questionNumber}`;

                    return (
                      <fieldset
                        className={`screening-question${isMissing ? " screening-question-error" : ""}`}
                        id={questionId}
                        key={`${variantId}-${questionNumber}-${question.text}`}
                      >
                        <legend><span>{questionNumber}.</span> {question.text}</legend>
                        {question.category && <p>Área observada: {content.categoryLabels?.[question.category] ?? question.category}</p>}
                        <div className={`screening-options screening-options-${content.options.length}`}>
                          {content.options.map((option) => {
                            const optionId = `${questionId}-option-${option.value}`;
                            return (
                              <div className="screening-option" key={option.value}>
                                <input
                                  id={optionId}
                                  type="radio"
                                  name={`${content.slug}-answer-${questionNumber}`}
                                  value={option.value}
                                  checked={answers[questionIndex] === option.value}
                                  onChange={() => chooseAnswer(questionIndex, option.value)}
                                />
                                <label htmlFor={optionId}>{option.label}</label>
                              </div>
                            );
                          })}
                        </div>
                        {isMissing && <span className="screening-question-message">Selecione uma opção.</span>}
                      </fieldset>
                    );
                  })}
                </div>
              </section>
            ))}

            {showErrors && answeredCount < questions.length && (
              <p className="screening-form-error" role="alert">
                Responda todas as perguntas destacadas antes de ver o resultado.
              </p>
            )}

            <button className="detail-button screening-submit" type="submit">Ver meu resultado</button>
          </form>

          {result && (
            <section
              className={`screening-result screening-result-${result.tone}`}
              id={`${content.slug}-result`}
              aria-live="polite"
            >
              <p className="detail-eyebrow">Seu rastreamento</p>
              <h2>{result.title}</h2>
              <p className="screening-result-lead">{result.description}</p>
              <ul>
                {result.metrics.map((metric) => (
                  <li key={metric.label}><strong>{metric.label}:</strong> {metric.value}</li>
                ))}
              </ul>
              <p className="screening-result-note"><strong>Importante:</strong> {result.disclaimer}</p>
              <div className="screening-result-actions">
                <a
                  className="detail-button"
                  href={whatsappHref(result.whatsappMessage)}
                  target="_blank"
                  rel="noreferrer"
                >
                  Saber mais sobre resultado
                </a>
                <button className="screening-reset" type="button" onClick={resetScreening}>Refazer teste</button>
              </div>
            </section>
          )}
        </div>
      </section>

      <section className="detail-section detail-scope" id="como-interpretar">
        <div className="detail-container">
          <div className="detail-section-heading detail-section-heading-centered">
            <p className="detail-eyebrow">Leitura cuidadosa</p>
            <h2>{content.contextTitle}</h2>
            <p>{content.contextIntroduction}</p>
          </div>
          <div className="detail-topic-grid">
            {content.contextTopics.map((topic, index) => (
              <article className="detail-topic-card" key={topic.title}>
                <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                <h3>{topic.title}</h3>
                <p>{topic.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <aside className="detail-disclaimer">
        <div className="detail-container">
          <strong>Importante</strong>
          <p>
            Este rastreamento não confirma nem exclui diagnóstico. A interpretação adequada considera história de
            vida, desenvolvimento, intensidade dos sinais, prejuízo funcional e outras possíveis explicações.
          </p>
        </div>
      </aside>

      <section className="detail-final-cta">
        <div className="detail-container detail-final-cta-inner">
          <div>
            <p className="detail-eyebrow">Orientação individualizada</p>
            <h2>{content.nextStepTitle}</h2>
            <p>{content.nextStepText}</p>
            <p><Link href={content.assessmentHref}>{content.assessmentLabel} →</Link></p>
          </div>
          <a
            className="detail-button detail-button-light"
            href={whatsappHref(content.whatsappMessage)}
            target="_blank"
            rel="noreferrer"
          >
            Conversar com a equipe
          </a>
        </div>
      </section>

      <InformationalFooter />
    </main>
  );
}
