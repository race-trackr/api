import type { HttpContext } from '@adonisjs/core/http'
import Maintenance from '#models/maintenance'
import UserVehicle from '#models/user_vehicle'
import {
  createMaintenanceValidator,
  updateMaintenanceValidator,
} from '#validators/maintenance_validator'

export default class MaintenancesController {
  async index({ auth, request, response }: HttpContext) {
    const user = auth.getUserOrFail()
    const { vehicle_id: vehicleId, page, limit } = request.qs()

    const query = Maintenance.query()
      .where('user_id', user.id)
      .preload('vehicle')
      .orderBy('date', 'desc')

    if (vehicleId) query.where('user_vehicle_id', vehicleId)

    const pageNumber = Math.max(1, Number(page) || 1)
    const limitNumber = Math.min(100, Math.max(1, Number(limit) || 20))
    const maintenances = await query.paginate(pageNumber, limitNumber)
    return response.ok(maintenances.toJSON())
  }

  async store({ auth, request, response }: HttpContext) {
    const user = auth.getUserOrFail()
    const data = await request.validateUsing(createMaintenanceValidator)

    const vehicle = await UserVehicle.query()
      .where('id', data.userVehicleId)
      .where('user_id', user.id)
      .first()
    if (!vehicle) {
      return response.badRequest({ message: 'Vehicle not found or does not belong to you' })
    }

    const maintenance = await Maintenance.create({ ...data, userId: user.id })

    const freshMaintenance = await Maintenance.query()
      .where('id', maintenance.id)
      .preload('vehicle')
      .firstOrFail()

    return response.created(freshMaintenance)
  }

  async show({ auth, params, response }: HttpContext) {
    const user = auth.getUserOrFail()
    const maintenance = await Maintenance.query()
      .where('id', params.id)
      .where('user_id', user.id)
      .preload('vehicle')
      .firstOrFail()
    return response.ok(maintenance)
  }

  async update({ auth, params, request, response }: HttpContext) {
    const user = auth.getUserOrFail()
    const maintenance = await Maintenance.query()
      .where('id', params.id)
      .where('user_id', user.id)
      .firstOrFail()

    const data = await request.validateUsing(updateMaintenanceValidator)

    if (data.userVehicleId) {
      const vehicle = await UserVehicle.query()
        .where('id', data.userVehicleId)
        .where('user_id', user.id)
        .first()
      if (!vehicle) {
        return response.badRequest({ message: 'Vehicle not found or does not belong to you' })
      }
    }

    maintenance.merge(data)
    await maintenance.save()

    const freshMaintenance = await Maintenance.query()
      .where('id', maintenance.id)
      .preload('vehicle')
      .firstOrFail()

    return response.ok(freshMaintenance)
  }

  async destroy({ auth, params, response }: HttpContext) {
    const user = auth.getUserOrFail()
    const maintenance = await Maintenance.query()
      .where('id', params.id)
      .where('user_id', user.id)
      .firstOrFail()
    await maintenance.delete()
    return response.noContent()
  }
}
