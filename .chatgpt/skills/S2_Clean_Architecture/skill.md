# SKILL: S2 - Clean Architecture (Frontend)

## Proposito
Desacoplar la interfaz (Ionic) de las reglas de negocio y los datos externos.

## Capas Obligatorias
1. **Presentation**: Componentes JSX y Hooks de UI. Solo conocen como mostrar.
2. **Domain**: Entidades (`CoffeeModel`) y Casos de Uso. Es TypeScript puro, sin dependencias de React o Ionic.
3. **Data**: Repositorios, APIs y DTOs. Manejan la infraestructura y el mapeo de datos.
4. **Composition**: Modulo central de wiring por feature. Resuelve Data, Domain y Presentation sin repartir esa composicion en varios archivos innecesarios.

## Flujo de Dependencia
Las dependencias siempre fluyen hacia el **Domain**. El Dominio es el corazon y no debe importar nada de las capas de Presentation o Data.

## Convencion tipo `Module.swift`
- Cada feature debe exponer un modulo central en `composition/`, por ejemplo `AccountModule.ts`.
- Ese modulo debe organizarse con tres funciones claras:
  - `resolveData`: resuelve `DataSourceProtocol` + repository concreto.
  - `resolveDomain`: resuelve `RepositoryProtocol` + todos los `UseCase`/`UseCaseProtocol`.
  - `resolvePresentation`: conecta los use cases ya resueltos con hooks concretos de UI.
- `presentation/` no debe crear protocolos propios como `HookProtocol`.
- Los hooks concretos deben depender de contratos del dominio ya resueltos desde `composition`.

## Naming de UseCases
- El nombre de cada `UseCase` y `UseCaseProtocol` debe seguir la convencion central definida en `S12_UseCase_Naming_Convention`.
