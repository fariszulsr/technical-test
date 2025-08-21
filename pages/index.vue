<script setup lang="ts">
import { ref } from "vue";
import { useRoomStore } from "../stores/rooms";
import { useBookingStore } from "../stores/bookings";

const roomStore = useRoomStore();
const bookingStore = useBookingStore();

const showBookingModal = ref(false);
const showConfirmationModal = ref(false);
const selectedRoomId = ref<number | null>(null);
const cancelBookingId = ref(0);
const titleConfirmation = ref("");
const messageConfirmation = ref("");
const headerConfirmation = ref("");
const showAvailabilityModal = ref(false);

function openBookingModal(roomId: number) {
  selectedRoomId.value = roomId;
  showBookingModal.value = true;
}

function openConfirmationModal(bookingId: number) {
  cancelBookingId.value = bookingId;
  titleConfirmation.value = "Warning!";
  messageConfirmation.value =
    "Apakah anda yakin ingin membatalkan booking ini?";
  headerConfirmation.value = "bg-yellow-500 text-white";
  showConfirmationModal.value = true;
}
</script>

<template>
  <div class="p-6">
    <div class="mb-6 relative flex items-center">
      <h1 class="text-2xl font-bold">Room List</h1>

      <div class="absolute left-1/2 transform -translate-x-1/2">
        <button
          class="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors"
          @click="showAvailabilityModal = true"
        >
          📅 View Availability
        </button>
      </div>

      <div class="ml-auto">
        <button
          class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          @click="
            roomStore.rooms[0] &&
              openBookingModal(Number(roomStore.rooms[0].id))
          "
        >
          + New Booking
        </button>
      </div>
    </div>

    <div class="overflow-x-auto rounded-lg shadow-lg">
      <table class="min-w-full border-collapse rounded-lg bg-white">
        <thead class="bg-cyan-700 text-white">
          <tr>
            <th class="p-3 text-left">Name</th>
            <th class="p-3 text-left">Capacity</th>
            <th class="p-3 text-left">Room</th>
            <th class="p-3 text-left">Date</th>
            <th class="p-3 text-left">Start</th>
            <th class="p-3 text-left">End</th>
            <th class="p-3 text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="(booking, index) in bookingStore.bookings"
            :key="booking.id"
            :class="index % 2 === 0 ? 'bg-gray-50' : 'bg-white'"
            class="hover:bg-gray-100 transition-colors"
          >
            <td class="p-3">{{ booking.user }}</td>
            <td class="p-3">{{ roomStore.rooms[0]?.capacity }}</td>
            <td class="p-3">{{ roomStore.rooms[0]?.name }}</td>
            <td class="p-3">{{ booking.date }}</td>
            <td class="p-3">{{ booking.startTime }}</td>
            <td class="p-3">{{ booking.endTime }}</td>
            <td class="p-3 text-center">
              <button
                class="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                @click="openConfirmationModal(booking.id)"
              >
                Cancel
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <AvailabilityModal
      :show="showAvailabilityModal"
      :onClose="() => (showAvailabilityModal = false)"
    />

    <BookingModal
      v-if="showBookingModal"
      :roomId="selectedRoomId"
      @close="showBookingModal = false"
    />
    <ConfirmationModal
      v-if="showConfirmationModal"
      :title="titleConfirmation"
      :message="messageConfirmation"
      :headerColor="headerConfirmation"
      :showConfirm="true"
      confirmText="Yes"
      cancelText="No"
      :onConfirm="() => bookingStore.cancelBooking(cancelBookingId)"
      @close="showConfirmationModal = false"
    />
  </div>
</template>
