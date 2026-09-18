import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import MythBusterGame from "@/components/MythBusterGame";

describe("MythBusterGame", () => {
  it("renders game title and intro text", () => {
    render(<MythBusterGame />);
    expect(screen.getByText(/jogo: mito ou verdade/i)).toBeInTheDocument();
    expect(screen.getByText(/testa os teus conhecimentos/i)).toBeInTheDocument();
  });

  it("renders 6 category buttons", () => {
    render(<MythBusterGame />);
    const cats = screen.getAllByRole("button", {
      name: /todos os temas|contraceção|ists|gravidez|consentimento|corpo & prazer/i,
    });
    expect(cats).toHaveLength(6);
  });

  it("defaults to 'all' category and shows first myth statement", () => {
    render(<MythBusterGame />);
    expect(
      screen.getByText(/dois preservativos em simultâneo/i)
    ).toBeInTheDocument();
  });

  it("renders Mito and Verdade action buttons initially", () => {
    render(<MythBusterGame />);
    expect(screen.getByRole("button", { name: /mito/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /verdade/i })).toBeInTheDocument();
  });

  it("shows correct feedback when answering correctly (m1 is false → 'Mito' = correct)", () => {
    render(<MythBusterGame />);
    fireEvent.click(screen.getByRole("button", { name: /mito/i }));
    expect(screen.getByText(/acertaste/i)).toBeInTheDocument();
    expect(screen.getByText(/um mito/i)).toBeInTheDocument();
  });

  it("shows wrong feedback when answering incorrectly", () => {
    render(<MythBusterGame />);
    fireEvent.click(screen.getByRole("button", { name: /verdade/i }));
    expect(screen.getByText(/ups, não é bem assim/i)).toBeInTheDocument();
  });

  it("displays explanation and scientific context after answering", () => {
    render(<MythBusterGame />);
    fireEvent.click(screen.getByRole("button", { name: /mito/i }));
    expect(screen.getByText(/dois preservativos juntos/i)).toBeInTheDocument();
    expect(screen.getByText(/explicação científica/i)).toBeInTheDocument();
  });

  it("shows incremented score and answered count after one correct answer", () => {
    render(<MythBusterGame />);
    fireEvent.click(screen.getByRole("button", { name: /mito/i }));
    expect(screen.getByText(/acertos/i)).toBeInTheDocument();
    const ones = screen.getAllByText("1");
    expect(ones.length).toBeGreaterThanOrEqual(1);
  });

  it("navigates to next myth after answering", () => {
    render(<MythBusterGame />);
    fireEvent.click(screen.getByRole("button", { name: /mito/i }));
    fireEvent.click(screen.getByRole("button", { name: /próxima afirmação/i }));
    expect(
      screen.getByText(/impossível engravidar na primeira relação/i)
    ).toBeInTheDocument();
  });

  it("resets score and history when clicking reset", () => {
    render(<MythBusterGame />);
    fireEvent.click(screen.getByRole("button", { name: /mito/i }));
    fireEvent.click(screen.getByRole("button", { name: /próxima afirmação/i }));
    fireEvent.click(screen.getByRole("button", { name: /reiniciar/i }));
    expect(screen.getAllByText("0").length).toBeGreaterThanOrEqual(1);
    expect(
      screen.getByText(/dois preservativos em simultâneo/i)
    ).toBeInTheDocument();
  });

  it("switches category and resets to first myth", () => {
    render(<MythBusterGame />);
    fireEvent.click(screen.getByRole("button", { name: /contraceção/i }));
    expect(
      screen.getByText(/dois preservativos em simultâneo/i)
    ).toBeInTheDocument();
  });

  it("tracks streak on consecutive correct answers", () => {
    render(<MythBusterGame />);
    // m1 is false → answer "Mito" = correct
    fireEvent.click(screen.getByRole("button", { name: /mito/i }));
    expect(screen.getByText(/sequência atual/i)).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: /próxima afirmação/i }));
    // m2 is false → answer "Mito" = correct
    fireEvent.click(screen.getByRole("button", { name: /mito/i }));
    const streaks = screen.getAllByText("2");
    expect(streaks.length).toBeGreaterThanOrEqual(1);
  });

  it("hides reset button when no answers given", () => {
    render(<MythBusterGame />);
    expect(
      screen.queryByRole("button", { name: /reiniciar/i })
    ).not.toBeInTheDocument();
  });

  it("calls onBookmark when bookmark button clicked", () => {
    const onBookmark = jest.fn();
    render(<MythBusterGame onBookmark={onBookmark} />);
    const btn = screen.getByRole("button", { name: /guardar nos favoritos/i });
    fireEvent.click(btn);
    expect(onBookmark).toHaveBeenCalledTimes(1);
    expect(onBookmark).toHaveBeenCalledWith(
      expect.objectContaining({ id: "m1", type: "myth" })
    );
  });

  it("shows filled star when item is bookmarked", () => {
    const onBookmark = jest.fn();
    const isBookmarked = (id: string) => id === "m1";
    render(<MythBusterGame onBookmark={onBookmark} isBookmarked={isBookmarked} />);
    expect(screen.getByRole("button", { name: /remover dos favoritos/i })).toBeInTheDocument();
  });

  it("does not render answer buttons after answering", () => {
    render(<MythBusterGame />);
    fireEvent.click(screen.getByRole("button", { name: /mito/i }));
    expect(screen.queryByRole("button", { name: /^mito$/i })).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /^verdade$/i })).not.toBeInTheDocument();
  });
});
