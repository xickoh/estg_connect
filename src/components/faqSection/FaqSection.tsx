import React, { useState } from "react";
import FaqItem from "../faqItem/FaqItem";
import "./FaqSection.css";

type FaqDataItem = {
  id: number;
  question: string;
  answer: string;
};

const faqItems: FaqDataItem[] = [
  {
    id: 1,
    question: "Primeira pergunta?",
    answer:
      "Lorem Ipsum Lorem Ipsum.Lorem ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum.Lorem ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum.Lorem ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum.Lorem ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum.Lorem ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum.Lorem ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum.",
  },
  {
    id: 2,
    question: "Topic 1 ABC",
    answer:
      "Aqui podes colocar a resposta da segunda pergunta. Substitui este texto pelo conteúdo real.",
  },
  {
    id: 3,
    question: "Topic 1 ABC",
    answer:
      "Aqui podes colocar a resposta da terceira pergunta. Substitui este texto pelo conteúdo real.",
  },
  {
    id: 4,
    question: "Topic 1 ABC",
    answer:
      "Aqui podes colocar a resposta da quarta pergunta. Substitui este texto pelo conteúdo real.",
  },
  {
    id: 5,
    question: "Topic 1 ABC",
    answer:
      "Aqui podes colocar a resposta da quinta pergunta. Substitui este texto pelo conteúdo real.",
  },
  {
    id: 6,
    question: "Topic 1 ABC",
    answer:
      "Aqui podes colocar a resposta da sexta pergunta. Substitui este texto pelo conteúdo real.",
  },
];

const FaqSection = () => {
  const [openId, setOpenId] = useState<number | null>(1);

  const handleToggle = (id: number) => {
    setOpenId((current) => (current === id ? null : id));
  };

  return (
    <section className="faq-section">
      <div className="faq-section__container">
        <header className="faq-section__header">
          <h1 className="faq-section__title">FAQ</h1>
          <p className="faq-section__subtitle">
            Tens alguma dúvida? Estamos aqui para ajudar com as respostas que
            procuras.
          </p>
        </header>

        <div className="faq-section__list">
          {faqItems.map((item) => (
            <FaqItem
              key={item.id}
              question={item.question}
              answer={item.answer}
              isOpen={openId === item.id}
              onClick={() => handleToggle(item.id)}
            />
          ))}
        </div>

        <div className="faq-section__contact">
          <p>Ainda não esclarecemos as tuas dúvidas?</p>
          <a href="/contact">CONTACTAR ↗</a>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;