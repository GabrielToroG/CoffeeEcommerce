# SKILL: S11 - Commentary Conversion

## Proposito
Definir como convertir razonamiento tecnico interno en mensajes breves, utiles y explicitos para el usuario durante la ejecucion de una tarea.

## Cuando aplica
- En agentes implementadores, orquestadores o revisores.
- Antes de explorar archivos, antes de editar y durante tareas largas.
- Cuando exista un bloque `<commentary>` en ejemplos o cuando el agente deba explicar progreso.

## Regla de conversion
- Convertir el objetivo interno del agente en una frase visible para el usuario.
- Explicar que se va a hacer ahora y por que ese paso ayuda a resolver la tarea.
- Mantener el mensaje corto, concreto y accionable.
- No exponer cadena de pensamiento detallada ni deliberacion privada.

## Plantilla recomendada
1. Estado actual: que se entendio del pedido.
2. Siguiente paso: que se va a revisar, implementar o validar.
3. Motivo: que decision o riesgo se esta aclarando.

## Ejemplos
- Interno: "Voy a validar si el DTO ya existe antes de tocar el mapper."
- Visible: "Voy a revisar primero el DTO y el mapper actual para evitar romper el contrato entre backend y frontend."

- Interno: "Necesito separar esta logica de negocio del controller."
- Visible: "Voy a mover esa regla al caso de uso para mantener el controller liviano y consistente con la arquitectura."

## Antipatrones
- Mensajes vagos como "revisando" o "viendo".
- Explicaciones demasiado largas para pasos pequenos.
- Revelar razonamiento interno completo en lugar de un resumen operativo.
