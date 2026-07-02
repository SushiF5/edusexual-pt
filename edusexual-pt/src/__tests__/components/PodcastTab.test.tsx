import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import PodcastTab from "@/components/PodcastTab";

jest.mock("@/i18n/context", () => ({
  useI18n: () => ({
    t: {
      podcastTitle: "Podcast",
      podcastSubtitle: "O podcast",
      listenOnSpotify: "Ouve no Spotify",
      allEpisodes: "Todos os Episódios",
      loadingEpisodes: "A carregar...",
      noEpisodes: "Sem episódios",
      followOnSpotify: "Segue",
      followPodcast: "Seguir",
      closePlayer: "Fechar",
      audioPlayer: "Player",
      audioNotSupported: "Sem áudio",
      listen: "Ouvir",
      ep: "Ep.",
      spotify: "Spotify",
      hearOnSpotify: "Ouve no Spotify",
      podcastLoadError: "Erro ao carregar",
      retry: "Tentar",
    },
  }),
}));

const defaultProps = {
  episodes: [],
  setEpisodes: jest.fn(),
  podcastLoading: false,
  setPodcastLoading: jest.fn(),
  playingEpisode: null,
  setPlayingEpisode: jest.fn(),
};

describe("PodcastTab", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ episodes: [] }),
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("renders podcast title", () => {
    render(<PodcastTab {...defaultProps} />);
    expect(screen.getByText("Podcast")).toBeInTheDocument();
  });

  it("renders Spotify embed", () => {
    render(<PodcastTab {...defaultProps} />);
    expect(screen.getByTitle("Podcast Descomplicando no Spotify")).toBeInTheDocument();
  });

  it("shows loading state", () => {
    render(<PodcastTab {...defaultProps} podcastLoading={true} />);
    expect(screen.getByText("A carregar...")).toBeInTheDocument();
  });

  it("shows empty state when no episodes", async () => {
    render(<PodcastTab {...defaultProps} />);
    await waitFor(() => {
      expect(screen.getByText("Sem episódios")).toBeInTheDocument();
    });
  });

  it("renders episode list when episodes exist", () => {
    const episodes = [
      {
        title: "Episódio 1",
        description: "Descrição",
        link: "https://example.com",
        pubDate: "2025-01-01",
        duration: "30:00",
        episode: 1,
        season: 1,
        image: null,
        audioUrl: "https://example.com/audio.mp3",
      },
    ];
    render(<PodcastTab {...defaultProps} episodes={episodes} />);
    expect(screen.getByText("Episódio 1")).toBeInTheDocument();
    expect(screen.getByText("Ep. 1")).toBeInTheDocument();
  });

  it("calls fetch on mount when no episodes", async () => {
    render(<PodcastTab {...defaultProps} />);
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith("/api/podcast");
    });
  });

  it("shows error state on fetch failure", async () => {
    (global.fetch as jest.Mock).mockRejectedValue(new Error("Network error"));
    render(<PodcastTab {...defaultProps} />);
    await waitFor(() => {
      expect(screen.getByText("Erro ao carregar")).toBeInTheDocument();
      expect(screen.getByText("Tentar")).toBeInTheDocument();
    });
  });

  it("does not re-fetch when episodes already exist", async () => {
    const episodes = [
      {
        title: "Existing",
        description: "",
        link: "",
        pubDate: "",
        duration: "",
        episode: 1,
        season: null,
        image: null,
        audioUrl: "https://example.com/audio.mp3",
      },
    ];
    render(<PodcastTab {...defaultProps} episodes={episodes} />);
    await waitFor(() => {
      expect(global.fetch).not.toHaveBeenCalled();
    });
  });

  it("shows follow button", () => {
    render(<PodcastTab {...defaultProps} />);
    expect(screen.getByText("Seguir")).toBeInTheDocument();
  });
});
