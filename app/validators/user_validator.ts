import vine from '@vinejs/vine'

export const updateUserValidator = vine.compile(
  vine.object({
    email: vine
      .string()
      .email()
      .normalizeEmail()
      .unique(async (db, value, field) => {
        const user = await db
          .from('users')
          .where('email', value)
          .whereNot('id', field.meta.userId)
          .first()
        return !user
      })
      .optional(),
    firstName: vine.string().optional(),
    lastName: vine.string().optional(),
    countryId: vine.number().optional(),
    role: vine.enum(['owner', 'user']).optional(),
    preferences: vine.record(vine.any()).optional(),
  })
)
