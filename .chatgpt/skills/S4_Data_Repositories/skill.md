# SKILL: S4 - Repositorios y Acceso a Datos

## Responsabilidades
1. **API (`data/api/`)**: Realiza el `fetch`. Aquí vive la latencia, los headers técnicos y el acceso a `localStorage` o `window`.
2. **Repository (`data/repositories/`)**: Implementa el contrato del dominio. Orquesta la API y transforma el `DTO` (técnico) en `Model` (negocio).

## Regla de Oro
Ningún componente visual o hook de presentación puede llamar a un archivo dentro de `data/api/`. Siempre deben pasar por el repositorio.