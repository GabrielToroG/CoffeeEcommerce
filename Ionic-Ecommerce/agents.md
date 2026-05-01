# AGENTS.md

## PropÃ³sito
Este archivo define cÃ³mo debe trabajar cualquier agente de IA dentro de este proyecto **Ionic React**.

El objetivo es que todo cambio respete estrictamente:

- **Arquitectura Limpia**
- **Arquitectura basada en Features**
- **Arquitectura basada en Componentes**
- **SeparaciÃ³n clara de responsabilidades**
- **Alta mantenibilidad, testeabilidad y desacoplamiento**

Este documento funciona como una guÃ­a de ejecuciÃ³n y enforcement arquitectÃ³nico.

---

## Stack objetivo

- **Ionic React**
- **React**
- **TypeScript**
- **Feature-Based Architecture**
- **Component-Based Architecture**
- **Clean Architecture**

---

## Estructura oficial del proyecto

```text
src/
  core/                         # Compartido (transversal)
    presentation/
      components/
        atoms/
          baseTextField/
            BaseTextField.tsx
        molecules/
          brandHomeLink/
            BrandHomeLink.tsx
    hooks/                      # Hooks globales (useAuth, useTheme)
    router/                     # ConfiguraciÃ³n de rutas
    theme/                      # Estilos globales

  features/                     # Feature-Based Architecture
    auth/
      presentation/             # Capa de presentaciÃ³n
        components/             # Component-Based
          LoginForm.tsx
          LoginButton.tsx
        hooks/                  # ViewModel / lÃ³gica de UI
          useLogin.ts

      domain/                   # LÃ³gica de negocio
        useCases/
          loginUseCase.ts

      data/                     # Acceso a datos
        api/
          authApi.ts
        repositories/
          authRepository.ts
```

---

## FilosofÃ­a arquitectÃ³nica

Este proyecto **no** se organiza por tipo tÃ©cnico global (`pages/`, `services/`, `components/` para toda la app), sino por **features**.

Cada feature debe ser una unidad autocontenida, con sus propias capas:

- `presentation/`
- `domain/`
- `data/`

La carpeta `core/` existe solo para lo **realmente transversal y reutilizable** entre mÃºltiples features.

### Regla principal

> Todo lo especÃ­fico de una feature debe vivir dentro de su feature.

> Solo lo verdaderamente compartido debe vivir en `core/`.

---

## DefiniciÃ³n de capas

### 1. `presentation/`
Responsable de la UI y de la lÃ³gica de interacciÃ³n con el usuario.

Incluye:
- componentes visuales de la feature
- hooks de UI
- manejo de estado de pantalla
- adaptaciÃ³n de datos para renderizar
- conexiÃ³n entre eventos de UI y casos de uso

No debe contener:
- llamadas HTTP directas
- lÃ³gica de negocio compleja
- reglas de negocio persistentes

### 2. `domain/`
Responsable de la lÃ³gica de negocio.

Incluye:
- casos de uso
- reglas del dominio
- contratos que expresen comportamiento del negocio
- validaciones de negocio

No debe contener:
- dependencias de Ionic
- dependencias de React UI
- acceso HTTP directo
- detalles de infraestructura

### 3. `data/`
Responsable de obtener, persistir o transformar datos externos.

Incluye:
- clientes API
- datasources concretos
- repositorios concretos
- mapeos entre respuesta externa y formato consumible
- integraciÃ³n con backend o storage

No debe contener:
- lÃ³gica visual
- decisiones de UI
- reglas de negocio que correspondan al dominio

Regla explÃ­cita:
- simulaciones tÃ©cnicas de infraestructura como `setTimeout`, latencia mock, acceso a `window`, `localStorage` o fuentes externas deben vivir en `data/api/` o en un datasource de `data/`, nunca en `domain/`

### 4. `core/`
Responsable de piezas compartidas entre features.

Incluye:
- componentes globales reutilizables
- hooks globales reutilizables
- tema global
- router global

No debe transformarse en un contenedor caÃ³tico de utilidades sin criterio.

---

## Reglas de dependencia

Las dependencias deben fluir de forma controlada.

