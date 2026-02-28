import { DateTime } from 'luxon'
import hash from '@adonisjs/core/services/hash'
import { compose } from '@adonisjs/core/helpers'
import { BaseModel, beforeCreate, column, hasMany, hasOne } from '@adonisjs/lucid/orm'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import { DbAccessTokensProvider } from '@adonisjs/auth/access_tokens'
import UserVehicle from './user_vehicle.js'
import TrackDay from './track_day.js'
import type { HasMany, HasOne } from '@adonisjs/lucid/types/relations'
import Subscription from './subscription.js'
import { v4 as uuidv4 } from 'uuid'

const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['email'],
  passwordColumnName: 'password',
})

export default class User extends compose(BaseModel, AuthFinder) {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare uuid: string

  @column()
  declare firstName: string

  @column()
  declare lastName: string

  @column()
  declare email: string

  @column({ serializeAs: null })
  declare password: string

  @column()
  declare countryId: number

  @column()
  declare role: 'owner' | 'admin' | 'user'

  @column({ serializeAs: null })
  declare preferences: Record<string, any> | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  @hasMany(() => UserVehicle)
  declare vehicles: HasMany<typeof UserVehicle>

  @hasMany(() => TrackDay)
  declare trackDays: HasMany<typeof TrackDay>

  @hasOne(() => Subscription)
  declare subscription: HasOne<typeof Subscription>

  static accessTokens = DbAccessTokensProvider.forModel(User)

  @beforeCreate()
  public static generateUuid(user: User) {
    user.uuid = uuidv4()
  }
}
