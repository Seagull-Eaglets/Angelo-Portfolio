'use client'

import { useState } from 'react'
import ServiceSelector from '../../components/booking-services/ServiceSelector'
import BookingForm from '../../components/booking-services/BookingForm'

/** @typedef {import('@/lib/types/booking').ServiceType} ServiceType */

export default function BookingServicesClient() {
  /** @type {[ServiceType | null, (service: ServiceType) => void]} */
  const [selectedService, setSelectedService] = useState(null)

  return (
    <main className="min-h-screen bg-background px-4 pb-16 pt-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <header className="mb-10 text-center">
          <h1 className="text-4xl font-bold text-foreground">Book a Discovery Call</h1>
          <p className="mt-3 text-lg text-muted-foreground">
            Select a service, then choose a preferred date and available time slot.
          </p>
        </header>

        <ServiceSelector selected={selectedService} onSelect={setSelectedService} />

        <BookingForm selectedService={selectedService} />
      </div>
    </main>
  )
}
