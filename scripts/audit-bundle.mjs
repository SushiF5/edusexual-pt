#!/usr/bin/env node
/**
 * Auditoria de bundle para CI.
 * Falha se o bundle inicial exceder limites definidos.
 */

import fs from 'fs';
import { gzipSync } from 'zlib';

const LIMITS = {
  totalGzipKB: 200,      // limite total do bundle inicial
  perFileGzipKB: 150,    // limite por ficheiro
};

function kib(bytes) {
  return (bytes / 1024).toFixed(1);
}

function main() {
  const manifest = JSON.parse(fs.readFileSync('.next/build-manifest.json', 'utf8'));
  const files = [...(manifest.polyfillFiles || []), ...(manifest.rootMainFiles || [])];

  if (files.length === 0) {
    console.error('❌ Nenhum ficheiro inicial encontrado em build-manifest.json');
    process.exit(1);
  }

  let totalGzip = 0;
  let failed = false;

  console.log('\n=== Auditoria de Bundle Inicial ===\n');

  for (const f of files) {
    const path = '.next/' + f;
    const raw = fs.readFileSync(path);
    const gzip = gzipSync(raw).length;
    totalGzip += gzip;

    const rawKB = raw.length / 1024;
    const gzipKB = gzip / 1024;
    const flag = gzipKB > LIMITS.perFileGzipKB ? ' ❌ EXCEDE LIMITE' : '';

    console.log(`  ${f}: ${kib(raw.length)}KB raw, ${kib(gzip)}KB gzip${flag}`);

    if (gzipKB > LIMITS.perFileGzipKB) failed = true;
  }

  console.log(`\n  TOTAL: ${kib(totalGzip)}KB gzip (limite: ${LIMITS.totalGzipKB}KB)`);

  if (totalGzip / 1024 > LIMITS.totalGzipKB) {
    console.log('\n❌ FALHA: Bundle inicial excede o limite total\n');
    process.exit(1);
  }

  if (failed) {
    console.log('\n❌ FALHA: Um ou mais ficheiros excedem o limite por ficheiro\n');
    process.exit(1);
  }

  console.log('\n✅ OK: Bundle dentro dos limites\n');
}

main();
