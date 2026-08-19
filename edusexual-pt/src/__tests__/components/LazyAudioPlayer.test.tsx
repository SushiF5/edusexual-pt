import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { LazyAudioPlayer } from "@/components/AudioPlayer";

describe("LazyAudioPlayer", () => {
  it("renders the audio player after mount when IntersectionObserver is unavailable", () => {
    render(<LazyAudioPlayer src="/test.mp3" title="Test Audio" />);
    expect(screen.getByRole("region", { name: /audio: test audio/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/reproduzir: test audio/i)).toBeInTheDocument();
  });

  it("shows a load-audio button before becoming visible", () => {
    const { container } = render(<LazyAudioPlayer src="/test.mp3" title="Intro" loadLabel="Carregar áudio" />);

    if (typeof IntersectionObserver !== "undefined") {
      const button = screen.getByRole("button", { name: /carregar áudio: intro/i });
      fireEvent.click(button);
      expect(screen.getByLabelText(/reproduzir: intro/i)).toBeInTheDocument();
    } else {
      expect(container.querySelector("audio")).toBeInTheDocument();
    }
  });

  it("uses the provided loadLabel in the placeholder", () => {
    render(<LazyAudioPlayer src="/test.mp3" title="Intro" loadLabel="Load audio" />);
    if (typeof IntersectionObserver !== "undefined") {
      expect(screen.getByRole("button", { name: /load audio: intro/i })).toBeInTheDocument();
    } else {
      expect(screen.getByLabelText(/reproduzir: intro/i)).toBeInTheDocument();
    }
  });
});
