import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'maintenances'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('next_maintenance_date')
    })
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.date('next_maintenance_date').nullable()
    })
  }
}
