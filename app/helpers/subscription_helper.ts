import type { SubscriptionFeatures } from '../models/subscription.js'
import type { SubscriptionPlan } from '../models/subscription.js'

export function checkFeature(
  features: SubscriptionFeatures,
  feature: keyof SubscriptionFeatures
): boolean {
  if (!(feature in features)) {
    return false
  }

  const value = features[feature]
  return typeof value === 'boolean' ? value : value > 0
}

export function withinLimits(
  features: SubscriptionFeatures,
  feature: keyof SubscriptionFeatures,
  currentUsage: number
): boolean {
  if (!(feature in features)) {
    return false
  }

  const limit = features[feature]
  return typeof limit === 'number' && currentUsage < limit
}

export const PLAN_FEATURES: Record<SubscriptionPlan, SubscriptionFeatures> = {
  free: {
    maxVehicles: 1,
    maxTrackDaysPerMonth: 5,
    allowDataExport: false,
    allowDataBackup: false,
    allowApiAccess: false,
    allowTelemetryData: false,
    maxStorage: 100,
    support: 'email_only',
    prioritySupport: false,
    betaAccess: false,
    allowWidgetIntegration: false,
    allowCustomBranding: false,
    allowCustomColors: false,
    allowCustomLogos: false,
  },
  basic: {
    maxVehicles: 3,
    maxTrackDaysPerMonth: 15,
    allowDataExport: true,
    allowDataBackup: true,
    allowApiAccess: false,
    allowTelemetryData: false,
    maxStorage: 500,
    support: 'email_only',
    prioritySupport: false,
    betaAccess: false,
    allowWidgetIntegration: true,
    allowCustomBranding: false,
    allowCustomColors: true,
    allowCustomLogos: false,
  },
  pro: {
    maxVehicles: 10,
    maxTrackDaysPerMonth: 50,
    allowDataExport: true,
    allowDataBackup: true,
    allowApiAccess: true,
    allowTelemetryData: true,
    maxStorage: 2000,
    support: 'email_priority',
    prioritySupport: true,
    betaAccess: true,
    allowWidgetIntegration: true,
    allowCustomBranding: true,
    allowCustomColors: true,
    allowCustomLogos: true,
  },
  enterprise: {
    maxVehicles: -1,
    maxTrackDaysPerMonth: -1,
    allowDataExport: true,
    allowDataBackup: true,
    allowApiAccess: true,
    allowTelemetryData: true,
    maxStorage: 10000,
    support: '24_7_support',
    prioritySupport: true,
    betaAccess: true,
    allowWidgetIntegration: true,
    allowCustomBranding: true,
    allowCustomColors: true,
    allowCustomLogos: true,
  },
}

export function generateFeatures(
  plan: SubscriptionPlan,
  customFeatures: Partial<SubscriptionFeatures> = {}
): SubscriptionFeatures {
  const baseFeatures = PLAN_FEATURES[plan]
  return {
    ...baseFeatures,
    ...customFeatures,
  }
}

export function isPlanAllowed(
  currentPlan: SubscriptionPlan,
  requiredPlan: SubscriptionPlan
): boolean {
  const planHierarchy: SubscriptionPlan[] = ['free', 'basic', 'pro', 'enterprise']
  const currentLevel = planHierarchy.indexOf(currentPlan)
  const requiredLevel = planHierarchy.indexOf(requiredPlan)

  return currentLevel >= requiredLevel
}
