import type { HttpContext } from '@adonisjs/core/http'
import TrackDay from '#models/track_day'
import { DateTime } from 'luxon'

export default class TrackDaysController {
  async index({ auth, request, response }: HttpContext) {
    const user = auth.getUserOrFail()
    const { trackId, vehicleId, limit, searchTerm, page, expand, dateFilter } = request.qs()

    let query
    if (expand === 'false') {
      query = TrackDay.query().where('user_id', user.id).orderBy('date', 'desc')
    } else {
      query = TrackDay.query()
        .where('user_id', user.id)
        .preload('track', (sub_query) => sub_query.preload('country'))
        .preload('vehicle')
        .orderBy('date', 'desc')
    }

    if (searchTerm) {
      if (expand === 'false') {
        // show error if expand is false and trackId is provided, cannot filter without loading relation
        return response.json({
          error: 'INVALID_REQUEST',
          message: 'Cannot filter by searchTerm when expand is false',
        })
      }
      query.whereHas('track', (sub_query) => {
        sub_query.whereILike('name', `%${searchTerm}%`)
      })
    }

    if (trackId) {
      if (expand === 'false') {
        // show error if expand is false and trackId is provided, cannot filter without loading relation
        return response.json({
          error: 'INVALID_REQUEST',
          message: 'Cannot filter by trackId when expand is false',
        })
      }
      query.where('track_id', trackId)
    }

    if (vehicleId) {
      if (expand === 'false') {
        // show error if expand is false and trackId is provided, cannot filter without loading relation
        return response.json({
          error: 'INVALID_REQUEST',
          message: 'Cannot filter by vehicleId when expand is false',
        })
      }
      query.where('user_vehicle_id', vehicleId)
    }

    if (dateFilter === 'past' || dateFilter === 'upcoming') {
      const today = DateTime.local().toISODate()
      if (today) {
        if (dateFilter === 'past') {
          query.where('date', '<', today)
        } else {
          query.where('date', '>=', today)
        }
      }
    }

    if (limit && limit > 0) {
      const trackDays = await query.paginate(page || 1, limit)
      return trackDays.toJSON()
    }

    const trackDays = await query
    return response.ok({ data: trackDays })
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

  async show({ auth, params, response, request }: HttpContext) {
    const { id } = params
    const { trackId, vehicleId, searchTerm, expand } = request.qs()

    const user = auth.getUserOrFail()
    let query

    if (expand === 'false') {
      query = TrackDay.query().where('id', id).where('user_id', user.id)
    } else {
      query = TrackDay.query()
        .where('id', id)
        .where('user_id', user.id)
        .preload('track', (sub_query) => sub_query.preload('country'))
        .preload('vehicle')
    }

    if (searchTerm) {
      if (expand === 'false') {
        // show error if expand is false and trackId is provided, cannot filter without loading relation
        return response.json({
          error: 'INVALID_REQUEST',
          message: 'Cannot filter by searchTerm when expand is false',
        })
      }
      query.whereHas('track', (sub_query) => {
        sub_query.whereILike('name', `%${searchTerm}%`)
      })
    }

    if (trackId) {
      if (expand === 'false') {
        // show error if expand is false and trackId is provided, cannot filter without loading relation
        return response.json({
          error: 'INVALID_REQUEST',
          message: 'Cannot filter by trackId when expand is false',
        })
      }
      query.where('track_id', trackId)
    }

    if (vehicleId) {
      if (expand === 'false') {
        // show error if expand is false and trackId is provided, cannot filter without loading relation
        return response.json({
          error: 'INVALID_REQUEST',
          message: 'Cannot filter by vehicleId when expand is false',
        })
      }
      query.where('user_vehicle_id', vehicleId)
    }
    const trackDay = await query.firstOrFail()

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
