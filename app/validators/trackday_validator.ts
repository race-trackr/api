import vine from '@vinejs/vine'

export const createTrackdayValidator = vine.compile(
  vine.object({
    trackId: vine.number().min(1),
    userVehicleId: vine.number().min(1).optional(),
    date: vine.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    weather: vine.enum(['clear', 'cloudy', 'rainy']).optional(),
    airTemperature: vine.number().optional(),
    trackTemperature: vine.number().optional(),
    trackCondition: vine.enum(['wet', 'dry', 'moist']).optional(),
    notes: vine.string().trim().maxLength(2000).optional(),
    bestLapTime: vine.string().trim().maxLength(20).optional(),
    totalLaps: vine.number().min(0).optional(),
    totalDistance: vine.number().min(0).optional(),
  })
)

export const updateTrackdayValidator = vine.compile(
  vine.object({
    trackId: vine.number().min(1).optional(),
    userVehicleId: vine.number().min(1).optional(),
    date: vine.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
    weather: vine.enum(['clear', 'cloudy', 'rainy']).optional(),
    airTemperature: vine.number().optional(),
    trackTemperature: vine.number().optional(),
    trackCondition: vine.enum(['wet', 'dry', 'moist']).optional(),
    notes: vine.string().trim().maxLength(2000).optional(),
    bestLapTime: vine.string().trim().maxLength(20).optional(),
    totalLaps: vine.number().min(0).optional(),
    totalDistance: vine.number().min(0).optional(),
    chronos: vine
      .array(
        vine.object({
          lapTime: vine.string().trim().maxLength(20),
          isBest: vine.boolean().optional(),
        })
      )
      .optional(),
  })
)
