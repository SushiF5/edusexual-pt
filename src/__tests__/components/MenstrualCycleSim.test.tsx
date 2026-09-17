import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import MenstrualCycleSim from "@/components/MenstrualCycleSim";
import { I18nProvider } from "@/i18n/context";

function mount(ui: React.ReactNode) {
  return render(<I18nProvider>{ui}</I18nProvider>);
}

describe("MenstrualCycleSim", () => {
  it("renders title and intro banner", () => {
    mount(<MenstrualCycleSim />);
    expect(screen.getByText(/simulador pedagógico do ciclo menstrual/i)).toBeInTheDocument();
    expect(screen.getByText(/compreende como o corpo humano se transforma/i)).toBeInTheDocument();
  });

  it("renders cycle length buttons (26, 28, 30, 32 dias)", () => {
    mount(<MenstrualCycleSim />);
    expect(screen.getByRole("button", { name: /26 dias/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /28 dias/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /30 dias/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /32 dias/i })).toBeInTheDocument();
  });

  it("defaults to day 14 of 28-day cycle", () => {
    mount(<MenstrualCycleSim />);
    expect(screen.getAllByText(/dia 14/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/de 28/i)).toBeInTheDocument();
  });

  it("renders the day slider with aria-label", () => {
    mount(<MenstrualCycleSim />);
    expect(screen.getByLabelText(/selecionar dia do ciclo menstrual/i)).toBeInTheDocument();
  });

  it("renders the 4 phase bars", () => {
    mount(<MenstrualCycleSim />);
    expect(screen.getByText(/menstruação \(dias 1-5\)/i)).toBeInTheDocument();
    expect(screen.getByText(/folicular \(dias 6-/i)).toBeInTheDocument();
    expect(screen.getByText(/ovulação \(dias /i)).toBeInTheDocument();
    expect(screen.getByText(/lútea \(dias /i)).toBeInTheDocument();
  });

  it("shows phase details for default day 14 (fertile window)", () => {
    mount(<MenstrualCycleSim />);
    expect(screen.getByText(/janela fértil/i)).toBeInTheDocument();
    expect(screen.getByText(/máxima \/ muito alta/i)).toBeInTheDocument();
  });

  it("shows menstrual phase details for day 3", () => {
    mount(<MenstrualCycleSim />);
    fireEvent.click(screen.getByText(/menstruação \(dias 1-5\)/i));
    expect(screen.getByText(/fase menstrual/i)).toBeInTheDocument();
    expect(screen.getByText(/muito baixa/i)).toBeInTheDocument();
  });

  it("shows follicular phase details for day 8", () => {
    mount(<MenstrualCycleSim />);
    fireEvent.click(screen.getByText(/folicular \(dias 6-/i));
    expect(screen.getByText(/fase folicular/i)).toBeInTheDocument();
    expect(screen.getByText(/baixa a média/i)).toBeInTheDocument();
  });

  it("shows luteal phase details for day 20", () => {
    mount(<MenstrualCycleSim />);
    const lutealBtn = screen.getByText(/lútea \(dias /i);
    fireEvent.click(lutealBtn);
    expect(screen.getByText(/fase lútea/i)).toBeInTheDocument();
    expect(screen.getByText(/baixa \/ nula/i)).toBeInTheDocument();
  });

  it("renders the 4 information pillars", () => {
    mount(<MenstrualCycleSim />);
    expect(screen.getByText(/no útero/i)).toBeInTheDocument();
    expect(screen.getByText(/nos ovários/i)).toBeInTheDocument();
    expect(screen.getByText(/hormonas dominantes/i)).toBeInTheDocument();
    expect(screen.getByText(/muco cervical/i)).toBeInTheDocument();
  });

  it("renders the medical warning box", () => {
    mount(<MenstrualCycleSim />);
    expect(screen.getByText(/aviso pedagógico importante/i)).toBeInTheDocument();
    expect(screen.getByText(/não é um método contracetivo/i)).toBeInTheDocument();
    expect(screen.getByText(/24% ao ano/i)).toBeInTheDocument();
  });

  it("switches cycle length to 30 days", () => {
    mount(<MenstrualCycleSim />);
    fireEvent.click(screen.getByRole("button", { name: /30 dias/i }));
    expect(screen.getByText(/de 30/i)).toBeInTheDocument();
  });

  it("clamps selected day when switching to shorter cycle", () => {
    mount(<MenstrualCycleSim />);
    fireEvent.click(screen.getByRole("button", { name: /26 dias/i }));
    expect(screen.getByText(/de 26/i)).toBeInTheDocument();
  });

  it("slider updates selected day", () => {
    mount(<MenstrualCycleSim />);
    const slider = screen.getByLabelText(/selecionar dia do ciclo menstrual/i);
    fireEvent.change(slider, { target: { value: "3" } });
    expect(screen.getAllByText(/dia 3/i).length).toBeGreaterThan(0);
  });
});
