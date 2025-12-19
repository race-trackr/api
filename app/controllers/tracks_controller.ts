import type { HttpContext } from '@adonisjs/core/http'
import Track from '#models/track'
import app from '@adonisjs/core/services/app'
import { cuid } from '@adonisjs/core/helpers'

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

    // save logo and track image if exist
    const logo = request.file('logo', {
      size: '2mb',
      extnames: ['jpg', 'png', 'jpeg', 'webp', 'svg'],
    })
    if (logo) {
      if (logo.isValid) {
        const filename = `${cuid()}.${logo.extname}`
        const filepath = `uploads/tracks/logos`
        await logo.move(app.makePath(filepath), {
          name: filename,
          overwrite: true,
        })
        track.logoUrl = logo.fileName!
        await track.save()
      } else {
        return response.badRequest({
          errors: logo.errors,
        })
      }
    }

    const trackImage = request.file('trackImage', {
      size: '5mb',
      extnames: ['jpg', 'png', 'jpeg', 'webp', 'svg', 'pdf'],
    })
    if (trackImage) {
      if (trackImage.isValid) {
        const filename = `${cuid()}.${trackImage.extname}`
        const filepath = `uploads/tracks/layouts`
        await trackImage.move(app.makePath(filepath), {
          name: filename,
          overwrite: true,
        })
        track.trackLayoutUrl = trackImage.fileName!
        await track.save()
      } else {
        return response.badRequest({
          errors: trackImage.errors,
        })
      }
    }

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

    // save logo and track image if exist
    const logo = request.file('logo', {
      size: '2mb',
      extnames: ['jpg', 'png', 'jpeg', 'webp', 'svg'],
    })
    if (logo) {
      if (logo.isValid) {
        const filename = `${cuid()}.${logo.extname}`
        const filepath = `uploads/tracks/logos`
        await logo.move(app.makePath(filepath), {
          name: filename,
          overwrite: true,
        })
        track.logoUrl = logo.fileName!
      } else {
        return response.badRequest({
          errors: logo.errors,
        })
      }
    }

    const trackLayout = request.file('trackLayout', {
      size: '5mb',
      extnames: ['jpg', 'png', 'jpeg', 'webp', 'svg', 'pdf'],
    })

    if (trackLayout) {
      if (trackLayout.isValid) {
        const filename = `${cuid()}.${trackLayout.extname}`
        const filepath = `uploads/tracks/layouts`
        await trackLayout.move(app.makePath(filepath), {
          name: filename,
          overwrite: true,
        })
        track.trackLayoutUrl = trackLayout.fileName!
      } else {
        return response.badRequest({
          errors: trackLayout.errors,
        })
      }
    }

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
