import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

export default class AdminMiddleware {
  async handle({ auth, response }: HttpContext, next: NextFn) {
    const user = auth.getUserOrFail()

    if (!user.role || user.role !== 'admin') {
      return response.forbidden({ message: 'Access denied. Admin only.' })
    }

    await next()
  }
}
