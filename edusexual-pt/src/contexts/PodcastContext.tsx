"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface Episode {
  title: string;
  description: string;
  link: string;
  pubDate: string;
  duration: string;
  episode: number | null;
  season: number | null;
  image: string | null;
  audioUrl: string;
}

interface PodcastContextValue {
  episodes: Episode[];
  setEpisodes: (e: Episode[]) => void;
  podcastLoading: boolean;
  setPodcastLoading: (v: boolean) => void;
  playingEpisode: Episode | null;
  setPlayingEpisode: (e: Episode | null) => void;
}

const PodcastContext = createContext<PodcastContextValue>({
  episodes: [],
  setEpisodes: () => {},
  podcastLoading: false,
  setPodcastLoading: () => {},
  playingEpisode: null,
  setPlayingEpisode: () => {},
});

export function PodcastProvider({ children }: { children: ReactNode }) {
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [podcastLoading, setPodcastLoading] = useState(false);
  const [playingEpisode, setPlayingEpisode] = useState<Episode | null>(null);

  return (
    <PodcastContext.Provider value={{ episodes, setEpisodes, podcastLoading, setPodcastLoading, playingEpisode, setPlayingEpisode }}>
      {children}
    </PodcastContext.Provider>
  );
}

export function usePodcast() {
  return useContext(PodcastContext);
}
