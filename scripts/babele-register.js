// Registra la traducción Babele de páginas del compendio del sistema dnd5e
// (dnd5e.content24: páginas de skills con sus Examples) además del lang/es.json.
Hooks.on("init", () => {
  const babele = game?.babele;
  if (!babele) return;

  const current = game.i18n?.lang ?? "es";
  const base = current.split("-")[0];

  for (const lang of new Set([current, base])) {
    try {
      babele.register({
        module: "translate-dnd5e-ui-es",
        lang,
        dir: "compendium",
        compendium: {
          "dnd5e.content24": {
            label: "Reglas",
            path: "dnd5e.content24.json",
          },
        },
      });
    } catch (err) {
      console.error("[translate-dnd5e-ui-es] Error al registrar Babele:", err);
    }
  }
});
