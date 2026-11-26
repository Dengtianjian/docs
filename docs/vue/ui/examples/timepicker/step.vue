<template>
  <KFlex vertical gap="lg" style="width: 100%; max-width: 420px">
    <KTimePicker v-model="step" :minute-step="15" :second-step="15" />
    <KTimePicker v-model="noSeconds" :format="'HH:mm'" :hour-step="2" />
    <KTimePicker v-model="disabled" :disabled-minutes="[0, 30]" :allow-clear="false" />
  </KFlex>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import KTimePicker from 'kit/vue/ui/components/data-entry/TimePicker/TimePicker.vue'
import KFlex from 'kit/vue/ui/components/layouts/Flex/Flex.vue'
import type { KTimePickerValue } from 'kit/vue/ui/components/data-entry/TimePicker/TimePicker.vue'

const step = ref<KTimePickerValue>('12:15:30')
const noSeconds = ref<KTimePickerValue>('08:00')
const disabled = ref<KTimePickerValue>('10:15:00')
</script>