import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import AudioTranscriptModal from "@/components/AudioTranscriptModal";
import { I18nProvider } from "@/i18n/context";
import { Episode } from "@/types";

function mount(ui: React.ReactNode) {
  return render(<I18nProvider>{ui}</I18nProvider>);
}

const episode: Episode = {
  title: "Episódio Teste",
  description: "Descrição do episódio teste.",
  link: "https://example.com/1",
  pubDate: "2026-01-01",
  duration: "10:00",
  episode: 1,
  season: 1,
  image: null,
  audioUrl: "https://example.com/1.mp3",
  guid: "guid-1",
};

describe("AudioTranscriptModal", () => {
  const onClose = jest.fn();

  beforeEach(() => {
    onClose.mockClear();
  });

  it("returns null when episode is null", () => {
    const { container } = mount(<AudioTranscriptModal episode={null} onClose={onClose} />);
    expect(container.firstChild).toBeNull();
  });

  it("renders episode title and dialog role", () => {
    mount(<AudioTranscriptModal episode={episode} onClose={onClose} />);
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByText("Episódio Teste")).toBeInTheDocument();
    expect(screen.getByText(/transcrição de áudio/i)).toBeInTheDocument();
  });

  it("shows episode description text", () => {
    mount(<AudioTranscriptModal episode={episode} onClose={onClose} />);
    expect(screen.getByText("Descrição do episódio teste.")).toBeInTheDocument();
  });

  it("calls onClose when close buttons are clicked", () => {
    mount(<AudioTranscriptModal episode={episode} onClose={onClose} />);
    fireEvent.click(screen.getByText("✕"));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("calls onClose when clicking close transcript button", () => {
    mount(<AudioTranscriptModal episode={episode} onClose={onClose} />);
    fireEvent.click(screen.getByRole("button", { name: /fechar transcrição/i }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("calls onClose when clicking the backdrop", () => {
    const { container } = mount(<AudioTranscriptModal episode={episode} onClose={onClose} />);
    const dialog = screen.getByRole("dialog");
    fireEvent.click(container.querySelector(".bg-black\\/60") || dialog);
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});