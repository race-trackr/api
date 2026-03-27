import { BaseSeeder } from '@adonisjs/lucid/seeders'
import User from '#models/user'
import UserVehicle from '#models/user_vehicle'
import Maintenance from '#models/maintenance'
import { DateTime } from 'luxon'
import logger from '@adonisjs/core/services/logger'

type MaintenanceData = {
  name: string
  date: DateTime
  type: 'maintenance' | 'repair' | 'modification' | 'other'
  details?: string | null
  cost?: number | null
  mileage?: number | null
  workshop?: string | null
  nextMaintenanceDate?: DateTime | null
  nextMaintenanceMileage?: number | null
}

export default class extends BaseSeeder {
  static environment = ['development', 'testing']

  private async maintenanceFor(
    email: string,
    vehicleSlug: string,
    data: MaintenanceData
  ) {
    const user = await User.findBy('email', email)
    if (!user) return
    const vehicle = await UserVehicle.query()
      .where('user_id', user.id)
      .where('slug', vehicleSlug)
      .first()
    if (!vehicle) return
    await Maintenance.updateOrCreate(
      { userId: user.id, userVehicleId: vehicle.id, name: data.name },
      { ...data, userId: user.id, userVehicleId: vehicle.id }
    )
  }

  async run() {
    // owner@hotmail.fr — 15 maintenances across multiple vehicles
    await this.maintenanceFor('owner@hotmail.fr', 'ferrari-sf90-stradale-2022', {
      name: 'Service Ferrari 10 000 km',
      date: DateTime.fromISO('2025-11-01'),
      type: 'maintenance',
      details: 'Révision complète usine Ferrari: huile Esso Ultron 0W40, filtres OEM, inspection hybride',
      cost: 4800.0,
      mileage: 10000,
      workshop: 'Ferrari Paris Monceau',
      nextMaintenanceDate: DateTime.fromISO('2026-11-01'),
      nextMaintenanceMileage: 20000,
    })
    await this.maintenanceFor('owner@hotmail.fr', 'ferrari-sf90-stradale-2022', {
      name: 'Remplacement pneumatiques Michelin PS Cup 2 R',
      date: DateTime.fromISO('2025-10-28'),
      type: 'other',
      details: 'Michelin Pilot Sport Cup 2 R 305/30R20 arr + 255/35R20 av, montage + équilibrage',
      cost: 3400.0,
      mileage: 9800,
      workshop: 'Pneumatiques Prestige Lyon',
    })
    await this.maintenanceFor('owner@hotmail.fr', 'ferrari-sf90-stradale-2022', {
      name: 'Purge et remplacement liquide de frein',
      date: DateTime.fromISO('2025-09-10'),
      type: 'maintenance',
      details: 'Castrol SRF Racing Brake Fluid, purge complète circuit frein, test ABS',
      cost: 280.0,
      mileage: 9200,
      workshop: 'Ferrari Paris Monceau',
    })
    await this.maintenanceFor('owner@hotmail.fr', 'lamborghini-huracan-sto-2021', {
      name: 'Révision annuelle Lamborghini',
      date: DateTime.fromISO('2025-09-15'),
      type: 'maintenance',
      details: 'Service annuel: huile Castrol Edge 10W60, filtres OEM, courroie distribution, inspection carbone',
      cost: 3200.0,
      mileage: 15000,
      workshop: 'Lamborghini Lyon',
      nextMaintenanceDate: DateTime.fromISO('2026-09-15'),
    })
    await this.maintenanceFor('owner@hotmail.fr', 'lamborghini-huracan-sto-2021', {
      name: 'Remplacement disques et plaquettes carbone-céramique',
      date: DateTime.fromISO('2025-08-10'),
      type: 'repair',
      details: 'Disques CCM-R Lamborghini + plaquettes Pagid RST1, purge Motul RBF700',
      cost: 6800.0,
      mileage: 14200,
      workshop: 'Lamborghini Lyon',
    })
    await this.maintenanceFor('owner@hotmail.fr', 'porsche-911-gt3-rs-2023', {
      name: 'Setup piste — géométrie et suspension',
      date: DateTime.fromISO('2025-07-20'),
      type: 'modification',
      details: 'Réglage PDCC Sport, geometrie Porsche Motorsport, pincement et carrossage circuit',
      cost: 1200.0,
      mileage: 8000,
      workshop: 'Porsche Centre Paris',
    })
    await this.maintenanceFor('owner@hotmail.fr', 'porsche-911-gt3-rs-2023', {
      name: 'Vidange et filtres GT3 RS',
      date: DateTime.fromISO('2025-06-14'),
      type: 'maintenance',
      details: 'Mobil1 0W40 Motorsport 9L + filtre à huile + filtre à air OEM',
      cost: 520.0,
      mileage: 7500,
      workshop: 'Porsche Centre Paris',
      nextMaintenanceDate: DateTime.fromISO('2025-12-14'),
    })
    await this.maintenanceFor('owner@hotmail.fr', 'mclaren-720s-gt3-2022', {
      name: 'Inspection GT3 pré-saison 2025',
      date: DateTime.fromISO('2025-03-10'),
      type: 'maintenance',
      details: 'Check complet châssis, freinage, transmission séquentielle Xtrac, liquides',
      cost: 2400.0,
      mileage: 5000,
      workshop: 'McLaren Motorsport Service',
    })
    await this.maintenanceFor('owner@hotmail.fr', 'honda-cbr1000rr-r-fireblade-sp-2023', {
      name: 'Vidange + réglage soupapes CBR',
      date: DateTime.fromISO('2025-04-05'),
      type: 'maintenance',
      details: 'Huile Honda Pro HP4 10W40, réglage jeu aux soupapes, filtre à air K&N Racing',
      cost: 380.0,
      mileage: 6000,
      workshop: 'Honda Racing Service Paris',
      nextMaintenanceDate: DateTime.fromISO('2025-10-05'),
    })
    await this.maintenanceFor('owner@hotmail.fr', 'ducati-panigale-v4s-2022', {
      name: 'Révision 12 000 km Panigale',
      date: DateTime.fromISO('2025-03-20'),
      type: 'maintenance',
      details: 'Service Ducati: huile Shell Advance Ultra 15W50, courroies distribution, filtre, soupapes',
      cost: 890.0,
      mileage: 12000,
      workshop: 'Ducati Paris',
      nextMaintenanceDate: DateTime.fromISO('2026-03-20'),
    })
    await this.maintenanceFor('owner@hotmail.fr', 'kawasaki-zx-10rr-2022', {
      name: 'Installation collecteur titane Akrapovic',
      date: DateTime.fromISO('2025-02-15'),
      type: 'modification',
      details: 'Collecteur racing titane Akrapovic + silencieux carbone, reprogrammation ECU',
      cost: 2200.0,
      mileage: 8500,
      workshop: 'Moto Racing Prépa Paris',
    })
    await this.maintenanceFor('owner@hotmail.fr', 'yamaha-yzf-r1m-2022', {
      name: 'Remplacement pneumatiques piste R1M',
      date: DateTime.fromISO('2025-02-08'),
      type: 'other',
      details: 'Bridgestone Battlax Racing R11 120/70-17 + 190/55-17, montage + géométrie',
      cost: 680.0,
      mileage: 11000,
      workshop: 'Moto Piste Passion',
    })
    await this.maintenanceFor('owner@hotmail.fr', 'aprilia-rsv4-factory-2023', {
      name: 'Vidange et filtre RSV4',
      date: DateTime.fromISO('2025-01-25'),
      type: 'maintenance',
      details: 'Huile Motul 300V 15W50 + filtre à huile + remplacement liquide de frein DOT 5.1',
      cost: 210.0,
      mileage: 4500,
      workshop: 'Aprilia Racing Service',
      nextMaintenanceDate: DateTime.fromISO('2025-07-25'),
    })
    await this.maintenanceFor('owner@hotmail.fr', 'alpine-a110-gt4-2022', {
      name: 'Préparation hivernale Alpine GT4',
      date: DateTime.fromISO('2024-12-01'),
      type: 'maintenance',
      details: 'Vidange boîte Getrag, plaquettes Ferodo DS3000, contrôle châssis tubulaire, graissage paliers',
      cost: 1100.0,
      mileage: 9000,
      workshop: 'Alpine Racing Service Dieppe',
    })
    await this.maintenanceFor('owner@hotmail.fr', 'radical-sr10-2023', {
      name: 'Setup complet Radical SR10',
      date: DateTime.fromISO('2024-11-10'),
      type: 'modification',
      details: 'Réglage appui aéro aileron arr, ressorts Öhlins, carrossage et pincement circuit Paul Ricard',
      cost: 1800.0,
      mileage: 2000,
      workshop: 'Radical Motorsport France',
    })

    logger.info(null, '✅ Maintenances créées avec succès!')
  }
}
