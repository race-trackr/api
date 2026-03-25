# Controllers

Located in [app/controllers/](../app/controllers/). Each controller handles HTTP requests for a given resource.

---

## General Conventions

- AdonisJS context injection (`HttpContext`) — no separate `Request`/`Response` objects
- Authenticated user retrieved via `auth.getUserOrFail()` on protected routes
- Systematic validation with a VineJS validator before any DB operation
- Responses: `201` for creation, `204` for deletion, standard codes otherwise
- Ownership validated directly in the Lucid query (`.where('user_id', user.id)`)

---

## auth_controller.ts

Handles authentication (stateless, DB tokens).

| Method | Route | Description |
|---|---|---|
| `register` | POST /auth/register | Creates a user + returns a token |
| `login` | POST /auth/login | Verifies credentials + returns a token |
| `logout` | POST /auth/logout | Invalidates the current token |
| `me` | GET /users/me | Alias in `user_controller` |

**Key points:**
- Token created via `User.accessTokens.create(user)`
- Deletion via `User.accessTokens.delete(user, identifier)`
- No session — the token is returned in the JSON response

---

## user_controller.ts

Manages the authenticated user's profile (`/users/me`).

| Method | Route | Description |
|---|---|---|
| `me` | GET /users/me | Returns the full profile |
| `update` | PUT /users/me | Updates the profile |
| `delete` | DELETE /users/me | Deletes the account |

**Key points:**
- All operations target `auth.getUserOrFail()`, never an external ID
- Deletion cascades to all related data (configured in migrations)

---

## user_vehicles_controller.ts

CRUD for vehicles belonging to the authenticated user.

| Method | Route | Description |
|---|---|---|
| `index` | GET /vehicles | Lists the user's vehicles |
| `show` | GET /vehicles/:id | Vehicle detail |
| `store` | POST /vehicles | Creates a vehicle |
| `update` | PUT /vehicles/:id | Updates a vehicle |
| `destroy` | DELETE /vehicles/:id | Deletes a vehicle |

**Key points:**
- Systematic ownership: `.where('user_id', user.id)` on all queries
- **Unique slug** generated at creation (with DB uniqueness check)
- Controlled types: `motorcycle | car | karting | other`

---

## track_days_controller.ts

CRUD for track days — the most complex controller in the project.

| Method | Route | Description |
|---|---|---|
| `index` | GET /trackdays | List with advanced filters |
| `show` | GET /trackdays/:id | Detail with preloads |
| `store` | POST /trackdays | Creates a track day |
| `update` | PUT /trackdays/:id | Updates a track day |
| `destroy` | DELETE /trackdays/:id | Deletes a track day |

**Key points:**
- **Filters on `index`**: by track (`track_id`), vehicle (`vehicle_id`), date range
- **`expand` parameter**: enables conditional relation preloading (track, vehicle, chronos)
- JSON columns for chronos (lap times)
- Weather and track condition data (enums)

---

## maintenances_controller.ts

CRUD for vehicle maintenances.

| Method | Route | Description |
|---|---|---|
| `index` | GET /maintenances | List, filterable by vehicle |
| `show` | GET /maintenances/:id | Detail |
| `store` | POST /maintenances | Creates a maintenance record |
| `update` | PUT /maintenances/:id | Updates |
| `destroy` | DELETE /maintenances/:id | Deletes |

**Key points:**
- Optional filter by `vehicle_id`
- Types: `maintenance | repair | modification | other`
- Tracks mileage and next scheduled maintenance

---

## tracks_controller.ts

Manages racing tracks (public read, admin/owner write).

| Method | Access | Route | Description |
|---|---|---|---|
| `index` | Public | GET /tracks | Lists all tracks |
| `show` | Public | GET /tracks/:id | Track detail |
| `store` | Admin+ | POST /tracks | Creates a track |
| `update` | Admin+ | PUT /tracks/:id | Updates a track |
| `destroy` | Admin+ | DELETE /tracks/:id | Deletes a track |

**Key points:**
- File uploads: logo (max 2 MB) and layout images (max 5 MB)
- Files named with `cuid()` for uniqueness
- Rich metadata: number of turns, length, width, max dB, best lap time

---

## countries_controller.ts

Manages countries (public read, admin/owner write).

| Method | Access | Route | Description |
|---|---|---|---|
| `index` | Public | GET /countries | List |
| `show` | Public | GET /countries/:id | Detail |
| `store` | Admin+ | POST /countries | Creates |
| `update` | Admin+ | PUT /countries/:id | Updates |
| `destroy` | Admin+ | DELETE /countries/:id | Deletes |

---

## admin_users_controller.ts

User administration — **owner only**.

| Method | Route | Description |
|---|---|---|
| `index` | GET /admin/users | Lists all users |
| `show` | GET /admin/users/:id | User detail |
| `update` | PUT /admin/users/:id | Updates (role, status…) |
| `destroy` | DELETE /admin/users/:id | Deletes a user |

---

## mailer_controller.ts

Transactional email sending — **owner only**.

| Method | Route | Description |
|---|---|---|
| `send` | POST /admin/mailer/send | Sends an email |
