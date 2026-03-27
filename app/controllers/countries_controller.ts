import type { HttpContext } from '@adonisjs/core/http'
import Country from '#models/country'
import { createCountryValidator, updateCountryValidator } from '#validators/country_validator'

export default class CountriesController {
  async index({ request, response }: HttpContext) {
    const { countOnly } = request.qs()

    if (countOnly) {
      const result = await Country.query().count('* as total')
      return response.ok({ total: Number(result[0].$extras.total) })
    }

    const countries = await Country.query().orderBy('name', 'asc')
    return response.ok(countries)
  }

  async show({ params, response }: HttpContext) {
    const country = await Country.query().where('uuid', params.uuid).firstOrFail()
    return response.ok(country)
  }

  async store({ request, response }: HttpContext) {
    const data = await request.validateUsing(createCountryValidator)
    const country = await Country.create(data)
    return response.created(country)
  }

  async update({ params, request, response }: HttpContext) {
    const country = await Country.query().where('uuid', params.uuid).firstOrFail()
    const data = await request.validateUsing(updateCountryValidator)
    country.merge(data)
    await country.save()
    return response.ok(country)
  }

  async destroy({ params, response }: HttpContext) {
    const country = await Country.query().where('uuid', params.uuid).firstOrFail()
    await country.delete()
    return response.noContent()
  }
}
