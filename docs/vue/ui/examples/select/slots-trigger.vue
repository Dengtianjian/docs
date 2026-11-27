<template>
  <KFlex gap="md" vertical style="width: 280px">
    <KSelect v-model="city" filterable :options="cities" placeholder="选择城市">
      <template #prefix>
        <IconMapPin size="1em" />
      </template>
      <template #suffix>
        <span style="padding: 0 6px; border-radius: 999px; background: var(--k-color-primary-bg); color: var(--k-color-primary); font-size: 11px; line-height: 18px">必填</span>
      </template>
      <template #label="{ option }">
        <span style="display: inline-flex; align-items: center; gap: 6px">
          <IconMapPin size="1em" />
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
import { IconMapPin } from '@tabler/icons-vue'
import KSelect from 'kit/vue/ui/components/data-entry/Select/Select.vue'
import KFlex from 'kit/vue/ui/components/layouts/Flex/Flex.vue'

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