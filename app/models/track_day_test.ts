import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import TrackDay from './track_day.js'

export default class TrackDayTest extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare trackDayId: number

  @column()
  declare category: string

  @column()
  declare parameter: string

  @column()
  declare value: string

  @column()
  declare lapTime: string | null

  @column()
  declare feedback: string | null

  @column()
  declare position: number | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => TrackDay)
  declare trackDay: BelongsTo<typeof TrackDay>
}
