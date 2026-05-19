# SKILL: S12 - UseCase Naming Convention

## Proposito
Definir una convencion unica y predecible para nombrar casos de uso en frontend, diferenciando flujos remotos HTTP, operaciones locales y logica pura.

## Alcance
- Aplica a `src/features/*/domain/useCases/`.
- Aplica tanto a implementaciones `*UseCase.ts` como a contratos `*UseCaseProtocol.ts`.
- Aplica a propiedades expuestas en `*UseCasesProtocol`.

## Regla 1: Casos de uso HTTP
Cuando el caso de uso representa una operacion remota o alineada a un endpoint/backend, debe comenzar con el verbo HTTP correspondiente:
- `get`
- `post`
- `put`
- `patch`
- `delete`

## Ejemplos HTTP
- `getStorefrontUseCase`
- `getOrdersUseCase`
- `postRegisterUserUseCase`
- `postLoginUseCase`
- `postRegisterOrderUseCase`
- `putAdminProductUseCase`
- `patchDefaultAddressUseCase`
- `deleteAdminProductUseCase`

## Regla 2: Casos de uso Local
Cuando el caso de uso no llama red y opera sobre estado local, storage local o calculo de estado persistido en cliente, debe comenzar con:
- `getLocal`
- `postLocal`
- `putLocal`
- `patchLocal`
- `deleteLocal`

## Ejemplos Local
- `getLocalAccountSessionUseCase`
- `getLocalAccountSubmissionStateUseCase`
- `getLocalDefaultAccountAddressUseCase`
- `postLocalAddCartProductUseCase`
- `deleteLocalCartProductUseCase`
- `deleteLocalCartUseCase`

## Regla 3: Casos de uso de Logica Pura
Cuando el caso de uso no representa ni HTTP ni persistencia local, sino transformacion, derivacion, validacion o calculo puro, no debe forzarse a un verbo HTTP.

En esos casos se debe usar un prefijo semantico de logica:
- `compute`
- `derive`
- `build`
- `validate`
- `resolve`
- `map`
- `format`

## Ejemplos de Logica Pura
- `deriveSelectedDeliveryAddressLabelUseCase`
- `computeCartSummaryUseCase`
- `validateCheckoutFormUseCase`
- `resolveAccountSubmissionStateUseCase`

## Regla 4: Protocolos
El protocolo debe reflejar exactamente el nombre base del caso de uso:
- `getLocalAccountSessionUseCase` -> `GetLocalAccountSessionUseCaseProtocol`
- `postLoginUseCase` -> `PostLoginUseCaseProtocol`
- `deriveSelectedDeliveryAddressLabelUseCase` -> `DeriveSelectedDeliveryAddressLabelUseCaseProtocol`

## Regla 5: Wiring en composition
Las propiedades dentro de `FeatureUseCasesProtocol` deben respetar el mismo nombre del caso de uso resuelto:
- `getStorefrontUseCase`
- `postLoginUseCase`
- `getLocalAccountSessionUseCase`
- `computeCartSummaryUseCase`

## Criterio de Decision
Antes de nombrar un caso de uso, responder en este orden:
1. Esto representa una operacion remota alineada a API? -> usar `get/post/put/patch/delete`
2. Esto representa una operacion local de cliente o storage? -> usar `getLocal/postLocal/putLocal/patchLocal/deleteLocal`
3. Esto es logica pura? -> usar verbo semantico como `compute/derive/validate/resolve/map/format`

## Antipatrones
- Nombrar por accion de negocio si el flujo real es claramente HTTP y ya existe contrato remoto.
- Usar `get` para operaciones locales cuando la distincion con red importa.
- Forzar `post` o `get` sobre funciones de logica pura solo por uniformidad visual.
- Mezclar en la misma feature nombres HTTP, local y logicos sin criterio explicito.
