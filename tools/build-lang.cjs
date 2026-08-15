// Combina lang/parts/*.json en lang/es.json (claves planas con puntos).
// Cada parte se aplana (objetos anidados -> claves con puntos) y se fusionan.
// Las partes posteriores tienen prioridad sobre las anteriores.
// Uso: node tools/build-lang.cjs
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const PARTS = path.join(ROOT, "lang", "parts");
const OUT = path.join(ROOT, "lang", "es.json");

function flatten(obj, prefix = "", out = {}) {
  for (const [k, v] of Object.entries(obj)) {
    const key = prefix ? prefix + "." + k : k;
    if (v && typeof v === "object") flatten(v, key, out);
    else out[key] = v;
  }
  return out;
}

const merged = {};
const files = fs.readdirSync(PARTS).filter((f) => f.endsWith(".json")).sort();
for (const f of files) {
  const part = JSON.parse(fs.readFileSync(path.join(PARTS, f), "utf8"));
  Object.assign(merged, flatten(part));
}
fs.writeFileSync(OUT, JSON.stringify(merged, null, 2) + "\n", "utf8");
console.log("Build OK: " + Object.keys(merged).length + " claves en lang/es.json");
