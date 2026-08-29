"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import { Topic } from "@/data/content-types";
import { loadTopicsByAudience } from "@/data/content-topics";
import { useI18n } from "@/i18n/context";
import AudioPlayer, { LazyAudioPlayer } from "@/components/AudioPlayer";
import { LazySection } from "@/components/LazySection";
import { Audience, TabId } from "@/types";

interface HomeTabProps {
  audience: Audience;
  setActiveTab?: (tab: TabId) => void;
}

const FAVORITES_KEY = "edusexual:favorites";

function loadFavorites(): Set<string> {
  if (typeof window === "undefined") return new Set();
  try {
    const raw = window.localStorage.getItem(FAVORITES_KEY);
    if (!raw) return new Set();
    const arr = JSON.parse(raw);
    return Array.isArray(arr) ? new Set(arr.filter((x) => typeof x === "string")) : new Set();
  } catch {
    return new Set();
  }
}

export default function HomeTab({ audience, setActiveTab }: HomeTabProps) {
  const { t } = useI18n();
  const [searchQuery, setSearchQuery] = useState("");
  const [topics, setTopics] = useState<Topic[]>([]);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState<Set<string>>(() => loadFavorites());
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    loadTopicsByAudience(audience).then((loaded) => {
      if (!cancelled) {
        setTopics(loaded);
        setLoading(false);
      }
    });
    return () => { cancelled = true; };
  }, [audience]);

  useEffect(() => {
    try {
      window.localStorage.setItem(FAVORITES_KEY, JSON.stringify([...favorites]));
    } catch {
      /* armazenamento indisponível — ignora */
    }
  }, [favorites]);

  const toggleFavorite = useCallback((id: string) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const heroImage = "/hero.png";

  const filteredTopics = useMemo(() => {
    let base = topics;
    if (showFavoritesOnly) base = base.filter((topic) => favorites.has(topic.id));
    if (!searchQuery.trim()) return base;
    const q = searchQuery.toLowerCase();
    return base.filter(topic =>
      topic.title.toLowerCase().includes(q) ||
      topic.description.toLowerCase().includes(q) ||
      topic.articles.some(a => a.title.toLowerCase().includes(q))
    );
  }, [topics, searchQuery, showFavoritesOnly, favorites]);

  if (loading) {
    return (
      <div className="space-y-12 md:space-y-20">
        <section aria-labelledby="hero-heading">
          <div className="relative overflow-hidden rounded-[2rem] md:rounded-[3rem] bg-primary/5 dark:bg-primary/10 p-6 md:p-16 hero-gradient">
            <div className="flex flex-col lg:flex-row items-center gap-8 md:gap-12">
              <div className="flex-1 text-center lg:text-left z-10">
                <div className="inline-block px-4 py-1 rounded-full bg-secondary/10 text-secondary font-bold text-sm mb-4 md:mb-6 uppercase tracking-widest">
                  {t.portalLabel}
                </div>
                <h2 id="hero-heading" className="text-3xl md:text-5xl lg:text-7xl font-heading font-bold text-primary mb-4 md:mb-6 leading-tight">
                  {audience === 'criancas' ? t.heroTitleCrianca :
                  audience === 'adultos' ? t.heroTitleAdulto :
                  t.heroTitleJovem}
                </h2>
                <p className="text-base md:text-xl text-gray-600 dark:text-gray-300 mb-6 md:mb-10 leading-relaxed max-w-xl mx-auto lg:mx-0">
                  {audience === 'criancas' ? t.heroDescCrianca :
                  audience === 'adultos' ? t.heroDescAdulto :
                  t.heroDescJovem}
                </p>
                {setActiveTab && (
                  <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                    <button onClick={() => setActiveTab("quiz")} className="btn-primary">{t.startQuiz}</button>
                    <button onClick={() => setActiveTab("duvidas")} className="btn-secondary">{t.askQuestion}</button>
                  </div>
                )}
              </div>
              <div className="flex-1 relative max-w-md lg:max-w-none">
                <div className="absolute inset-0 bg-primary/10 blur-[100px] rounded-full" aria-hidden="true"></div>
                <img
                  src={heroImage}
                  alt=""
                  aria-hidden="true"
                  loading="lazy"
                  className="relative z-10 rounded-3xl shadow-2xl animate-float w-full"
                />
              </div>
            </div>
          </div>
        </section>

        <section aria-labelledby="topics-heading">
          <div className="text-center mb-8 md:mb-12">
            <h3 id="topics-heading" className="text-2xl md:text-4xl font-heading font-bold text-primary mb-3 md:mb-4">
              {t.exploreTopics}
            </h3>
            <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto text-sm md:text-base">{t.exploreTopicsDesc}</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="card animate-pulse">
                <div className="bg-gray-200 dark:bg-gray-700 w-14 h-14 md:w-16 md:h-16 rounded-2xl mb-4 md:mb-6"></div>
                <div className="bg-gray-200 dark:bg-gray-700 h-6 w-3/4 rounded mb-2 md:mb-3"></div>
                <div className="bg-gray-200 dark:bg-gray-700 h-4 w-full rounded mb-2"></div>
                <div className="bg-gray-200 dark:bg-gray-700 h-4 w-2/3 rounded"></div>
              </div>
            ))}
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="space-y-12 md:space-y-20">
      <section aria-labelledby="hero-heading">
        <div className="relative overflow-hidden rounded-[2rem] md:rounded-[3rem] bg-primary/5 dark:bg-primary/10 p-6 md:p-16 hero-gradient">
          <div className="flex flex-col lg:flex-row items-center gap-8 md:gap-12">
            <div className="flex-1 text-center lg:text-left z-10">
              <div className="inline-block px-4 py-1 rounded-full bg-secondary/10 text-secondary font-bold text-sm mb-4 md:mb-6 uppercase tracking-widest">
                {t.portalLabel}
              </div>
              <h2 id="hero-heading" className="text-3xl md:text-5xl lg:text-7xl font-heading font-bold text-primary mb-4 md:mb-6 leading-tight">
                {audience === 'criancas' ? t.heroTitleCrianca :
                audience === 'adultos' ? t.heroTitleAdulto :
                t.heroTitleJovem}
              </h2>
              <p className="text-base md:text-xl text-gray-600 dark:text-gray-300 mb-6 md:mb-10 leading-relaxed max-w-xl mx-auto lg:mx-0">
                {audience === 'criancas' ? t.heroDescCrianca :
                audience === 'adultos' ? t.heroDescAdulto :
                t.heroDescJovem}
              </p>
              {setActiveTab && (
                <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                  <button onClick={() => setActiveTab("quiz")} className="btn-primary">{t.startQuiz}</button>
                  <button onClick={() => setActiveTab("duvidas")} className="btn-secondary">{t.askQuestion}</button>
                </div>
              )}
            </div>
            <div className="flex-1 relative max-w-md lg:max-w-none">
              <div className="absolute inset-0 bg-primary/10 blur-[100px] rounded-full" aria-hidden="true"></div>
              <img
                src={heroImage}
                alt=""
                aria-hidden="true"
                loading="lazy"
                className="relative z-10 rounded-3xl shadow-2xl animate-float w-full"
              />
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="topics-heading">
          <div className="text-center mb-8 md:mb-12">
            <h3 id="topics-heading" className="text-2xl md:text-4xl font-heading font-bold text-primary mb-3 md:mb-4">
              {t.exploreTopics}
            </h3>
            <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto text-sm md:text-base">{t.exploreTopicsDesc}</p>
            <div className="flex flex-col items-center gap-4 mt-4 md:mt-6">
              <div className="max-w-md w-full">
                <div className="relative">
                  <input
                    type="search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={t.searchTopics}
                    className="w-full p-3 md:p-4 pl-12 rounded-full border-2 border-gray-100 dark:border-gray-600 dark:bg-gray-800 focus:border-primary outline-none transition text-sm md:text-base"
                    aria-label={t.searchTopics}
                  />
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg" role="img" aria-hidden="true">🔍</span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowFavoritesOnly((v) => !v)}
                aria-pressed={showFavoritesOnly}
                className={`btn-secondary text-sm ${showFavoritesOnly ? "ring-2 ring-secondary" : ""}`}
              >
                {showFavoritesOnly ? t.showAllTopics : t.showFavorites}
                {favorites.size > 0 && (
                  <span className="ml-2 inline-flex items-center justify-center min-w-[1.25rem] h-5 px-1 rounded-full bg-secondary text-white text-xs font-bold" aria-hidden="true">
                    {favorites.size}
                  </span>
                )}
              </button>
            </div>
          </div>

          {showFavoritesOnly && (
            <div className="max-w-2xl mx-auto mb-6 text-center" aria-live="polite">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {t.favoritesTitle} ({favorites.size} {t.favoritesCount})
              </p>
            </div>
          )}

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
          {filteredTopics.length === 0 && searchQuery.trim() ? (
            <div className="sm:col-span-2 lg:col-span-3 text-center py-12 text-gray-500 dark:text-gray-400" role="status" aria-live="polite">
              <p className="text-lg mb-2">{t.noTopicsFound} &ldquo;{searchQuery}&rdquo;</p>
              <p className="text-sm">{t.tryOtherTerms}</p>
            </div>
          ) : filteredTopics.length === 0 && showFavoritesOnly ? (
            <div className="sm:col-span-2 lg:col-span-3 text-center py-12 text-gray-500 dark:text-gray-400">
              <p className="text-lg mb-2">{t.noFavorites}</p>
            </div>
          ) : filteredTopics.map((topic) => {
            const isFav = favorites.has(topic.id);
            return (
            <LazySection key={topic.id} title={topic.title}>
              <div className="card group hover:border-primary">
                <div className="flex items-start justify-between gap-3">
                  <div className="bg-primary/5 dark:bg-primary/20 w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center text-3xl md:text-4xl mb-4 md:mb-6 group-hover:bg-primary group-hover:text-white transition-all duration-500" role="img" aria-hidden="true">
                    {topic.id === 'anatomia-jovens' ? '🧬' : topic.icon}
                  </div>
                  <button
                    type="button"
                    onClick={() => toggleFavorite(topic.id)}
                    aria-pressed={isFav}
                    aria-label={isFav ? t.removeFromFavorites : t.addToFavorites}
                    className={`shrink-0 text-2xl leading-none p-1 rounded-lg focus-visible:ring-2 focus-visible:ring-primary transition ${isFav ? "text-secondary" : "text-gray-300 hover:text-secondary"}`}
                  >
                    {isFav ? "★" : "☆"}
                  </button>
                </div>
                <h4 className="text-lg md:text-2xl font-heading font-bold mb-2 md:mb-3 text-primary">{topic.title}</h4>
                <p className="text-gray-500 dark:text-gray-400 mb-4 md:mb-6 line-clamp-2 leading-relaxed text-sm md:text-base">{topic.description}</p>

                {topic.audioUrl && (
                  <LazyAudioPlayer src={topic.audioUrl} title={topic.title} loadLabel={t.loadAudio} />
                )}

                <div className="space-y-3">
                  {topic.articles.map((article) => (
                    <details key={article.id} className="group border-t border-gray-50 dark:border-gray-700 pt-3">
                      <summary className="cursor-pointer text-primary hover:text-secondary text-sm font-bold flex items-center justify-between list-none focus-visible:ring-2 focus-visible:ring-primary rounded-lg px-1 py-0.5">
                        <span className="flex items-center gap-2">
                          <span role="img" aria-hidden="true">📄</span>
                          {article.title}
                        </span>
                        <span className="text-xs opacity-50 group-open:rotate-180 transition-transform" aria-hidden="true">▼</span>
                      </summary>
                      <div className="mt-4 p-4 md:p-5 bg-gray-50 dark:bg-gray-700/50 rounded-2xl text-sm text-gray-700 dark:text-gray-300 whitespace-pre-line leading-relaxed shadow-inner">
                        {article.audioUrl && (
                          <LazyAudioPlayer src={article.audioUrl} title={article.title} loadLabel={t.loadAudio} />
                        )}
                        {article.content}
                      </div>
                    </details>
                  ))}
                </div>
              </div>
            </LazySection>
            );
          })}
        </div>
      </section>
    </div>
  );
}
