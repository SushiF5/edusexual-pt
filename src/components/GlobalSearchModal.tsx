"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { TabId } from "@/types";
import { topics, guides } from "@/data/content";
import { frequentlyAskedQuestions } from "@/data/content-faq";
import { contraceptiveMethods, ContraceptiveMethod } from "@/data/content-contraceptives";
import { mythsDatabase, MythItem } from "@/data/content-myths";
import { glossaryTerms, GlossaryTerm } from "@/data/content-glossary";
import { helplinesData, legalRightsData, Helpline, LegalRight } from "@/data/content-rights-helplines";
import { STIS_DATA, StiItem } from "@/data/content-stis";
import { CONSENT_FRIES, RELATIONSHIP_FLAGS } from "@/data/content-relationships-consent";

interface SearchResult {
  id: string;
  title: string;
  snippet: string;
  category: string;
  tabTarget: TabId;
  icon: string;
}

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateTab: (tab: TabId) => void;
}

export default function GlobalSearchModal({
  isOpen,
  onClose,
  onNavigateTab,
}: GlobalSearchModalProps) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery("");
    }
  }, [isOpen]);

  const searchIndex: SearchResult[] = useMemo(() => {
    const list: SearchResult[] = [];

    // Topics & Articles
    topics.forEach((t) => {
      list.push({
        id: `topic-${t.id}`,
        title: t.title,
        snippet: t.description,
        category: `Tópico (${t.audience})`,
        tabTarget: "home",
        icon: t.icon,
      });
      t.articles.forEach((a) => {
        list.push({
          id: `article-${a.id}`,
          title: a.title,
          snippet: a.content.slice(0, 140) + "...",
          category: `Artigo em ${t.title}`,
          tabTarget: "home",
          icon: "📄",
        });
      });
    });

    // Contraceptives
    contraceptiveMethods.forEach((c: ContraceptiveMethod) => {
      list.push({
        id: `contraceptive-${c.id}`,
        title: c.name,
        snippet: `Eficácia: ${c.typicalEfficacy}% (${c.duration}). ${c.howItWorks.slice(0, 100)}...`,
        category: `Método Contracetivo (${c.categoryLabel})`,
        tabTarget: "ferramentas",
        icon: c.icon,
      });
    });

    // Myths
    mythsDatabase.forEach((m: MythItem) => {
      list.push({
        id: `myth-${m.id}`,
        title: m.statement,
        snippet: `Explicação: ${m.explanation.slice(0, 120)}...`,
        category: `Mito ou Facto (${m.categoryLabel})`,
        tabTarget: "ferramentas",
        icon: "💡",
      });
    });

    // Glossary
    glossaryTerms.forEach((g: GlossaryTerm) => {
      list.push({
        id: `glossary-${g.id}`,
        title: g.term,
        snippet: g.definition.slice(0, 140) + "...",
        category: `Glossário (${g.category})`,
        tabTarget: "glossario",
        icon: "📖",
      });
    });

    // Helplines & Rights
    helplinesData.forEach((h: Helpline) => {
      list.push({
        id: `helpline-${h.id}`,
        title: `${h.name} (${h.phone})`,
        snippet: h.description,
        category: "Linha de Apoio",
        tabTarget: "direitos",
        icon: "📞",
      });
    });

    legalRightsData.forEach((r: LegalRight) => {
      list.push({
        id: `right-${r.id}`,
        title: r.title,
        snippet: r.summary,
        category: "Direito no SNS",
        tabTarget: "direitos",
        icon: "⚖️",
      });
    });

    // STIs
    STIS_DATA.forEach((s: StiItem) => {
      list.push({
        id: `sti-${s.id}`,
        title: s.name,
        snippet: `Transmissão: ${s.transmission} | Tratamento: ${s.treatment.slice(0, 100)}...`,
        category: "Guia de ISTs",
        tabTarget: "ferramentas",
        icon: "🩺",
      });
    });

    // Consent
    CONSENT_FRIES.forEach((f) => {
      list.push({
        id: `consent-${f.letter}`,
        title: `Consentimento: ${f.translation} (${f.word})`,
        snippet: f.explanation,
        category: "Consentimento & Relações",
        tabTarget: "ferramentas",
        icon: "🤝",
      });
    });

    RELATIONSHIP_FLAGS.forEach((fl) => {
      list.push({
        id: `flag-${fl.id}`,
        title: fl.title,
        snippet: fl.description,
        category: `Relações (${fl.type.toUpperCase()})`,
        tabTarget: "ferramentas",
        icon: fl.type === "green" ? "🟢" : fl.type === "yellow" ? "🟡" : "🔴",
      });
    });

    // Guides
    guides.forEach((g) => {
      list.push({
        id: `guide-${g.id}`,
        title: g.title,
        snippet: g.description,
        category: "Guia Temático",
        tabTarget: "recursos",
        icon: g.icon,
      });
    });

    // FAQs
    frequentlyAskedQuestions.forEach((f) => {
      list.push({
        id: `faq-${f.id}`,
        title: f.question,
        snippet: f.answer.slice(0, 130) + "...",
        category: "Perguntas Frequentes",
        tabTarget: "faq",
        icon: "❓",
      });
    });

    return list;
  }, []);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return searchIndex
      .filter((item) =>
        item.title.toLowerCase().includes(q) ||
        item.snippet.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q)
      )
      .slice(0, 15);
  }, [query, searchIndex]);

  if (!isOpen) return null;

  const handleSelect = (item: SearchResult) => {
    onNavigateTab(item.tabTarget);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[80] bg-black/60 backdrop-blur-md flex items-start justify-center p-4 pt-16 md:pt-24"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="bg-white dark:bg-gray-800 rounded-3xl max-w-2xl w-full p-6 shadow-2xl border border-gray-100 dark:border-gray-700 space-y-4 max-h-[80vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input */}
        <div className="relative flex items-center">
          <span className="absolute left-4 text-gray-400 text-lg">🔍</span>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Pesquisar métodos, sintomas de ISTs, mitos, termos, leis SNS..."
            className="w-full pl-12 pr-10 py-3.5 rounded-2xl bg-gray-50 dark:bg-gray-700/60 border border-gray-200 dark:border-gray-600 text-sm md:text-base outline-none focus:border-primary dark:focus:border-primary text-gray-900 dark:text-white"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="absolute right-4 text-gray-400 hover:text-gray-600 text-sm"
            >
              ✕
            </button>
          )}
        </div>

        {/* Results List */}
        <div className="overflow-y-auto flex-1 space-y-2 pr-1">
          {query.trim() === "" ? (
            <div className="text-center py-10 space-y-2 text-gray-400">
              <span className="text-3xl block">⚡</span>
              <p className="text-sm font-medium">Pesquisa Rápida Global</p>
              <p className="text-xs">
                Escreve para pesquisar em toda a base de conhecimento de educação sexual.
              </p>
              <div className="flex flex-wrap justify-center gap-1.5 pt-3">
                {["Pílula do dia seguinte", "Preservativo", "HPV", "Consentimento", "Linha SOS", "CAD"].map((sugg) => (
                  <button
                    key={sugg}
                    onClick={() => setQuery(sugg)}
                    className="text-xs px-2.5 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-primary/10 hover:text-primary transition"
                  >
                    {sugg}
                  </button>
                ))}
              </div>
            </div>
          ) : results.length === 0 ? (
            <div className="text-center py-10 text-gray-400 space-y-1">
              <span className="text-2xl block">🔍</span>
              <p className="text-sm">Nenhum resultado para &ldquo;{query}&rdquo;</p>
              <p className="text-xs">Tenta pesquisar por termos mais gerais.</p>
            </div>
          ) : (
            results.map((res) => (
              <button
                key={res.id}
                onClick={() => handleSelect(res)}
                className="w-full text-left p-3.5 rounded-2xl bg-gray-50 dark:bg-gray-700/40 hover:bg-primary/10 dark:hover:bg-primary/20 border border-gray-100 dark:border-gray-700 transition flex items-start gap-3 group"
              >
                <span className="text-2xl p-2 bg-white dark:bg-gray-800 rounded-xl shadow-xs shrink-0">
                  {res.icon}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-primary dark:text-primary-light">
                      {res.category}
                    </span>
                    <span className="text-[10px] text-gray-400 font-medium group-hover:text-primary transition">
                      Ir para {res.tabTarget} ➔
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-gray-900 dark:text-white group-hover:text-primary transition truncate">
                    {res.title}
                  </h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-1 mt-0.5">
                    {res.snippet}
                  </p>
                </div>
              </button>
            ))
          )}
        </div>

        {/* Footer shortcuts helper */}
        <div className="border-t border-gray-100 dark:border-gray-700 pt-3 flex items-center justify-between text-xs text-gray-400">
          <div className="flex items-center gap-2">
            <span>Atalho: <kbd className="bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded font-mono text-[10px]">ESC</kbd> para fechar</span>
          </div>
          <button
            onClick={onClose}
            className="text-primary font-bold hover:underline"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}
