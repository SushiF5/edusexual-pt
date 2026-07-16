"use client";

import { useState } from "react";
import { useI18n } from "@/i18n/context";
import { Audience } from "@/types";

interface DoubtsTabProps {
  audience: Audience;
  submitted: boolean;
  setSubmitted: (v: boolean) => void;
  questionForm: { name: string; question: string };
  setQuestionForm: React.Dispatch<React.SetStateAction<{ name: string; question: string }>>;
  isSending: boolean;
  setIsSending: (v: boolean) => void;
}

export default function DoubtsTab({
  audience, submitted, setSubmitted, questionForm, setQuestionForm, isSending, setIsSending
}: DoubtsTabProps) {
  const { t } = useI18n();
  const [error, setError] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!questionForm.question.trim() || isSending) return;
    setIsSending(true);
    setError(false);
    let success = false;
    try {
      const res = await fetch("/api/telegram", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: questionForm.name,
          question: questionForm.question,
          audience,
        }),
      });
      if (!res.ok) {
        const errorText = await res.text();
        console.error("Telegram API error:", errorText);
        setError(true);
      } else {
        success = true;
      }
    } catch (e) {
      console.error("Failed to send question:", e);
      setError(true);
    }
    setIsSending(false);
    setSubmitted(success);
  };

  if (submitted) {
    return (
      <div className="card text-center py-10 md:py-16" aria-live="polite">
        <div className="text-5xl md:text-6xl mb-4 md:mb-6">✅</div>
        <h3 className="text-2xl md:text-3xl font-bold text-primary mb-3 md:mb-4">{t.questionSent}</h3>
        <p className="text-gray-500 dark:text-gray-400 mb-6 md:mb-8 text-sm md:text-base">{t.questionSentDesc}</p>
        <button onClick={() => { setSubmitted(false); setQuestionForm({ name: '', question: '' }); }} className="btn-secondary">{t.sendAnother}</button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="glass-card">
        <div className="text-center mb-6 md:mb-10">
          <div className="bg-secondary/20 w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center text-3xl md:text-4xl mx-auto mb-4 md:mb-6">🕵️</div>
          <h3 className="text-2xl md:text-3xl font-heading font-bold text-primary mb-2 md:mb-3">{t.doubtsTitle}</h3>
          <p className="text-gray-500 dark:text-gray-400 text-sm md:text-base">{t.doubtsSubtitle}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4 text-red-700 dark:text-red-400 text-sm" role="alert">
              {t.questionSendError || "Erro ao enviar pergunta. Tenta novamente."}
            </div>
          )}
          <div>
            <label htmlFor="question-name" className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">{t.yourNameOptional}</label>
            <input
              id="question-name"
              type="text"
              value={questionForm.name}
              onChange={(e) => setQuestionForm((prev) => ({ ...prev, name: e.target.value }))}
              className="w-full p-3 md:p-4 rounded-2xl border-2 border-gray-100 dark:border-gray-600 dark:bg-gray-700 focus:border-primary outline-none transition text-sm md:text-base"
              placeholder={audience === 'criancas' ? t.namePlaceholderCrianca : audience === 'adultos' ? t.namePlaceholderAdulto : t.namePlaceholderJovem}
              aria-describedby="name-help"
            />
            <span id="name-help" className="sr-only">{t.nameHelp}</span>
          </div>
          <div>
            <label htmlFor="question-text" className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">{t.yourQuestion}</label>
            <textarea
              id="question-text"
              required
              value={questionForm.question}
              onChange={(e) => setQuestionForm((prev) => ({ ...prev, question: e.target.value }))}
              className="w-full p-3 md:p-4 rounded-2xl border-2 border-gray-100 dark:border-gray-600 dark:bg-gray-700 focus:border-primary outline-none transition min-h-[120px] md:min-h-[150px] text-sm md:text-base"
              placeholder={
                audience === 'criancas'
                  ? t.questionPlaceholderCrianca
                  : audience === 'adultos'
                  ? t.questionPlaceholderAdulto
                  : t.questionPlaceholderJovem
              }
              aria-describedby="question-help"
              maxLength={2000}
            ></textarea>
            <div className="flex justify-between items-center mt-1">
              <span id="question-help" className="sr-only">{t.questionHelp}</span>
              <span className={`text-xs ${questionForm.question.length > 1800 ? 'text-amber-500' : 'text-gray-400'}`} aria-live="polite">
                {questionForm.question.length}/2000
              </span>
            </div>
          </div>
          <button type="submit" className="btn-primary w-full py-3 md:py-4 text-base md:text-lg flex items-center justify-center gap-2" disabled={!questionForm.question.trim() || isSending} aria-busy={isSending}>
            {isSending && <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span>}
            {isSending ? t.submitting : t.submitQuestion}
          </button>
          <p className="text-xs text-gray-400 text-center">{t.anonymousNote}</p>
        </form>
      </div>

      <div className="mt-8 md:mt-10 card bg-accent/10 border-accent">
        <h3 className="font-heading font-semibold text-primary mb-3">
          {audience === 'criancas' ? t.helplinesCrianca : audience === 'jovens' ? t.helplinesJovem : t.helplinesAdulto}
        </h3>
        {audience === 'criancas' ? (
          <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
            <li>📞 <strong>Linha Criança</strong> — 116 111 (grátis)</li>
            <li>📞 <strong>SOS Criança</strong> — 21 793 1629</li>
            <li>💬 Podes falar com um professor ou adulto de confiança</li>
          </ul>
        ) : audience === 'jovens' ? (
          <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
            <li>📞 <strong>SNS 24</strong> — 808 200 204 (saúde)</li>
            <li>📞 <strong>APF</strong> — Planeamento Familiar grátis</li>
            <li>📞 <strong>Linha do Arco-Íris</strong> — apoio LGBTQI+</li>
            <li>📞 <strong>APAV</strong> — 800 200 2200 (vítimas de crime)</li>
            <li>📞 <strong>Voz de Apoio</strong> — 21 354 4090</li>
          </ul>
        ) : (
          <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
            <li>📞 <strong>APAV</strong> — 800 200 2200 (apoio vítimas)</li>
            <li>📞 <strong>CPCJ</strong> — Comissão de Proteção de Crianças e Jovens</li>
            <li>📞 <strong>APF</strong> — Consultas de Planeamento Familiar</li>
            <li>📞 <strong>DGE</strong> — Educação Sexual nas Escolas</li>
            <li>📞 <strong>Linha Criança</strong> — 116 111</li>
          </ul>
        )}
      </div>
    </div>
  );
}
