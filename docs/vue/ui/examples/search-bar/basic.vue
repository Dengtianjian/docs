<template>
  <KSearchBar v-model="keyword" show-action @search="onSearch" @cancel="keyword = ''" />
  <div class="result">
    <p v-if="!searched">输入关键字搜索组件</p>
    <p v-else>搜索「{{ searched }}」，匹配 {{ matches.length }} 项</p>
    <div v-for="item in matches" :key="item" class="row">{{ item }}</div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import KSearchBar from 'kit/vue/ui/components/SearchBar/SearchBar.vue'

const keyword = ref('')
const searched = ref('')
const components = ['KButton 按钮', 'KTable 表格', 'KPicker 选择器', 'KPopup 弹层', 'KSignature 签名']

const matches = computed(() =>
  searched.value
    ? components.filter(item => item.toLowerCase().includes(searched.value.toLowerCase()))
    : [],
)

function onSearch(value: string) {
  searched.value = value.trim()
}
</script>

<style scoped>
.result {
  margin-top: 12px;
  color: var(--k-color-text-secondary);
  font-size: var(--k-font-size-sm);
}
.result p { margin: 0 0 8px; }
.row {
  padding: 9px 10px;
  border-bottom: 1px solid var(--k-color-border-secondary);
}
</style>