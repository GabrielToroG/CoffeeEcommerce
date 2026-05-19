# SKILL: Architecture Core - Reglas Transversales del Monorepo

## Proposito
Definir las reglas comunes para cualquier agente que trabaje dentro de CoffeeEcommerce, sin importar si el cambio cae en frontend, backend o ambos.

## Mapa del Monorepo
- `/Ionic-Ecommerce`: aplicacion Ionic React + TypeScript.
- `/nodejs-Ecommerce`: API Node.js + Express + TypeScript.
- `.chatgpt/agents/orchestrator_agent.md`: punto de entrada y coordinacion.
- `.chatgpt/agents/frontend_agent.md`: reglas especificas del frontend.
- `.chatgpt/agents/backend_agent.md`: reglas especificas del backend.
- `.chatgpt/skills/S11_Commentary_Conversion/skill.md`: conversion de commentary interno a mensajes claros para el usuario.
- `.chatgpt/skills/S12_UseCase_Naming_Convention/skill.md`: convencion de nombres para casos de uso frontend.

## Principios Obligatorios
1. **Feature-first**: organizar por dominio de negocio antes que por tipo tecnico global.
2. **Clean Architecture pragmatica**: Presentation, Domain y Data deben tener responsabilidades separadas.
3. **Contract-first**: si hay comunicacion entre backend y frontend, el DTO se define antes de implementar pantallas o persistencia.
4. **Ubiquitous Language**: el mismo concepto debe usar el mismo nombre en API, DTO, Model, UseCase y UI.
5. **Cambios pequenos y trazables**: cada implementacion debe modificar solo los proyectos y capas necesarios.

## Flujo General
1. Entender el requerimiento.
2. Identificar proyectos afectados.
3. Definir contrato de datos si aplica.
4. Implementar backend antes que frontend cuando el frontend dependa de nuevos datos.
5. Implementar frontend contra DTOs y mappers explicitos.
6. Validar build o pruebas disponibles en cada proyecto afectado.

## Comunicacion Operativa
- Los agentes deben transformar su `commentary` interno en actualizaciones breves y explicitas para el usuario.
- La regla de conversion y estilo de esos mensajes vive en `.chatgpt/skills/S11_Commentary_Conversion/skill.md`.

## Naming de UseCases Frontend
- Los casos de uso del frontend deben seguir la convencion documentada en `.chatgpt/skills/S12_UseCase_Naming_Convention/skill.md`.

## Antipatrones Prohibidos
- Duplicar reglas de negocio en frontend y backend sin una razon explicita.
- Hacer que una pantalla consuma directamente una API.
- Hacer que un controller contenga logica de negocio que deberia vivir en un UseCase.
- Crear nombres distintos para el mismo concepto de dominio.
- Arreglar en un proyecto un problema cuya causa real esta en otro.
