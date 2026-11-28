<template>
  <KFlex gap="md" vertical style="width: 320px">
    <KSelect v-model="member" filterable :options="members" placeholder="选择成员（头像 + 职位）">
      <template #label="{ option }">
        <span style="display: inline-flex; align-items: center; gap: 6px">
          <span :style="avatarStyle(option?.value)">{{ initial(option?.label) }}</span>
          {{ option?.label }}
        </span>
      </template>
      <template #option="{ option, selected }">
        <span style="display: flex; align-items: center; gap: 8px; min-width: 0; padding: 4px 0">
          <span :style="avatarStyle(option.value)">{{ initial(option.label) }}</span>
          <span style="display: flex; flex-direction: column; min-width: 0; line-height: 1.35">
            <span style="font-size: 13px">{{ option.label }}</span>
            <span style="font-size: 11px; color: var(--k-color-text-tertiary)">{{ metaOf(option.value).desc }}</span>
          </span>
        </span>
        <span v-if="selected" style="flex: none; color: var(--k-color-primary); font-size: 12px">✓</span>
      </template>
    </KSelect>

    <KSelect v-model="team" mode="multiple" filterable :options="grouped" placeholder="多选（分组 + 复杂选项）">
      <template #option="{ option, selected }">
        <span style="display: flex; align-items: center; gap: 8px; min-width: 0; padding: 4px 0">
          <span :style="avatarStyle(option.value)">{{ initial(option.label) }}</span>
          <span style="display: flex; flex-direction: column; min-width: 0; line-height: 1.35">
            <span style="font-size: 13px">{{ option.label }}</span>
            <span style="font-size: 11px; color: var(--k-color-text-tertiary)">{{ metaOf(option.value).desc }}</span>
          </span>
        </span>
        <span
          style="flex: none; display: inline-flex; width: 16px; height: 16px; align-items: center; justify-content: center; border-radius: 4px"
          :style="selected
            ? { background: 'var(--k-color-primary)', color: '#fff' }
            : { boxShadow: 'inset 0 0 0 1px var(--k-color-border)' }"
        >
          <IconCheck v-if="selected" :size="12" />
        </span>
      </template>
    </KSelect>

    <div style="font-size: 12px; color: var(--k-color-text-tertiary)">
      #option 内放头像、两行文字与自绘选中态；#label 让单选回显也带头像。
    </div>
  </KFlex>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { IconCheck } from '@tabler/icons-vue'
import KSelect from 'kit/vue/ui/components/data-entry/Select/Select.vue'
import KFlex from 'kit/vue/ui/components/layouts/Flex/Flex.vue'

const people = [
  { label: '林夏', value: 'lin', desc: '产品设计 · 交互', dept: '设计部', color: '#845ef7' },
  { label: '周屿', value: 'zhou', desc: '产品设计 · 视觉', dept: '设计部', color: '#5c7cfa' },
  { label: '陈默', value: 'chen', desc: '前端架构', dept: '研发部', color: '#12b886' },
  { label: '许知远', value: 'xu', desc: '后端工程师', dept: '研发部', color: '#20c997' },
  { label: '苏晚', value: 'su', desc: '数据分析', dept: '研发部', color: '#f59f00' },
  { label: '何田', value: 'he', desc: '品牌运营', dept: '市场部', color: '#f06595' },
]

const meta = Object.fromEntries(people.map(p => [p.value, p]))
const metaOf = (value: string | number) => meta[String(value)] ?? { desc: '', color: 'var(--k-color-text-tertiary)' }
const initial = (label?: string) => (label ?? '?').slice(0, 1)
const avatarStyle = (value?: string | number) => ({
  flex: 'none',
  width: '24px',
  height: '24px',
  borderRadius: '50%',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: metaOf(value ?? '').color,
  color: '#fff',
  fontSize: '11px',
  lineHeight: '24px',
})

const members = people.map(p => ({ label: p.label, value: p.value }))
const grouped = ['设计部', '研发部', '市场部'].map(dept => ({
  type: 'group' as const,
  label: dept,
  children: members.filter(m => metaOf(m.value).dept === dept),
}))

const member = ref<string | number | null>('lin')
const team = ref<(string | number)[]>(['chen', 'he'])
</script>