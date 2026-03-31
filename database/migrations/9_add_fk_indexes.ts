import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  async up() {
    this.schema.table('user_vehicles', (table) => {
      table.index('user_id', 'user_vehicles_user_id_idx')
    })

    this.schema.table('track_days', (table) => {
      table.index('user_id', 'track_days_user_id_idx')
      table.index('track_id', 'track_days_track_id_idx')
      table.index('user_vehicle_id', 'track_days_user_vehicle_id_idx')
    })

    this.schema.table('maintenances', (table) => {
      table.index('user_id', 'maintenances_user_id_idx')
      table.index('user_vehicle_id', 'maintenances_user_vehicle_id_idx')
    })
  }

  async down() {
    this.schema.table('user_vehicles', (table) => {
      table.dropIndex('user_id', 'user_vehicles_user_id_idx')
    })

    this.schema.table('track_days', (table) => {
      table.dropIndex('user_id', 'track_days_user_id_idx')
      table.dropIndex('track_id', 'track_days_track_id_idx')
      table.dropIndex('user_vehicle_id', 'track_days_user_vehicle_id_idx')
    })

    this.schema.table('maintenances', (table) => {
      table.dropIndex('user_id', 'maintenances_user_id_idx')
      table.dropIndex('user_vehicle_id', 'maintenances_user_vehicle_id_idx')
    })
  }
}
