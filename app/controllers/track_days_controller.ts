import type { HttpContext } from '@adonisjs/core/http'
import TrackDay from '#models/track_day'
import UserVehicle from '#models/user_vehicle'
import { createTrackdayValidator, updateTrackdayValidator } from '#validators/trackday_validator'
import { DateTime } from 'luxon'

export default class TrackDaysController {
  private getFilterError(
    expand: string | undefined,
    filters: { searchTerm?: string; trackId?: string; vehicleId?: string }
  ): string | null {
    if (expand !== 'false') return null
    const active = Object.entries(filters)
      .filter(([, v]) => v !== undefined)
      .map(([k]) => k)
    if (active.length > 0) {
      return `Cannot filter by [${active.join(', ')}] when expand is false`
    }
    return null
  }

  private applyFilters(
    query: any,
    { searchTerm, trackId, vehicleId }: { searchTerm?: string; trackId?: string; vehicleId?: string }
  ) {
    if (searchTerm) {
      const sanitized = String(searchTerm).slice(0, 100)
      query.whereHas('track', (sub: any) => sub.whereILike('name', `%${sanitized}%`))
    }
    if (trackId) query.where('track_id', trackId)
    if (vehicleId) query.where('user_vehicle_id', vehicleId)
  }

  async index({ auth, request, response }: HttpContext) {
    const user = auth.getUserOrFail()
    const { trackId, vehicleId, limit, searchTerm, page, expand, dateFilter } = request.qs()

    const filterError = this.getFilterError(expand, { searchTerm, trackId, vehicleId })
    if (filterError) return response.badRequest({ error: 'INVALID_REQUEST', message: filterError })

    const query =
      expand === 'false'
        ? TrackDay.query().where('user_id', user.id).orderBy('date', 'desc')
        : TrackDay.query()
            .where('user_id', user.id)
            .preload('track', (q) => q.preload('country'))
            .preload('vehicle')
            .orderBy('date', 'desc')

    this.applyFilters(query, { searchTerm, trackId, vehicleId })

    if (dateFilter === 'past' || dateFilter === 'upcoming') {
      const today = DateTime.local().toISODate()
      if (today) query.where('date', dateFilter === 'past' ? '<' : '>=', today)
    }

    const pageNumber = Math.max(1, Number(page) || 1)
    const limitNumber = Math.min(100, Math.max(1, Number(limit) || 20))
    const trackDays = await query.paginate(pageNumber, limitNumber)
    return response.ok(trackDays.toJSON())
  }

  async store({ auth, request, response }: HttpContext) {
    const user = auth.getUserOrFail()
    const data = await request.validateUsing(createTrackdayValidator)

    if (data.userVehicleId) {
      const vehicle = await UserVehicle.query()
        .where('id', data.userVehicleId)
        .where('user_id', user.id)
        .first()
      if (!vehicle) {
        return response.badRequest({ message: 'Vehicle not found or does not belong to you' })
      }
    }

    const trackDay = await TrackDay.create({ ...data, userId: user.id })

    const freshTrackDay = await TrackDay.query()
      .where('id', trackDay.id)
      .preload('track', (q) => q.preload('country'))
      .preload('vehicle')
      .firstOrFail()

    return response.created(freshTrackDay)
  }

  async show({ auth, params, response, request }: HttpContext) {
    const user = auth.getUserOrFail()
    const { trackId, vehicleId, searchTerm, expand } = request.qs()

    const filterError = this.getFilterError(expand, { searchTerm, trackId, vehicleId })
    if (filterError) return response.badRequest({ error: 'INVALID_REQUEST', message: filterError })

    const query =
      expand === 'false'
        ? TrackDay.query().where('id', params.id).where('user_id', user.id)
        : TrackDay.query()
            .where('id', params.id)
            .where('user_id', user.id)
            .preload('track', (q) => q.preload('country'))
            .preload('vehicle')

    this.applyFilters(query, { searchTerm, trackId, vehicleId })
    const trackDay = await query.firstOrFail()
    return response.ok(trackDay)
  }

  async update({ auth, params, request, response }: HttpContext) {
    const user = auth.getUserOrFail()
    const trackDay = await TrackDay.query()
      .where('id', params.id)
      .where('user_id', user.id)
      .firstOrFail()

    const data = await request.validateUsing(updateTrackdayValidator)

    if (data.userVehicleId) {
      const vehicle = await UserVehicle.query()
        .where('id', data.userVehicleId)
        .where('user_id', user.id)
        .first()
      if (!vehicle) {
        return response.badRequest({ message: 'Vehicle not found or does not belong to you' })
      }
    }

    const payload: Record<string, unknown> = { ...data }

    if (payload.chronos) {
      payload.chronos = JSON.stringify(payload.chronos)
    }

    if (data.bestLapTime) {
      const chronosArray = payload.chronos ? JSON.parse(payload.chronos as string) : []
      if (!chronosArray.find((c: { lapTime: string }) => c.lapTime === data.bestLapTime)) {
        chronosArray.push({ lapTime: data.bestLapTime, isBest: true })
        payload.chronos = JSON.stringify(chronosArray)
      }
    }

    trackDay.merge(payload)
    await trackDay.save()

    const freshTrackDay = await TrackDay.query()
      .where('id', trackDay.id)
      .preload('track', (q) => q.preload('country'))
      .preload('vehicle')
      .firstOrFail()

    return response.ok(freshTrackDay)
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
