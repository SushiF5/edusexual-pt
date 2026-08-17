import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
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
    jest.spyOn(console, "error").mockImplementation(() => {});
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

  it("renders sticky player when playingEpisode is set", () => {
    const playingEpisode = {
      title: "A tocar agora",
      description: "",
      link: "",
      pubDate: "",
      duration: "",
      episode: 1,
      season: null,
      image: null,
      audioUrl: "https://example.com/audio.mp3",
    };
    render(<PodcastTab {...defaultProps} playingEpisode={playingEpisode} />);
    expect(screen.getByText("A tocar agora")).toBeInTheDocument();
    expect(screen.getByRole("region", { name: "Player" })).toBeInTheDocument();
    expect(screen.getByLabelText("Fechar")).toBeInTheDocument();
  });

  it("closes player when close button clicked", () => {
    const setPlayingEpisode = jest.fn();
    const playingEpisode = {
      title: "X",
      description: "",
      link: "",
      pubDate: "",
      duration: "",
      episode: 1,
      season: null,
      image: null,
      audioUrl: "https://example.com/audio.mp3",
    };
    render(
      <PodcastTab
        {...defaultProps}
        playingEpisode={playingEpisode}
        setPlayingEpisode={setPlayingEpisode}
      />
    );
    fireEvent.click(screen.getByLabelText("Fechar"));
    expect(setPlayingEpisode).toHaveBeenCalledWith(null);
  });

  it("renders audio element with src when playing", () => {
    const playingEpisode = {
      title: "Ep",
      description: "",
      link: "",
      pubDate: "",
      duration: "",
      episode: 1,
      season: null,
      image: null,
      audioUrl: "https://example.com/audio.mp3",
    };
    render(<PodcastTab {...defaultProps} playingEpisode={playingEpisode} />);
    const audio = document.querySelector("audio");
    expect(audio).not.toBeNull();
    expect(audio?.getAttribute("src")).toBe("https://example.com/audio.mp3");
  });

  it("play button calls setPlayingEpisode with episode", () => {
    const setPlayingEpisode = jest.fn();
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
    render(
      <PodcastTab
        {...defaultProps}
        episodes={episodes}
        setPlayingEpisode={setPlayingEpisode}
      />
    );
    fireEvent.click(screen.getByLabelText("Ouvir Episódio 1"));
    expect(setPlayingEpisode).toHaveBeenCalledWith(episodes[0]);
  });

  it("retry button resets state and reloads", async () => {
    (global.fetch as jest.Mock).mockRejectedValueOnce(new Error("Network error"));
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ episodes: [] }),
    });
    const setPodcastLoading = jest.fn();
    render(
      <PodcastTab
        {...defaultProps}
        setPodcastLoading={setPodcastLoading}
      />
    );
    await waitFor(() => {
      expect(screen.getByText("Tentar")).toBeInTheDocument();
    });
    fireEvent.click(screen.getByText("Tentar"));
    expect(setPodcastLoading).toHaveBeenCalledWith(true);
  });

  it("renders loading spinner with role=status", () => {
    render(<PodcastTab {...defaultProps} podcastLoading={true} />);
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("renders episode description when present", () => {
    const episodes = [
      {
        title: "Ep",
        description: "Descrição很长",
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
    expect(screen.getByText("Descrição很长")).toBeInTheDocument();
  });

  it("renders duration and date when present", () => {
    const episodes = [
      {
        title: "Ep",
        description: "",
        link: "",
        pubDate: "2025-01-01",
        duration: "30:00",
        episode: 1,
        season: 1,
        image: null,
        audioUrl: "https://example.com/audio.mp3",
      },
    ];
    render(<PodcastTab {...defaultProps} episodes={episodes} />);
    expect(screen.getByText("30:00")).toBeInTheDocument();
  });

  it("renders Spotify link when episode has link", () => {
    const episodes = [
      {
        title: "Ep",
        description: "",
        link: "https://podcast.example.com/ep1",
        pubDate: "",
        duration: "",
        episode: 1,
        season: 1,
        image: null,
        audioUrl: "https://example.com/audio.mp3",
      },
    ];
    render(<PodcastTab {...defaultProps} episodes={episodes} />);
    const spotifyLinks = screen.getAllByText(/Spotify/);
    const episodeLink = spotifyLinks.find(
      (el) => el.closest("a")?.getAttribute("href") === "https://podcast.example.com/ep1"
    );
    expect(episodeLink).toBeDefined();
  });

  it("does not render episode number badge when episode is null", () => {
    const episodes = [
      {
        title: "Ep sem número",
        description: "",
        link: "",
        pubDate: "2025-01-01",
        duration: "30:00",
        episode: null,
        season: 1,
        image: null,
        audioUrl: "https://example.com/audio.mp3",
      },
    ];
    render(<PodcastTab {...defaultProps} episodes={episodes} />);
    expect(screen.queryByText(/Ep\./)).not.toBeInTheDocument();
  });

  it("fetches episodes and populates state on success", async () => {
    const setEpisodes = jest.fn();
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ episodes: [{ title: "Fetched" }] }),
    });
    render(<PodcastTab {...defaultProps} setEpisodes={setEpisodes} />);
    await waitFor(() => {
      expect(setEpisodes).toHaveBeenCalledWith([{ title: "Fetched" }]);
    });
  });

  it("throws when API returns non-ok", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({ ok: false, status: 500 });
    render(<PodcastTab {...defaultProps} />);
    await waitFor(() => {
      expect(screen.getByText("Erro ao carregar")).toBeInTheDocument();
    });
  });

  it("renders no episodes link to Spotify", async () => {
    render(<PodcastTab {...defaultProps} />);
    await waitFor(() => {
      const links = screen.getAllByText("Ouve no Spotify");
      expect(links.length).toBeGreaterThan(0);
    });
  });
});
