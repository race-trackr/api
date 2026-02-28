import type { HttpContext } from '@adonisjs/core/http'
import { updateUserValidator } from '#validators/user_validator'

export default class UserController {
  async me({ auth, response }: HttpContext) {
    const user = auth.getUserOrFail()
    return response.ok({
      user: {
        id: user.uuid,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        countryId: user.countryId,
        role: user.role,
      },
    })
  }

  async update({ auth, request, response }: HttpContext) {
    const user = auth.getUserOrFail()
    const payload = await request.validateUsing(updateUserValidator, {
      meta: { userId: user.id },
    })

    user.merge(payload)
    await user.save()

    return response.ok({
      user: {
        id: user.uuid,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        countryId: user.countryId,
        role: user.role,
      },
    })
  }

  async delete({ auth, response }: HttpContext) {
    const user = auth.getUserOrFail()
    await user.delete()

    return response.ok({ message: 'User deleted successfully' })
  }
}
