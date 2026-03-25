# Database — Migrations & ORM

## System

- **Database**: PostgreSQL
- **Driver**: `pg` ^8.16.3
- **ORM**: Lucid (AdonisJS) ^21.6.1
- **Config**: [config/database.ts](../config/database.ts)
- **Migrations**: [database/migrations/](../database/migrations/)
- **Seeders**: [database/seeders/main/](../database/seeders/main/)

---

## Migrations (chronological order)

| # | Table | Key points |
|---|---|---|
| 1 | `countries` | `id`, `name`, ISO `code` |
| 2 | `users` | FK → countries, enum `role`, hashed password |
| 3 | `access_tokens` | Authentication tokens (managed by @adonisjs/auth) |
| 4 | `tracks` | FK → countries, track metadata (turns, length, maxDb…) |
| 5 | `user_vehicles` | FK → users (CASCADE DELETE), enum `type` |
| 6 | `track_days` | Multiple FKs, JSON `chronos` column |
| 7 | `user_preferences` | JSON `preferences` column (extensible) |
| 8 | `maintenances` | FK → users + vehicles (CASCADE), mileage tracking |
| 9 | `subscriptions` | FK → users, enum `plan`/`status`, JSON `features` |

---

## Schema Conventions

### Primary keys and identifiers
```sql
-- Internal numeric ID (JOIN performance)
id BIGINT INCREMENTS PRIMARY KEY

-- UUID exposed by the API (generated in app via @beforeCreate)
uuid UUID NOT NULL UNIQUE
```

### Foreign keys and deletion behaviors

| Relation | Behavior | Reason |
|---|---|---|
| `user_vehicles.user_id → users.id` | CASCADE DELETE | A vehicle without a user makes no sense |
| `track_days.user_id → users.id` | CASCADE DELETE | Same |
| `track_days.vehicle_id → user_vehicles.id` | SET NULL | Track day remains if the vehicle is deleted |
| `maintenances.user_id → users.id` | CASCADE DELETE | A maintenance without a user makes no sense |
| `maintenances.vehicle_id → user_vehicles.id` | CASCADE DELETE | A maintenance without a vehicle makes no sense |
| `tracks.country_id → countries.id` | RESTRICT (default) | A track must always have a country |

### JSON columns
```sql
-- track_days: flexible lap time storage
chronos JSON DEFAULT '[]'

-- subscriptions: features available per plan
features JSON DEFAULT '{}'

-- user_preferences: extensible preferences without migration
preferences JSON DEFAULT '{}'
```

### Enums
Enums are defined as `CHECK` constraints or PostgreSQL types:

```sql
-- users
role: 'owner' | 'admin' | 'user'  (default: 'user')

-- user_vehicles
type: 'motorcycle' | 'car' | 'karting' | 'other'

-- track_days
weather:         'sunny' | 'cloudy' | 'rainy' | 'mixed'
track_condition: 'dry' | 'wet' | 'mixed'

-- maintenances
type: 'maintenance' | 'repair' | 'modification' | 'other'

-- subscriptions
plan:          'free' | 'basic' | 'pro' | 'enterprise'
status:        'active' | 'inactive' | 'cancelled' | 'past_due'
billing_cycle: 'monthly' | 'yearly'
```

---

## ORM Configuration

```typescript
// config/database.ts
{
  connection: 'pg',
  migrations: {
    naturalSort: true,  // Natural sort of migration files
    paths: ['database/migrations'],
  }
}
```

`naturalSort: true` ensures `10_` comes after `9_` (not after `1_`).

---

## Lucid Patterns Used

### Relations
```typescript
// In models
@hasMany(() => TrackDay)
declare trackDays: HasMany<typeof TrackDay>

@belongsTo(() => User)
declare user: BelongsTo<typeof User>
```

### Eager loading (prevents N+1)
```typescript
// In controllers
await TrackDay.query()
  .where('user_id', user.id)
  .preload('track')
  .preload('vehicle')
```

### UUID generation hook
```typescript
@beforeCreate()
static async generateUUID(model: MyModel) {
  model.uuid = uuidv4()
}
```

### Queries with ownership
```typescript
// Systematic pattern for security
await UserVehicle.query()
  .where('user_id', user.id)
  .where('id', params.id)
  .firstOrFail()  // Throws a 404 if not found
```

---

## DB Management Commands

```bash
# Run pending migrations
node ace migration:run

# Rollback last migration
node ace migration:rollback

# Full reset (rollback all + re-run + seed)
node ace migration:reset && node ace migration:run && node ace db:seed

# Seed only
node ace db:seed

# Migration status
node ace migration:status
```
