import React from "react";
import "./FaqItem.css";
import { SlArrowDown } from "react-icons/sl";
import { SlArrowUp } from "react-icons/sl";

type faqItemProps = {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
};

const faqItem = ({ question, answer, isOpen, onClick }: faqItemProps) => {
  return (
    <div className="faq-item">
      <button
        className="faq-item__question"
        onClick={onClick}
        aria-expanded={isOpen}
        type="button"
      >
        <span>{question}</span>
        <span className="faq-item__icon">{isOpen ? <SlArrowUp /> : <SlArrowDown />}</span>
      </button>

      {isOpen && (
        <div className="faq-item__answer">
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
};

export default faqItem;