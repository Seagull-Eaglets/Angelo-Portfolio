import { SERVICE_TYPES } from '../types/booking.js'

/**
 * @typedef {import('../types/booking').ServiceType} ServiceType
 */

/**
 * Default slot length in minutes per ServiceType.
 * @type {Record<string, number>}
 */
export const SERVICE_DURATIONS = Object.freeze({
  [SERVICE_TYPES.WEBSITE]: 45,
  [SERVICE_TYPES.WEB_APP]: 60,
  [SERVICE_TYPES.N8N_AUTOMATION]: 30,
})

/**
 * Returns slot duration in minutes for a given service.
 * @param {string} service
 * @returns {number}
 */
export function getServiceDuration(service) {
  if (!service) return 30
  return SERVICE_DURATIONS[service] ?? 30
}
