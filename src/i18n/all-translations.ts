import { pt } from "./locales/pt";
import { en } from "./locales/en";
import { es } from "./locales/es";
import type { Locale, TranslationKeys } from "./translations";

export const translations: Record<Locale, TranslationKeys> = { pt, en, es };
