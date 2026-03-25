# Middleware

Located in [app/middleware/](../app/middleware/). Registered in [start/kernel.ts](../start/kernel.ts).

---

## Request Pipeline

For a typical protected route, the execution order is:

```
Request
  → force_json_response_middleware   (global)
  → container_bindings_middleware    (global)
  → auth_middleware                  (protected group)
  → role_middleware                  (if required)
  → subscription_middleware          (if required)
  → Controller
```

---

## force_json_response_middleware.ts

**Global** — applied to all routes.

Forces the `Content-Type: application/json` header on all responses, even on errors. Guarantees the API always returns JSON, never HTML.

---

## container_bindings_middleware.ts

**Global** — applied to all routes.

Configures the AdonisJS IoC container bindings for the current request. Required for dependency injection in controllers.

---

## auth_middleware.ts

**Named** — used explicitly on protected route groups.

```typescript
middleware.auth()
```

- Reads the Bearer token from the `Authorization` header
- Validates the token in DB via `@adonisjs/auth`
- Exposes `auth.user` to the rest of the pipeline
- Returns **401** if the token is missing, invalid or expired
- **Not** applied to public routes (auth/register, auth/login, public reads)

---

## role_middleware.ts

**Named** — applied after `auth_middleware`.

```typescript
middleware.role({ roles: ['admin', 'owner'] })
middleware.role({ roles: ['owner'] })
```

- Checks that `auth.user.role` is in the list of allowed roles
- Returns **403** if the role is insufficient
- Hierarchy is implemented in route configuration (not in the middleware itself) — `owner` accesses `admin` routes because both roles are listed explicitly

**Usage in routes:**

| Allowed roles | Concerned routes |
|---|---|
| `['admin', 'owner']` | Track and country management |
| `['owner']` | User administration, mailer |

---

## subscription_middleware.ts

**Named** — controls feature access based on the subscription plan.

- Checks that the user's subscription is active (`status: 'active'`)
- Verifies the requested feature is in `subscription.features` (JSON)
- Returns **403** with an explicit message if the feature is unavailable

**Key points:**
- Enables fine-grained access without multiplying roles
- Features are configured in the `Subscription` model (JSON column)
- Can be combined with `role_middleware` for premium admin routes

---

## Registration (kernel.ts)

```typescript
// Global middlewares (order matters)
server.use([
  () => import('#middleware/force_json_response_middleware'),
  () => import('#middleware/container_bindings_middleware'),
])

// Named middlewares
router.named({
  auth: () => import('#middleware/auth_middleware'),
  role: () => import('#middleware/role_middleware'),
  subscription: () => import('#middleware/subscription_middleware'),
})
```
