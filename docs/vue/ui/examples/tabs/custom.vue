<template>
  <KTabs v-model:active="active" @close="close">
    <template #label="{ item }">
      <span class="tab-label">
        {{ item.label }}
        <KTag size="sm" :color="item.key === 'error' ? 'error' : 'primary'">
          {{ item.key === 'error' ? 2 : 1 }}
        </KTag>
      </span>
    </template>
    <template #extra>
      <KButton size="sm" @click="add">新增页签</KButton>
    </template>
    <KTabPane
      v-for="tab in tabs"
      :key="tab.key"
      :name="tab.key"
      :label="tab.label"
      closable
    >
      {{ tab.content }}
    </KTabPane>
  </KTabs>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import KTabs from 'kit/vue/ui/components/Tabs/Tabs.vue'
import KTabPane from 'kit/vue/ui/components/Tabs/TabPane.vue'
import KTag from 'kit/vue/ui/components/Tag/Tag.vue'
import KButton from 'kit/vue/ui/components/Button/Button.vue'

const active = ref<string | number>('overview')
const tabs = ref([
  { key: 'overview', label: '概览', content: '概览内容。' },
  { key: 'error', label: '异常', content: '异常列表内容。' },
])
let seq = 0

function add() {
  seq += 1
  const key = `new-${seq}`
  tabs.value.push({ key, label: `新页签 ${seq}`, content: `新页签 ${seq} 的内容。` })
  active.value = key
}

function close(key: string | number) {
  const index = tabs.value.findIndex(tab => tab.key === key)
  if (index >= 0) tabs.value.splice(index, 1)
}
</script>

<style scoped>
.tab-label {
  display: inline-flex;
  align-items: center;
  gap: 6px;
}
</style>