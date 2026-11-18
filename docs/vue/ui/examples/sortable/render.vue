<script setup lang="ts">
import { ref } from 'vue'
import KSortable from 'kit/vue/ui/components/Sortable/Sortable.vue'

interface Step {
  id: string
  name: string
}

const steps = ref<Step[]>([
  { id: 'draft', name: '草稿' },
  { id: 'review', name: '审核中' },
  { id: 'done', name: '已通过' },
  { id: 'archive', name: '已归档' },
])
</script>

<template>
  <div style="max-width: 420px">
    <KSortable v-model="steps" item-key="id">
      <template #render="ctx">
        <div :ref="ctx.rootEl" v-bind="ctx.containerAttrs" v-on="ctx.containerOn" class="hd-list">
          <div
            v-for="(item, index) in ctx.items"
            :key="ctx.keyOf(item)"
            v-bind="ctx.itemAttrs(item)"
            v-on="ctx.itemDragOn(item)"
            class="hd-item"
          >
            <span class="hd-index">{{ index + 1 }}</span>
            {{ item.name }}
          </div>
        </div>
      </template>
    </KSortable>
    <p class="hint">headless：#render 整件替换为暗色清单；拖拽判定、换序与 change 逻辑由绑定包继承（动画需自绘）。</p>
  </div>
</template>

<style scoped>
.hd-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 12px;
  border-radius: 10px;
  background: #111827;
}
.hd-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  border-radius: 8px;
  background: #1f2937;
  color: #e5e7eb;
  font-size: 13px;
  cursor: grab;
}
.hd-item[data-dragging] {
  opacity: 0.45;
}
.hd-item[data-drop='before'] {
  box-shadow: inset 0 2px 0 #60a5fa;
}
.hd-item[data-drop='after'] {
  box-shadow: inset 0 -2px 0 #60a5fa;
}
.hd-index {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #374151;
  font-size: 11px;
}
.hint {
  margin: 8px 0 0;
  font-size: 12px;
  color: #888;
}
</style>
