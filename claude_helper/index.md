# Race Trackr API — Project Overview

## Overview

REST API for managing **track days** and **vehicle maintenance**. Built with AdonisJS 6 (TypeScript), it exposes CRUD resources protected by token authentication and role-based access control.

---

## Tech Stack

| Layer | Technology | Version |
|---|---|---|
| Runtime | Node.js (ESM) | — |
| Language | TypeScript | ~5.8 |
| Framework | AdonisJS | ^6.18.0 |
| ORM | Lucid (AdonisJS) | ^21.6.1 |
| Database | PostgreSQL | — |
| DB Driver | pg | ^8.16.3 |
| Authentication | @adonisjs/auth (DB tokens) | ^9.4.0 |
| Validation | VineJS | ^3.0.1 |
| Dates | Luxon | ^3.7.2 |
| CORS | @adonisjs/cors | ^2.2.1 |
| Testing | Japa (runner + api-client + assert) | ^4.x |
| Linting | ESLint + Prettier (AdonisJS configs) | — |
| Git hooks | Husky + lint-staged | — |
| Commits | Commitlint (conventional commits) | — |
| Changelog | standard-version | — |

---

## Project Structure

```
api/
├── app/
│   ├── controllers/     → HTTP logic, request/response orchestration
│   ├── models/          → Lucid ORM entities (relations, hooks)
│   ├── validators/      → VineJS validation schemas
│   ├── middleware/      → Auth, roles, subscriptions, forced JSON
│   ├── exceptions/      → Global error handler
│   └── helpers/         → Business utilities (subscription_helper)
├── config/              → AdonisJS config files (auth, db, cors…)
├── database/
│   ├── migrations/      → Versioned DB schema
│   └── seeders/         → Initial data
├── start/
│   ├── routes.ts        → All route definitions
│   ├── kernel.ts        → Named middleware registration
│   └── env.ts           → Environment variable validation
├── bin/                 → Entry points (server, console, test)
├── api.ts               → Endpoint documentation (JSON)
└── adonisrc.ts          → AdonisJS configuration (providers, aliases)
```

---

## Import Aliases

Defined in `package.json#imports` to avoid relative paths:

```
#controllers/*   → ./app/controllers/*.js
#models/*        → ./app/models/*.js
#validators/*    → ./app/validators/*.js
#middleware/*    → ./app/middleware/*.js
#config/*        → ./config/*.js
#database/*      → ./database/*.js
#start/*         → ./start/*.js
```

---

## Observed Best Practices

### Architecture
- **Clear separation of concerns**: Controller → Model → DB, no business logic in routes
- **Lazy-loaded controllers** in routes (dynamic imports `() => import(...)`) for faster startup
- **REST resources** via `.resource().apiOnly()` for standard CRUD endpoints

### Authentication & Authorization
- **Stateless Bearer token** authentication (stored in DB)
- **Role-based access control** via dedicated middleware (`role_middleware`)
- **Ownership validation** in controllers (e.g. `where('user_id', user.id)`)
- Role hierarchy: `user` → `admin` → `owner`

### Data & Validation
- Systematic validation with **VineJS** before any DB operation
- **TypeScript enums** for controlled-value fields (vehicle type, weather, track condition)
- **UUIDs exposed** externally, numeric IDs kept internally for performance

### ORM & Database
- **Eager loading** with `.preload()` to prevent N+1 queries
- **Lucid hooks** (`@beforeCreate`) for automatic UUID generation
- **DB cascades** configured at migration level (CASCADE, SET NULL)
- **JSON columns** for flexible data (chronos, subscription features)

### Code Quality
- **Conventional Commits** enforced via commitlint + Husky
- **ESLint + Prettier** auto-fixed on staged files (lint-staged)
- **Strict TypeScript** with typecheck separate from build
- **HMR** in development via hot-hook (boundaries on controllers and middleware)

---

## Detailed Documentation Files

- [controllers.md](controllers.md) — Logic for each controller
- [models.md](models.md) — Lucid models, relations and hooks
- [validators.md](validators.md) — VineJS validation schemas
- [middleware.md](middleware.md) — Middlewares and request pipeline
- [routes.md](routes.md) — Routing, groups and route protection
- [database.md](database.md) — Migrations, schema and DB conventions
- [config.md](config.md) — Configuration files

---

## Useful Commands

```bash
npm run dev              # Start with HMR
npm run build            # TypeScript compilation
npm run test             # Japa tests
npm run lint             # ESLint
npm run typecheck        # TypeScript check without build
npm run migrate          # Run migrations
npm run migrate:rollback # Rollback migrations
npm run db:reset         # Full reset + seed
npm run db:seed          # Seed only
npm run version          # Version bump + changelog
```
