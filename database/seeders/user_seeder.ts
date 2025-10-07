import Country from '#models/country'
import User from '#models/user'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  static environment = ['development', 'testing']
  async run() {
    const france = await Country.findBy('slug', 'france')
    if (!france) {
      throw new Error('Country "france" not found. Please run CountrySeeder first.')
    }
    const espagne = await Country.findBy('slug', 'espagne')
    if (!espagne) {
      throw new Error('Country "espagne" not found. Please run CountrySeeder first.')
    }
    // Write your database queries inside the run method
    await User.createMany([
      {
        email: 'admin@hotmail.fr',
        password: 'admin',
        role: 'admin',
        countryId: france.id,
        firstName: 'Winkler',
        lastName: 'Fabien',
      },
      {
        email: 'user@hotmail.com',
        password: 'user',
        countryId: espagne.id,
        role: 'user',
        firstName: 'Doe',
        lastName: 'John',
      },
    ])
  }
}
