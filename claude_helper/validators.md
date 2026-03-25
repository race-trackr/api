# Validators (VineJS)

Located in [app/validators/](../app/validators/). Each file exports one or more VineJS schemas.

---

## General Conventions

- Validation called **before** any DB operation in the controller: `request.validateUsing(myValidator)`
- VineJS returns typed and sanitized data — no additional casting needed
- Validation errors are caught by the global exception handler (returns 422)
- **DB uniqueness checks** (e.g. email already taken) are done directly in the Vine schema via custom rules

---

## auth_validator.ts

Validates authentication endpoints.

### `registerValidator`
```typescript
{
  email: string (email, unique in DB)
  password: string (8-64 characters)
  firstName: string
  lastName: string
}
```

### `loginValidator`
```typescript
{
  email: string (email)
  password: string
}
```

**Key points:**
- The uniqueness rule on `email` during register performs a DB query inside the Vine schema — avoids a double controller/DB roundtrip
- `loginValidator` does not verify credentials (done in the controller), it only validates the format

---

## user_validator.ts

Validates user profile updates (`PUT /users/me`).

```typescript
{
  firstName?: string (optional)
  lastName?:  string (optional)
  email?:     string (email, unique — except for the current user)
  password?:  string (8-64 characters, optional)
}
```

**Key points:**
- All fields are optional (partial update)
- The email uniqueness rule excludes the current user to allow re-submitting the same email

---

## trackday_validator.ts

Validates track days.

### `createTrackDayValidator`
```typescript
{
  trackId:        number
  vehicleId?:     number (optional)
  date:           string (ISO date)
  weather:        'sunny' | 'cloudy' | 'rainy' | 'mixed'
  trackCondition: 'dry' | 'wet' | 'mixed'
  airTemp?:       number
  trackTemp?:     number
  chronos?:       array (flexible JSON)
  bestLapTime?:   string
  notes?:         string
}
```

### `updateTrackDayValidator`
- Same as create but with all fields optional

---

## mailer_validator.ts

Validates email sending (owner only).

```typescript
{
  to:      string (email)
  subject: string
  body:    string
}
```

---

## How to Add a New Validator

1. Create `app/validators/my_resource_validator.ts`
2. Export a schema with `vine.compile(vine.object({...}))`
3. Import and call in the controller: `await request.validateUsing(myValidator)`

```typescript
// Minimal example
import vine from '@vinejs/vine'

export const createMyResourceValidator = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(2).maxLength(100),
  })
)
```
