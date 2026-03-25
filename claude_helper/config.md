# Configuration

Located in [config/](../config/). AdonisJS loads these files automatically at startup.

---

## config/auth.ts

Authentication system configuration.

```typescript
{
  default: 'api',
  guards: {
    api: {
      driver: 'access_token',
      provider: {
        driver: 'db',         // Tokens stored in PostgreSQL
        model: () => User,    // Model used for authentication
      }
    }
  }
}
```

**Key points:**
- Tokens **stored in the database** (not JWT, not Redis) — revocable at any time
- The `User` model must implement `DbAccessTokensProvider`
- `access_tokens` table created by migration #3

---

## config/database.ts

```typescript
{
  connection: 'pg',  // PostgreSQL
  connections: {
    pg: {
      client: 'pg',
      connection: {
        host:     env.get('DB_HOST'),
        port:     env.get('DB_PORT'),
        user:     env.get('DB_USER'),
        password: env.get('DB_PASSWORD'),
        database: env.get('DB_DATABASE'),
      },
      migrations: {
        naturalSort: true,
        paths: ['database/migrations'],
      }
    }
  }
}
```

---

## config/cors.ts

```typescript
{
  enabled: true,
  origin: /localhost|127\.0\.0\.1/,  // Dev only
  methods: ['GET', 'HEAD', 'POST', 'PUT', 'DELETE'],
  headers: true,
  exposeHeaders: [],
  credentials: true,
  maxAge: 90,
}
```

**Important**: In production, the `origin` regex must be updated with the frontend domain.

---

## config/app.ts

```typescript
{
  appKey: env.get('APP_KEY'),   // Encryption key (secrets, cookies)
  http: {
    generateRequestId: true,    // Automatic X-Request-Id on every request
    cookie: {
      maxAge: '2h',
      httpOnly: true,
      sameSite: 'lax',
      secure: app.inProduction,  // Secure cookies in production only
    }
  }
}
```

---

## config/logger.ts

```typescript
{
  default: 'app',
  loggers: {
    app: {
      enabled: true,
      name: 'race-trackr-api',
      level: env.get('LOG_LEVEL', 'info'),
      transport: {
        targets: [
          {
            target: 'pino-pretty',  // Human-readable logs in development
            level: 'info',
            options: { colorize: true }
          }
        ]
      }
    }
  }
}
```

---

## config/hash.ts

```typescript
{
  default: 'scrypt',
  list: {
    scrypt: {
      driver: 'scrypt',
      // Default AdonisJS hardening parameters
    }
  }
}
```

Used to hash user passwords.

---

## config/bodyparser.ts

Standard AdonisJS configuration for request body parsing:
- `json`: JSON parsing (`Content-Type: application/json`)
- `form`: form URL-encoded
- `multipart`: file uploads (used for track logos/layout images)

---

## Environment Variables

Defined and validated in [start/env.ts](../start/env.ts). See [.env.example](../.env.example) for reference values.

| Variable | Description | Default |
|---|---|---|
| `APP_KEY` | Encryption key (required) | — |
| `PORT` | HTTP server port | `3333` |
| `HOST` | Listen address | `0.0.0.0` |
| `NODE_ENV` | Environment (`development`/`production`/`test`) | — |
| `DB_HOST` | PostgreSQL host | `localhost` |
| `DB_PORT` | PostgreSQL port | `5432` |
| `DB_USER` | DB user | — |
| `DB_PASSWORD` | DB password | — |
| `DB_DATABASE` | Database name | — |
| `LOG_LEVEL` | Log level (pino) | `info` |
| `TZ` | Timezone | `UTC` |

---

## adonisrc.ts

Main AdonisJS configuration file.

```typescript
{
  providers: [
    '@adonisjs/core/providers/app_provider',
    '@adonisjs/core/providers/hash_provider',
    '@adonisjs/cors/cors_provider',
    '@adonisjs/lucid/database_provider',
    '@adonisjs/auth/auth_provider',
  ],
  assetsBundler: false,   // API only, no frontend assets
  tests: {
    suites: [{
      name: 'functional',
      files: ['tests/**/*.spec.ts'],
      configure: configureSuite,
    }]
  }
}
```
