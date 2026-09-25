import { getServiceDuration } from './serviceDurations.js'

/**
 * @typedef {import('../types/booking').ServiceType} ServiceType
 */

export const MANILA_TIMEZONE = 'Asia/Manila'
export const BUSINESS_HOURS_START_MINUTES = 9 * 60 // 09:00 AM
export const BUSINESS_HOURS_END_MINUTES = 17 * 60 // 05:00 PM
export const SLOT_STEP_MINUTES = 30 // 30-minute start increments

/**
 * Gets details (year, month, day, hour, minute, weekday) for a Date or current time in Asia/Manila.
 * @param {Date} [date]
 */
export function getManilaDetails(date = new Date()) {
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: MANILA_TIMEZONE,
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    weekday: 'short',
    hour12: false,
  })

  const parts = formatter.formatToParts(date)
  /** @type {Record<string, string>} */
  const map = {}
  for (const p of parts) {
    if (p.type !== 'literal') map[p.type] = p.value
  }

  const hourRaw = parseInt(map.hour || '0', 10)
  const hour = hourRaw === 24 ? 0 : hourRaw

  return {
    year: parseInt(map.year, 10),
    month: parseInt(map.month, 10), // 1-12
    day: parseInt(map.day, 10), // 1-31
    hour, // 0-23
    minute: parseInt(map.minute || '0', 10),
    weekday: map.weekday, // 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'
  }
}

/**
 * Converts YYYY-MM-DD or Date object into Manila year, month, day, weekday.
 * @param {Date | string} dateInput
 */
export function parseTargetDate(dateInput) {
  if (!dateInput) return null

  if (typeof dateInput === 'string') {
    const trimmed = dateInput.trim()
    const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(trimmed)
    if (match) {
      const year = parseInt(match[1], 10)
      const month = parseInt(match[2], 10)
      const day = parseInt(match[3], 10)

      // Use 12:00 PM Manila time on YYYY-MM-DD to get accurate weekday in Manila
      const utcNoonDate = new Date(Date.UTC(year, month - 1, day, 4, 0, 0))
      const details = getManilaDetails(utcNoonDate)

      return {
        year,
        month,
        day,
        weekday: details.weekday,
        dateString: `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`,
      }
    }

    const d = new Date(dateInput)
    if (isNaN(d.getTime())) return null
    const details = getManilaDetails(d)
    return {
      year: details.year,
      month: details.month,
      day: details.day,
      weekday: details.weekday,
      dateString: `${details.year}-${String(details.month).padStart(2, '0')}-${String(details.day).padStart(2, '0')}`,
    }
  }

  if (dateInput instanceof Date && !isNaN(dateInput.getTime())) {
    const details = getManilaDetails(dateInput)
    return {
      year: details.year,
      month: details.month,
      day: details.day,
      weekday: details.weekday,
      dateString: `${details.year}-${String(details.month).padStart(2, '0')}-${String(details.day).padStart(2, '0')}`,
    }
  }

  return null
}

/**
 * Checks if a given date is a weekend in Asia/Manila.
 * @param {Date | string} dateInput
 * @returns {boolean}
 */
export function isWeekend(dateInput) {
  const parsed = parseTargetDate(dateInput)
  if (!parsed) return false
  return parsed.weekday === 'Sat' || parsed.weekday === 'Sun'
}

/**
 * Checks if a given date is in the past relative to Asia/Manila today.
 * @param {Date | string} dateInput
 * @returns {boolean}
 */
export function isPastDate(dateInput) {
  const parsed = parseTargetDate(dateInput)
  if (!parsed) return true

  const now = getManilaDetails()

  if (parsed.year < now.year) return true
  if (parsed.year > now.year) return false

  if (parsed.month < now.month) return true
  if (parsed.month > now.month) return false

  return parsed.day < now.day
}

/**
 * Formats total minutes from midnight into 12-hour format (e.g. "09:00 AM").
 * @param {number} totalMinutes
 * @returns {string}
 */
export function formatMinutesTo12H(totalMinutes) {
  const hours24 = Math.floor(totalMinutes / 60)
  const minutes = totalMinutes % 60
  const period = hours24 >= 12 ? 'PM' : 'AM'
  let hours12 = hours24 % 12
  if (hours12 === 0) hours12 = 12

  const hh = String(hours12).padStart(2, '0')
  const mm = String(minutes).padStart(2, '0')
  return `${hh}:${mm} ${period}`
}

/**
 * Returns available time slots for a given date and service in Asia/Manila timezone.
 * Returns an empty array for weekends, past dates, or invalid inputs.
 *
 * @param {Date | string} date - Target date (Date object or 'YYYY-MM-DD' string)
 * @param {ServiceType} service - Selected service type
 * @returns {string[]} Array of available time slot strings (e.g., ["09:00 AM", "09:30 AM", ...])
 */
export function getAvailableSlots(date, service) {
  const parsed = parseTargetDate(date)
  if (!parsed) return []

  if (parsed.weekday === 'Sat' || parsed.weekday === 'Sun') {
    return []
  }

  if (isPastDate(date)) {
    return []
  }

  const duration = getServiceDuration(service)
  const now = getManilaDetails()

  const isToday =
    parsed.year === now.year && parsed.month === now.month && parsed.day === now.day

  const currentMinutesInManila = now.hour * 60 + now.minute

  /** @type {string[]} */
  const slots = []

  for (
    let slotStart = BUSINESS_HOURS_START_MINUTES;
    slotStart + duration <= BUSINESS_HOURS_END_MINUTES;
    slotStart += SLOT_STEP_MINUTES
  ) {
    if (isToday && slotStart <= currentMinutesInManila) {
      continue
    }

    slots.push(formatMinutesTo12H(slotStart))
  }

  return slots
}
