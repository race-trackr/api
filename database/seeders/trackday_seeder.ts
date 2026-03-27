import { BaseSeeder } from '@adonisjs/lucid/seeders'
import User from '#models/user'
import Track from '#models/track'
import UserVehicle from '#models/user_vehicle'
import TrackDay from '#models/track_day'
import { DateTime } from 'luxon'
import logger from '@adonisjs/core/services/logger'

type TrackDayData = {
  date: DateTime
  weather?: 'clear' | 'cloudy' | 'rainy' | null
  airTemperature?: number | null
  trackTemperature?: number | null
  trackCondition?: 'wet' | 'dry' | 'moist' | null
  notes?: string | null
  bestLapTime?: string | null
  totalLaps?: number | null
  totalDistance?: number | null
}

export default class extends BaseSeeder {
  static environment = ['development', 'testing']

  private async trackDayFor(email: string, vehicleSlug: string, trackSlug: string, data: TrackDayData) {
    const user = await User.findBy('email', email)
    if (!user) return
    const vehicle = await UserVehicle.query().where('user_id', user.id).where('slug', vehicleSlug).first()
    if (!vehicle) return
    const track = await Track.findBy('slug', trackSlug)
    if (!track) return
    await TrackDay.updateOrCreate(
      { userId: user.id, trackId: track.id, userVehicleId: vehicle.id, date: data.date },
      { ...data, userId: user.id, trackId: track.id, userVehicleId: vehicle.id }
    )
  }

