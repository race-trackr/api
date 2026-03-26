import vine from '@vinejs/vine'

export const createMaintenanceValidator = vine.compile(
  vine.object({
    userVehicleId: vine.number().min(1),
    name: vine.string().trim().minLength(2).maxLength(200),
    date: vine.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    type: vine.enum(['maintenance', 'repair', 'modification', 'other']),
    details: vine.string().trim().maxLength(2000).optional(),
    cost: vine.number().min(0).optional(),
    mileage: vine.number().min(0).optional(),
    workshop: vine.string().trim().maxLength(200).optional(),
    nextMaintenanceDate: vine
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/)
      .optional(),
    nextMaintenanceMileage: vine.number().min(0).optional(),
  })
)

export const updateMaintenanceValidator = vine.compile(
  vine.object({
    userVehicleId: vine.number().min(1).optional(),
    name: vine.string().trim().minLength(2).maxLength(200).optional(),
    date: vine.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
    type: vine.enum(['maintenance', 'repair', 'modification', 'other']).optional(),
    details: vine.string().trim().maxLength(2000).optional(),
    cost: vine.number().min(0).optional(),
    mileage: vine.number().min(0).optional(),
    workshop: vine.string().trim().maxLength(200).optional(),
    nextMaintenanceDate: vine
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/)
      .optional(),
    nextMaintenanceMileage: vine.number().min(0).optional(),
  })
)
