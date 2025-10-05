import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import User from './user.js'
import TrackDay from './track_day.js'
import Maintenance from './maintenance.js'

export default class UserVehicle extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare userId: number

  @column()
  declare name: string

  @column()
  declare slug: string

  @column()
  declare type: 'Moto' | 'Voiture' | 'Karting' | 'Autre'

  @column()
  declare brand: string | null

  @column()
  declare model: string | null

  @column()
  declare year: number | null

  @column()
  declare licensePlate: string | null

  @column()
  declare details: string | null

  @column()
  declare photo: string | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @hasMany(() => TrackDay)
  declare trackDays: HasMany<typeof TrackDay>

  @hasMany(() => Maintenance)
  declare maintenances: HasMany<typeof Maintenance>
}
