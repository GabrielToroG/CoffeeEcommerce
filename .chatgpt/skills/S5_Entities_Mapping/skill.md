# SKILL: S5 - Entidades, DTOs y Mapeo

## Convención de Naming
- **Model**: Ubicado en `domain/entities/`. Representa la verdad del negocio (ej. `CoffeeModel`).
- **DTO**: Ubicado en `data/entities/`. Representa el contrato externo/API (ej. `CoffeeDTO`).

## Mapeo
El Repositorio es el encargado de realizar la conversión. Esto permite que si el backend cambia un nombre de campo, solo se toque el DTO y el Mapper, protegiendo al resto de la app.