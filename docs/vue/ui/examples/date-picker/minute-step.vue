<template>
  <KDatePicker v-model="value" show-time :minute-step="5" clearable style="max-width: 260px" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import KDatePicker from 'kit/vue/ui/components/DatePicker/DatePicker.vue'

const value = ref<number | null>(null)
</script>
