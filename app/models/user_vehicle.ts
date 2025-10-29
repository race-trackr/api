import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, hasMany, beforeCreate } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import User from './user.js'
import TrackDay from './track_day.js'
import Maintenance from './maintenance.js'
import { v4 as uuidv4 } from 'uuid'

export default class UserVehicle extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare uuid: string

  @column()
  declare userId: number

  @column()
  declare name: string

  @column()
  declare slug: string

  @column()
  declare type: 'motorcycle' | 'car' | 'karting' | 'other'

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

  @beforeCreate()
  public static generateUuid(vehicle: UserVehicle) {
    vehicle.uuid = uuidv4()
  }
}
