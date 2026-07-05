export type Audience = "criancas" | "jovens" | "adultos";

export type TabId = "home" | "podcast" | "recursos" | "quiz" | "faq" | "duvidas";

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
