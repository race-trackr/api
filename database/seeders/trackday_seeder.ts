import { BaseSeeder } from '@adonisjs/lucid/seeders'
import User from '#models/user'
import Track from '#models/track'
import UserVehicle from '#models/user_vehicle'
import TrackDay from '#models/track_day'
import { DateTime } from 'luxon'

export default class extends BaseSeeder {
  static environment = ['development', 'testing']

  async run() {
    // Récupérer l'utilisateur test
    const user = await User.findBy('email', 'admin@hotmail.fr')
    if (!user) {
      console.error(
        "L'utilisateur 'admin@hotmail.fr' n'existe pas. Veuillez exécuter le UserSeeder d'abord."
      )
      return
    }

    // Créer un véhicule test s'il n'existe pas
    let vehicle = await UserVehicle.query()
      .where('user_id', user.id)
      .where('slug', 'yamaha-r6-2020')
      .first()

    if (!vehicle) {
      vehicle = await UserVehicle.create({
        userId: user.id,
        name: 'Yamaha R6 2020',
        slug: 'yamaha-r6-2020',
        type: 'bike',
        brand: 'Yamaha',
        model: 'R6',
        year: 2020,
        licensePlate: 'AB-123-CD',
        details: 'Moto de piste préparée',
      })
      console.log("✅ Véhicule 'Yamaha R6 2020' créé pour l'utilisateur de test.")
    }

    // Récupérer des circuits
    const paulRicard = await Track.findBy('slug', 'circuit-paul-ricard')
    if (!paulRicard) {
      console.error(
        "Le circuit 'paul-ricard' n'existe pas. Veuillez exécuter le TrackSeeder d'abord."
      )
      return
    }
    const pauArnos = await Track.findBy('slug', 'pau-arnos')
    if (!pauArnos) {
      console.error(
        "Le circuit 'pau-arnos' n'existe pas. Veuillez exécuter le TrackSeeder d'abord."
      )
      return
    }

    await TrackDay.create({
      userId: user.id,
      trackId: paulRicard.id,
      userVehicleId: vehicle.id,
      date: DateTime.fromISO('2025-09-15'),
      weather: 'clear',
      airTemperature: 28,
      trackTemperature: 42,
      trackCondition: 'dry',
      notes: 'Excellente journée, conditions parfaites. Beaucoup appris sur les trajectoires.',
      bestLapTime: '1:35.234',
      totalLaps: 52,
      totalDistance: 303.784,
    })

    await TrackDay.create({
      userId: user.id,
      trackId: pauArnos.id,
      userVehicleId: vehicle.id,
      date: DateTime.fromISO('2025-08-20'),
      weather: 'cloudy',
      airTemperature: 22,
      trackTemperature: 28,
      trackCondition: 'dry',
      notes: 'Première sortie sur ce circuit. Circuit technique, beaucoup de virages lents.',
      bestLapTime: '1:16.789',
      totalLaps: 38,
      totalDistance: 115.14,
    })

    await TrackDay.create({
      userId: user.id,
      trackId: paulRicard.id,
      userVehicleId: vehicle.id,
      date: DateTime.fromISO('2025-07-10'),
      weather: 'rainy',
      airTemperature: 18,
      trackTemperature: 22,
      trackCondition: 'wet',
      notes: "Pluie intermittente. Session difficile mais très formatrice pour gérer l'adhérence.",
      bestLapTime: '1:42.567',
      totalLaps: 28,
      totalDistance: 163.576,
    })

    console.log('✅ Track days créés avec succès!')
  }
}
