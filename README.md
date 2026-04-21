# CoffeeEcommerce

Proyecto fullstack de e-commerce de café construido con:

- Frontend: Ionic React + TypeScript
- Backend: Node.js + Express + TypeScript
- Base de datos: PostgreSQL

Este README está pensado para estudiantes: explica cómo funciona el sistema, cómo ejecutarlo y qué arquitectura se está usando sin asumir experiencia avanzada.

---

## 1) ¿Qué hace este proyecto?

Permite simular una tienda online de café con:

- catálogo de productos
- carrito
- checkout
- autenticación (registro/login/logout)
- gestión de direcciones
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

## 3) Arquitecturas usadas (explicadas simple)

### 3.1 Clean Architecture (adaptada)

Separación por responsabilidades:

- `presentation`: lo que ve y usa el usuario (pantallas, componentes, hooks de UI)
- `domain`: reglas de negocio (casos de uso)
- `data`: acceso a APIs, DB y repositorios concretos

Idea clave: la UI no debería contener reglas de negocio pesadas, y la lógica de negocio no debería depender de Ionic/React.

### 3.2 Feature-Based Architecture

El sistema se separa por dominios funcionales (`auth`, `storefront`, `cart`, `checkout`, etc.), no por carpetas globales tipo `pages/` gigantes.

Esto permite escalar más fácil: cada feature crece de forma ordenada y aislada.

### 3.3 Component-Based Architecture

En frontend, la UI se compone de piezas reutilizables:

- `atoms` (componentes base)
- `molecules` (combinaciones pequeñas)
- componentes y pantallas por feature

---

## 4) Frontend (Ionic-Ecommerce)

### 4.1 Organización principal

```text
Ionic-Ecommerce/src/
  core/
    presentation/components/
    router/
    auth/
    config/
  features/
    auth/
    storefront/
    cart/
    checkout/
    account/
    orders/
    admin/
```

### 4.2 Flujo funcional

1. El usuario ve productos en `storefront`.
2. Agrega productos al `cart`.
3. Va a `checkout`.
4. Front llama al backend para validar compra y registrar pedido.
5. El perfil muestra direcciones y pedidos.

### 4.3 Sesión y seguridad en frontend

- Usa token bearer en headers (`Authorization`).
- Si backend devuelve `401`, el front detecta sesión expirada, limpia token y fuerza estado no autenticado.

---

## 5) Backend (nodejs-Ecommerce)

### 5.1 Organización principal

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

- `helmet` (headers HTTP de seguridad)
- `express.json({ limit: ... })` para limitar tamaño de payload
- rate limiting por IP (global + auth + checkout + admin)
- sesiones con expiración (`expires_at`)
- hash de contraseñas con `bcryptjs`
- migración progresiva: contraseñas antiguas en texto plano se re-hashean en login exitoso
- rutas admin protegidas por `requireAuth + requireAdmin`

---

## 6) Base de datos y ambientes

El backend usa dos ambientes separados:

- desarrollo: `.env.development` -> DB dev
- producción: `.env.production` -> DB prod

Script útil:

- `npm run db:bootstrap` (backend)
  - crea automáticamente las bases declaradas en `.env.development` y `.env.production` si no existen

Al iniciar backend, también se inicializan tablas e índices automáticamente.

---

## 7) Configuración mínima para correr el proyecto

## Requisitos

- Node.js (recomendado v18+)
- npm
- PostgreSQL instalado y corriendo

## 7.1 Backend

Entrar a carpeta:

```bash
cd nodejs-Ecommerce
```

Instalar dependencias:

```bash
npm install
```

Revisar variables en:

- `.env.development`
- `.env.production`

Crear bases de datos de ambos ambientes:

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

Ejecutar backend compilado:

```bash
npm run start:dev
npm run start:prod
```

## 7.2 Frontend

Entrar a carpeta:

```bash
cd Ionic-Ecommerce
```

Instalar dependencias:

```bash
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

## 8) Cómo probar rápido el sistema completo

1. Levantar PostgreSQL.
2. Levantar backend (`nodejs-Ecommerce`, `npm run dev`).
3. Levantar frontend (`Ionic-Ecommerce`, `npm run dev`).
4. Abrir `http://localhost:5173`.
5. Probar:
   - registro/login
   - agregar direcciones
   - marcar dirección predeterminada
   - agregar productos al carrito
   - confirmar pedido
   - revisar pedidos
   - (opcional) probar panel admin con usuario admin

---

## 9) Mentalidad técnica del proyecto

Este proyecto busca equilibrio entre:

- claridad para aprender
- arquitectura escalable
- separación de responsabilidades
- seguridad práctica para un MVP serio

No es solo “que funcione”, sino que sea mantenible cuando crezca.

---


## 10) Glosario express

- **Feature**: módulo funcional (ej. `checkout`)
- **Use Case**: acción de negocio (ej. “registrar pedido”)
- **Repository**: capa que abstrae acceso a datos
- **DTO**: objeto de transferencia entre capas/sistemas
- **Rate limit**: límite de peticiones por tiempo para evitar abuso
