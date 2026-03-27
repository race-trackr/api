import { BaseSeeder } from '@adonisjs/lucid/seeders'
import User from '#models/user'
import UserVehicle from '#models/user_vehicle'
import logger from '@adonisjs/core/services/logger'

type VehicleData = {
  name: string
  slug: string
  type: 'motorcycle' | 'car' | 'karting' | 'other'
  brand?: string | null
  model?: string | null
  year?: number | null
  licensePlate?: string | null
  details?: string | null
}

export default class extends BaseSeeder {
  static environment = ['development', 'testing']

  private async vehicleFor(email: string, data: VehicleData) {
    const user = await User.findBy('email', email)
    if (!user) return
    await UserVehicle.updateOrCreate(
      { userId: user.id, slug: data.slug },
      { ...data, userId: user.id }
    )
  }

  async run() {
    // owner@hotmail.fr — 15 vehicles
    await this.vehicleFor('owner@hotmail.fr', {
      name: 'Ferrari SF90 Stradale 2022',
      slug: 'ferrari-sf90-stradale-2022',
      type: 'car',
      brand: 'Ferrari',
      model: 'SF90 Stradale',
      year: 2022,
      licensePlate: 'OW-001-FR',
      details: '1000ch hybride, pack Assetto Fiorano, aéro carbone',
    })
    await this.vehicleFor('owner@hotmail.fr', {
      name: 'Lamborghini Huracán STO 2021',
      slug: 'lamborghini-huracan-sto-2021',
      type: 'car',
      brand: 'Lamborghini',
      model: 'Huracán STO',
      year: 2021,
      licensePlate: 'OW-002-FR',
      details: '640ch, configuration Super Trofeo Omologata, carrosserie full carbone',
    })
    await this.vehicleFor('owner@hotmail.fr', {
      name: 'McLaren 720S GT3 2022',
      slug: 'mclaren-720s-gt3-2022',
      type: 'car',
      brand: 'McLaren',
      model: '720S GT3',
      year: 2022,
      details: 'Version GT3 homologuée FIA, 550ch, boîte séquentielle Xtrac',
    })
    await this.vehicleFor('owner@hotmail.fr', {
      name: 'Porsche 911 GT3 RS 2023',
      slug: 'porsche-911-gt3-rs-2023',
      type: 'car',
      brand: 'Porsche',
      model: '911 GT3 RS',
      year: 2023,
      licensePlate: 'OW-003-FR',
      details: '525ch, pack Weissach, DRS actif, suspension PDCC Sport',
    })
    await this.vehicleFor('owner@hotmail.fr', {
      name: 'Mercedes-AMG GT3 2022',
      slug: 'mercedes-amg-gt3-2022',
      type: 'car',
      brand: 'Mercedes-AMG',
      model: 'GT3',
      year: 2022,
      details: 'Version GT3 EVO, 550ch, ABS Bosch Motorsport, DRS',
    })
    await this.vehicleFor('owner@hotmail.fr', {
      name: 'BMW M4 GT3 2021',
      slug: 'bmw-m4-gt3-2021',
      type: 'car',
      brand: 'BMW',
      model: 'M4 GT3',
      year: 2021,
      details: '590ch, boîte séquentielle 6 rapports, suspension KW Motorsport',
    })
    await this.vehicleFor('owner@hotmail.fr', {
      name: 'Aston Martin Vantage GT3 2022',
      slug: 'aston-martin-vantage-gt3-2022',
      type: 'car',
      brand: 'Aston Martin',
      model: 'Vantage GT3',
      year: 2022,
      details: '550ch V8 biturbo, boîte Xtrac séquentielle, aéro GT3 complète',
    })
    await this.vehicleFor('owner@hotmail.fr', {
      name: 'Alpine A110 GT4 2022',
      slug: 'alpine-a110-gt4-2022',
      type: 'car',
      brand: 'Alpine',
      model: 'A110 GT4',
      year: 2022,
      licensePlate: 'OW-004-FR',
      details: '300ch, boîte Getrag 7 DCT, freins AP Racing, pneus Michelin Pilot Sport GT',
    })
    await this.vehicleFor('owner@hotmail.fr', {
      name: 'Honda CBR 1000RR-R Fireblade SP 2023',
      slug: 'honda-cbr1000rr-r-fireblade-sp-2023',
      type: 'motorcycle',
      brand: 'Honda',
      model: 'CBR 1000RR-R Fireblade SP',
      year: 2023,
      licensePlate: 'OW-005-FR',
      details: '217ch, suspensions Öhlins Smart EC, système quickshifter Throttle By Wire',
    })
    await this.vehicleFor('owner@hotmail.fr', {
      name: 'Ducati Panigale V4 S 2022',
      slug: 'ducati-panigale-v4s-2022',
      type: 'motorcycle',
      brand: 'Ducati',
      model: 'Panigale V4 S',
      year: 2022,
      licensePlate: 'OW-006-FR',
      details: '214ch, suspensions Öhlins ETC, Electronic Suspension v2, kit piste Ducati Performance',
    })
    await this.vehicleFor('owner@hotmail.fr', {
      name: 'Kawasaki ZX-10RR 2022',
      slug: 'kawasaki-zx-10rr-2022',
      type: 'motorcycle',
      brand: 'Kawasaki',
      model: 'ZX-10RR',
      year: 2022,
      licensePlate: 'OW-007-FR',
      details: '214ch, kit piste Kawasaki Racing Team, suspensions Öhlins TTX, collecteur titane',
    })
    await this.vehicleFor('owner@hotmail.fr', {
      name: 'Yamaha YZF-R1M 2022',
      slug: 'yamaha-yzf-r1m-2022',
      type: 'motorcycle',
      brand: 'Yamaha',
      model: 'YZF-R1M',
      year: 2022,
      licensePlate: 'OW-008-FR',
      details: '200ch, Electronic Controlled Suspension Öhlins, kit piste YEP',
    })
    await this.vehicleFor('owner@hotmail.fr', {
      name: 'Aprilia RSV4 Factory 2023',
      slug: 'aprilia-rsv4-factory-2023',
      type: 'motorcycle',
      brand: 'Aprilia',
      model: 'RSV4 Factory',
      year: 2023,
      licensePlate: 'OW-009-FR',
      details: '217ch, semi-active suspensions, APRC Electronic Package, kit SC-Project',
    })
    await this.vehicleFor('owner@hotmail.fr', {
      name: 'KTM RC 8C 2023',
      slug: 'ktm-rc-8c-2023',
      type: 'motorcycle',
      brand: 'KTM',
      model: 'RC 8C',
      year: 2023,
      details: '140ch, édition limitée 500 unités, pneus Dunlop Sportmax GP racer slick',
    })
    await this.vehicleFor('owner@hotmail.fr', {
      name: 'Radical SR10 2023',
      slug: 'radical-sr10-2023',
      type: 'car',
      brand: 'Radical',
      model: 'SR10',
      year: 2023,
      details: '350ch, châssis tubulaire, aéro full downforce, transmission séquentielle',
    })

    logger.info(null, '✅ Véhicules créés avec succès!')
  }
}
