<template>
  <KFlex vertical gap="lg" style="width: 100%">
    <KFlex gap="lg" align="center" wrap>
      <label class="field">
        <span class="field-label">段数</span>
        <KInputNumber v-model="segments" :min="2" :max="24" :step="1" style="width: 96px" />
      </label>
      <label class="field">
        <span class="field-label">间距（度）</span>
        <KInputNumber v-model="gap" :min="0" :max="30" :step="1" style="width: 96px" />
      </label>
      <span class="hint">当前 {{ segmentCount }} 段 · 间距 {{ gapValue }}°</span>
    </KFlex>
    <KFlex gap="lg" align="center" wrap>
      <KProgress type="circle" :percent="75" :segments="segmentCount" :segment-gap="gapValue" />
      <KProgress
        type="circle"
        size="sm"
        :percent="75"
        :segments="segmentCount"
        :segment-gap="gapValue"
      />
      <KProgress
        type="circle"
        size="lg"
        :percent="75"
        :segments="segmentCount"
        :segment-gap="gapValue"
      />
      <KProgress type="circle" :percent="100" :segments="segmentCount" :segment-gap="gapValue" />
    </KFlex>
  </KFlex>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import KProgress from 'kit/vue/ui/components/feedback/Progress/Progress.vue'
import KInputNumber from 'kit/vue/ui/components/data-entry/InputNumber/InputNumber.vue'
import KFlex from 'kit/vue/ui/components/layouts/Flex/Flex.vue'

const segments = ref<number | null>(8)
const gap = ref<number | null>(6)
const segmentCount = computed(() => Math.min(24, Math.max(2, segments.value ?? 8)))
const gapValue = computed(() => Math.min(30, Math.max(0, gap.value ?? 6)))
</script>

<style scoped>
.field {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: var(--k-font-size-sm);
  color: var(--k-color-text-secondary);
}
.hint {
  font-size: var(--k-font-size-sm);
  color: var(--k-color-text-tertiary);
}
</style>