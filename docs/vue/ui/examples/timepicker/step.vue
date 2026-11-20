<template>
  <KSpace direction="vertical" size="lg" style="width: 100%; max-width: 420px">
    <KTimePicker v-model="step" :minute-step="15" :second-step="15" />
    <KTimePicker v-model="noSeconds" :format="'HH:mm'" :hour-step="2" />
    <KTimePicker v-model="disabled" :disabled-minutes="[0, 30]" :allow-clear="false" />
  </KSpace>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import KTimePicker from 'kit/vue/ui/components/TimePicker/TimePicker.vue'
import KSpace from 'kit/vue/ui/components/Space/Space.vue'
import type { KTimePickerValue } from 'kit/vue/ui/components/TimePicker/TimePicker.vue'

const step = ref<KTimePickerValue>('12:15:30')
const noSeconds = ref<KTimePickerValue>('08:00')
const disabled = ref<KTimePickerValue>('10:15:00')
</script>