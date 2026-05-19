# SKILL: S3 - Ciclo de Vida de una Feature

## Procedimiento de Creación
Cada nueva funcionalidad debe nacer con esta estructura mínima, incluso si empieza vacía:
- `presentation/components/`: UI específica.
- `presentation/hooks/`: Lógica de UI (ViewModel).
- `domain/useCases/`: Intención de negocio.
- `data/api/`: Infraestructura técnica.
- `data/repositories/`: Adaptación y mappers.

## Regla de Decisión
Si la funcionalidad implica un nuevo flujo de usuario o un estado de negocio con vida propia (ej. `cart` vs `storefront`), se DEBE crear una carpeta nueva en `src/features/`. Prohibido inflar features existentes por proximidad visual.