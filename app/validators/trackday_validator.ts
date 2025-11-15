import vine from '@vinejs/vine'

export const createTrackdayValidator = vine.compile(
  vine.object({
    name: vine.string().minLength(3).maxLength(100),
    date: vine.string().regex(/^\d{4}-\d{2}-\d{2}$/), // YYYY-MM-DD format
    location: vine.string().minLength(3).maxLength(100).optional(),
    description: vine.string().optional(),
  })
)

export const updateTrackdayValidator = vine.compile(
  vine.object({
    name: vine.string().minLength(3).maxLength(100).optional(),
    date: vine
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/)
      .optional(), // YYYY-MM-DD format
    location: vine.string().minLength(3).maxLength(100).optional(),
    description: vine.string().optional(),
  })
)
