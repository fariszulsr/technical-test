<script setup lang="ts">
import { defineProps, defineEmits } from "vue";

const props = defineProps<{
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  showConfirm?: boolean;
  onConfirm?: () => void;
  headerColor?: string;
}>();

const emit = defineEmits(["close"]);

function handleConfirm() {
  if (props.onConfirm) props.onConfirm();
  emit("close");
}
</script>

<template>
  <div
    class="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
  >
    <div class="bg-white rounded-lg w-96 shadow-lg overflow-hidden">
      <div class="p-4" :class="props.headerColor || 'bg-blue-600 text-white'">
        <h2 class="text-lg font-bold text-center">
          {{ props.title || "Confirm Action" }}
        </h2>
      </div>

      <div class="p-6">
        <p class="mb-6 text-center">
          {{ props.message || "Are you sure you want to continue?" }}
        </p>
        <div class="flex justify-end gap-2">
          <button
            class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            @click="$emit('close')"
          >
            {{ props.cancelText || "Cancel" }}
          </button>
          <button v-if="showConfirm"
            class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            @click="handleConfirm"
          >
            {{ props.confirmText || "Confirm" }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