### Flujo permitido

- `presentation` puede usar `domain`
- `data` puede implementar contratos definidos por `domain`
- `core` puede ser usado por `presentation`
- `core` no debe depender de una feature especÃ­fica

### Flujo prohibido

- `domain` no debe depender de `presentation`
- `domain` no debe depender de `data` concreto
- una feature no debe importar archivos internos de otra feature sin una razÃ³n arquitectÃ³nica explÃ­cita
- una feature no debe depender del `presentation/hooks` de otra feature para resolver su propio estado o dominio
- `core` no debe depender de `features`
- componentes de UI no deben llamar APIs directamente

---

## Convenciones por carpeta

## `src/core/presentation/components/`
Usar esta carpeta solo para componentes verdaderamente globales.

Debe organizarse con **Atomic Design**:
- `atoms/`
- `molecules/`
- `organisms/` si realmente aparece la necesidad

Ejemplos vÃ¡lidos:
- botones base
- inputs base
- loaders reutilizables
- wrappers de layout compartidos
- modales genÃ©ricos
- fields base de formulario como `BaseInput`, `BaseTextarea`, `BaseSelect`

Ejemplos invÃ¡lidos:
- `AuthLoginCard` si solo lo usa auth
- `ProfileHeader` si solo pertenece a profile

### Regla
Si un componente pertenece a una feature, debe vivir dentro de `features/<feature>/presentation/components`.
Si es transversal, debe vivir dentro de `src/core/presentation/components/<nivel-atomico>/<componente>/`.

### Regla obligatoria para primitives de UI
Si aparece un patrÃ³n visual base que puede repetirse entre features, no debe quedar inline dentro de una pantalla.

Ejemplos obligatorios:
- inputs de texto base
- textareas base
- selects base
- botones base

Esos componentes deben vivir en `src/core/presentation/components/atoms/`.

### ProhibiciÃ³n explÃ­cita
No seguir usando la carpeta legacy `src/components/` para componentes nuevos del proyecto.
No seguir creando componentes nuevos directamente en `src/core/components/`.
Si un componente es transversal, debe ir en `src/core/presentation/components/`.
Si un componente es especÃ­fico, debe ir en `src/features/<feature>/presentation/components/`.

---

## `src/core/hooks/`
AquÃ­ van hooks reutilizables por mÃºltiples features.

Ejemplos vÃ¡lidos:
- `useTheme`
- `useDebounce`
- `useAuth` solo si representa estado global transversal

Ejemplos invÃ¡lidos:
- `useLoginForm`
- `useRegister`
- `useForgotPassword`

Esos deben vivir dentro de la feature correspondiente.

---

## `src/core/router/`
Contiene la configuraciÃ³n global de rutas.

Responsabilidades:
- declarar rutas principales
- enlazar pÃ¡ginas/container components por feature
- proteger rutas si aplica
- centralizar navegaciÃ³n global

No debe contener lÃ³gica de negocio.

---

## `src/core/theme/`
Contiene:
- variables globales
- tokens visuales
- estilos globales
- configuraciÃ³n transversal de apariencia

No debe contener estilos ultra especÃ­ficos de una feature, salvo que realmente sean parte del tema global.

---

## `src/features/<feature>/presentation/components/`
AquÃ­ viven los componentes visuales especÃ­ficos de la feature.

Ejemplo en `auth`:
- `LoginForm.tsx`
- `LoginButton.tsx`

Estos componentes deben ser:
- pequeÃ±os o medianos
- enfocados en una responsabilidad clara
- fÃ¡ciles de testear
- reutilizables dentro de la misma feature si corresponde

### Regla
Separar componentes por intenciÃ³n, no por capricho.
No dividir en archivos diminutos sin valor real.

---

## `src/features/<feature>/presentation/hooks/`
AquÃ­ viven los hooks que actÃºan como **ViewModel** o lÃ³gica de UI.

Ejemplo:
- `useLogin.ts`

Responsabilidades:
- capturar eventos de UI
- manejar estado local de la pantalla
- invocar casos de uso
- exponer datos listos para renderizar
- transformar errores tÃ©cnicos en mensajes de UI

