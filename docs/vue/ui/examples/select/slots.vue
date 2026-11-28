<template>
  <KFlex gap="md" vertical style="width: 260px">
    <KSelect v-model="v" :options="opts" filterable placeholder="header / footer / option / empty 插槽" @scroll="scrolls++">
      <template #header><span style="font-size: 12px; color: var(--k-color-text-tertiary)">候选清单（不随列表滚）</span></template>
      <template #footer><span style="font-size: 12px; color: var(--k-color-text-tertiary)">共 {{ opts.length }} 项 · 列表滚动 {{ scrolls }} 次</span></template>
      <template #option="{ option, selected }">
        <span>{{ option.label }}</span>
        <span style="font-size: 12px; color: var(--k-color-text-tertiary)">{{ selected ? '已选 · ' : '' }}{{ option.desc }}</span>
      </template>
      <template #empty="{ pattern }">没有匹配「{{ pattern }}」的水果</template>
      <template #label="{ option }">
        <span>{{ option?.label }}<span style="opacity: 0.55">（{{ option?.desc }}）</span></span>
      </template>
    </KSelect>
    <div style="font-size: 12px; color: var(--k-color-text-tertiary)">过滤到空看 #empty（带 pattern）；滚列表看 footer 计数（scroll 事件）。</div>
  </KFlex>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import KSelect from 'kit/vue/ui/components/data-entry/Select/Select.vue'
import KFlex from 'kit/vue/ui/components/layouts/Flex/Flex.vue'

const v = ref<string | number | null>(null)
const scrolls = ref(0)
const opts = [
  { label: '苹果', value: 'apple', desc: '蔷薇科' },
  { label: '香蕉', value: 'banana', desc: '芭蕉科' },
  { label: '橙子', value: 'orange', desc: '芸香科' },
  { label: '葡萄', value: 'grape', desc: '葡萄科' },
  { label: '西瓜', value: 'melon', desc: '葫芦科' },
  { label: '桃子', value: 'peach', desc: '蔷薇科' },
  { label: '梨子', value: 'pear', desc: '蔷薇科' },
  { label: '芒果', value: 'mango', desc: '漆树科' },
  { label: '樱桃', value: 'cherry', desc: '蔷薇科' },
  { label: '柠檬', value: 'lemon', desc: '芸香科' },
]
</script>
