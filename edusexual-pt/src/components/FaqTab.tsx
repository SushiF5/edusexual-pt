"use client";

import { useState } from "react";
import { frequentlyAskedQuestions, useI18n } from "@/i18n/context";

type Audience = "criancas" | "jovens" | "adultos";

interface FaqTabProps {
  audience: Audience;
}

export default function FaqTab({ audience }: FaqTabProps) {
  const { t } = useI18n();
  const [showFaqAnswer, setShowFaqAnswer] = useState<number | null>(null);

  const parentQuestions = [
    "A que idade devo começar a falar sobre sexualidade com o meu filho?",
    "Se eu falar de sexo, não vai estimular o meu filho a experimentar?",
    "O meu filho brinca com os órgãos genitais. É normal?",
    "Como explicar de onde vêm os bebés a uma criança?",
    "O que fazer se a criança diz que foi tocada?",
  ];
  const kidsQuestions = [
    "É normal ter dúvidas sobre sexualidade?",
    "O meu filho brinca com os órgãos genitais. É normal?",
    "Como explicar de onde vêm os bebés a uma criança?",
  ];

  const filteredFaq = frequentlyAskedQuestions.filter((faq) => {
    if (audience === "adultos") return parentQuestions.includes(faq.question);
    if (audience === "criancas") return kidsQuestions.includes(faq.question);
    return !parentQuestions.includes(faq.question) || kidsQuestions.includes(faq.question);
  });

  return (
    <div className="max-w-4xl mx-auto space-y-6 md:space-y-8">
      <div className="text-center mb-8 md:mb-12">
        <h3 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-3 md:mb-4">{t.faqTitle}</h3>
        <p className="text-gray-500 dark:text-gray-400 text-sm md:text-base">
          {audience === 'criancas' ? t.faqDescCrianca :
          audience === 'adultos' ? t.faqDescAdulto :
          t.faqDescJovem}
        </p>
      </div>

      <div className="space-y-3 md:space-y-4">
        {filteredFaq.map((faq, index) => (
          <div key={index} className="card !p-0 overflow-hidden">
            <button
              id={`faq-btn-${index}`}
              onClick={() => setShowFaqAnswer(showFaqAnswer === index ? null : index)}
              className="w-full text-left p-4 md:p-6 flex justify-between items-center hover:bg-gray-50 dark:hover:bg-gray-700/50 transition"
              aria-expanded={showFaqAnswer === index}
              aria-controls={`faq-panel-${index}`}
            >
              <span className="text-base md:text-lg font-bold text-primary pr-4">{faq.question}</span>
              <span className={`text-2xl transition-transform shrink-0 ${showFaqAnswer === index ? "rotate-45" : ""}`}>+</span>
            </button>
            {showFaqAnswer === index && (
              <div id={`faq-panel-${index}`} role="region" aria-labelledby={`faq-btn-${index}`} className="p-4 md:p-6 bg-gray-50 dark:bg-gray-700/50 border-t border-gray-100 dark:border-gray-600 text-gray-700 dark:text-gray-300 leading-relaxed text-sm md:text-base">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
