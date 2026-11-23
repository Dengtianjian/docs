<template>
  <KSpace direction="vertical" size="md">
    <KSpace wrap align="center">
      <KSegmented v-model="speed" size="sm" :options="speedOptions" />
      <KSegmented v-model="timing" size="sm" :options="timingOptions" />
    </KSpace>
    <KStatistic
      title="在线设备"
      :value="value"
      animation="rolling"
      :rolling-speed="speed"
      :rolling-timing="timing"
      suffix="台"
    />
    <KSpace>
      <KButton size="sm" @click="value += 137">增加 137</KButton>
      <KButton size="sm" variant="outline" @click="value = 0">归零</KButton>
    </KSpace>
  </KSpace>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import KButton from 'kit/vue/ui/components/Button/Button.vue'
import KSegmented from 'kit/vue/ui/components/Segmented/Segmented.vue'
import KSpace from 'kit/vue/ui/components/Space/Space.vue'
import KStatistic from 'kit/vue/ui/components/Statistic/Statistic.vue'
import type { KRollingSpeed, KRollingTiming } from 'kit/vue/ui/components/RollingText/RollingText.vue'

const value = ref(10240)
const speed = ref<KRollingSpeed>('normal')
const timing = ref<KRollingTiming>('ease-out')
const speedOptions = [
  { label: '快', value: 'fast' },
  { label: '中', value: 'normal' },
  { label: '慢', value: 'slow' },
]
const timingOptions = [
  { label: '匀速', value: 'linear' },
  { label: '先快后慢', value: 'ease-out' },
]
</script>