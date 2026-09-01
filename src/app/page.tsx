"use client";

import { useState, useEffect, Suspense } from "react";
import dynamic from "next/dynamic";
import { useI18n } from "@/i18n/context";
import { T } from "@/i18n/translations";
import { useFocusTrap } from "@/lib/useFocusTrap";
import TabSkeleton from "@/components/TabSkeleton";
import { Audience, TabId, BookmarkItem } from "@/types";
import { PodcastProvider, usePodcast } from "@/contexts/PodcastContext";
import { DoubtsProvider, useDoubts } from "@/contexts/DoubtsContext";
import HomeTab from "@/components/HomeTab";
import HeaderNav from "@/components/HeaderNav";
import ErrorBoundary from "@/components/ErrorBoundary";
import BookmarksModal from "@/components/BookmarksModal";
import GlobalSearchModal from "@/components/GlobalSearchModal";
import { useKeyboardShortcuts } from "@/lib/useKeyboardShortcuts";

const QuizTab = dynamic(() => import("@/components/QuizTab"), { ssr: false, loading: () => <TabSkeleton /> });
const FaqTab = dynamic(() => import("@/components/FaqTab"), { ssr: false, loading: () => <TabSkeleton /> });
const DoubtsTab = dynamic(() => import("@/components/DoubtsTab"), { ssr: false, loading: () => <TabSkeleton /> });
const PodcastTab = dynamic(() => import("@/components/PodcastTab"), { ssr: false, loading: () => <TabSkeleton /> });
const ResourcesTab = dynamic(() => import("@/components/ResourcesTab"), { ssr: false, loading: () => <TabSkeleton /> });
const ToolsTab = dynamic(() => import("@/components/ToolsTab"), { ssr: false, loading: () => <TabSkeleton /> });
const GlossaryTab = dynamic(() => import("@/components/GlossaryTab"), { ssr: false, loading: () => <TabSkeleton /> });
const RightsTab = dynamic(() => import("@/components/RightsTab"), { ssr: false, loading: () => <TabSkeleton /> });

interface AudienceSelectorProps {
  show: boolean;
  onSelect: (audience: Audience) => void;
  t: T;
}

interface TabContentProps {
  activeTab: TabId;
  audience: Audience;
  setActiveTab: (tab: TabId) => void;
  onBookmark: (item: BookmarkItem) => void;
  isBookmarked: (id: string) => boolean;
}

