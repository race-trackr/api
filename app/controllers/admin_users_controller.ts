import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import { updateUserValidator } from '#validators/user_validator'

export default class AdminUsersController {
  public async index({ request, response }: HttpContext) {
    const { emailsOnly, countOnly, page, limit } = request.qs()

    if (countOnly) {
      const result = await User.query().count('* as total')
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
    const user = await User.findOrFail(params.id)
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
    const payload = await request.validateUsing(updateUserValidator, {
      meta: { userId: Number(params.id) },
    })

    const user = await User.findOrFail(params.id)
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
    const user = await User.findOrFail(params.id)
    await user.delete()
    return response.noContent()
  }
}
