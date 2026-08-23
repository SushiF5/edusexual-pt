"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Locale, translations, T } from "@/i18n/translations";

interface I18nContextValue {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: T;
}

const I18nContext = createContext<I18nContextValue>({
  locale: "pt",
  setLocale: () => {},
  t: translations.pt,
});

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("pt");

  useEffect(() => {
    const saved = localStorage.getItem("edusexual-locale") as Locale | null;
    if (saved && (saved === "pt" || saved === "en" || saved === "es")) {
      setLocaleState(saved);
    } else {
      const nav = navigator.language.toLowerCase();
      if (nav.startsWith("es")) setLocaleState("es");
      else if (nav.startsWith("en")) setLocaleState("en");
    }
  }, []);

  const setLocale = (l: Locale) => {
    setLocaleState(l);
    localStorage.setItem("edusexual-locale", l);
  };

  const t = translations[locale];

  return (
    <I18nContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  return useContext(I18nContext);
}
