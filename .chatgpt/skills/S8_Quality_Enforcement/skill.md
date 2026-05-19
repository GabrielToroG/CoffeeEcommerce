# SKILL: S8 - Calidad Académica y Commits

## Convención de Commits
- **Tipos**: Solo `feat(feature)` o `fix(feature)`.
- **Descripción**: Lista de acciones en infinitivo (ej. `- create coffee view`).

## Checklist de Seniority
1. ¿Hay lógica de negocio en handlers JSX? -> **Error**.
2. ¿Se referencian internos de otra feature? -> **Error (Dependencia Circular)**.
3. ¿El componente tiene el sufijo `View` o `Screen`? -> **Obligatorio**.