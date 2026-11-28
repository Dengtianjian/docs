<template>
  <KFlex vertical gap="lg" style="width: 100%; max-width: 420px">
    <KTreeSelect
      v-model="value"
      :options="options"
      default-expand-all
      placeholder="请选择部门"
    />
    <KTreeSelect
      v-model="searchValue"
      :options="options"
      search-placeholder="搜索部门"
      placeholder="搜索节点"
    />
    <span style="color: var(--k-color-text-secondary)">已选：{{ value || '未选择' }}</span>
  </KFlex>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import KTreeSelect from 'kit/vue/ui/components/data-entry/TreeSelect/TreeSelect.vue'
import KFlex from 'kit/vue/ui/components/layouts/Flex/Flex.vue'
import type { KTreeSelectValue } from 'kit/vue/ui/components/data-entry/TreeSelect/TreeSelect.vue'
import type { KTreeOption } from 'kit/vue/ui/utils/tree'

const value = ref<KTreeSelectValue>('design')
const searchValue = ref<KTreeSelectValue>(null)
const options: KTreeOption[] = [
  {
    label: '产品中心',
    value: 'product',
    children: [
      { label: '产品一组', value: 'product-1' },
      { label: '产品二组', value: 'product-2' }
    ]
  },
  {
    label: '设计中心',
    value: 'design-center',
    children: [
      { label: '交互设计', value: 'design' },
      { label: '视觉设计', value: 'visual' }
    ]
  },
  {
    label: '研发中心',
    value: 'rd',
    children: [
      { label: '前端组', value: 'fe' },
      { label: '后端组', value: 'be' },
      { label: '测试组', value: 'qa', disabled: true }
    ]
  }
]
</script>