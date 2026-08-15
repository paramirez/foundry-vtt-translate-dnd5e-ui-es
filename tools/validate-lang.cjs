// Valida lang/es.json contra dnd5e/lang/en.json:
//  - toda clave EN tiene valor ES (paridad)
//  - no hay claves ES inventadas
//  - placeholders ({...}) y plurales (.one/.other) se conservan
//  - JSON válido
// Uso: node tools/validate-lang.cjs
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const EN = "C:/Users/param/AppData/Local/FoundryVTT/Data/systems/dnd5e/lang/en.json";
const ES = path.join(ROOT, "lang", "es.json");

const en = JSON.parse(fs.readFileSync(EN, "utf8"));
const es = JSON.parse(fs.readFileSync(ES, "utf8"));

// aplanar objeto anidado -> claves con puntos
function flatten(obj, prefix = "") {
  const out = {};
  for (const [k, v] of Object.entries(obj)) {
    const key = prefix ? prefix + "." + k : k;
    if (v && typeof v === "object") Object.assign(out, flatten(v, key));
    else out[key] = v;
  }
  return out;
}
const enFlat = flatten(en);
const esFlat = flatten(es);

const enKeys = new Set(Object.keys(enFlat));
const esKeys = Object.keys(esFlat);

const missing = [];
const extra = [];
const badPlaceholders = [];
const badPlurals = [];

for (const k of enKeys) {
  const v = enFlat[k];
  if (typeof v !== "string") continue;
  if (!(k in esFlat)) { missing.push(k); continue; }
  const esv = esFlat[k];
  if (typeof esv !== "string") { badPlurals.push(k + " (no string)"); continue; }
  // placeholders
  const ph = (s) => [...s.matchAll(/\{([^}]+)\}/g)].map((m) => m[1]).sort().join(",");
  if (ph(v) !== ph(esv)) badPlaceholders.push(k + " [" + ph(v) + "] vs [" + ph(esv) + "]");
}
for (const k of esKeys) if (!enKeys.has(k)) extra.push(k);
// plurales .one/.other
for (const k of enKeys) {
  if (k.endsWith(".one") || k.endsWith(".other")) {
    const base = k.replace(/\.(one|other)$/, "");
    const enOne = enKeys.has(base + ".one"), enOther = enKeys.has(base + ".other");
    const esOne = (base + ".one") in esFlat, esOther = (base + ".other") in esFlat;
    if (enOne !== esOne || enOther !== esOther) badPlurals.push(k + " (estructura de plural rota)");
  }
}

let enStringCount = 0;
for (const v of Object.values(enFlat)) if (typeof v === "string") enStringCount++;

console.log("EN cadenas totales:", enStringCount);
console.log("ES claves:", esKeys.length);
console.log("");
console.log("SIN TRADUCIR:", missing.length);
missing.slice(0, 40).forEach((k) => console.log("  ! " + k));
console.log("");
console.log("INVENTADAS:", extra.length);
extra.slice(0, 20).forEach((k) => console.log("  ? " + k));
console.log("");
console.log("PLACEHOLDERS ROTOS:", badPlaceholders.length);
badPlaceholders.slice(0, 20).forEach((k) => console.log("  ! " + k));
console.log("");
console.log("PLURALES ROTOS:", badPlurals.length);
badPlurals.slice(0, 20).forEach((k) => console.log("  ! " + k));

const ok = missing.length === 0 && extra.length === 0 && badPlaceholders.length === 0 && badPlurals.length === 0;
console.log("");
console.log(ok ? "VALIDACIÓN OK" : "VALIDACIÓN CON ERRORES");
process.exit(ok ? 0 : 1);
