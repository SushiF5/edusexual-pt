import React from "react";
import { render, screen, act, waitFor } from "@testing-library/react";
import { I18nProvider, useI18n } from "@/i18n/context";

function TestComponent() {
  const { locale, setLocale, t } = useI18n();
  return (
    <div>
      <span data-testid="locale">{locale}</span>
      <span data-testid="title">{t.home}</span>
      <button onClick={() => setLocale("en")}>Switch EN</button>
      <button onClick={() => setLocale("es")}>Switch ES</button>
      <button onClick={() => setLocale("pt")}>Switch PT</button>
    </div>
  );
}

describe("I18n Context", () => {
  const originalLanguage = Object.getOwnPropertyDescriptor(window.navigator, "language");

  function mockLanguage(lang: string) {
    Object.defineProperty(window.navigator, "language", {
      value: lang,
      writable: true,
      configurable: true,
    });
  }

  beforeEach(() => {
    localStorage.clear();
    mockLanguage("pt-PT");
  });

  afterEach(() => {
    if (originalLanguage) {
      Object.defineProperty(window.navigator, "language", originalLanguage);
    }
  });

  it("defaults to Portuguese", () => {
    render(
      <I18nProvider>
        <TestComponent />
      </I18nProvider>
    );
    expect(screen.getByTestId("locale")).toHaveTextContent("pt");
    expect(screen.getByTestId("title")).toHaveTextContent("Início");
  });

  it("switches locale to English", () => {
    render(
      <I18nProvider>
        <TestComponent />
      </I18nProvider>
    );
    act(() => {
      screen.getByText("Switch EN").click();
    });
    expect(screen.getByTestId("locale")).toHaveTextContent("en");
    expect(screen.getByTestId("title")).toHaveTextContent("Home");
  });

  it("switches locale to Spanish", () => {
    render(
      <I18nProvider>
        <TestComponent />
      </I18nProvider>
    );
    act(() => {
      screen.getByText("Switch ES").click();
    });
    expect(screen.getByTestId("locale")).toHaveTextContent("es");
    expect(screen.getByTestId("title")).toHaveTextContent("Inicio");
  });

  it("persists locale to localStorage", () => {
    render(
      <I18nProvider>
        <TestComponent />
      </I18nProvider>
    );
    act(() => {
      screen.getByText("Switch EN").click();
    });
    expect(localStorage.getItem("edusexual-locale")).toBe("en");
  });

  it("restores locale from localStorage", () => {
    localStorage.setItem("edusexual-locale", "es");
    render(
      <I18nProvider>
        <TestComponent />
      </I18nProvider>
    );
    expect(screen.getByTestId("locale")).toHaveTextContent("es");
  });

  it("switches back to Portuguese from another locale", () => {
    render(
      <I18nProvider>
        <TestComponent />
      </I18nProvider>
    );
    act(() => {
      screen.getByText("Switch EN").click();
    });
    expect(screen.getByTestId("locale")).toHaveTextContent("en");
    act(() => {
      screen.getByText("Switch PT").click();
    });
    expect(screen.getByTestId("locale")).toHaveTextContent("pt");
    expect(screen.getByTestId("title")).toHaveTextContent("Início");
  });

  it("detects Spanish from navigator language", async () => {
    mockLanguage("es-ES");
    render(
      <I18nProvider>
        <TestComponent />
      </I18nProvider>
    );
    await waitFor(() => {
      expect(screen.getByTestId("locale")).toHaveTextContent("es");
    });
  });

  it("detects English from navigator language", async () => {
    mockLanguage("en-US");
    render(
      <I18nProvider>
        <TestComponent />
      </I18nProvider>
    );
    await waitFor(() => {
      expect(screen.getByTestId("locale")).toHaveTextContent("en");
    });
  });
});
