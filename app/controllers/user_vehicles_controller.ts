import type { HttpContext } from '@adonisjs/core/http'
import UserVehicle from '#models/user_vehicle'

export default class UserVehiclesController {
  async index({ auth, response }: HttpContext) {
    const user = auth.getUserOrFail()
    const vehicles = await UserVehicle.query()
      .where('user_id', user.id)
      .orderBy('created_at', 'desc')
    return response.ok(vehicles)
  }

  async store({ auth, request, response }: HttpContext) {
    const user = auth.getUserOrFail()
    const data = request.only([
      'name',
      'slug',
      'type',
      'brand',
      'model',
      'year',
      'licensePlate',
      'details',
      'photo',
    ])

    const vehicle = await UserVehicle.create({
      ...data,
      userId: user.id,
    })

    return response.created(vehicle)
  }

  async show({ auth, params, response }: HttpContext) {
    const user = auth.getUserOrFail()
    const vehicle = await UserVehicle.query()
      .where('id', params.id)
      .where('user_id', user.id)
      .preload('trackDays')
      .preload('maintenances')
      .firstOrFail()
    return response.ok(vehicle)
  }

  async update({ auth, params, request, response }: HttpContext) {
    const user = auth.getUserOrFail()
    const vehicle = await UserVehicle.query()
      .where('id', params.id)
      .where('user_id', user.id)
      .firstOrFail()

    const data = request.only([
      'name',
      'slug',
      'type',
      'brand',
      'model',
      'year',
      'licensePlate',
      'details',
      'photo',
    ])

    vehicle.merge(data)
    await vehicle.save()
    return response.ok(vehicle)
  }

  async destroy({ auth, params, response }: HttpContext) {
    const user = auth.getUserOrFail()
    const vehicle = await UserVehicle.query()
      .where('id', params.id)
      .where('user_id', user.id)
      .firstOrFail()
    await vehicle.delete()
    return response.noContent()
  }
}
