/* eslint-disable @next/next/next-script-for-ga -- The GTM head and noscript snippets are rendered inline from a validated real container ID; the head snippet is the official one except that gtm.js is inserted after the first paint. */

import {
  COOKIE_CONSENT_STORAGE_KEY,
  COOKIE_CONSENT_VERSION,
} from "@/lib/consent-config";

const GTM_CONTAINER_PATTERN = /^GTM-[A-Z0-9]+$/;

export function resolveGtmContainerId(value: string | undefined) {
  const containerId = value?.trim().toUpperCase();
  return containerId && GTM_CONTAINER_PATTERN.test(containerId) ? containerId : null;
}

export function GoogleConsentDefaults() {
  const storageKey = JSON.stringify(COOKIE_CONSENT_STORAGE_KEY);

  return (
    <script
      data-google-consent-defaults="true"
      dangerouslySetInnerHTML={{
        __html: `
          window.dataLayer = window.dataLayer || [];
          window.gtag = window.gtag || function(){ window.dataLayer.push(arguments); };
          window.gtag('consent', 'default', {
            analytics_storage: 'denied',
            ad_storage: 'denied',
            ad_user_data: 'denied',
            ad_personalization: 'denied',
            wait_for_update: 500
          });
          try {
            var storedConsent = JSON.parse(window.localStorage.getItem(${storageKey}) || 'null');
            if (
              storedConsent &&
              storedConsent.version === ${COOKIE_CONSENT_VERSION} &&
              typeof storedConsent.analytics === 'boolean' &&
              typeof storedConsent.ads === 'boolean' &&
              typeof storedConsent.expiresAt === 'number' &&
              storedConsent.expiresAt > Date.now()
            ) {
              window.gtag('consent', 'update', {
                analytics_storage: storedConsent.analytics ? 'granted' : 'denied',
                ad_storage: storedConsent.ads ? 'granted' : 'denied',
                ad_user_data: storedConsent.ads ? 'granted' : 'denied',
                ad_personalization: 'denied'
              });
            }
          } catch (_) {
            // Keep the privacy-safe denied defaults when storage is unavailable or invalid.
          }
        `,
      }}
    />
  );
}

export function GoogleTagManagerHead({ containerId }: { containerId: string | null }) {
  if (!containerId) return null;

  // Official GTM snippet, except that gtm.js is inserted only after the first contentful paint
  // (fallbacks: first interaction, or 3 s after window load) so it does not compete with the first render.
  // The dataLayer init and the gtm.start event stay synchronous, after the consent defaults.
  return (
    <script
      data-google-tag-manager="head"
      dangerouslySetInnerHTML={{
        __html: `
          (function(w,d,s,l,i){
            w[l]=w[l]||[];
            w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});
            var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'',started=false;
            j.async=true;
            j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
            function start(){
              if(started)return;
              started=true;
              setTimeout(function(){(d.head||f.parentNode).appendChild(j);},0);
            }
            try{
              new PerformanceObserver(function(list){
                if(list.getEntriesByName('first-contentful-paint').length)start();
              }).observe({type:'paint',buffered:true});
            }catch(_){}
            w.addEventListener('load',function(){setTimeout(start,3000);});
            ['pointerdown','keydown','focusin'].forEach(function(t){
              d.addEventListener(t,start,{once:true,capture:true,passive:true});
            });
          })(window,document,'script','dataLayer',${JSON.stringify(containerId)});
        `,
      }}
    />
  );
}

export function GoogleTagManagerNoScript({ containerId }: { containerId: string | null }) {
  if (!containerId) return null;

  return (
    <noscript data-google-tag-manager="body">
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${encodeURIComponent(containerId)}`}
        height="0"
        width="0"
        title="Google Tag Manager"
        style={{ display: "none", visibility: "hidden" }}
      />
    </noscript>
  );
}


