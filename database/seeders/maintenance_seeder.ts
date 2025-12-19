import { BaseSeeder } from '@adonisjs/lucid/seeders'
import User from '#models/user'
import UserVehicle from '#models/user_vehicle'
import Maintenance from '#models/maintenance'
import { DateTime } from 'luxon'
import logger from '@adonisjs/core/services/logger'

export default class extends BaseSeeder {
  static environment = ['development', 'testing']

  async run() {
    const user = await User.findBy('email', 'user@hotmail.com')
    if (!user) {
      console.error("User with email 'user@hotmail.com' not found. Please run UserSeeder first.")
      return
    }
    let vehicle = await UserVehicle.query()
      .where('user_id', user.id)
      .where('slug', 'yamaha-r6-2020')
      .first()

    if (!vehicle) {
      vehicle = await UserVehicle.create({
        userId: user.id,
        name: 'Yamaha R6 2020',
        slug: 'yamaha-r6-2020',
        type: 'motorcycle',
        brand: 'Yamaha',
        model: 'R6',
        year: 2020,
        licensePlate: 'AB-123-CD',
        details: 'Moto de piste préparée',
      })
      logger.info(null, "✅ Véhicule 'Yamaha R6 2020' créé pour l'utilisateur de test.")
    }

    await Maintenance.createMany([
      {
        userId: user.id,
        userVehicleId: vehicle.id,
        name: 'Vidange moteur complète',
        date: DateTime.fromISO('2025-09-01'),
        type: 'maintenance',
        details:
          'Changement huile moteur Motul 300V 10W40 (4L) + filtre à huile Yamaha OEM + joint de vidange',
        cost: 145.5,
        mileage: 8500,
        workshop: 'Garage Moto Passion',
        nextMaintenanceDate: DateTime.fromISO('2026-03-01'),
        nextMaintenanceMileage: 14500,
      },
      {
        userId: user.id,
        userVehicleId: vehicle.id,
        name: 'Remplacement plaquettes de frein',
        date: DateTime.fromISO('2025-08-15'),
        type: 'repair',
        details: 'Plaquettes avant Brembo Racing + purge liquide de frein DOT 5.1',
        cost: 280.0,
        mileage: 8200,
        workshop: 'MB Racing',
      },
      {
        userId: user.id,
        userVehicleId: vehicle.id,
        name: 'Montage pneus piste',
        date: DateTime.fromISO('2025-07-20'),
        type: 'modification',
        details: 'Montage Pirelli Diablo Supercorsa SC2 avant/arrière + équilibrage',
        cost: 420.0,
        mileage: 7800,
        workshop: 'Pneumatiques Pro',
      },
      {
        userId: user.id,
        userVehicleId: vehicle.id,
        name: 'Révision chaîne et pignons',
        date: DateTime.fromISO('2025-06-10'),
        type: 'maintenance',
        details: 'Nettoyage et graissage chaîne + contrôle tension + vérification usure',
        cost: 35.0,
        mileage: 7200,
        workshop: 'Auto-entretien',
        nextMaintenanceDate: DateTime.fromISO('2025-12-10'),
        nextMaintenanceMileage: 10200,
      },
      {
        userId: user.id,
        userVehicleId: vehicle.id,
        name: 'Changement liquide de refroidissement',
        date: DateTime.fromISO('2025-05-05'),
        type: 'maintenance',
        details:
          'Vidange et remplissage circuit refroidissement avec liquide Motul Motocool Expert',
        cost: 65.0,
        mileage: 6500,
        workshop: 'Garage Moto Passion',
        nextMaintenanceDate: DateTime.fromISO('2027-05-05'),
      },
    ])

    logger.info(null, '✅ Maintenances créées avec succès!')
  }
}
