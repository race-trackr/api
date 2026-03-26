import type { HttpContext } from '@adonisjs/core/http'
import Country from '#models/country'
import { createCountryValidator, updateCountryValidator } from '#validators/country_validator'

export default class CountriesController {
  async index({ response }: HttpContext) {
    const countries = await Country.query().orderBy('name', 'asc')
    return response.ok(countries)
  }

  async store({ request, response }: HttpContext) {
    const data = await request.validateUsing(createCountryValidator)
    const country = await Country.create(data)
    return response.created(country)
  }

  async update({ params, request, response }: HttpContext) {
    const country = await Country.findOrFail(params.id)
    const data = await request.validateUsing(updateCountryValidator)
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
