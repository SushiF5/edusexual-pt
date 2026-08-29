// Auditoria de bundle (pós-build) — EduSexual PT
//
// Analisa o output de `next build` e devolve:
//  1. O peso (raw + gzip) dos ficheiros entregues no pedido inicial.
//  2. Uma guarda de regressão para o code-splitting dos tópicos: o conteúdo das
//     audiências (criancas/jovens/adultos) NÃO pode entrar no bundle inicial.
//  3. Limiares de tamanho (warn/fail) para manter o bundle inicial sob controlo.
//
// Uso: node scripts/audit-bundle.mjs   (após `next build`)

import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { gzipSync } from "node:zlib";

const NEXT_DIR = join(process.cwd(), ".next");
const CHUNKS_DIR = join(NEXT_DIR, "static", "chunks");

const WARN_KIB = 200;
const FAIL_KIB = 350;
const WARN_KIB_FILE = 150;

const AUDIENCE_MARKERS = ["topicsCriancas", "topicsJovens", "topicsAdultos"];
const CONTENT_MARKERS = ["Conhecer o meu Corpo", "topicsJovens"];

function readManifest() {
  const path = join(NEXT_DIR, "build-manifest.json");
  try {
    return JSON.parse(readFileSync(path, "utf8"));
  } catch {
    console.error(
      `[audit] build-manifest.json não encontrado em ${NEXT_DIR}. Corra "next build" antes.`
    );
    process.exit(1);
  }
}

function kib(bytes) {
  return (bytes / 1024).toFixed(1);
}

function auditFile(rel) {
  const path = join(NEXT_DIR, rel);
  let raw;
  try {
    raw = statSync(path).size;
  } catch {
    raw = 0;
  }
  const gzip = gzipSync(readFileSync(path), { level: 9 }).length;
  const content = readFileSync(path, "utf8");
  return { rel, raw, gzip, content };
}

function containsAny(content, markers) {
  return markers.filter((m) => content.includes(m));
}

function main() {
  const manifest = readManifest();

  const initialFiles = [
    ...(manifest.polyfillFiles || []),
    ...(manifest.rootMainFiles || []),
  ];

  if (initialFiles.length === 0) {
    console.error("[audit] sem ficheiros iniciais em build-manifest.json.");
    process.exit(1);
  }

  const reports = initialFiles.map(auditFile);
  const totalRaw = reports.reduce((s, r) => s + r.raw, 0);
  const totalGzip = reports.reduce((s, r) => s + r.gzip, 0);

  // --- 1. Code-splitting dos tópicos (guarda de regressão) ---
  const leaks = reports.filter((r) => containsAny(r.content, CONTENT_MARKERS).length > 0);

  // --- 2. Chunks lazy das audiências devem existir ---
  let lazyChunks = [];
  try {
    lazyChunks = readdirSync(CHUNKS_DIR)
      .filter((f) => f.endsWith(".js"))
      .filter((f) => {
        const c = readFileSync(join(CHUNKS_DIR, f), "utf8");
        return AUDIENCE_MARKERS.some((m) => c.includes(m));
      });
  } catch {
    /* diretório de chunks em falta */
  }

  console.log("\n=== Bundle inicial (raw + gzip) ===");
  for (const r of reports) {
    const flag = r.gzip / 1024 > WARN_KIB_FILE ? " (acima de 150K gzip)" : "";
    console.log(`  ${r.rel.split("/").pop()}: ${kib(r.raw)}K raw / ${kib(r.gzip)}K gzip${flag}`);
  }
  console.log(
    `\n  TOTAL inicial: ${kib(totalRaw)}K raw / ${kib(totalGzip)}K gzip` +
      `  (warn>${WARN_KIB}K · fail>${FAIL_KIB}K)`
  );

  if (lazyChunks.length) {
    console.log(
      `\n=== Code splitting ===\n  ${lazyChunks.length} chunk(s) lazy das audiências: ${lazyChunks
        .map((f) => {
          const p = join(CHUNKS_DIR, f);
          const gz = gzipSync(readFileSync(p)).length;
          return `${f} (${kib(gz)}K gzip)`;
        })
        .join(", ")}`
    );
  }

  let failures = [];

  if (leaks.length > 0) {
    failures.push(
      `conteúdo de tópicos presente no bundle inicial (${leaks
        .map((l) => l.rel.split("/").pop())
        .join(", ")}) — o code-splitting regrediu`
    );
  }

  if (lazyChunks.length !== AUDIENCE_MARKERS.length) {
    failures.push(
      `esperados ${AUDIENCE_MARKERS.length} chunks lazy de audiências, encontrados ${lazyChunks.length}`
    );
  }

  if (totalGzip / 1024 > FAIL_KIB) {
    failures.push(`bundle inicial excede ${FAIL_KIB}K gzip (${kib(totalGzip)}K)`);
  }

  console.log(
    `\n[audit] ${failures.length === 0 ? "OK" : "FALHOU"} — ` +
      `${kib(totalGzip)}K gzip no arranque, ${lazyChunks.length} chunk(s) lazy.`
  );

  if (failures.length > 0) {
    for (const f of failures) {
      console.error(`  ✗ ${f}`);
    }
    process.exitCode = 1;
  }
}

main();