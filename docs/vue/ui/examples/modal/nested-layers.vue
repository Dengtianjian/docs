<template>
  <KModal
    v-model:open="open"
    title="弹窗内浮层"
    :width="520"
    placement="center"
  >
    <template #trigger>
      <KButton type="primary">打开弹窗测试浮层</KButton>
    </template>
    <p class="hint">
      下面这些组件都把弹层 Teleport 到 body；层级统一高于弹窗与遮罩，展开后不会被弹窗盖住。
    </p>
    <div class="fields">
      <div class="field">
        <span>负责团队</span>
        <KSelect v-model="team" :options="teams" placeholder="选择团队" />
      </div>
      <div class="field">
        <span>开始日期</span>
        <KDatePicker v-model="date" placeholder="选择日期" />
      </div>
      <div class="field">
        <span>提醒时间</span>
        <KTimePicker v-model="time" placeholder="选择时间" />
      </div>
      <div class="field">
        <span>更多操作</span>
        <KDropdown :items="items" trigger="click" @select="lastAction = String($event)">
          <template #trigger><KButton>打开下拉菜单</KButton></template>
        </KDropdown>
      </div>
      <div class="field">
        <span>悬浮提示</span>
        <KTooltip content="Tooltip 也应压在弹窗之上">
          <template #trigger><KButton>悬浮查看</KButton></template>
        </KTooltip>
      </div>
      <div class="field">
        <span>确认气泡</span>
        <KPopconfirm title="确认归档这条记录？" @confirm="lastAction = '已归档'">
          <template #trigger><KButton>归档</KButton></template>
        </KPopconfirm>
      </div>
    </div>
    <p class="log">最近操作：{{ lastAction || '—' }}</p>
    <template #footer>
      <KButton type="primary" @click="open = false">完成</KButton>
    </template>
  </KModal>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import KButton from 'kit/vue/ui/components/general/Button/Button.vue'
import KDatePicker from 'kit/vue/ui/components/data-entry/DatePicker/DatePicker.vue'
import KDropdown from 'kit/vue/ui/components/navigation/Dropdown/Dropdown.vue'
import KModal from 'kit/vue/ui/components/feedback/Modal/Modal.vue'
import KPopconfirm from 'kit/vue/ui/components/feedback/Popconfirm/Popconfirm.vue'
import KSelect from 'kit/vue/ui/components/data-entry/Select/Select.vue'
import KTimePicker from 'kit/vue/ui/components/data-entry/TimePicker/TimePicker.vue'
import KTooltip from 'kit/vue/ui/components/overlay/Tooltip/Tooltip.vue'
import type { KDropdownItem } from 'kit/vue/ui'
import type { KTimePickerValue } from 'kit/vue/ui/components/data-entry/TimePicker/TimePicker.vue'

const open = ref(false)
const team = ref<string | number | null>(null)
const date = ref<number | null>(null)
const time = ref<KTimePickerValue>('09:30:00')
const lastAction = ref('')
const teams = [
  { label: '产品设计', value: 'design' },
  { label: '前端研发', value: 'fe' },
  { label: '后端研发', value: 'be' },
]
const items: KDropdownItem[] = [
  { key: 'edit', label: '编辑' },
  { key: 'copy', label: '复制' },
  { key: 'archive', label: '归档', divided: true },
]
</script>

<style scoped>
.hint {
  margin: 0 0 16px;
  color: var(--k-color-text-secondary);
  font-size: var(--k-font-size-sm);
  line-height: 1.7;
}
.fields {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px 16px;
}
.field {
  display: flex;
  min-width: 0;
  flex-direction: column;
  gap: 6px;
}
.field > span {
  color: var(--k-color-text-secondary);
  font-size: var(--k-font-size-sm);
}
.log {
  margin: 16px 0 0;
  color: var(--k-color-text-tertiary);
  font-size: var(--k-font-size-sm);
}
@media (max-width: 520px) {
  .fields {
    grid-template-columns: minmax(0, 1fr);
  }
}
</style>