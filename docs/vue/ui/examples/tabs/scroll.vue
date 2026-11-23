<template>
  <div class="scroll-demo">
    <div class="toolbar">
      <KButton size="sm" @click="active = tabs[0]!.name">第一个</KButton>
      <KButton size="sm" @click="active = tabs[9]!.name">跳到第 10 个</KButton>
      <KButton size="sm" @click="active = tabs[tabs.length - 1]!.name">最后一个</KButton>
    </div>
    <KTabs v-model:active="active" :items="tabs">
      <template #prefix>
        <span class="prefix">工作区</span>
      </template>
      <template #suffix>
        <KTag size="sm" color="primary">{{ tabs.length }} 个</KTag>
      </template>
      <template #content="{ item }">
        <div class="pane">{{ item.content }}</div>
      </template>
    </KTabs>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import KTabs from 'kit/vue/ui/components/Tabs/Tabs.vue'
import KButton from 'kit/vue/ui/components/Button/Button.vue'
import KTag from 'kit/vue/ui/components/Tag/Tag.vue'

const names = ['总览', '订单', '库存', '会员', '营销', '报表', '结算', '物流', '售后', '设置']
const tabs = Array.from({ length: 10 }, (_, index) => ({
  name: `tab-${index + 1}`,
  label: `${names[index]} ${index + 1}`,
  content: `第 ${index + 1} 个页签的内容。`,
}))
const active = ref<string | number>(tabs[0]!.name)
</script>

<style scoped>
.scroll-demo {
  max-width: 520px;
}
.toolbar {
  display: flex;
  gap: 8px;
  margin-bottom: 8px;
}
.prefix {
  color: var(--k-color-text-tertiary);
  font-size: var(--k-font-size-sm);
  white-space: nowrap;
}
.pane {
  padding: 12px 0;
  color: var(--k-color-text-secondary);
  font-size: var(--k-font-size-sm);
}
</style>