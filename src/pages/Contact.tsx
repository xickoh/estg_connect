import React, { useState } from "react";
import { FC } from "react";
import { toast } from "react-toastify";
import "./Contact.css";

const InstagramIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
  </svg>
);

const TikTokIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z" />
  </svg>
);

const EMAIL = "your@email.com"
const SUBMIT_URL = `https://formsubmit.co/${EMAIL}` as const;
const DEFAULT_SUBJECT = "ESTG CONNECT - CONTACT FORM"

const Contact: FC = () => {
  const [form, setForm] = useState({ nome: "", email: "", mensagem: "" });
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true)
    
    const response = await fetch(SUBMIT_URL, {
      method: "POST",
      body: JSON.stringify({ ...form, _captcha: false, _subject: DEFAULT_SUBJECT }),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    if (!response.ok) {
        toast.error("Ocorreu um erro ao submeter o formulário.")
    } else {
        toast.success("Formulário submetido com sucesso.")
    }

    setIsSubmitting(false)


  };

  return (
    <section className="fale-connosco">
      <h1 className="fale-connosco__title">FALE CONNOSCO</h1>

      <div className="fale-connosco__content">
        <div className="fale-connosco__left">
          <p className="fale-connosco__text">
            <strong>Ficaste com alguma dúvida sobre o seminário?</strong>
          </p>
          <p className="fale-connosco__text">
            Quer precises de mais informações sobre o seminário ou tenhas uma
            pergunta específica, estamos à distância de uma mensagem!
          </p>
          <p className="fale-connosco__text">
            A nossa equipa está disponível para ajudar e promete ser rápida na
            resposta.
          </p>

          <div className="fale-connosco__socials">
            <a href="https://www.instagram.com/estg.connect/" className="fale-connosco__social-link" target="_blank" rel="noreferrer">
              <InstagramIcon />
              <span>INSTAGRAM</span>
            </a>
            <a href="https://www.tiktok.com/@estg.connect" className="fale-connosco__social-link" target="_blank" rel="noreferrer">
              <TikTokIcon />
              <span>TIKTOK</span>
            </a>
          </div>
        </div>

        <form className="fale-connosco__form" onSubmit={handleSubmit}>
          <div className="fale-connosco__field">
            <label htmlFor="nome">
              Nome<span className="field_required">*</span>
            </label>
            <input
              id="nome"
              name="nome"
              type="text"
              value={form.nome}
              onChange={handleChange}
              required
            />
          </div>

          <div className="fale-connosco__field">
            <label htmlFor="email">
              Email<span className="field_required">*</span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="fale-connosco__field">
            <label htmlFor="mensagem">
              Mensagem<span className="field_required">*</span>
            </label>
            <textarea
              id="mensagem"
              name="mensagem"
              value={form.mensagem}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className={"fale-connosco__btn"} disabled={isSubmitting}>
            {isSubmitting ? "A Enviar" : "Enviar"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
