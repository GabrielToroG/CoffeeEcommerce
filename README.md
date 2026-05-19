# CoffeeEcommerce

Proyecto fullstack de e-commerce de cafe construido con:

- Frontend: Ionic React + TypeScript
- Backend: Node.js + Express + TypeScript
- Base de datos: PostgreSQL

Este README esta pensado para estudiantes: explica como funciona el sistema, como ejecutarlo y que arquitectura se esta usando sin asumir experiencia avanzada.

---

## 1) Que hace este proyecto?

Permite simular una tienda online de cafe con:

- catalogo de productos
- carrito
- checkout
- autenticacion (registro, login, logout)
- gestion de direcciones
- historial de pedidos
- panel administrador para CRUD de productos

---

## 2) Estructura general del repositorio

```text
CoffeeEcommerce/
  Ionic-Ecommerce/      # Frontend (Ionic React)
  nodejs-Ecommerce/     # Backend (Express + PostgreSQL)
```

---

## 3) Arquitecturas usadas

### 3.1 Clean Architecture

Separacion por responsabilidades:

- `presentation`: lo que ve y usa el usuario (pantallas, componentes, hooks de UI)
- `domain`: reglas de negocio (use cases, entities y protocolos)
- `data`: acceso a APIs, datasources, DB y repositorios concretos
- `composition`: wiring por feature para conectar data, domain y presentation

Idea clave: la UI no debe contener reglas de negocio pesadas, y el dominio no debe depender de Ionic o React.

### 3.2 Feature-Based Architecture

El sistema se separa por dominios funcionales (`auth`, `storefront`, `cart`, `checkout`, etc.), no por carpetas globales gigantes.

### 3.3 Component-Based Architecture

En frontend, la UI se compone de piezas reutilizables:

- `atoms`
- `molecules`
- `organisms`
- componentes y pantallas por feature

---

## 4) Frontend (Ionic-Ecommerce)

### 4.1 Organizacion principal

```text
Ionic-Ecommerce/src/
  core/
    config/
    presentation/components/
    router/
    theme/
  features/
    auth/
    storefront/
    cart/
    checkout/
    account/
    orders/
    admin/
```

### 4.2 Estructura interna de una feature

```text
features/<feature>/
  composition/
  presentation/
    components/
    hooks/
    screens/
  domain/
    entities/
    repositories/
    useCases/
      protocols/
  data/
    dataSources/
    repositories/
```

### 4.3 Convencion actual de use cases

Los casos de uso frontend siguen una convencion explicita:

- remoto o alineado a endpoint: `get`, `post`, `put`, `patch`, `delete`
- local o cliente: `getLocal`, `postLocal`, `putLocal`, `patchLocal`, `deleteLocal`
- logica pura: `compute`, `derive`, `validate`, `resolve`, `map`, `format`

Ejemplos reales del proyecto:

- `getLocalCurrentUserUseCase`
- `postLocalLoginUseCase`
- `postLocalCheckoutUseCase`
- `postAdminProductUseCase`
- `putAdminProductUseCase`
- `deriveSelectedDeliveryAddressLabelUseCase`
- `computeCartSummaryUseCase`

Los contratos de esos casos de uso viven en:

- `domain/useCases/protocols/*UseCaseProtocol.ts`
- `domain/useCases/protocols/*UseCasesProtocol.ts`

### 4.4 Runtime actual del frontend

Hoy el frontend no trabaja 100% contra backend remoto en todas las features.

Configuracion actual:

- `authDataSource: local`
- `checkoutDataSource: local`
- `storefrontDataSource: remote`
- `adminCatalogDataSource: remote`

Eso significa:

- `auth` usa datasource local
- `checkout` usa datasource local
- `storefront` usa datasource remoto
- `admin` si usa flujo remoto

### 4.5 Flujo funcional general

1. El usuario ve productos en `storefront`.
2. Agrega productos al `cart`.
3. Va a `checkout`.
4. Gestiona sesion, direcciones y pedidos desde `auth`, `account` y `orders`.
5. El panel `admin` permite administrar catalogo.

