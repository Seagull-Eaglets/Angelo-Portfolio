'use client'

import { useState, useMemo } from 'react'
import {
  FaChevronLeft,
  FaChevronRight,
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
  FaCalendarAlt,
  FaClock,
  FaInfoCircle,
} from 'react-icons/fa'
import {
  getAvailableSlots,
  isWeekend,
  isPastDate,
  getManilaDetails,
} from '@/lib/scheduling/businessHours.js'
import { getServiceDuration } from '@/lib/scheduling/serviceDurations.js'
import BookingModal from './BookingModal.js'

/** @typedef {import('@/lib/types/booking').ServiceType} ServiceType */

const MONTH_NAMES = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

/**
 * Gets Manila today year, month (1-12), and day (1-31).
 */
function getManilaToday() {
  const details = getManilaDetails()
  return {
    year: details.year,
    month: details.month,
    day: details.day,
    dateString: `${details.year}-${String(details.month).padStart(2, '0')}-${String(details.day).padStart(2, '0')}`,
  }
}

/**
 * Generates the full 7xN calendar grid array for a given year and month (1-12).
 * Includes padding days from previous and next months.
 */
function generateMonthGrid(year, month, service) {
  const today = getManilaToday()

  // First day of current target month (in Manila)
  const firstDayUtc = new Date(Date.UTC(year, month - 1, 1, 4, 0, 0))
  const firstDayDetails = getManilaDetails(firstDayUtc)

  // Get index of 1st day (0 = Sun, 1 = Mon, ..., 6 = Sat)
  const dayOfWeekIndex = WEEKDAYS.indexOf(firstDayDetails.weekday)
  const startOffset = dayOfWeekIndex >= 0 ? dayOfWeekIndex : 0

  // Total days in target month
  const totalDaysInMonth = new Date(year, month, 0).getDate()

  // Total days in previous month
  const prevMonthTotalDays = new Date(year, month - 1, 0).getDate()

  const gridDays = []

  // 1. Previous month padding days
  for (let i = startOffset - 1; i >= 0; i--) {
    const prevDayNum = prevMonthTotalDays - i
    const prevMonthNum = month === 1 ? 12 : month - 1
    const prevYearNum = month === 1 ? year - 1 : year
    const dateStr = `${prevYearNum}-${String(prevMonthNum).padStart(2, '0')}-${String(prevDayNum).padStart(2, '0')}`

    const weekend = isWeekend(dateStr)
    const past = isPastDate(dateStr)

    gridDays.push({
      dateString: dateStr,
      dayNumber: prevDayNum,
      isCurrentMonth: false,
      isWeekend: weekend,
      isPast: past,
      isToday: dateStr === today.dateString,
      isAvailable: false,
      slots: [],
    })
  }

  // 2. Current month days
  for (let d = 1; d <= totalDaysInMonth; d++) {
    const dateStr = `${year}-${String(month).padStart(2, '0')}-${String(d).padStart(2, '0')}`
    const weekend = isWeekend(dateStr)
    const past = isPastDate(dateStr)
    const available = !weekend && !past

    const slots = service && available ? getAvailableSlots(dateStr, service) : []

    gridDays.push({
      dateString: dateStr,
      dayNumber: d,
      isCurrentMonth: true,
      isWeekend: weekend,
      isPast: past,
      isToday: dateStr === today.dateString,
      isAvailable: available && slots.length > 0,
      slots,
    })
  }

  // 3. Next month padding days to complete full weeks (multiples of 7)
  const totalCellsSoFar = gridDays.length
  const remainingCells = (7 - (totalCellsSoFar % 7)) % 7
  for (let j = 1; j <= remainingCells; j++) {
    const nextMonthNum = month === 12 ? 1 : month + 1
    const nextYearNum = month === 12 ? year + 1 : year
    const dateStr = `${nextYearNum}-${String(nextMonthNum).padStart(2, '0')}-${String(j).padStart(2, '0')}`

    gridDays.push({
      dateString: dateStr,
      dayNumber: j,
      isCurrentMonth: false,
      isWeekend: isWeekend(dateStr),
      isPast: isPastDate(dateStr),
      isToday: dateStr === today.dateString,
      isAvailable: false,
      slots: [],
    })
  }

  return gridDays
}

/**
 * @param {{ selectedService: ServiceType | null, onBookingSubmit?: (details: any) => void }} props
 */
