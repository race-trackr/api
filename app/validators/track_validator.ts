import vine from '@vinejs/vine'

export const createTrackValidator = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(2).maxLength(200),
    slug: vine.string().trim().minLength(2).maxLength(200).optional(),
    city: vine.string().trim().minLength(2).maxLength(100),
    countryId: vine.number().min(1),
    address: vine.string().trim().maxLength(300).optional(),
    turns: vine.string().trim().maxLength(20).optional(),
    length: vine.number().min(0).optional(),
    width: vine.number().min(0).optional(),
    maxDb: vine.number().min(0).optional(),
    bestLapTime: vine.string().trim().maxLength(20).optional(),
    bestLapTimePilot: vine.string().trim().maxLength(100).optional(),
    description: vine.string().trim().maxLength(2000).optional(),
  })
)

export const updateTrackValidator = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(2).maxLength(200).optional(),
    slug: vine.string().trim().minLength(2).maxLength(200).optional(),
    city: vine.string().trim().minLength(2).maxLength(100).optional(),
    countryId: vine.number().min(1).optional(),
    address: vine.string().trim().maxLength(300).optional(),
    turns: vine.string().trim().maxLength(20).optional(),
    length: vine.number().min(0).optional(),
    width: vine.number().min(0).optional(),
    maxDb: vine.number().min(0).optional(),
    bestLapTime: vine.string().trim().maxLength(20).optional(),
    bestLapTimePilot: vine.string().trim().maxLength(100).optional(),
    description: vine.string().trim().maxLength(2000).optional(),
  })
)
