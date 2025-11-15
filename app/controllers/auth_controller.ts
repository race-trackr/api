import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import { loginValidator, registerValidator } from '#validators/auth_validator'

export default class AuthController {
  async register({ request, response }: HttpContext) {
    const payload = await request.validateUsing(registerValidator)

    const user = await User.create(payload)
    const token = await User.accessTokens.create(user)

    return response.created({
      user: {
        id: user.uuid,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
      },
      token: token.value!.release(),
    })
  }

  async login({ request, response }: HttpContext) {
    const payload = await request.validateUsing(loginValidator)
    const { email, password } = payload

    const user = await User.verifyCredentials(email, password)

    if (!user) {
      return response.unauthorized({ message: 'Invalid credentials' })
    }

    const token = await User.accessTokens.create(user)

    return response.ok({
      user: {
        id: user.uuid,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
      },
      token: token.value!.release(),
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
