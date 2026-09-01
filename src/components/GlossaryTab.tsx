"use client";

import { useState, useMemo } from "react";
import { glossaryTerms, GlossaryTerm } from "@/data/content-glossary";
import { BookmarkItem } from "@/types";
import { useI18n } from "@/i18n";

interface GlossaryTabProps {
  onBookmark?: (item: BookmarkItem) => void;
  isBookmarked?: (id: string) => boolean;
}

export default function GlossaryTab({
  onBookmark,
  isBookmarked = () => false,
}: GlossaryTabProps) {
  const { t } = useI18n();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedLetter, setSelectedLetter] = useState<string>("all");

  const categories = [
    { id: "all", label: "Todos os Termos" },
    { id: "anatomia", label: "Anatomia" },
    { id: "saude", label: "Saúde & Prevenção" },
    { id: "identidade", label: "Identidade & Género" },
    { id: "direitos", label: "Direitos & SNS" },
    { id: "relacoes", label: "Relações & Consentimento" },
  ];

  // Available first letters
  const availableLetters = useMemo(() => {
    const letters = new Set<string>();
    glossaryTerms.forEach((item) => {
      letters.add(item.term.charAt(0).toUpperCase());
    });
    return Array.from(letters).sort();
  }, []);

  const filteredTerms = useMemo(() => {
    return glossaryTerms.filter((item) => {
      if (selectedCategory !== "all" && item.category !== selectedCategory) return false;
      if (
        selectedLetter !== "all" &&
        item.term.charAt(0).toUpperCase() !== selectedLetter
      )
        return false;

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const inTerm = item.term.toLowerCase().includes(q);
        const inDef = item.definition.toLowerCase().includes(q);
        const inContext = item.detailedContext.toLowerCase().includes(q);
        const inTags = item.tags.some((tag) => tag.toLowerCase().includes(q));
        return inTerm || inDef || inContext || inTags;
      }
      return true;
    });
  }, [selectedCategory, selectedLetter, searchQuery]);

  return (
    <div className="space-y-8 animate-fadeIn max-w-5xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-bold uppercase tracking-widest text-primary dark:text-primary-light px-3 py-1 bg-primary/10 rounded-full">
          Dicionário Descomplicado
        </span>
        <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 dark:text-white">
          {t.glossaryTitle}
        </h2>
        <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base">
          {t.glossarySubtitle}
        </p>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 space-y-4">
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t.searchGlossary}
            className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary text-sm md:text-base"
          />
          <span className="absolute left-4 top-3.5 text-gray-400 text-lg">🔍</span>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-4 top-3.5 text-gray-400 hover:text-gray-600 text-sm font-bold"
            >
              ✕
            </button>
          )}
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-2 pt-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setSelectedCategory(cat.id);
                setSelectedLetter("all");
              }}
              className={`px-4 py-2 rounded-xl text-xs md:text-sm font-semibold transition ${
                selectedCategory === cat.id
                  ? "bg-primary text-white shadow-sm font-bold"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Letter Jump */}
        <div className="flex flex-wrap items-center gap-1.5 pt-3 border-t border-gray-100 dark:border-gray-700">
          <button
            onClick={() => setSelectedLetter("all")}
            className={`px-2.5 py-1 rounded-lg text-xs font-bold transition ${
              selectedLetter === "all"
                ? "bg-secondary text-gray-900"
                : "text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700"
            }`}
          >
            Todos
          </button>
          {availableLetters.map((letter) => (
            <button
              key={letter}
              onClick={() => setSelectedLetter(letter)}
              className={`w-7 h-7 rounded-lg text-xs font-bold transition flex items-center justify-center ${
                selectedLetter === letter
                  ? "bg-secondary text-gray-900 shadow-sm"
                  : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
            >
              {letter}
            </button>
          ))}
        </div>
      </div>

      {/* Glossary Items List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredTerms.map((item) => {
          const bookmarked = isBookmarked(item.id);

          return (
            <div
              key={item.id}
              className="bg-white dark:bg-gray-800 rounded-3xl p-6 border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition space-y-4 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-primary/10 text-primary dark:bg-primary/30 dark:text-primary-light">
                      {item.categoryLabel}
                    </span>
                    <h3 className="text-xl font-heading font-bold text-gray-900 dark:text-white mt-1.5">
                      {item.term}
                    </h3>
                  </div>

                  {onBookmark && (
                    <button
                      onClick={() =>
                        onBookmark({
                          id: item.id,
                          type: "glossary",
                          title: item.term,
                          category: item.categoryLabel,
                          tabTarget: "glossario",
                          savedAt: Date.now(),
                        })
                      }
                      className={`p-2 rounded-full transition ${
                        bookmarked
                          ? "text-amber-500 bg-amber-50 dark:bg-amber-950/30"
                          : "text-gray-400 hover:text-amber-500 hover:bg-gray-100 dark:hover:bg-gray-700"
                      }`}
                      aria-label={bookmarked ? "Remover dos favoritos" : "Guardar nos favoritos"}
                    >
                      {bookmarked ? "★" : "☆"}
                    </button>
                  )}
                </div>

                <p className="text-sm font-semibold text-gray-800 dark:text-gray-200 leading-relaxed mb-3">
                  {item.definition}
                </p>

                <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed bg-gray-50 dark:bg-gray-700/30 p-3.5 rounded-2xl">
                  {item.detailedContext}
                </p>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 pt-2 border-t border-gray-50 dark:border-gray-700/50">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    onClick={() => setSearchQuery(tag)}
                    className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 cursor-pointer hover:bg-primary/10 hover:text-primary transition"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {filteredTerms.length === 0 && (
        <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-3xl border border-gray-200 dark:border-gray-700 p-8">
          <div className="text-4xl mb-3">📖</div>
          <h4 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-1">
            Nenhum termo encontrado
          </h4>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Tenta pesquisar por outra palavra ou remover os filtros de categoria.
          </p>
        </div>
      )}
    </div>
  );
}
