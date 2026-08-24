"use client";

import { useEffect, useSyncExternalStore } from "react";
import { siteConfig } from "./siteConfig";

const storageKey = "integrada_analytics_consent";
const tagManagerId = siteConfig.googleTagManagerId;
type ConsentChoice = "accepted" | "rejected" | null | "loading";

declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}

function enableAnalytics() {
  if (!tagManagerId || document.querySelector(`script[data-gtm-id="${tagManagerId}"]`)) return;

  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push({ "gtm.start": Date.now(), event: "gtm.js" });

  const script = document.createElement("script");
  script.async = true;
  script.dataset.gtmId = tagManagerId;
  script.src = `https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(tagManagerId)}`;
  document.head.appendChild(script);
}

export function AnalyticsConsent() {
  const choice = useSyncExternalStore<ConsentChoice>(
    (onStoreChange) => {
      window.addEventListener("storage", onStoreChange);
      return () => window.removeEventListener("storage", onStoreChange);
    },
    () => {
      const stored = window.localStorage.getItem(storageKey);
      return stored === "accepted" || stored === "rejected" ? stored : null;
    },
    () => "loading",
  );

  useEffect(() => {
    if (choice === "accepted") enableAnalytics();
  }, [choice]);

  useEffect(() => {
    if (choice !== "accepted") return;

    const handleClick = (event: MouseEvent) => {
      const target = event.target instanceof Element ? event.target.closest<HTMLElement>("[data-analytics-event]") : null;
      if (!target || !window.dataLayer) return;

      window.dataLayer.push({
        event: target.dataset.analyticsEvent,
        page_path: window.location.pathname,
        interaction_context: target.dataset.analyticsContext ?? "site",
      });
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [choice]);

  if (choice !== null) return null;

  const saveChoice = (nextChoice: "accepted" | "rejected") => {
    window.localStorage.setItem(storageKey, nextChoice);
    window.dispatchEvent(new StorageEvent("storage", { key: storageKey, newValue: nextChoice }));
    if (nextChoice === "accepted") enableAnalytics();
  };

  return (
    <aside className="cookie-consent" aria-label="Preferências de privacidade">
      <div>
        <strong>Privacidade e medição</strong>
        <p>
          Usamos dados anônimos de navegação para melhorar o site. Nenhum dado informado nos formulários é enviado
          à ferramenta de métricas. <a href="/politica-de-privacidade">Saiba mais</a>.
        </p>
      </div>
      <div className="cookie-consent-actions">
        <button type="button" onClick={() => saveChoice("rejected")}>Recusar</button>
        <button type="button" className="button" onClick={() => saveChoice("accepted")}>Aceitar</button>
      </div>
    </aside>
  );
}
