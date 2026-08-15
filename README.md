# translate-dnd5e-ui-es

Traducción de la interfaz del sistema **dnd5e** al español mediante `lang/es.json`.

El sistema dnd5e solo incluye `lang/en.json`; este módulo aporta las cadenas en español que Foundry fusiona sobre las del sistema cuando el idioma del juego es español.

## Instalación

1. Copia la carpeta a `Data/modules/translate-dnd5e-ui-es/` (o instala desde el zip/manifest).
2. En Foundry, activa el módulo y pon el idioma del juego en **Español** (ajustes de Foundry → Idioma del juego).

## Contenido

- Traduce las cadenas de UI del sistema dnd5e: habilidades, características y abreviaturas, iniciativa, velocidad, competencia, sentidos, armaduras, armas, estados, hoja de personaje, ítems, conjuros y diálogos.
- Respeta los placeholders (`{ability}`, `{skill}`, `{class}`, `{dc}`…) y las claves de pluralización (`.one`/`.other`).
- Terminología consistente con la traducción del Player's Handbook (`translate-dnd-ph-es`).
- Vía Babele, traduce también las páginas de habilidades del compendio del sistema `dnd5e.content24` (los "Examples" que se muestran al pasar el cursor sobre una skill).

> **Nota:** si instalas también `translate-dnd5e-sdr2-es` (que traduce `dnd5e.content24` completo), ambos módulos registrarían el mismo compendio; usa solo uno de los dos para evitar solapamiento.

## Compatibilidad

- Foundry VTT 13+
- dnd5e 5.1.1+ (verificado en 5.2.5)

Al actualizar el sistema dnd5e, ejecuta `tools/validate-lang.cjs` para comprobar la paridad de claves con `dnd5e/lang/en.json` y completar las nuevas cadenas.

## Herramientas

- `tools/validate-lang.cjs` — valida que toda clave de `dnd5e/lang/en.json` tenga traducción, sin claves inventadas, y que placeholders/plurales se conserven.

## Licencia

Uso libre con fines personales; el contenido de reglas pertenece a sus respectivos autores.
