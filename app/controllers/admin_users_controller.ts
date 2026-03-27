import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import { updateUserValidator } from '#validators/user_validator'

export default class AdminUsersController {
  public async index({ request, response }: HttpContext) {
    const { emailsOnly, countOnly, role, page, limit } = request.qs()

    if (countOnly) {
      const query = User.query().count('* as total')
      if (role) query.where('role', role)
      const result = await query
      return response.ok({ total: Number(result[0].$extras.total) })
    }

    if (emailsOnly) {
      const users = await User.query().select('email').orderBy('email', 'asc')
      return response.ok({ users })
    }

    const pageNumber = Math.max(1, Number(page) || 1)
    const limitNumber = Math.min(100, Math.max(1, Number(limit) || 50))
    const users = await User.query()
      .select('id', 'uuid', 'email', 'firstName', 'lastName', 'countryId', 'role')
      .orderBy('id', 'asc')
      .paginate(pageNumber, limitNumber)

    return response.ok(users.toJSON())
  }

  public async show({ params, response }: HttpContext) {
    const user = await User.query().where('uuid', params.id).firstOrFail()
    return response.ok({
      user: {
        id: user.id,
        uuid: user.uuid,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        countryId: user.countryId,
        role: user.role,
      },
    })
  }

  public async update({ params, request, response }: HttpContext) {
    const user = await User.query().where('uuid', params.id).firstOrFail()

    const payload = await request.validateUsing(updateUserValidator, {
      meta: { userId: user.id },
    })

    if (payload.role && payload.role !== 'owner' && user.role === 'owner') {
      const result = await User.query().where('role', 'owner').count('* as total')
      if (Number(result[0].$extras.total) <= 1) {
        return response.forbidden({ message: 'Cannot remove the last owner' })
      }
    }

    user.merge(payload)
    await user.save()

    return response.ok({
      user: {
        id: user.id,
        uuid: user.uuid,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        countryId: user.countryId,
        role: user.role,
      },
    })
  }

  public async destroy({ params, response }: HttpContext) {
    const user = await User.query().where('uuid', params.id).firstOrFail()

    if (user.role === 'owner') {
      const result = await User.query().where('role', 'owner').count('* as total')
      if (Number(result[0].$extras.total) <= 1) {
        return response.forbidden({ message: 'Cannot delete the last owner' })
      }
    }

    await user.delete()
    return response.noContent()
  }
}
