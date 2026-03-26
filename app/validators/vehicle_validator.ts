import vine from '@vinejs/vine'

export const createVehicleValidator = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(2).maxLength(100),
    type: vine.enum(['motorcycle', 'car', 'karting', 'other']),
    brand: vine.string().trim().maxLength(100).optional(),
    model: vine.string().trim().maxLength(100).optional(),
    year: vine
      .number()
      .min(1900)
      .max(new Date().getFullYear() + 1)
      .optional(),
    licensePlate: vine.string().trim().maxLength(20).optional(),
    details: vine.string().trim().maxLength(2000).optional(),
  })
)

export const updateVehicleValidator = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(2).maxLength(100).optional(),
    type: vine.enum(['motorcycle', 'car', 'karting', 'other']).optional(),
    brand: vine.string().trim().maxLength(100).optional(),
    model: vine.string().trim().maxLength(100).optional(),
    year: vine
      .number()
      .min(1900)
      .max(new Date().getFullYear() + 1)
      .optional(),
    licensePlate: vine.string().trim().maxLength(20).optional(),
    details: vine.string().trim().maxLength(2000).optional(),
  })
)
