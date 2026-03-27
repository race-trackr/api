import type { HttpContext } from '@adonisjs/core/http'
import hash from '@adonisjs/core/services/hash'
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
    const { currentPassword, newPassword, ...profileData } = await request.validateUsing(
      updateUserValidator,
      { meta: { userId: user.id } }
    )

    if (currentPassword || newPassword) {
      if (!currentPassword) {
        return response.unprocessableEntity({
          errors: [{ field: 'currentPassword', message: 'Current password is required to set a new password' }],
        })
      }
      if (!newPassword) {
        return response.unprocessableEntity({
          errors: [{ field: 'newPassword', message: 'New password is required' }],
        })
      }
      const isValid = await hash.verify(user.password, currentPassword)
      if (!isValid) {
        return response.unprocessableEntity({
          errors: [{ field: 'currentPassword', message: 'Current password is incorrect' }],
        })
      }
      user.password = await hash.make(newPassword)
    }

    user.merge(profileData)
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
