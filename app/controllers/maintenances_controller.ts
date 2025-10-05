import type { HttpContext } from '@adonisjs/core/http'
import Maintenance from '#models/maintenance'

export default class MaintenancesController {
  async index({ auth, request, response }: HttpContext) {
    const user = auth.getUserOrFail()
    const { vehicle_id: vehicleId } = request.qs()

    const query = Maintenance.query()
      .where('user_id', user.id)
      .preload('vehicle')
      .orderBy('date', 'desc')

    if (vehicleId) {
      query.where('user_vehicle_id', vehicleId)
    }

    const maintenances = await query
    return response.ok(maintenances)
  }

  async store({ auth, request, response }: HttpContext) {
    const user = auth.getUserOrFail()
    const data = request.only([
      'userVehicleId',
      'name',
      'date',
      'type',
      'details',
      'cost',
      'mileage',
      'workshop',
      'nextMaintenanceDate',
      'nextMaintenanceMileage',
    ])

    const maintenance = await Maintenance.create({
      ...data,
      userId: user.id,
    })

    await maintenance.load('vehicle')
    return response.created(maintenance)
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

    const data = request.only([
      'userVehicleId',
      'name',
      'date',
      'type',
      'details',
      'cost',
      'mileage',
      'workshop',
      'nextMaintenanceDate',
      'nextMaintenanceMileage',
    ])

    maintenance.merge(data)
    await maintenance.save()
    await maintenance.load('vehicle')
    return response.ok(maintenance)
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
