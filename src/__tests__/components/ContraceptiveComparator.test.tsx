import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ContraceptiveComparator from "@/components/ContraceptiveComparator";

describe("ContraceptiveComparator", () => {
  const mockOnBookmark = jest.fn();
  const mockIsBookmarked = jest.fn((id: string) => id === "preservativo-externo");

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the component title and description", () => {
    render(<ContraceptiveComparator onBookmark={mockOnBookmark} isBookmarked={mockIsBookmarked} />);
    expect(screen.getByText(/comparador interativo de métodos contracetivos/i)).toBeInTheDocument();
    expect(screen.getByText(/compara taxas de eficácia típica vs\. perfeita/i)).toBeInTheDocument();
  });

  it("renders 5 category filter buttons", () => {
    render(<ContraceptiveComparator onBookmark={mockOnBookmark} isBookmarked={mockIsBookmarked} />);
    expect(screen.getByRole("button", { name: /todos os métodos/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /barreira/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /hormonal/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /diu \/ siu/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /emergência/i })).toBeInTheDocument();
  });

  it("defaults to 'Todos os Métodos' category selected", () => {
    render(<ContraceptiveComparator onBookmark={mockOnBookmark} isBookmarked={mockIsBookmarked} />);
    const allButton = screen.getByRole("button", { name: /todos os métodos/i });
    expect(allButton).toHaveClass("bg-primary");
  });

  it("filters methods by category when category button clicked", () => {
    render(<ContraceptiveComparator onBookmark={mockOnBookmark} isBookmarked={mockIsBookmarked} />);
    fireEvent.click(screen.getByRole("button", { name: /barreira/i }));
    expect(screen.getByRole("button", { name: /barreira/i })).toHaveClass("bg-primary");
    expect(screen.getByText(/preservativo externo/i)).toBeInTheDocument();
    expect(screen.getByText(/preservativo interno/i)).toBeInTheDocument();
  });

  it("renders search input with placeholder", () => {
    render(<ContraceptiveComparator onBookmark={mockOnBookmark} isBookmarked={mockIsBookmarked} />);
    const input = screen.getByPlaceholderText(/pesquisar por método/i);
    expect(input).toBeInTheDocument();
  });

  it("filters methods by search query", () => {
    render(<ContraceptiveComparator onBookmark={mockOnBookmark} isBookmarked={mockIsBookmarked} />);
    const input = screen.getByPlaceholderText(/pesquisar por método/i);
    fireEvent.change(input, { target: { value: "pílula" } });
    expect(screen.getByText(/pílula contracetiva combinada/i)).toBeInTheDocument();
    expect(screen.queryByText(/preservativo externo/i)).not.toBeInTheDocument();
  });

  it("shows clear filters button when filters are active", () => {
    render(<ContraceptiveComparator onBookmark={mockOnBookmark} isBookmarked={mockIsBookmarked} />);
    const input = screen.getByPlaceholderText(/pesquisar por método/i);
    fireEvent.change(input, { target: { value: "pílula" } });
    expect(screen.getByText(/limpar filtros/i)).toBeInTheDocument();
  });

  it("clears all filters when clear button clicked", () => {
    render(<ContraceptiveComparator onBookmark={mockOnBookmark} isBookmarked={mockIsBookmarked} />);
    const input = screen.getByPlaceholderText(/pesquisar por método/i);
    fireEvent.change(input, { target: { value: "pílula" } });
    fireEvent.click(screen.getByText(/limpar filtros/i));
    expect(input).toHaveValue("");
    expect(screen.getByRole("button", { name: /todos os métodos/i })).toHaveClass("bg-primary");
  });

  it("renders quick filter toggles", () => {
    render(<ContraceptiveComparator onBookmark={mockOnBookmark} isBookmarked={mockIsBookmarked} />);
    const stiBtn = screen.getByRole("button", { name: /protege contra ists/i });
    const snsBtn = screen.getByRole("button", { name: /gratuito no sns/i });
    const rxBtn = screen.getByRole("button", { name: /sem receita médica/i });
    expect(stiBtn).toBeInTheDocument();
    expect(snsBtn).toBeInTheDocument();
    expect(rxBtn).toBeInTheDocument();
  });

  it("filters methods by STI protection toggle", () => {
    render(<ContraceptiveComparator onBookmark={mockOnBookmark} isBookmarked={mockIsBookmarked} />);
    const stiBtn = screen.getByRole("button", { name: /protege contra ists/i });
    fireEvent.click(stiBtn);
    expect(stiBtn).toHaveClass("bg-emerald-500");
    expect(screen.getByText(/preservativo externo/i)).toBeInTheDocument();
    expect(screen.getByText(/preservativo interno/i)).toBeInTheDocument();
    expect(screen.queryByText(/pílula contracetiva combinada/i)).not.toBeInTheDocument();
  });

  it("filters methods by free in SNS toggle", () => {
    render(<ContraceptiveComparator onBookmark={mockOnBookmark} isBookmarked={mockIsBookmarked} />);
    const snsBtn = screen.getByRole("button", { name: /gratuito no sns/i });
    fireEvent.click(snsBtn);
    expect(snsBtn).toHaveClass("bg-blue-600");
    expect(screen.getByText(/preservativo externo/i)).toBeInTheDocument();
    expect(screen.getByText(/pílula contracetiva combinada/i)).toBeInTheDocument();
    expect(screen.queryByText(/anel vaginal/i)).not.toBeInTheDocument();
  });

  it("filters methods by no prescription toggle", () => {
    render(<ContraceptiveComparator onBookmark={mockOnBookmark} isBookmarked={mockIsBookmarked} />);
    const rxBtn = screen.getByRole("button", { name: /sem receita médica/i });
    fireEvent.click(rxBtn);
    expect(rxBtn).toHaveClass("bg-amber-600");
    expect(screen.getByText(/preservativo externo/i)).toBeInTheDocument();
    expect(screen.getByText(/contraceção de emergência/i)).toBeInTheDocument();
    expect(screen.queryByText(/pílula contracetiva combinada/i)).not.toBeInTheDocument();
  });

  it("renders method cards with key information", () => {
    render(<ContraceptiveComparator onBookmark={mockOnBookmark} isBookmarked={mockIsBookmarked} />);
    expect(screen.getByText(/preservativo externo/i)).toBeInTheDocument();
    expect(screen.getByText(/87%/i)).toBeInTheDocument();
    expect(screen.getByText(/98%/i)).toBeInTheDocument();
    const stiBadges = screen.getAllByText(/protege contra ists/i);
    expect(stiBadges.length).toBeGreaterThan(0);
    const snsBadges = screen.getAllByText(/gratuito no sns/i);
    expect(snsBadges.length).toBeGreaterThan(0);
  });

  it("opens detail modal when 'Ver Detalhes' clicked on first method", () => {
    render(<ContraceptiveComparator onBookmark={mockOnBookmark} isBookmarked={mockIsBookmarked} />);
    const detailBtn = screen.getAllByText(/ver detalhes/i)[0];
    fireEvent.click(detailBtn);
    const dialog = screen.getByRole("dialog");
    expect(dialog).toBeInTheDocument();
    const modalContent = dialog.querySelector("div[class*='max-w-2xl']")!;
    expect(modalContent.querySelector("h4")).toHaveTextContent(/como funciona/i);
    expect(modalContent.querySelector("h5")).toHaveTextContent(/vantagens/i);
    expect(modalContent.querySelectorAll("h5")[1]).toHaveTextContent(/cuidados & desvantagens/i);
    expect(modalContent.querySelectorAll("h4")[1]).toHaveTextContent(/instruções de uso/i);
    const snsSection = modalContent.querySelector("div[class*='bg-primary']")!;
    expect(snsSection.querySelector("h5")).toHaveTextContent(/acesso no sns em portugal/i);
  });

  it("closes detail modal when close button clicked", () => {
    render(<ContraceptiveComparator onBookmark={mockOnBookmark} isBookmarked={mockIsBookmarked} />);
    const detailBtn = screen.getAllByText(/ver detalhes/i)[0];
    fireEvent.click(detailBtn);
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: /fechar/i }));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("closes detail modal when clicking backdrop", () => {
    render(<ContraceptiveComparator onBookmark={mockOnBookmark} isBookmarked={mockIsBookmarked} />);
    const detailBtn = screen.getAllByText(/ver detalhes/i)[0];
    fireEvent.click(detailBtn);
    const dialog = screen.getByRole("dialog");
    expect(dialog).toBeInTheDocument();
    fireEvent.click(dialog);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("toggles compare mode when '+ Comparar' button clicked on first method", () => {
    render(<ContraceptiveComparator onBookmark={mockOnBookmark} isBookmarked={mockIsBookmarked} />);
    const compareBtns = screen.getAllByText(/comparar/i);
    fireEvent.click(compareBtns[0]);
    expect(screen.getByText(/✓ a comparar/i)).toBeInTheDocument();
  });

  it("shows compare limit notice when trying to add 4th method", () => {
    render(<ContraceptiveComparator onBookmark={mockOnBookmark} isBookmarked={mockIsBookmarked} />);
    const compareBtns = screen.getAllByText(/comparar/i);
    fireEvent.click(compareBtns[0]);
    fireEvent.click(compareBtns[1]);
    fireEvent.click(compareBtns[2]);
    fireEvent.click(compareBtns[3]);
    expect(screen.getByText(/podes comparar no máximo 3 métodos/i)).toBeInTheDocument();
  });

  it("opens comparison modal when compare button clicked with methods selected", () => {
    render(<ContraceptiveComparator onBookmark={mockOnBookmark} isBookmarked={mockIsBookmarked} />);
    const compareBtns = screen.getAllByText(/comparar/i);
    fireEvent.click(compareBtns[0]);
    expect(screen.getByRole("button", { name: /⚖️ comparar \(1\)/i })).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: /⚖️ comparar \(1\)/i }));
    const dialog = screen.getByRole("dialog");
    expect(dialog).toBeInTheDocument();
    expect(screen.getByText(/comparando 1 método/i)).toBeInTheDocument();
  });

