import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'user_vehicles'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('user_id').unsigned().references('users.id').onDelete('CASCADE')
      table.string('name').notNullable()
      table.string('slug').notNullable()
      table.enum('type', ['bike', 'car', 'karting', 'other']).notNullable()
      table.string('brand').nullable()
      table.string('model').nullable()
      table.integer('year').nullable()
      table.string('license_plate').nullable()
      table.text('details').nullable()
      table.timestamp('created_at')
      table.timestamp('updated_at')

      table.unique(['user_id', 'slug'])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
