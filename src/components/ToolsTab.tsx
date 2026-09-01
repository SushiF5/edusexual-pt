"use client";

import { useState, useEffect } from "react";
import ContraceptiveComparator from "@/components/ContraceptiveComparator";
import MythBusterGame from "@/components/MythBusterGame";
import MenstrualCycleSim from "@/components/MenstrualCycleSim";
import StepByStepGuides from "@/components/StepByStepGuides";
import RelationshipsConsentTool from "@/components/RelationshipsConsentTool";
import StiTestingGuideTool from "@/components/StiTestingGuideTool";
import QuizTab from "@/components/QuizTab";
import { Audience, BookmarkItem } from "@/types";
import { useI18n } from "@/i18n";

interface ToolsTabProps {
  audience?: Audience;
  initialSubTool?: SubToolId;
  onBookmark?: (item: BookmarkItem) => void;
  isBookmarked?: (id: string) => boolean;
}

export type SubToolId =
  | "comparator"
  | "mythbuster"
  | "quiz"
  | "consent"
  | "stis"
  | "cycle"
  | "steps";

export default function ToolsTab({
  audience = "jovens",
  initialSubTool = "comparator",
  onBookmark,
  isBookmarked = () => false,
}: ToolsTabProps) {
  const { t } = useI18n();
  const [activeSubTool, setActiveSubTool] = useState<SubToolId>(initialSubTool);

  useEffect(() => {
    if (initialSubTool) {
      setActiveSubTool(initialSubTool);
    }
  }, [initialSubTool]);

  const subTools = [
    {
      id: "comparator" as SubToolId,
      label: t.toolComparator,
      icon: "⚖️",
      description: "Eficácia, custos e acesso SNS",
    },
    {
      id: "mythbuster" as SubToolId,
      label: t.toolMythBuster,
      icon: "💡",
      description: "Jogo de mitos vs verdades",
    },
    {
      id: "quiz" as SubToolId,
      label: t.tabQuiz || "Quiz Interativo",
      icon: "🧠",
      description: "Testa os teus conhecimentos",
    },
    {
      id: "consent" as SubToolId,
      label: "Relações & Consentimento",
      icon: "🤝",
      description: "FRIES, limites e red flags",
    },
    {
      id: "stis" as SubToolId,
      label: "Guia & Rastreio de ISTs",
      icon: "🩺",
      description: "Sintomas, janelas e centros CAD",
    },
    {
      id: "cycle" as SubToolId,
      label: t.toolCycle,
      icon: "🩸",
      description: "Simulação das fases hormonais",
    },
    {
      id: "steps" as SubToolId,
      label: t.toolSteps,
      icon: "📋",
      description: "Instruções visuais passo a passo",
    },
  ];

  return (
    <div className="space-y-8 animate-fadeIn max-w-6xl mx-auto">
      {/* Tab Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-bold uppercase tracking-widest text-primary dark:text-primary-light px-3 py-1 bg-primary/10 rounded-full">
          Educação Prática & Interativa
        </span>
        <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 dark:text-white">
          {t.toolsTitle} & Jogos
        </h2>
        <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base">
          {t.toolsSubtitle}
        </p>
      </div>

      {/* Subtool navigation pills */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-2.5 max-w-6xl mx-auto">
        {subTools.map((tool) => {
          const isActive = activeSubTool === tool.id;
          return (
            <button
              key={tool.id}
              onClick={() => setActiveSubTool(tool.id)}
              className={`p-3 rounded-2xl border text-left transition flex flex-col justify-between ${
                isActive
                  ? "bg-primary text-white border-primary shadow-lg ring-2 ring-primary/30"
                  : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50"
              }`}
            >
              <div className="text-2xl mb-1">{tool.icon}</div>
              <div>
                <h4 className="font-bold text-xs md:text-sm leading-snug">{tool.label}</h4>
                <p
                  className={`text-[10px] mt-0.5 line-clamp-1 ${
                    isActive ? "text-primary-light/90" : "text-gray-400"
                  }`}
                >
                  {tool.description}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Subtool Render */}
      <div className="pt-2">
        {activeSubTool === "comparator" && (
          <ContraceptiveComparator
            onBookmark={onBookmark}
            isBookmarked={isBookmarked}
          />
        )}

        {activeSubTool === "mythbuster" && (
          <MythBusterGame
            onBookmark={onBookmark}
            isBookmarked={isBookmarked}
          />
        )}

        {activeSubTool === "quiz" && <QuizTab audience={audience} />}

        {activeSubTool === "consent" && (
          <RelationshipsConsentTool
            onBookmark={onBookmark}
            isBookmarked={isBookmarked}
          />
        )}

        {activeSubTool === "stis" && (
          <StiTestingGuideTool
            onBookmark={onBookmark}
            isBookmarked={isBookmarked}
          />
        )}

        {activeSubTool === "cycle" && <MenstrualCycleSim />}

        {activeSubTool === "steps" && (
          <StepByStepGuides
            onBookmark={onBookmark}
            isBookmarked={isBookmarked}
          />
        )}
      </div>
    </div>
  );
}
