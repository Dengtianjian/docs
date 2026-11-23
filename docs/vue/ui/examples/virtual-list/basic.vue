<template>
  <div style="max-width: 420px">
    <KFlex gap="sm" style="margin-bottom: 8px">
      <KButton size="sm" @click="list?.scrollToIndex(0)">回到顶部</KButton>
      <KButton size="sm" @click="list?.scrollToIndex(5000, 'center')">跳到第 5001 项</KButton>
      <KButton size="sm" @click="list?.scrollToIndex(9999, 'end')">跳到底部</KButton>
    </KFlex>
    <KVirtualList
      ref="list"
      :items="items"
      :item-height="40"
      :height="360"
      item-key="id"
      class="demo-list"
    >
      <template #default="{ item, index }">
        <div class="row" :class="{ odd: index % 2 === 0 }">
          <span>#{{ item.id }}</span>
          <span>{{ item.label }}</span>
        </div>
      </template>
    </KVirtualList>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import KVirtualList from 'kit/vue/ui/components/VirtualList/VirtualList.vue'
import KButton from 'kit/vue/ui/components/Button/Button.vue'
import KFlex from 'kit/vue/ui/components/Flex/Flex.vue'

const list = ref<InstanceType<typeof KVirtualList> | null>(null)
const items = Array.from({ length: 10000 }, (_, index) => ({
  id: index + 1,
  label: `列表项 ${index + 1}`,
}))
</script>

<style scoped>
.demo-list {
  border: 1px solid var(--k-color-border);
  border-radius: var(--k-border-radius);
}
.row {
  display: flex;
  align-items: center;
  gap: 12px;
  height: 40px;
  padding: 0 12px;
  font-size: 13px;
}
.row.odd {
  background: var(--k-color-fill-quaternary);
}
</style>