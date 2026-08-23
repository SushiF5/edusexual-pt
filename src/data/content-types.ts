import { Audience } from "@/types";

export interface Topic {
  id: string;
  title: string;
  description: string;
  icon: string;
  audience: Audience;
  audioUrl?: string;
  articles: Article[];
}

export interface Article {
  id: string;
  title: string;
  content: string;
  category: string;
  audioUrl?: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  topic: string;
  audience: Audience;
}

export interface FAQEntry {
  id: string;
  question: string;
  answer: string;
  audience: Audience[];
}

export interface GuideSection {
  heading: string;
  body: string;
}

export interface Guide {
  id: string;
  title: string;
  description: string;
  icon: string;
  audience: Audience | "todos";
  sections: GuideSection[];
}
