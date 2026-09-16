import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import GlobalSearchModal from "@/components/GlobalSearchModal";
import { I18nProvider } from "@/i18n/context";

function mount(ui: React.ReactNode) {
  return render(<I18nProvider>{ui}</I18nProvider>);
}

describe("GlobalSearchModal", () => {
  const onClose = jest.fn();
  const onNavigateTab = jest.fn();

  beforeEach(() => {
    onClose.mockClear();
    onNavigateTab.mockClear();
  });

  it("returns null when closed", () => {
    const { container } = mount(
      <GlobalSearchModal isOpen={false} onClose={onClose} onNavigateTab={onNavigateTab} />
    );
    expect(container.firstChild).toBeNull();
  });

  it("renders search input and empty state", () => {
    mount(
      <GlobalSearchModal isOpen={true} onClose={onClose} onNavigateTab={onNavigateTab} />
    );
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/pesquisar/i)).toBeInTheDocument();
    expect(screen.getByText(/pesquisa rápida global/i)).toBeInTheDocument();
  });

  it("shows suggestion chips and populates input on click", () => {
    mount(
      <GlobalSearchModal isOpen={true} onClose={onClose} onNavigateTab={onNavigateTab} />
    );
    expect(screen.getByText("Pílula do dia seguinte")).toBeInTheDocument();
    fireEvent.click(screen.getByText("Pílula do dia seguinte"));
    expect(screen.getByPlaceholderText(/pesquisar/i)).toHaveValue("Pílula do dia seguinte");
  });

  it("filters results and shows matching items", async () => {
    mount(
      <GlobalSearchModal isOpen={true} onClose={onClose} onNavigateTab={onNavigateTab} />
    );
    fireEvent.change(screen.getByPlaceholderText(/pesquisar/i), {
      target: { value: "pílula" },
    });
    await waitFor(() => {
      expect(screen.getAllByText(/pílula do dia seguinte/i)).toHaveLength(3);
    });
  });

  it("shows no-results message for non-matching query", async () => {
    mount(
      <GlobalSearchModal isOpen={true} onClose={onClose} onNavigateTab={onNavigateTab} />
    );
    fireEvent.change(screen.getByPlaceholderText(/pesquisar/i), {
      target: { value: "xyzinexistente123" },
    });
    await waitFor(() => {
      expect(screen.getByText(/nenhum resultado/i)).toBeInTheDocument();
    });
  });

  it("clears input when X button is clicked", async () => {
    mount(
      <GlobalSearchModal isOpen={true} onClose={onClose} onNavigateTab={onNavigateTab} />
    );
    fireEvent.change(screen.getByPlaceholderText(/pesquisar/i), {
      target: { value: "teste" },
    });
    expect(screen.getByPlaceholderText(/pesquisar/i)).toHaveValue("teste");
    fireEvent.click(screen.getByText("✕"));
    expect(screen.getByPlaceholderText(/pesquisar/i)).toHaveValue("");
  });

  it("navigates and closes when selecting a result", async () => {
    mount(
      <GlobalSearchModal isOpen={true} onClose={onClose} onNavigateTab={onNavigateTab} />
    );
    fireEvent.change(screen.getByPlaceholderText(/pesquisar/i), {
      target: { value: "pílula" },
    });
    await waitFor(() => {
      expect(screen.getAllByText(/pílula do dia seguinte/i)).toHaveLength(3);
    });
    fireEvent.click(screen.getAllByText(/pílula do dia seguinte/i)[0]);
    expect(onNavigateTab).toHaveBeenCalled();
    expect(onClose).toHaveBeenCalled();
  });

  it("closes on Escape key", () => {
    mount(
      <GlobalSearchModal isOpen={true} onClose={onClose} onNavigateTab={onNavigateTab} />
    );
    fireEvent.keyDown(window, { key: "Escape" });
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("closes on backdrop click", () => {
    const { container } = mount(
      <GlobalSearchModal isOpen={true} onClose={onClose} onNavigateTab={onNavigateTab} />
    );
    fireEvent.click(container.querySelector(".bg-black\\/60")!);
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});