### 4.6 Sesion y seguridad en frontend

- Usa token bearer en headers (`Authorization`) cuando la feature trabaja contra backend remoto.
- Si backend devuelve `401`, el front puede limpiar token y forzar estado no autenticado.

---

## 5) Backend (nodejs-Ecommerce)

### 5.1 Organizacion principal

```text
nodejs-Ecommerce/src/
  core/
    config/
    database/
    middleware/
    security/
    server/
  features/
    auth/
    storefront/
    checkout/
    admin/
    health/
```

### 5.2 Endpoints principales

- `GET /api/storefront`
- `POST /api/checkout`
- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me`
- `POST /api/auth/logout`
- `POST /api/auth/addresses`
- `PATCH /api/auth/addresses/:addressId/default`
- `POST /api/auth/orders`
- `GET /api/admin/catalog/options`
- `GET /api/admin/products`
- `POST /api/admin/products`
- `PUT /api/admin/products/:productId`
- `DELETE /api/admin/products/:productId`

### 5.3 Seguridad implementada

- `helmet`
- `express.json({ limit: ... })`
- rate limiting por IP
- sesiones con expiracion (`expires_at`)
- hash de contrasenas con `bcryptjs`
- migracion progresiva de passwords antiguas en texto plano
- rutas admin protegidas por `requireAuth + requireAdmin`

---

## 6) Base de datos y ambientes

El backend usa dos ambientes separados:

- desarrollo: `.env.development`
- produccion: `.env.production`

Script util:

- `npm run db:bootstrap`
  - crea automaticamente las bases declaradas en `.env.development` y `.env.production` si no existen

Al iniciar backend, tambien se inicializan tablas e indices automaticamente.

---

## 7) Configuracion minima para correr el proyecto

## Requisitos

- Node.js recomendado v18+
- npm
- PostgreSQL instalado y corriendo

## 7.1 Backend

```bash
cd nodejs-Ecommerce
npm install
```

Revisar variables en:

- `.env.development`
- `.env.production`

Crear bases:

```bash
npm run db:bootstrap
```

Levantar backend en desarrollo:

```bash
npm run dev
```

Compilar backend:

```bash
npm run build:dev
npm run build:prod
```

## 7.2 Frontend

```bash
cd Ionic-Ecommerce
npm install
```

Variables por ambiente:

- `.env.development`
- `.env.production`

Levantar frontend dev:

```bash
npm run dev
```

Compilar frontend:

```bash
npm run build:dev
npm run build:prod
```

---

## 8) Como probar rapido el sistema completo

1. Levantar PostgreSQL.
2. Levantar backend en `nodejs-Ecommerce`.
3. Levantar frontend en `Ionic-Ecommerce`.
4. Abrir `http://localhost:5173`.
5. Probar:
   - registro y login
   - agregar direcciones
   - marcar direccion predeterminada
   - agregar productos al carrito
   - confirmar pedido
   - revisar pedidos
   - panel admin

Nota:

- hoy `admin` y `storefront` son las partes mas claramente conectadas a backend remoto
- `auth` y `checkout` siguen una configuracion local en el frontend actual

---

## 9) Mentalidad tecnica del proyecto

Este proyecto busca equilibrio entre:

- claridad para aprender
- arquitectura escalable
- separacion de responsabilidades
- seguridad practica para un MVP serio

No es solo que funcione, sino que sea mantenible cuando crezca.

---

## 10) Glosario express

- **Feature**: modulo funcional como `checkout`
- **Use Case**: accion del dominio como `postLocalCheckoutUseCase`
- **UseCaseProtocol**: contrato tipado de un caso de uso
- **Repository**: capa que abstrae acceso a datos
- **DTO**: objeto de transferencia entre capas o sistemas
- **DataSource**: origen tecnico de datos local o remoto
- **Rate limit**: limite de peticiones por tiempo para evitar abuso
