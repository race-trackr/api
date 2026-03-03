import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'
import { api } from '../api.js'

const AuthController = () => import('#controllers/auth_controller')
const CountriesController = () => import('#controllers/countries_controller')
const TracksController = () => import('#controllers/tracks_controller')
const UserVehiclesController = () => import('#controllers/user_vehicles_controller')
const TrackDaysController = () => import('#controllers/track_days_controller')
const MaintenancesController = () => import('#controllers/maintenances_controller')
const UserController = () => import('#controllers/user_controller')
const AdminUsersController = () => import('#controllers/admin_users_controller')
const MailerController = () => import('#controllers/mailer_controller')

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
    router.resource('countries', CountriesController).apiOnly().only(['index', 'show'])
    router.resource('tracks', TracksController).apiOnly().only(['index', 'show'])
  })
  .prefix('/api/v1')

// Routes protégées
router
  .group(() => {
    // Auth
    router.post('/auth/logout', [AuthController, 'logout'])

    // User
    router.get('/users/me', [UserController, 'me'])
    router.put('/users/me', [UserController, 'update'])
    router.delete('/users/me', [UserController, 'delete'])

    // Véhicules utilisateur
    router.resource('vehicles', UserVehiclesController).apiOnly()

    // Journées piste
    router.resource('trackdays', TrackDaysController).apiOnly()

    // Maintenances
    router.resource('maintenances', MaintenancesController).apiOnly()
  })
  .prefix('/api/v1')
  .use(middleware.auth())

// routes requiring authentication + role checks

// Admin/owner – management of tracks & countries
// Note: owner role is granted "super admin" privileges in the UI, so we
// allow both admin and owner here (the original comment mentioned owner
// only but the middleware was restricting to admin).
router
  .group(() => {
    // Administration des circuits
    router.post('/tracks', [TracksController, 'store'])
    router.put('/tracks/:id', [TracksController, 'update'])
    router.delete('/tracks/:id', [TracksController, 'destroy'])

    // Administration des pays
    router.post('/countries', [CountriesController, 'store'])
    router.put('/countries/:id', [CountriesController, 'update'])
    router.delete('/countries/:id', [CountriesController, 'destroy'])
  })
  .prefix('/api/v1')
  .use([middleware.auth(), middleware.role({ roles: ['admin', 'owner'] })])

// OWNER‑ONLY administration routes (accessible solely by the owner role)
router
  .group(() => {
    router.get('/admin/users', [AdminUsersController, 'index'])
    router.get('/admin/users/:id', [AdminUsersController, 'show'])
    router.put('/admin/users/:id', [AdminUsersController, 'update'])
    router.delete('/admin/users/:id', [AdminUsersController, 'destroy'])

    router.post('/admin/mailer/send', [MailerController, 'send'])
  })
  .prefix('/api/v1')
  .use([middleware.auth(), middleware.role({ roles: ['owner'] })])
