<template>
  <KFlex vertical gap="lg" style="width: 100%; max-width: 520px">
    <KCascader
      v-model="values"
      :options="options"
      multiple
      searchable
      placeholder="可多选，支持搜索"
    />
    <span style="color: var(--k-color-text-secondary)">已选 {{ values?.length ?? 0 }} 项</span>
  </KFlex>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import KCascader from 'kit/vue/ui/components/data-entry/Cascader/Cascader.vue'
import KFlex from 'kit/vue/ui/components/layouts/Flex/Flex.vue'
import type { KCascaderValue } from 'kit/vue/ui/components/data-entry/Cascader/Cascader.vue'
import type { KTreeOption } from 'kit/vue/ui/utils/tree'

const values = ref<KCascaderValue>([['east', 'shanghai', 'pudong']])
const options: KTreeOption[] = [
  {
    label: '华东',
    value: 'east',
    children: [
      {
        label: '上海',
        value: 'shanghai',
        children: [
          { label: '浦东新区', value: 'pudong' },
          { label: '徐汇区', value: 'xuhui' }
        ]
      },
      { label: '杭州', value: 'hangzhou' },
      { label: '南京', value: 'nanjing' }
    ]
  },
  {
    label: '华南',
    value: 'south',
    children: [
      { label: '深圳', value: 'shenzhen' },
      { label: '广州', value: 'guangzhou' }
    ]
  }
]
</script>