import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import User from './user.js'
import UserVehicle from './user_vehicle.js'

export default class Maintenance extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare userId: number

  @column()
  declare userVehicleId: number

  @column()
  declare name: string

  @column.date()
  declare date: DateTime

  @column()
  declare type: string

  @column()
  declare details: string | null

  @column()
  declare cost: number | null

  @column()
  declare mileage: number | null

  @column()
  declare workshop: string | null

  @column.date()
  declare nextMaintenanceDate: DateTime | null

  @column()
  declare nextMaintenanceMileage: number | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @belongsTo(() => UserVehicle)
  declare vehicle: BelongsTo<typeof UserVehicle>
}
