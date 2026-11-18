<script setup lang="ts">
import { ref } from 'vue'
import KSortable from 'kit/vue/ui/components/Sortable/Sortable.vue'

interface Note {
  id: number
  title: string
  body: string
}

const notes = ref<Note[]>([
  { id: 1, title: '短条目', body: '一行内容，占位块也应是矮的。' },
  { id: 2, title: '中等条目', body: '两到三行内容：高度随内容变化，拖拽时让位按最终布局计算，跨越项的位移不会互相错位。' },
  { id: 3, title: '长条目', body: '高度更长的条目，用来验证动态高度下的让位与占位：跨过它时上下项按新顺序的实际坐标平移，空档尺寸等于被拖项自身高度，两侧保持正常间距，不出现覆盖或留白。' },
  { id: 4, title: '再看一个短条目', body: '短。' },
])
</script>

<template>
  <div style="max-width: 420px">
    <KSortable v-model="notes" item-key="id">
      <template #default="{ item }">
        <div class="note">
          <strong>{{ item.title }}</strong>
          <span>{{ item.body }}</span>
        </div>
      </template>
    </KSortable>
    <p class="hint">
      动态高度：每项高度随内容不同；拖动时占位块用被拖项自身尺寸，让位与占位按最终布局计算，不遮挡、不留白。
    </p>
  </div>
</template>

<style scoped>
.note {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 12px 14px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  background: #fff;
}
.note strong {
  font-size: 14px;
}
.note span {
  font-size: 12px;
  line-height: 20px;
  color: #666;
}
.hint {
  margin: 8px 0 0;
  font-size: 12px;
  color: #888;
}
</style>