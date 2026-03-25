# CLAUDE.md

## Where to Add New Rules

When adding a new coding rule or convention, **always prefer adding it to the relevant `claude_helper/` file** (e.g. `models.md` for Lucid models, `controllers.md` for HTTP logic). Only add a rule to this `CLAUDE.md` when it is a **cross-cutting, non-negotiable hard rule** that applies regardless of file type and must be visible at the highest level.

---

## Hard Rules — Violation = Rejected Code

These rules are **non-negotiable**. They apply to every line of code in every session. Breaking any of them means the code will be rejected. They are numbered for reference.

### HR-1: Lucid ORM only — no raw SQL

**Never** use raw SQL queries (`db.rawQuery`, `knex.raw`, string interpolation). All database access goes through Lucid models and the query builder. Complex queries use `.whereRaw()` only when the query builder has no equivalent, and with bound parameters only (never string interpolation).

### HR-2: VineJS validation before every DB write

Every `store` and `update` action in a controller **must** validate the request with a VineJS validator before touching the database. No `request.only()` without a prior `request.validateUsing()` on write operations.

| Wrong | Right |
|---|---|
| `const data = request.only([...])` then `Model.create(data)` | `const data = await request.validateUsing(myValidator)` then `Model.create(data)` |

### HR-3: Always enforce ownership on user-scoped resources

Every query on a user-owned resource (`UserVehicle`, `TrackDay`, `Maintenance`) **must** include `.where('user_id', user.id)`. Never fetch by ID alone. Use `.firstOrFail()` to get automatic 404s.

```typescript
// Wrong
await TrackDay.findOrFail(params.id)

// Right
await TrackDay.query().where('id', params.id).where('user_id', user.id).firstOrFail()
```

### HR-4: Never expose numeric IDs externally

The API **must never** return `id` (numeric primary key) in responses. External consumers always receive `uuid`. Numeric IDs are for internal DB joins only. When building new models, add a `uuid` field with `@beforeCreate()` generation hook.

### HR-5: `serializeAs: null` on all sensitive fields

Fields that must never appear in API responses (`password`, `preferences`, any internal flag) **must** be decorated with `@column({ serializeAs: null })`. Never rely on manual deletion from response objects.

### HR-6: Preload relations — never load in a loop

Relations must be loaded with `.preload()` on the query, never inside a `for` loop or `.map()`. A loop that calls `await record.load(...)` per iteration causes N+1 queries and will be rejected.

```typescript
// Wrong
for (const day of trackDays) { await day.load('track') }

// Right
TrackDay.query().preload('track')
```

### HR-7: Lazy-load controllers in routes

All controller imports in `start/routes.ts` **must** use dynamic lazy imports. Never use static top-level imports for controllers in the routes file.

```typescript
// Wrong
import TrackDaysController from '#controllers/track_days_controller'

// Right
const TrackDaysController = () => import('#controllers/track_days_controller')
```

### HR-8: Conventional commits — no exceptions

Every commit message must follow the Conventional Commits specification (`feat:`, `fix:`, `chore:`, `refactor:`, `docs:`, etc.). This is enforced by commitlint. Never bypass with `--no-verify`.

### HR-9: English-only code

All code, variable names, function names, class names, and comments must be in English. French is allowed only in user-facing API error messages or response strings when explicitly requested.

### HR-10: No single-use helper methods

Never extract a method whose sole purpose is to wrap a one-liner used in only one place. Inline the logic directly. A method is only justified when called from **at least two distinct places** or when it encapsulates genuinely complex logic.

---

## Pre-Flight — Before ANY Code Change

Read the applicable `claude-helper/` guide before editing. These files describe patterns, conventions, and concrete examples specific to this codebase.

| You're about to touch... | Read first |
|---|---|
| Any controller | [`claude_helper/controllers.md`](claude_helper/controllers.md) |
| Any model | [`claude_helper/models.md`](claude_helper/models.md) |
| Any validator | [`claude_helper/validators.md`](claude_helper/validators.md) |
| Any middleware | [`claude_helper/middleware.md`](claude_helper/middleware.md) |
| Routes / routing groups | [`claude_helper/routes.md`](claude_helper/routes.md) |
| Migrations / DB schema | [`claude_helper/database.md`](claude_helper/database.md) |
| Config files / env vars | [`claude_helper/config.md`](claude_helper/config.md) |
| New feature (multiple files) | [`claude_helper/index.md`](claude_helper/index.md) then relevant guides |

If a task spans multiple file types, read **all** corresponding guides before starting.

---

## Project Overview

**Race Trackr API** — REST API for managing racing track days and vehicle maintenance. Multi-role (owner / admin / user), subscription-gated features, stateless token authentication.

### Architecture

```
app/controllers/   → HTTP logic, request/response orchestration
app/models/        → Lucid ORM entities, relations, hooks
app/validators/    → VineJS schemas (one file per resource)
app/middleware/    → Auth, role, subscription, global JSON
app/exceptions/    → Global error handler
app/helpers/       → Business utilities
config/            → AdonisJS config files
database/          → Migrations + seeders
start/             → Routes, kernel, env validation
```

### Key Concepts

- **Auth:** Stateless Bearer token stored in DB (`access_tokens` table), no sessions
- **Roles:** `user` → `admin` → `owner` (each level is a strict superset)
- **Ownership:** All user data is scoped with `user_id` on every query
- **UUIDs:** Generated in `@beforeCreate()` hooks, always used as external identifiers
- **Subscription:** Feature access controlled by `subscription_middleware` + JSON `features` column

### Import Aliases

```
#controllers/*  #models/*  #validators/*  #middleware/*
#config/*  #database/*  #start/*
```

Always use aliases — never relative paths like `../../models/user`.
