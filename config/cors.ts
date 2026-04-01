import { defineConfig } from '@adonisjs/cors'

export default defineConfig({
  enabled: process.env.NODE_ENV !== 'test',
  origin: ['http://localhost:3000', 'https://race-trackr.vercel.app', 'https://www.race-trackr.com'],
  methods: ['GET', 'HEAD', 'POST', 'PUT', 'DELETE', 'PATCH'],
  headers: true,
  exposeHeaders: [],
  credentials: true,
  maxAge: 90,
})
