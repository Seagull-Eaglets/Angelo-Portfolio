/**
 * Shared booking form validation rules — plain JS so the same rules can be
 * imported by both the client form (BookingModal.js) and the future
 * `/api/book` route without needing a schema library.
 */

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
// Accepts optional leading +, digits, spaces, dashes, parentheses; 7-15 digits total.
const PHONE_REGEX = /^\+?[\d\s\-().]{7,20}$/

function countDigits(value) {
  return (value.match(/\d/g) || []).length
}

/** @param {Record<string, string>} data */
function validateField(field, value) {
  const trimmed = (value ?? '').trim()

  switch (field) {
    case 'clientName':
      if (!trimmed) return 'Name is required.'
      if (trimmed.length < 2) return 'Name must be at least 2 characters.'
      return null

    case 'clientEmail':
      if (!trimmed) return 'Email is required.'
      if (!EMAIL_REGEX.test(trimmed)) return 'Enter a valid email address.'
      return null

    case 'clientPhone':
      if (!trimmed) return 'Phone number is required.'
      if (!PHONE_REGEX.test(trimmed) || countDigits(trimmed) < 7) {
        return 'Enter a valid phone number.'
      }
      return null

    case 'clientNotes':
      return null

    default:
      return null
  }
}

/**
 * Mirrors a minimal subset of zod's `safeParse` API so the calling code can
 * be swapped over to zod later without changing call sites.
 * @param {{ clientName: string, clientEmail: string, clientPhone: string, clientNotes?: string }} data
 */
function safeParse(data) {
  const errors = {}

  for (const field of ['clientName', 'clientEmail', 'clientPhone', 'clientNotes']) {
    const message = validateField(field, data[field])
    if (message) errors[field] = message
  }

  if (Object.keys(errors).length > 0) {
    return { success: false, errors }
  }

  return {
    success: true,
    data: {
      clientName: data.clientName.trim(),
      clientEmail: data.clientEmail.trim(),
      clientPhone: data.clientPhone.trim(),
      clientNotes: (data.clientNotes ?? '').trim(),
    },
  }
}

export const bookingSchema = { validateField, safeParse }
