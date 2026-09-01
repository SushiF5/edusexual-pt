"use client";

import { useState } from "react";

export default function MenstrualCycleSim() {
  const [selectedDay, setSelectedDay] = useState<number>(14);
  const [cycleLength, setCycleLength] = useState<number>(28);

  // Calculate phase based on day relative to cycle length
  const ovulationDay = Math.round(cycleLength - 14);
  const fertileStart = Math.max(1, ovulationDay - 5);
  const fertileEnd = Math.min(cycleLength, ovulationDay + 1);

  let phaseName = "";
  let phaseColor = "";
  let phaseDescription = "";
  let uterineEvent = "";
  let ovarianEvent = "";
  let hormoneSummary = "";
  let cervicalMucus = "";
  let fertilityLevel = "";
  let fertilityBadge = "";

  if (selectedDay >= 1 && selectedDay <= 5) {
    phaseName = "Fase Menstrual";
    phaseColor = "from-rose-500 to-red-600";
    phaseDescription = "Descamação do endométrio devido à descida abrupta dos níveis de estrogénio e progesterona caso não tenha havido fecundação.";
    uterineEvent = "O útero liberta o endométrio (sangramento menstrual natural).";
    ovarianEvent = "Os ovários começam a maturar um novo grupo de folículos sob estímulo da FSH.";
    hormoneSummary = "Estrogénio e progesterona em níveis mínimos basais.";
    cervicalMucus = "Escasso ou mascarado pelo fluxo menstrual.";
    fertilityLevel = "Muito Baixa (mas não nula em ciclos curtos/irregulares).";
    fertilityBadge = "bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300";
  } else if (selectedDay < fertileStart) {
    phaseName = "Fase Folicular (Pré-Ovulatória)";
    phaseColor = "from-amber-400 to-orange-500";
    phaseDescription = "Fase de regeneração celular e crescimento do folículo dominante no ovário.";
    uterineEvent = "O endométrio começa a reconstruir-se e a aumentar de espessura.";
    ovarianEvent = "O folículo dominante cresce e liberta quantidades crescentes de estrogénio.";
    hormoneSummary = "Estrogénio a subir progressivamente; FSH diminui.";
    cervicalMucus = "Pouco espesso, pegajoso ou leitoso.";
    fertilityLevel = "Baixa a Média (espermatozoides sobrevivem até 5 dias nas trompas).";
    fertilityBadge = "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300";
  } else if (selectedDay >= fertileStart && selectedDay <= fertileEnd) {
    phaseName = "Janela Fértil & Ovulação";
    phaseColor = "from-emerald-500 to-teal-600";
    phaseDescription = "Momento de libertação do óvulo maduro e pico máximo de fertilidade no ciclo.";
    uterineEvent = "Endométrio atinge espessura e vascularização ideais para acolher uma gravidez.";
    ovarianEvent = `No Dia ~${ovulationDay}, o pico de LH desencadeia a rutura do folículo e a libertação do óvulo para a trompa de Falópio.`;
    hormoneSummary = "Pico acentuado de Hormona Luteinizante (LH) e Estrogénio máximo.";
    cervicalMucus = "Fluido, transparente e elástico (semelhante a clara de ovo crua).";
    fertilityLevel = "Máxima / Muito Alta (Período de maior probabilidade de fecundação).";
    fertilityBadge = "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300 font-bold";
  } else {
    phaseName = "Fase Lútea (Pós-Ovulatória)";
    phaseColor = "from-indigo-500 to-purple-600";
    phaseDescription = "Preparação do corpo para uma possível nidação ou para o início de um novo ciclo caso não haja gravidez.";
    uterineEvent = "O endométrio torna-se secretor. Se não houver fecundação, começa a degenerar.";
    ovarianEvent = "O folículo vazio transforma-se no Corpo Amarelo (Corpo Lúteo), produzindo progesterona.";
    hormoneSummary = "Pico de Progesterona; subida ligeira da temperatura corporal basal (~0.3ºC a 0.5ºC).";
    cervicalMucus = "Mais espesso, seco ou pastoso (bloqueia o canal cervical).";
    fertilityLevel = "Baixa / Nula após a degradação do óvulo (sobrevida de 12-24h).";
    fertilityBadge = "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/40 dark:text-indigo-300";
  }

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Intro Banner */}
      <div className="bg-gradient-to-r from-primary/10 via-rose-500/10 to-accent/10 dark:from-primary/20 dark:to-rose-500/20 p-6 md:p-8 rounded-3xl border border-primary/20">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-3xl">🩸</span>
          <h3 className="text-2xl md:text-3xl font-heading font-bold text-primary dark:text-primary-light">
            Simulador Pedagógico do Ciclo Menstrual
          </h3>
        </div>
        <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base leading-relaxed">
          Compreende como o corpo humano se transforma ao longo do ciclo menstrual: hormonas, ovulação, alterações no endométrio e sinais corporais.
        </p>
      </div>

      {/* Interactive Controller */}
      <div className="bg-white dark:bg-gray-800 p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 block mb-1">
              Duração total do ciclo (dias)
            </label>
            <div className="flex items-center gap-2">
              {[26, 28, 30, 32].map((d) => (
                <button
                  key={d}
                  onClick={() => {
                    setCycleLength(d);
                    if (selectedDay > d) setSelectedDay(d);
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                    cycleLength === d
                      ? "bg-primary text-white"
                      : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200"
                  }`}
                >
                  {d} dias
                </button>
              ))}
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-700/50 px-5 py-3 rounded-2xl text-center sm:text-right">
            <span className="text-xs text-gray-400 block">Dia Selecionado</span>
            <span className="text-2xl font-heading font-bold text-primary dark:text-primary-light">
              Dia {selectedDay} <span className="text-xs font-normal text-gray-500">de {cycleLength}</span>
            </span>
          </div>
        </div>

        {/* Day Slider */}
        <div className="space-y-3">
          <input
            type="range"
            min={1}
            max={cycleLength}
            value={selectedDay}
            onChange={(e) => setSelectedDay(Number(e.target.value))}
            className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary"
            aria-label="Selecionar dia do ciclo menstrual"
          />

          {/* Cycle Phases Visual Bar */}
          <div className="grid grid-cols-4 gap-1 text-[10px] md:text-xs font-semibold text-center pt-2">
            <div
              onClick={() => setSelectedDay(3)}
              className={`p-2 rounded-xl cursor-pointer transition ${
                selectedDay <= 5 ? "bg-rose-500 text-white shadow-md font-bold" : "bg-rose-50 dark:bg-rose-950/40 text-rose-800 dark:text-rose-300"
              }`}
            >
              Menstruação (Dias 1-5)
            </div>
            <div
              onClick={() => setSelectedDay(8)}
              className={`p-2 rounded-xl cursor-pointer transition ${
                selectedDay > 5 && selectedDay < fertileStart
                  ? "bg-amber-500 text-white shadow-md font-bold"
                  : "bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300"
              }`}
            >
              Folicular (Dias 6-{fertileStart - 1})
            </div>
            <div
              onClick={() => setSelectedDay(ovulationDay)}
              className={`p-2 rounded-xl cursor-pointer transition ${
                selectedDay >= fertileStart && selectedDay <= fertileEnd
                  ? "bg-emerald-500 text-white shadow-md font-bold"
                  : "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300"
              }`}
            >
              Ovulação (Dias {fertileStart}-{fertileEnd})
            </div>
            <div
              onClick={() => setSelectedDay(Math.min(cycleLength, fertileEnd + 4))}
              className={`p-2 rounded-xl cursor-pointer transition ${
                selectedDay > fertileEnd
                  ? "bg-indigo-500 text-white shadow-md font-bold"
                  : "bg-indigo-50 dark:bg-indigo-950/40 text-indigo-800 dark:text-indigo-300"
              }`}
            >
              Lútea (Dias {fertileEnd + 1}-{cycleLength})
            </div>
          </div>
        </div>
      </div>

      {/* Detail State Card */}
      <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100 dark:border-gray-700 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-100 dark:border-gray-700 pb-4">
          <div>
            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">
              Fase Ativa no Dia {selectedDay}
            </span>
            <h4 className="text-2xl font-heading font-bold text-gray-900 dark:text-white">
              {phaseName}
            </h4>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-400">Probabilidade de Fecundação:</span>
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${fertilityBadge}`}>
              {fertilityLevel}
            </span>
          </div>
        </div>

        <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
          {phaseDescription}
        </p>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-gray-50 dark:bg-gray-700/40 p-4 rounded-2xl border border-gray-100 dark:border-gray-700">
            <div className="flex items-center gap-2 text-xs font-bold text-primary dark:text-primary-light uppercase tracking-wider mb-2">
              <span>🏠</span>
              <span>No Útero</span>
            </div>
            <p className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed">
              {uterineEvent}
            </p>
          </div>

          <div className="bg-gray-50 dark:bg-gray-700/40 p-4 rounded-2xl border border-gray-100 dark:border-gray-700">
            <div className="flex items-center gap-2 text-xs font-bold text-primary dark:text-primary-light uppercase tracking-wider mb-2">
              <span>🥚</span>
              <span>Nos Ovários</span>
            </div>
            <p className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed">
              {ovarianEvent}
            </p>
          </div>

          <div className="bg-gray-50 dark:bg-gray-700/40 p-4 rounded-2xl border border-gray-100 dark:border-gray-700">
            <div className="flex items-center gap-2 text-xs font-bold text-primary dark:text-primary-light uppercase tracking-wider mb-2">
              <span>🧪</span>
              <span>Hormonas Dominantes</span>
            </div>
            <p className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed">
              {hormoneSummary}
            </p>
          </div>

          <div className="bg-gray-50 dark:bg-gray-700/40 p-4 rounded-2xl border border-gray-100 dark:border-gray-700">
            <div className="flex items-center gap-2 text-xs font-bold text-primary dark:text-primary-light uppercase tracking-wider mb-2">
              <span>💧</span>
              <span>Muco Cervical</span>
            </div>
            <p className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed">
              {cervicalMucus}
            </p>
          </div>
        </div>
      </div>

      {/* Critical Medical Warning Box */}
      <div className="bg-amber-50 dark:bg-amber-950/40 border-2 border-amber-300 dark:border-amber-700/60 p-6 rounded-3xl space-y-3 text-amber-950 dark:text-amber-100">
        <div className="flex items-center gap-2 text-amber-800 dark:text-amber-300 font-bold text-sm md:text-base">
          <span>⚠️</span>
          <span>Aviso Pedagógico Importante: O Calendário NÃO é um Método Contracetivo</span>
        </div>
        <p className="text-xs md:text-sm leading-relaxed text-amber-900 dark:text-amber-200">
          O ciclo reprodutivo natural pode sofrer variações repentinas devido a stress, alterações hormonais, mudanças na rotina, viagens, medicamentos ou noites mal dormidas.
        </p>
        <p className="text-xs md:text-sm leading-relaxed text-amber-900 dark:text-amber-200">
          Além disso, os espermatozoides conseguem sobreviver no aparelho genital até <strong>5 dias</strong> à espera da ovulação. O chamado &ldquo;método do calendário&rdquo; (tabelinha) tem uma taxa real de falha de até <strong>24% ao ano</strong> e <strong>não protege contra Infeções Sexualmente Transmissíveis (ISTs)</strong>.
        </p>
      </div>
    </div>
  );
}
