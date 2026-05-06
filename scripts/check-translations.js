#!/usr/bin/env node
// Verifies that every key present in src/content/en/*.json exists in the
// corresponding file under every other locale directory.
// Exits with code 1 and prints a report if anything is missing.

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CONTENT_DIR = path.join(__dirname, '../src/content');
const CANONICAL_LOCALE = 'en';

function findMissing(en, es, keyPath = '') {
  const missing = [];

  if (Array.isArray(en)) {
    if (!Array.isArray(es)) {
      missing.push(`${keyPath} — expected array, got ${typeof es}`);
      return missing;
    }
    if (en.length !== es.length) {
      missing.push(
        `${keyPath} — array length mismatch (${CANONICAL_LOCALE}: ${en.length}, locale: ${es.length})`
      );
    }
    en.forEach((item, i) => {
      if (i < es.length) {
        missing.push(...findMissing(item, es[i], `${keyPath}[${i}]`));
      }
    });
  } else if (en !== null && typeof en === 'object') {
    if (es === null || typeof es !== 'object' || Array.isArray(es)) {
      missing.push(`${keyPath} — expected object`);
      return missing;
    }
    for (const key of Object.keys(en)) {
      const child = keyPath ? `${keyPath}.${key}` : key;
      if (!(key in es)) {
        missing.push(child);
      } else {
        missing.push(...findMissing(en[key], es[key], child));
      }
    }
  }

  return missing;
}

const locales = fs
  .readdirSync(CONTENT_DIR)
  .filter((d) => fs.statSync(path.join(CONTENT_DIR, d)).isDirectory() && d !== CANONICAL_LOCALE);

if (locales.length === 0) {
  console.log('No non-canonical locales found — nothing to check.');
  process.exit(0);
}

const canonicalFiles = fs
  .readdirSync(path.join(CONTENT_DIR, CANONICAL_LOCALE))
  .filter((f) => f.endsWith('.json'));

let totalMissing = 0;

for (const locale of locales) {
  const localeDir = path.join(CONTENT_DIR, locale);
  let localePrinted = false;

  for (const file of canonicalFiles) {
    const enPath = path.join(CONTENT_DIR, CANONICAL_LOCALE, file);
    const esPath = path.join(localeDir, file);

    if (!fs.existsSync(esPath)) {
      if (!localePrinted) { console.log(`\n[${locale}]`); localePrinted = true; }
      console.log(`  MISSING FILE: ${file}`);
      totalMissing++;
      continue;
    }

    const en = JSON.parse(fs.readFileSync(enPath, 'utf8'));
    const es = JSON.parse(fs.readFileSync(esPath, 'utf8'));
    const missing = findMissing(en, es);

    if (missing.length > 0) {
      if (!localePrinted) { console.log(`\n[${locale}]`); localePrinted = true; }
      console.log(`  ${file}:`);
      missing.forEach((k) => console.log(`    missing: ${k}`));
      totalMissing += missing.length;
    }
  }
}

if (totalMissing > 0) {
  console.log(`\n${totalMissing} translation issue(s) found. Fix before deploying.\n`);
  process.exit(1);
} else {
  console.log(`All translations complete for: ${locales.join(', ')}`);
  process.exit(0);
}
