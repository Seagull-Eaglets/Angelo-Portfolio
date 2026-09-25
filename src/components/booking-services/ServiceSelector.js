'use client'

import { SERVICE_TYPES } from '@/lib/types/booking'

/** @typedef {import('@/lib/types/booking').ServiceType} ServiceType */

const services = [
  {
    type: SERVICE_TYPES.WEBSITE,
    title: 'Website',
    description: 'A polished website that presents your business clearly.',
  },
  {
    type: SERVICE_TYPES.WEB_APP,
    title: 'Web App',
    description: 'A custom application for your team or customers.',
  },
  {
    type: SERVICE_TYPES.N8N_AUTOMATION,
    title: 'N8N Automation',
    description: 'Automated workflows that connect your tools and save time.',
  },
]

/**
 * @param {{ selected: ServiceType | null, onSelect: (service: ServiceType) => void }} props
 */
export default function ServiceSelector({ selected, onSelect }) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {services.map((service) => {
        const isSelected = selected === service.type

        return (
          <button
            key={service.type}
            type="button"
            aria-pressed={isSelected}
            onClick={() => onSelect(service.type)}
            className={`rounded-lg border p-6 text-left transition-colors ${
              isSelected
                ? 'border-primary bg-primary/10 ring-2 ring-primary'
                : 'border-border bg-background hover:border-primary hover:bg-accent'
            }`}
          >
            <h2 className="text-xl font-semibold text-foreground">{service.title}</h2>
            <p className="mt-2 text-muted-foreground">{service.description}</p>
          </button>
        )
      })}
    </div>
  )
}