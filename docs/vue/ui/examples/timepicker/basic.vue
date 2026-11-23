<template>
  <KFlex vertical gap="lg" style="width: 100%; max-width: 420px">
    <KTimePicker v-model="time" placeholder="选择时间" />
    <KTimePicker v-model="range" range :format="'HH:mm'" placeholder="选择起止时间" />
    <KTimePicker v-model="disabledTime" :disabled-hours="[0, 1, 2, 3]" :minute-step="5" />
    <span style="color: var(--k-color-text-secondary)">
      时间：{{ time || '未选择' }} · 区间：{{ range ? range.join(' - ') : '未选择' }}
    </span>
  </KFlex>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import KTimePicker from 'kit/vue/ui/components/TimePicker/TimePicker.vue'
import KFlex from 'kit/vue/ui/components/Flex/Flex.vue'
import type { KTimePickerValue } from 'kit/vue/ui/components/TimePicker/TimePicker.vue'

const time = ref<KTimePickerValue>('09:30:00')
const range = ref<KTimePickerValue>(['09:00', '18:00'])
const disabledTime = ref<KTimePickerValue>(null)
</script>