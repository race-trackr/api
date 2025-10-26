import type { HttpContext } from '@adonisjs/core/http'
import TrackDay from '#models/track_day'

export default class TrackDaysController {
  async index({ auth, request, response }: HttpContext) {
    const user = auth.getUserOrFail()
    const { trackId, vehicleId, limit, searchTerm, startDate, endDate } = request.qs()

    const query = TrackDay.query()
      .where('user_id', user.id)
      .preload('track', (sub_query) => sub_query.preload('country'))
      .preload('vehicle')
      .orderBy('date', 'desc')

    if (searchTerm) {
      query.whereHas('track', (sub_query) => {
        sub_query.whereILike('name', `%${searchTerm}%`)
      })
    }

    if (trackId) {
      query.where('track_id', trackId)
    }

    if (limit && limit > 0) {
      query.limit(limit)
    }

    if (vehicleId) {
      query.where('user_vehicle_id', vehicleId)
    }

    const trackDays = await query
    return response.ok(trackDays)
  }

  async store({ auth, request, response }: HttpContext) {
    const user = auth.getUserOrFail()
    const data = request.only([
      'trackId',
      'userVehicleId',
      'date',
      'weather',
      'airTemperature',
      'trackTemperature',
      'trackCondition',
      'note',
      'bestLapTime',
      'totalLaps',
      'totalDistance',
    ])

    const trackDay = await TrackDay.create({
      ...data,
      userId: user.id,
    })

    await trackDay.load('track', (query) => query.preload('country'))
    await trackDay.load('vehicle')
    return response.created(trackDay)
  }

  async show({ auth, params, response }: HttpContext) {
    const user = auth.getUserOrFail()
    const trackDay = await TrackDay.query()
      .where('id', params.id)
      .where('user_id', user.id)
      .preload('track', (query) => query.preload('country'))
      .preload('vehicle')
      .firstOrFail()
    return response.ok(trackDay)
  }

  async update({ auth, params, request, response }: HttpContext) {
    const user = auth.getUserOrFail()
    const trackDay = await TrackDay.query()
      .where('id', params.id)
      .where('user_id', user.id)
      .firstOrFail()

    const data = request.only([
      'trackId',
      'userVehicleId',
      'date',
      'weather',
      'airTemperature',
      'trackTemperature',
      'trackCondition',
      'note',
      'chronos',
      'bestLapTime',
      'totalLaps',
      'totalDistance',
    ])

    // convert chronos to JSON string if present
    if (data.chronos) {
      data.chronos = JSON.stringify(data.chronos)
    }

    // if bestLapTime exists and not present in chronos, add to chronos
    if (data.bestLapTime) {
      const chronos = data.chronos ? JSON.parse(data.chronos) : []
      if (!chronos.find((c: { lapTime: string }) => c.lapTime === data.bestLapTime)) {
        chronos.push({ lapTime: data.bestLapTime, isBest: true })
        data.chronos = JSON.stringify(chronos)
      }
    }

    trackDay.merge(data)
    await trackDay.save()

    await trackDay.load('track', (query) => query.preload('country'))
    await trackDay.load('vehicle')

    return response.ok(trackDay)
  }

  async destroy({ auth, params, response }: HttpContext) {
    const user = auth.getUserOrFail()
    const trackDay = await TrackDay.query()
      .where('id', params.id)
      .where('user_id', user.id)
      .firstOrFail()
    await trackDay.delete()
    return response.noContent()
  }
}
