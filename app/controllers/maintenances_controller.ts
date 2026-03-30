import type { HttpContext } from '@adonisjs/core/http'
import { DateTime } from 'luxon'
import Maintenance from '#models/maintenance'
import UserVehicle from '#models/user_vehicle'
import {
  createMaintenanceValidator,
  updateMaintenanceValidator,
} from '#validators/maintenance_validator'

export default class MaintenancesController {
  async index({ auth, request, response }: HttpContext) {
    const user = auth.getUserOrFail()
    const { vehicle_uuid: vehicleUuid, type, search, page, limit } = request.qs()

    const query = Maintenance.query()
      .where('user_id', user.id)
      .preload('vehicle')
      .orderBy('date', 'desc')

    if (vehicleUuid) query.whereHas('vehicle', (sub) => sub.where('uuid', vehicleUuid))
    if (type) query.where('type', type)
    if (search) query.whereILike('name', `%${search}%`)

    const limitNumber = Number(limit)
    if (!limitNumber || limitNumber <= 0) {
      const all = await query.exec()
      return response.ok({
        data: all.map((r) => r.serialize()),
        meta: { total: all.length, currentPage: 1, lastPage: 1, perPage: all.length, firstPage: 1 },
      })
    }

    const pageNumber = Math.max(1, Number(page) || 1)
    const safeLimit = Math.min(100, limitNumber)
    const maintenances = await query.paginate(pageNumber, safeLimit)
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

    const maintenance = await Maintenance.create({
      ...data,
      userId: user.id,
      date: DateTime.fromISO(data.date),
      nextMaintenanceDate: data.nextMaintenanceDate
        ? DateTime.fromISO(data.nextMaintenanceDate)
        : null,
    })

    const freshMaintenance = await Maintenance.query()
      .where('id', maintenance.id)
      .preload('vehicle')
      .firstOrFail()

    return response.created(freshMaintenance)
  }

  async show({ auth, params, response }: HttpContext) {
    const user = auth.getUserOrFail()
    const maintenance = await Maintenance.query()
      .where('uuid', params.uuid)
      .where('user_id', user.id)
      .preload('vehicle')
      .firstOrFail()
    return response.ok(maintenance)
  }

  async update({ auth, params, request, response }: HttpContext) {
    const user = auth.getUserOrFail()
    const maintenance = await Maintenance.query()
      .where('uuid', params.uuid)
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

    const { date, nextMaintenanceDate, ...rest } = data
    maintenance.merge({
      ...rest,
      ...(date && { date: DateTime.fromISO(date) }),
      ...(nextMaintenanceDate !== undefined && {
        nextMaintenanceDate: nextMaintenanceDate
          ? DateTime.fromISO(nextMaintenanceDate)
          : null,
      }),
    })
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
      .where('uuid', params.uuid)
      .where('user_id', user.id)
      .firstOrFail()
    await maintenance.delete()
    return response.noContent()
  }
}