export default function BookingForm({ selectedService, onBookingSubmit }) {
  const today = useMemo(() => getManilaToday(), [])

  // Month navigation state
  const [currentYear, setCurrentYear] = useState(today.year)
  const [currentMonth, setCurrentMonth] = useState(today.month) // 1-12

  // Selected date and time slots (supports single or multiple slots selection)
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedSlots, setSelectedTimeSlots] = useState([])

  // Modal display state
  const [showModal, setShowModal] = useState(false)

  // Service Duration
  const duration = useMemo(() => {
    return selectedService ? getServiceDuration(selectedService) : 30
  }, [selectedService])

  // Calendar Grid
  const calendarGrid = useMemo(() => {
    return generateMonthGrid(currentYear, currentMonth, selectedService)
  }, [currentYear, currentMonth, selectedService])

  // Get available slots for currently selected date
  const selectedDateSlots = useMemo(() => {
    if (!selectedDate || !selectedService) return []
    return getAvailableSlots(selectedDate, selectedService)
  }, [selectedDate, selectedService])

  // Check if target navigation is prior to current month
  const isAtCurrentMonth = currentYear === today.year && currentMonth === today.month
  const isPriorMonth =
    currentYear < today.year || (currentYear === today.year && currentMonth < today.month)

  // Month Navigation Handlers
  const handlePrevMonth = () => {
    if (isAtCurrentMonth) return
    if (currentMonth === 1) {
      setCurrentMonth(12)
      setCurrentYear((y) => y - 1)
    } else {
      setCurrentMonth((m) => m - 1)
    }
  }

  const handleNextMonth = () => {
    if (currentMonth === 12) {
      setCurrentMonth(1)
      setCurrentYear((y) => y + 1)
    } else {
      setCurrentMonth((m) => m + 1)
    }
  }

  const handlePrevYear = () => {
    if (currentYear <= today.year) {
      setCurrentYear(today.year)
      setCurrentMonth(today.month)
      return
    }
    setCurrentYear((y) => y - 1)
  }

  const handleNextYear = () => {
    setCurrentYear((y) => y + 1)
  }

  const handleResetToToday = () => {
    setCurrentYear(today.year)
    setCurrentMonth(today.month)
    let firstAvailableStr = today.dateString
    if (isWeekend(firstAvailableStr) || isPastDate(firstAvailableStr)) {
      const firstAvail = calendarGrid.find((d) => d.isCurrentMonth && d.isAvailable)
      if (firstAvail) firstAvailableStr = firstAvail.dateString
    }
    setSelectedDate(firstAvailableStr)
    setSelectedTimeSlots([])
  }

  const handleDateSelect = (dayObj) => {
    if (!dayObj.isCurrentMonth || !dayObj.isAvailable) return
    setSelectedDate(dayObj.dateString)
    setSelectedTimeSlots([])
  }

  const handleSlotToggle = (slot) => {
    setSelectedTimeSlots((prev) => {
      if (prev.includes(slot)) {
        return prev.filter((s) => s !== slot)
      } else {
        return [...prev, slot]
      }
    })
  }

  const handleInitiateBooking = () => {
    if (!selectedDate || selectedSlots.length === 0) return
    setShowModal(true)
  }

  if (!selectedService) {
    return (
      <div className="mt-8 rounded-2xl border border-border bg-card p-8 text-center text-muted-foreground shadow-sm">
        <FaCalendarAlt className="mx-auto text-4xl text-primary/60 mb-3" />
        <h3 className="text-xl font-semibold text-foreground">Select a Service to View Availability</h3>
        <p className="mt-2 text-sm max-w-md mx-auto">
          Choose a service above to load Angelo's calendar with live availability in Asia/Manila timezone.
        </p>
      </div>
    )
  }

  return (
    <div className="mt-8 space-y-6">
      {/* Calendar & Time Slots Grid */}
      <div className="grid gap-6 lg:grid-cols-12">
        {/* Main Monthly Calendar Display (7 cols on lg) */}
        <div className="lg:col-span-7 rounded-2xl border border-border bg-card p-4 sm:p-6 shadow-sm">
          {/* Header Controls */}
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-border pb-4">
            <div>
              <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
                <FaCalendarAlt className="text-primary text-xl" />
                {MONTH_NAMES[currentMonth - 1]} {currentYear}
              </h2>
              <p className="text-xs text-muted-foreground mt-0.5">
                Timezone: Asia/Manila (PHT) • Mon–Fri, 09:00 AM – 05:00 PM
              </p>
            </div>

            {/* Navigation Buttons */}
            <div className="flex items-center gap-1.5 self-start sm:self-auto">
              <button
                type="button"
                onClick={handleResetToToday}
                className="rounded-lg border border-border bg-background px-3 py-1.5 text-xs font-semibold text-foreground hover:bg-accent transition-colors mr-1"
                title="Go to Today"
              >
                Today
              </button>

              <button
                type="button"
                onClick={handlePrevYear}
                disabled={currentYear <= today.year}
                className="rounded-lg border border-border bg-background p-2 text-foreground hover:bg-accent disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                title="Previous Year"
              >
                <FaAngleDoubleLeft className="text-xs" />
              </button>

              <button
                type="button"
                onClick={handlePrevMonth}
                disabled={isAtCurrentMonth || isPriorMonth}
                className="rounded-lg border border-border bg-background p-2 text-foreground hover:bg-accent disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                title="Previous Month"
              >
                <FaChevronLeft className="text-xs" />
              </button>

              <button
                type="button"
                onClick={handleNextMonth}
                className="rounded-lg border border-border bg-background p-2 text-foreground hover:bg-accent transition-colors"
                title="Next Month"
              >
                <FaChevronRight className="text-xs" />
              </button>

              <button
                type="button"
                onClick={handleNextYear}
                className="rounded-lg border border-border bg-background p-2 text-foreground hover:bg-accent transition-colors"
                title="Next Year"
              >
                <FaAngleDoubleRight className="text-xs" />
              </button>
            </div>
          </div>

          {/* Status Legend */}
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3 text-xs border-b border-border pb-3">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5 font-medium text-emerald-600 dark:text-emerald-400">
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500"></span> Available
              </span>
              <span className="flex items-center gap-1.5 font-medium text-rose-500">
                <span className="h-2.5 w-2.5 rounded-full bg-rose-500"></span> Unavailable
              </span>
              <span className="flex items-center gap-1.5 font-medium text-primary">
                <span className="h-2.5 w-2.5 rounded-full bg-primary"></span> Selected
              </span>
            </div>
            <span className="text-muted-foreground font-medium">
              Slot Length: <strong className="text-foreground">{duration} mins</strong>
            </span>
          </div>

          {/* Days of Week Header */}
          <div className="grid grid-cols-7 gap-1 text-center text-xs font-semibold text-muted-foreground mb-2">
            {WEEKDAYS.map((wd) => (
              <div key={wd} className="py-1 uppercase tracking-wider">
                {wd}
              </div>
            ))}
          </div>

          {/* 7xN Calendar Grid */}
          <div className="grid grid-cols-7 gap-1.5 sm:gap-2">
            {calendarGrid.map((cell, idx) => {
              const isSelected = selectedDate === cell.dateString

              let cellStyle = 'border-border/60 bg-muted/20 text-muted-foreground/40 cursor-not-allowed'
              let badge = null

              if (cell.isCurrentMonth) {
                if (cell.isAvailable) {
                  if (isSelected) {
                    cellStyle =
                      'border-primary bg-primary text-primary-foreground shadow-md ring-2 ring-primary scale-[1.02] cursor-pointer'
                    badge = (
                      <span className="text-[10px] font-bold uppercase tracking-tight bg-primary-foreground/20 px-1 rounded">
                        Selected
                      </span>
                    )
                  } else {
                    cellStyle =
                      'border-emerald-500/40 bg-emerald-50/50 text-emerald-950 dark:bg-emerald-950/20 dark:text-emerald-200 hover:border-emerald-500 hover:bg-emerald-100/60 dark:hover:bg-emerald-900/40 cursor-pointer'
                    badge = (
                      <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">
                        {cell.slots.length} slots
                      </span>
                    )
                  }
                } else if (cell.isWeekend) {
                  cellStyle =
                    'border-rose-200/50 bg-rose-50/30 text-rose-400/80 dark:bg-rose-950/20 dark:border-rose-900/30 dark:text-rose-500/70 cursor-not-allowed'
                  badge = <span className="text-[9px] uppercase text-rose-400/80 font-medium">Weekend</span>
                } else if (cell.isPast) {
                  cellStyle =
                    'border-muted/50 bg-muted/30 text-muted-foreground/50 dark:bg-muted/10 cursor-not-allowed'
                  badge = <span className="text-[9px] text-muted-foreground/60">Past</span>
                } else {
                  cellStyle =
                    'border-rose-200/50 bg-rose-50/30 text-rose-400 dark:bg-rose-950/20 dark:text-rose-500 cursor-not-allowed'
                  badge = <span className="text-[9px] text-rose-400">Booked</span>
                }
              }

              return (
                <button
                  key={`${cell.dateString}-${idx}`}
                  type="button"
                  disabled={!cell.isCurrentMonth || !cell.isAvailable}
                  onClick={() => handleDateSelect(cell)}
                  className={`relative flex min-h-[60px] sm:min-h-[72px] flex-col justify-between rounded-xl border p-1.5 sm:p-2 text-left transition-all ${cellStyle}`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`text-sm sm:text-base font-bold ${cell.isToday ? 'underline decoration-2 underline-offset-2' : ''}`}>
                      {cell.dayNumber}
                    </span>
                    {cell.isToday && (
                      <span className={`text-[9px] font-bold uppercase rounded px-1 ${isSelected ? 'bg-primary-foreground text-primary' : 'bg-primary/20 text-primary'}`}>
                        Today
                      </span>
                    )}
                  </div>
                  <div className="mt-1">{badge}</div>
                </button>
              )
            })}
          </div>
        </div>

        {/* Time Slot Picker & Booking Request Summary Panel (5 cols on lg) */}
        <div className="lg:col-span-5 flex flex-col justify-between rounded-2xl border border-border bg-card p-5 sm:p-6 shadow-sm">
          <div>
            <div className="mb-4 border-b border-border pb-3">
              <h3 className="text-xl font-bold text-foreground flex items-center gap-2">
                <FaClock className="text-primary text-lg" />
                Available Time Slots
              </h3>
              <p className="text-xs text-muted-foreground mt-1">
                {selectedDate ? (
                  <span>
                    Showing slots for <strong className="text-foreground">{selectedDate}</strong> (PHT)
                  </span>
                ) : (
                  'Select a green date on the calendar grid to view available call times.'
                )}
              </p>
            </div>

            {!selectedDate ? (
              <div className="rounded-xl border border-dashed border-border p-6 text-center text-muted-foreground">
                <FaInfoCircle className="mx-auto text-2xl text-muted-foreground/60 mb-2" />
                <p className="text-sm">Click any available (green) date on the calendar to select time slots.</p>
              </div>
            ) : selectedDateSlots.length > 0 ? (
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>Click slots to select (multiple allowed)</span>
                  <span className="font-semibold text-primary">{selectedSlots.length} selected</span>
                </div>

                <div className="grid grid-cols-2 gap-2 max-h-[300px] overflow-y-auto pr-1">
                  {selectedDateSlots.map((slot) => {
                    const isSlotSelected = selectedSlots.includes(slot)

                    return (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => handleSlotToggle(slot)}
                        className={`rounded-xl border py-2.5 px-3 text-center text-xs font-semibold transition-all ${
                          isSlotSelected
                            ? 'border-primary bg-primary text-primary-foreground shadow-sm ring-2 ring-primary/40'
                            : 'border-emerald-500/40 bg-emerald-50/40 text-foreground hover:border-emerald-500 hover:bg-emerald-100/50 dark:bg-emerald-950/20 dark:hover:bg-emerald-900/40'
                        }`}
                      >
                        {slot}
                      </button>
                    )
                  })}
                </div>
              </div>
            ) : (
              <div className="rounded-xl border border-rose-200 bg-rose-50/50 p-4 text-center text-xs text-rose-800 dark:border-rose-900/40 dark:bg-rose-950/20 dark:text-rose-300">
                No slots remaining for this date. Please pick another weekday.
              </div>
            )}
          </div>

          {/* Booking Summary Action */}
          <div className="mt-6 border-t border-border pt-4">
            {selectedSlots.length > 0 ? (
              <div className="space-y-3">
                <div className="rounded-xl bg-accent/60 p-3.5 text-xs text-foreground space-y-1">
                  <p className="font-semibold text-sm text-foreground">Booking Summary:</p>
                  <p>
                    <span className="text-muted-foreground">Date:</span> <strong>{selectedDate}</strong>
                  </p>
                  <p>
                    <span className="text-muted-foreground">Selected Slot(s):</span>{' '}
                    <strong>{selectedSlots.join(', ')}</strong>
                  </p>
                  <p>
                    <span className="text-muted-foreground">Duration:</span>{' '}
                    <strong>{duration * selectedSlots.length} mins total</strong>
                  </p>
                </div>
                {/* Button for the Modal */}
                <button
                  type="button"
                  onClick={handleInitiateBooking}
                  className="w-full rounded-xl bg-primary py-3 px-4 text-center text-sm font-bold text-primary-foreground shadow-md transition-all hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  Initiate Booking Request →
                </button>
              </div>
            ) : (
              <button
                type="button"
                disabled
                className="w-full rounded-xl border border-border bg-muted py-3 px-4 text-center text-sm font-semibold text-muted-foreground cursor-not-allowed opacity-60"
              >
                Select Date & Time Slot
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Booking Details Form Modal */}
      <BookingModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        selectedService={selectedService}
        selectedDate={selectedDate}
        selectedSlots={selectedSlots}
        onBookingSubmit={onBookingSubmit}
      />
    </div>
  )
}
