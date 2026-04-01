import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import { loginValidator, registerValidator } from '#validators/auth_validator'
import limiter from '@adonisjs/limiter/services/main'

export default class AuthController {
  async register({ request, response }: HttpContext) {
    const payload = await request.validateUsing(registerValidator)

    // initialize preferences as empty object if not provided
    const data = { ...payload, preferences: payload.preferences || {} }
    const user = await User.create(data)
    const token = await User.accessTokens.create(user)

    if (!token.value) {
      return response.internalServerError({ message: 'Failed to generate access token' })
    }

    return response.created({
      user: {
        id: user.uuid,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
      },
      token: token.value.release(),
    })
  }

  async login({ request, response }: HttpContext) {
    const payload = await request.validateUsing(loginValidator)
    const { email, password } = payload

    /**
    * Create a limiter that allows 5 failed attempts per minute,
    * then blocks for 20 minutes.
    */
    const loginLimiter = limiter.use({
      requests: 5,
      duration: '1 min',
      blockDuration: '20 mins'
    })

    /**
     * Use IP + email combination as the key. This ensures that if
     * an attacker is trying multiple emails, we block the attacker's
     * IP without affecting legitimate users trying to log in with
     * their own email from different IPs.
     */
    const key = `login_${request.ip()}_${email}`

    /**
     * The penalize method consumes one request only if
     * the callback throws an error.
     */
    const [error, user] = await loginLimiter.penalize(key, () => {
      return User.verifyCredentials(email, password)
    })

    if (error) {
      return response.tooManyRequests({ message: `Too many login attempts. Try again after ${error.response.availableIn} seconds` })
    }

    if (!user) {
      return response.unauthorized({ message: 'Invalid credentials' })
    }

    const token = await User.accessTokens.create(user)

    if (!token.value) {
      return response.internalServerError({ message: 'Failed to generate access token' })
    }

    return response.ok({
      user: {
        id: user.uuid,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
      },
      token: token.value.release(),
    })
  }

  async logout({ auth, response }: HttpContext) {
    const user = auth.getUserOrFail()
    await User.accessTokens.delete(user, user.currentAccessToken.identifier)
    return response.ok({ message: 'Logged out successfully' })
  }

  async me({ auth, response }: HttpContext) {
    const user = auth.getUserOrFail()
    return response.ok({
      user: {
        id: user.uuid,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
      },
    })
  }
}
