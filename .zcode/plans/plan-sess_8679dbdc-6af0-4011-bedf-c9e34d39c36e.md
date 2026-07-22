## Plan: Corregir bug del mes + mejorar Shifter Pro

Editaré el `index.html` existente en su sitio (compatible con GitHub Pages, sin reescribir desde cero para no romper OCR/Supabase/perfiles). Trabajo en fases priorizadas.

### FASE 1 — Corregir el bug del mes (crítico)
**Raíz del bug:** En `analyzeImportFile` (línea 6536) la detección automática del mes en el Excel **siempre gana** sobre tu selección manual, y la detección es agresiva (cualquier palabra de mes o año en el Excel sobreescribe Julio). Por eso, aunque elijas Agosto, si el Excel contiene "Julio" se importa a Julio.

**Corrección:**
- El selector manual (`#importMonth`/`#importYear`) que TÚ eliges **será la fuente de verdad**.
- La detección del Excel se usa solo como **sugerencia inicial** cuando abres el modal.
- Añadir aviso visible en `#importInfo` si el Excel detecta un mes distinto al elegido, con un botón "usar lo detectado" opcional.
- Aplicar la misma corrección a la importación por imagen/OCR (línea 6937, variante paralela con el mismo bug).
- Añadir un resumen **claro de confirmación** antes de importar: "Se importarán X celdas a **Agosto 2026** (lo que elegiste)".

### FASE 2 — Rapidez (rendimiento)
- **Debounce de `saveDB()`**: hoy se llama 36 veces y cada vez serializa TODO el `db` (con fotos base64). Lo envuelvo para que múltiples llamadas rápidas se fusionen en una sola escritura (~300ms). Guardado inmediato solo en acciones críticas (importar, logout).
- **Optimizar `createDayCell`**: hoy hace 5-7 `cell.innerHTML +=` por celda (cada uno reparsa todo). Lo reemplazo por **una sola plantilla** string. Reduce ~250 reparses por render.
- **Delegación de eventos**: hoy se crean hasta 6 listeners × 42 celdas = ~250 listeners en cada uno de los 27 `render()`. Los reemplazo por **1 listener en la grilla** que lee el día de un `data-key`.
- Evitar `saveDB()` incondicional en `loadDefaultHolidays`/`normalizeEnabledFlags` al iniciar si no hubo cambios.

### FASE 3 — Visuales y simplicidad
- Mejorar jerarquía visual: cabeceras de modal más limpias, mejor contraste, sombras sutiles, transiciones suaves.
- Pulir las celdas del día: mejor disposición de turno/nota, indicadores más claros.
- Mejorar el modal de importación: pasos más claros (1.Subir → 2.Elegir mes → 3.Confirmar), barra de progreso visual.
- Conservo el paradigma "shell oscuro + modales" pero armonizo colores y espaciado.

### FASE 4 — Historial / registro de cambios
- `renderChangeHistory` mejorado: agrupación por día, contadores por tipo de acción, filtros más rápidos.
- Función **Deshacer** último cambio aplicable (revierte el último edit de día registrado).
- Mejor exportación (CSV además de JSON).

### FASE 5 — Mejora del calendario
- Atajos de teclado: flechas ←/→ navegar meses, "h" = hoy, "Esc" = cerrar modal.
- Mejor vista móvil (celdas compactas legibles).
- Indicador visual más claro del día actual y de meses con datos cargados.

### Riesgo y verificación
- No toco la lógica de Supabase ni OCR más allá del bug del mes en la importación.
- Tras cada fase verificaré que el HTML no quede roto (paréntesis/llaves balanceadas) revisando las funciones modificadas.
- Mantengo compatibilidad con la versión `shifter_v23` de localStorage.

Comenzaré por la **Fase 1 (bug del mes)** que es lo más urgente, y luego avanzaré las demás.