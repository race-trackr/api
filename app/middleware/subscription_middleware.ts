import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'
import { checkFeature, withinLimits } from '../helpers/subscription_helper.js'

export default class SubscriptionMiddleware {
  async handle(ctx: HttpContext, next: NextFn, feature?: string) {
    const user = ctx.auth.user
    const subscription = await user?.related('subscription').query().first()

    if (!subscription || subscription.status !== 'active') {
      return ctx.response.unauthorized({ error: 'Active subscription required' })
    }

    if (feature && !checkFeature(subscription.features, feature)) {
      return ctx.response.forbidden({
        error: `Feature ${feature} not available in your plan`,
      })
    }

    return next()
  }
}
