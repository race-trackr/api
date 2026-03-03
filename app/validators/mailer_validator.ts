import vine from '@vinejs/vine'

export const sendMailValidator = vine.compile(
  vine.object({
    recipientType: vine.enum(['single', 'all']),
    recipientEmails: vine.array(vine.string().email()).optional(),
    subject: vine.string().minLength(1),
    body: vine.string().minLength(1),
  })
)
