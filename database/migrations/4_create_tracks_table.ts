import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'tracks'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name').notNullable()
      table.string('slug').notNullable().unique()
      table.string('city').notNullable()
      table.integer('country_id').unsigned().references('countries.id').onDelete('CASCADE')
      table.text('address').nullable()
      table.string('turns').nullable()
      table.decimal('length', 8, 3).notNullable() // en km
      table.string('width').nullable() // en mètre, peut être une fourchette (ex: "9 à 12")
      table.integer('max_db').nullable() // niveau sonore maximum
      table.string('best_lap_time').nullable() // format: "1:23.456"
      table.string('best_lap_time_pilot').nullable()
      table.text('description').nullable()
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
