<template>
  <KSpace direction="vertical" size="lg" style="width: 100%; max-width: 520px">
    <KTreeSelect
      v-model="values"
      :options="options"
      multiple
      default-expand-all
      placeholder="可多选，父级自动级联"
    />
    <KTreeSelect
      v-model="strictValues"
      :options="options"
      multiple
      check-strictly
      placeholder="check-strictly：父子独立"
    />
    <span style="color: var(--k-color-text-secondary)">已选 {{ values?.length ?? 0 }} 个节点</span>
  </KSpace>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import KTreeSelect from 'kit/vue/ui/components/TreeSelect/TreeSelect.vue'
import KSpace from 'kit/vue/ui/components/Space/Space.vue'
import type { KTreeSelectValue } from 'kit/vue/ui/components/TreeSelect/TreeSelect.vue'
import type { KTreeOption } from 'kit/vue/ui/utils/tree'

const values = ref<KTreeSelectValue>(['design', 'visual'])
const strictValues = ref<KTreeSelectValue>(['product-1'])
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
  }
]
</script>