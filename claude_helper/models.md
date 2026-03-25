# Models (Lucid ORM)

Located in [app/models/](../app/models/). All models extend `BaseModel` from `@adonisjs/lucid`.

---

## General Conventions

- **Numeric IDs** internally (DB performance), **UUIDs exposed** externally via the API
- **UUID auto-generated** in a `@beforeCreate` hook
- **Timestamps** (`created_at`, `updated_at`) managed automatically by Lucid
- **Soft delete** not used — hard deletes with DB cascades
- Column names in **snake_case** in DB, **camelCase** in TypeScript via `@column`

---

## User

The central model of the system.

```typescript
// Main fields
id          // Numeric PK (internal)
uuid        // External identifier exposed by the API
email       // Unique
password    // Hashed with scrypt
firstName
lastName
role        // Enum: 'owner' | 'admin' | 'user'
countryId   // FK → Country

// Relations
hasMany     UserVehicle
hasMany     TrackDay
hasOne      Subscription
hasMany     AccessToken  // managed by @adonisjs/auth
```

**Key points:**
- Password is automatically hashed via AdonisJS scrypt provider
- `role` determines permissions throughout the system
- Deleting a user cascades to their vehicles, track days and maintenances

---

## UserVehicle

A vehicle belonging to a user.

```typescript
id
uuid
userId      // FK → User (CASCADE DELETE)
name
slug        // Auto-generated, unique
type        // Enum: 'motorcycle' | 'car' | 'karting' | 'other'
brand
model
year

// Relations
belongsTo   User
hasMany     TrackDay
hasMany     Maintenance
```

---

## TrackDay

Track day — the main entity of the application.

```typescript
id
uuid
userId      // FK → User (CASCADE DELETE)
trackId     // FK → Track
vehicleId   // FK → UserVehicle (SET NULL if vehicle deleted)
date
weather     // Enum: 'sunny' | 'cloudy' | 'rainy' | 'mixed'
trackCondition  // Enum: 'dry' | 'wet' | 'mixed'
airTemp
trackTemp
chronos     // JSON: array of lap times
bestLapTime
notes

// Relations
belongsTo   User
belongsTo   Track
belongsTo   UserVehicle
```

**Key points:**
- `vehicleId` uses `SET NULL` rather than CASCADE — a track day remains if the vehicle is deleted
- `chronos` as JSON allows flexible lap time storage without a separate table

---

## Maintenance

A vehicle maintenance record.

```typescript
id
uuid
userId      // FK → User (CASCADE DELETE)
vehicleId   // FK → UserVehicle (CASCADE DELETE)
type        // Enum: 'maintenance' | 'repair' | 'modification' | 'other'
title
description
date
cost
mileage
nextMaintenanceMileage
nextMaintenanceDate

// Relations
belongsTo   User
belongsTo   UserVehicle
```

---

## Track

A racing track.

```typescript
id
uuid
countryId   // FK → Country
name
slug
description
turns       // Number of turns
length      // Length (m or km)
width       // Track width
maxDb       // Maximum allowed noise level
bestLapTime // Reference time
logoUrl
layoutUrl

// Relations
belongsTo   Country
hasMany     TrackDay
```

---

## Country

Country reference data — static data managed by admins.

```typescript
id
name
code        // ISO code (FR, DE, IT…)

// Relations
hasMany     Track
hasMany     User
```

---

## Subscription

A subscription associated with a user.

```typescript
id
userId      // FK → User
plan        // Enum: 'free' | 'basic' | 'pro' | 'enterprise'
status      // Enum: 'active' | 'inactive' | 'cancelled' | 'past_due'
billingCycle  // Enum: 'monthly' | 'yearly'
features    // JSON: list of available features
startDate
endDate
renewalDate

// Relations
belongsTo   User
```

**Key points:**
- `features` as JSON allows adding/removing features without a migration
- Used by `subscription_middleware` to control feature access

---

## Relations Diagram

```
Country ──< Track ──< TrackDay >── UserVehicle >── User
                                         │               │
                                    Maintenance        Subscription
```

- `User` is the root of all user data
- `Country` and `Track` are shared data (not tied to a user)
- `TrackDay` links the three main entities: User, Track, UserVehicle
