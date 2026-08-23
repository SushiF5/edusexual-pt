"use client";

import { useState, useMemo } from "react";
import { frequentlyAskedQuestions } from "@/data/content";
import { useI18n } from "@/i18n/context";
import { Audience } from "@/types";

interface FaqTabProps {
  audience: Audience;
}

export default function FaqTab({ audience }: FaqTabProps) {
  const { t } = useI18n();
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredFaq = useMemo(() => {
    const byAudience = frequentlyAskedQuestions.filter((faq) => faq.audience.includes(audience));
    const q = searchQuery.trim().toLowerCase();
    if (!q) return byAudience;
    return byAudience.filter(
      (faq) =>
        faq.question.toLowerCase().includes(q) ||
        faq.answer.toLowerCase().includes(q)
    );
  }, [audience, searchQuery]);

  return (
    <div className="max-w-4xl mx-auto space-y-6 md:space-y-8">
      <div className="text-center mb-8 md:mb-12">
        <h3 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-3 md:mb-4">{t.faqTitle}</h3>
        <p className="text-gray-500 dark:text-gray-400 text-sm md:text-base">
          {audience === 'criancas' ? t.faqDescCrianca :
          audience === 'adultos' ? t.faqDescAdulto :
          t.faqDescJovem}
        </p>
        <div className="max-w-md mx-auto mt-4 md:mt-6">
          <div className="relative">
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.searchFaq}
              className="w-full p-3 md:p-4 pl-12 rounded-full border-2 border-gray-100 dark:border-gray-600 dark:bg-gray-800 focus:border-primary outline-none transition text-sm md:text-base"
              aria-label={t.searchFaq}
            />
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg" role="img" aria-hidden="true">🔍</span>
          </div>
        </div>
      </div>

      {filteredFaq.length === 0 && searchQuery.trim() ? (
        <div className="text-center py-12 text-gray-500 dark:text-gray-400" role="status" aria-live="polite">
          <p className="text-lg mb-2">{t.noFaqFound} &ldquo;{searchQuery}&rdquo;</p>
          <p className="text-sm">{t.tryOtherTerms}</p>
        </div>
      ) : (
      <div className="space-y-3 md:space-y-4">
        {filteredFaq.map((faq, index) => (
          <div key={faq.id} className="card !p-0 overflow-hidden">
            <button
              id={`faq-btn-${faq.id}`}
              onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
              className="w-full text-left p-4 md:p-6 flex justify-between items-center hover:bg-gray-50 dark:hover:bg-gray-700/50 transition"
              aria-expanded={expandedIndex === index}
              aria-controls={`faq-panel-${faq.id}`}
            >
              <span className="text-base md:text-lg font-bold text-primary pr-4">{faq.question}</span>
              <span className={`text-2xl transition-transform shrink-0 ${expandedIndex === index ? "rotate-45" : ""}`} aria-hidden="true">+</span>
            </button>
            {expandedIndex === index && (
              <div id={`faq-panel-${faq.id}`} role="region" aria-labelledby={`faq-btn-${faq.id}`} className="p-4 md:p-6 bg-gray-50 dark:bg-gray-700/50 border-t border-gray-100 dark:border-gray-600 text-gray-700 dark:text-gray-300 leading-relaxed text-sm md:text-base">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
      )}
    </div>
  );
}
