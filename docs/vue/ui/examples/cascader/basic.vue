<template>
  <KFlex vertical gap="lg" style="width: 100%; max-width: 420px">
    <KCascader v-model="region" :options="options" placeholder="请选择地区" />
    <KCascader
      v-model="anyLevel"
      :options="options"
      change-on-select
      expand-trigger="hover"
      placeholder="任意层级可选（hover 展开）"
    />
    <span style="color: var(--k-color-text-secondary)">
      地区：{{ region?.join(' / ') || '未选择' }} · 任意层级：{{ anyLevel?.join(' / ') || '未选择' }}
    </span>
  </KFlex>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import KCascader from 'kit/vue/ui/components/data-entry/Cascader/Cascader.vue'
import KFlex from 'kit/vue/ui/components/layouts/Flex/Flex.vue'
import type { KCascaderValue } from 'kit/vue/ui/components/data-entry/Cascader/Cascader.vue'
import type { KTreeOption } from 'kit/vue/ui/utils/tree'

const region = ref<KCascaderValue>(['east', 'shanghai'])
const anyLevel = ref<KCascaderValue>(null)
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