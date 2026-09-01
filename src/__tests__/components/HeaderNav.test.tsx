import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import HeaderNav, { navTabIds } from "@/components/HeaderNav";
import { translations } from "@/i18n/all-translations";
import { TabId } from "@/types";

function renderHeader(activeTab: TabId = "home", setActiveTab = jest.fn()) {
  const setLocale = jest.fn();
  const toggleDarkMode = jest.fn();
  const setShowAudienceSelector = jest.fn();
  const setMobileMenuOpen = jest.fn();

  render(
    <HeaderNav
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      locale="pt"
      setLocale={setLocale}
      darkMode={false}
      toggleDarkMode={toggleDarkMode}
      setShowAudienceSelector={setShowAudienceSelector}
      mobileMenuOpen={false}
      setMobileMenuOpen={setMobileMenuOpen}
      t={translations.pt}
    />
  );

  return { setActiveTab, setLocale, toggleDarkMode, setShowAudienceSelector, setMobileMenuOpen };
}

describe("HeaderNav — ARIA tabs pattern", () => {
  it("renders a tablist with one tab per nav item", () => {
    renderHeader();
    expect(screen.getByRole("tablist", { name: /navegar/i })).toBeInTheDocument();
    expect(screen.getAllByRole("tab")).toHaveLength(navTabIds.length);
  });

  it("marks the active tab as selected with tabIndex 0 and others as -1", () => {
    renderHeader("direitos");
    const direitos = screen.getByRole("tab", { name: /linhas/i });
    const home = screen.getByRole("tab", { name: /início/i });
    expect(direitos).toHaveAttribute("aria-selected", "true");
    expect(direitos).toHaveAttribute("tabindex", "0");
    expect(home).toHaveAttribute("aria-selected", "false");
    expect(home).toHaveAttribute("tabindex", "-1");
    expect(direitos).toHaveAttribute("aria-controls", "main-content");
  });

  it("activates a tab on click", () => {
    const { setActiveTab } = renderHeader("home");
    fireEvent.click(screen.getByRole("tab", { name: /ferramentas/i }));
    expect(setActiveTab).toHaveBeenCalledWith("ferramentas");
  });

  it("moves focus and activates the next tab with ArrowRight", () => {
    const { setActiveTab } = renderHeader("home");
    const home = screen.getByRole("tab", { name: /início/i });
    const recursos = screen.getByRole("tab", { name: /aprender/i });
    home.focus();
    expect(document.activeElement).toBe(home);

    fireEvent.keyDown(home, { key: "ArrowRight" });

    expect(recursos).toHaveFocus();
    expect(setActiveTab).toHaveBeenCalledWith("recursos");
  });

  it("wraps from the last tab to the first with ArrowRight", () => {
    const { setActiveTab } = renderHeader("direitos");
    const direitos = screen.getByRole("tab", { name: /linhas/i });
    const home = screen.getByRole("tab", { name: /início/i });
    direitos.focus();

    fireEvent.keyDown(direitos, { key: "ArrowRight" });

    expect(home).toHaveFocus();
    expect(setActiveTab).toHaveBeenCalledWith("home");
  });

  it("moves to the previous tab with ArrowLeft", () => {
    const { setActiveTab } = renderHeader("ferramentas");
    const ferramentas = screen.getByRole("tab", { name: /ferramentas/i });
    const recursos = screen.getByRole("tab", { name: /aprender/i });
    ferramentas.focus();

    fireEvent.keyDown(ferramentas, { key: "ArrowLeft" });

    expect(recursos).toHaveFocus();
    expect(setActiveTab).toHaveBeenCalledWith("recursos");
  });

  it("jumps to first/last tab with Home/End", () => {
    const { setActiveTab } = renderHeader("recursos");
    const recursos = screen.getByRole("tab", { name: /aprender/i });
    const home = screen.getByRole("tab", { name: /início/i });
    const direitos = screen.getByRole("tab", { name: /linhas/i });
    recursos.focus();

    fireEvent.keyDown(recursos, { key: "End" });
    expect(direitos).toHaveFocus();
    expect(setActiveTab).toHaveBeenCalledWith("direitos");

    fireEvent.keyDown(direitos, { key: "Home" });
    expect(home).toHaveFocus();
    expect(setActiveTab).toHaveBeenCalledWith("home");
  });
});
