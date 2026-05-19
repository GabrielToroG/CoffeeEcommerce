# SKILL: S9 - Revision UX Frontend e Interaccion

## Regla Central
Ningun elemento interactivo esta completo si no comunica visualmente sus estados.

Todo boton, link, item de menu, tab, chip, filtro, card clickeable, stepper, drawer, modal o control de formulario debe revisar:
- Estado normal.
- `hover`.
- `focus-visible`.
- Estado presionado / activo.
- Estado deshabilitado, si aplica.
- Estado seleccionado / ruta actual, si aplica.

## Navegacion y Menus
- La opcion actual debe estar visualmente marcada.
- Usar `aria-current="page"` cuando represente la ruta actual.
- En menu hamburguesa, drawer, bottom nav, sidebar y popover, cada opcion debe tener feedback visible en `hover` y `focus-visible`.
- En Ionic, si las variables como `--background-hover` no se reflejan, usar `::part(native)` para forzar el estado visual.
- La primera navegacion hacia una pantalla no debe sentirse duplicada, triple o inestable.

## Mobile UX
- No duplicar acciones principales si ya existen en header o bottom nav.
- Mantener targets tactiles usando `--tap-target-*`.
- Revisar que badges, iconos y textos no queden cortados en esquinas.
- Confirmar que los elementos flotantes no compitan con la navegacion mobile.

## Tokens Visuales
Antes de agregar valores hardcodeados, revisar `src/core/theme/variables.css`.

`src/core/theme/variables.css` es la unica fuente valida para constantes visuales globales. No crear archivos paralelos como `utils/constants.css` para spacing, radius, shadows, tap targets o patrones visuales.

Usar tokens semanticos cuando exista intencion compartida:
- Icono + texto: `--control-icon-text-gap`.
- Icono + label vertical: `--control-icon-label-gap`.
- Texto + badge: `--control-badge-gap`.
- Grupos de acciones: `--control-inline-gap`.
- Clusters de controles: `--control-cluster-gap`.
- Formularios: `--form-field-gap`.
- Items con icono: `--list-item-icon-gap`.
- Panels, cards, sombras, radios y targets: `--surface-*`, `--shadow-*`, `--radius-*`, `--tap-target-*`.

Antes de escribir `margin`, `padding`, `gap`, `border-radius`, `box-shadow`, `min-height`, `width` o `height` en CSS:
1. Buscar si ya existe un token equivalente.
2. Si el valor expresa una decision repetida de UI, crear o usar un token semantico en `core/theme/variables.css`.
3. Aplicar ese token en componentes base, organismos y pantallas que compartan el patron.
4. Mantener nombres por intencion, no por numero. Preferir `--control-icon-text-gap` antes que `--gap-8`.

No reemplazar todos los numeros a ciegas. Si un valor es calibracion puntual de layout, puede quedar local. Si representa una decision repetida de UI, debe ser token.

## Consistencia de Componentes
Cuando dos componentes tengan el mismo patron visual, deben usar el mismo token.

Ejemplos obligatorios:
- `icono + texto` en header, menu, botones y links debe compartir `--control-icon-text-gap`.
- `texto + badge` debe compartir `--control-badge-gap`.
- Steppers, filtros y grupos de botones deben compartir tokens de control.
- Cards y panels deben usar tokens `--surface-*`.
- Campos base (`Input`, `Select`, `Textarea`, `Checkbox`) deben consumir tokens de formulario y focus ring.

Si se introduce un componente nuevo, revisar si el patron ya existe antes de crear estilos propios.

## Checklist Antes de Finalizar
1. Cada elemento clickeable tiene feedback visual?
2. La ruta o seccion actual se distingue?
3. La experiencia funciona con mouse, teclado y touch?
4. Los estados de Ionic realmente se ven, incluso si hay que usar `::part(native)`?
5. Los patrones visuales cercanos usan la misma separacion y radios?
6. Mobile y desktop mantienen orientacion clara?
7. Se ejecuto build o verificacion del frontend?
8. Las constantes visuales nuevas viven en `src/core/theme/variables.css` y no en archivos paralelos?

## Errores Criticos
- Elemento clickeable sin `hover` o `focus-visible`.
- Menu con opciones que no se pintan al pasar el mouse.
- Ruta actual sin estado visual.
- Icon button sin `aria-label`.
- Separaciones distintas para el mismo patron `icono + texto`.
- Constantes visuales globales creadas fuera de `core/theme/variables.css`.
- Valores hardcodeados repetidos para patrones compartidos.
- Boton deshabilitado que parece accionable.
- Navegacion que parece ejecutarse multiples veces.
