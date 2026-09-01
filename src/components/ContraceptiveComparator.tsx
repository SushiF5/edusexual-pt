"use client";

import { useState } from "react";
import { contraceptiveMethods, ContraceptiveMethod } from "@/data/content-contraceptives";
import { BookmarkItem } from "@/types";

interface ContraceptiveComparatorProps {
  onBookmark?: (item: BookmarkItem) => void;
  isBookmarked?: (id: string) => boolean;
}

export default function ContraceptiveComparator({
  onBookmark,
  isBookmarked = () => false,
}: ContraceptiveComparatorProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [filterSTIOnly, setFilterSTIOnly] = useState(false);
  const [filterFreeInSNS, setFilterFreeInSNS] = useState(false);
  const [filterNoPrescription, setFilterNoPrescription] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [compareList, setCompareList] = useState<string[]>([]);
  const [modalMethod, setModalMethod] = useState<ContraceptiveMethod | null>(null);
  const [showComparisonModal, setShowComparisonModal] = useState(false);
  const [compareNotice, setCompareNotice] = useState<string | null>(null);

  const categories = [
    { id: "all", label: "Todos os Métodos" },
    { id: "barreira", label: "Barreira" },
    { id: "hormonal", label: "Hormonal" },
    { id: "intrauterino", label: "DIU / SIU" },
    { id: "emergencia", label: "Emergência" },
  ];

  const filteredMethods = contraceptiveMethods.filter((method) => {
    if (selectedCategory !== "all" && method.category !== selectedCategory) return false;
    if (filterSTIOnly && !method.protectsSTIs) return false;
    if (filterFreeInSNS && !method.freeInSNS) return false;
    if (filterNoPrescription && method.requiresPrescription) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        method.name.toLowerCase().includes(q) ||
        method.howItWorks.toLowerCase().includes(q) ||
        method.categoryLabel.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const toggleCompare = (id: string) => {
    if (compareList.includes(id)) {
      setCompareList(compareList.filter((mId) => mId !== id));
      setCompareNotice(null);
    } else {
      if (compareList.length >= 3) {
        setCompareNotice("Podes comparar no máximo 3 métodos em simultâneo.");
        setTimeout(() => setCompareNotice(null), 3500);
        return;
      }
      setCompareList([...compareList, id]);
    }
  };

  const comparedItems = contraceptiveMethods.filter((m) => compareList.includes(m.id));

  return (
    <div className="space-y-8">
      {/* Header Info */}
      <div className="bg-gradient-to-r from-primary/10 via-accent/10 to-secondary/10 dark:from-primary/20 dark:to-secondary/20 p-6 md:p-8 rounded-3xl border border-primary/20">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary text-white text-xs font-bold rounded-full mb-3 uppercase tracking-wider">
              <span>🩺 Baseado em Evidência Científica (DGS / OMS)</span>
            </div>
            <h3 className="text-2xl md:text-3xl font-heading font-bold text-primary dark:text-primary-light mb-2">
              Comparador Interativo de Métodos Contracetivos
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base max-w-3xl leading-relaxed">
              Compara taxas de eficácia típica vs. perfeita, proteção contra infeções (ISTs), custo e disponibilidade no Serviço Nacional de Saúde (SNS) em Portugal.
            </p>
          </div>

          {compareList.length > 0 && (
            <button
              onClick={() => setShowComparisonModal(true)}
              className="bg-secondary text-gray-900 font-bold px-6 py-3 rounded-full hover:shadow-lg transition-transform hover:scale-105 active:scale-95 flex items-center gap-2 shrink-0 self-start md:self-auto"
            >
              <span>⚖️ Comparar ({compareList.length})</span>
            </button>
          )}
        </div>
      </div>

      {/* Compare Limit Notice Banner */}
      {compareNotice && (
        <div className="bg-amber-50 dark:bg-amber-950/60 border border-amber-300 dark:border-amber-700 text-amber-900 dark:text-amber-200 px-4 py-3 rounded-2xl flex items-center justify-between text-sm animate-fadeIn">
          <div className="flex items-center gap-2">
            <span>⚠️</span>
            <span className="font-semibold">{compareNotice}</span>
          </div>
          <button
            onClick={() => setCompareNotice(null)}
            className="text-amber-700 dark:text-amber-300 hover:opacity-80 text-xs font-bold"
          >
            Fechar
          </button>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="bg-white dark:bg-gray-800 p-5 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 space-y-4">
        <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
          <div className="relative flex-1">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Pesquisar por método (ex: preservativo, pílula, implante)..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary text-sm"
            />
            <span className="absolute left-3.5 top-3 text-gray-400">🔍</span>
          </div>

          <div className="flex flex-wrap gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs md:text-sm font-semibold transition ${
                  selectedCategory === cat.id
                    ? "bg-primary text-white shadow-sm"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Quick Toggles */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-gray-100 dark:border-gray-700 text-xs md:text-sm">
          <span className="font-semibold text-gray-500 dark:text-gray-400">Filtros rápidos:</span>
          
          <button
            onClick={() => setFilterSTIOnly(!filterSTIOnly)}
            className={`px-3 py-1.5 rounded-lg border transition flex items-center gap-1.5 ${
              filterSTIOnly
                ? "bg-emerald-500 text-white border-emerald-600 font-bold"
                : "border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
            }`}
          >
            <span>🛡️ Protege contra ISTs</span>
            {filterSTIOnly && <span>✓</span>}
          </button>

          <button
            onClick={() => setFilterFreeInSNS(!filterFreeInSNS)}
            className={`px-3 py-1.5 rounded-lg border transition flex items-center gap-1.5 ${
              filterFreeInSNS
                ? "bg-blue-600 text-white border-blue-700 font-bold"
                : "border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
            }`}
          >
            <span>🏥 Gratuito no SNS</span>
            {filterFreeInSNS && <span>✓</span>}
          </button>

          <button
            onClick={() => setFilterNoPrescription(!filterNoPrescription)}
            className={`px-3 py-1.5 rounded-lg border transition flex items-center gap-1.5 ${
              filterNoPrescription
                ? "bg-amber-600 text-white border-amber-700 font-bold"
                : "border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
            }`}
          >
            <span>🛒 Sem Receita Médica</span>
            {filterNoPrescription && <span>✓</span>}
          </button>

          {(filterSTIOnly || filterFreeInSNS || filterNoPrescription || searchQuery || selectedCategory !== "all") && (
            <button
              onClick={() => {
                setSelectedCategory("all");
                setFilterSTIOnly(false);
                setFilterFreeInSNS(false);
                setFilterNoPrescription(false);
                setSearchQuery("");
              }}
              className="text-xs text-primary dark:text-primary-light underline ml-auto hover:opacity-80"
            >
              Limpar filtros
            </button>
          )}
        </div>
      </div>

      {/* Methods Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMethods.map((method) => {
          const isComparing = compareList.includes(method.id);
          const bookmarked = isBookmarked(method.id);

          return (
            <div
              key={method.id}
              className={`bg-white dark:bg-gray-800 rounded-3xl p-6 border transition flex flex-col justify-between hover:shadow-xl ${
                isComparing
                  ? "border-secondary ring-2 ring-secondary/50 shadow-md"
                  : "border-gray-100 dark:border-gray-700"
              }`}
            >
              <div>
                {/* Card Top */}
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl p-2.5 bg-gray-50 dark:bg-gray-700 rounded-2xl" role="img" aria-hidden="true">
                      {method.icon}
                    </span>
                    <div>
                      <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-primary/10 text-primary dark:bg-primary/30 dark:text-primary-light">
                        {method.categoryLabel}
                      </span>
                      <h4 className="text-lg font-heading font-bold text-gray-900 dark:text-white mt-1">
                        {method.name}
                      </h4>
                    </div>
                  </div>

                  {onBookmark && (
                    <button
                      onClick={() =>
                        onBookmark({
                          id: method.id,
                          type: "tool",
                          title: method.name,
                          category: method.categoryLabel,
                          tabTarget: "ferramentas",
                          savedAt: Date.now(),
                        })
                      }
                      className={`p-2 rounded-full transition ${
                        bookmarked
                          ? "text-amber-500 bg-amber-50 dark:bg-amber-950/40"
                          : "text-gray-400 hover:text-amber-500 hover:bg-gray-100 dark:hover:bg-gray-700"
                      }`}
                      aria-label={bookmarked ? "Remover dos favoritos" : "Guardar nos favoritos"}
                    >
                      {bookmarked ? "★" : "☆"}
                    </button>
                  )}
                </div>

                {/* Efficacy meter */}
                <div className="space-y-2 mb-5 bg-gray-50 dark:bg-gray-700/50 p-3.5 rounded-2xl">
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-500 dark:text-gray-400">Eficácia Real (Típica):</span>
                    <span className="font-bold text-gray-900 dark:text-white">{method.typicalEfficacy}%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2 overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        method.typicalEfficacy >= 95
                          ? "bg-emerald-500"
                          : method.typicalEfficacy >= 85
                          ? "bg-amber-500"
                          : "bg-blue-500"
                      }`}
                      style={{ width: `${method.typicalEfficacy}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-[11px] text-gray-400">
                    <span>Eficácia Perfeita:</span>
                    <span className="font-semibold text-gray-600 dark:text-gray-300">{method.perfectEfficacy}%</span>
                  </div>
                </div>

                {/* Key Badges */}
                <div className="flex flex-wrap gap-2 mb-4">
                  <span
                    className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold ${
                      method.protectsSTIs
                        ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300"
                        : "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400"
                    }`}
                  >
                    {method.protectsSTIs ? "✓ Protege contra ISTs" : "✗ Sem proteção IST"}
                  </span>

                  <span
                    className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold ${
                      method.freeInSNS
                        ? "bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300"
                        : "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300"
                    }`}
                  >
                    {method.freeInSNS ? "🏥 Gratuito no SNS" : "💊 Venda em Farmácia"}
                  </span>
                </div>

                <p className="text-gray-600 dark:text-gray-300 text-xs md:text-sm line-clamp-2 mb-4 leading-relaxed">
                  {method.howItWorks}
                </p>
              </div>

              {/* Bottom Actions */}
              <div className="pt-4 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between gap-2">
                <button
                  onClick={() => setModalMethod(method)}
                  className="text-primary dark:text-primary-light font-bold text-xs md:text-sm hover:underline flex items-center gap-1"
                >
                  <span>Ver Detalhes</span>
                  <span>→</span>
                </button>

                <button
                  onClick={() => toggleCompare(method.id)}
                  className={`text-xs px-3 py-1.5 rounded-full font-semibold transition ${
                    isComparing
                      ? "bg-secondary text-gray-900 font-bold"
                      : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200"
                  }`}
                >
                  {isComparing ? "✓ A Comparar" : "+ Comparar"}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {filteredMethods.length === 0 && (
        <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-3xl border border-gray-200 dark:border-gray-700 p-8">
          <div className="text-4xl mb-3">🔍</div>
          <h4 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-1">
            Nenhum método encontrado com os filtros selecionados
          </h4>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Tenta limpar ou alterar os teus filtros para ver mais opções.
          </p>
        </div>
      )}

      {/* Single Method Detail Modal */}
      {modalMethod && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
          onClick={() => setModalMethod(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="bg-white dark:bg-gray-800 rounded-3xl max-w-2xl w-full p-6 md:p-8 shadow-2xl border border-gray-100 dark:border-gray-700 space-y-6 my-8 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="text-4xl p-3 bg-gray-50 dark:bg-gray-700 rounded-2xl">
                  {modalMethod.icon}
                </span>
                <div>
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-primary/10 text-primary dark:bg-primary/30 dark:text-primary-light">
                    {modalMethod.categoryLabel}
                  </span>
                  <h3 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mt-1">
                    {modalMethod.name}
                  </h3>
                </div>
              </div>

              <button
                onClick={() => setModalMethod(null)}
                className="p-2 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-lg"
                aria-label="Fechar"
              >
                ✕
              </button>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-gray-50 dark:bg-gray-700/50 p-4 rounded-2xl text-center">
              <div>
                <span className="text-xs text-gray-400 block">Eficácia Real</span>
                <span className="text-lg font-bold text-emerald-600 dark:text-emerald-400">{modalMethod.typicalEfficacy}%</span>
              </div>
              <div>
                <span className="text-xs text-gray-400 block">Proteção IST</span>
                <span className="text-sm font-bold text-gray-800 dark:text-gray-200">{modalMethod.protectsSTIs ? "Sim (✓)" : "Não (✗)"}</span>
              </div>
              <div>
                <span className="text-xs text-gray-400 block">SNS (Portugal)</span>
                <span className="text-sm font-bold text-blue-600 dark:text-blue-400">{modalMethod.freeInSNS ? "Gratuito" : "Farmácia"}</span>
              </div>
              <div>
                <span className="text-xs text-gray-400 block">Duração</span>
                <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">{modalMethod.duration}</span>
              </div>
            </div>

            {/* How It Works */}
            <div>
              <h4 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-2">
                Como Funciona
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                {modalMethod.howItWorks}
              </p>
            </div>

            {/* Pros and Cons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-emerald-50 dark:bg-emerald-950/30 p-4 rounded-2xl border border-emerald-100 dark:border-emerald-900/40">
                <h5 className="text-xs font-bold text-emerald-800 dark:text-emerald-300 mb-2 uppercase">
                  Vantagens
                </h5>
                <ul className="space-y-1.5 text-xs text-emerald-950 dark:text-emerald-200">
                  {modalMethod.pros.map((p, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span>✓</span>
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-amber-50 dark:bg-amber-950/30 p-4 rounded-2xl border border-amber-100 dark:border-amber-900/40">
                <h5 className="text-xs font-bold text-amber-800 dark:text-amber-300 mb-2 uppercase">
                  Cuidados & Desvantagens
                </h5>
                <ul className="space-y-1.5 text-xs text-amber-950 dark:text-amber-200">
                  {modalMethod.cons.map((c, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span>•</span>
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* How to use */}
            <div>
              <h4 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-2">
                Instruções de Uso
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed bg-gray-50 dark:bg-gray-700/40 p-4 rounded-2xl border border-gray-100 dark:border-gray-700">
                {modalMethod.howToUse}
              </p>
            </div>

            {/* SNS Notes */}
            <div className="bg-primary/10 dark:bg-primary/20 p-4 rounded-2xl border border-primary/20">
              <h5 className="text-xs font-bold text-primary dark:text-primary-light mb-1 uppercase">
                Acesso no SNS em Portugal
              </h5>
              <p className="text-xs text-gray-700 dark:text-gray-300">
                {modalMethod.snsNotes}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Comparison Modal */}
      {showComparisonModal && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
          onClick={() => setShowComparisonModal(false)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="bg-white dark:bg-gray-800 rounded-3xl max-w-4xl w-full p-6 md:p-8 shadow-2xl border border-gray-100 dark:border-gray-700 space-y-6 my-8 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-heading font-bold text-primary dark:text-primary-light">
                  Comparação Lado a Lado
                </h3>
                <p className="text-xs md:text-sm text-gray-500">
                  Comparando {comparedItems.length} método(s) selecionado(s)
                </p>
              </div>

              <button
                onClick={() => setShowComparisonModal(false)}
                className="p-2 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-lg"
              >
                ✕
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs md:text-sm border-collapse">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="p-3 font-bold text-gray-400 uppercase tracking-wider w-1/4">Critério</th>
                    {comparedItems.map((item) => (
                      <th key={item.id} className="p-3 font-bold text-gray-900 dark:text-white">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">{item.icon}</span>
                          <div>
                            <div>{item.name}</div>
                            <span className="text-[10px] text-gray-400 font-normal">{item.categoryLabel}</span>
                          </div>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                  <tr>
                    <td className="p-3 font-semibold text-gray-600 dark:text-gray-300">Eficácia Real / Típica</td>
                    {comparedItems.map((item) => (
                      <td key={item.id} className="p-3 font-bold text-emerald-600 dark:text-emerald-400">
                        {item.typicalEfficacy}%
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-gray-600 dark:text-gray-300">Eficácia Perfeita</td>
                    {comparedItems.map((item) => (
                      <td key={item.id} className="p-3 text-gray-700 dark:text-gray-300">
                        {item.perfectEfficacy}%
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-gray-600 dark:text-gray-300">Proteção contra ISTs</td>
                    {comparedItems.map((item) => (
                      <td key={item.id} className="p-3">
                        <span className={`px-2 py-0.5 rounded font-semibold text-xs ${item.protectsSTIs ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300" : "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400"}`}>
                          {item.protectsSTIs ? "Sim (✓)" : "Não (✗)"}
                        </span>
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-gray-600 dark:text-gray-300">Gratuito no SNS</td>
                    {comparedItems.map((item) => (
                      <td key={item.id} className="p-3">
                        {item.freeInSNS ? "Sim (Centros de Saúde)" : "Não (Farmácia)"}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-gray-600 dark:text-gray-300">Duração / Frequência</td>
                    {comparedItems.map((item) => (
                      <td key={item.id} className="p-3 text-gray-600 dark:text-gray-300">
                        {item.duration}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-gray-600 dark:text-gray-300">Como atua</td>
                    {comparedItems.map((item) => (
                      <td key={item.id} className="p-3 text-gray-600 dark:text-gray-300 leading-relaxed text-xs">
                        {item.howItWorks}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-gray-100 dark:border-gray-700">
              <button
                onClick={() => setCompareList([])}
                className="px-4 py-2 text-xs font-semibold text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
              >
                Limpar seleção
              </button>
              <button
                onClick={() => setShowComparisonModal(false)}
                className="btn-primary text-xs py-2 px-6"
              >
                Fechar Comparação
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
