"use client";

import { useState, useEffect } from "react";
import { helplinesData, legalRightsData, Helpline, LegalRight } from "@/data/content-rights-helplines";
import { Audience, BookmarkItem } from "@/types";
import { useI18n } from "@/i18n";
import DoubtsTab from "@/components/DoubtsTab";
import { useDoubts } from "@/contexts/DoubtsContext";

interface RightsTabProps {
  audience?: Audience;
  initialSection?: "helplines" | "rights" | "duvidas";
  onBookmark?: (item: BookmarkItem) => void;
  isBookmarked?: (id: string) => boolean;
}

export default function RightsTab({
  audience = "jovens",
  initialSection = "helplines",
  onBookmark,
  isBookmarked = () => false,
}: RightsTabProps) {
  const { t } = useI18n();
  const doubtsCtx = useDoubts();
  const [activeSection, setActiveSection] = useState<"helplines" | "rights" | "duvidas">(initialSection);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (initialSection) {
      setActiveSection(initialSection);
    }
  }, [initialSection]);

  const filteredHelplines = helplinesData.filter((h) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      h.name.toLowerCase().includes(q) ||
      h.entity.toLowerCase().includes(q) ||
      h.description.toLowerCase().includes(q) ||
      h.phone.includes(q)
    );
  });

  const filteredRights = legalRightsData.filter((r) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      r.title.toLowerCase().includes(q) ||
      r.summary.toLowerCase().includes(q) ||
      r.practicalApplication.toLowerCase().includes(q) ||
      r.legalBasis.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-8 animate-fadeIn max-w-5xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-bold uppercase tracking-widest text-primary dark:text-primary-light px-3 py-1 bg-primary/10 rounded-full">
          Apoio Oficial & Legislação Portuguesa
        </span>
        <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 dark:text-white">
          {t.tabRights} & Apoio Confidencial
        </h2>
        <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base">
          {t.tabRightsDesc}
        </p>
      </div>

      {/* Emergency Highlights Banner */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-gradient-to-r from-red-600 to-rose-700 text-white p-6 rounded-3xl shadow-md flex items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider bg-white/20 px-2.5 py-0.5 rounded-full inline-block">
              Emergência Nacional
            </span>
            <h3 className="text-2xl font-heading font-bold">112</h3>
            <p className="text-xs text-white/90">
              {t.emergencyNotice}
            </p>
          </div>
          <a
            href="tel:112"
            className="bg-white text-red-700 font-bold px-6 py-3 rounded-full hover:bg-gray-100 transition shadow-lg shrink-0 text-sm"
          >
            Ligar 112 📞
          </a>
        </div>

        <div className="bg-gradient-to-r from-blue-700 to-teal-700 text-white p-6 rounded-3xl shadow-md flex items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider bg-white/20 px-2.5 py-0.5 rounded-full inline-block">
              Saúde & Triagem 24/7
            </span>
            <h3 className="text-2xl font-heading font-bold">SNS 24 — 808 24 24 24</h3>
            <p className="text-xs text-white/90">
              Apoio clínico, psicológico e encaminhamento para consultas de urgência.
            </p>
          </div>
          <a
            href="tel:808242424"
            className="bg-white text-blue-800 font-bold px-6 py-3 rounded-full hover:bg-gray-100 transition shadow-lg shrink-0 text-sm"
          >
            Ligar SNS 24 📞
          </a>
        </div>
      </div>

      {/* Section Switcher */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-white dark:bg-gray-800 p-3.5 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-sm">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setActiveSection("helplines")}
            className={`px-4 py-2.5 rounded-2xl text-xs md:text-sm font-bold transition flex items-center gap-2 ${
              activeSection === "helplines"
                ? "bg-primary text-white shadow-sm"
                : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
            }`}
          >
            <span>📞</span>
            <span>Linhas de Apoio ({helplinesData.length})</span>
          </button>

          <button
            onClick={() => setActiveSection("rights")}
            className={`px-4 py-2.5 rounded-2xl text-xs md:text-sm font-bold transition flex items-center gap-2 ${
              activeSection === "rights"
                ? "bg-primary text-white shadow-sm"
                : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
            }`}
          >
            <span>⚖️</span>
            <span>Direitos no SNS ({legalRightsData.length})</span>
          </button>

          <button
            onClick={() => setActiveSection("duvidas")}
            className={`px-4 py-2.5 rounded-2xl text-xs md:text-sm font-bold transition flex items-center gap-2 ${
              activeSection === "duvidas"
                ? "bg-primary text-white shadow-sm"
                : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
            }`}
          >
            <span>💬</span>
            <span>{t.askQuestion}</span>
          </button>
        </div>

        {activeSection !== "duvidas" && (
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Pesquisar contacto ou direito..."
              className="w-full sm:w-60 pl-9 pr-4 py-2 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-xs md:text-sm text-gray-800 dark:text-gray-100"
            />
            <span className="absolute left-3 top-2.5 text-gray-400 text-xs">🔍</span>
          </div>
        )}
      </div>

      {/* Helplines Grid */}
      {activeSection === "helplines" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredHelplines.map((item) => {
            const bookmarked = isBookmarked(item.id);

            return (
              <div
                key={item.id}
                className="bg-white dark:bg-gray-800 rounded-3xl p-6 border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition flex flex-col justify-between space-y-4"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-primary/10 text-primary dark:bg-primary/30 dark:text-primary-light">
                        {item.badge}
                      </span>
                      <h3 className="text-lg font-heading font-bold text-gray-900 dark:text-white mt-1">
                        {item.name}
                      </h3>
                      <p className="text-xs text-gray-400">{item.entity}</p>
                    </div>

                    {onBookmark && (
                      <button
                        onClick={() =>
                          onBookmark({
                            id: item.id,
                            type: "right",
                            title: item.name,
                            category: item.badge,
                            tabTarget: "direitos",
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

                  <p className="text-xs md:text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                    {item.description}
                  </p>

                  <div className="space-y-1.5 text-xs text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-700/40 p-3 rounded-2xl border border-gray-100 dark:border-gray-700">
                    <div className="flex items-center gap-2">
                      <span>⏰</span>
                      <span>{item.hours}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>💳</span>
                      <span>{item.cost}</span>
                      {item.isAnonymous && <span className="font-bold text-emerald-600 dark:text-emerald-400">• 100% Anónimo</span>}
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between gap-3">
                  <div className="font-heading font-bold text-lg text-primary dark:text-primary-light">
                    {item.phone}
                  </div>

                  <a
                    href={`tel:${item.rawPhone}`}
                    className="btn-primary text-xs py-2 px-5 shadow-sm flex items-center gap-1.5"
                  >
                    <span>Ligar</span>
                    <span>📞</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Legal Rights Guide */}
      {activeSection === "rights" && (
        <div className="space-y-6">
          <div className="bg-primary/5 dark:bg-primary/20 border border-primary/20 p-6 rounded-3xl">
            <h3 className="text-lg font-heading font-bold text-primary dark:text-primary-light mb-1">
              {t.freeInSns}
            </h3>
            <p className="text-xs md:text-sm text-gray-600 dark:text-gray-300">
              Conhece a legislação que protege a tua saúde, privacidade e integridade física em Portugal.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {filteredRights.map((right) => {
              const bookmarked = isBookmarked(right.id);

              return (
                <div
                  key={right.id}
                  className="bg-white dark:bg-gray-800 rounded-3xl p-6 md:p-8 border border-gray-100 dark:border-gray-700 shadow-sm space-y-4"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-secondary/30 text-gray-900 dark:text-secondary">
                        {right.legalBasis}
                      </span>
                      <h4 className="text-xl font-heading font-bold text-gray-900 dark:text-white mt-1.5">
                        {right.title}
                      </h4>
                    </div>

                    {onBookmark && (
                      <button
                        onClick={() =>
                          onBookmark({
                            id: right.id,
                            type: "right",
                            title: right.title,
                            category: right.legalBasis,
                            tabTarget: "direitos",
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

                  <p className="text-sm font-semibold text-gray-800 dark:text-gray-200 leading-relaxed">
                    {right.summary}
                  </p>

                  <div className="bg-emerald-50 dark:bg-emerald-950/40 p-4 rounded-2xl border border-emerald-100 dark:border-emerald-900/40 text-xs md:text-sm text-emerald-950 dark:text-emerald-200">
                    <span className="font-bold block mb-1">🛠️ Como aplicar na prática:</span>
                    {right.practicalApplication}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Doubts and Anonymous Questions Form */}
      {activeSection === "duvidas" && (
        <DoubtsTab
          audience={audience}
          submitted={doubtsCtx.submitted}
          setSubmitted={doubtsCtx.setSubmitted}
          questionForm={doubtsCtx.questionForm}
          setQuestionForm={doubtsCtx.setQuestionForm}
          isSending={doubtsCtx.isSending}
          setIsSending={doubtsCtx.setIsSending}
        />
      )}
    </div>
  );
}
