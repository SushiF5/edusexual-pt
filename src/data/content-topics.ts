import type { Topic } from "./content-types";
import { Audience } from "@/types";

// Lazy-loaded topic modules by audience
const topicModules: Record<Audience, () => Promise<{ default: Topic[] }>> = {
  criancas: () => import("./content-topics-criancas"),
  jovens: () => import("./content-topics-jovens"),
  adultos: () => import("./content-topics-adultos"),
};

/**
 * Dynamically loads topics for a specific audience.
 * Only the relevant audience's chunk is fetched, reducing initial bundle size.
 */
export async function loadTopicsByAudience(audience: Audience): Promise<Topic[]> {
  const mod = await topicModules[audience]();
  return mod.default;
}

/**
 * Synchronous topics array for backward compatibility (tests, integrity checks).
 * In production, prefer loadTopicsByAudience() for code-splitting.
 */
export const topics: Topic[] = [];