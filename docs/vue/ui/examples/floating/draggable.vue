<template>
  <KButton @click="open = true">打开可拖拽面板</KButton>
  <p class="tip">当前高度：{{ currentHeight }}px · {{ animating ? '吸附中' : '已停靠' }}</p>
  <div class="bar">
    <KSwitch v-model="handleOnly" size="sm">仅手柄可拖拽</KSwitch>
  </div>

  <KFloatingPanel
    ref="panelRef"
    v-model:open="open"
    draggable
    :drag-handle-only="handleOnly"
    :mask="false"
    :anchors="[120, 260, 480]"
    :height="260"
    title="附近地点"
    @height-change="onHeightChange"
  >
    <KList :items="places" size="sm" :bordered="false" />
    <template #footer>
      <div class="actions">
        <KButton size="sm" @click="move(120)">收起</KButton>
        <KButton size="sm" @click="move(260)">中档</KButton>
        <KButton size="sm" @click="move(480)">展开</KButton>
        <KButton size="sm" type="primary" @click="open = false">关闭</KButton>
      </div>
    </template>
  </KFloatingPanel>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import KButton from 'kit/vue/ui/components/Button/Button.vue'
import KFloatingPanel from 'kit/vue/ui/components/FloatingPanel/FloatingPanel.vue'
import KList from 'kit/vue/ui/components/List/List.vue'
import KSwitch from 'kit/vue/ui/components/Switch/Switch.vue'

const open = ref(false)
const handleOnly = ref(false)
const currentHeight = ref(260)
const animating = ref(false)
const panelRef = ref<{ setHeight: (height: number) => void } | null>(null)

const places = [
  { key: 1, title: '天目里', description: '距你 1.2km · 艺术街区', extra: '4.8' },
  { key: 2, title: '西溪湿地', description: '距你 3.6km · 城市湿地', extra: '4.7' },
  { key: 3, title: '中国美院象山校区', description: '距你 5.1km · 建筑地标', extra: '4.9' },
  { key: 4, title: '良渚文化艺术中心', description: '距你 8.4km · 建筑 / 展览', extra: '4.8' },
  { key: 5, title: '龙井村', description: '距你 6.8km · 茶园步道', extra: '4.6' },
  { key: 6, title: '九溪烟树', description: '距你 7.2km · 溪谷徒步', extra: '4.7' },
]

function onHeightChange(height: number, isAnimating: boolean) {
  currentHeight.value = height
  animating.value = isAnimating
}

function move(height: number) {
  panelRef.value?.setHeight(height)
}
</script>

<style scoped>
.tip {
  margin: 10px 0 0;
  color: var(--k-color-text-secondary);
  font-size: var(--k-font-size-sm);
}
.bar {
  margin-top: 8px;
}
.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
</style>