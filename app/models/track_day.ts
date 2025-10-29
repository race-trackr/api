import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, beforeCreate } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import User from './user.js'
import Track from './track.js'
import UserVehicle from './user_vehicle.js'
import { v4 as uuidv4 } from 'uuid'

export default class TrackDay extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare uuid: string

  @column()
  declare userId: number

  @column()
  declare trackId: number

  @column()
  declare userVehicleId: number | null

  @column.date()
  declare date: DateTime

  @column()
  declare weather: 'clear' | 'cloudy' | 'rainy' | null

  @column()
  declare airTemperature: number | null

  @column()
  declare trackTemperature: number | null

  @column()
  declare trackCondition: 'wet' | 'dry' | 'moist' | null

  @column()
  declare notes: string | null

  @column()
  declare bestLapTime: string | null

  @column()
  declare totalLaps: number | null

  @column()
  declare totalDistance: number | null

  @column()
  declare chronos: string | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @belongsTo(() => Track)
  declare track: BelongsTo<typeof Track>

  @belongsTo(() => UserVehicle)
  declare vehicle: BelongsTo<typeof UserVehicle>

  @beforeCreate()
  public static generateUuid(trackDay: TrackDay) {
    trackDay.uuid = uuidv4()
  }
}
