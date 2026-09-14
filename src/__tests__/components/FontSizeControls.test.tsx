import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import FontSizeControls from "@/components/FontSizeControls";
import { I18nProvider } from "@/i18n/context";

function mount(ui: React.ReactNode) {
  return render(<I18nProvider>{ui}</I18nProvider>);
}

beforeEach(() => {
  localStorage.clear();
  document.documentElement.className = "";
});

describe("FontSizeControls", () => {
  it("renders the A-A button with accessible label", () => {
    mount(<FontSizeControls />);
    expect(
      screen.getByRole("button", { name: /tamanho de texto|font size/i })
    ).toBeInTheDocument();
  });

  it("opens dropdown on click and shows 4 size options", () => {
    mount(<FontSizeControls />);
    fireEvent.click(screen.getByRole("button", { name: /tamanho de texto|font size/i }));
    expect(screen.getByText("Pequeno")).toBeInTheDocument();
    expect(screen.getByText("Normal")).toBeInTheDocument();
    expect(screen.getByText("Grande")).toBeInTheDocument();
    expect(screen.getByText("Muito Grande")).toBeInTheDocument();
  });

  it("applies text-size-lg class when Grande is selected", () => {
    mount(<FontSizeControls />);
    fireEvent.click(screen.getByRole("button", { name: /tamanho de texto|font size/i }));
    fireEvent.click(screen.getByText("Grande"));
    expect(document.documentElement.classList.contains("text-size-lg")).toBe(true);
  });

  it("persists choice to localStorage", () => {
    mount(<FontSizeControls />);
    fireEvent.click(screen.getByRole("button", { name: /tamanho de texto|font size/i }));
    fireEvent.click(screen.getByText("Pequeno"));
    expect(localStorage.getItem("edusexual_font_size")).toBe("sm");
  });

  it("loads saved preference from localStorage on mount", () => {
    localStorage.setItem("edusexual_font_size", "xl");
    mount(<FontSizeControls />);
    expect(document.documentElement.classList.contains("text-size-xl")).toBe(true);
  });

  it("closes dropdown after selecting a size", () => {
    mount(<FontSizeControls />);
    fireEvent.click(screen.getByRole("button", { name: /tamanho de texto|font size/i }));
    fireEvent.click(screen.getByText("Normal"));
    expect(screen.queryByText("Pequeno")).not.toBeInTheDocument();
  });
});
