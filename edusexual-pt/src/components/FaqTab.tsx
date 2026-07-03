"use client";

import { useState, useMemo, useRef, useCallback } from "react";
import { frequentlyAskedQuestions } from "@/data/content";
import { useI18n } from "@/i18n/context";
import { Audience } from "@/types";

interface FaqTabProps {
  audience: Audience;
}

export default function FaqTab({ audience }: FaqTabProps) {
  const { t } = useI18n();
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const filteredFaq = useMemo(
    () => frequentlyAskedQuestions.filter((faq) => faq.audience.includes(audience)),
    [audience]
  );

  const handleKeyDown = useCallback((e: React.KeyboardEvent, index: number) => {
    const total = filteredFaq.length;
    if (total === 0) return;

    let nextIndex = index;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        nextIndex = (index + 1) % total;
        break;
      case "ArrowUp":
        e.preventDefault();
        nextIndex = (index - 1 + total) % total;
        break;
      case "Home":
        e.preventDefault();
        nextIndex = 0;
        break;
      case "End":
        e.preventDefault();
        nextIndex = total - 1;
        break;
      default:
        return;
    }

    buttonRefs.current[nextIndex]?.focus();
  }, [filteredFaq.length]);

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

      <div className="space-y-3 md:space-y-4" role="group" aria-label={t.faqTitle}>
        {filteredFaq.map((faq, index) => (
          <div key={index} className="card !p-0 overflow-hidden">
            <button
              ref={(el) => { buttonRefs.current[index] = el; }}
              id={`faq-btn-${index}`}
              onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="w-full text-left p-4 md:p-6 flex justify-between items-center hover:bg-gray-50 dark:hover:bg-gray-700/50 transition"
              aria-expanded={expandedIndex === index}
              aria-controls={`faq-panel-${index}`}
            >
              <span className="text-base md:text-lg font-bold text-primary pr-4">{faq.question}</span>
              <span className={`text-2xl transition-transform shrink-0 ${expandedIndex === index ? "rotate-45" : ""}`} aria-hidden="true">+</span>
            </button>
            {expandedIndex === index && (
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
