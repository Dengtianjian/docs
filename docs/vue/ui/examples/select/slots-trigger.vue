<template>
  <KFlex gap="md" vertical style="width: 280px">
    <KSelect v-model="city" filterable :options="cities" placeholder="选择城市">
      <template #prefix>
        <svg viewBox="0 0 16 16" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="1.4" aria-hidden="true"><path d="M8 14s4.5-4.2 4.5-7.5a4.5 4.5 0 0 0-9 0C3.5 9.8 8 14 8 14Z" /><circle cx="8" cy="6.5" r="1.6" /></svg>
      </template>
      <template #suffix>
        <span style="padding: 0 6px; border-radius: 999px; background: var(--k-color-primary-bg); color: var(--k-color-primary); font-size: 11px; line-height: 18px">必填</span>
      </template>
      <template #label="{ option }">
        <span style="display: inline-flex; align-items: center; gap: 6px">
          <svg viewBox="0 0 16 16" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="1.4" aria-hidden="true"><path d="M8 14s4.5-4.2 4.5-7.5a4.5 4.5 0 0 0-9 0C3.5 9.8 8 14 8 14Z" /><circle cx="8" cy="6.5" r="1.6" /></svg>
          {{ option?.label }}
        </span>
      </template>
    </KSelect>

    <KSelect v-model="tags" mode="multiple" :options="cities" placeholder="多选标签同样走 #label">
      <template #label="{ option }">
        <span style="display: inline-flex; align-items: center; gap: 4px">
          <span :style="{ width: '6px', height: '6px', borderRadius: '50%', background: colorOf(option?.value) }" />
          {{ option?.label }}
        </span>
      </template>
    </KSelect>

    <div style="font-size: 12px; color: var(--k-color-text-tertiary)">
      prefix / suffix 常显；label 在单选回显与多选标签内都生效。
    </div>
  </KFlex>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import KSelect from 'kit/vue/ui/components/Select/Select.vue'
import KFlex from 'kit/vue/ui/components/Flex/Flex.vue'

const cities = [
  { label: '北京', value: 'bj' },
  { label: '上海', value: 'sh' },
  { label: '广州', value: 'gz' },
  { label: '深圳', value: 'sz' },
  { label: '杭州', value: 'hz' },
  { label: '成都', value: 'cd' },
]
const colors: Record<string, string> = { bj: '#4c8dff', sh: '#12b886', gz: '#f59f00', sz: '#f06595', hz: '#845ef7', cd: '#20c997' }
const colorOf = (value?: string | number) => colors[String(value)] ?? 'currentColor'

const city = ref<string | number | null>('hz')
const tags = ref<(string | number)[]>(['bj', 'sh'])
</script>