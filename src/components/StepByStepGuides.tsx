"use client";

import { useState } from "react";
import { stepGuidesData, StepGuide } from "@/data/content-stepguides";
import { BookmarkItem } from "@/types";

interface StepByStepGuidesProps {
  onBookmark?: (item: BookmarkItem) => void;
  isBookmarked?: (id: string) => boolean;
}

export default function StepByStepGuides({
  onBookmark,
  isBookmarked = () => false,
}: StepByStepGuidesProps) {
  const [selectedGuideId, setSelectedGuideId] = useState<string>(stepGuidesData[0].id);
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);

  const currentGuide: StepGuide =
    stepGuidesData.find((g) => g.id === selectedGuideId) || stepGuidesData[0];

  const currentStep = currentGuide.steps[activeStepIndex] || currentGuide.steps[0];
  const bookmarked = isBookmarked(currentGuide.id);

  const handleSelectGuide = (id: string) => {
    setSelectedGuideId(id);
    setActiveStepIndex(0);
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Intro */}
      <div className="bg-gradient-to-r from-emerald-500/10 via-primary/10 to-blue-500/10 dark:from-emerald-500/20 dark:to-blue-500/20 p-6 md:p-8 rounded-3xl border border-emerald-500/20">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-3xl">📋</span>
          <h3 className="text-2xl md:text-3xl font-heading font-bold text-gray-900 dark:text-white">
            Guias Passo a Passo Interativos
          </h3>
        </div>
        <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base leading-relaxed">
          Instruções práticas e visuais para aprenderes sem dúvidas nem constrangimentos.
        </p>
      </div>

      {/* Guide selector tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {stepGuidesData.map((guide) => (
          <button
            key={guide.id}
            onClick={() => handleSelectGuide(guide.id)}
            className={`p-4 rounded-2xl border text-left transition flex items-center gap-3 ${
              selectedGuideId === guide.id
                ? "bg-primary text-white border-primary shadow-md"
                : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border-gray-100 dark:border-gray-700 hover:border-primary/50"
            }`}
          >
            <span className="text-2xl p-2 bg-white/20 rounded-xl">{guide.icon}</span>
            <div>
              <span className={`text-[10px] font-bold uppercase tracking-wider block ${selectedGuideId === guide.id ? "text-secondary" : "text-primary dark:text-primary-light"}`}>
                {guide.badge}
              </span>
              <h4 className="text-xs md:text-sm font-bold leading-snug">{guide.title}</h4>
            </div>
          </button>
        ))}
      </div>

      {/* Guide Content Card */}
      <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 md:p-10 shadow-sm border border-gray-100 dark:border-gray-700 space-y-8">
        {/* Guide Title & Bookmark */}
        <div className="flex items-start justify-between gap-4 border-b border-gray-100 dark:border-gray-700 pb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-primary/10 text-primary dark:bg-primary/30 dark:text-primary-light">
                {currentGuide.badge} • ⏱️ {currentGuide.estimatedTime}
              </span>
            </div>
            <h3 className="text-xl md:text-2xl font-heading font-bold text-gray-900 dark:text-white">
              {currentGuide.title}
            </h3>
            <p className="text-xs md:text-sm text-gray-500 mt-1">
              {currentGuide.subtitle}
            </p>
          </div>

          {onBookmark && (
            <button
              onClick={() =>
                onBookmark({
                  id: currentGuide.id,
                  type: "guide",
                  title: currentGuide.title,
                  category: currentGuide.badge,
                  tabTarget: "ferramentas",
                  savedAt: Date.now(),
                })
              }
              className={`p-2 rounded-full transition ${
                bookmarked ? "text-amber-500 bg-amber-50" : "text-gray-400 hover:text-amber-500"
              }`}
              aria-label={bookmarked ? "Remover dos favoritos" : "Guardar nos favoritos"}
            >
              {bookmarked ? "★" : "☆"}
            </button>
          )}
        </div>

        {/* Steps Progress Dots */}
        <div className="flex items-center justify-between gap-1 overflow-x-auto pb-2">
          {currentGuide.steps.map((s, idx) => (
            <button
              key={s.number}
              onClick={() => setActiveStepIndex(idx)}
              className={`flex-1 min-w-[32px] py-2 rounded-xl text-xs font-bold transition flex flex-col items-center gap-1 ${
                activeStepIndex === idx
                  ? "bg-primary text-white shadow-sm"
                  : idx < activeStepIndex
                  ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-500"
              }`}
            >
              <span>{s.number}</span>
            </button>
          ))}
        </div>

        {/* Active Step Showcase */}
        <div className="bg-gray-50 dark:bg-gray-700/30 p-6 md:p-8 rounded-3xl border border-gray-100 dark:border-gray-700 space-y-6">
          <div className="flex items-center gap-3">
            <span className="text-4xl p-3 bg-white dark:bg-gray-800 rounded-2xl shadow-sm">
              {currentStep.icon}
            </span>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-primary dark:text-primary-light">
                Passo {currentStep.number} de {currentGuide.steps.length}
              </span>
              <h4 className="text-lg md:text-xl font-heading font-bold text-gray-900 dark:text-white">
                {currentStep.title}
              </h4>
            </div>
          </div>

          <p className="text-sm md:text-base text-gray-700 dark:text-gray-200 leading-relaxed">
            {currentStep.instruction}
          </p>

          {currentStep.tip && (
            <div className="bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 p-4 rounded-2xl flex items-start gap-2.5 text-xs md:text-sm text-emerald-950 dark:text-emerald-200">
              <span className="text-base">💡</span>
              <div>
                <span className="font-bold block mb-0.5">Dica Importante:</span>
                {currentStep.tip}
              </div>
            </div>
          )}

          {currentStep.warning && (
            <div className="bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 p-4 rounded-2xl flex items-start gap-2.5 text-xs md:text-sm text-rose-950 dark:text-rose-200">
              <span className="text-base">⚠️</span>
              <div>
                <span className="font-bold block mb-0.5">Atenção:</span>
                {currentStep.warning}
              </div>
            </div>
          )}
        </div>

        {/* Step Navigation Controls */}
        <div className="flex items-center justify-between gap-4 pt-2">
          <button
            onClick={() => setActiveStepIndex((prev) => Math.max(0, prev - 1))}
            disabled={activeStepIndex === 0}
            className="px-5 py-2.5 rounded-full border border-gray-200 dark:border-gray-600 text-xs md:text-sm font-semibold disabled:opacity-40 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
          >
            ← Passo Anterior
          </button>

          <span className="text-xs text-gray-400 font-medium">
            {activeStepIndex + 1} / {currentGuide.steps.length}
          </span>

          <button
            onClick={() =>
              setActiveStepIndex((prev) =>
                Math.min(currentGuide.steps.length - 1, prev + 1)
              )
            }
            disabled={activeStepIndex === currentGuide.steps.length - 1}
            className="btn-primary text-xs md:text-sm py-2.5 px-6 shadow-sm"
          >
            Próximo Passo →
          </button>
        </div>

        {/* Common Mistakes Section */}
        {currentGuide.commonMistakes.length > 0 && (
          <div className="bg-amber-50/70 dark:bg-amber-950/20 p-5 rounded-2xl border border-amber-200/60 dark:border-amber-800/40">
            <h5 className="text-xs font-bold text-amber-900 dark:text-amber-300 uppercase tracking-wider mb-2">
              🚫 Erros mais comuns a evitar:
            </h5>
            <ul className="space-y-1 text-xs text-amber-950 dark:text-amber-200">
              {currentGuide.commonMistakes.map((err, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span>•</span>
                  <span>{err}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
