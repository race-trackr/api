import Country from '#models/country'
import User from '#models/user'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    const france = await Country.findByOrFail('slug', 'france')
    const espagne = await Country.findByOrFail('slug', 'espagne')
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
