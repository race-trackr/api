import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'track_days'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('user_id').unsigned().references('users.id').onDelete('CASCADE')
      table.integer('track_id').unsigned().references('tracks.id').onDelete('CASCADE')
      table
        .integer('user_vehicle_id')
        .unsigned()
        .references('user_vehicles.id')
        .onDelete('SET NULL')
        .nullable()
      table.date('date').notNullable()
      table.enum('weather', ['clear', 'cloudy', 'rainy']).nullable()
      table.integer('air_temperature').nullable() // en °C
      table.integer('track_temperature').nullable() // en °C
      table.enum('track_condition', ['wet', 'dry', 'moist']).nullable()
      table.text('notes').nullable()
      table.string('best_lap_time').nullable()
      table.integer('total_laps').nullable()
      table.decimal('total_distance', 8, 2).nullable() // en km
      table.json('chronos').nullable()
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
