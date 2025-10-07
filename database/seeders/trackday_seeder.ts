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
    const user = await User.findBy('email', 'user@hotmail.com')
    if (!user) {
      console.error(
        "L'utilisateur 'user@hotmail.com' n'existe pas. Veuillez exécuter le UserSeeder d'abord."
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
        type: 'Moto',
        brand: 'Yamaha',
        model: 'R6',
        year: 2020,
        licensePlate: 'AB-123-CD',
        details: 'Moto de piste préparée',
      })
    }

    // Récupérer des circuits
    const paulRicard = await Track.findBy('slug', 'paul-ricard')
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

    // Créer plusieurs track days
    const trackDay1 = await TrackDay.create({
      userId: user.id,
      trackId: paulRicard.id,
      userVehicleId: vehicle.id,
      date: DateTime.fromISO('2025-09-15'),
      weather: 'Ensoleillé',
      airTemperature: 28,
      trackTemperature: 42,
      trackCondition: 'Sec',
      note: 'Excellente journée, conditions parfaites. Beaucoup appris sur les trajectoires.',
      bestLapTime: '1:35.234',
      totalLaps: 52,
      totalDistance: 303.784,
    })

    // Ajouter des tests pour le track day 1
    await trackDay1.related('tests').createMany([
      {
        category: 'Pneus',
        parameter: 'Pression avant',
        value: '2.2 bar',
        lapTime: '1:36.123',
        feedback: 'Bonne adhérence mais légère sous-vireur',
        position: 1,
      },
      {
        category: 'Pneus',
        parameter: 'Pression avant',
        value: '2.4 bar',
        lapTime: '1:35.234',
        feedback: 'Meilleur comportement, trajectoire plus précise',
        position: 2,
      },
      {
        category: 'Pneus',
        parameter: 'Pression arrière',
        value: '2.0 bar',
        lapTime: '1:35.456',
        feedback: 'Bon grip en sortie de virage',
        position: 3,
      },
      {
        category: 'Suspension',
        parameter: 'Compression fourche',
        value: '12 clics',
        lapTime: '1:35.789',
        feedback: 'Fourche un peu molle au freinage',
        position: 4,
      },
      {
        category: 'Suspension',
        parameter: 'Compression fourche',
        value: '10 clics',
        lapTime: '1:35.345',
        feedback: 'Meilleur maintien au freinage',
        position: 5,
      },
      {
        category: 'Suspension',
        parameter: 'Détente amortisseur',
        value: '14 clics',
        lapTime: '1:35.567',
        feedback: 'Bon équilibre général',
        position: 6,
      },
      {
        category: 'Freinage',
        parameter: 'Plaquettes avant',
        value: 'Racing 320°C',
        lapTime: '1:35.234',
        feedback: 'Excellent mordant, bon feeling',
        position: 7,
      },
    ])

    const trackDay2 = await TrackDay.create({
      userId: user.id,
      trackId: pauArnos.id,
      userVehicleId: vehicle.id,
      date: DateTime.fromISO('2025-08-20'),
      weather: 'Nuageux',
      airTemperature: 22,
      trackTemperature: 28,
      trackCondition: 'Sec',
      note: 'Première sortie sur ce circuit. Circuit technique, beaucoup de virages lents.',
      bestLapTime: '1:16.789',
      totalLaps: 38,
      totalDistance: 115.14,
    })

    await trackDay2.related('tests').createMany([
      {
        category: 'Pneus',
        parameter: 'Pression avant',
        value: '2.3 bar',
        lapTime: '1:17.456',
        feedback: 'Configuration de base',
        position: 1,
      },
      {
        category: 'Pneus',
        parameter: 'Pression arrière',
        value: '2.1 bar',
        lapTime: '1:17.234',
        feedback: 'Bon grip mais température basse',
        position: 2,
      },
      {
        category: 'Suspension',
        parameter: 'Compression fourche',
        value: '11 clics',
        lapTime: '1:16.789',
        feedback: 'Bon compromis pour circuit technique',
        position: 3,
      },
      {
        category: 'Electronique',
        parameter: 'Mode moteur',
        value: 'Sport',
        lapTime: '1:17.123',
        feedback: 'Réponse progressive adaptée au circuit',
        position: 4,
      },
    ])

    const trackDay3 = await TrackDay.create({
      userId: user.id,
      trackId: paulRicard.id,
      userVehicleId: vehicle.id,
      date: DateTime.fromISO('2025-07-10'),
      weather: 'Pluvieux',
      airTemperature: 18,
      trackTemperature: 22,
      trackCondition: 'Mouillé',
      note: "Pluie intermittente. Session difficile mais très formatrice pour gérer l'adhérence.",
      bestLapTime: '1:42.567',
      totalLaps: 28,
      totalDistance: 163.576,
    })

    await trackDay3.related('tests').createMany([
      {
        category: 'Pneus',
        parameter: 'Type',
        value: 'Pluie soft',
        lapTime: '1:42.567',
        feedback: 'Bon grip sur piste mouillée',
        position: 1,
      },
      {
        category: 'Pneus',
        parameter: 'Pression avant',
        value: '2.0 bar',
        lapTime: '1:43.234',
        feedback: 'Pression adaptée à la pluie',
        position: 2,
      },
      {
        category: 'Electronique',
        parameter: 'Contrôle traction',
        value: 'Niveau 5',
        lapTime: '1:42.789',
        feedback: 'Assistance utile sur mouillé',
        position: 3,
      },
      {
        category: 'Suspension',
        parameter: 'Détente fourche',
        value: '16 clics',
        lapTime: '1:42.567',
        feedback: 'Plus de stabilité sur piste glissante',
        position: 4,
      },
    ])

    console.log('✅ Track days créés avec succès!')
  }
}