### Regla
El hook de presentaciÃ³n no debe contener detalles HTTP directos.
Debe delegar hacia dominio o repositorios inyectados segÃºn la estrategia del proyecto.
Si una `Screen` necesita estado local, handlers de formulario o submit, esa lÃ³gica debe salir a `presentation/hooks/`; la `Screen` debe orquestar y renderizar.

---

## `src/features/<feature>/domain/useCases/`
AquÃ­ viven los casos de uso del dominio.

Ejemplo:
- `loginUseCase.ts`

Responsabilidades:
- representar una acciÃ³n del negocio
- encapsular reglas del dominio
- orquestar la operaciÃ³n principal

Ejemplo conceptual:
- validar credenciales
- invocar repositorio abstracto
- devolver resultado con semÃ¡ntica de negocio

### Regla
Un caso de uso no debe conocer Ionic components, JSX, navegaciÃ³n visual, ni detalles de implementaciÃ³n HTTP.
Tampoco debe contener timeouts, delays simulados ni acceso a APIs del navegador.

---

## `src/features/<feature>/data/api/`
AquÃ­ viven los accesos concretos a APIs externas.

Ejemplo:
- `authApi.ts`

Responsabilidades:
- ejecutar requests HTTP
- definir llamadas a endpoints
- mapear request/response tÃ©cnica

### Regla
No mezclar aquÃ­ decisiones de UI ni lÃ³gica de negocio compleja.
Si hace falta simular latencia o comportamiento tÃ©cnico, tambiÃ©n debe resolverse aquÃ­ o en un datasource de `data/`.

---

## `src/features/<feature>/data/repositories/`
AquÃ­ viven implementaciones concretas de repositorios.

Ejemplo:
- `authRepository.ts`

Responsabilidades:
- usar `api/`
- implementar contratos del dominio si existen
- adaptar datos externos al formato esperado por el dominio/presentaciÃ³n

### Regla
El repositorio concreto debe ocultar detalles de infraestructura al resto de capas.

---

## GuÃ­a de implementaciÃ³n por feature

Cuando se cree una nueva feature, se debe seguir este patrÃ³n:

```text
src/features/<feature>/
  presentation/
    components/
    hooks/
  domain/
    useCases/
  data/
    api/
    repositories/
```

Si una carpeta todavÃ­a no tiene contenido, puede existir vacÃ­a si ayuda a dejar clara la arquitectura prevista.
Lo que no debe existir es una feature reducida solo a `screens/` con lÃ³gica inline sin su `presentation/hooks/` ni una estructura explÃ­cita de capas.

---

## Regla obligatoria para dominios funcionales

Cuando aparezca una capacidad nueva del negocio, el agente debe preguntarse primero si estÃ¡ agregando:

- una nueva responsabilidad funcional
- un nuevo flujo de usuario
- un nuevo estado de negocio con vida propia
- una nueva etapa del journey comercial

Si la respuesta es sÃ­, no debe inflar una feature existente por conveniencia.
Debe crear una nueva feature en `src/features/<nuevo-dominio>/`.

### Ejemplos obligatorios

- `storefront/` = catÃ¡logo y descubrimiento de productos
- `cart/` = carrito de compra, lÃ­neas, cantidades y subtotal
- `checkout/` = direcciÃ³n, pago, confirmaciÃ³n y cierre de compra

### Regla de decisiÃ³n

Aunque varias features participen en el mismo journey de e-commerce, no son la misma feature si expresan responsabilidades de negocio distintas.

Por lo tanto:

- el carrito no debe vivir dentro de `storefront/`
- el checkout no debe vivir dentro de `cart/`
- `storefront/` puede disparar acciones hacia `cart/`, pero no absorber su dominio

### ProhibiciÃ³n explÃ­cita

No agregar entidades, casos de uso, hooks o componentes de `cart` o `checkout` dentro de `storefront/` solo porque comparten pantalla o estÃ¡n visualmente cerca.
Tampoco resolver el estado de una feature leyendo directamente hooks de presentaciÃ³n de otra feature; esa integraciÃ³n debe ocurrir en el borde de composiciÃ³n y bajar como modelos, params o contratos.

