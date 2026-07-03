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

function mockLanguage(lang: string) {
  Object.defineProperty(window.navigator, "language", {
    value: lang,
    writable: true,
    configurable: true,
  });
}

describe("I18n Context", () => {
  const originalDescriptor = Object.getOwnPropertyDescriptor(window.navigator, "language");

  beforeEach(() => {
    localStorage.clear();
    mockLanguage("pt-PT");
  });

  afterEach(() => {
    if (originalDescriptor) {
      Object.defineProperty(window.navigator, "language", originalDescriptor);
    }
  });

  it("defaults to Portuguese when navigator is pt", async () => {
    render(
      <I18nProvider>
        <TestComponent />
      </I18nProvider>
    );
    await waitFor(() => {
      expect(screen.getByTestId("locale")).toHaveTextContent("pt");
    });
    expect(screen.getByTestId("title")).toHaveTextContent("Início");
  });

  it("switches locale to English", async () => {
    render(
      <I18nProvider>
        <TestComponent />
      </I18nProvider>
    );
    await act(async () => {
      screen.getByText("Switch EN").click();
    });
    expect(screen.getByTestId("locale")).toHaveTextContent("en");
    expect(screen.getByTestId("title")).toHaveTextContent("Home");
  });

  it("switches locale to Spanish", async () => {
    render(
      <I18nProvider>
        <TestComponent />
      </I18nProvider>
    );
    await act(async () => {
      screen.getByText("Switch ES").click();
    });
    expect(screen.getByTestId("locale")).toHaveTextContent("es");
    expect(screen.getByTestId("title")).toHaveTextContent("Inicio");
  });

  it("persists locale to localStorage", async () => {
    render(
      <I18nProvider>
        <TestComponent />
      </I18nProvider>
    );
    await act(async () => {
      screen.getByText("Switch EN").click();
    });
    expect(localStorage.getItem("edusexual-locale")).toBe("en");
  });

  it("restores locale from localStorage", async () => {
    localStorage.setItem("edusexual-locale", "es");
    render(
      <I18nProvider>
        <TestComponent />
      </I18nProvider>
    );
    await waitFor(() => {
      expect(screen.getByTestId("locale")).toHaveTextContent("es");
    });
  });

  it("switches back to Portuguese from another locale", async () => {
    render(
      <I18nProvider>
        <TestComponent />
      </I18nProvider>
    );
    await act(async () => {
      screen.getByText("Switch EN").click();
    });
    expect(screen.getByTestId("locale")).toHaveTextContent("en");
    await act(async () => {
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
