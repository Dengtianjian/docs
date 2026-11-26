<template>
  <div class="recipe-settings">
    <header class="head">
      <div>
        <p class="eyebrow">PREFERENCES</p>
        <h2>通知设置</h2>
        <p>控制哪些消息会打扰你，以及免打扰时段。</p>
      </div>
      <span class="saved" :class="{ 'is-visible': saved }">已保存</span>
    </header>

    <div class="grid">
      <KCard title="消息通知" class="settings-card">
        <template #extra>
          <KTag color="default" variant="borderless" size="sm">所有设备</KTag>
        </template>
        <div class="setting-list">
          <div v-for="item in preferences" :key="item.key" class="setting-row">
            <div>
              <strong>{{ item.title }}</strong>
              <p>{{ item.description }}</p>
            </div>
            <KSwitch v-model="item.enabled" />
          </div>
        </div>
      </KCard>

      <KCard title="免打扰" class="settings-card">
        <template #extra>
          <KTag :color="quietEnabled ? 'success' : 'default'" variant="borderless" size="sm">
            {{ quietEnabled ? '已开启' : '已关闭' }}
          </KTag>
        </template>
        <div class="quiet-head">
          <div>
            <strong>夜间免打扰</strong>
            <p>在指定时段内暂停推送，紧急消息除外。</p>
          </div>
          <KSwitch v-model="quietEnabled" />
        </div>
        <KDivider />
        <div class="time-range" :class="{ 'is-disabled': !quietEnabled }">
          <KSelect v-model="quietStart" :options="hourOptions" :disabled="!quietEnabled" />
          <span>至</span>
          <KSelect v-model="quietEnd" :options="hourOptions" :disabled="!quietEnabled" />
          <span class="duration">共 {{ quietDuration }} 小时</span>
        </div>
        <KButton type="primary" block :disabled="!quietEnabled" @click="save">保存设置</KButton>
      </KCard>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import KButton from 'kit/vue/ui/components/general/Button/Button.vue'
import KCard from 'kit/vue/ui/components/layouts/Card/Card.vue'
import KDivider from 'kit/vue/ui/components/general/Divider/Divider.vue'
import KSelect from 'kit/vue/ui/components/data-entry/Select/Select.vue'
import KSwitch from 'kit/vue/ui/components/data-entry/Switch/Switch.vue'
import KTag from 'kit/vue/ui/components/data-display/Tag/Tag.vue'

const preferences = ref([
  { key: 'mention', title: '@ 提及', description: '有人 @ 你或回复你的评论时通知', enabled: true },
  { key: 'assignment', title: '任务分配', description: '被指派任务或审批时通知', enabled: true },
  { key: 'digest', title: '每周摘要', description: '每周一发送上周团队概览', enabled: false },
  { key: 'marketing', title: '产品动态', description: '新功能、活动与版本更新', enabled: false },
])

const hourOptions = Array.from({ length: 24 }, (_, hour) => {
  const label = `${String(hour).padStart(2, '0')}:00`
  return { label, value: label }
})
const quietEnabled = ref(true)
const quietStart = ref('22:00')
const quietEnd = ref('08:00')
const saved = ref(false)

const quietDuration = computed(() => {
  const toHour = (value: string) => Number(value.slice(0, 2))
  const start = toHour(quietStart.value)
  const end = toHour(quietEnd.value)
  return (end - start + 24) % 24 || 24
})

function save() {
  saved.value = true
  window.setTimeout(() => (saved.value = false), 1600)
}
</script>

<style scoped>
.recipe-settings {
  padding: 20px;
  border: 1px solid var(--k-color-border-secondary);
  border-radius: 16px;
  background: var(--k-color-bg-layout);
}
.head {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 16px;
  padding: 2px 2px 18px;
}
.eyebrow {
  margin: 0 0 6px;
  color: var(--k-color-text-tertiary);
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.08em;
}
.head h2 {
  margin: 0;
  font-size: 24px;
  line-height: 32px;
  letter-spacing: -0.02em;
}
.head p:last-child {
  margin: 6px 0 0;
  color: var(--k-color-text-secondary);
  font-size: 12px;
}
.saved {
  opacity: 0;
  color: var(--k-color-success-text);
  font-size: 12px;
  transition: opacity 0.2s;
}
.saved.is-visible {
  opacity: 1;
}
.grid {
  display: grid;
  grid-template-columns: minmax(0, 1.25fr) minmax(300px, 0.75fr);
  align-items: start;
  gap: 12px;
}
.setting-list {
  display: grid;
}
.setting-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  padding: 13px 0;
  border-bottom: 1px solid var(--k-color-border-secondary);
}
.setting-row:first-child {
  padding-top: 0;
}
.setting-row:last-child {
  padding-bottom: 0;
  border-bottom: 0;
}
.setting-row strong,
.quiet-head strong {
  font-size: 13px;
  font-weight: 500;
}
.setting-row p,
.quiet-head p {
  margin: 3px 0 0;
  color: var(--k-color-text-secondary);
  font-size: 12px;
  line-height: 18px;
}
.quiet-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}
.time-range {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
}
.time-range > :deep(.k-select) {
  flex: 1;
}
.time-range.is-disabled {
  opacity: 0.55;
}
.time-range > span {
  flex: none;
  color: var(--k-color-text-secondary);
  font-size: 12px;
}
.duration {
  white-space: nowrap;
}
@media (max-width: 820px) {
  .grid {
    grid-template-columns: minmax(0, 1fr);
  }
}
@media (max-width: 560px) {
  .recipe-settings {
    padding: 12px;
  }
  .head {
    align-items: flex-start;
    flex-direction: column;
  }
  .time-range {
    flex-wrap: wrap;
  }
}
</style>