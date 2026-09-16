import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import GlossaryTab from "@/components/GlossaryTab";
import { I18nProvider } from "@/i18n/context";

function mount(ui: React.ReactNode) {
  return render(<I18nProvider>{ui}</I18nProvider>);
}

describe("GlossaryTab", () => {
  const onBookmark = jest.fn();
  const isBookmarked = jest.fn().mockReturnValue(false);

  beforeEach(() => {
    onBookmark.mockClear();
    isBookmarked.mockClear();
  });

  it("renders title and subtitle", () => {
    mount(<GlossaryTab onBookmark={onBookmark} isBookmarked={isBookmarked} />);
    expect(screen.getByText(/glossário de educação sexual/i)).toBeInTheDocument();
    expect(screen.getByText(/dicionário completo/i)).toBeInTheDocument();
  });

  it("renders search input with placeholder", () => {
    mount(<GlossaryTab onBookmark={onBookmark} isBookmarked={isBookmarked} />);
    expect(screen.getByPlaceholderText(/pesquisar termo/i)).toBeInTheDocument();
  });

  it("renders category pills and highlights 'Todos' by default", () => {
    mount(<GlossaryTab onBookmark={onBookmark} isBookmarked={isBookmarked} />);
    const categoryTodos = screen.getAllByRole("button", { name: /todos os termos/i });
    expect(categoryTodos[0]).toHaveClass("bg-primary");
    expect(screen.getByRole("button", { name: /anatomia/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /saúde & prevenção/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /identidade & género/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /direitos & sns/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /relações & consentimento/i })).toBeInTheDocument();
  });

  it("renders letter jump buttons (C, D, E, H, I, J, O, P, S + Todos)", () => {
    mount(<GlossaryTab onBookmark={onBookmark} isBookmarked={isBookmarked} />);
    const letterTodos = screen.getAllByRole("button", { name: /^todos$/i });
    expect(letterTodos.length).toBeGreaterThan(0);
    expect(screen.getByRole("button", { name: /^C$/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /^S$/i })).toBeInTheDocument();
  });

  it("filters terms by category when clicking a pill", () => {
    mount(<GlossaryTab onBookmark={onBookmark} isBookmarked={isBookmarked} />);
    const anatomiaPill = screen.getByRole("button", { name: /anatomia/i });
    fireEvent.click(anatomiaPill);
    expect(anatomiaPill).toHaveClass("bg-primary");
    const categoryTodos = screen.getAllByRole("button", { name: /todos os termos/i });
    expect(categoryTodos[0]).not.toHaveClass("bg-primary");
  });

  it("filters terms by letter when clicking a letter", () => {
    mount(<GlossaryTab onBookmark={onBookmark} isBookmarked={isBookmarked} />);
    const letterC = screen.getByRole("button", { name: /^C$/i });
    fireEvent.click(letterC);
    expect(letterC).toHaveClass("bg-secondary");
  });

  it("filters terms by search query", async () => {
    mount(<GlossaryTab onBookmark={onBookmark} isBookmarked={isBookmarked} />);
    fireEvent.change(screen.getByPlaceholderText(/pesquisar termo/i), {
      target: { value: "vulva" },
    });
    await waitFor(() => {
      expect(screen.getAllByText(/vulva/i)).toHaveLength(3);
    });
  });

  it("clears search on X button click", async () => {
    mount(<GlossaryTab onBookmark={onBookmark} isBookmarked={isBookmarked} />);
    const input = screen.getByPlaceholderText(/pesquisar termo ou conceito/i);
    fireEvent.change(input, { target: { value: "vulva" } });
    await waitFor(() => expect(input).toHaveValue("vulva"));
    fireEvent.click(screen.getByText("✕"));
    await waitFor(() => expect(input).toHaveValue(""));
  });

  it("renders glossary terms cards", () => {
    mount(<GlossaryTab onBookmark={onBookmark} isBookmarked={isBookmarked} />);
    expect(screen.getAllByText(/clitóris/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/consentimento/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/hpv/i)).toBeInTheDocument();
  });

  it("renders clickable tags", () => {
    mount(<GlossaryTab onBookmark={onBookmark} isBookmarked={isBookmarked} />);
    const tag = screen.getByText(/#anatomia/i);
    expect(tag).toBeInTheDocument();
  });

  it("shows empty state when no terms match", async () => {
    mount(<GlossaryTab onBookmark={onBookmark} isBookmarked={isBookmarked} />);
    fireEvent.change(screen.getByPlaceholderText(/pesquisar termo/i), {
      target: { value: "xyzinexistente123" },
    });
    await waitFor(() => {
      expect(screen.getByText(/nenhum termo encontrado/i)).toBeInTheDocument();
    });
  });

  it("renders term definition and detailed context", () => {
    mount(<GlossaryTab onBookmark={onBookmark} isBookmarked={isBookmarked} />);
    expect(screen.getAllByText(/consentimento/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/acordo mútuo/i)).toBeInTheDocument();
  });

  it("renders clickable tags", () => {
    mount(<GlossaryTab onBookmark={onBookmark} isBookmarked={isBookmarked} />);
    const tag = screen.getByText(/#anatomia/i);
    expect(tag).toBeInTheDocument();
  });

  it("shows empty state message when no terms match category", async () => {
    mount(<GlossaryTab onBookmark={onBookmark} isBookmarked={isBookmarked} />);
    fireEvent.click(screen.getByRole("button", { name: /anatomia/i }));
    fireEvent.change(screen.getByPlaceholderText(/pesquisar termo/i), {
      target: { value: "xyzinexistente123" },
    });
    await waitFor(() => {
      expect(screen.getByText(/nenhum termo encontrado/i)).toBeInTheDocument();
    });
  });
});