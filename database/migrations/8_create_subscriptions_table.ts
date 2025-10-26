import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'subscriptions'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')
        .notNullable()

      table.enum('plan', ['free', 'basic', 'pro', 'enterprise']).defaultTo('free').notNullable()

      table
        .enum('status', ['active', 'canceled', 'expired', 'pending'])
        .defaultTo('pending')
        .notNullable()

      table.enum('billing_cycle', ['monthly', 'yearly']).defaultTo('monthly').notNullable()

      table.decimal('price', 10, 2).notNullable().defaultTo(0)

      table.date('start_date').notNullable()
      table.date('end_date').notNullable()
      table.date('trial_ends_at').nullable()
      table.date('canceled_at').nullable()

      table.boolean('auto_renew').defaultTo(true).notNullable()

      // Store features as JSON
      table
        .json('features')
        .notNullable()
        .defaultTo(
          JSON.stringify({
            maxVehicles: 1,
            maxTrackDays: 5,
            allowDataExport: false,
            allowDataBackup: false,
            allowApiAccess: false,
            allowTelemetryData: false,
            maxStorage: 100, // in MB
            support: 'email_only',
            prioritySupport: false,
            betaAccess: false,
            allowWidgetIntegration: false,
            allowCustomBranding: false,
            allowCustomColors: false,
            allowCustomLogos: false,
          })
        )

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
