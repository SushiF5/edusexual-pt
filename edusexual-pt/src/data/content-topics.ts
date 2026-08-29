import type { Topic } from "./content-types";
import { Audience } from "@/types";

// Conteúdo de tópicos por audiência em módulos separados (code splitting).
// Cada audiência carrega apenas o respetivo chunk, reduzindo o bundle inicial.
const topicModules: Record<Audience, () => Promise<{ default: Topic[] }>> = {
  criancas: () => import("./content-topics-criancas"),
  jovens: () => import("./content-topics-jovens"),
  adultos: () => import("./content-topics-adultos"),
};

/**
 * Carrega de forma dinâmica os tópicos de uma audiência específica.
 * Só o chunk da audiência selecionada é descarregado em produção.
 */
export async function loadTopicsByAudience(audience: Audience): Promise<Topic[]> {
  const mod = await topicModules[audience]();
  return mod.default;
}