<script setup lang="ts">
import { ref } from "vue";
import { useBookingStore } from "../stores/bookings";

const props = defineProps<{ roomId: number | null }>();
const emit = defineEmits(["close"]);

const bookingStore = useBookingStore();

const user = ref("");
const titleConfirmation = ref("");
const messageConfirmation = ref("");
const headerConfirmation = ref("");
const confirmText = ref("");
const cancelText = ref("");
const showConfirmationModal = ref(false);
const showConfirmationButton = ref(true);
const today = new Date();
const yyyy = today.getFullYear();
const mm = String(today.getMonth() + 1).padStart(2, "0");
const dd = String(today.getDate()).padStart(2, "0");

const selectedDate = ref(`${yyyy}-${mm}-${dd}`);
const start = ref("09:00");
const end = ref("10:00");

const errorUser = ref("");
const errorDate = ref("");
const errorStart = ref("");
const errorEnd = ref("");

function validate() {
  errorUser.value = "";
  errorDate.value = "";
  errorStart.value = "";
  errorEnd.value = "";

  if (!user.value.trim()) errorUser.value = "User wajib diisi";
  if (!selectedDate.value) errorDate.value = "Tanggal wajib diisi";
  if (!start.value) errorStart.value = "Jam mulai wajib diisi";
  if (!end.value) errorEnd.value = "Jam selesai wajib diisi";

  if (end.value <= start.value) {
    errorEnd.value = "Jam selesai harus lebih besar dari jam mulai";
  }

  return (
    !errorUser.value && !errorDate.value && !errorStart.value && !errorEnd.value
  );
}

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

function openConfirmation() {
  if (!validate()) return;

  titleConfirmation.value = "Confirmation!";
  messageConfirmation.value =
    "Apakah anda yakin ingin menyimpan booking pada jadwal ini?";
  headerConfirmation.value = "bg-green-500 text-white";
  confirmText.value = "Yes";
  cancelText.value = "No";
  showConfirmationButton.value = true;
  showConfirmationModal.value = true;
}

function saveBooking() {
  if (!props.roomId) return;
  if (!validate()) return;

  const success = bookingStore.addBooking({
    roomId: props.roomId,
    user: user.value,
    date: selectedDate.value || "",
    startTime: start.value,
    endTime: end.value,
    id: Date.now(),
  });

  if (!success) {
    showConfirmationModal.value = false;
    setTimeout(() => {
      titleConfirmation.value = "Booking Failed!";
      messageConfirmation.value =
        "⚠️ Waktu bentrok dengan jadwal booking lain!";
      headerConfirmation.value = "bg-red-500 text-white";
      cancelText.value = "Close";
      showConfirmationButton.value = false;
      showConfirmationModal.value = true;
    }, 50);

    return;
  }

  emit("close");
}
</script>

<template>
  <div class="fixed inset-0 flex items-center justify-center bg-black/50">
    <div class="bg-white p-6 rounded-lg w-96 relative overflow-hidden">
      <div class="bg-blue-500 w-full absolute top-0 left-0 p-3 text-center">
        <h2 class="text-xl font-bold text-white">New Booking</h2>
      </div>

      <div class="mt-12">
        <label class="block mb-1">User</label>
        <input v-model="user" class="border w-full p-2 bg-white" />
        <p v-if="errorUser" class="text-red-600 text-sm mt-1">
          {{ errorUser }}
        </p>

        <label class="block mt-3 mb-1">Date</label>
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
        <p v-if="errorDate" class="text-red-600 text-sm mt-1">
          {{ errorDate }}
        </p>

        <label class="block mt-3 mb-1">Start</label>
        <select v-model="start" class="border w-full p-2 bg-white">
          <option
            v-for="h in 24"
            :key="h"
            :value="`${String(h).padStart(2, '0')}:00`"
          >
            {{ String(h).padStart(2, "0") }}:00
          </option>
        </select>
        <p v-if="errorStart" class="text-red-600 text-sm mt-1">
          {{ errorStart }}
        </p>

        <label class="block mt-3 mb-1">End</label>
        <select v-model="end" class="border w-full p-2 bg-white">
          <option
            v-for="h in 24"
            :key="h"
            :value="`${String(h).padStart(2, '0')}:00`"
          >
            {{ String(h).padStart(2, "0") }}:00
          </option>
        </select>
        <p v-if="errorEnd" class="text-red-600 text-sm mt-1">{{ errorEnd }}</p>

        <div class="flex justify-end gap-2 mt-5">
          <button
            class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            @click="$emit('close')"
          >
            Cancel
          </button>
          <button
            class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            @click="openConfirmation"
          >
            Save
          </button>
        </div>
      </div>
    </div>

    <ConfirmationModal
      v-if="showConfirmationModal"
      :title="titleConfirmation"
      :message="messageConfirmation"
      :headerColor="headerConfirmation"
      :showConfirm="showConfirmationButton"
      :confirmText="confirmText"
      :cancelText="cancelText"
      :onConfirm="saveBooking"
      @close="showConfirmationModal = false"
    />
  </div>
</template>
