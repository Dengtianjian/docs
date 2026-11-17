<script setup lang="ts">
import { ref } from 'vue'
import KSelect from 'kit/vue/ui/components/Select/Select.vue'
import KSpace from 'kit/vue/ui/components/Space/Space.vue'

const picked = ref<(string | number)[]>(['apple'])
const opts = [
  { label: '苹果', value: 'apple' },
  { label: '香蕉', value: 'banana' },
  { label: '橙子', value: 'orange' },
  { label: '葡萄', value: 'grape' },
]
</script>

<template>
  <KSpace size="md" direction="vertical" style="width: 260px">
    <KSelect v-model="picked" mode="multiple" :options="opts" allow-clear placeholder="多选（Backspace 删尾标签）" />
    <div>当前值：{{ picked.join(', ') }}</div>
  </KSpace>
</template>
