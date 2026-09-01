"use client";

import { useRef, useState, useEffect } from "react";
import { Locale, T, locales, localeNames } from "@/i18n/translations";
import { useFocusTrap } from "@/lib/useFocusTrap";
import { TabId } from "@/types";
import QuickExitButton from "@/components/QuickExitButton";
import FontSizeControls from "@/components/FontSizeControls";

export const navTabIds: { id: TabId; icon: string; badge?: string }[] = [
  { id: "home", icon: "🏠" },
  { id: "recursos", icon: "📚" },
  { id: "ferramentas", icon: "⚙️" },
  { id: "podcast", icon: "🎙️" },
  { id: "direitos", icon: "📞" },
];

export function navLabel(tabId: TabId, t: T): string {
  const map: Record<TabId, string> = {
    home: t.home,
    recursos: t.tabLearn || "Aprender",
    ferramentas: t.tabTools || "Ferramentas",
    podcast: t.tabPodcast || "Podcast",
    direitos: t.tabRights || "Apoio & Direitos",
    // Backward compatibility mappings
    glossario: t.tabGlossary || "Glossário",
    quiz: t.tabQuiz || "Quiz",
    faq: t.tabFaq || "FAQ",
    duvidas: t.tabDoubts || t.askQuestion,
  };
  return map[tabId] || tabId;
}

export function navDescription(tabId: TabId, t: T): string {
  const map: Record<TabId, string> = {
    home: "Visão geral e destaques",
    recursos: t.tabLearnDesc || "Guias, Glossário e Perguntas Frequentes",
    ferramentas: t.tabToolsDesc || "Comparador, Mitos, Quiz e Simuladores",
    podcast: t.tabPodcastDesc || "Episódios em áudio e transcrições",
    direitos: t.tabRightsDesc || "Linhas 24/7, Direitos SNS e Perguntas Anónimas",
    glossario: "Termos e definições",
    quiz: "Testes e conhecimento",
    faq: "Perguntas frequentes",
    duvidas: "Tirar dúvidas anónimas",
  };
  return map[tabId] || "";
}

interface HeaderNavProps {
  activeTab: TabId;
  setActiveTab: (tab: TabId) => void;
  locale: Locale;
  setLocale: (l: Locale) => void;
  darkMode: boolean;
  toggleDarkMode: () => void;
  setShowAudienceSelector: (show: boolean) => void;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  bookmarksCount?: number;
  onOpenBookmarks?: () => void;
  onOpenSearch?: () => void;
  t: T;
}