---

## CÃ³mo decidir dÃ³nde va cada archivo

### Un archivo va en `core/` si:
- lo usan mÃºltiples features
- no expresa reglas de una feature particular
- su valor es transversal

### Un archivo va dentro de una `feature/` si:
- responde a un caso de uso de negocio especÃ­fico
- pertenece visualmente a una pantalla de esa feature
- solo tiene sentido dentro de ese contexto funcional

### Ejemplo
- `BaseButton.tsx` â†’ `core/presentation/components/atoms/baseButton/`
- `LoginButton.tsx` â†’ `features/auth/presentation/components/`
- `useTheme.ts` â†’ `core/hooks/`
- `useLogin.ts` â†’ `features/auth/presentation/hooks/`

---

## Reglas para componentes

Los componentes deben seguir una arquitectura basada en componentes.

### Principios
- un componente = una intenciÃ³n clara
- preferir composiciÃ³n sobre componentes gigantes
- separar presentaciÃ³n de lÃ³gica siempre que sea razonable
- evitar componentes multipropÃ³sito difÃ­ciles de entender

### En Ionic React
Este proyecto debe priorizar al 100% el uso de componentes, patrones y APIs de **Ionic React** para construir UI y UX.

Regla obligatoria:
- si Ionic ofrece un componente para resolver una necesidad de interfaz, se debe usar ese componente antes que HTML nativo o una composiciÃ³n React manual
- ejemplos: usar `IonButton`, `IonContent`, `IonPage`, `IonHeader`, `IonToolbar`, `IonFooter`, `IonTabs`, `IonTabBar`, `IonTabButton`, `IonModal`, `IonPopover`, `IonToast`, `IonAlert`, `IonList`, `IonItem`, `IonInput`, `IonTextarea`, `IonSelect`, `IonCheckbox`, `IonSearchbar`, `IonRefresher`
- HTML nativo (`button`, `input`, `select`, `textarea`, `details`, `summary`, `dialog`, listas navegables manuales, footers manuales) solo debe usarse cuando Ionic no tenga un equivalente adecuado o cuando exista una razÃ³n tÃ©cnica clara y documentable
- en navegaciÃ³n mobile, preferir patrones Ionic como `IonTabs`, `IonTabBar`, `IonTabButton`, `IonMenu`, `IonBackButton` y router integrations antes que estructuras manuales
- en overlays y feedback, preferir `IonModal`, `IonPopover`, `IonToast`, `IonAlert`, `IonLoading` antes que soluciones HTML/CSS propias
- los estilos custom deben complementar Ionic, no reemplazar sus componentes base ni simularlos desde cero

Preferir wrappers limpios sobre componentes Ionic cuando ayuden a:
- estandarizar estilos
- reducir duplicaciÃ³n
- mejorar mantenibilidad
- desacoplar parcialmente la UI de detalles repetitivos

Pero no crear wrappers innecesarios solo por â€œabstracciÃ³nâ€.

---

## Reglas para hooks

Los hooks deben tener responsabilidades claras.

### Hooks de `presentation`
Se usan como capa de lÃ³gica de UI.

Pueden encargarse de:
- `loading`
- `error`
- `form state`
- eventos de usuario
- integraciÃ³n con casos de uso

### Hooks de `core`
Se usan solo para comportamiento transversal.

### Prohibiciones
- no crear hooks que mezclen UI, negocio e infraestructura sin lÃ­mite
- no meter requests HTTP sueltos en cualquier hook por conveniencia

---

## Clean Architecture aplicada en este proyecto

Este proyecto adapta Clean Architecture de forma pragmÃ¡tica para Ionic React.

### TraducciÃ³n prÃ¡ctica
- **Presentation** = componentes + hooks de UI
- **Domain** = casos de uso + reglas de negocio
- **Data** = API + repositorios concretos

No se busca burocracia arquitectÃ³nica innecesaria.
Se busca separaciÃ³n real de responsabilidades.

---

## QuÃ© debe hacer un agente de IA al modificar el proyecto

