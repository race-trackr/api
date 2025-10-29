import Country from '#models/country'
import Track from '#models/track'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  static environment = ['development', 'testing']

  async run() {
    const france = await Country.findBy('slug', 'france')
    if (!france) {
      throw new Error('Country France not found. Please run CountrySeeder first.')
    }
    const espagne = await Country.findBy('slug', 'espagne')
    if (!espagne) {
      throw new Error('Country Espagne not found. Please run CountrySeeder first.')
    }
    const italie = await Country.findBy('slug', 'italie')
    if (!italie) {
      throw new Error('Country Italie not found. Please run CountrySeeder first.')
    }
    const amerique = await Country.findBy('slug', 'amerique')
    if (!amerique) {
      throw new Error('Country Amerique not found. Please run CountrySeeder first.')
    }
    const allemagne = await Country.findBy('slug', 'allemagne')
    if (!allemagne) {
      throw new Error('Country Allemagne not found. Please run CountrySeeder first.')
    }
    const portugal = await Country.findBy('slug', 'portugal')
    if (!portugal) {
      throw new Error('Country Portugal not found. Please run CountrySeeder first.')
    }
    const qatar = await Country.findBy('slug', 'qatar')
    if (!qatar) {
      throw new Error('Country Qatar not found. Please run CountrySeeder first.')
    }
    const malaisie = await Country.findBy('slug', 'malaisie')
    if (!malaisie) {
      throw new Error('Country Malaisie not found. Please run CountrySeeder first.')
    }
    const paysBas = await Country.findBy('slug', 'pays-bas')
    if (!paysBas) {
      throw new Error('Country Pays-Bas not found. Please run CountrySeeder first.')
    }
    const angleterre = await Country.findBy('slug', 'angleterre')
    if (!angleterre) {
      throw new Error('Country Angleterre not found. Please run CountrySeeder first.')
    }
    const autriche = await Country.findBy('slug', 'autriche')
    if (!autriche) {
      throw new Error('Country Autriche not found. Please run CountrySeeder first.')
    }
    const indonesie = await Country.findBy('slug', 'indonesie')
    if (!indonesie) {
      throw new Error('Country Indonesie not found. Please run CountrySeeder first.')
    }
    const japon = await Country.findBy('slug', 'japon')
    if (!japon) {
      throw new Error('Country Japon not found. Please run CountrySeeder first.')
    }
    const australie = await Country.findBy('slug', 'australie')
    if (!australie) {
      throw new Error('Country Australie not found. Please run CountrySeeder first.')
    }
    const thailande = await Country.findBy('slug', 'thailand')
    if (!thailande) {
      throw new Error('Country Thailande not found. Please run CountrySeeder first.')
    }

    await Track.createMany([
      {
        name: 'Nogaro',
        slug: 'nogaro',
        countryId: france.id,
        city: 'Nogaro',
        address: "Av. de l'Autodrome, 32110 Nogaro, France",
        length: '3.636',
        turns: '14 (5 à gauche et 9 à droite)',
        bestLapTime: '1.20.160',
        bestLapTimePilot: 'Alessandro Zanardi',
        width: 9.5,
        maxDb: 102,
        description: '6600 m2 de bâtiments couverts',
      },
      {
        name: 'Pau Arnos',
        slug: 'pau-arnos',
        countryId: france.id,
        city: 'Arnos',
        address: 'Circuit Arnos, Petrou, 64370 Arnos, France',
        length: '3.030',
        turns: '12 (7 à droite et 5 à gauche)',
        bestLapTime: '1.10.870',
        bestLapTimePilot: 'Giedo Van der Garde',
        width: '9 a 12',
        maxDb: 102,
        description:
          '1 tracé principal de 3 030 mètres (5 tracés dérivés de 3 030 mètres & 600 mètres), circuit de karting',
      },
      {
        name: 'Navarra',
        slug: 'navarra',
        countryId: espagne.id,
        city: 'Los Arcos',
        address: 'Calle Malvasia 5, 31210 Los Arcos Spain',
        turns: '15 (7 à droite et 5 à gauche)',
        length: '3.933',
        bestLapTime: '1.38.417',
        bestLapTimePilot: 'Cauvin Dominique',
        width: '9 a 12',
        maxDb: 102,
        description: 'Restaurant sur place, circuit de karting',
      },
      {
        name: 'Motorland Aràgon',
        slug: 'motorland-aragon',
        countryId: espagne.id,
        city: 'Alcañiz',
        address: 'Crta, A-2404, km 1, 44600 Alcaniz Spain',
        turns: '17 (7 à droite et 10 à gauche)',
        length: '5.078',
        bestLapTime: '1.38.976',
        bestLapTimePilot: 'Raffaele Marciello',
        width: 15,
        maxDb: 102,
        description: 'Restaurant sur place, circuit de karting',
      },
      {
        name: 'Alcarras',
        slug: 'alcarras',
        countryId: espagne.id,
        city: 'Alcarras',
        address: 'km, Av. de Valmanya, 13, 25180 Alcarràs, Lleida, Spain',
        turns: '14 (10 à gauche, 4 à droite)',
        length: '3.743',
        width: '14 a 15',
        maxDb: 102,
        description: 'Circuit de karting (1km17, 13 virages 8 à gauche, 5 à droite)',
      },
      {
        name: 'Jerez',
        slug: 'jerez',
        countryId: espagne.id,
        city: 'Jerez',
        address:
          'Carretera de Arcos-Jerez de la Frontera, Km 10, 11405 Jerez de la Frontera, Cádiz, Espagne',
        turns: '13 (5 à gauche, 8 à droite)',
        length: '4.428',
        bestLapTime: '1.15.650',
        bestLapTimePilot: 'Michael Schumacher',
        width: '14 a 15',
      },
      {
        name: 'Calafat',
        slug: 'calafat',
        countryId: espagne.id,
        city: 'Calafat',
        address: 'Urb. Calafat, Circuit, 43860 Calafat, Tarragona, Espagne',
        turns: '19',
        length: '3.250',
        width: '14 a 15',
      },
      {
        name: 'Dijon',
        slug: 'dijon',
        countryId: france.id,
        city: 'Dijon',
        address: '',
        turns: '16 (6 à gauche, 10 à droite)',
        length: '5.250',
        width: 14,
      },
      {
        name: 'Misano',
        slug: 'misano',
        countryId: italie.id,
        city: 'Misano',
        address: '',
        turns: '16 (6 à gauche, 10 à droite)',
        length: '4.230',
        width: 12,
      },
      {
        name: 'Autodromo Internazionale del Mugello',
        slug: 'autodromo-internazionale-del-mugello',
        countryId: italie.id,
        city: 'Mugello',
        address: '',
        turns: '15 (6 à gauche, 9 à droite)',
        length: '5.250',
        width: 14,
      },
      {
        name: 'Magny Cours',
        slug: 'magny-cours',
        countryId: france.id,
        city: 'Magny Cours',
        address: '',
        turns: '16 (6 à gauche, 10 à droite)',
        length: '5.250',
        width: 14,
      },
      {
        name: 'Ales',
        slug: 'ales',
        countryId: france.id,
        city: 'Ales',
        address: '',
        turns: '15 (6 à gauche, 9 à droite)',
        length: '4.250',
        width: 12,
      },
      {
        name: 'Lusail International Circuit',
        slug: 'lusail-international-circuit',
        countryId: qatar.id,
        city: '',
        address: '',
        turns: '16 (6 à gauche, 10 à droite)',
        length: '5.380',
        width: 12,
      },
      {
        name: 'Portimão - Autódromo Internacional do Algarve',
        slug: 'portimao-autodromo-internacional-do-algarve',
        countryId: portugal.id,
        city: '',
        address: '',
        turns: '15 (6 à gauche, 9 à droite)',
        length: '4.590',
        width: 18,
      },
      {
        name: 'Circuit Of The Americas',
        slug: 'circuit-of-the-americas',
        countryId: amerique.id,
        city: '',
        address: '',
        turns: '20 (11 à gauche, 9 à droite)',
        length: '5.510',
        width: 15,
      },
      {
        name: 'Circuito de Jerez - Ángel Nieto',
        slug: 'circuito-de-jerez-angel-nieto',
        countryId: espagne.id,
        city: 'Jerez',
        address: '',
        turns: '13 (5 à gauche, 8 à droite)',
        length: '4.620',
        width: 11,
      },
      {
        name: 'Le Mans',
        slug: 'le-mans',
        countryId: france.id,
        city: 'Le Mans',
        address: '',
        turns: '14 (5 à gauche, 9 à droite)',
        length: '4.190',
        width: 13,
      },
      {
        name: 'Circuit de Barcelona-Catalunya',
        slug: 'circuit-de-barcelona-catalunya',
        countryId: espagne.id,
        city: 'Barcelona',
        address: '',
        turns: '14 (6 à gauche, 8 à droite)',
        length: '4.660',
        width: 12,
      },
      {
        name: 'TT Circuit Assen',
        slug: 'tt-circuit-assen',
        countryId: paysBas.id,
        city: 'Assen',
        address: '',
        turns: '18 (6 à gauche, 12 à droite)',
        length: '4.542',
        width: 14,
      },
      {
        name: 'Sachsenring',
        slug: 'sachsenring',
        countryId: allemagne.id,
        city: 'Hohenstein-Ernstthal',
        address: '',
        turns: '13 (10 à gauche, 3 à droite)',
        length: '3.671',
        width: 12,
      },
      {
        name: 'Silverstone Circuit',
        slug: 'silverstone-circuit',
        countryId: angleterre.id,
        city: 'Silverstone',
        address: '',
        turns: '18 (8 à gauche, 10 à droite)',
        length: '5.891',
        width: 15,
      },
      {
        name: 'Red Bull Ring',
        slug: 'red-bull-ring',
        countryId: autriche.id,
        city: 'Spielberg',
        address: '',
        turns: '11 (3 à gauche, 8 à droite)',
        length: '4.350',
        width: 12,
      },
      {
        name: 'Mandalika International Street Circuit',
        slug: 'mandalika-international-street-circuit',
        countryId: indonesie.id,
        city: 'Kuta Mandalika',
        address: '',
        turns: '17 (6 à gauche, 11 à droite)',
        length: '4.300',
        width: 15,
      },
      {
        name: 'Motegi Twin Ring',
        slug: 'motegi-twin-ring',
        countryId: japon.id,
        city: 'Motegi',
        address: '',
        turns: '14 (6 à gauche, 8 à droite)',
        length: '4.801',
        width: 15,
      },
      {
        name: 'Phillip Island',
        slug: 'phillip-island',
        countryId: australie.id,
        city: 'Phillip Island',
        address: '',
        turns: '12 (5 à gauche, 7 à droite)',
        length: '4.445',
        width: 13,
      },
      {
        name: 'Chang International Circuit',
        slug: 'chang-international-circuit',
        countryId: thailande.id,
        city: 'Buriram',
        address: '',
        turns: '12 (5 à gauche, 7 à droite)',
        length: '4.554',
        width: 12,
      },
      {
        name: 'Petronas Sepang International Circuit',
        slug: 'petronas-sepang-international-circuit',
        countryId: malaisie.id,
        city: 'Sepang',
        address: '',
        turns: '15 (5 à gauche, 10 à droite)',
        length: '5.543',
        width: 16,
      },
      {
        name: 'Circuit Ricardo Tormo',
        slug: 'circuit-ricardo-tormo',
        countryId: espagne.id,
        city: 'Valencia',
        address: 'Salida, Autovía del Este, 334, 46380 Cheste, Valencia, Espagne',
        turns: '14 (9 à gauche, 5 à droite)',
        length: '4.005',
        width: 12,
        maxDb: 118,
        bestLapTime: '1:29.401',
      },
      {
        name: 'Circuit Paul Ricard',
        slug: 'circuit-paul-ricard',
        countryId: france.id,
        city: 'Le Castellet',
        address: 'Le Castellet, 83330 Le Castellet, France',
        turns: '15 (6 à gauche, 9 à droite)',
        length: '5.800',
        width: 12,
        maxDb: 118,
        bestLapTime: '1:32.740',
      },
    ])
  }
}
