import type { HttpContext } from '@adonisjs/core/http'
import TrackDay from '#models/track_day'

export default class TrackDaysController {
  async index({ auth, request, response }: HttpContext) {
    const user = auth.getUserOrFail()
    console.log(user)
    const { track_id: trackId, vehicle_id: vehicleId, limit } = request.qs()

    const query = TrackDay.query()
      .where('user_id', user.id)
      .preload('track', (sub_query) => sub_query.preload('country'))
      .preload('vehicle')
      .orderBy('date', 'desc')

    if (trackId) {
      query.where('track_id', trackId)
    }

    if (limit) {
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
      'bestLapTime',
      'totalLaps',
      'totalDistance',
    ])

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