it("renders comparison table with correct headers", () => {
    render(<ContraceptiveComparator onBookmark={mockOnBookmark} isBookmarked={mockIsBookmarked} />);
    const compareBtns = screen.getAllByText(/comparar/i);
    fireEvent.click(compareBtns[0]);
    fireEvent.click(screen.getByRole("button", { name: /⚖️ comparar \(1\)/i }));
    const dialog = screen.getByRole("dialog");
    const tableHeaders = dialog.querySelectorAll("th");
    expect(tableHeaders).toHaveLength(2); // Critério + 1 method
    expect(dialog.querySelector("th")).toHaveTextContent(/critério/i);
    // The table has th for column headers (Critério, method name) and td for criteria rows
    const rows = dialog.querySelectorAll("tr");
    expect(rows.length).toBeGreaterThan(6); // header row + 6 data rows
    expect(dialog.textContent).toContain("Eficácia Real / Típica");
    expect(dialog.textContent).toContain("Eficácia Perfeita");
    expect(dialog.textContent).toContain("Proteção contra ISTs");
    expect(dialog.textContent).toContain("Gratuito no SNS");
    expect(dialog.textContent).toContain("Duração / Frequência");
    expect(dialog.textContent).toContain("Como atua");
  });

  it("calls onBookmark when bookmark button clicked on first method", () => {
    render(<ContraceptiveComparator onBookmark={mockOnBookmark} isBookmarked={mockIsBookmarked} />);
    const addBtns = screen.getAllByLabelText(/guardar nos favoritos/i);
    // First method (preservativo-externo) is already bookmarked, so the first "guardar nos favoritos" button is for the second method
    // Click the bookmark button for the first method by finding the card that contains "preservativo externo"
    const firstCard = screen.getByText(/preservativo externo/i).closest("div[class*='border']")!;
    const bookmarkBtn = firstCard.querySelector("button[aria-label='Guardar nos favoritos']") as HTMLButtonElement;
    if (!bookmarkBtn) {
      // If first is already bookmarked, find a method that isn't
      const cards = screen.getAllByText(/preservativo externo/i);
      const secondCard = screen.getByText(/pílula contracetiva combinada/i).closest("div[class*='border']")!;
      const secondBookmarkBtn = secondCard.querySelector("button[aria-label='Guardar nos favoritos']") as HTMLButtonElement;
      fireEvent.click(secondBookmarkBtn!);
      expect(mockOnBookmark).toHaveBeenCalledTimes(1);
      expect(mockOnBookmark).toHaveBeenCalledWith(
        expect.objectContaining({
          id: "pilula-combinada",
          type: "tool",
          title: "Pílula Contracetiva Combinada",
          category: "Método Hormonal",
          tabTarget: "ferramentas",
        })
      );
    } else {
      fireEvent.click(bookmarkBtn);
      expect(mockOnBookmark).toHaveBeenCalledTimes(1);
      expect(mockOnBookmark).toHaveBeenCalledWith(
        expect.objectContaining({
          id: "preservativo-externo",
          type: "tool",
          title: "Preservativo Externo (Masculino)",
          category: "Método de Barreira",
          tabTarget: "ferramentas",
        })
      );
    }
  });

  it("shows filled star when item is bookmarked", () => {
    render(<ContraceptiveComparator onBookmark={mockOnBookmark} isBookmarked={mockIsBookmarked} />);
    const firstCard = screen.getByText(/preservativo externo/i).closest("div[class*='border']")!;
    const bookmarkBtn = firstCard.querySelector("button[aria-label='Remover dos favoritos']") as HTMLButtonElement;
    expect(bookmarkBtn).toBeInTheDocument();
    expect(bookmarkBtn!).toHaveTextContent("★");
  });

  it("shows empty star when item is not bookmarked", () => {
    const notBookmarked = jest.fn((id: string) => false);
    render(<ContraceptiveComparator onBookmark={mockOnBookmark} isBookmarked={notBookmarked} />);
    const firstCard = screen.getByText(/preservativo externo/i).closest("div[class*='border']")!;
    const bookmarkBtn = firstCard.querySelector("button[aria-label='Guardar nos favoritos']") as HTMLButtonElement;
    expect(bookmarkBtn).toBeInTheDocument();
    expect(bookmarkBtn!).toHaveTextContent("☆");
  });

  it("shows empty state when no methods match filters", () => {
    render(<ContraceptiveComparator onBookmark={mockOnBookmark} isBookmarked={mockIsBookmarked} />);
    const input = screen.getByPlaceholderText(/pesquisar por método/i);
    fireEvent.change(input, { target: { value: "xyzinexistente" } });
    expect(screen.getByText(/nenhum método encontrado/i)).toBeInTheDocument();
    expect(screen.getByText(/tenta limpar ou alterar os teus filtros/i)).toBeInTheDocument();
  });

  it("renders method icons with aria-hidden", () => {
    render(<ContraceptiveComparator onBookmark={mockOnBookmark} isBookmarked={mockIsBookmarked} />);
    const icon = screen.getByText("🛡️");
    expect(icon).toHaveAttribute("aria-hidden", "true");
  });
});