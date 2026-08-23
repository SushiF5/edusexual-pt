import { translations, TranslationKeys } from "@/i18n/translations";

describe("i18n Translation Integrity", () => {
  const keys = Object.keys(translations.pt) as (keyof TranslationKeys)[];

  it("all three locales have the same set of keys", () => {
    const ptKeys = new Set(Object.keys(translations.pt));
    const enKeys = new Set(Object.keys(translations.en));
    const esKeys = new Set(Object.keys(translations.es));

    // Check EN has all PT keys
    for (const key of ptKeys) {
      expect(enKeys.has(key)).toBe(true);
    }

    // Check ES has all PT keys
    for (const key of ptKeys) {
      expect(esKeys.has(key)).toBe(true);
    }

    // Check no extra keys in EN
    expect(enKeys.size).toBe(ptKeys.size);
    expect(esKeys.size).toBe(ptKeys.size);
  });

  it("no translation value is empty", () => {
    for (const key of keys) {
      expect(translations.pt[key]).toBeTruthy();
      expect(translations.en[key]).toBeTruthy();
      expect(translations.es[key]).toBeTruthy();
    }
  });

  it("no missing translations in EN", () => {
    const missing: string[] = [];
    for (const key of keys) {
      const enVal = translations.en[key];
      const esVal = translations.es[key];
      if (!enVal || typeof enVal !== "string" || enVal.trim() === "") {
        missing.push(`EN: ${key}`);
      }
      if (!esVal || typeof esVal !== "string" || esVal.trim() === "") {
        missing.push(`ES: ${key}`);
      }
    }
    expect(missing).toEqual([]);
  });

  it("Portuguese translations use European Portuguese conventions", () => {
    expect(translations.pt.welcomeTitle).toMatch(/Bem-vindo/);
    expect(translations.pt.questionSendError).toMatch(/Tenta novamente/);
  });

  it("all tab labels are distinct across locales", () => {
    expect(translations.pt.tabPodcast).not.toBe(translations.pt.tabQuiz);
    expect(translations.en.tabPodcast).toBe("Podcast");
    expect(translations.en.tabQuiz).toBe("Quiz");
    expect(translations.es.tabResources).toBe("Recursos");
  });

  it("no duplicate values within same locale for UI labels", () => {
    const labelKeys: (keyof TranslationKeys)[] = ["home", "tabPodcast", "tabQuiz", "tabFaq", "tabResources", "tabDoubts",
      "children", "youth", "adults", "resourcesTitle", "podcastTitle", "faqTitle", "doubtsTitle"];
    const ptValues = new Set(labelKeys.map((k) => translations.pt[k]));
    // allow "FAQ" and "Podcast" to be same across languages, but not within one
    expect(ptValues.size).toBe(labelKeys.length);
  });
});