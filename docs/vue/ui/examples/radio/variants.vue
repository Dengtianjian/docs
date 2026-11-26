<template>
  <KFlex vertical gap="md">
    <div v-for="v in variants" :key="v" class="hl-radio-variant__row">
      <span class="hl-radio-variant__name">{{ v }}</span>
      <KRadioGroup v-model="picked[v]" shape="button" :variant="v" :options="options" />
    </div>
    <div class="hl-radio-variant__row">
      <span class="hl-radio-variant__name">disabled</span>
      <KRadioGroup v-model="locked" shape="button" variant="filled" disabled :options="options" />
    </div>
    <span class="hl-radio-variant__hint">
      variant 仅对 shape="button" 生效；选中段按 KButton 浓度阶梯取色，outlined 保持原描边观感。
    </span>
  </KFlex>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import KRadioGroup from 'kit/vue/ui/components/data-entry/Radio/RadioGroup.vue'
import KFlex from 'kit/vue/ui/components/layouts/Flex/Flex.vue'

const variants = ['outlined', 'filled', 'tonal', 'text'] as const
const options = [
  { label: '按日', value: 'day' },
  { label: '按周', value: 'week' },
  { label: '按月', value: 'month' },
]
const picked = reactive<Record<(typeof variants)[number], string | number>>({
  outlined: 'week',
  filled: 'week',
  tonal: 'week',
  text: 'week',
})
const locked = ref<string | number>('week')
</script>

<style>
.hl-radio-variant__row {
  display: flex;
  align-items: center;
  gap: 12px;
}
.hl-radio-variant__name {
  width: 64px;
  color: var(--k-color-text-secondary);
  font-size: 13px;
}
.hl-radio-variant__hint {
  color: var(--k-color-text-tertiary);
  font-size: 12px;
}
</style>