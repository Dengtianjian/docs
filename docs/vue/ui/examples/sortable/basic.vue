<template>
  <div style="max-width: 420px">
    <KSortable v-model="tasks" item-key="id" @change="onChange">
      <template #default="{ item, index }">
        <div class="task">
          <span class="task-index">{{ index + 1 }}</span>
          <div class="task-body">
            <strong>{{ item.title }}</strong>
            <span class="task-desc">{{ item.desc }}</span>
          </div>
        </div>
      </template>
    </KSortable>
    <p class="hint">
      拖动整项上下排序：经过相邻项中点时中间行实时让位，松手 FLIP 收位；change 回传移动项与前后下标。{{ last }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import KSortable from 'kit/vue/ui/components/Sortable/Sortable.vue'
import type { KSortableMoveInfo } from 'kit/vue/ui/components/Sortable/types'

interface Task {
  id: number
  title: string
  desc: string
}

const tasks = ref<Task[]>([
  { id: 1, title: '需求评审', desc: '确认本迭代范围与边界' },
  { id: 2, title: '接口联调', desc: '与后端对齐字段与错误码' },
  { id: 3, title: '视觉走查', desc: '亮暗两套截图逐项核对' },
  { id: 4, title: '发布验收', desc: '灰度 10% 观察核心指标' },
])
const last = ref('')

function onChange(_items: Task[], info: KSortableMoveInfo<Task>) {
  last.value = `${info.item.title}：第 ${info.from + 1} 位 → 第 ${info.to + 1} 位`
}
</script>

<style scoped>
.task {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 14px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  background: #fff;
}
.task-index {
  flex: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: #eef2ff;
  color: #2f54eb;
  font-size: 12px;
  font-weight: 600;
}
.task-body {
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.task-desc {
  font-size: 12px;
  color: #888;
}
.hint {
  margin: 8px 0 0;
  font-size: 12px;
  color: #888;
}
</style>