function AudienceSelector({ show, onSelect, t }: AudienceSelectorProps) {
  const dialogRef = useFocusTrap(show);
  if (!show) return null;

  const profiles = [
    { id: "criancas" as Audience, icon: "🎈", title: t.children, desc: t.childrenDesc },
    { id: "jovens" as Audience, icon: "📱", title: t.youth, desc: t.youthDesc },
    { id: "adultos" as Audience, icon: "👨‍👩‍👧‍👦", title: t.adults, desc: t.adultsDesc },
  ];

  return (
    <div ref={dialogRef} className="fixed inset-0 z-[60] bg-primary/40 flex items-center justify-center p-4 md:p-6 backdrop-blur-xl overflow-y-auto" role="dialog" aria-modal="true" aria-label={t.selectProfile}>
      <div className="max-w-5xl w-full text-center py-4 md:py-0">
        <div className="mb-6 md:mb-12 animate-float">
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-heading font-bold mb-2 md:mb-4 text-white drop-shadow-lg">{t.welcomeTitle}</h2>
          <p className="text-lg md:text-2xl mb-6 md:mb-12 text-white/90 font-light">{t.welcomeSubtitle}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-8">
          {profiles.map((p) => (
            <button
              key={p.id}
              onClick={() => onSelect(p.id)}
              className="bg-white/90 hover:bg-white p-6 md:p-10 rounded-[2rem] md:rounded-[2.5rem] hover:scale-105 transition-all shadow-2xl group border-4 border-transparent hover:border-secondary"
              aria-label={`${t.selectProfile} ${p.title}`}
            >
              <div className="text-5xl md:text-7xl mb-3 md:mb-6 group-hover:scale-110 transition-transform" role="img" aria-hidden="true">{p.icon}</div>
              <h3 className="text-xl md:text-3xl font-heading font-bold mb-2 md:mb-3 text-primary">{p.title}</h3>
              <p className="text-gray-500 dark:text-gray-400 leading-relaxed text-sm md:text-base">{p.desc}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function TabContent({ activeTab, audience, setActiveTab, onBookmark, isBookmarked }: TabContentProps) {
  const podcastCtx = usePodcast();
  const doubtsCtx = useDoubts();

  switch (activeTab) {
    case "home":
      return <HomeTab audience={audience} setActiveTab={setActiveTab} />;
    case "podcast":
      return (
        <PodcastTab
          episodes={podcastCtx.episodes}
          setEpisodes={podcastCtx.setEpisodes}
          podcastLoading={podcastCtx.podcastLoading}
          setPodcastLoading={podcastCtx.setPodcastLoading}
          playingEpisode={podcastCtx.playingEpisode}
          setPlayingEpisode={podcastCtx.setPlayingEpisode}
        />
      );
    case "ferramentas":
      return <ToolsTab audience={audience} onBookmark={onBookmark} isBookmarked={isBookmarked} initialSubTool="comparator" />;
    case "recursos":
      return <ResourcesTab audience={audience} onBookmark={onBookmark} isBookmarked={isBookmarked} initialSubTab="guias" />;
    case "glossario":
      return <ResourcesTab audience={audience} onBookmark={onBookmark} isBookmarked={isBookmarked} initialSubTab="glossario" />;
    case "faq":
      return <ResourcesTab audience={audience} onBookmark={onBookmark} isBookmarked={isBookmarked} initialSubTab="faq" />;
    case "quiz":
      return <ToolsTab audience={audience} onBookmark={onBookmark} isBookmarked={isBookmarked} initialSubTool="quiz" />;
    case "direitos":
      return <RightsTab audience={audience} onBookmark={onBookmark} isBookmarked={isBookmarked} initialSection="helplines" />;
    case "duvidas":
      return <RightsTab audience={audience} onBookmark={onBookmark} isBookmarked={isBookmarked} initialSection="duvidas" />;
  }
}

export default function Home() {
  const { locale, setLocale, t } = useI18n();
  const [activeTab, setActiveTab] = useState<TabId>("home");
  const [audience, setAudienceState] = useState<Audience>("jovens");
  const [showAudienceSelector, setShowAudienceSelector] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [bookmarks, setBookmarks] = useState<BookmarkItem[]>([]);
  const [bookmarksModalOpen, setBookmarksModalOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);

  const { helpOpen, setHelpOpen } = useKeyboardShortcuts({
    activeTab,
    setActiveTab,
    showAudienceSelector,
    setShowAudienceSelector,
    setMobileMenuOpen,
  });

  const shortcutsDialogRef = useFocusTrap(helpOpen);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchModalOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    setDarkMode(document.documentElement.classList.contains("dark"));
    const saved = localStorage.getItem("edusexual-audience");
    if (saved && ["criancas", "jovens", "adultos"].includes(saved)) {
      setAudienceState(saved as Audience);
      setShowAudienceSelector(false);
    }

    try {
      const savedBookmarks = localStorage.getItem("edusexual_bookmarks");
      if (savedBookmarks) {
        setBookmarks(JSON.parse(savedBookmarks));
      }
    } catch {
      // ignore
    }

    const onScroll = () => setShowScrollTop(window.scrollY > 500);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleBookmark = (item: BookmarkItem) => {
    setBookmarks((prev) => {
      const exists = prev.some((b) => b.id === item.id);
      let updated: BookmarkItem[];
      if (exists) {
        updated = prev.filter((b) => b.id !== item.id);
      } else {
        updated = [item, ...prev];
      }
      try {
        localStorage.setItem("edusexual_bookmarks", JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const removeBookmark = (id: string) => {
    setBookmarks((prev) => {
      const updated = prev.filter((b) => b.id !== id);
      try {
        localStorage.setItem("edusexual_bookmarks", JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const isBookmarked = (id: string) => bookmarks.some((b) => b.id === id);

  const setAudience = (a: Audience) => {
    setAudienceState(a);
    localStorage.setItem("edusexual-audience", a);
  };

  const toggleDarkMode = () => {
    const next = !darkMode;
    setDarkMode(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("edusexual-theme", next ? "dark" : "light");
  };

  const selectAudience = (newAudience: Audience) => {
    setAudience(newAudience);
    setShowAudienceSelector(false);
    setActiveTab("home");
  };

  return (
    <PodcastProvider>
      <DoubtsProvider>
        <div className="min-h-screen bg-background flex flex-col">
          <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:bg-primary focus:text-white focus:px-4 focus:py-2 focus:rounded-lg">
            {t.skipToContent}
          </a>

          <HeaderNav
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            locale={locale}
            setLocale={setLocale}
            darkMode={darkMode}
            toggleDarkMode={toggleDarkMode}
            setShowAudienceSelector={setShowAudienceSelector}
            mobileMenuOpen={mobileMenuOpen}
            setMobileMenuOpen={setMobileMenuOpen}
            bookmarksCount={bookmarks.length}
            onOpenBookmarks={() => setBookmarksModalOpen(true)}
            onOpenSearch={() => setSearchModalOpen(true)}
            t={t}
          />

          <AudienceSelector
            show={showAudienceSelector}
            onSelect={selectAudience}
            t={t}
          />

          <BookmarksModal
            isOpen={bookmarksModalOpen}
            onClose={() => setBookmarksModalOpen(false)}
            bookmarks={bookmarks}
            onRemoveBookmark={removeBookmark}
            onNavigateTab={setActiveTab}
          />

          <GlobalSearchModal
            isOpen={searchModalOpen}
            onClose={() => setSearchModalOpen(false)}
            onNavigateTab={setActiveTab}
          />

          {helpOpen && (
            <div
              ref={shortcutsDialogRef}
              className="fixed inset-0 z-[70] bg-black/50 flex items-center justify-center p-4"
              role="dialog"
              aria-label={t.shortcutsTitle}
              onClick={() => setHelpOpen(false)}
            >
              <div
                className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-md w-full shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <h2 className="text-xl font-heading font-bold mb-4 text-primary">⌨️ {t.shortcutsTitle}</h2>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between"><kbd className="bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded font-mono">H</kbd><span>{t.shortcutHome}</span></div>
                  <div className="flex justify-between"><kbd className="bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded font-mono">P</kbd><span>{t.shortcutPodcast}</span></div>
                  <div className="flex justify-between"><kbd className="bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded font-mono">R</kbd><span>{t.shortcutResources}</span></div>
                  <div className="flex justify-between"><kbd className="bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded font-mono">Q</kbd><span>{t.shortcutQuiz}</span></div>
                  <div className="flex justify-between"><kbd className="bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded font-mono">F</kbd><span>{t.shortcutSearch}</span></div>
                  <div className="flex justify-between"><kbd className="bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded font-mono">1-9</kbd><span>{t.shortcutNavigateTabs}</span></div>
                  <div className="flex justify-between"><kbd className="bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded font-mono">?</kbd><span>{t.shortcutToggleHelp}</span></div>
                  <div className="flex justify-between"><kbd className="bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded font-mono">Esc</kbd><span>{t.shortcutClose}</span></div>
                </div>
                <button
                  onClick={() => setHelpOpen(false)}
                  className="mt-6 w-full py-2 bg-primary text-white rounded-xl font-bold hover:bg-primary/90 transition"
                >
                  {t.shortcutClose}
                </button>
              </div>
            </div>
          )}

          <main id="main-content" aria-labelledby={`tab-${activeTab}`} className="max-w-6xl mx-auto px-4 md:px-6 py-6 md:py-8 flex-1 w-full">
            <ErrorBoundary>
              <Suspense fallback={<TabSkeleton />}>
                <TabContent
                  activeTab={activeTab}
                  audience={audience}
                  setActiveTab={setActiveTab}
                  onBookmark={toggleBookmark}
                  isBookmarked={isBookmarked}
                />
              </Suspense>
            </ErrorBoundary>
          </main>

          <footer role="contentinfo" className="bg-gray-800 dark:bg-gray-950 text-white py-8 md:py-12 mt-auto">
            <div className="max-w-6xl mx-auto px-4 md:px-6">
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-8">
                <div>
                  <h4 className="font-heading font-bold text-lg mb-3">EduSexual PT</h4>
                  <p className="text-gray-300 text-sm leading-relaxed">{t.footerAbout}</p>
                </div>
                <nav aria-label={t.navigate}>
                  <h4 className="font-heading font-bold text-lg mb-3">{t.navigate}</h4>
                  <ul className="space-y-1.5 text-sm text-gray-300">
                    <li><button onClick={() => setActiveTab("home")} className="hover:text-white transition">{t.home}</button></li>
                    <li><button onClick={() => setActiveTab("podcast")} className="hover:text-white transition">{t.tabPodcast || "Podcast"}</button></li>
                    <li><button onClick={() => setActiveTab("ferramentas")} className="hover:text-white transition">{t.tabTools || "Ferramentas"}</button></li>
                    <li><button onClick={() => setActiveTab("glossario")} className="hover:text-white transition">{t.tabGlossary || "Glossário"}</button></li>
                    <li><button onClick={() => setActiveTab("direitos")} className="hover:text-white transition">{t.tabRights || "Linhas & Direitos"}</button></li>
                  </ul>
                </nav>
                <nav aria-label="Conteúdos e Interação">
                  <h4 className="font-heading font-bold text-lg mb-3">Explorar</h4>
                  <ul className="space-y-1.5 text-sm text-gray-300">
                    <li><button onClick={() => setActiveTab("recursos")} className="hover:text-white transition">{t.tabResources || t.resourcesTitle}</button></li>
                    <li><button onClick={() => setActiveTab("quiz")} className="hover:text-white transition">{t.tabQuiz || "Quiz"}</button></li>
                    <li><button onClick={() => setActiveTab("faq")} className="hover:text-white transition">{t.tabFaq || "FAQ"}</button></li>
                    <li><button onClick={() => setActiveTab("duvidas")} className="hover:text-white transition">{t.askQuestion}</button></li>
                    <li><button onClick={() => setShowAudienceSelector(true)} className="hover:text-white transition">{t.changeProfile}</button></li>
                  </ul>
                </nav>
                <div>
                  <h4 className="font-heading font-bold text-lg mb-3">{t.officialSources}</h4>
                  <ul className="space-y-1.5 text-sm text-gray-300">
                    <li><a href="https://apf.pt" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">APF — Planeamento da Família</a></li>
                    <li><a href="https://dgs.pt" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">DGS — Direção-Geral da Saúde</a></li>
                    <li><a href="https://sns24.gov.pt" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">SNS 24 (808 24 24 24)</a></li>
                    <li><a href="https://ipdj.gov.pt" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">IPDJ — Sexualidade em Linha</a></li>
                    <li><a href="https://who.int" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">OMS — Organização Mundial de Saúde</a></li>
                  </ul>
                </div>
              </div>
              <div className="border-t border-gray-700 pt-6 flex flex-col sm:flex-row justify-between items-center gap-2">
                <p className="text-gray-300 text-xs">{t.footerCopyright}</p>
                <p className="text-gray-300 text-xs">{t.footerDisclaimer}</p>
              </div>
            </div>
          </footer>

          {showScrollTop && (
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="fixed bottom-6 right-6 z-50 bg-primary text-white w-12 h-12 rounded-full shadow-lg hover:bg-primary/90 transition flex items-center justify-center text-xl no-print"
              aria-label={t.scrollToTop}
            >
              ↑
            </button>
          )}
        </div>
      </DoubtsProvider>
    </PodcastProvider>
  );
}
