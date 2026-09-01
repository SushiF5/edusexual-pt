"use client";

import { useState } from "react";
import {
  CONSENT_FRIES,
  RELATIONSHIP_FLAGS,
  COMMUNICATION_SCRIPTS,
  FlagItem,
} from "@/data/content-relationships-consent";
import { BookmarkItem } from "@/types";

interface RelationshipsConsentToolProps {
  onBookmark?: (item: BookmarkItem) => void;
  isBookmarked?: (id: string) => boolean;
}

export default function RelationshipsConsentTool({
  onBookmark,
  isBookmarked = () => false,
}: RelationshipsConsentToolProps) {
  const [activeTab, setActiveTab] = useState<"fries" | "flags" | "scripts">("fries");
  const [selectedFlagFilter, setSelectedFlagFilter] = useState<"all" | "green" | "yellow" | "red">("all");
  const [selectedScriptCat, setSelectedScriptCat] = useState<string>("all");

  const filteredFlags = RELATIONSHIP_FLAGS.filter((f) =>
    selectedFlagFilter === "all" ? true : f.type === selectedFlagFilter
  );

  const filteredScripts = COMMUNICATION_SCRIPTS.filter((s) =>
    selectedScriptCat === "all" ? true : s.category === selectedScriptCat
  );

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Sub-navigation */}
      <div className="flex flex-wrap items-center justify-center gap-2 border-b border-gray-100 dark:border-gray-700 pb-4">
        <button
          onClick={() => setActiveTab("fries")}
          className={`px-5 py-2.5 rounded-full font-bold text-xs md:text-sm transition flex items-center gap-2 ${
            activeTab === "fries"
              ? "bg-primary text-white shadow-md"
              : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200"
          }`}
        >
          <span>🍟</span>
          <span>Modelo FRIES de Consentimento</span>
        </button>

        <button
          onClick={() => setActiveTab("flags")}
          className={`px-5 py-2.5 rounded-full font-bold text-xs md:text-sm transition flex items-center gap-2 ${
            activeTab === "flags"
              ? "bg-primary text-white shadow-md"
              : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200"
          }`}
        >
          <span>🚩</span>
          <span>Sinais Verdes vs Sinais de Alerta</span>
        </button>

        <button
          onClick={() => setActiveTab("scripts")}
          className={`px-5 py-2.5 rounded-full font-bold text-xs md:text-sm transition flex items-center gap-2 ${
            activeTab === "scripts"
              ? "bg-primary text-white shadow-md"
              : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200"
          }`}
        >
          <span>💬</span>
          <span>Scripts de Comunicação Real</span>
        </button>
      </div>

      {/* VIEW 1: FRIES Model */}
      {activeTab === "fries" && (
        <div className="space-y-6">
          <div className="bg-primary/5 dark:bg-primary/10 p-6 rounded-3xl border border-primary/20 text-center max-w-2xl mx-auto space-y-2">
            <h3 className="text-xl font-heading font-bold text-primary dark:text-primary-light">
              O que é o Modelo FRIES?
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
              O acrónimo internacional <strong>F.R.I.E.S.</strong> define as cinco características indispensáveis para que qualquer ato de intimidade seja verdadeiramente consentido, seguro e saudável.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {CONSENT_FRIES.map((item) => (
              <div
                key={item.letter}
                className="bg-white dark:bg-gray-800 p-6 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-sm flex flex-col justify-between space-y-4 hover:border-primary/40 transition"
              >
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="w-10 h-10 rounded-2xl bg-primary text-white font-heading font-bold text-xl flex items-center justify-center shadow-md">
                      {item.letter}
                    </span>
                    <div>
                      <h4 className="font-heading font-bold text-gray-900 dark:text-white text-base">
                        {item.translation}
                      </h4>
                      <span className="text-[11px] font-medium text-gray-400">
                        {item.word}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs md:text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-3">
                    {item.explanation}
                  </p>

                  <div className="bg-gray-50 dark:bg-gray-700/40 p-3.5 rounded-2xl text-xs space-y-1.5 border border-gray-100 dark:border-gray-700">
                    <span className="font-bold text-primary dark:text-primary-light block">
                      Exemplo Prático:
                    </span>
                    <p className="text-gray-700 dark:text-gray-300 italic">
                      &ldquo;{item.practicalExample}&rdquo;
                    </p>
                  </div>
                </div>

                <div className="border-t border-gray-100 dark:border-gray-700 pt-3 space-y-1.5">
                  <div className="text-[11px] text-red-600 dark:text-red-400">
                    <span className="font-bold">Mito:</span> {item.mythVsFact.myth}
                  </div>
                  <div className="text-[11px] text-green-600 dark:text-green-400">
                    <span className="font-bold">Facto:</span> {item.mythVsFact.fact}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* VIEW 2: Green / Yellow / Red Flags */}
      {activeTab === "flags" && (
        <div className="space-y-6">
          {/* Flag filter bar */}
          <div className="flex items-center justify-center gap-2">
            <button
              onClick={() => setSelectedFlagFilter("all")}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition ${
                selectedFlagFilter === "all"
                  ? "bg-gray-900 text-white dark:bg-white dark:text-gray-900"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300"
              }`}
            >
              Todos ({RELATIONSHIP_FLAGS.length})
            </button>
            <button
              onClick={() => setSelectedFlagFilter("green")}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition flex items-center gap-1 ${
                selectedFlagFilter === "green"
                  ? "bg-emerald-600 text-white"
                  : "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800"
              }`}
            >
              <span>🟢</span> Sinais Verdes
            </button>
            <button
              onClick={() => setSelectedFlagFilter("yellow")}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition flex items-center gap-1 ${
                selectedFlagFilter === "yellow"
                  ? "bg-amber-500 text-white"
                  : "bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800"
              }`}
            >
              <span>🟡</span> Atenção
            </button>
            <button
              onClick={() => setSelectedFlagFilter("red")}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition flex items-center gap-1 ${
                selectedFlagFilter === "red"
                  ? "bg-rose-600 text-white"
                  : "bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800"
              }`}
            >
              <span>🔴</span> Sinais de Alerta
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {filteredFlags.map((flag) => {
              const flagBadge =
                flag.type === "green"
                  ? { color: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300", icon: "🟢", label: "Sinal Verde (Saudável)" }
                  : flag.type === "yellow"
                  ? { color: "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300", icon: "🟡", label: "Atenção (Conversar)" }
                  : { color: "bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-300", icon: "🔴", label: "Sinal de Alerta (Tóxico/Abusivo)" };

              return (
                <div
                  key={flag.id}
                  className="bg-white dark:bg-gray-800 p-5 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-sm space-y-3 flex flex-col justify-between hover:shadow-md transition"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${flagBadge.color}`}>
                        {flagBadge.icon} {flagBadge.label}
                      </span>
                      <span className="text-[10px] uppercase font-bold text-gray-400">
                        {flag.category}
                      </span>
                    </div>

                    <h4 className="text-base font-heading font-bold text-gray-900 dark:text-white">
                      {flag.title}
                    </h4>

                    <p className="text-xs md:text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                      {flag.description}
                    </p>

                    <div className="bg-gray-50 dark:bg-gray-700/40 p-3 rounded-2xl text-xs space-y-1">
                      <span className="font-bold text-gray-500 dark:text-gray-400 block">
                        Como se manifesta:
                      </span>
                      <p className="text-gray-800 dark:text-gray-200 italic">
                        {flag.example}
                      </p>
                    </div>
                  </div>

                  <div className="bg-primary/5 dark:bg-primary/10 p-3 rounded-2xl text-xs text-gray-700 dark:text-gray-300">
                    <span className="font-bold text-primary dark:text-primary-light block mb-0.5">
                      💡 O que fazer / Conselho:
                    </span>
                    {flag.advice}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* VIEW 3: Communication Scripts */}
      {activeTab === "scripts" && (
        <div className="space-y-6 max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-secondary/10 to-primary/10 p-6 rounded-3xl border border-secondary/20 text-center space-y-2">
            <h3 className="text-xl font-heading font-bold text-gray-900 dark:text-white">
              Como Dizer Sem Hesitar
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Exemplos de frases reais e assertivas para colocares limites com calma, confiança e segurança.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2">
            {["all", "limites", "contracepcao", "digital"].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedScriptCat(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase transition ${
                  selectedScriptCat === cat
                    ? "bg-primary text-white"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-500 hover:bg-gray-200"
                }`}
              >
                {cat === "all" ? "Todos os Cenários" : cat}
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {filteredScripts.map((script) => (
              <div
                key={script.id}
                className="bg-white dark:bg-gray-800 p-6 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-sm space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-secondary px-2.5 py-0.5 bg-secondary/10 rounded-full">
                    Cenário: {script.category}
                  </span>
                  <h4 className="font-heading font-bold text-gray-900 dark:text-white text-base">
                    {script.scenario}
                  </h4>
                  <div className="bg-primary/5 dark:bg-primary/15 p-4 rounded-2xl border border-primary/20 text-sm font-medium text-gray-900 dark:text-white leading-relaxed">
                    💬 {script.whatToSay}
                  </div>
                </div>

                <p className="text-xs text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-700/40 p-3 rounded-xl">
                  <strong>Por que funciona:</strong> {script.whyItWorks}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
