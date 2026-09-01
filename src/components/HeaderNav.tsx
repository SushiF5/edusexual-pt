"use client";

import { useRef } from "react";
import { Locale, T, locales, localeNames } from "@/i18n/translations";
import { useFocusTrap } from "@/lib/useFocusTrap";
import { TabId } from "@/types";
import QuickExitButton from "@/components/QuickExitButton";
import FontSizeControls from "@/components/FontSizeControls";

export const navTabIds = [
  { id: "home" as const, icon: "🏠" },
  { id: "podcast" as const, icon: "🎙️" },
  { id: "ferramentas" as const, icon: "⚙️" },
  { id: "glossario" as const, icon: "📖" },
  { id: "direitos" as const, icon: "📞" },
  { id: "recursos" as const, icon: "📋" },
  { id: "quiz" as const, icon: "🧠" },
  { id: "faq" as const, icon: "❓" },
  { id: "duvidas" as const, icon: "💬" },
];

export function navLabel(tabId: TabId, t: T): string {
  const map: Record<TabId, string> = {
    home: t.home,
    podcast: t.tabPodcast || "Podcast",
    ferramentas: t.tabTools || "Ferramentas",
    glossario: t.tabGlossary || "Glossário",
    direitos: t.tabRights || "Linhas & Direitos",
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
    <header className="bg-white/85 dark:bg-gray-900/85 backdrop-blur-md border-b border-gray-100 dark:border-gray-800 py-2.5 px-3 md:px-6 sticky top-0 z-50 transition-all relative" role="banner">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
        {/* Brand & Logo */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowAudienceSelector(true)}
            className="flex items-center gap-2 hover:opacity-80 transition group shrink-0"
            aria-label={t.changeProfile}
          >
            <div className="bg-primary/10 p-1.5 md:p-2 rounded-xl group-hover:bg-primary group-hover:text-white transition-colors">
              <span className="text-lg md:text-2xl" role="img" aria-hidden="true">🧠</span>
            </div>
            <div className="text-left hidden sm:block">
              <h1 className="text-sm md:text-lg font-heading font-bold text-primary leading-tight">EduSexual PT</h1>
              <span className="text-[9px] md:text-[10px] uppercase tracking-widest font-bold text-gray-400 dark:text-gray-500">{t.profile}: {activeTab === "home" ? t.home : navLabel(activeTab, t)}</span>
            </div>
          </button>
        </div>

        {/* Desktop Navigation Tabs */}
        <nav
          ref={navRef}
          className="hidden xl:flex bg-gray-100 dark:bg-gray-800 p-1.5 rounded-full gap-1 shadow-sm overflow-x-auto"
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
              className={`px-3.5 py-1.5 rounded-full transition-all duration-200 text-xs md:text-sm font-semibold flex items-center gap-1.5 ${
                activeTab === tab.id
                  ? "bg-primary text-white shadow-md font-bold"
                  : "text-gray-600 dark:text-gray-300 hover:text-primary hover:bg-white dark:hover:bg-gray-700"
              }`}
            >
              <span>{tab.icon}</span>
              <span>{navLabel(tab.id, t)}</span>
            </button>
          ))}
        </nav>

        {/* Top Right Utilities */}
        <div className="flex items-center gap-1.5 md:gap-2">
          {/* Global Search Button */}
          {onOpenSearch && (
            <button
              onClick={onOpenSearch}
              className="p-1.5 md:px-3 md:py-1.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 hover:bg-primary/10 text-gray-700 dark:text-gray-300 transition flex items-center gap-1.5 text-xs font-bold"
              title="Pesquisar em todo o portal (Ctrl+K)"
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
              className="p-1.5 md:px-3 md:py-1.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 hover:bg-amber-50 dark:hover:bg-amber-950/30 text-gray-700 dark:text-gray-300 transition flex items-center gap-1 text-xs font-bold"
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

          {/* Font Size A11y Controller */}
          <FontSizeControls />

          {/* Locale switcher */}
          <div className="hidden lg:flex items-center bg-gray-100 dark:bg-gray-800 rounded-full p-1 gap-0.5" role="radiogroup" aria-label={t.selectProfile}>
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

          {/* Dark mode */}
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition"
            aria-label={darkMode ? t.lightMode : t.darkMode}
          >
            <span role="img" aria-hidden="true">{darkMode ? "☀️" : "🌙"}</span>
          </button>

          {/* Audience switcher button */}
          <button
            onClick={() => setShowAudienceSelector(true)}
            className="hidden sm:inline-flex btn-primary text-xs py-1.5 px-3 md:px-4"
          >
            {t.changeProfile}
          </button>

          {/* Mobile hamburger menu */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition"
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
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div ref={mobileMenuRef} className="absolute top-full left-0 right-0 bg-white dark:bg-gray-900 shadow-2xl xl:hidden z-50 border-t dark:border-gray-800 max-h-[85vh] overflow-y-auto" role="dialog" aria-modal="true" aria-label={t.navigate}>
          <div className="p-3 grid grid-cols-2 gap-2 border-b border-gray-100 dark:border-gray-800">
            {navTabIds.map((tab) => (
              <button
                key={tab.id}
                onClick={() => { setActiveTab(tab.id); setMobileMenuOpen(false); }}
                className={`p-3 rounded-2xl text-left transition flex items-center gap-2.5 ${activeTab === tab.id ? "bg-primary text-white font-bold shadow-md" : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 bg-gray-50/60 dark:bg-gray-800/40"}`}
              >
                <span className="text-xl" role="img" aria-hidden="true">{tab.icon}</span>
                <span className="text-xs md:text-sm font-semibold">{navLabel(tab.id, t)}</span>
              </button>
            ))}
          </div>

          <div className="p-4 space-y-3">
            <div className="flex items-center justify-center gap-1 pb-3 border-b border-gray-100 dark:border-gray-800">
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
              className="w-full text-left p-3 rounded-xl text-primary font-bold hover:bg-gray-50 dark:hover:bg-gray-800 flex items-center gap-3"
            >
              <span role="img" aria-hidden="true">🔄</span>
              {t.changeProfile}
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
