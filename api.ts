export const api = {
  name: 'Race Trackr API',
  version: '1.0.0',
  description: 'API de gestion de journées piste et maintenance de véhicules',
  baseUrl: '/api',

  endpoints: {
    authentication: {
      register: {
        method: 'POST',
        path: '/api/auth/register',
        description: 'Créer un nouveau compte utilisateur',
        auth: false,
        body: {
          email: 'string (required)',
          password: 'string (required)',
          fullName: 'string (required)',
        },
        response: {
          user: { id: 'number', email: 'string', fullName: 'string', isAdmin: 'boolean' },
          token: 'string',
        },
      },
      login: {
        method: 'POST',
        path: '/api/auth/login',
        description: 'Se connecter avec email et mot de passe',
        auth: false,
        body: {
          email: 'string (required)',
          password: 'string (required)',
        },
        response: {
          user: { id: 'number', email: 'string', fullName: 'string', isAdmin: 'boolean' },
          token: 'string',
        },
      },
      logout: {
        method: 'POST',
        path: '/api/auth/logout',
        description: 'Se déconnecter et invalider le token',
        auth: true,
        response: { message: 'string' },
      },
      me: {
        method: 'GET',
        path: '/api/auth/me',
        description: "Récupérer les informations de l'utilisateur connecté",
        auth: true,
        response: {
          id: 'number',
          email: 'string',
          fullName: 'string',
          isAdmin: 'boolean',
          avatar: 'string|null',
        },
      },
    },

    countries: {
      list: {
        method: 'GET',
        path: '/api/countries',
        description: 'Liste tous les pays',
        auth: false,
        response: '[{ id, name, slug, iso, timezone, capital, createdAt, updatedAt }]',
      },
      show: {
        method: 'GET',
        path: '/api/countries/:id',
        description: "Détails d'un pays avec ses circuits",
        auth: false,
        response: '{ id, name, slug, iso, timezone, capital, tracks: [...], createdAt, updatedAt }',
      },
      create: {
        method: 'POST',
        path: '/api/countries',
        description: 'Créer un nouveau pays',
        auth: true,
        admin: true,
        body: {
          name: 'string (required)',
          slug: 'string (required)',
          iso: 'string (required, 2 chars)',
          timezone: 'string (required)',
          capital: 'string (required)',
        },
      },
      update: {
        method: 'PUT',
        path: '/api/countries/:id',
        description: 'Modifier un pays',
        auth: true,
        admin: true,
        body: {
          name: 'string',
          slug: 'string',
          iso: 'string',
          timezone: 'string',
          capital: 'string',
        },
      },
      delete: {
        method: 'DELETE',
        path: '/api/countries/:id',
        description: 'Supprimer un pays',
        auth: true,
        admin: true,
        response: '204 No Content',
      },
    },

    tracks: {
      list: {
        method: 'GET',
        path: '/api/tracks',
        description: 'Liste tous les circuits',
        auth: false,
        queryParams: {
          country_id: 'number (optional) - Filtrer par pays',
        },
        response:
          '[{ id, name, slug, city, countryId, address, turns, length, width, maxDb, bestLapTime, bestLapTimePilot, description, country: {...}, createdAt, updatedAt }]',
      },
      show: {
        method: 'GET',
        path: '/api/tracks/:id',
        description: "Détails d'un circuit",
        auth: false,
        response:
          '{ id, name, slug, city, countryId, address, turns, length, width, maxDb, bestLapTime, bestLapTimePilot, description, country: {...}, createdAt, updatedAt }',
      },
      create: {
        method: 'POST',
        path: '/api/tracks',
        description: 'Créer un nouveau circuit',
        auth: true,
        admin: true,
        body: {
          name: 'string (required)',
          slug: 'string (required)',
          city: 'string (required)',
          countryId: 'number (required)',
          address: 'string (optional)',
          turns: 'number (required)',
          length: 'number (required, en km)',
          width: 'number (optional, en mètres)',
          maxDb: 'number (optional)',
          bestLapTime: 'string (optional, format: 1:23.456)',
          bestLapTimePilot: 'string (optional)',
          description: 'string (optional)',
        },
      },
      update: {
        method: 'PUT',
        path: '/api/tracks/:id',
        description: 'Modifier un circuit',
        auth: true,
        admin: true,
        body: '(mêmes champs que create)',
      },
      delete: {
        method: 'DELETE',
        path: '/api/tracks/:id',
        description: 'Supprimer un circuit',
        auth: true,
        admin: true,
        response: '204 No Content',
      },
    },

    vehicles: {
      list: {
        method: 'GET',
        path: '/api/vehicles',
        description: "Liste les véhicules de l'utilisateur connecté",
        auth: true,
        response:
          '[{ id, userId, name, slug, type, brand, model, year, licensePlate, details, photo, createdAt, updatedAt }]',
      },
      show: {
        method: 'GET',
        path: '/api/vehicles/:id',
        description: "Détails d'un véhicule avec ses track days et maintenances",
        auth: true,
        response:
          '{ id, userId, name, slug, type, brand, model, year, licensePlate, details, photo, trackDays: [...], maintenances: [...], createdAt, updatedAt }',
      },
      create: {
        method: 'POST',
        path: '/api/vehicles',
        description: 'Créer un nouveau véhicule',
        auth: true,
        body: {
          name: 'string (required)',
          slug: 'string (required)',
          type: 'enum (required): Moto, Voiture, Karting, Autre',
          brand: 'string (optional)',
          model: 'string (optional)',
          year: 'number (optional)',
          licensePlate: 'string (optional)',
          details: 'string (optional)',
          photo: 'string (optional)',
        },
      },
      update: {
        method: 'PUT',
        path: '/api/vehicles/:id',
        description: 'Modifier un véhicule',
        auth: true,
        body: '(mêmes champs que create)',
      },
      delete: {
        method: 'DELETE',
        path: '/api/vehicles/:id',
        description: 'Supprimer un véhicule',
        auth: true,
        response: '204 No Content',
      },
    },

    trackDays: {
      list: {
        method: 'GET',
        path: '/api/track-days',
        description: "Liste les journées piste de l'utilisateur",
        auth: true,
        queryParams: {
          track_id: 'number (optional) - Filtrer par circuit',
          vehicle_id: 'number (optional) - Filtrer par véhicule',
        },
        response:
          '[{ id, userId, trackId, userVehicleId, date, weather, airTemperature, trackTemperature, trackCondition, note, bestLapTime, totalLaps, totalDistance, track: {...}, vehicle: {...}, createdAt, updatedAt }]',
      },
      show: {
        method: 'GET',
        path: '/api/track-days/:id',
        description: "Détails d'une journée piste avec tous les tests",
        auth: true,
        response:
          '{ id, userId, trackId, userVehicleId, date, weather, airTemperature, trackTemperature, trackCondition, note, bestLapTime, totalLaps, totalDistance, track: {...}, vehicle: {...}, createdAt, updatedAt }',
      },
      create: {
        method: 'POST',
        path: '/api/track-days',
        description: 'Créer une nouvelle journée piste',
        auth: true,
        body: {
          trackId: 'number (required)',
          userVehicleId: 'number (optional)',
          date: 'date (required, format: YYYY-MM-DD)',
          weather: 'string (required)',
          airTemperature: 'number (optional, en °C)',
          trackTemperature: 'number (optional, en °C)',
          trackCondition: 'string (optional): Sec, Humide, Mouillé',
          note: 'string (optional)',
          bestLapTime: 'string (optional, format: 1:23.456)',
          totalLaps: 'number (optional)',
          totalDistance: 'number (optional, en km)',
          tests: 'array (optional): [{ category, parameter, value, lapTime, feedback, position }]',
        },
      },
      update: {
        method: 'PUT',
        path: '/api/track-days/:id',
        description: 'Modifier une journée piste',
        auth: true,
        body: '(mêmes champs que create)',
      },
      delete: {
        method: 'DELETE',
        path: '/api/track-days/:id',
        description: 'Supprimer une journée piste',
        auth: true,
        response: '204 No Content',
      },
    },

    maintenances: {
      list: {
        method: 'GET',
        path: '/api/maintenances',
        description: "Liste les maintenances de l'utilisateur",
        auth: true,
        queryParams: {
          vehicle_id: 'number (optional) - Filtrer par véhicule',
        },
        response:
          '[{ id, userId, userVehicleId, name, date, type, details, cost, mileage, workshop, nextMaintenanceDate, nextMaintenanceMileage, vehicle: {...}, createdAt, updatedAt }]',
      },
      show: {
        method: 'GET',
        path: '/api/maintenances/:id',
        description: "Détails d'une maintenance",
        auth: true,
        response:
          '{ id, userId, userVehicleId, name, date, type, details, cost, mileage, workshop, nextMaintenanceDate, nextMaintenanceMileage, vehicle: {...}, createdAt, updatedAt }',
      },
      create: {
        method: 'POST',
        path: '/api/maintenances',
        description: 'Créer une nouvelle maintenance',
        auth: true,
        body: {
          userVehicleId: 'number (required)',
          name: 'string (required)',
          date: 'date (required, format: YYYY-MM-DD)',
          type: 'string (required): Entretien, Réparation, Modification, Autre',
          details: 'string (optional)',
          cost: 'number (optional)',
          mileage: 'number (optional)',
          workshop: 'string (optional)',
          nextMaintenanceDate: 'date (optional)',
          nextMaintenanceMileage: 'number (optional)',
        },
      },
      update: {
        method: 'PUT',
        path: '/api/maintenances/:id',
        description: 'Modifier une maintenance',
        auth: true,
        body: '(mêmes champs que create)',
      },
      delete: {
        method: 'DELETE',
        path: '/api/maintenances/:id',
        description: 'Supprimer une maintenance',
        auth: true,
        response: '204 No Content',
      },
    },
  },

  authentication: {
    type: 'Bearer Token',
    header: 'Authorization: Bearer YOUR_TOKEN_HERE',
    description: 'Utilisez le token retourné lors du login ou register',
  },

  errorCodes: {
    400: 'Bad Request - Données invalides',
    401: 'Unauthorized - Token manquant ou invalide',
    403: 'Forbidden - Accès refusé (admin requis)',
    404: 'Not Found - Ressource introuvable',
    422: 'Unprocessable Entity - Validation échouée',
    500: 'Internal Server Error - Erreur serveur',
  },
}
