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
    renderHeader("faq");
    const faq = screen.getByRole("tab", { name: /faq/i });
    const home = screen.getByRole("tab", { name: /início/i });
    expect(faq).toHaveAttribute("aria-selected", "true");
    expect(faq).toHaveAttribute("tabindex", "0");
    expect(home).toHaveAttribute("aria-selected", "false");
    expect(home).toHaveAttribute("tabindex", "-1");
    expect(faq).toHaveAttribute("aria-controls", "main-content");
  });

  it("activates a tab on click", () => {
    const { setActiveTab } = renderHeader("home");
    fireEvent.click(screen.getByRole("tab", { name: /quiz/i }));
    expect(setActiveTab).toHaveBeenCalledWith("quiz");
  });

  it("moves focus and activates the next tab with ArrowRight", () => {
    const { setActiveTab } = renderHeader("home");
    const home = screen.getByRole("tab", { name: /início/i });
    const podcast = screen.getByRole("tab", { name: /podcast/i });
    home.focus();
    expect(document.activeElement).toBe(home);

    fireEvent.keyDown(home, { key: "ArrowRight" });

    expect(podcast).toHaveFocus();
    expect(setActiveTab).toHaveBeenCalledWith("podcast");
  });

  it("wraps from the last tab to the first with ArrowRight", () => {
    const { setActiveTab } = renderHeader("duvidas");
    const duvidas = screen.getByRole("tab", { name: /dúvidas/i });
    const home = screen.getByRole("tab", { name: /início/i });
    duvidas.focus();

    fireEvent.keyDown(duvidas, { key: "ArrowRight" });

    expect(home).toHaveFocus();
    expect(setActiveTab).toHaveBeenCalledWith("home");
  });

  it("moves to the previous tab with ArrowLeft", () => {
    const { setActiveTab } = renderHeader("quiz");
    const quiz = screen.getByRole("tab", { name: /quiz/i });
    const recursos = screen.getByRole("tab", { name: /recursos/i });
    quiz.focus();

    fireEvent.keyDown(quiz, { key: "ArrowLeft" });

    expect(recursos).toHaveFocus();
    expect(setActiveTab).toHaveBeenCalledWith("recursos");
  });

  it("jumps to first/last tab with Home/End", () => {
    const { setActiveTab } = renderHeader("faq");
    const faq = screen.getByRole("tab", { name: /faq/i });
    const home = screen.getByRole("tab", { name: /início/i });
    const duvidas = screen.getByRole("tab", { name: /dúvidas/i });
    faq.focus();

    fireEvent.keyDown(faq, { key: "End" });
    expect(duvidas).toHaveFocus();
    expect(setActiveTab).toHaveBeenCalledWith("duvidas");

    fireEvent.keyDown(duvidas, { key: "Home" });
    expect(home).toHaveFocus();
    expect(setActiveTab).toHaveBeenCalledWith("home");
  });
});
