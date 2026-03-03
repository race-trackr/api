import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import { sendMailValidator } from '#validators/mailer_validator'

export default class MailerController {
  public async send({ request, response }: HttpContext) {
    const payload = await request.validateUsing(sendMailValidator)

    // In a real application you would hook into an email provider.
    // For now we'll just log the messages and pretend they're sent.
    if (payload.recipientType === 'single') {
      payload.recipientEmails?.forEach((email) => {
        console.log(`Mail to ${email}: ${payload.subject}\n${payload.body}`)
      })
    } else {
      const users = await User.all()
      users.forEach((user) => {
        console.log(`Mail to ${user.email}: ${payload.subject}\n${payload.body}`)
      })
    }

    return response.ok({ message: 'Emails dispatched successfully' })
  }
}
