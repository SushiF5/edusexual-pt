"use client";

import { useRef } from "react";
import { Locale, T, locales, localeNames } from "@/i18n/translations";
import { useFocusTrap } from "@/lib/useFocusTrap";
import { Audience, TabId } from "@/types";

export const navTabIds = [
  { id: "home" as const, icon: "🏠" },
  { id: "podcast" as const, icon: "🎙️" },
  { id: "recursos" as const, icon: "📋" },
  { id: "quiz" as const, icon: "🧠" },
  { id: "faq" as const, icon: "❓" },
  { id: "duvidas" as const, icon: "💬" },
];

export function navLabel(tabId: TabId, t: T): string {
  const map: Record<TabId, string> = {
    home: t.home,
    podcast: t.tabPodcast || "Podcast",
    recursos: t.tabResources || t.resourcesTitle,
    quiz: t.tabQuiz || "Quiz",
    faq: t.tabFaq || "FAQ",
    duvidas: t.tabDoubts || t.askQuestion,
  };
  return map[tabId];
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
  t,
}: HeaderNavProps) {
  const mobileMenuRef = useFocusTrap(mobileMenuOpen);
  const navRef = useRef<HTMLElement>(null);

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
    <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-800 py-3 px-4 md:px-6 sticky top-0 z-50 transition-all relative" role="banner">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
        <button
          onClick={() => setShowAudienceSelector(true)}
          className="flex items-center gap-2 hover:opacity-80 transition group shrink-0"
          aria-label={t.changeProfile}
        >
          <div className="bg-primary/10 p-1.5 md:p-2 rounded-xl group-hover:bg-primary group-hover:text-white transition-colors">
            <span className="text-lg md:text-2xl" role="img" aria-hidden="true">🧠</span>
          </div>
          <div className="text-left hidden sm:block">
            <h1 className="text-base md:text-xl font-heading font-bold text-primary leading-tight">EduSexual PT</h1>
            <span className="text-[9px] md:text-[10px] uppercase tracking-widest font-bold text-gray-400 dark:text-gray-500">{t.profile}: {activeTab === "home" ? t.home : navLabel(activeTab, t)}</span>
          </div>
        </button>

        <nav
          ref={navRef}
          className="hidden md:flex bg-gray-100 dark:bg-gray-800 p-2 rounded-full gap-2 shadow-sm"
          aria-label={t.navigate}
          role="tablist"
          onKeyDown={onTabKeyDown}
        >
          {navTabIds.map((tab) => (
            <button
              key={tab.id}
              id={`tab-${tab.id}`}
              role="tab"
              aria-selected={activeTab === tab.id}
              aria-controls="main-content"
              tabIndex={activeTab === tab.id ? 0 : -1}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-2 rounded-full transition-all duration-300 font-medium ${activeTab === tab.id ? "bg-primary text-white shadow-md" : "text-gray-600 dark:text-gray-300 hover:text-primary hover:bg-white dark:hover:bg-gray-700"}`}
            >
              {navLabel(tab.id, t)}
            </button>
          ))}
        </nav>

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition"
          aria-label={mobileMenuOpen ? t.closeMenu : t.openMenu}
          aria-expanded={mobileMenuOpen}
        >
          <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        <div className="hidden md:flex items-center gap-2">
          <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-full p-1 gap-0.5" role="radiogroup" aria-label={t.selectProfile}>
            {locales.map((l) => (
              <button
                key={l}
                onClick={() => setLocale(l)}
                className={`px-2 py-1 text-xs font-bold rounded-full transition ${locale === l ? "bg-primary text-white" : "text-gray-500 hover:text-primary"}`}
                role="radio"
                aria-checked={locale === l}
              >
                {localeNames[l]}
              </button>
            ))}
          </div>
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition"
            aria-label={darkMode ? t.lightMode : t.darkMode}
          >
            <span role="img" aria-hidden="true">{darkMode ? "☀️" : "🌙"}</span>
          </button>
          <button
            onClick={() => setShowAudienceSelector(true)}
            className="btn-primary text-xs md:text-sm py-2 px-3 md:px-6"
          >
            {t.changeProfile}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div ref={mobileMenuRef} className="absolute top-full left-0 right-0 bg-white dark:bg-gray-900 shadow-lg md:hidden z-50 border-t dark:border-gray-800" role="dialog" aria-modal="true" aria-label={t.navigate}>
          {navTabIds.map((tab) => (
            <button
              key={tab.id}
              onClick={() => { setActiveTab(tab.id); setMobileMenuOpen(false); }}
              className={`w-full text-left px-6 py-4 border-b border-gray-100 dark:border-gray-800 transition flex items-center gap-3 ${activeTab === tab.id ? "bg-primary text-white font-bold" : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"}`}
            >
              <span role="img" aria-hidden="true">{tab.icon}</span>
              {navLabel(tab.id, t)}
            </button>
          ))}
          <div className="flex items-center justify-center gap-1 px-6 py-3 border-b border-gray-100 dark:border-gray-800">
            {locales.map((l) => (
              <button
                key={l}
                onClick={() => { setLocale(l); setMobileMenuOpen(false); }}
                className={`px-3 py-1.5 text-xs font-bold rounded-full transition ${locale === l ? "bg-primary text-white" : "text-gray-500 hover:text-primary bg-gray-100 dark:bg-gray-800"}`}
              >
                {localeNames[l]}
              </button>
            ))}
          </div>
          <button
            onClick={() => { setShowAudienceSelector(true); setMobileMenuOpen(false); }}
            className="w-full text-left px-6 py-4 text-primary font-bold hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-3"
          >
            <span role="img" aria-hidden="true">🔄</span>
            {t.changeProfile}
          </button>
          <button
            onClick={() => { toggleDarkMode(); setMobileMenuOpen(false); }}
            className="w-full text-left px-6 py-4 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-3"
          >
            <span role="img" aria-hidden="true">{darkMode ? "☀️" : "🌙"}</span>
            {darkMode ? t.lightMode : t.darkMode}
          </button>
        </div>
      )}
    </header>
  );
}
