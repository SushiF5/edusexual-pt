"use client";

import { useState, useEffect } from "react";
import StitchLayout from "@/components/StitchLayout";
import { useI18n } from "@/i18n/context";
import { Locale, localeNames, locales } from "@/i18n/translations";
import HomeTab from "@/components/HomeTab";
import QuizTab from "@/components/QuizTab";
import FaqTab from "@/components/FaqTab";
import DoubtsTab from "@/components/DoubtsTab";
import PodcastTab from "@/components/PodcastTab";
import ResourcesTab from "@/components/ResourcesTab";

type Audience = "criancas" | "jovens" | "adultos";

const navTabIds = [
  { id: "home", icon: "🏠" },
  { id: "podcast", icon: "🎙️" },
  { id: "recursos", icon: "📋" },
  { id: "quiz", icon: "🧠" },
  { id: "faq", icon: "❓" },
  { id: "duvidas", icon: "💬" },
] as const;

export default function Home() {
  const { locale, setLocale, t } = useI18n();
  const [activeTab, setActiveTab] = useState<"home" | "podcast" | "recursos" | "quiz" | "faq" | "duvidas">("home");
  const [audience, setAudienceState] = useState<Audience>("jovens");
  const [showAudienceSelector, setShowAudienceSelector] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    setDarkMode(document.documentElement.classList.contains("dark"));
    const savedAudience = localStorage.getItem("edusexual-audience") as Audience | null;
    if (savedAudience && ["criancas", "jovens", "adultos"].includes(savedAudience)) {
      setAudienceState(savedAudience);
      setShowAudienceSelector(false);
    }
  }, []);

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

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), 4000);
    return () => clearTimeout(timer);
  }, [toast]);

  const [stitchLayout, setStitchLayout] = useState<{ htmlUrl: string } | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const [questionForm, setQuestionForm] = useState({ name: "", question: "" });
  const [submitted, setSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const [episodes, setEpisodes] = useState<{ title: string; description: string; link: string; pubDate: string; duration: string; episode: number | null; season: number | null; image: string | null; audioUrl: string; }[]>([]);
  const [podcastLoading, setPodcastLoading] = useState(false);
  const [playingEpisode, setPlayingEpisode] = useState<{ title: string; description: string; link: string; pubDate: string; duration: string; episode: number | null; season: number | null; image: string | null; audioUrl: string; } | null>(null);

  const [searchQuery, setSearchQuery] = useState("");

  const selectAudience = (newAudience: Audience) => {
    setAudience(newAudience);
    setShowAudienceSelector(false);
    setActiveTab("home");
  };

  return (
    <div className="min-h-screen bg-background">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:bg-primary focus:text-white focus:px-4 focus:py-2 focus:rounded-lg">
        {t.skipToContent}
      </a>

      {toast && (
        <div className="fixed top-4 right-4 z-[200] bg-red-600 text-white px-6 py-3 rounded-2xl shadow-2xl font-semibold text-sm animate-[slideIn_0.3s_ease-out]" role="alert" onClick={() => setToast(null)}>
          {toast}
        </div>
      )}

      {stitchLayout && (
        <StitchLayout
          htmlUrl={stitchLayout.htmlUrl}
          onClose={() => {
            setStitchLayout(null);
            setIsGenerating(false);
          }}
        />
      )}

      {/* Header */}
      <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-800 py-3 px-4 md:px-6 sticky top-0 z-50 transition-all relative">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          <button
            onClick={() => setShowAudienceSelector(true)}
            className="flex items-center gap-2 hover:opacity-80 transition group shrink-0"
            aria-label={t.changeProfile}
          >
            <div className="bg-primary/10 p-1.5 md:p-2 rounded-xl group-hover:bg-primary group-hover:text-white transition-colors">
              <span className="text-lg md:text-2xl">🧠</span>
            </div>
            <div className="text-left hidden sm:block">
              <h1 className="text-base md:text-xl font-heading font-bold text-primary leading-tight">EduSexual PT</h1>
              <span className="text-[9px] md:text-[10px] uppercase tracking-widest font-bold text-gray-400 dark:text-gray-500">{t.profile}: {audience === 'criancas' ? t.children : audience === 'adultos' ? t.adults : t.youth}</span>
            </div>
          </button>

          {/* Desktop nav */}
          <nav className="hidden md:flex bg-gray-100 dark:bg-gray-800 p-2 rounded-full gap-2 shadow-sm" aria-label={t.navigate}>
            {navTabIds.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-6 py-2 rounded-full transition-all duration-300 font-medium ${activeTab === tab.id ? "bg-primary text-white shadow-md" : "text-gray-600 dark:text-gray-300 hover:text-primary hover:bg-white dark:hover:bg-gray-700"}`}
                aria-current={activeTab === tab.id ? "page" : undefined}
              >
                {tab.id === "duvidas" ? t.askQuestion : tab.id === "faq" ? "FAQ" : tab.id === "recursos" ? t.resourcesTitle : tab.id === "podcast" ? "Podcast" : tab.id === "quiz" ? "Quiz" : t.home}
              </button>
            ))}
          </nav>

          {/* Mobile hamburger */}
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

          {/* Desktop: Language + Dark Mode + Change Profile */}
          <div className="hidden md:flex items-center gap-2">
            <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-full p-1 gap-0.5" role="radiogroup" aria-label="Language">
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
              {darkMode ? "☀️" : "🌙"}
            </button>
            <button
              onClick={() => setShowAudienceSelector(true)}
              className="btn-primary text-xs md:text-sm py-2 px-3 md:px-6"
            >
              {t.changeProfile}
            </button>
          </div>
        </div>

        {/* Mobile dropdown menu */}
        {mobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-white dark:bg-gray-900 shadow-lg md:hidden z-50 border-t dark:border-gray-800">
            {navTabIds.map((tab) => (
              <button
                key={tab.id}
                onClick={() => { setActiveTab(tab.id as any); setMobileMenuOpen(false); }}
                className={`w-full text-left px-6 py-4 border-b border-gray-100 dark:border-gray-800 transition flex items-center gap-3 ${activeTab === tab.id ? "bg-primary text-white font-bold" : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"}`}
              >
                <span>{tab.icon}</span>
                {tab.id === "duvidas" ? t.askQuestion : tab.id === "faq" ? "FAQ" : tab.id === "recursos" ? t.resourcesTitle : tab.id === "podcast" ? "Podcast" : tab.id === "quiz" ? "Quiz" : t.home}
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
              <span>🔄</span>
              {t.changeProfile}
            </button>
            <button
              onClick={() => { toggleDarkMode(); setMobileMenuOpen(false); }}
              className="w-full text-left px-6 py-4 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 flex items-center gap-3"
            >
              <span>{darkMode ? "☀️" : "🌙"}</span>
              {darkMode ? t.lightMode : t.darkMode}
            </button>
          </div>
        )}
      </header>

      {/* Audience Selector Modal */}
      {showAudienceSelector && (
        <div className="fixed inset-0 z-[60] bg-primary/40 flex items-center justify-center p-4 md:p-6 backdrop-blur-xl overflow-y-auto" role="dialog" aria-modal="true" aria-label={t.selectProfile}>
          <div className="max-w-5xl w-full text-center py-4 md:py-0">
            <div className="mb-6 md:mb-12 animate-float">
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-heading font-bold mb-2 md:mb-4 text-white drop-shadow-lg">{t.welcomeTitle}</h2>
              <p className="text-lg md:text-2xl mb-6 md:mb-12 text-white/90 font-light">{t.welcomeSubtitle}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-8">
              {[
                { id: "criancas", icon: "🎈", title: t.children, desc: t.childrenDesc },
                { id: "jovens", icon: "📱", title: t.youth, desc: t.youthDesc },
                { id: "adultos", icon: "👨‍👩‍👧‍👦", title: t.adults, desc: t.adultsDesc }
              ].map((p) => (
                <button
                  key={p.id}
                  onClick={() => selectAudience(p.id as Audience)}
                  className="bg-white/90 hover:bg-white p-6 md:p-10 rounded-[2rem] md:rounded-[2.5rem] hover:scale-105 transition-all shadow-2xl group border-4 border-transparent hover:border-secondary"
                  aria-label={`${t.selectProfile} ${p.title}`}
                >
                  <div className="text-5xl md:text-7xl mb-3 md:mb-6 group-hover:scale-110 transition-transform">{p.icon}</div>
                  <h3 className="text-xl md:text-3xl font-heading font-bold mb-2 md:mb-3 text-primary">{p.title}</h3>
                  <p className="text-gray-500 dark:text-gray-400 leading-relaxed text-sm md:text-base">{p.desc}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <main id="main-content" className="max-w-6xl mx-auto px-4 md:px-6 py-6 md:py-8">
        {/* HOME TAB */}
        {activeTab === "home" && (
          <HomeTab
            audience={audience}
            setActiveTab={setActiveTab}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        )}

        {/* PODCAST TAB */}
        {activeTab === "podcast" && (
          <PodcastTab
            episodes={episodes}
            setEpisodes={setEpisodes}
            podcastLoading={podcastLoading}
            setPodcastLoading={setPodcastLoading}
            playingEpisode={playingEpisode}
            setPlayingEpisode={setPlayingEpisode}
          />
        )}

        {/* RECURSOS TAB */}
        {activeTab === "recursos" && (
          <ResourcesTab audience={audience} />
        )}

        {/* QUIZ TAB */}
        {activeTab === "quiz" && (
          <QuizTab audience={audience} />
        )}

        {/* FAQ TAB */}
        {activeTab === "faq" && (
          <FaqTab audience={audience} />
        )}

        {/* DUVIDAS TAB */}
        {activeTab === "duvidas" && (
          <DoubtsTab
            audience={audience}
            submitted={submitted}
            setSubmitted={setSubmitted}
            questionForm={questionForm}
            setQuestionForm={setQuestionForm}
            isSending={isSending}
            setIsSending={setIsSending}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 dark:bg-gray-950 text-white py-8 md:py-12 mt-auto">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-8">
            <div>
              <h4 className="font-heading font-bold text-lg mb-3">EduSexual PT</h4>
              <p className="text-gray-400 text-sm leading-relaxed">{t.footerAbout}</p>
            </div>
            <div>
              <h4 className="font-heading font-bold text-lg mb-3">{t.navigate}</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><button onClick={() => setActiveTab("home")} className="hover:text-white transition">{t.home}</button></li>
                <li><button onClick={() => setActiveTab("podcast")} className="hover:text-white transition">Podcast</button></li>
                <li><button onClick={() => setActiveTab("recursos")} className="hover:text-white transition">{t.resourcesTitle}</button></li>
                <li><button onClick={() => setActiveTab("quiz")} className="hover:text-white transition">Quiz</button></li>
                <li><button onClick={() => setActiveTab("faq")} className="hover:text-white transition">FAQ</button></li>
                <li><button onClick={() => setActiveTab("duvidas")} className="hover:text-white transition">{t.askQuestion}</button></li>
                <li><button onClick={() => setShowAudienceSelector(true)} className="hover:text-white transition">{t.changeProfile}</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-heading font-bold text-lg mb-3">{t.officialSources}</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="https://apf.pt" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">APF — Planeamento da Família</a></li>
                <li><a href="https://dgs.pt" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">DGS — Direção-Geral da Saúde</a></li>
                <li><a href="https://dge.mec.pt" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">DGE — Direção-Geral da Educação</a></li>
                <li><a href="https://who.int" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">OMS — Organização Mundial de Saúde</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-6 flex flex-col sm:flex-row justify-between items-center gap-2">
            <p className="text-gray-500 text-xs">{t.footerCopyright}</p>
            <p className="text-gray-600 text-xs">{t.footerDisclaimer}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
