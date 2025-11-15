import type { HttpContext } from '@adonisjs/core/http'
import Track from '#models/track'

export default class TracksController {
  async index({ request, response }: HttpContext) {
    const { expand } = request.qs()

    if (expand === 'country') {
      const tracks = await Track.query().preload('country').orderBy('name', 'asc')
      return response.ok(tracks)
    }

    const tracks = await Track.query().orderBy('name', 'asc')
    return response.ok(tracks)
  }

  async store({ request, response }: HttpContext) {
    const data = request.only([
      'name',
      'slug',
      'city',
      'countryId',
      'address',
      'turns',
      'length',
      'width',
      'maxDb',
      'bestLapTime',
      'bestLapTimePilot',
      'description',
    ])
    const track = await Track.create(data)
    await track.load('country')
    return response.created(track)
  }

  async show({ request, params, response }: HttpContext) {
    const { id } = params
    // check if expand with country param in query string
    const { expand } = request.qs()
    if (expand === 'country') {
      const track = await Track.query().where('id', id).preload('country').firstOrFail()
      return response.ok(track)
    }
    const track = await Track.query().where('id', params.id).firstOrFail()
    return response.ok(track)
  }

  async update({ params, request, response }: HttpContext) {
    // check if admin in middleware
    const track = await Track.findOrFail(params.id)
    const data = request.only([
      'name',
      'slug',
      'city',
      'countryId',
      'address',
      'turns',
      'length',
      'width',
      'maxDb',
      'bestLapTime',
      'bestLapTimePilot',
      'description',
    ])
    track.merge(data)
    await track.save()
    await track.load('country')
    return response.ok(track)
  }

  async destroy({ params, response }: HttpContext) {
    const track = await Track.findOrFail(params.id)
    await track.delete()
    return response.noContent()
  }
}
