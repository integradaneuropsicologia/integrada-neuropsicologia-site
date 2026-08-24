"use client";

import { FormEvent, useRef, useState } from "react";

const options = [
  "Atenção, foco ou organização",
  "Memória ou mudanças cognitivas",
  "Investigação de TDAH",
  "Investigação de TEA/autismo",
  "Ansiedade, humor ou sobrecarga",
  "Dificuldades no trabalho ou nos estudos",
  "Outra dúvida sobre avaliação",
  "Ainda não sei qual serviço procurar",
];

export function OnlineContactForm() {
  const [sent, setSent] = useState(false);
  const started = useRef(false);

  function handleFormStart() {
    if (started.current) return;
    started.current = true;
    window.dataLayer?.push({ event: "form_start", page_path: window.location.pathname, interaction_context: "online_assessment" });
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") || "").trim();
    const interest = String(form.get("interest") || "avaliação on-line").trim();
    const note = String(form.get("note") || "").trim();
    const optionalNote = note ? ` Minha dúvida, de forma breve: ${note}` : "";
    const message = `Olá! Meu nome é ${name}. Gostaria de orientação sobre avaliação neuropsicológica on-line. O principal motivo do contato é: ${interest}.${optionalNote}`;

    window.dataLayer?.push({ event: "form_submit", page_path: window.location.pathname, interaction_context: "online_assessment" });
    window.open(`https://wa.me/5541992113665?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
    setSent(true);
  }

  return (
    <form className="contact-form online-contact-form" onSubmit={handleSubmit} onFocusCapture={handleFormStart}>
      <div className="form-heading">
        <span>Orientação inicial</span>
        <p>Preencha apenas informações gerais. A conversa continuará pelo WhatsApp.</p>
      </div>
      <label>
        Seu nome
        <input name="name" type="text" placeholder="Como podemos chamar você?" autoComplete="name" required />
      </label>
      <label>
        Qual é sua principal dúvida?
        <select name="interest" defaultValue="" required>
          <option value="" disabled>Selecione uma opção</option>
          {options.map((option) => <option key={option}>{option}</option>)}
        </select>
      </label>
      <label>
        Mensagem breve <span className="optional-label">opcional</span>
        <textarea name="note" rows={4} placeholder="Sem documentos ou informações clínicas detalhadas." maxLength={500} />
      </label>
      <label className="consent-field">
        <input name="consent" type="checkbox" required />
        <span>Autorizo o uso destas informações para responder ao contato e li a <a href="/politica-de-privacidade">Política de Privacidade</a>.</span>
      </label>
      <button className="button form-button" type="submit">
        Continuar pelo WhatsApp <span aria-hidden="true">↗</span>
      </button>
      <p className="form-privacy">
        {sent ? "Conversa aberta no WhatsApp." : "O site não armazena as respostas deste formulário."}
      </p>
    </form>
  );
}
