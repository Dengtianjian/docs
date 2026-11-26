<template>
  <KTabs v-model:active="active" type="simple" :items="tabs" addable @add="add">
    <template #content="{ item }">
      <div class="pane">{{ item.content }}</div>
    </template>
  </KTabs>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import KTabs from 'kit/vue/ui/components/navigation/Tabs/Tabs.vue'

const active = ref<string | number>('inbox')
const tabs = ref([
  { name: 'inbox', label: '收件箱', content: '收件箱：12 封未读。' },
  { name: 'starred', label: '星标', content: '星标邮件。' },
  { name: 'sent', label: '已发送', content: '已发送邮件。' },
  { name: 'trash', label: '废纸篓', content: '废纸篓内容。', disabled: true },
])
let seq = 0

function add() {
  seq += 1
  const name = `custom-${seq}`
  tabs.value.push({ name, label: `新标签 ${seq}`, content: `新标签 ${seq} 的内容。` })
  active.value = name
}
</script>

<style scoped>
.pane {
  padding: 12px 0;
  color: var(--k-color-text-secondary);
  font-size: var(--k-font-size-sm);
}
</style>