### Siempre debe:
1. identificar la feature afectada
2. ubicar el cambio en la capa correcta
3. evitar mezclar responsabilidades
4. reutilizar `core/` solo cuando sea realmente transversal
5. respetar nombres claros y consistentes
6. mantener cambios coherentes con Ionic React y TypeScript
7. priorizar mantenibilidad y escalabilidad

### Nunca debe:
1. crear lÃ³gica de negocio dentro de componentes JSX
2. hacer llamadas API directas desde componentes visuales
3. mover cosas a `core/` solo para â€œordenarâ€ si no son compartidas
4. crear carpetas paralelas que rompan el patrÃ³n definido
5. mezclar cÃ³digo especÃ­fico de una feature con otra sin necesidad
6. romper la separaciÃ³n `presentation / domain / data`

---

## Criterios de calidad obligatorios

Todo cambio generado debe cumplir con lo siguiente:

- nombres explÃ­citos
- estructura consistente
- bajo acoplamiento
- alta cohesiÃ³n
- fÃ¡cil testeo
- componentes enfocados
- hooks con responsabilidad clara
- casos de uso con intenciÃ³n de negocio real
- repositorios ocultando detalles de infraestructura

---

## Convenciones de naming

### Componentes
- PascalCase
- nombre orientado a intenciÃ³n
- ejemplos: `LoginForm`, `LoginButton`, `AuthCard`

### Hooks
- prefijo `use`
- ejemplos: `useLogin`, `useTheme`, `useDebounce`

### Casos de uso
Se recomienda nombrarlos por acciÃ³n de negocio.

Ejemplos vÃ¡lidos:
- `loginUseCase.ts`
- `registerUserUseCase.ts`
- `recoverPasswordUseCase.ts`

### APIs
- nombre explÃ­cito del origen o recurso
- ejemplos: `authApi.ts`, `userApi.ts`

### Repositories
- nombre ligado al contexto
- ejemplos: `authRepository.ts`, `userRepository.ts`

---

## ConvenciÃ³n obligatoria para commits

Todo commit debe usar solo uno de estos dos tipos:

- `feat`
- `fix`

El tÃ­tulo del commit debe incluir el dominio afectado entre parÃ©ntesis:

```text
feat(account)
fix(storefront)
```

La descripciÃ³n del commit debe escribirse como una lista de acciones en infinitivo/imperativo simple, una por lÃ­nea:

```text
- create new page
- update account navigation
- fix checkout validation
```

Ejemplo correcto:

```text
feat(account)

- create new page
```

Reglas:
- no usar otros tipos como `chore`, `refactor`, `style`, `docs`, `test`, etc.
- el dominio debe representar la feature o Ã¡rea principal afectada
- la descripciÃ³n debe enfocarse en acciones concretas como `create`, `update`, `fix`, `remove`, `move`

---

## Enforcement arquitectÃ³nico

Cuando un agente de IA reciba una tarea, debe aplicar este checklist antes de proponer cambios:

### Checklist
- Â¿La modificaciÃ³n pertenece a una feature existente?
- Â¿La responsabilidad nueva corresponde realmente a esa feature o exige una nueva feature de dominio?
- Â¿EstÃ¡ ubicada en la capa correcta?
- Â¿La UI quedÃ³ separada del negocio?
- Â¿La lÃ³gica de negocio quedÃ³ fuera de componentes visuales?
- Â¿El acceso a datos quedÃ³ encapsulado?
- Â¿Se evitÃ³ contaminar `core/` con cosas especÃ­ficas?
- Â¿La soluciÃ³n respeta Ionic React + TypeScript?
- Â¿La estructura sigue siendo escalable?

Si la respuesta a alguna es â€œnoâ€, el cambio debe corregirse antes de darse por vÃ¡lido.

---

## Plantilla mental para nuevas implementaciones

Antes de crear cualquier archivo, el agente debe preguntarse:

