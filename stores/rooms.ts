import { defineStore } from 'pinia'

export const useRoomStore = defineStore('roomStore', {
  state: () => ({
    rooms: [
      { id: 1, name: 'Ruang A', capacity: 10, location: 'Lantai 1' },
      { id: 2, name: 'Ruang B', capacity: 20, location: 'Lantai 2' },
      { id: 3, name: 'Ruang C', capacity: 30, location: 'Lantai 3' }
    ]
  })
})
