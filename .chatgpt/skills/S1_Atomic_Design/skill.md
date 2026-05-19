# SKILL: S1 - Atomic Design y Arbitraje de Dominio

## Propósito
Organizar la UI de forma jerárquica y estratégica, asegurando que cada componente resida en el dominio correcto (Feature vs. Core) para maximizar la mantenibilidad.

## Niveles de Composición
1. **Atoms**: Componentes puros de Ionic/React (ej. `BaseButtonView`, `BaseInputView`). Son agnósticos al negocio.
2. **Molecules**: Unión de 2 o más átomos (ej. `SearchBarView`).
3. **Organisms**: Secciones complejas que pueden manejar estado global (ej. `CoffeeGridView`).

## ⚖️ Regla de Arbitraje de Dominio (Obligatoria)
Antes de crear cualquier componente visual (`View`), se debe realizar el siguiente análisis de ubicación:

1. **¿Contiene lógica o datos específicos del negocio?** (ej: tipos de grano, precios, reglas de tueste).
   - **SÍ** ➔ Crear en `features/<feature>/presentation/components/`.
2. **¿Es un componente genérico o puramente visual?** (ej: un botón con el color de marca, un input estilizado, un esqueleto de carga).
   - **SÍ** ➔ Crear en `core/presentation/components/atoms/` (o molecules).
3. **Detección de Reutilización Cross-Feature**:
   - Si se detecta que un componente de la `feature-A` es necesario en la `feature-B`, se debe solicitar permiso para realizar un **refactor proactivo** y moverlo a `core/` antes de proceder con la nueva implementación.

## Regla Académica (Senior)
La duplicación de componentes visuales entre features sin una justificación de dominio diferente se considera un error de arquitectura.