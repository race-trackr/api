import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, hasMany, beforeCreate } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import Country from './country.js'
import TrackDay from './track_day.js'
import { v4 as uuidv4 } from 'uuid'

export default class Track extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare uuid: string

  @column()
  declare name: string

  @column()
  declare slug: string

  @column()
  declare city: string

  @column()
  declare countryId: number

  @column()
  declare address: string | null

  @column()
  declare turns: string | null

  @column()
  declare length: string | number | null

  @column()
  declare width: string | number | null

  @column()
  declare maxDb: number | null

  @column()
  declare bestLapTime: string | null

  @column()
  declare bestLapTimePilot: string | null

  @column()
  declare description: string | null

  @column()
  declare logoUrl: string | null

  @column()
  declare trackLayoutUrl: string | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => Country)
  declare country: BelongsTo<typeof Country>

  @hasMany(() => TrackDay)
  declare trackDays: HasMany<typeof TrackDay>

  @beforeCreate()
  public static generateUuid(track: Track) {
    track.uuid = uuidv4()
  }
}
