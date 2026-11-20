<template>
  <KSpace direction="vertical" size="lg" style="width: 100%">
    <KAutoComplete
      v-model="value"
      :options="options"
      placeholder="输入城市名，如 上海"
      @select="onSelect"
    />
    <KAutoComplete
      v-model="value2"
      :options="options"
      variant="filled"
      trigger-on-focus
      placeholder="聚焦即展示全部建议"
    />
    <span style="color: var(--k-color-text-secondary)">已选：{{ selected || '尚未选择' }}</span>
  </KSpace>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import KAutoComplete from 'kit/vue/ui/components/AutoComplete/AutoComplete.vue'
import KSpace from 'kit/vue/ui/components/Space/Space.vue'
import type { KAutoCompleteOption } from 'kit/vue/ui/components/AutoComplete/AutoComplete.vue'

const value = ref('')
const value2 = ref('')
const selected = ref('')
const options: KAutoCompleteOption[] = [
  { label: '上海', value: 'shanghai' },
  { label: '北京', value: 'beijing' },
  { label: '深圳', value: 'shenzhen' },
  { label: '杭州', value: 'hangzhou' },
  { label: '成都', value: 'chengdu' },
  { label: '南京', value: 'nanjing' }
]

function onSelect(option: KAutoCompleteOption) {
  selected.value = option.label
}
</script>