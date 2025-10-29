import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import Track from './track.js'
import { v4 as uuidv4 } from 'uuid'

export default class Country extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare uuid: string

  @column()
  declare name: string

  @column()
  declare slug: string

  @column()
  declare iso: string

  @column()
  declare timezone: string

  @column()
  declare capital: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @hasMany(() => Track)
  declare tracks: HasMany<typeof Track>

  @beforeCreate()
  public static async generateUuid(country: Country) {
    country.uuid = uuidv4()
  }
}
