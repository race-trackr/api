import { defineConfig } from '@adonisjs/cors'

export default defineConfig({
  enabled: true,
  origin: (origin, _ctx) => {
    // Autoriser localhost ou 127.0.0.1, peu importe le port
    if (!origin) return false
    return /^https?:\/\/(localhost|127\.0\.0\.1):\d+$/.test(origin)
  },
  methods: ['GET', 'HEAD', 'POST', 'PUT', 'DELETE', 'PATCH'],
  headers: true,
  exposeHeaders: [],
  credentials: true,
  maxAge: 90,
})
