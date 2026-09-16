import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ToolsTab from "@/components/ToolsTab";
import { I18nProvider } from "@/i18n/context";

function mount(ui: React.ReactNode) {
  return render(<I18nProvider>{ui}</I18nProvider>);
}

describe("ToolsTab", () => {
  const onBookmark = jest.fn();
  const isBookmarked = jest.fn().mockReturnValue(false);

  beforeEach(() => {
    onBookmark.mockClear();
    isBookmarked.mockClear();
  });

  it("renders title and subtitle", () => {
    mount(<ToolsTab onBookmark={onBookmark} isBookmarked={isBookmarked} />);
    expect(screen.getByText(/ferramentas interativas/i)).toBeInTheDocument();
    expect(screen.getByText(/explora comparadores/i)).toBeInTheDocument();
  });

  it("renders 7 sub-tool navigation pills", () => {
    mount(<ToolsTab onBookmark={onBookmark} isBookmarked={isBookmarked} />);
    const pills = screen.getAllByRole("button", { name: /comparador|mito|quiz|relações|guia|simulador|guias/i });
    expect(pills).toHaveLength(7);
    expect(screen.getByText(/comparador de métodos contracetivos/i)).toBeInTheDocument();
    expect(screen.getByText(/mito ou verdade/i)).toBeInTheDocument();
    expect(screen.getByText(/quiz/i)).toBeInTheDocument();
    expect(screen.getByText(/relações & consentimento/i)).toBeInTheDocument();
    expect(screen.getByText(/guia & rastreio de ists/i)).toBeInTheDocument();
    expect(screen.getByText(/simulador do ciclo menstrual/i)).toBeInTheDocument();
    expect(screen.getByText(/guias passo a passo/i)).toBeInTheDocument();
  });

  it("highlights the active sub-tool by default (comparator)", () => {
    mount(<ToolsTab onBookmark={onBookmark} isBookmarked={isBookmarked} />);
    const activePill = screen.getByText(/comparador de métodos contracetivos/i).closest("button");
    expect(activePill).toHaveClass("bg-primary");
  });

  it("switches active sub-tool when clicking a pill", () => {
    mount(<ToolsTab onBookmark={onBookmark} isBookmarked={isBookmarked} />);
    const mythPill = screen.getAllByText(/mito ou verdade/i)[0].closest("button");
    fireEvent.click(mythPill);
    expect(mythPill).toHaveClass("bg-primary");
  });

  it("switches to cycle when clicking cycle pill", () => {
    mount(<ToolsTab onBookmark={onBookmark} isBookmarked={isBookmarked} />);
    const cyclePill = screen.getAllByText(/simulador do ciclo menstrual/i)[0].closest("button");
    fireEvent.click(cyclePill);
    expect(cyclePill).toHaveClass("bg-primary");
  });

  it("switches to steps when clicking steps pill", () => {
    mount(<ToolsTab onBookmark={onBookmark} isBookmarked={isBookmarked} />);
    const stepsPill = screen.getAllByText(/guias passo a passo/i)[0].closest("button");
    fireEvent.click(stepsPill);
    expect(stepsPill).toHaveClass("bg-primary");
  });

  it("switches to quiz when clicking quiz pill", () => {
    mount(<ToolsTab onBookmark={onBookmark} isBookmarked={isBookmarked} />);
    const quizPill = screen.getAllByText(/quiz/i)[0].closest("button");
    fireEvent.click(quizPill);
    expect(quizPill).toHaveClass("bg-primary");
  });

  it("switches to mythbuster when clicking mythbuster pill", () => {
    mount(<ToolsTab onBookmark={onBookmark} isBookmarked={isBookmarked} />);
    const mythPill = screen.getAllByText(/mito ou verdade/i)[0].closest("button");
    fireEvent.click(mythPill);
    expect(mythPill).toHaveClass("bg-primary");
  });

  it("switches to consent when clicking consent pill", () => {
    mount(<ToolsTab onBookmark={onBookmark} isBookmarked={isBookmarked} />);
    const consentPill = screen.getAllByText(/relações & consentimento/i)[0].closest("button");
    fireEvent.click(consentPill);
    expect(consentPill).toHaveClass("bg-primary");
  });

  it("switches to stis when clicking stis pill", () => {
    mount(<ToolsTab onBookmark={onBookmark} isBookmarked={isBookmarked} />);
    const stisPill = screen.getAllByText(/guia & rastreio de ists/i)[0].closest("button");
    fireEvent.click(stisPill);
    expect(stisPill).toHaveClass("bg-primary");
  });

  it("renders ContraceptiveComparator when comparator is active (default)", () => {
    mount(<ToolsTab onBookmark={onBookmark} isBookmarked={isBookmarked} />);
    expect(screen.getByText(/comparador de métodos contracetivos/i)).toBeInTheDocument();
  });
});