import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'
import { api } from '../api.js'

const AuthController = () => import('#controllers/auth_controller')
const CountriesController = () => import('#controllers/countries_controller')
const TracksController = () => import('#controllers/tracks_controller')
const UserVehiclesController = () => import('#controllers/user_vehicles_controller')
const TrackDaysController = () => import('#controllers/track_days_controller')
const MaintenancesController = () => import('#controllers/maintenances_controller')

router.get('/', async ({ response }) => {
  return response.json({
    name: 'Race Trackr API',
    version: '1.0.0',
    description: 'API de gestion de journées piste et maintenance de véhicules',
    documentation: '/api',
  })
})

router.get('/api/v1', async ({ response }) => {
  return response.json(api)
})

// Routes publiques
router
  .group(() => {
    // Auth
    router.post('/auth/register', [AuthController, 'register'])
    router.post('/auth/login', [AuthController, 'login'])

    // Consultation publique des circuits et pays
    router.get('/countries', [CountriesController, 'index'])
    router.get('/countries/:id', [CountriesController, 'show'])
    router.get('/tracks', [TracksController, 'index'])
    router.get('/tracks/:id', [TracksController, 'show'])
  })
  .prefix('/api/v1')

// Routes protégées
router
  .group(() => {
    // Auth
    router.post('/auth/logout', [AuthController, 'logout'])
    router.get('/auth/me', [AuthController, 'me'])

    // Véhicules utilisateur
    router.resource('vehicles', UserVehiclesController).apiOnly()

    // Journées piste
    router.resource('trackdays', TrackDaysController).apiOnly()

    // Maintenances
    router.resource('maintenances', MaintenancesController).apiOnly()
  })
  .prefix('/api/v1')
  .use(middleware.auth())

router
  .group(() => {
    // Administration des circuits (owner uniquement)
    router.post('/tracks', [TracksController, 'store'])
    router.put('/tracks/:id', [TracksController, 'update'])
    router.delete('/tracks/:id', [TracksController, 'destroy'])

    // Administration des pays (owner uniquement)
    router.post('/countries', [CountriesController, 'store'])
    router.put('/countries/:id', [CountriesController, 'update'])
    router.delete('/countries/:id', [CountriesController, 'destroy'])
  })
  .prefix('/api/v1')
  .use([middleware.auth(), middleware.role({ roles: ['owner'] })])
