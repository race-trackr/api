import type { HttpContext } from '@adonisjs/core/http'
import Country from '#models/country'

export default class CountriesController {
  async index({ response }: HttpContext) {
    const countries = await Country.query().orderBy('name', 'asc')
    return response.ok(countries)
  }

  async store({ request, response }: HttpContext) {
    const data = request.only(['name', 'slug', 'iso', 'timezone', 'capital'])
    const country = await Country.create(data)
    return response.created(country)
  }

  async show({ params, response }: HttpContext) {
    const country = await Country.query().where('id', params.id).preload('tracks').firstOrFail()
    return response.ok(country)
  }

  async update({ params, request, response }: HttpContext) {
    const country = await Country.findOrFail(params.id)
    const data = request.only(['name', 'slug', 'iso', 'timezone', 'capital'])
    country.merge(data)
    await country.save()
    return response.ok(country)
  }

  async destroy({ params, response }: HttpContext) {
    const country = await Country.findOrFail(params.id)
    await country.delete()
    return response.noContent()
  }
}
