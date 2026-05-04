import React from "react";
import { render, screen } from "@testing-library/react";
import AudioPlayer from "@/components/AudioPlayer";

describe("AudioPlayer", () => {
  it("renders with title", () => {
    render(<AudioPlayer src="/test.mp3" title="Test Audio" />);

    expect(screen.getByText("Test Audio")).toBeInTheDocument();
    expect(screen.getByLabelText("Audio player: Test Audio")).toBeInTheDocument();
  });

  it("renders audio element with correct attributes", () => {
    render(<AudioPlayer src="/test.mp3" title="Test" />);

    const audio = screen.getByRole("region").querySelector("audio");
    expect(audio).toHaveAttribute("controls");
    expect(audio).toHaveAttribute("src", "/test.mp3");
  });

  it("shows fallback text when audio not supported", () => {
    render(<AudioPlayer src="/test.mp3" title="Test" />);

    expect(screen.getByText(/navegador não suporta/i)).toBeInTheDocument();
  });
});
