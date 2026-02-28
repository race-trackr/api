import { BaseSchema } from '@adonisjs/lucid/schema'

export default class AddUserPreferences extends BaseSchema {
  protected tableName = 'users'

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      // JSON column to store arbitrary user preferences (notification settings, marketing opt-ins, etc.)
      // Using jsonb for Postgres; adapt to your DB if needed.
      table.jsonb('preferences').nullable()
    })
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('preferences')
    })
  }
}
