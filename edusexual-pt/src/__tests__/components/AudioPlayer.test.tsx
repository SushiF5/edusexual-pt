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

  it("shows custom fallback text", () => {
    render(<AudioPlayer src="/test.mp3" title="Test" fallbackText="Custom fallback" />);
    expect(screen.getByText("Custom fallback")).toBeInTheDocument();
  });
});
