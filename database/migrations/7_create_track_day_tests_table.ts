import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'track_day_tests'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('track_day_id').unsigned().references('track_days.id').onDelete('CASCADE')
      table
        .enum('category', ['tires', 'suspension', 'brakes', 'engine', 'electronics', 'other'])
        .notNullable()
      table
        .enum('parameter', ['front_pressure', 'rear_pressure', 'fork_compression', 'other'])
        .notNullable()
      table.string('value').notNullable()
      table.string('lap_time').nullable()
      table.text('feedback').nullable()
      table.integer('position').nullable()
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
