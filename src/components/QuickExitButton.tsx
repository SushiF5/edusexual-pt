"use client";

import { useEffect } from "react";
import { useI18n } from "@/i18n";

export default function QuickExitButton() {
  const { t } = useI18n();

  const handleQuickExit = () => {
    // 1. Immediately replace window location to an innocent neutral site (ex: Google Search / Weather)
    // 2. Clear sensitive sessionStorage if any
    try {
      if (typeof window !== "undefined") {
        window.location.replace("https://www.google.com");
      }
    } catch {
      window.location.href = "https://www.google.com";
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Esc key triggers emergency quick exit immediately
      if (e.key === "Escape") {
        handleQuickExit();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <button
      onClick={handleQuickExit}
      title="Atalho: Pressiona a tecla Esc a qualquer momento para sair"
      aria-label={t.quickExitAria}
      className="bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-bold px-3.5 py-1.5 rounded-full text-xs transition-all hover:shadow-md flex items-center gap-1.5 cursor-pointer shadow-sm select-none shrink-0"
    >
      <span className="text-sm">🚪</span>
      <span className="hidden sm:inline font-bold">{t.quickExit}</span>
      <span className="text-[10px] bg-red-800/80 px-1.5 py-0.5 rounded font-mono hidden md:inline">
        ESC
      </span>
    </button>
  );
}
