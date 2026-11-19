<template>
  <KSpace size="md" direction="vertical" style="width: 260px">
    <KSelect
      v-model="single"
      :options="opts"
      filterable
      allow-clear
      placeholder="输入过滤（label 包含，不区分大小写）"
      @search="log = $event || '(空)'"
    />
    <KSelect v-model="multi" mode="multiple" :options="opts" filterable placeholder="多选 + 过滤（输入框跟在标签后）" />
    <KSelect v-model="tags" mode="multiple" :options="opts" filterable tag allow-clear placeholder="回车把输入值创建为选项" />
    <KSelect v-model="custom" :options="opts" filterable :filter="byValuePrefix" placeholder="自定义 filter：value 前缀匹配" />
    <div>search 事件：{{ log }}</div>
  </KSpace>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import KSelect from 'kit/vue/ui/components/Select/Select.vue'
import KSpace from 'kit/vue/ui/components/Space/Space.vue'

const single = ref<string | number | null>(null)
const multi = ref<(string | number)[]>([])
const tags = ref<(string | number)[]>(['vue'])
const custom = ref<string | number | null>(null)
const log = ref('—')
const opts = [
  { label: 'Vue', value: 'vue' },
  { label: 'React', value: 'react' },
  { label: 'Svelte', value: 'svelte' },
  { label: 'Solid', value: 'solid' },
  { label: 'Angular', value: 'angular' },
]
const byValuePrefix = (pattern: string, option: { value: string | number }) =>
  String(option.value).startsWith(pattern.toLowerCase())
</script>
