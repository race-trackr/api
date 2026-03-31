import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

const store = new Map<string, { count: number; resetAt: number }>()

export default class RateLimitMiddleware {
  async handle(
    { request, response }: HttpContext,
    next: NextFn,
    options: { max: number; windowMs: number }
  ) {
    const ip = request.ip()
    // Separate bucket per (ip, window) so different rate profiles don't interfere
    const key = `${ip}:${options.windowMs}`
    const now = Date.now()
    const entry = store.get(key)

    if (!entry || now > entry.resetAt) {
      store.set(key, { count: 1, resetAt: now + options.windowMs })
    } else if (entry.count >= options.max) {
      return response.tooManyRequests({ message: 'Too many requests, please try again later' })
    } else {
      entry.count++
    }

    return next()
  }
}
