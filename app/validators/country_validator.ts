import vine from '@vinejs/vine'

export const createCountryValidator = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(2).maxLength(100),
    slug: vine.string().trim().minLength(2).maxLength(100).optional(),
    iso: vine.string().trim().minLength(2).maxLength(3),
    timezone: vine.string().trim().maxLength(100).optional(),
    capital: vine.string().trim().maxLength(100).optional(),
  })
)

export const updateCountryValidator = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(2).maxLength(100).optional(),
    slug: vine.string().trim().minLength(2).maxLength(100).optional(),
    iso: vine.string().trim().minLength(2).maxLength(3).optional(),
    timezone: vine.string().trim().maxLength(100).optional(),
    capital: vine.string().trim().maxLength(100).optional(),
  })
)
