"use client";

import { FormEvent, useState } from "react";

export function ContactForm() {
  const [sent, setSent] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") || "");
    const phone = String(form.get("phone") || "");
    const interest = String(form.get("interest") || "avaliação neuropsicológica");
    const message = `Olá! Meu nome é ${name}. Tenho interesse em ${interest}. Meu telefone é ${phone}. Gostaria de receber uma orientação.`;

    window.open(`https://wa.me/5541992113665?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
    setSent(true);
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="form-heading">
        <span>Orientação inicial</span>
        <p>Preencha os dados e continue a conversa pelo WhatsApp.</p>
      </div>
      <label>
        Seu nome
        <input name="name" type="text" placeholder="Como podemos chamar você?" autoComplete="name" required />
      </label>
      <label>
        Telefone
        <input name="phone" type="tel" placeholder="(00) 00000-0000" autoComplete="tel" required />
      </label>
      <label>
        O que você procura?
        <select name="interest" defaultValue="">
          <option value="" disabled>Selecione uma opção</option>
          <option>Avaliação infantojuvenil</option>
          <option>Avaliação para adultos</option>
          <option>Avaliação para idosos</option>
          <option>Avaliação on-line</option>
          <option>Psicoterapia (TCC)</option>
          <option>Ainda tenho dúvidas</option>
        </select>
      </label>
      <button className="button form-button" type="submit">
        Receber orientação <span aria-hidden="true">↗</span>
      </button>
      <p className="form-privacy">
        {sent ? "Conversa aberta no WhatsApp." : "Seus dados serão usados apenas para este contato."}
      </p>
    </form>
  );
}
