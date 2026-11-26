<template>
  <div style="max-width: 560px">
    <KSortable v-model="channels" item-key="id" orientation="horizontal">
      <template #default="{ item }">
        <span class="chip">{{ item.label }}</span>
      </template>
    </KSortable>
    <p class="hint">横向单行：按 X 轴中点判定落点，让位沿水平方向。</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import KSortable from 'kit/vue/ui/components/data-entry/Sortable/Sortable.vue'

interface Channel {
  id: string
  label: string
}

const channels = ref<Channel[]>([
  { id: 'web', label: 'Web 端' },
  { id: 'ios', label: 'iOS' },
  { id: 'android', label: 'Android' },
  { id: 'mini', label: '小程序' },
  { id: 'desktop', label: '桌面端' },
])
</script>

<style scoped>
.chip {
  display: inline-flex;
  align-items: center;
  padding: 8px 14px;
  border: 1px solid #e5e7eb;
  border-radius: 999px;
  background: #fff;
  font-size: 13px;
  white-space: nowrap;
}
.hint {
  margin: 8px 0 0;
  font-size: 12px;
  color: #888;
}
</style>
