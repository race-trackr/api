# Routes

Defined in [start/routes.ts](../start/routes.ts). All prefixed with `/api/v1`.

---

## Group Structure

Routes are organized into **4 groups** based on the required access level.

---

## 1. Unprefixed Routes (outside API)

```
GET /      → API info (name, version, description)
GET /api/v1 → Endpoint documentation (content of api.ts)
```

---

## 2. Public Routes — `/api/v1`

No middleware required.

```
POST   /api/v1/auth/register       → AuthController.register
POST   /api/v1/auth/login          → AuthController.login

GET    /api/v1/countries           → CountriesController.index
GET    /api/v1/countries/:id       → CountriesController.show

GET    /api/v1/tracks              → TracksController.index
GET    /api/v1/tracks/:id          → TracksController.show
```

---

## 3. Protected Routes — `/api/v1` + `middleware.auth()`

Require a valid Bearer token.

```
POST   /api/v1/auth/logout         → AuthController.logout

GET    /api/v1/users/me            → UserController.me
PUT    /api/v1/users/me            → UserController.update
DELETE /api/v1/users/me            → UserController.delete

GET    /api/v1/vehicles            → UserVehiclesController.index
POST   /api/v1/vehicles            → UserVehiclesController.store
GET    /api/v1/vehicles/:id        → UserVehiclesController.show
PUT    /api/v1/vehicles/:id        → UserVehiclesController.update
DELETE /api/v1/vehicles/:id        → UserVehiclesController.destroy

GET    /api/v1/trackdays           → TrackDaysController.index
POST   /api/v1/trackdays           → TrackDaysController.store
GET    /api/v1/trackdays/:id       → TrackDaysController.show
PUT    /api/v1/trackdays/:id       → TrackDaysController.update
DELETE /api/v1/trackdays/:id       → TrackDaysController.destroy

GET    /api/v1/maintenances        → MaintenancesController.index
POST   /api/v1/maintenances        → MaintenancesController.store
GET    /api/v1/maintenances/:id    → MaintenancesController.show
PUT    /api/v1/maintenances/:id    → MaintenancesController.update
DELETE /api/v1/maintenances/:id    → MaintenancesController.destroy
```

---

## 4. Admin Routes — `/api/v1` + `auth` + `role(['admin', 'owner'])`

Manages shared content (tracks, countries).

```
POST   /api/v1/tracks              → TracksController.store
PUT    /api/v1/tracks/:id          → TracksController.update
DELETE /api/v1/tracks/:id          → TracksController.destroy

POST   /api/v1/countries           → CountriesController.store
PUT    /api/v1/countries/:id       → CountriesController.update
DELETE /api/v1/countries/:id       → CountriesController.destroy
```

---

## 5. Owner-Only Routes — `/api/v1` + `auth` + `role(['owner'])`

Full administration.

```
GET    /api/v1/admin/users         → AdminUsersController.index
GET    /api/v1/admin/users/:id     → AdminUsersController.show
PUT    /api/v1/admin/users/:id     → AdminUsersController.update
DELETE /api/v1/admin/users/:id     → AdminUsersController.destroy

POST   /api/v1/admin/mailer/send   → MailerController.send
```

---

## Routing Conventions

### REST resources via `.resource().apiOnly()`

AdonisJS automatically generates the 5 CRUD routes:

```typescript
router.resource('vehicles', UserVehiclesController).apiOnly()
// Generates: index, show, store, update, destroy
```

With `.only([...])` to limit to desired actions:

```typescript
router.resource('countries', CountriesController).apiOnly().only(['index', 'show'])
```

### Lazy-loading controllers

```typescript
// Pattern used in routes.ts
const AuthController = () => import('#controllers/auth_controller')
```

Improves startup time — the module is only loaded on the first route call.

---

## Access Level Summary

| Level | Middleware | Description |
|---|---|---|
| Public | None | Read countries, tracks + auth register/login |
| Authenticated | `auth` | All user operations |
| Admin | `auth` + `role(['admin', 'owner'])` | Shared content management |
| Owner | `auth` + `role(['owner'])` | Full administration |
