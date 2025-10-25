import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'maintenances'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('user_id').unsigned().references('users.id').onDelete('CASCADE')
      table.integer('user_vehicle_id').unsigned().references('user_vehicles.id').onDelete('CASCADE')
      table.string('name').notNullable() // ex: Vidange, Changement plaquettes
      table.date('date').notNullable()
      table.enum('type', ['maintenance', 'repair', 'modification', 'other']).notNullable()
      table.text('details').nullable()
      table.decimal('cost', 10, 2).nullable()
      table.integer('mileage').nullable() // kilométrage
      table.string('workshop').nullable() // Atelier / Intervenant
      table.date('next_maintenance_date').nullable()
      table.integer('next_maintenance_mileage').nullable()
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
