import React from "react";
import { render, screen } from "@testing-library/react";
import AudioPlayer from "@/components/AudioPlayer";

describe("AudioPlayer", () => {
  it("renders with title", () => {
    render(<AudioPlayer src="/test.mp3" title="Test Audio" />);
    expect(screen.getByText("Test Audio")).toBeInTheDocument();
    expect(screen.getByRole("region", { name: /audio: test audio/i })).toBeInTheDocument();
  });

  it("renders audio element with controls", () => {
    render(<AudioPlayer src="/test.mp3" title="Test" />);
    const audio = screen.getByRole("region").querySelector("audio");
    expect(audio).toHaveAttribute("controls");
  });

  it("uses correct MIME type for mp3", () => {
    render(<AudioPlayer src="/test.mp3" title="Test" />);
    const source = screen.getByRole("region").querySelector("source");
    expect(source).toHaveAttribute("type", "audio/mpeg");
  });

  it("uses correct MIME type for wav", () => {
    render(<AudioPlayer src="/test.wav" title="Test" />);
    const source = screen.getByRole("region").querySelector("source");
    expect(source).toHaveAttribute("type", "audio/wav");
  });

  it("shows fallback text when audio not supported", () => {
    render(<AudioPlayer src="/test.mp3" title="Test" />);
    expect(screen.getByText(/navegador não suporta/i)).toBeInTheDocument();
  });

  it("uses correct MIME type for ogg", () => {
    render(<AudioPlayer src="/test.ogg" title="Test" />);
    const source = screen.getByRole("region").querySelector("source");
    expect(source).toHaveAttribute("type", "audio/ogg");
  });

  it("defaults to audio/mpeg for unknown extension", () => {
    render(<AudioPlayer src="/test.xyz" title="Test" />);
    const source = screen.getByRole("region").querySelector("source");
    expect(source).toHaveAttribute("type", "audio/mpeg");
  });

  it("defaults to audio/mpeg for src with no extension", () => {
    render(<AudioPlayer src="https://example.com/stream" title="Test" />);
    const source = screen.getByRole("region").querySelector("source");
    expect(source).toHaveAttribute("type", "audio/mpeg");
  });

  it("sets audio aria-label with Reproduzir prefix", () => {
    render(<AudioPlayer src="/test.mp3" title="Meu Audio" />);
    const audio = screen.getByRole("region").querySelector("audio");
    expect(audio).toHaveAttribute("aria-label", "Reproduzir: Meu Audio");
  });

  it("sets controlsList=nodownload", () => {
    render(<AudioPlayer src="/test.mp3" title="Test" />);
    const audio = screen.getByRole("region").querySelector("audio");
    expect(audio).toHaveAttribute("controlslist", "nodownload");
  });

  it("sets source src to provided url", () => {
    render(<AudioPlayer src="/audio/track.mp3" title="Test" />);
    const source = screen.getByRole("region").querySelector("source");
    expect(source).toHaveAttribute("src", "/audio/track.mp3");
  });

  it("renders the headphone emoji", () => {
    render(<AudioPlayer src="/test.mp3" title="Test" />);
    expect(screen.getByText("🎧")).toBeInTheDocument();
  });
});
