import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import StepByStepGuides from "@/components/StepByStepGuides";
import { I18nProvider } from "@/i18n/context";

function mount(ui: React.ReactNode) {
  return render(<I18nProvider>{ui}</I18nProvider>);
}

describe("StepByStepGuides", () => {
  it("renders title and intro banner", () => {
    mount(<StepByStepGuides />);
    expect(screen.getByText(/guias passo a passo interativos/i)).toBeInTheDocument();
    expect(screen.getByText(/instruções práticas e visuais/i)).toBeInTheDocument();
  });

  it("renders 3 guide selector tabs", () => {
    mount(<StepByStepGuides />);
    const tabs = screen.getAllByRole("button", { name: /como colocar o preservativo externo corretamente/i });
    expect(tabs.length).toBeGreaterThan(0);
    expect(screen.getByText(/guia de uso da contraceção de emergência/i)).toBeInTheDocument();
    expect(screen.getByText(/guia de autoexame e sinais de alerta genital/i)).toBeInTheDocument();
  });

  it("defaults to first guide (preservativo externo)", () => {
    mount(<StepByStepGuides />);
    const badges = screen.getAllByText(/Essencial/i);
    expect(badges.length).toBeGreaterThan(0);
    expect(screen.getByText(/1 minuto/i)).toBeInTheDocument();
    expect(screen.getByText(/passo 1 de 8/i)).toBeInTheDocument();
  });

  it("renders all 8 step progress dots for first guide", () => {
    mount(<StepByStepGuides />);
    for (let i = 1; i <= 8; i++) {
      expect(screen.getByText(String(i))).toBeInTheDocument();
    }
  });

  it("shows step 1 details by default", () => {
    mount(<StepByStepGuides />);
    expect(screen.getByText(/verificar a validade e embalagem/i)).toBeInTheDocument();
    expect(screen.getByText(/confirma a data de validade/i)).toBeInTheDocument();
    expect(screen.getByText(/nunca guardes preservativos soltos/i)).toBeInTheDocument();
  });

  it("navigates to step 2 when clicking step 2 dot", () => {
    mount(<StepByStepGuides />);
    fireEvent.click(screen.getByText("2"));
    expect(screen.getByText(/abrir a embalagem com cuidado/i)).toBeInTheDocument();
    expect(screen.getByText(/nunca uses dentes/i)).toBeInTheDocument();
  });

  it("navigates to next step using Próximo Passo button", () => {
    mount(<StepByStepGuides />);
    fireEvent.click(screen.getByText(/próximo passo/i));
    expect(screen.getByText(/abrir a embalagem com cuidado/i)).toBeInTheDocument();
    expect(screen.getByText("2 / 8")).toBeInTheDocument();
  });

  it("navigates to previous step using Passo Anterior button", () => {
    mount(<StepByStepGuides />);
    fireEvent.click(screen.getByText(/próximo passo/i));
    fireEvent.click(screen.getByText(/passo anterior/i));
    expect(screen.getByText(/verificar a validade e embalagem/i)).toBeInTheDocument();
    expect(screen.getByText("1 / 8")).toBeInTheDocument();
  });

  it("disables Passo Anterior button on first step", () => {
    mount(<StepByStepGuides />);
    expect(screen.getByText(/passo anterior/i)).toBeDisabled();
  });

  it("disables Próximo Passo button on last step", () => {
    mount(<StepByStepGuides />);
    for (let i = 1; i < 8; i++) {
      fireEvent.click(screen.getByText(/próximo passo/i));
    }
    expect(screen.getByText(/próximo passo/i)).toBeDisabled();
  });

  it("switches to second guide (pílula do dia seguinte) and resets to step 1", () => {
    mount(<StepByStepGuides />);
    fireEvent.click(screen.getByText(/guia de uso da contraceção de emergência/i));
    const titles = screen.getAllByText(/guia de uso da contraceção de emergência/i);
    expect(titles.length).toBeGreaterThan(0);
    const badges = screen.getAllByText(/Urgência/i);
    expect(badges.length).toBeGreaterThan(0);
    expect(screen.getByText(/2 minutos/i)).toBeInTheDocument();
    expect(screen.getByText(/passo 1 de 6/i)).toBeInTheDocument();
    expect(screen.getByText(/avaliar a situação de risco/i)).toBeInTheDocument();
  });

  it("switches to third guide (autoexame) and shows 5 steps", () => {
    mount(<StepByStepGuides />);
    fireEvent.click(screen.getByText(/guia de autoexame e sinais de alerta genital/i));
    const titles = screen.getAllByText(/guia de autoexame e sinais de alerta genital/i);
    expect(titles.length).toBeGreaterThan(0);
    const badges = screen.getAllByText(/Saúde Preventiva/i);
    expect(badges.length).toBeGreaterThan(0);
    expect(screen.getByText(/3 minutos/i)).toBeInTheDocument();
    expect(screen.getByText(/passo 1 de 5/i)).toBeInTheDocument();
  });

  it("renders common mistakes section for first guide", () => {
    mount(<StepByStepGuides />);
    expect(screen.getByText(/erros mais comuns a evitar/i)).toBeInTheDocument();
    expect(screen.getByText(/desenrolar o preservativo antes/i)).toBeInTheDocument();
    expect(screen.getByText(/esquecer de apertar o reservatório/i)).toBeInTheDocument();
  });

  it("calls onBookmark when bookmark button is clicked", () => {
    const onBookmark = jest.fn();
    mount(<StepByStepGuides onBookmark={onBookmark} />);
    fireEvent.click(screen.getByRole("button", { name: /guardar nos favoritos/i }));
    expect(onBookmark).toHaveBeenCalledWith(expect.objectContaining({
      id: "preservativo-externo-passos",
      type: "guide",
      title: "Como Colocar o Preservativo Externo Corretamente",
      category: "Essencial",
      tabTarget: "ferramentas",
    }));
  });

  it("shows filled star when item is bookmarked", () => {
    const onBookmark = jest.fn();
    const isBookmarked = jest.fn(() => true);
    mount(<StepByStepGuides onBookmark={onBookmark} isBookmarked={isBookmarked} />);
    const bookmarkBtn = screen.getByRole("button", { name: /remover dos favoritos/i });
    expect(bookmarkBtn).toHaveTextContent("★");
  });

  it("shows empty star when item is not bookmarked", () => {
    const onBookmark = jest.fn();
    const isBookmarked = jest.fn(() => false);
    mount(<StepByStepGuides onBookmark={onBookmark} isBookmarked={isBookmarked} />);
    const bookmarkBtn = screen.getByRole("button", { name: /guardar nos favoritos/i });
    expect(bookmarkBtn).toHaveTextContent("☆");
  });
});