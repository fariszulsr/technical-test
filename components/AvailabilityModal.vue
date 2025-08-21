<script setup lang="ts">
import { ref, computed } from "vue";
import { useRoomStore } from "../stores/rooms";
import { useBookingStore } from "../stores/bookings";

const props = defineProps<{
  show: boolean;
  onClose: () => void;
}>();

const roomStore = useRoomStore();
const bookingStore = useBookingStore();
const today = new Date();
const yyyy = today.getFullYear();
const mm = String(today.getMonth() + 1).padStart(2, "0");
const dd = String(today.getDate()).padStart(2, "0");

const selectedDate = ref(`${yyyy}-${mm}-${dd}`);
const hours = Array.from({ length: 24 }, (_, i) => {
  return `${String(i).padStart(2, "0")}:00`;
});

const dateInput = ref<HTMLInputElement | null>(null);

function openDatePicker() {
  if (!dateInput.value) return;

  const input = dateInput.value;
  if ("showPicker" in input && typeof input.showPicker === "function") {
    input.showPicker();
  } else {
    input.focus();
  }
}

const roomStatuses = computed(() => {
  return roomStore.rooms.map((room) => {
    return {
      ...room,
      hourly: hours.map((hour) => {
        const status = bookingStore.checkRoomAvailability(
          room.id,
          selectedDate.value || "",
          hour
        );
        return { hour, status };
      }),
    };
  });
});
</script>

<template>
  <div
    v-if="show"
    class="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
  >
    <div
      class="bg-white rounded-lg shadow-xl w-full max-w-6xl relative overflow-hidden"
    >
      <div class="bg-indigo-600 w-full absolute top-0 left-0 p-4">
        <h2 class="text-xl font-semibold text-white text-center">
          View Availability
        </h2>

        <button
          @click="onClose"
          class="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-200"
        >
          ✕
        </button>
      </div>

      <div class="mt-16 p-6">
        <div class="mb-4">
          <label class="block mb-2 font-medium">Select Date:</label>
          <div class="relative w-full">
            <input
              ref="dateInput"
              type="date"
              v-model="selectedDate"
              class="form-input border p-2 rounded w-full pr-10"
            />
            <span
              class="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400"
              @click="openDatePicker"
            >
              📅
            </span>
          </div>
        </div>

        <div class="overflow-x-auto rounded-lg shadow-lg">
          <table class="min-w-max border-collapse text-sm bg-white rounded-lg">
            <thead class="bg-cyan-700 text-white">
              <tr>
                <th class="p-2 text-left sticky left-0 bg-cyan-700 z-10">
                  Room
                </th>
                <th
                  v-for="h in hours"
                  :key="h"
                  class="p-2 text-center min-w-[60px]"
                >
                  {{ h }}
                </th>
              </tr>
            </thead>

            <tbody>
              <tr
                v-for="(room, rowIndex) in roomStatuses"
                :key="room.id"
                :class="rowIndex % 2 === 0 ? 'bg-gray-50' : 'bg-white'"
                class="hover:bg-gray-100 transition-colors"
              >
                <td class="p-2 font-medium sticky left-0 bg-white z-10">
                  {{ room.name }}
                </td>
                <td
                  v-for="slot in room.hourly"
                  :key="slot.hour"
                  class="p-2 text-center min-w-[60px]"
                  :class="
                    slot.status === 'available'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-red-100 text-red-700'
                  "
                >
                  {{ slot.status === "available" ? "✓" : "X" }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="mt-6 flex justify-end">
          <button
            @click="onClose"
            class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
