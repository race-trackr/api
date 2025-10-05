import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import User from './user.js'
import Track from './track.js'
import UserVehicle from './user_vehicle.js'
import TrackDayTest from './track_day_test.js'

export default class TrackDay extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare userId: number

  @column()
  declare trackId: number

  @column()
  declare userVehicleId: number | null

  @column.date()
  declare date: DateTime

  @column()
  declare weather: string

  @column()
  declare airTemperature: number | null

  @column()
  declare trackTemperature: number | null

  @column()
  declare trackCondition: string | null

  @column()
  declare note: string | null

  @column()
  declare bestLapTime: string | null

  @column()
  declare totalLaps: number | null

  @column()
  declare totalDistance: number | null

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

  @hasMany(() => TrackDayTest)
  declare tests: HasMany<typeof TrackDayTest>
}