  async run() {
    // owner@hotmail.fr — 15 track days across multiple tracks and vehicles
    await this.trackDayFor('owner@hotmail.fr', 'ferrari-sf90-stradale-2022', 'circuit-paul-ricard', {
      date: DateTime.fromISO('2025-11-08'),
      weather: 'clear',
      airTemperature: 22,
      trackTemperature: 35,
      trackCondition: 'dry',
      notes: 'Première sortie avec la SF90 sur Paul Ricard. Gestion de la puissance hybride impressionnante.',
      bestLapTime: '1.28.412',
      totalLaps: 45,
      totalDistance: 261.0,
    })
    await this.trackDayFor('owner@hotmail.fr', 'ferrari-sf90-stradale-2022', 'magny-cours', {
      date: DateTime.fromISO('2025-10-02'),
      weather: 'cloudy',
      airTemperature: 18,
      trackTemperature: 24,
      trackCondition: 'dry',
      notes: 'Très bon feeling sur Magny-Cours. Record personnel sur ce circuit.',
      bestLapTime: '1.39.854',
      totalLaps: 38,
      totalDistance: 199.5,
    })
    await this.trackDayFor('owner@hotmail.fr', 'lamborghini-huracan-sto-2021', 'misano', {
      date: DateTime.fromISO('2025-09-20'),
      weather: 'clear',
      airTemperature: 26,
      trackTemperature: 40,
      trackCondition: 'dry',
      notes: 'Huracán STO parfaitement en phase avec le circuit de Misano. Sous-virage minimal.',
      bestLapTime: '1.35.228',
      totalLaps: 52,
      totalDistance: 219.96,
    })
    await this.trackDayFor('owner@hotmail.fr', 'lamborghini-huracan-sto-2021', 'autodromo-internazionale-del-mugello', {
      date: DateTime.fromISO('2025-08-14'),
      weather: 'clear',
      airTemperature: 32,
      trackTemperature: 48,
      trackCondition: 'dry',
      notes: 'Mugello est exigeant avec la chaleur mais la STO reste impressionnante.',
      bestLapTime: '1.48.963',
      totalLaps: 40,
      totalDistance: 210.0,
    })
    await this.trackDayFor('owner@hotmail.fr', 'porsche-911-gt3-rs-2023', 'silverstone-circuit', {
      date: DateTime.fromISO('2025-07-25'),
      weather: 'cloudy',
      airTemperature: 20,
      trackTemperature: 28,
      trackCondition: 'dry',
      notes: "GT3 RS absolument précise sur Silverstone. Maxton Corner a été notre zone d'amélioration.",
      bestLapTime: '1.58.321',
      totalLaps: 35,
      totalDistance: 206.185,
    })
    await this.trackDayFor('owner@hotmail.fr', 'porsche-911-gt3-rs-2023', 'red-bull-ring', {
      date: DateTime.fromISO('2025-06-18'),
      weather: 'clear',
      airTemperature: 28,
      trackTemperature: 42,
      trackCondition: 'dry',
      notes: 'Red Bull Ring — circuit court mais rapide. Le GT3 RS excelle en appui.',
      bestLapTime: '1.22.745',
      totalLaps: 55,
      totalDistance: 239.25,
    })
    await this.trackDayFor('owner@hotmail.fr', 'mclaren-720s-gt3-2022', 'circuit-paul-ricard', {
      date: DateTime.fromISO('2025-05-22'),
      weather: 'rainy',
      airTemperature: 16,
      trackTemperature: 18,
      trackCondition: 'wet',
      notes: 'Session sous la pluie avec la 720S GT3. ABS et TC très efficaces en conditions humides.',
      bestLapTime: '1.42.198',
      totalLaps: 28,
      totalDistance: 162.4,
    })
    await this.trackDayFor('owner@hotmail.fr', 'honda-cbr1000rr-r-fireblade-sp-2023', 'circuit-paul-ricard', {
      date: DateTime.fromISO('2025-04-12'),
      weather: 'clear',
      airTemperature: 20,
      trackTemperature: 32,
      trackCondition: 'dry',
      notes: 'Fireblade SP — suspensions Öhlins parfaitement réglées. Freinages très tardifs.',
      bestLapTime: '1.38.054',
      totalLaps: 48,
      totalDistance: 278.4,
    })
    await this.trackDayFor('owner@hotmail.fr', 'ducati-panigale-v4s-2022', 'misano', {
      date: DateTime.fromISO('2025-03-28'),
      weather: 'clear',
      airTemperature: 18,
      trackTemperature: 26,
      trackCondition: 'dry',
      notes: "Panigale V4 S sur son terrain d'élection. Riding Mode Race A utilisé tout le WE.",
      bestLapTime: '1.34.612',
      totalLaps: 50,
      totalDistance: 211.5,
    })
    await this.trackDayFor('owner@hotmail.fr', 'kawasaki-zx-10rr-2022', 'pau-arnos', {
      date: DateTime.fromISO('2025-03-05'),
      weather: 'cloudy',
      airTemperature: 14,
      trackTemperature: 18,
      trackCondition: 'dry',
      notes: 'ZX-10RR très agile sur Pau Arnos. Collecteur titane audible, son magnifique.',
      bestLapTime: '1.11.334',
      totalLaps: 62,
      totalDistance: 187.86,
    })
    await this.trackDayFor('owner@hotmail.fr', 'yamaha-yzf-r1m-2022', 'nogaro', {
      date: DateTime.fromISO('2025-02-20'),
      weather: 'clear',
      airTemperature: 12,
      trackTemperature: 16,
      trackCondition: 'dry',
      notes: 'R1M très équilibrée sur Nogaro. ECS Öhlins réglé en mode Track — parfait.',
      bestLapTime: '1.23.876',
      totalLaps: 58,
      totalDistance: 210.888,
    })
    await this.trackDayFor('owner@hotmail.fr', 'aprilia-rsv4-factory-2023', 'jerez', {
      date: DateTime.fromISO('2025-01-30'),
      weather: 'clear',
      airTemperature: 16,
      trackTemperature: 22,
      trackCondition: 'dry',
      notes: 'RSV4 Factory — Jerez est le circuit parfait pour ce type de moto. Très bon ressenti.',
      bestLapTime: '1.39.287',
      totalLaps: 44,
      totalDistance: 194.832,
    })
    await this.trackDayFor('owner@hotmail.fr', 'alpine-a110-gt4-2022', 'magny-cours', {
      date: DateTime.fromISO('2024-12-05'),
      weather: 'cloudy',
      airTemperature: 8,
      trackTemperature: 10,
      trackCondition: 'moist',
      notes: 'Alpine A110 GT4 en conditions froides — très bonne mise en température des pneus.',
      bestLapTime: '1.52.103',
      totalLaps: 32,
      totalDistance: 168.0,
    })
    await this.trackDayFor('owner@hotmail.fr', 'radical-sr10-2023', 'circuit-paul-ricard', {
      date: DateTime.fromISO('2024-11-14'),
      weather: 'clear',
      airTemperature: 14,
      trackTemperature: 20,
      trackCondition: 'dry',
      notes: "Radical SR10 — appui aéro phénoménal. Meilleure session de l'année.",
      bestLapTime: '1.24.876',
      totalLaps: 55,
      totalDistance: 319.0,
    })
    await this.trackDayFor('owner@hotmail.fr', 'mercedes-amg-gt3-2022', 'circuit-paul-ricard', {
      date: DateTime.fromISO('2026-05-10'),
      weather: null,
      notes: 'Session prévue — test setup AMG GT3 EVO avant saison endurance.',
      bestLapTime: null,
      totalLaps: 0,
      totalDistance: 0,
    })

    logger.info(null, '✅ Track days créés avec succès!')
  }
}
