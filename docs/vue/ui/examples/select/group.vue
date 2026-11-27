<template>
  <KFlex gap="md" vertical style="width: 260px">
    <KSelect v-model="picked" mode="multiple" :options="opts" hide-selected placeholder="分组 + 隐藏已选（选完组空整组消失）">
      <template #prefix>
        <IconSearch size="1em" />
      </template>
    </KSelect>
    <KSelect v-model="single" :options="opts" placeholder="前后缀插槽（箭头保留）">
      <template #prefix><span style="font-size: 12px">框架</span></template>
      <template #suffix><span style="font-size: 12px">v1</span></template>
    </KSelect>
    <div>当前值：{{ picked.join(', ') }}</div>
  </KFlex>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { IconSearch } from '@tabler/icons-vue'
import KSelect from 'kit/vue/ui/components/data-entry/Select/Select.vue'
import KFlex from 'kit/vue/ui/components/layouts/Flex/Flex.vue'

const picked = ref<(string | number)[]>(['vue'])
const single = ref<string | number | null>(null)
const opts = [
  { type: 'group', label: '前端', children: [
    { label: 'Vue', value: 'vue' },
    { label: 'React', value: 'react' },
  ] },
  { type: 'group', label: '后端', children: [
    { label: 'Node', value: 'node' },
    { label: 'Go', value: 'go' },
    { label: 'Rust', value: 'rust' },
  ] },
  { label: '散选项（无组标题）', value: 'loose' },
]
</script>
