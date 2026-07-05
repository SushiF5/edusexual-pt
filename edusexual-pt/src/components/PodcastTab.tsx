"use client";

import { useState, useEffect, useRef } from "react";
import { useI18n } from "@/i18n/context";
import { Episode } from "@/types";

interface PodcastTabProps {
  episodes: Episode[];
  setEpisodes: (e: Episode[]) => void;
  podcastLoading: boolean;
  setPodcastLoading: (v: boolean) => void;
  playingEpisode: Episode | null;
  setPlayingEpisode: (e: Episode | null) => void;
}

export default function PodcastTab({
  episodes, setEpisodes, podcastLoading, setPodcastLoading, playingEpisode, setPlayingEpisode
}: PodcastTabProps) {
  const { t } = useI18n();
  const hasFetched = useRef(false);
  const [fetchError, setFetchError] = useState(false);

  useEffect(() => {
    if (episodes.length === 0 && !hasFetched.current) {
      hasFetched.current = true;
      setPodcastLoading(true);
      setFetchError(false);
      fetch("/api/podcast")
        .then((r) => {
          if (!r.ok) throw new Error(`HTTP ${r.status}`);
          return r.json();
        })
        .then((data) => {
          if (data.episodes) setEpisodes(data.episodes);
        })
        .catch((e) => {
          console.error("Failed to load podcast episodes:", e);
          hasFetched.current = false;
          setFetchError(true);
        })
        .finally(() => setPodcastLoading(false));
    }
  }, [episodes.length, setEpisodes, setPodcastLoading]);

  return (
    <div className="max-w-4xl mx-auto space-y-8 md:space-y-12">
      <div className="text-center">
        <div className="bg-secondary/20 w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center text-3xl md:text-4xl mx-auto mb-4 md:mb-6">🎙️</div>
        <h3 className="text-2xl md:text-4xl font-heading font-bold text-primary mb-3">{t.podcastTitle}</h3>
        <p className="text-gray-500 dark:text-gray-400 text-sm md:text-base max-w-2xl mx-auto">{t.podcastSubtitle}</p>
      </div>

      <div className="card bg-primary/5 border-primary/20">
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 text-center">{t.listenOnSpotify}</p>
        <iframe
          src="https://podcasters.spotify.com/pod/show/edusexual/embed"
          width="100%"
          height="232"
          frameBorder="0"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
          className="rounded-xl"
          title="Podcast Descomplicando no Spotify"
        ></iframe>
      </div>

      {playingEpisode && (
        <div className="glass-card sticky top-20 z-40" role="region" aria-label={t.audioPlayer}>
          <div className="flex items-center gap-3 mb-3">
            <button onClick={() => setPlayingEpisode(null)} className="text-gray-400 hover:text-gray-600 transition text-lg" aria-label={t.closePlayer}>✕</button>
            <p className="font-semibold text-primary text-sm md:text-base truncate flex-1">{playingEpisode.title}</p>
          </div>
          <audio controls autoPlay className="w-full rounded-xl" src={playingEpisode.audioUrl}>
            {t.audioNotSupported}
          </audio>
        </div>
      )}

      <div>
        <h4 className="text-xl md:text-2xl font-heading font-bold text-primary mb-4 md:mb-6">{t.allEpisodes}</h4>
        {podcastLoading ? (
          <div className="text-center py-12 text-gray-400">
            <div className="animate-spin inline-block w-8 h-8 border-4 border-primary border-t-transparent rounded-full mb-4" role="status" aria-label={t.loadingContent || t.loadingEpisodes}></div>
            <p>{t.loadingEpisodes}</p>
          </div>
        ) : fetchError ? (
          <div className="text-center py-12 text-gray-400">
            <p className="text-red-500 dark:text-red-400 mb-2">{t.podcastLoadError || "Erro ao carregar episódios."}</p>
            <button
              onClick={() => { hasFetched.current = false; setPodcastLoading(true); }}
              className="text-secondary hover:underline"
            >
              {t.retry || "Tentar novamente"}
            </button>
          </div>
        ) : episodes.length > 0 ? (
          <div className="space-y-3 md:space-y-4">
            {episodes.map((ep) => {
              const dateStr = ep.pubDate ? new Date(ep.pubDate).toLocaleDateString("pt-PT", { day: "numeric", month: "short", year: "numeric" }) : "";
              return (
                <div key={ep.guid} className="card group hover:border-secondary !p-4 md:!p-5">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                    <button
                      onClick={() => setPlayingEpisode(ep)}
                      className="bg-secondary/10 hover:bg-secondary hover:text-white w-12 h-12 rounded-full flex items-center justify-center text-xl shrink-0 transition-all mx-auto sm:mx-0"
                      aria-label={`${t.listen} ${ep.title}`}
                    >
                      ▶
                    </button>
                    <div className="flex-1 min-w-0">
                      <h5 className="font-heading font-semibold text-primary text-sm md:text-base group-hover:text-secondary transition line-clamp-2">{ep.title}</h5>
                      <div className="flex flex-wrap items-center gap-2 mt-1 text-xs text-gray-400">
                        {ep.episode !== null && <span className="bg-primary/10 text-primary px-2 py-0.5 rounded-full font-semibold">{t.ep} {ep.episode}</span>}
                        {ep.duration && <span>{ep.duration}</span>}
                        {dateStr && <span>{dateStr}</span>}
                      </div>
                      {ep.description && <p className="text-gray-500 dark:text-gray-400 text-xs mt-2 line-clamp-2">{ep.description}</p>}
                    </div>
                    {ep.link && (
                      <a href={ep.link} target="_blank" rel="noopener noreferrer" className="text-xs text-gray-400 hover:text-secondary transition underline shrink-0 text-center sm:text-right">
                        {t.spotify} ↗
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12 text-gray-400">
            <p>{t.noEpisodes}</p>
            <a href="https://podcasters.spotify.com/pod/show/edusexual" target="_blank" rel="noopener noreferrer" className="text-secondary hover:underline mt-2 inline-block">
              {t.hearOnSpotify}
            </a>
          </div>
        )}
      </div>

      <div className="card bg-accent/10 border-accent text-center">
        <p className="text-sm text-gray-600 dark:text-gray-400">{t.followOnSpotify}</p>
        <a
          href="https://podcasters.spotify.com/pod/show/edusexual"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary inline-block mt-3"
        >
          {t.followPodcast}
        </a>
      </div>
    </div>
  );
}
