# SKILL: S10 - SEO Organico Frontend

## Regla Central
Si una pantalla puede ser indexada o influir en descubrimiento organico, no basta con que se vea bien.

Debe evaluarse tambien por su capacidad de:
- comunicar claramente el tema principal de la pagina
- generar estructura semantica entendible para Google
- evitar competir internamente por la misma intencion de busqueda
- exponer contenido util, escaneable y enlazable

## Prioridad en Este Proyecto
- Para vistas publicas del storefront, catalogo, detalle de producto y cualquier landing, SEO organico tiene prioridad alta.
- Los tests frontend son deseables, pero no deben desplazar mejoras claras de indexacion, arquitectura SEO, semantica o contenido.
- Si hay tradeoff entre pulir tests y corregir una debilidad SEO importante en una pagina publica, priorizar la mejora SEO.

## SEO Tecnico y Semantico
- Cada pantalla publica debe tener un proposito de busqueda claro.
- Debe existir una jerarquia semantica limpia con un solo `h1` principal por pantalla cuando aplique.
- Usar `h2`, `h3`, listas, secciones y labels semanticos para estructurar contenido real, no solo cajas visuales.
- Evitar pantallas con mucho contenido importante renderizado de forma poco interpretable o demasiado generica.
- Revisar que titulos de producto, categoria y coleccion no sean vagos ni repetitivos.
- Confirmar que imagenes relevantes tengan `alt` util y descriptivo, no solo cosmetico.
- Si una card o detalle de producto muestra datos clave, procurar que nombre, precio, origen, atributos y disponibilidad sean texto real renderizado.

## Metadata y Descubrimiento
- Revisar necesidad de `title`, `meta description`, canonical, Open Graph y metadata dinamica en paginas publicas importantes.
- Si una SPA necesita soporte SEO fuerte, dejar observacion explicita cuando falte estrategia de prerender, SSR o renderizado compatible con crawlers.
- Detectar ausencia de metadata dinamica en detalles de producto, categorias o pantallas con intencion transaccional clara.

## Arquitectura de Contenido
- Evitar bloques heroes o encabezados que prioricen solo marketing vacio sobre keywords reales y propuesta concreta.
- La pagina debe comunicar rapidamente:
  - que se vende
  - para quien
  - por que es relevante
  - que diferencia tiene
- Los filtros, categorias y colecciones deben ayudar a descubrir contenido, no ocultarlo tras etiquetas ambiguas.
- Evitar duplicacion innecesaria de textos o taxonomias que generen canibalizacion interna.

## Enlazado Interno
- Confirmar que productos, categorias, colecciones y pantallas clave puedan enlazarse entre si de forma natural.
- Favorecer CTAs y rutas que fortalezcan descubrimiento de paginas valiosas, no solo conversion inmediata.
- Si una seccion importante solo depende de interaccion JS poco visible, marcarlo como riesgo SEO.

## Mobile y Core Web UX
- Revisar que la experiencia mobile no entierre contenido clave demasiado abajo.
- Evitar headers, overlays o menus que oculten informacion central en primer viewport sin una razon fuerte.
- Vigilar imagenes pesadas, chunks excesivos y contenido principal demorado, porque afecta percepcion y SEO indirecto.

## Checklist Antes de Finalizar
1. La pantalla deja claro en segundos que tema y oferta principal cubre?
2. Existe un `h1` util y una jerarquia semantica coherente?
3. El contenido clave esta en texto real y no escondido en UI dificil de rastrear?
4. La pagina merece metadata especifica y hoy la tiene?
5. Hay enlazado interno natural hacia productos, categorias o colecciones relevantes?
6. Mobile muestra contenido importante temprano?
7. Se detectaron riesgos de SPA pura para indexacion y quedaron anotados?

## Errores Criticos
- Pantalla publica sin tema principal claro.
- Multiples encabezados compitiendo o ausencia de `h1` real donde deberia existir.
- Detalle de producto sin metadata o estructura suficiente para SEO transaccional.
- Contenido importante oculto tras interacciones innecesarias.
- Textos demasiado genericos que no ayudan a posicionar ni diferenciar la pagina.
- Recomendaciones centradas en tests cuando el problema dominante es de indexacion o descubrimiento organico.