export default function HeaderNav({
  activeTab,
  setActiveTab,
  locale,
  setLocale,
  darkMode,
  toggleDarkMode,
  setShowAudienceSelector,
  mobileMenuOpen,
  setMobileMenuOpen,
  bookmarksCount = 0,
  onOpenBookmarks,
  onOpenSearch,
  t,
}: HeaderNavProps) {
  const mobileMenuRef = useFocusTrap(mobileMenuOpen);
  const navRef = useRef<HTMLElement>(null);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const settingsRef = useRef<HTMLDivElement>(null);

  // Close settings popover on click outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (settingsRef.current && !settingsRef.current.contains(e.target as Node)) {
        setSettingsOpen(false);
      }
    }
    if (settingsOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [settingsOpen]);

  const onTabKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    const tabs = Array.from(
      e.currentTarget.querySelectorAll<HTMLButtonElement>('[role="tab"]')
    );
    const currentIndex = tabs.findIndex((b) => b === document.activeElement);
    if (currentIndex === -1) return;

    let nextIndex = currentIndex;
    switch (e.key) {
      case "ArrowRight":
      case "ArrowDown":
        nextIndex = (currentIndex + 1) % tabs.length;
        break;
      case "ArrowLeft":
      case "ArrowUp":
        nextIndex = (currentIndex - 1 + tabs.length) % tabs.length;
        break;
      case "Home":
        nextIndex = 0;
        break;
      case "End":
        nextIndex = tabs.length - 1;
        break;
      default:
        return;
    }

    e.preventDefault();
    tabs[nextIndex].focus();
    setActiveTab(navTabIds[nextIndex].id);
  };

  return (
    <header className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-b border-gray-100 dark:border-gray-800 py-2.5 px-3 md:px-6 sticky top-0 z-50 transition-all relative" role="banner">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        {/* Brand & Logo */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveTab("home")}
            className="flex items-center gap-2.5 hover:opacity-90 transition group shrink-0"
            aria-label="EduSexual PT - Página Inicial"
          >
            <div className="bg-primary/10 dark:bg-primary/25 p-2 rounded-2xl group-hover:bg-primary group-hover:text-white transition-all text-primary">
              <span className="text-xl md:text-2xl" role="img" aria-hidden="true">🧠</span>
            </div>
            <div className="text-left">
              <h1 className="text-base md:text-lg font-heading font-bold text-gray-900 dark:text-white leading-none">
                EduSexual<span className="text-primary ml-0.5">PT</span>
              </h1>
              <span className="text-[10px] text-gray-500 dark:text-gray-400 font-medium">
                Educação & Apoio
              </span>
            </div>
          </button>

          {/* Profile Switcher Quick Pill */}
          <button
            onClick={() => setShowAudienceSelector(true)}
            className="hidden md:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-primary/10 hover:text-primary transition"
            title={t.changeProfile}
          >
            <span>👤</span>
            <span>{t.changeProfile}</span>
            <span className="text-[10px] text-gray-400">▾</span>
          </button>
        </div>

        {/* Consolidated Desktop Navigation Tabs (5 Core Hubs) */}
        <nav
          ref={navRef}
          className="hidden lg:flex bg-gray-100/90 dark:bg-gray-800/90 p-1 rounded-full gap-1 shadow-inner"
          aria-label={t.navigate}
          role="tablist"
          onKeyDown={onTabKeyDown}
        >
          {navTabIds.map((tab) => {
            const isSelected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                id={`tab-${tab.id}`}
                role="tab"
                aria-selected={isSelected}
                aria-controls="main-content"
                tabIndex={isSelected ? 0 : -1}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-1.5 rounded-full transition-all duration-200 text-xs md:text-sm font-semibold flex items-center gap-1.5 ${
                  isSelected
                    ? "bg-primary text-white shadow-md font-bold scale-[1.02]"
                    : "text-gray-600 dark:text-gray-300 hover:text-primary hover:bg-white dark:hover:bg-gray-700"
                }`}
                title={navDescription(tab.id, t)}
              >
                <span role="img" aria-hidden="true">{tab.icon}</span>
                <span>{navLabel(tab.id, t)}</span>
              </button>
            );
          })}
        </nav>

        {/* Top Right Utilities */}
        <div className="flex items-center gap-1.5 md:gap-2">
          {/* Global Search Button */}
          {onOpenSearch && (
            <button
              onClick={onOpenSearch}
              className="p-2 md:px-3 md:py-1.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 hover:bg-primary/10 text-gray-700 dark:text-gray-300 transition flex items-center gap-1.5 text-xs font-bold shadow-xs"
              title="Pesquisar em todo o portal (Ctrl+K / ⌘K)"
              aria-label="Pesquisar em todo o portal"
            >
              <span>🔍</span>
              <span className="hidden md:inline">Pesquisar</span>
              <kbd className="hidden xl:inline text-[9px] bg-gray-200 dark:bg-gray-700 px-1 py-0.2 rounded font-mono text-gray-500">
                ⌘K
              </kbd>
            </button>
          )}

          {/* Quick Exit (Panic Button) */}
          <QuickExitButton />

          {/* Bookmarks Trigger */}
          {onOpenBookmarks && (
            <button
              onClick={onOpenBookmarks}
              className="p-2 md:px-3 md:py-1.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 hover:bg-amber-50 dark:hover:bg-amber-950/30 text-gray-700 dark:text-gray-300 transition flex items-center gap-1.5 text-xs font-bold shadow-xs"
              title={t.bookmarks}
              aria-label={t.bookmarks}
            >
              <span className="text-amber-500">★</span>
              {bookmarksCount > 0 && (
                <span className="bg-amber-500 text-white text-[10px] font-bold px-1.5 py-0.2 rounded-full">
                  {bookmarksCount}
                </span>
              )}
              <span className="hidden lg:inline">{t.bookmarks}</span>
            </button>
          )}

          {/* Unified Settings Menu Popover */}
          <div className="relative" ref={settingsRef}>
            <button
              onClick={() => setSettingsOpen(!settingsOpen)}
              className={`p-2 rounded-xl border border-gray-200 dark:border-gray-700 transition flex items-center gap-1 text-xs font-semibold ${
                settingsOpen
                  ? "bg-primary text-white border-primary"
                  : "bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
              title={t.settings || "Definições"}
              aria-label={t.settings || "Definições de acessibilidade e idioma"}
              aria-expanded={settingsOpen}
            >
              <span role="img" aria-hidden="true">⚙️</span>
            </button>

            {settingsOpen && (
              <div className="absolute right-0 mt-2 w-64 p-4 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 z-50 space-y-4 animate-scaleUp">
                {/* Language Picker */}
                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 block mb-2">
                    Idioma / Language
                  </label>
                  <div className="grid grid-cols-3 gap-1 bg-gray-100 dark:bg-gray-700/60 p-1 rounded-xl">
                    {locales.map((l) => (
                      <button
                        key={l}
                        onClick={() => { setLocale(l); }}
                        className={`py-1.5 text-xs font-bold rounded-lg transition ${
                          locale === l
                            ? "bg-primary text-white shadow-sm"
                            : "text-gray-600 dark:text-gray-300 hover:text-primary"
                        }`}
                      >
                        {localeNames[l]}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Dark/Light Mode */}
                <div className="pt-2 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between">
                  <span className="text-xs font-bold text-gray-700 dark:text-gray-300">
                    {darkMode ? t.darkMode : t.lightMode}
                  </span>
                  <button
                    onClick={toggleDarkMode}
                    className="p-1.5 px-3 rounded-xl bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition text-xs font-bold flex items-center gap-1.5"
                  >
                    <span>{darkMode ? "🌙 Modo Escuro" : "☀️ Modo Claro"}</span>
                  </button>
                </div>

                {/* Font Size Scaling */}
                <div className="pt-2 border-t border-gray-100 dark:border-gray-700">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 block mb-2">
                    Tamanho do Texto
                  </span>
                  <FontSizeControls />
                </div>
              </div>
            )}
          </div>

          {/* Mobile hamburger menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            aria-label={mobileMenuOpen ? t.closeMenu : t.openMenu}
            aria-expanded={mobileMenuOpen}
          >
            <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          ref={mobileMenuRef}
          className="absolute top-full left-0 right-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl shadow-2xl lg:hidden z-50 border-t border-gray-200 dark:border-gray-800 max-h-[85vh] overflow-y-auto animate-fadeIn"
          role="dialog"
          aria-modal="true"
          aria-label={t.navigate}
        >
          <div className="p-4 space-y-2 border-b border-gray-100 dark:border-gray-800">
            {navTabIds.map((tab) => {
              const isSelected = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full p-3.5 rounded-2xl text-left transition flex items-center justify-between ${
                    isSelected
                      ? "bg-primary text-white font-bold shadow-md"
                      : "text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 bg-gray-50 dark:bg-gray-800/50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl" role="img" aria-hidden="true">{tab.icon}</span>
                    <div>
                      <div className="text-sm font-bold">{navLabel(tab.id, t)}</div>
                      <div className={`text-[11px] ${isSelected ? "text-white/80" : "text-gray-400"}`}>
                        {navDescription(tab.id, t)}
                      </div>
                    </div>
                  </div>
                  <span className="text-xs">→</span>
                </button>
              );
            })}
          </div>

          <div className="p-4 space-y-3 bg-gray-50/50 dark:bg-gray-800/30">
            {/* Quick Profile Switcher */}
            <button
              onClick={() => {
                setShowAudienceSelector(true);
                setMobileMenuOpen(false);
              }}
              className="w-full p-3 rounded-xl border border-primary/20 bg-primary/5 dark:bg-primary/15 text-primary dark:text-primary-light font-bold flex items-center justify-between text-xs"
            >
              <div className="flex items-center gap-2">
                <span>🔄</span>
                <span>{t.changeProfile}</span>
              </div>
              <span>Modificar perfil</span>
            </button>

            {/* Language Selection */}
            <div className="flex items-center justify-center gap-1 pt-2">
              {locales.map((l) => (
                <button
                  key={l}
                  onClick={() => {
                    setLocale(l);
                    setMobileMenuOpen(false);
                  }}
                  className={`flex-1 py-2 text-xs font-bold rounded-xl transition ${
                    locale === l
                      ? "bg-primary text-white shadow-sm"
                      : "text-gray-600 dark:text-gray-300 hover:text-primary bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
                  }`}
                >
                  {localeNames[l]}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
