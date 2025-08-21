import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export interface Booking {
  id: number
  roomId: number
  user: string
  date: string 
  startTime: string
  endTime: string
}

export const useBookingStore = defineStore('bookings', () => {
  const bookings = ref<Booking[]>([])

  onMounted(() => {
    const saved = localStorage.getItem('bookings')
    bookings.value = saved ? JSON.parse(saved) : []

    watch(
      bookings,
      (newVal) => {
        localStorage.setItem('bookings', JSON.stringify(newVal))
      },
      { deep: true }
    )
  })

  function isConflict(newBooking: Booking) {
    return bookings.value.some(b => {
      return (
        b.roomId === newBooking.roomId &&
        b.date === newBooking.date &&
        !(
          newBooking.endTime <= b.startTime ||
          newBooking.startTime >= b.endTime
        )
      )
    })
  }

  function addBooking(newBooking: Booking): boolean {
    if (isConflict(newBooking)) return false

    newBooking.id = bookings.value.length + 1
    bookings.value.push(newBooking)

    bookings.value.sort((a, b) => {
      const aTime = new Date(`${a.date}T${a.startTime}`).getTime()
      const bTime = new Date(`${b.date}T${b.startTime}`).getTime()
      return aTime - bTime
    })

    return true
  }

  function cancelBooking(id: number) {
    bookings.value = bookings.value.filter(b => b.id !== id)
  }

  function checkRoomAvailability(roomId: number, date: string, hour: string) {
    const list = bookings.value.filter(
      b => b.roomId === roomId && b.date === date
    )
    return list.some(b => hour >= b.startTime && hour < b.endTime)
      ? 'booked'
      : 'available'
  }

  return {
    bookings,
    addBooking,
    cancelBooking,
    checkRoomAvailability,
  }
})
