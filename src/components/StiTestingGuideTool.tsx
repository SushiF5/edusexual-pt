"use client";

import { useState } from "react";
import { STIS_DATA, TESTING_CENTRES_PORTUGAL, StiItem } from "@/data/content-stis";
import { BookmarkItem } from "@/types";

interface StiTestingGuideToolProps {
  onBookmark?: (item: BookmarkItem) => void;
  isBookmarked?: (id: string) => boolean;
}

export default function StiTestingGuideTool({
  onBookmark,
  isBookmarked = () => false,
}: StiTestingGuideToolProps) {
  const [selectedSti, setSelectedSti] = useState<StiItem | null>(STIS_DATA[0]);
  const [daysSinceExposure, setDaysSinceExposure] = useState<number>(14);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRegion, setSelectedRegion] = useState<string>("all");

  const filteredCentres = TESTING_CENTRES_PORTUGAL.filter((c) => {
    const matchesRegion = selectedRegion === "all" ? true : c.region === selectedRegion;
    const matchesSearch =
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.features.some((f) => f.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesRegion && matchesSearch;
  });

  return (
    <div className="space-y-10 animate-fadeIn">
      {/* PEP Urgent Warning Alert */}
      <div className="bg-rose-50 dark:bg-rose-950/40 border-2 border-rose-300 dark:border-rose-800 p-5 md:p-6 rounded-3xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-sm">
        <div className="flex items-start gap-3">
          <span className="text-3xl p-2 bg-rose-100 dark:bg-rose-900 rounded-2xl">🚨</span>
          <div>
            <h4 className="text-base md:text-lg font-heading font-bold text-rose-900 dark:text-rose-200">
              Exposição de Risco Recente (Menos de 72 Horas)?
            </h4>
            <p className="text-xs md:text-sm text-rose-700 dark:text-rose-300 mt-1 leading-relaxed">
              Existe a <strong>PEP (Profilaxia Pós-Exposição)</strong> para o VIH. É um tratamento com comprimidos que deve ser iniciado no prazo máximo de <strong>72 horas</strong> após o contacto para evitar a infeção.
            </p>
          </div>
        </div>
        <a
          href="tel:808242424"
          className="btn-primary bg-rose-600 hover:bg-rose-700 text-white shrink-0 text-xs md:text-sm py-2.5 px-5 shadow-lg"
        >
          📞 Ligar SNS 24 (808 24 24 24)
        </a>
      </div>

      {/* Main Section: STI Directory + Window Period */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left: STI List */}
        <div className="lg:col-span-1 space-y-2">
          <h3 className="font-heading font-bold text-gray-900 dark:text-white text-base px-2 mb-2">
            Infeções Sexualmente Transmissíveis (ISTs)
          </h3>
          <div className="space-y-1.5 max-h-[500px] overflow-y-auto pr-1">
            {STIS_DATA.map((sti) => {
              const isSelected = selectedSti?.id === sti.id;
              return (
                <button
                  key={sti.id}
                  onClick={() => setSelectedSti(sti)}
                  className={`w-full text-left p-3.5 rounded-2xl border transition flex items-center justify-between ${
                    isSelected
                      ? "bg-primary text-white border-primary shadow-md font-bold"
                      : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50"
                  }`}
                >
                  <div>
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full inline-block mb-1 ${
                        isSelected
                          ? "bg-white/20 text-white"
                          : "bg-primary/10 text-primary dark:bg-primary/30 dark:text-primary-light"
                      }`}
                    >
                      {sti.type}
                    </span>
                    <h4 className="text-xs md:text-sm font-bold leading-snug">
                      {sti.name}
                    </h4>
                  </div>
                  <span className="text-lg opacity-70">➔</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right: Selected STI Details */}
        <div className="lg:col-span-2">
          {selectedSti && (
            <div className="bg-white dark:bg-gray-800 p-6 md:p-8 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-sm space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gray-100 dark:border-gray-700 pb-4">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-secondary px-2.5 py-0.5 bg-secondary/10 rounded-full">
                    {selectedSti.type}
                  </span>
                  <h3 className="text-xl md:text-2xl font-heading font-bold text-gray-900 dark:text-white mt-1">
                    {selectedSti.name}
                  </h3>
                </div>

                {onBookmark && (
                  <button
                    onClick={() =>
                      onBookmark({
                        id: `sti-${selectedSti.id}`,
                        type: "tool",
                        title: selectedSti.name,
                        category: "Guia de ISTs",
                        tabTarget: "ferramentas",
                        savedAt: Date.now(),
                      })
                    }
                    className={`p-2.5 rounded-xl border text-xs font-bold transition flex items-center gap-1.5 ${
                      isBookmarked(`sti-${selectedSti.id}`)
                        ? "bg-amber-500 text-white border-amber-500 shadow-sm"
                        : "border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-amber-50"
                    }`}
                  >
                    <span>{isBookmarked(`sti-${selectedSti.id}`) ? "★" : "☆"}</span>
                    <span>{isBookmarked(`sti-${selectedSti.id}`) ? "Guardado" : "Guardar"}</span>
                  </button>
                )}
              </div>

              {/* Transmission & Asymptomatic */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-gray-50 dark:bg-gray-700/40 p-4 rounded-2xl text-xs space-y-1">
                  <span className="font-bold text-primary dark:text-primary-light block uppercase tracking-wide">
                    Como se Transmite:
                  </span>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    {selectedSti.transmission}
                  </p>
                </div>

                <div className="bg-amber-50 dark:bg-amber-950/30 p-4 rounded-2xl text-xs space-y-1 border border-amber-200 dark:border-amber-900/40">
                  <span className="font-bold text-amber-800 dark:text-amber-300 block uppercase tracking-wide">
                    ⚠️ Atenção / Assintomático:
                  </span>
                  <p className="text-amber-900 dark:text-amber-200 leading-relaxed">
                    {selectedSti.symptoms.asymptomaticNote}
                  </p>
                </div>
              </div>

              {/* Symptoms */}
              <div className="space-y-2">
                <h4 className="text-sm font-heading font-bold text-gray-900 dark:text-white">
                  Sintomas Frequentes (quando se manifestam):
                </h4>
                <ul className="grid sm:grid-cols-2 gap-2 text-xs text-gray-700 dark:text-gray-300">
                  {selectedSti.symptoms.common.map((sym, idx) => (
                    <li key={idx} className="flex items-start gap-2 bg-gray-50 dark:bg-gray-700/30 p-2.5 rounded-xl">
                      <span className="text-primary font-bold">•</span>
                      <span>{sym}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Window Period */}
              <div className="bg-primary/5 dark:bg-primary/10 p-5 rounded-2xl border border-primary/20 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-primary dark:text-primary-light uppercase tracking-wide">
                    ⏱️ Período de Janela Imunológica para Rastreio:
                  </span>
                  <span className="font-bold text-secondary text-sm">
                    {selectedSti.windowPeriodDays.recommended} dias recomendados
                  </span>
                </div>
                <p className="text-gray-600 dark:text-gray-300">
                  {selectedSti.windowPeriodDays.description}
                </p>
              </div>

              {/* Treatment & SNS */}
              <div className="grid sm:grid-cols-2 gap-4 text-xs">
                <div className="space-y-1">
                  <span className="font-bold text-gray-900 dark:text-white block">
                    🩺 Tratamento:
                  </span>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {selectedSti.treatment}
                  </p>
                </div>

                <div className="space-y-1">
                  <span className="font-bold text-gray-900 dark:text-white block">
                    🇵🇹 Acesso no SNS:
                  </span>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {selectedSti.snsCoverage}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Window Period Calculator */}
      <div className="bg-gradient-to-r from-primary/10 to-accent/10 p-6 md:p-8 rounded-3xl border border-primary/20 space-y-4">
        <div className="flex items-center gap-3">
          <span className="text-3xl">🗓️</span>
          <div>
            <h3 className="text-lg md:text-xl font-heading font-bold text-gray-900 dark:text-white">
              Simulador do Período de Janela (Quando Fazer o Teste?)
            </h3>
            <p className="text-xs md:text-sm text-gray-600 dark:text-gray-300">
              O período de janela é o tempo entre o contacto sexual e o momento em que um teste consegue detetar o vírus/bactéria com 100% de fiabilidade.
            </p>
          </div>
        </div>

        <div className="space-y-3 pt-2">
          <div className="flex justify-between items-center text-xs font-bold text-gray-700 dark:text-gray-300">
            <span>Há quantos dias ocorreu o contacto?</span>
            <span className="bg-primary text-white px-3 py-1 rounded-full text-sm">
              {daysSinceExposure} dias atrás
            </span>
          </div>

          <input
            type="range"
            min="1"
            max="90"
            value={daysSinceExposure}
            onChange={(e) => setDaysSinceExposure(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-primary"
          />

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3">
            {STIS_DATA.map((sti) => {
              const isReady = daysSinceExposure >= sti.windowPeriodDays.recommended;
              const isMinPassed = daysSinceExposure >= sti.windowPeriodDays.min;

              return (
                <div
                  key={sti.id}
                  className={`p-3 rounded-2xl border text-xs space-y-1 ${
                    isReady
                      ? "bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200"
                      : isMinPassed
                      ? "bg-amber-50 dark:bg-amber-950/40 border-amber-300 dark:border-amber-800 text-amber-900 dark:text-amber-200"
                      : "bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-500"
                  }`}
                >
                  <span className="font-bold block truncate">{sti.name.split(" ")[0]}</span>
                  <div className="text-[11px]">
                    {isReady ? (
                      <span className="font-bold text-emerald-600 dark:text-emerald-400">
                        ✅ Teste Fiável
                      </span>
                    ) : isMinPassed ? (
                      <span className="font-bold text-amber-600 dark:text-amber-400">
                        ⏳ Deteção Inicial
                      </span>
                    ) : (
                      <span>Aguardar ({sti.windowPeriodDays.recommended - daysSinceExposure}d)</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Testing Centers Directory */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-xl font-heading font-bold text-gray-900 dark:text-white">
              Onde Fazer Rastreios Anónimos e Gratuitos em Portugal
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Centros comunitários e SNS com testes rápidos, sigilosos e sem custos.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="p-2 rounded-xl text-xs font-bold border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 outline-none"
            >
              <option value="all">Todas as Regiões</option>
              <option value="Lisboa e Vale do Tejo">Lisboa e Vale do Tejo</option>
              <option value="Norte">Norte</option>
              <option value="Algarve">Algarve</option>
            </select>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {filteredCentres.map((centre) => (
            <div
              key={centre.id}
              className="bg-white dark:bg-gray-800 p-5 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-sm flex flex-col justify-between space-y-4"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300">
                    Gratuito & Anónimo
                  </span>
                  <span className="text-[10px] uppercase font-bold text-gray-400">
                    {centre.region}
                  </span>
                </div>

                <h4 className="font-heading font-bold text-gray-900 dark:text-white text-base">
                  {centre.name}
                </h4>

                <p className="text-xs text-gray-600 dark:text-gray-300">
                  📍 {centre.address} ({centre.city})
                </p>

                <div className="flex flex-wrap gap-1 pt-1">
                  {centre.features.map((f, i) => (
                    <span
                      key={i}
                      className="text-[10px] bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-0.5 rounded-md font-medium"
                    >
                      {f}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-gray-100 dark:border-gray-700 pt-3 text-xs">
                <a
                  href={`tel:${centre.phone.replace(/[^0-9+]/g, "")}`}
                  className="font-bold text-primary dark:text-primary-light hover:underline flex items-center gap-1"
                >
                  📞 {centre.phone}
                </a>

                {centre.website && (
                  <a
                    href={centre.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-secondary underline"
                  >
                    Website ↗
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
