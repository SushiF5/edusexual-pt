import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import StiTestingGuideTool from "@/components/StiTestingGuideTool";

describe("StiTestingGuideTool", () => {
  it("renders PEP urgent warning alert", () => {
    render(<StiTestingGuideTool />);
    expect(screen.getByText(/exposição de risco recente \(menos de 72 horas\)/i)).toBeInTheDocument();
    expect(screen.getByText(/pep \(profilaxia pós-exposição\)/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /ligar sns 24 \(808 24 24 24\)/i })).toBeInTheDocument();
  });

  it("renders STI directory with all STIs", () => {
    render(<StiTestingGuideTool />);
    expect(screen.getByText(/infeções sexualmente transmissíveis \(ists\)/i)).toBeInTheDocument();
    const clamidia = screen.getAllByText(/clamídia \(chlamydia trachomatis\)/i);
    expect(clamidia.length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText(/gonorreia \/ blenorragia/i)).toBeInTheDocument();
    expect(screen.getByText(/vih \(vírus da imunodeficiência humana\)/i)).toBeInTheDocument();
    expect(screen.getByText(/hpv \(vírus do papiloma humano\)/i)).toBeInTheDocument();
    expect(screen.getByText(/sífilis \(treponema pallidum\)/i)).toBeInTheDocument();
    expect(screen.getByText(/herpes genital \(hsv-1 \/ hsv-2\)/i)).toBeInTheDocument();
  });

  it("selects first STI by default and shows details", () => {
    render(<StiTestingGuideTool />);
    const clamidiaInList = screen.getAllByText(/clamídia \(chlamydia trachomatis\)/i);
    expect(clamidiaInList.length).toBeGreaterThanOrEqual(1);
    const bacteriaTags = screen.getAllByText(/bactéria/i);
    expect(bacteriaTags.length).toBeGreaterThan(0);
    expect(screen.getByText(/como se transmite:/i)).toBeInTheDocument();
    expect(screen.getByText(/atenção \/ assintomático:/i)).toBeInTheDocument();
    expect(screen.getByText(/sintomas frequentes/i)).toBeInTheDocument();
    expect(screen.getByText(/período de janela imunológica/i)).toBeInTheDocument();
    expect(screen.getByText(/tratamento:/i)).toBeInTheDocument();
    expect(screen.getByText(/acesso no sns:/i)).toBeInTheDocument();
  });

  it("switches STI when clicking on another in the list", () => {
    render(<StiTestingGuideTool />);
    fireEvent.click(screen.getByRole("button", { name: /gonorreia \/ blenorragia/i }));
    const detailsTitle = screen.getByRole("heading", { level: 3, name: /gonorreia \/ blenorragia/i });
    expect(detailsTitle).toBeInTheDocument();
    const bacteriaTags = screen.getAllByText(/bactéria/i);
    expect(bacteriaTags.length).toBeGreaterThan(0);
  });

  it("shows window period calculator with slider", () => {
    render(<StiTestingGuideTool />);
    expect(screen.getByRole("heading", { level: 3, name: /simulador do período de janela \(quando fazer o teste\?\)/i })).toBeInTheDocument();
    const slider = screen.getByRole("slider");
    expect(slider).toBeInTheDocument();
    expect(slider).toHaveAttribute("min", "1");
    expect(slider).toHaveAttribute("max", "90");
  });

  it("updates window period results when slider changes", () => {
    render(<StiTestingGuideTool />);
    const slider = screen.getByRole("slider");
    fireEvent.change(slider, { target: { value: "30" } });
    expect(screen.getByText(/30 dias atrás/i)).toBeInTheDocument();
    const reliableTests = screen.getAllByText(/teste fiável/i);
    expect(reliableTests.length).toBeGreaterThan(0);
  });

  it("shows testing centers directory", () => {
    render(<StiTestingGuideTool />);
    expect(screen.getByText(/onde fazer rastreios anónimos e gratuitos em portugal/i)).toBeInTheDocument();
    expect(screen.getByText(/rede cad — centros de aconselhamento e deteção precoce \(sns\)/i)).toBeInTheDocument();
    expect(screen.getByText(/checkpointlx \(gat portugal\)/i)).toBeInTheDocument();
    expect(screen.getByText(/apf norte — centro de atendimento a jovens/i)).toBeInTheDocument();
  });

  it("filters testing centers by region", () => {
    render(<StiTestingGuideTool />);
    const select = screen.getByRole("combobox");
    fireEvent.change(select, { target: { value: "Norte" } });
    expect(screen.getByText(/apf norte — centro de atendimento a jovens/i)).toBeInTheDocument();
    expect(screen.queryByText(/checkpointlx \(gat portugal\)/i)).not.toBeInTheDocument();
  });

  it("shows center details: name, address, features, phone, website", () => {
    render(<StiTestingGuideTool />);
    const freeBadges = screen.getAllByText(/gratuito & anónimo/i);
    expect(freeBadges.length).toBeGreaterThan(0);
    expect(screen.getByText(/rastreio vih, hepatites b\/c e sífilis/i)).toBeInTheDocument();
    const websiteLinks = screen.getAllByRole("link", { name: /website ↗/i });
    expect(websiteLinks.length).toBeGreaterThan(0);
    const phoneLinks = screen.getAllByRole("link", { name: /📞/i });
    expect(phoneLinks.length).toBeGreaterThan(0);
  });

  it("calls onBookmark when bookmark button is clicked on an STI", () => {
    const onBookmark = jest.fn();
    const isBookmarked = () => false;
    render(<StiTestingGuideTool onBookmark={onBookmark} isBookmarked={isBookmarked} />);
    const bookmarkBtn = screen.getByRole("button", { name: /guardar/i });
    fireEvent.click(bookmarkBtn);
    expect(onBookmark).toHaveBeenCalledTimes(1);
    expect(onBookmark).toHaveBeenCalledWith(
      expect.objectContaining({ id: "sti-chlamydia", type: "tool" })
    );
  });

  it("shows filled star when STI is bookmarked", () => {
    const onBookmark = jest.fn();
    const isBookmarked = (id: string) => id === "sti-chlamydia";
    render(<StiTestingGuideTool onBookmark={onBookmark} isBookmarked={isBookmarked} />);
    expect(screen.getByRole("button", { name: /remover dos favoritos|guardado/i })).toBeInTheDocument();
  });
});