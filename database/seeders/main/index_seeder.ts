import { BaseSeeder } from '@adonisjs/lucid/seeders'
import app from '@adonisjs/core/services/app'

export default class IndexSeeder extends BaseSeeder {
  private async seed(Seeder: { default: typeof BaseSeeder }) {
    if (
      !Seeder.default.environment ||
      (!Seeder.default.environment.includes('development') && app.inDev) ||
      (!Seeder.default.environment.includes('testing') && app.inTest) ||
      (!Seeder.default.environment.includes('production') && app.inProduction)
    ) {
      return
    }

    await new Seeder.default(this.client).run()
  }

  async run() {
    await this.seed(await import('../country_seeder.js'))
    await this.seed(await import('../user_seeder.js'))
    await this.seed(await import('../track_seeder.js'))
    await this.seed(await import('../trackday_seeder.js'))
    await this.seed(await import('../maintenance_seeder.js'))
  }
}