1. Â¿Esto es transversal o pertenece a una feature?
2. Â¿Pertenece a la feature actual o en realidad define un nuevo dominio funcional?
3. Â¿Esto es UI, negocio o datos?
4. Â¿Este componente realmente necesita existir separado?
5. Â¿Este hook es de UI o transversal?
6. Â¿Esta lÃ³gica deberÃ­a vivir en un caso de uso?
7. Â¿Este acceso externo debe ir en `api/` o `repository/`?

---

## Ejemplo de flujo correcto en auth

### Caso: login

#### `presentation/components/LoginForm.tsx`
- renderiza inputs y botÃ³n
- delega eventos

#### `presentation/hooks/useLogin.ts`
- maneja estado del formulario
- llama al caso de uso
- expone loading, error y submit

#### `domain/useCases/loginUseCase.ts`
- define la acciÃ³n de login
- encapsula la intenciÃ³n de negocio

#### `data/api/authApi.ts`
- ejecuta request al backend

#### `data/repositories/authRepository.ts`
- conecta el caso de uso con la implementaciÃ³n concreta de datos

---

## QuÃ© hacer cuando algo no encaja

Si un cambio no encaja claramente en la estructura actual:

1. no improvisar una carpeta nueva sin justificaciÃ³n
2. evaluar si pertenece a `core/`
3. evaluar si falta una subestructura dentro de una feature
4. mantener el patrÃ³n general antes que resolver rÃ¡pido de forma desordenada

---

## Prioridades del proyecto

En caso de conflicto entre velocidad y arquitectura, priorizar:

1. claridad
2. mantenibilidad
3. desacoplamiento
4. escalabilidad
5. consistencia estructural

---

## InstrucciÃ³n final para cualquier agente

Todo cambio debe sentirse como parte de una arquitectura intencional, no como cÃ³digo agregado por oportunidad.

La soluciÃ³n correcta no es la mÃ¡s rÃ¡pida de escribir, sino la que mejor respeta:
- la feature afectada
- la capa adecuada
- la responsabilidad correcta
- la mantenibilidad futura del proyecto
```
---

## Anexo: ConvenciÃƒÂ³n obligatoria para entities y types

Cuando se definan entidades o types, deben ubicarse en la capa correcta:

- `src/features/<feature>/domain/entities/` para entidades de negocio
- `src/features/<feature>/data/Entities/` para DTOs, payloads y respuestas tÃƒÂ©cnicas

Norma obligatoria:

- `NombreModel` en `domain/entities`
- `NombreDTO` en `data/Entities`

Esto debe validarse antes de dar por bueno cualquier cambio arquitectÃƒÂ³nico.

---

## Anexo: Convencion obligatoria para nombres de UI

### Componentes visuales
- todo componente visual, ya sea de `core` o de una `feature`, debe terminar con el sufijo `View`
- ejemplos correctos: `LoginFormView`, `ProductCardView`, `BrandHomeLinkView`

### Pantallas
- toda pantalla principal o toda pantalla montada por el router debe terminar con el sufijo `Screen`
- ejemplos correctos: `StorefrontScreen`, `CheckoutScreen`, `OrdersScreen`

---

## Anexo: Regla de dependencia unidireccional entre features

- una feature puede usar otra feature
- pero la relacion debe mantenerse en un solo sentido
- si `feature-a` usa `feature-b`, entonces `feature-b` no debe usar `feature-a`
- no se deben introducir dependencias circulares entre features, ni directas ni indirectas

---

## Anexo: Analogía de organización tipo Swift para Screens

Este proyecto puede pensarse de una forma muy similar a una organización frecuente en Swift.

Equivalencia conceptual:
- `HomeScreen` en React equivale a la vista principal de pantalla
- archivos como `HomeHeaderView`, `HomeFooterView` o `HomeModalView` cumplen un rol similar a extensiones tipo `HomeScreen+Header`, `HomeScreen+Footer` o `HomeScreen+Modal`

Regla práctica:
- la `Screen` debe mantenerse limpia, legible y compositiva
- las secciones visuales grandes o claramente separables deben extraerse a `presentation/components/`
- pensar `components/` como el equivalente React de extensiones de la screen ayuda a mantener orden y lectura
- el estado local, formularios y handlers de una `Screen` deben vivir por defecto en `presentation/hooks/`

