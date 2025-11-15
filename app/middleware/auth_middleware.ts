import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'
import type { Authenticators } from '@adonisjs/auth/types'
import { errors } from '@adonisjs/auth'

/**
 * Auth middleware is used authenticate HTTP requests and deny
 * access to unauthenticated users.
 */
export default class AuthMiddleware {
  redirectTo = '/login'

  async handle(
    ctx: HttpContext,
    next: NextFn,
    options: { guards?: (keyof Authenticators)[] } = {}
  ) {
    try {
      await ctx.auth.authenticateUsing(options.guards, {
        loginRoute: this.redirectTo,
      })
    } catch (error: any) {
      // Cas typique : mauvais token / pas de token
      if (error instanceof errors.E_UNAUTHORIZED_ACCESS) {
        return ctx.response.unauthorized({
          error: error.message,
          message: 'Auth failed: invalid or missing token',
          status: 401,
        })
      }

      // Autres erreurs inattendues
      return ctx.response.internalServerError({
        error: 'Unexpected authentication error',
        details: error.message,
      })
    }

    return next()
  }
}
