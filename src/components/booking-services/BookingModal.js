'use client'

import { useMemo, useState } from 'react'
import { FaCalendarAlt, FaCheckCircle } from 'react-icons/fa'
import { bookingSchema } from '@/lib/validation/bookingSchema.js'

/**
 * @param {{
 *   isOpen: boolean,
 *   onClose: () => void,
 *   selectedService: string | null,
 *   selectedDate: string,
 *   selectedSlots: string[],
 *   onBookingSubmit?: (details: any) => void
 * }} props
 */
export default function BookingModal({
  isOpen,
  onClose,
  selectedService,
  selectedDate,
  selectedSlots,
  onBookingSubmit,
}) {
  const [clientName, setClientName] = useState('')
  const [clientEmail, setClientEmail] = useState('')
  const [clientPhone, setClientPhone] = useState('')
  const [clientNotes, setClientNotes] = useState('')
  const [bookingConfirmed, setBookingConfirmed] = useState(false)
  const [touched, setTouched] = useState({})
  const [errors, setErrors] = useState({})

  const formValues = { clientName, clientEmail, clientPhone, clientNotes }

  const validation = useMemo(() => bookingSchema.safeParse(formValues), [
    clientName,
    clientEmail,
    clientPhone,
    clientNotes,
  ])

  if (!isOpen) return null

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }))
    const message = bookingSchema.validateField(field, formValues[field])
    setErrors((prev) => ({ ...prev, [field]: message }))
  }

  const handleFieldChange = (field, value) => {
    if (field === 'clientName') setClientName(value)
    if (field === 'clientEmail') setClientEmail(value)
    if (field === 'clientPhone') setClientPhone(value)
    if (field === 'clientNotes') setClientNotes(value)

    // Re-validate immediately once a field has been touched so fixed errors clear right away.
    if (touched[field]) {
      const message = bookingSchema.validateField(field, value)
      setErrors((prev) => ({ ...prev, [field]: message }))
    }
  }

  const handleSubmitBooking = (e) => {
    e.preventDefault()
    setTouched({ clientName: true, clientEmail: true, clientPhone: true, clientNotes: true })

    const result = bookingSchema.safeParse(formValues)
    if (!result.success) {
      setErrors(result.errors)
      return
    }

    const bookingPayload = {
      service: selectedService,
      date: selectedDate,
      timeSlots: selectedSlots,
      ...result.data,
      timezone: 'Asia/Manila (PHT)',
      createdAt: new Date().toISOString(),
    }

    setBookingConfirmed(true)
    if (onBookingSubmit) {
      onBookingSubmit(bookingPayload)
    }
  }

  const handleClose = () => {
    setBookingConfirmed(false)
    setClientName('')
    setClientEmail('')
    setClientPhone('')
    setClientNotes('')
    setTouched({})
    setErrors({})
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-2xl space-y-4 animate-in fade-in zoom-in-95">
        <div className="flex items-center justify-between border-b border-border pb-3">
          <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
            <FaCalendarAlt className="text-primary" /> Confirm Booking Request
          </h3>
          <button
            type="button"
            onClick={handleClose}
            className="text-muted-foreground hover:text-foreground text-sm font-semibold p-1"
          >
            ✕
          </button>
        </div>

        {bookingConfirmed ? (
          <div className="py-6 text-center space-y-3">
            <FaCheckCircle className="mx-auto text-5xl text-emerald-500" />
            <h4 className="text-xl font-bold text-foreground">Booking Requested!</h4>
            <p className="text-xs text-muted-foreground">
              Thank you, <strong>{clientName}</strong>! Your request for <strong>{selectedDate}</strong> at{' '}
              <strong>{selectedSlots.join(', ')}</strong> (Asia/Manila PHT) has been recorded. Angelo will review and
              confirm shortly via email.
            </p>
            <button
              type="button"
              onClick={handleClose}
              className="mt-4 rounded-xl bg-primary px-5 py-2 text-xs font-bold text-primary-foreground shadow"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmitBooking} className="space-y-4 text-xs">
            <div className="rounded-lg bg-accent/50 p-3 space-y-1 text-foreground">
              <p>
                <span className="text-muted-foreground">Service:</span> <strong>{selectedService}</strong>
              </p>
              <p>
                <span className="text-muted-foreground">Date:</span> <strong>{selectedDate}</strong>
              </p>
              <p>
                <span className="text-muted-foreground">Slots:</span> <strong>{selectedSlots.join(', ')}</strong>
              </p>
            </div>

            <div>
              <label htmlFor="client-name" className="block font-semibold text-foreground mb-1">
                Your Name *
              </label>
              <input
                id="client-name"
                type="text"
                required
                value={clientName}
                onChange={(e) => handleFieldChange('clientName', e.target.value)}
                onBlur={() => handleBlur('clientName')}
                aria-invalid={touched.clientName && !!errors.clientName}
                aria-describedby="client-name-error"
                placeholder="e.g. Alex Smith"
                className="w-full rounded-lg border border-input bg-background p-2.5 text-foreground focus:border-primary focus:outline-none"
              />
              {touched.clientName && errors.clientName && (
                <p id="client-name-error" className="mt-1 text-[11px] font-medium text-rose-500">
                  {errors.clientName}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="client-email" className="block font-semibold text-foreground mb-1">
                Email Address *
              </label>
              <input
                id="client-email"
                type="email"
                required
                value={clientEmail}
                onChange={(e) => handleFieldChange('clientEmail', e.target.value)}
                onBlur={() => handleBlur('clientEmail')}
                aria-invalid={touched.clientEmail && !!errors.clientEmail}
                aria-describedby="client-email-error"
                placeholder="e.g. alex@example.com"
                className="w-full rounded-lg border border-input bg-background p-2.5 text-foreground focus:border-primary focus:outline-none"
              />
              {touched.clientEmail && errors.clientEmail && (
                <p id="client-email-error" className="mt-1 text-[11px] font-medium text-rose-500">
                  {errors.clientEmail}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="client-phone" className="block font-semibold text-foreground mb-1">
                Phone Number *
              </label>
              <input
                id="client-phone"
                type="tel"
                required
                value={clientPhone}
                onChange={(e) => handleFieldChange('clientPhone', e.target.value)}
                onBlur={() => handleBlur('clientPhone')}
                aria-invalid={touched.clientPhone && !!errors.clientPhone}
                aria-describedby="client-phone-error"
                placeholder="e.g. +63 912 345 6789"
                className="w-full rounded-lg border border-input bg-background p-2.5 text-foreground focus:border-primary focus:outline-none"
              />
              {touched.clientPhone && errors.clientPhone && (
                <p id="client-phone-error" className="mt-1 text-[11px] font-medium text-rose-500">
                  {errors.clientPhone}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="client-notes" className="block font-semibold text-foreground mb-1">
                Project / Meeting Notes (Optional)
              </label>
              <textarea
                id="client-notes"
                rows={3}
                value={clientNotes}
                onChange={(e) => handleFieldChange('clientNotes', e.target.value)}
                onBlur={() => handleBlur('clientNotes')}
                placeholder="Briefly describe what you would like to discuss..."
                className="w-full rounded-lg border border-input bg-background p-2.5 text-foreground focus:border-primary focus:outline-none"
              />
              {touched.clientNotes && errors.clientNotes && (
                <p className="mt-1 text-[11px] font-medium text-rose-500">{errors.clientNotes}</p>
              )}
            </div>

            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={handleClose}
                className="w-1/2 rounded-xl border border-border bg-background py-2.5 font-semibold text-foreground hover:bg-accent"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!validation.success}
                className="w-1/2 rounded-xl bg-primary py-2.5 font-bold text-primary-foreground shadow hover:bg-primary/90 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-primary"
              >
                Send Request
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
