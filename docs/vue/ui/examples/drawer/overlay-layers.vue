<template>
  <KFlex vertical gap="md">
    <KFlex align="center" wrap>
      <KButton type="primary" @click="drawerOpen = true">打开筛选抽屉</KButton>
      <span class="ol-tip">抽屉内的下拉控件</span>
    </KFlex>

    <KDrawer v-model:open="drawerOpen" title="筛选设置" size="lg">
      <p class="ol-hint">
        Select、DatePicker、Dropdown 的弹层统一 Teleport 到 body，层级高于抽屉；展开后不会被抽屉裁切。
      </p>
      <div class="ol-fields">
        <div class="ol-field">
          <span>状态</span>
          <KSelect v-model="status" :options="statusOptions" placeholder="选择状态" />
        </div>
        <div class="ol-field">
          <span>负责团队</span>
          <KSelect v-model="team" :options="teamOptions" placeholder="选择团队" />
        </div>
        <div class="ol-field">
          <span>开始日期</span>
          <KDatePicker v-model="date" placeholder="选择日期" />
        </div>
        <div class="ol-field">
          <span>更多操作</span>
          <KDropdown :items="items" trigger="click" @select="onSelect">
            <template #trigger>
              <KButton>批量操作</KButton>
            </template>
          </KDropdown>
        </div>
        <div class="ol-field">
          <span>悬浮提示</span>
          <KTooltip content="Tooltip 也会压在抽屉之上">
            <template #trigger>
              <KButton>悬浮查看</KButton>
            </template>
          </KTooltip>
        </div>
        <div class="ol-field">
          <span>确认气泡</span>
          <KPopconfirm title="确认归档当前筛选？" @confirm="lastAction = '已归档筛选'">
            <template #trigger>
              <KButton>归档</KButton>
            </template>
          </KPopconfirm>
        </div>
      </div>
      <p class="ol-log">最近操作：{{ lastAction || '—' }}</p>
      <template #footer>
        <KButton size="sm" @click="drawerOpen = false">关闭</KButton>
        <KButton size="sm" type="primary" @click="drawerOpen = false">保存</KButton>
      </template>
    </KDrawer>
  </KFlex>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import KButton from 'kit/vue/ui/components/general/Button/Button.vue'
import KDatePicker from 'kit/vue/ui/components/data-entry/DatePicker/DatePicker.vue'
import KDropdown from 'kit/vue/ui/components/navigation/Dropdown/Dropdown.vue'
import KDrawer from 'kit/vue/ui/components/feedback/Drawer/Drawer.vue'
import KPopconfirm from 'kit/vue/ui/components/feedback/Popconfirm/Popconfirm.vue'
import KSelect from 'kit/vue/ui/components/data-entry/Select/Select.vue'
import KTooltip from 'kit/vue/ui/components/overlay/Tooltip/Tooltip.vue'
import KFlex from 'kit/vue/ui/components/layouts/Flex/Flex.vue'
import type { KDropdownItem } from 'kit/vue/ui'

const drawerOpen = ref(false)
const status = ref('all')
const team = ref('design')
const date = ref<number | null>(null)
const lastAction = ref('')

const statusOptions = [
  { label: '全部', value: 'all' },
  { label: '已启用', value: 'enabled' },
  { label: '已停用', value: 'disabled' },
]
const teamOptions = [
  { label: '产品设计', value: 'design' },
  { label: '前端研发', value: 'fe' },
  { label: '后端研发', value: 'be' },
]
const items: KDropdownItem[] = [
  { key: 'batch-enable', label: '批量启用' },
  { key: 'batch-disable', label: '批量停用' },
  { key: 'export', label: '导出所选', divided: true },
]

function onSelect(key: string | number) {
  const item = items.find(i => i.key === key)
  lastAction.value = item ? String(item.label) : String(key)
}
</script>

<style scoped>
.ol-tip {
  color: var(--k-color-text-secondary);
  font-size: var(--k-font-size-sm);
}
.ol-hint {
  margin: 0 0 16px;
  color: var(--k-color-text-secondary);
  font-size: var(--k-font-size-sm);
  line-height: 1.7;
}
.ol-fields {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px 16px;
}
.ol-field {
  display: flex;
  min-width: 0;
  flex-direction: column;
  gap: 6px;
}
.ol-field > span {
  color: var(--k-color-text-secondary);
  font-size: var(--k-font-size-sm);
}
.ol-log {
  margin: 16px 0 0;
  color: var(--k-color-text-tertiary);
  font-size: var(--k-font-size-sm);
}
@media (max-width: 520px) {
  .ol-fields {
    grid-template-columns: minmax(0, 1fr);
  }
}
</style>