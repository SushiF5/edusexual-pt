export type Audience = "criancas" | "jovens" | "adultos";

export type TabId =
  | "home"
  | "ferramentas"
  | "podcast"
  | "recursos"
  | "quiz"
  | "glossario"
  | "direitos"
  | "faq"
  | "duvidas";

export type FontSizeOption = "sm" | "base" | "lg" | "xl";

export interface BookmarkItem {
  id: string;
  type: "topic" | "guide" | "myth" | "glossary" | "tool" | "right";
  title: string;
  category?: string;
  tabTarget?: TabId;
  savedAt: number;
}

export interface Episode {
  title: string;
  description: string;
  link: string;
  pubDate: string;
  duration: string;
  episode: number | null;
  season: number | null;
  image: string | null;
  audioUrl: string;
  guid: string;
}

