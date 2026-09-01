"use client";

import { useEffect, useState } from "react";
import { useI18n } from "@/i18n";

export type FontSizeLevel = "sm" | "md" | "lg" | "xl";

export default function FontSizeControls() {
  const { t } = useI18n();
  const [fontSize, setFontSize] = useState<FontSizeLevel>("md");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Load from local storage
    const saved = localStorage.getItem("edusexual_font_size") as FontSizeLevel | null;
    if (saved && ["sm", "md", "lg", "xl"].includes(saved)) {
      setFontSize(saved);
      applyFontSize(saved);
    }
  }, []);

  const applyFontSize = (size: FontSizeLevel) => {
    const root = document.documentElement;
    root.classList.remove("text-size-sm", "text-size-md", "text-size-lg", "text-size-xl");
    root.classList.add(`text-size-${size}`);
  };

  const handleSelectSize = (size: FontSizeLevel) => {
    setFontSize(size);
    applyFontSize(size);
    localStorage.setItem("edusexual_font_size", size);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="px-2.5 py-1.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs font-bold hover:bg-gray-100 dark:hover:bg-gray-700 transition flex items-center gap-1"
        aria-label={t.fontSize}
        title={t.fontSize}
      >
        <span className="text-xs">A</span>
        <span className="text-sm font-bold">A</span>
        <span className="text-[10px] text-gray-400">▾</span>
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 z-50 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-xl p-2 w-44 space-y-1 text-xs">
            <div className="px-3 py-1 font-bold text-gray-400 uppercase tracking-wider text-[10px]">
              {t.fontSize}
            </div>

            <button
              onClick={() => handleSelectSize("sm")}
              className={`w-full text-left px-3 py-2 rounded-xl flex items-center justify-between transition ${
                fontSize === "sm"
                  ? "bg-primary text-white font-bold"
                  : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
            >
              <span className="text-xs">{t.fontSizeSmall}</span>
              <span className="text-xs">85%</span>
            </button>

            <button
              onClick={() => handleSelectSize("md")}
              className={`w-full text-left px-3 py-2 rounded-xl flex items-center justify-between transition ${
                fontSize === "md"
                  ? "bg-primary text-white font-bold"
                  : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
            >
              <span className="text-sm">{t.fontSizeNormal}</span>
              <span className="text-xs">100%</span>
            </button>

            <button
              onClick={() => handleSelectSize("lg")}
              className={`w-full text-left px-3 py-2 rounded-xl flex items-center justify-between transition ${
                fontSize === "lg"
                  ? "bg-primary text-white font-bold"
                  : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
            >
              <span className="text-base">{t.fontSizeLarge}</span>
              <span className="text-xs">115%</span>
            </button>

            <button
              onClick={() => handleSelectSize("xl")}
              className={`w-full text-left px-3 py-2 rounded-xl flex items-center justify-between transition ${
                fontSize === "xl"
                  ? "bg-primary text-white font-bold"
                  : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
            >
              <span className="text-lg font-bold">{t.fontSizeExtra}</span>
              <span className="text-xs">130%</span>
            </button>
          </div>
        </>
      )}
    </div>
  );
}
