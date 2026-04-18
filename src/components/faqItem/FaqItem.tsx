import React, { useLayoutEffect, useRef } from "react";
import "./FaqItem.css";
import { SlArrowDown } from "react-icons/sl";

type FaqItemProps = {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
};

const FaqItem = ({ question, answer, isOpen, onClick }: FaqItemProps) => {
  const contentRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = contentRef.current;
    if (!el) return;

    const startHeight = el.getBoundingClientRect().height;

    el.style.height = `${startHeight}px`;
    el.style.overflow = "hidden";

    requestAnimationFrame(() => {
      const endHeight = isOpen ? el.scrollHeight : 0;
      el.style.height = `${endHeight}px`;
    });
  }, [isOpen]);

  return (
    <div className={`faq-item ${isOpen ? "faq-item--open" : ""}`}>
      <button
        className="faq-item__question"
        onClick={onClick}
        aria-expanded={isOpen}
        type="button"
      >
        <span>{question}</span>
        <span className={`faq-item__icon ${isOpen ? "faq-item__icon--open" : ""}`}>
          {/* <SlArrowDown /> */}
        </span>
      </button>

      <div
        ref={contentRef}
        className="faq-item__answer"
        aria-hidden={!isOpen}
      >
        <div className="faq-item__answer-inner">
          <p>{answer}</p>
        </div>
      </div>
    </div>
  );
};

export default FaqItem;