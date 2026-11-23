<template>
  <KFlex vertical gap="lg" style="width: 100%">
    <KAutoComplete
      v-model="value"
      :fetch-suggestions="fetchSuggestions"
      :debounce="300"
      :min-length="1"
      placeholder="输入至少 1 个字符，异步搜索"
      @search="onSearch"
    />
    <div class="async-log">
      <span>最近搜索：{{ lastQuery || '（无）' }}</span>
      <span>请求序号：{{ requestCount }}</span>
    </div>
  </KFlex>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import KAutoComplete from 'kit/vue/ui/components/AutoComplete/AutoComplete.vue'
import KFlex from 'kit/vue/ui/components/Flex/Flex.vue'
import type { KAutoCompleteOption } from 'kit/vue/ui/components/AutoComplete/AutoComplete.vue'

const value = ref('')
const lastQuery = ref('')
const requestCount = ref(0)
const cities = ['上海', '北京', '深圳', '杭州', '成都', '南京', '武汉', '西安']

async function fetchSuggestions(query: string): Promise<KAutoCompleteOption[]> {
  requestCount.value += 1
  await new Promise((resolve) => setTimeout(resolve, 400))
  if (query === '失败') throw new Error('mock failure')
  return cities
    .filter((city) => city.includes(query))
    .map((city) => ({ label: city, value: city.toLowerCase() }))
}

function onSearch(query: string) {
  lastQuery.value = query
}
</script>

<style scoped>
.async-log {
  display: flex;
  gap: 24px;
  color: var(--k-color-text-secondary);
  font-size: var(--k-font-size-sm);
}
</style>