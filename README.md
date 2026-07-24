# H5P Multiple Choice (CFRD) 1.0

Fork CFRD de **H5P.MultiChoice** (upstream 1.16.14, `coreApi` 1.23, Lumi).

| Campo | Valor |
|-------|-------|
| `machineName` | `H5P.MultiChoiceCFRD` |
| Versión actual | **1.0.19** |
| Constructor JS | `H5P.MultiChoiceCFRD` |
| Editor | `semantics.json` + widgets (`H5PEditor.RangeList`, `H5PEditor.ShowWhen`, `H5PEditor.ColorSelectorCFRD`, etc.) — sin editor dedicado |
| Rama git | `multi-choice-cfrd-1.0.0` |

## Características CFRD (1.0.x)

- **Instructions** — intro o pestaña (`H5P.Instructions`)
- **Contexto lateral** — bloque `context` (texto + imagen); upgrade **15** migra `media` legacy
- **Play area 16:9** — interacción escalable; pie de evaluación **fuera** del play area
- **Overall feedback en popup** — `H5P.QuestionCFRD` 1.0
- **Apariencia por actividad** — colores y fondos en `appearance` (selectores en semantics); upgrade **17** aplica defaults
- **Layout Lumi** — fondo en contenedor raíz, márgenes `h5p-no-frame`, centrado vertical con scroll seguro

Documentación de layout 1.0: [docs/.../17-convenciones-layout-gestor.md §10](../../../docs/desarrollo-librerias/17-convenciones-layout-gestor.md#10-layout-en-línea-10).

Ciclo de vida del player (QuestionCFRD, botones, xAPI): [doc 18](../../../docs/desarrollo-librerias/18-ciclo-vida-player-question-cfrd.md).

## Archivos clave

| Archivo | Rol |
|---------|-----|
| `js/multi-choice-cfrd.js` | Player, play area, evaluación, xAPI |
| `js/appearance.js` | Fondo unificado en contenedor raíz |
| `css/multi-choice-cfrd.css` | Layout, play area, pie transparente, Lumi |
| `semantics.json` | Formulario del autor |
| `upgrades.js` | Migración de contenidos (incl. pasos 15 y 17) |
| `presave.js` | Validación al guardar |

## Desarrollo y sync

```powershell
cd dev/multi-choice-cfrd/h5p-multi-choice-cfrd-1.0
npm run sync:lumi
```

El script `../scripts/sync-lumi.ps1` publica en este orden:

1. `H5P.Instructions`
2. `H5P.JoubelUICFRD-1.0`
3. `H5P.QuestionCFRD-1.0`
4. `H5P.MultiChoiceCFRD-1.0` → `nuevas-librerias-h5p/H5P.MultiChoiceCFRD-1.0/`

**No** requiere `npm run build` (JavaScript directo en `js/`).

Guía central de sync: [docs/sync-lumi.md](../../../docs/sync-lumi.md).

## Prueba en Lumi

1. Ejecutar sync (arriba).
2. Confirmar que Lumi apunta a `nuevas-librerias-h5p/` como carpeta de libraries.
3. Crear actividad Multiple Choice (CFRD) y probar editor + vista alumno.

## Licencia

MIT — ver `library.json`.
