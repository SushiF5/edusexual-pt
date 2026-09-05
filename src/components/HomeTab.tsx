"use client";

import { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import { loadTopicsByAudience } from "@/data/content-topics";
import { useI18n } from "@/i18n/context";
import { LazyAudioPlayer } from "@/components/AudioPlayer";
import { LazySection } from "@/components/LazySection";
import { Audience, TabId } from "@/types";
import { Topic } from "@/data/content-types";

const HERO_IMAGES: Record<Audience, string> = {
  criancas: "/hero-criancas.jpg",
  jovens: "/hero-jovens.jpg",
  adultos: "/hero-adultos.jpg",
};

interface HomeTabProps {
  audience: Audience;
  setActiveTab?: (tab: TabId) => void;
}

export default function HomeTab({ audience, setActiveTab }: HomeTabProps) {
  const { t } = useI18n();
  const [searchQuery, setSearchQuery] = useState("");
  const [topics, setTopics] = useState<Topic[]>([]);
  const [loading, setLoading] = useState(true);

  const heroImage = HERO_IMAGES[audience];

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

  const filteredTopics = useMemo(() => {
    if (!searchQuery.trim()) return topics;
    const q = searchQuery.toLowerCase();
    return topics.filter((topic: Topic) =>
      topic.title.toLowerCase().includes(q) ||
      topic.description.toLowerCase().includes(q) ||
      topic.articles.some((a: { title: string }) => a.title.toLowerCase().includes(q))
    );
  }, [topics, searchQuery]);

  if (loading) {
    return (
      <div className="space-y-12 md:space-y-16">
        {/* Hero Section */}
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
                  <div className="flex flex-wrap justify-center lg:justify-start gap-3">
                    <button onClick={() => setActiveTab("ferramentas")} className="btn-primary shadow-lg">
                      ⚡ {t.tabTools || "Ferramentas Interativas"}
                    </button>
                    <button onClick={() => setActiveTab("quiz")} className="btn-secondary">
                      🧠 {t.startQuiz}
                    </button>
                    <button onClick={() => setActiveTab("direitos")} className="px-5 py-2.5 rounded-full border-2 border-primary text-primary dark:text-primary-light font-bold hover:bg-primary/10 transition text-sm">
                      📞 {t.tabRights || "Linhas de Apoio"}
                    </button>
                  </div>
                )}
              </div>
              <div className="flex-1 relative max-w-md lg:max-w-none">
                <div className="absolute inset-0 bg-primary/10 blur-[100px] rounded-full" aria-hidden="true"></div>
                <Image
                  src={heroImage}
                  alt=""
                  aria-hidden="true"
                  width={1024}
                  height={1024}
                  priority
                  className="relative z-10 rounded-3xl shadow-2xl animate-float w-full h-auto"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Loading skeleton for topics */}
        <section aria-labelledby="topics-heading">
          <div className="text-center mb-8 md:mb-12">
            <h3 id="topics-heading" className="text-2xl md:text-4xl font-heading font-bold text-primary mb-3 md:mb-4">
              {t.exploreTopics}
            </h3>
            <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto text-sm md:text-base">{t.exploreTopicsDesc}</p>
            <div className="max-w-md mx-auto mt-4 md:mt-6">
              <div className="relative">
                <input
                  type="search"
                  disabled
                  placeholder={t.searchTopics}
                  className="w-full p-3 md:p-4 pl-12 rounded-full border-2 border-gray-100 dark:border-gray-600 dark:bg-gray-800 outline-none transition text-sm md:text-base"
                  aria-label={t.searchTopics}
                />
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg" role="img" aria-hidden="true">🔍</span>
              </div>
            </div>
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
    <div className="space-y-12 md:space-y-16">
      {/* Hero Section */}
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
                <div className="flex flex-wrap justify-center lg:justify-start gap-3">
                  <button onClick={() => setActiveTab("ferramentas")} className="btn-primary shadow-lg">
                    ⚡ {t.tabTools || "Ferramentas Interativas"}
                  </button>
                  <button onClick={() => setActiveTab("quiz")} className="btn-secondary">
                    🧠 {t.startQuiz}
                  </button>
                  <button onClick={() => setActiveTab("direitos")} className="px-5 py-2.5 rounded-full border-2 border-primary text-primary dark:text-primary-light font-bold hover:bg-primary/10 transition text-sm">
                    📞 {t.tabRights || "Linhas de Apoio"}
                  </button>
                </div>
              )}
            </div>
            <div className="flex-1 relative max-w-md lg:max-w-none">
              <div className="absolute inset-0 bg-primary/10 blur-[100px] rounded-full" aria-hidden="true"></div>
              <Image
                src={heroImage}
                alt=""
                aria-hidden="true"
                width={1024}
                height={1024}
                priority
                className="relative z-10 rounded-3xl shadow-2xl animate-float w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Feature Highlights Grid */}
      {setActiveTab && (
        <section aria-label="Acessos Rápidos" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <button
            onClick={() => setActiveTab("ferramentas")}
            className="bg-white dark:bg-gray-800 p-5 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md hover:border-primary/50 text-left transition group"
          >
            <span className="text-3xl p-3 bg-primary/10 dark:bg-primary/20 rounded-2xl inline-block mb-3 group-hover:scale-110 transition-transform">
              ⚖️
            </span>
            <h3 className="font-heading font-bold text-gray-900 dark:text-white text-base">
              Comparador Contracetivo
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Eficácia, custos e métodos gratuitos no SNS.
            </p>
          </button>

          <button
            onClick={() => setActiveTab("ferramentas")}
            className="bg-white dark:bg-gray-800 p-5 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md hover:border-secondary text-left transition group"
          >
            <span className="text-3xl p-3 bg-secondary/10 dark:bg-secondary/20 rounded-2xl inline-block mb-3 group-hover:scale-110 transition-transform">
              💡
            </span>
            <h3 className="font-heading font-bold text-gray-900 dark:text-white text-base">
              Mito ou Verdade?
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Desmistifica crenças populares com factos.
            </p>
          </button>

          <button
            onClick={() => setActiveTab("glossario")}
            className="bg-white dark:bg-gray-800 p-5 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md hover:border-accent text-left transition group"
          >
            <span className="text-3xl p-3 bg-accent/10 dark:bg-accent/20 rounded-2xl inline-block mb-3 group-hover:scale-110 transition-transform">
              📖
            </span>
            <h3 className="font-heading font-bold text-gray-900 dark:text-white text-base">
              Glossário de A a Z
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Dicionário claro sobre termos e conceitos.
            </p>
          </button>

          <button
            onClick={() => setActiveTab("direitos")}
            className="bg-white dark:bg-gray-800 p-5 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md hover:border-rose-400 text-left transition group"
          >
            <span className="text-3xl p-3 bg-rose-50 dark:bg-rose-950/40 rounded-2xl inline-block mb-3 group-hover:scale-110 transition-transform">
              📞
            </span>
            <h3 className="font-heading font-bold text-gray-900 dark:text-white text-base">
              Linhas & Direitos SNS
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Contactos diretos, sigilo jovem e urgência.
            </p>
          </button>
        </section>
      )}

      {/* Topics Section */}
      <section aria-labelledby="topics-heading">
        <div className="text-center mb-8 md:mb-12">
          <h3 id="topics-heading" className="text-2xl md:text-4xl font-heading font-bold text-primary mb-3 md:mb-4">
            {t.exploreTopics}
          </h3>
          <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto text-sm md:text-base">{t.exploreTopicsDesc}</p>
          <div className="max-w-md mx-auto mt-4 md:mt-6">
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
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
          {filteredTopics.length === 0 && searchQuery.trim() ? (
            <div className="sm:col-span-2 lg:col-span-3 text-center py-12 text-gray-500 dark:text-gray-400" role="status" aria-live="polite">
              <p className="text-lg mb-2">{t.noTopicsFound} &ldquo;{searchQuery}&rdquo;</p>
              <p className="text-sm">{t.tryOtherTerms}</p>
            </div>
          ) : filteredTopics.map((topic) => (
            <LazySection key={topic.id} title={topic.title}>
              <div className="card group hover:border-primary">
                <div className="bg-primary/5 dark:bg-primary/20 w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center text-3xl md:text-4xl mb-4 md:mb-6 group-hover:bg-primary group-hover:text-white transition-all duration-500" role="img" aria-hidden="true">
                  {topic.id === 'anatomia-jovens' ? '🧬' : topic.icon}
                </div>
                <h4 className="text-lg md:text-2xl font-heading font-bold mb-2 md:mb-3 text-primary">{topic.title}</h4>
                <p className="text-gray-500 dark:text-gray-400 mb-4 md:mb-6 line-clamp-2 leading-relaxed text-sm md:text-base">{topic.description}</p>

                {topic.audioUrl && (
                  <LazyAudioPlayer
                    src={topic.audioUrl}
                    title={topic.title}
                    loadLabel={t.loadAudio}
                    textToRead={`${topic.title}. ${topic.description}`}
                  />
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
                          <LazyAudioPlayer
                            src={article.audioUrl}
                            title={article.title}
                            loadLabel={t.loadAudio}
                            textToRead={`${article.title}. ${article.content}`}
                          />
                        )}
                        {article.content}
                      </div>
                    </details>
                  ))}
                </div>
              </div>
            </LazySection>
          ))}
        </div>
      </section>
    </div>
  );
}
