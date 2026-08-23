import { renderHook, act } from "@testing-library/react";
import { PodcastProvider, usePodcast } from "@/contexts/PodcastContext";

describe("PodcastContext", () => {
  function Wrapper({ children }: { children: React.ReactNode }) {
    return <PodcastProvider>{children}</PodcastProvider>;
  }

  it("provides default empty episodes array", () => {
    const { result } = renderHook(() => usePodcast(), { wrapper: Wrapper });
    expect(result.current.episodes).toEqual([]);
  });

  it("provides default podcastLoading as false", () => {
    const { result } = renderHook(() => usePodcast(), { wrapper: Wrapper });
    expect(result.current.podcastLoading).toBe(false);
  });

  it("provides default playingEpisode as null", () => {
    const { result } = renderHook(() => usePodcast(), { wrapper: Wrapper });
    expect(result.current.playingEpisode).toBeNull();
  });

  it("updates episodes via setEpisodes", () => {
    const { result } = renderHook(() => usePodcast(), { wrapper: Wrapper });
    act(() => {
      result.current.setEpisodes([{ title: "Test", audioUrl: "/test.mp3", guid: "1", description: "", link: "", pubDate: "", duration: "", episode: 1, season: 1, image: null }]);
    });
    expect(result.current.episodes).toHaveLength(1);
    expect(result.current.episodes[0].title).toBe("Test");
  });

  it("updates podcastLoading via setPodcastLoading", () => {
    const { result } = renderHook(() => usePodcast(), { wrapper: Wrapper });
    act(() => { result.current.setPodcastLoading(true); });
    expect(result.current.podcastLoading).toBe(true);
  });

  it("updates playingEpisode via setPlayingEpisode", () => {
    const { result } = renderHook(() => usePodcast(), { wrapper: Wrapper });
    const ep = { title: "Now Playing", audioUrl: "/now.mp3", guid: "2", description: "", link: "", pubDate: "", duration: "", episode: 2, season: 1, image: null };
    act(() => { result.current.setPlayingEpisode(ep); });
    expect(result.current.playingEpisode).toEqual(ep);
  });

  it("clears playingEpisode when set to null", () => {
    const { result } = renderHook(() => usePodcast(), { wrapper: Wrapper });
    const ep = { title: "Now Playing", audioUrl: "/now.mp3", guid: "2", description: "", link: "", pubDate: "", duration: "", episode: 2, season: 1, image: null };
    act(() => { result.current.setPlayingEpisode(ep); });
    act(() => { result.current.setPlayingEpisode(null); });
    expect(result.current.playingEpisode).toBeNull();
  });

  it("provides separate state per provider instance", () => {
    const { result: r1 } = renderHook(() => usePodcast(), { wrapper: Wrapper });
    const ep = { title: "Private", audioUrl: "/p.mp3", guid: "9", description: "", link: "", pubDate: "", duration: "", episode: 9, season: 1, image: null };
    act(() => { r1.current.setEpisodes([ep]); });
    expect(r1.current.episodes).toHaveLength(1);
  });
});