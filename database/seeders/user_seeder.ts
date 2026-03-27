import Country from '#models/country'
import User from '#models/user'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  static environment = ['development', 'testing']
  async run() {
    const france = await Country.findBy('slug', 'france')
    if (!france) throw new Error('Country "france" not found. Please run CountrySeeder first.')
    const espagne = await Country.findBy('slug', 'espagne')
    if (!espagne) throw new Error('Country "espagne" not found. Please run CountrySeeder first.')
    const italie = await Country.findBy('slug', 'italie')
    const allemagne = await Country.findBy('slug', 'allemagne')
    const portugal = await Country.findBy('slug', 'portugal')
    const belgique = await Country.findBy('slug', 'belgique')
    const angleterre = await Country.findBy('slug', 'angleterre')
    const japon = await Country.findBy('slug', 'japon')
    const suisse = await Country.findBy('slug', 'suisse')

    await User.updateOrCreateMany('email', [
      {
        email: 'owner@hotmail.fr',
        password: 'owner',
        role: 'owner',
        countryId: france.id,
        firstName: 'Fabien',
        lastName: 'Winkler',
      },
      {
        email: 'admin@hotmail.fr',
        password: 'admin',
        role: 'admin',
        countryId: france.id,
        firstName: 'Fabien',
        lastName: 'Winkler',
      },
      {
        email: 'user@hotmail.com',
        password: 'user',
        countryId: espagne.id,
        role: 'user',
        firstName: 'John',
        lastName: 'Doe',
      },
      {
        email: 'pierre.dupont@gmail.com',
        password: 'password',
        role: 'user',
        countryId: france.id,
        firstName: 'Pierre',
        lastName: 'Dupont',
      },
      {
        email: 'marco.rossi@gmail.com',
        password: 'password',
        role: 'user',
        countryId: italie?.id ?? france.id,
        firstName: 'Marco',
        lastName: 'Rossi',
      },
      {
        email: 'carlos.garcia@gmail.com',
        password: 'password',
        role: 'user',
        countryId: espagne.id,
        firstName: 'Carlos',
        lastName: 'Garcia',
      },
      {
        email: 'hans.mueller@gmail.com',
        password: 'password',
        role: 'user',
        countryId: allemagne?.id ?? france.id,
        firstName: 'Hans',
        lastName: 'Mueller',
      },
      {
        email: 'john.smith@gmail.com',
        password: 'password',
        role: 'user',
        countryId: angleterre?.id ?? france.id,
        firstName: 'John',
        lastName: 'Smith',
      },
      {
        email: 'luca.ferrari@gmail.com',
        password: 'password',
        role: 'user',
        countryId: italie?.id ?? france.id,
        firstName: 'Luca',
        lastName: 'Ferrari',
      },
      {
        email: 'sophie.martin@gmail.com',
        password: 'password',
        role: 'user',
        countryId: france.id,
        firstName: 'Sophie',
        lastName: 'Martin',
      },
      {
        email: 'alex.dubois@gmail.com',
        password: 'password',
        role: 'user',
        countryId: belgique?.id ?? france.id,
        firstName: 'Alex',
        lastName: 'Dubois',
      },
      {
        email: 'lucas.silva@gmail.com',
        password: 'password',
        role: 'user',
        countryId: portugal?.id ?? espagne.id,
        firstName: 'Lucas',
        lastName: 'Silva',
      },
      {
        email: 'yuki.tanaka@gmail.com',
        password: 'password',
        role: 'user',
        countryId: japon?.id ?? france.id,
        firstName: 'Yuki',
        lastName: 'Tanaka',
      },
      {
        email: 'thomas.weber@gmail.com',
        password: 'password',
        role: 'user',
        countryId: suisse?.id ?? france.id,
        firstName: 'Thomas',
        lastName: 'Weber',
      },
      {
        email: 'elena.rossi@gmail.com',
        password: 'password',
        role: 'user',
        countryId: italie?.id ?? france.id,
        firstName: 'Elena',
        lastName: 'Rossi',
      },
    ])
  }
}
