"use client";

import { createContext, useContext, useState, useMemo, ReactNode } from "react";
import { Episode } from "@/types";

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

  const value = useMemo(() => ({
    episodes, setEpisodes, podcastLoading, setPodcastLoading, playingEpisode, setPlayingEpisode
  }), [episodes, podcastLoading, playingEpisode]);

  return (
    <PodcastContext.Provider value={value}>
      {children}
    </PodcastContext.Provider>
  );
}

export function usePodcast() {
  return useContext(PodcastContext);
}
