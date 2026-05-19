# SKILL: S26 - Coordinación de Integración Full-Stack

## Principio Contract-First
1. **Definición**: El Backend propone el contrato (DTO).
2. **Aprobación**: El Orquestador valida que el contrato cubra las necesidades de la UI.
3. **Implementación**: Se procede a codear en paralelo o secuencialmente.

## Gestión de Cambios (Breaking Changes)
Si una funcionalidad requiere modificar un campo existente:
- Se debe planificar una migración que no rompa el frontend actual.
- El Orquestador debe supervisar que el `frontend_agent` actualice sus mappers inmediatamente después del cambio en el backend.

## Consistencia de Dominio
El lenguaje de negocio (Ubiquitous Language) debe ser idéntico en ambos minirepos. Si en el Back se llama `CoffeeBatch`, en el Front no puede llamarse `CoffeeLot`. El Orquestador impone la nomenclatura.