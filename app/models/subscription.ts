import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import User from './user.js'

export type SubscriptionStatus = 'active' | 'canceled' | 'expired' | 'pending'
export type SubscriptionPlan = 'free' | 'basic' | 'pro' | 'enterprise'
export type BillingCycle = 'monthly' | 'yearly'
export type SupportType = 'email_only' | 'email_priority' | '24_7_support'

export interface SubscriptionFeatures {
  maxVehicles: number
  maxTrackDaysPerMonth: number
  allowDataExport: boolean
  allowDataBackup: boolean
  allowApiAccess: boolean
  allowTelemetryData: boolean
  maxStorage: number
  support: SupportType
  prioritySupport: boolean
  betaAccess: boolean
  allowWidgetIntegration: boolean
  allowCustomBranding: boolean
  allowCustomColors: boolean
  allowCustomLogos: boolean
  [key: string]: any
}

export default class Subscription extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare stripeCustomerId: string

  @column()
  declare userId: number

  @column()
  declare plan: SubscriptionPlan

  @column()
  declare status: SubscriptionStatus

  @column()
  declare billingCycle: BillingCycle

  @column()
  declare price: number

  @column.date()
  declare startDate: DateTime

  @column.date()
  declare endDate: DateTime

  @column.date()
  declare trialEndsAt: DateTime | null

  @column.date()
  declare canceledAt: DateTime | null

  @column()
  declare autoRenew: boolean

  @column()
  declare features: SubscriptionFeatures

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>
}
