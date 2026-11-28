<template>
  <KFlex vertical gap="md" style="width: 280px">
    <KRadioGroup
      v-model="size"
      shape="button"
      :options="[
        { label: 'sm', value: 'sm' },
        { label: 'md', value: 'md' },
        { label: 'lg', value: 'lg' },
      ]"
    />
    <KMenu
      v-model:selected-keys="selected"
      :items="items"
      :size="size"
      mode="vertical"
      menu-label="自定义渲染"
      class="custom-menu"
    >
      <template #icon="{ item }">
        <span class="dot" :style="{ background: item.color }" />
      </template>
      <template #label="{ item }">
        <span class="label">
          {{ item.label }}
          <KTag v-if="item.badge" size="sm" color="error">{{ item.badge }}</KTag>
        </span>
      </template>
      <template #extra="{ item }">
        <span v-if="item.count" class="count">{{ item.count }}</span>
      </template>
    </KMenu>
    <div class="menu-tip">size / indent / 行尾 extra 与图标、标题插槽均可覆盖。</div>
  </KFlex>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import KMenu from 'kit/vue/ui/components/navigation/Menu/Menu.vue'
import KRadioGroup from 'kit/vue/ui/components/data-entry/Radio/RadioGroup.vue'
import KTag from 'kit/vue/ui/components/data-display/Tag/Tag.vue'
import KFlex from 'kit/vue/ui/components/layouts/Flex/Flex.vue'
import type { KMenuItem } from 'kit/vue/ui'

const size = ref<'sm' | 'md' | 'lg'>('md')
const selected = ref<string[]>(['inbox'])

interface DemoItem extends KMenuItem {
  color?: string
  badge?: number
  count?: number
}

const items: DemoItem[] = [
  { key: 'inbox', label: '收件箱', color: 'var(--k-color-primary)', badge: 5, count: 12 },
  { key: 'starred', label: '星标', color: 'var(--k-color-warning)', count: 3 },
  { key: 'sent', label: '已发送', color: 'var(--k-color-success)' },
  { key: 'trash', label: '垃圾箱', color: 'var(--k-color-text-quaternary)', count: 8 },
]
</script>

<style scoped>
.custom-menu {
  border: 1px solid var(--k-color-border-secondary);
  border-radius: var(--k-border-radius);
}
.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}
.label {
  display: inline-flex;
  align-items: center;
  gap: 6px;
}
.count {
  color: var(--k-color-text-tertiary);
  font-size: var(--k-font-size-sm);
  font-variant-numeric: tabular-nums;
}
.menu-tip {
  color: var(--k-color-text-tertiary);
  font-size: var(--k-font-size-xs);
}
</style>