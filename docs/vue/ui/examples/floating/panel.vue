<template>
  <KButton @click="open = true">打开悬浮面板</KButton>
  <KFloatingPanel v-model:open="open" title="快捷筛选" :height="300">
    <KFlex vertical gap="md">
      <div v-for="group in groups" :key="group.label" class="group">
        <span class="label">{{ group.label }}</span>
        <KFlex wrap>
          <KButton
            v-for="item in group.items"
            :key="item"
            size="sm"
            :type="selected.includes(item) ? 'primary' : 'default'"
            :variant="selected.includes(item) ? 'filled' : 'outlined'"
            @click="toggle(item)"
          >{{ item }}</KButton>
        </KFlex>
      </div>
    </KFlex>
    <template #footer>
      <KButton block @click="open = false">应用筛选</KButton>
    </template>
  </KFloatingPanel>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import KButton from 'kit/vue/ui/components/general/Button/Button.vue'
import KFloatingPanel from 'kit/vue/ui/components/overlay/FloatingPanel/FloatingPanel.vue'
import KFlex from 'kit/vue/ui/components/layouts/Flex/Flex.vue'

const open = ref(false)
const selected = ref<string[]>(['近 7 天'])
const groups = [
  { label: '时间', items: ['今天', '近 7 天', '近 30 天'] },
  { label: '状态', items: ['进行中', '已完成', '已取消'] },
  { label: '优先级', items: ['高', '中', '低'] },
]

function toggle(item: string) {
  selected.value = selected.value.includes(item)
    ? selected.value.filter(entry => entry !== item)
    : [...selected.value, item]
}
</script>

<style scoped>
.group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.label {
  color: var(--k-color-text-tertiary);
  font-size: var(--k-font-size-sm);
}
</style>