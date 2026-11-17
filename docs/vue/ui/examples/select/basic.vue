<script setup lang="ts">
import { ref } from 'vue'
import KSelect from 'kit/vue/ui/components/Select/Select.vue'
import KSpace from 'kit/vue/ui/components/Space/Space.vue'

const fruit = ref<string | number | null>(null)
const opts = [
  { label: '苹果', value: 'apple' },
  { label: '香蕉', value: 'banana' },
  { label: '橙子（不可选）', value: 'orange', disabled: true },
  { label: '葡萄', value: 'grape' },
]
</script>

<template>
  <KSpace size="md" direction="vertical" style="width: 220px">
    <KSelect v-model="fruit" :options="opts" allow-clear placeholder="选择水果" />
    <div>当前值：{{ fruit }}</div>
    <KSelect :model-value="'apple'" disabled />
    <KSpace size="xs" direction="vertical" style="width: 220px">
      <KSelect v-for="s in ['xs', 'sm', 'md', 'lg']" :key="s" :size="s" :options="opts" :placeholder="`size=${s}（选项行 = 触发器 −4）`" />
    </KSpace>
  </KSpace>
</template>
