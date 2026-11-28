<template>
  <KFlex vertical gap="lg" style="width: 100%">
    <div v-for="file in files" :key="file.name">
      <KProgress :percent="file.percent" :status="file.status" :stroke-width="8">
        <template #content="{ percent }">
          <span class="slot-row">
            <KAvatar :text="file.initial" :color="file.color" size="xs" />
            <span class="slot-name">{{ file.name }}</span>
            <KTag :color="file.tagColor" size="sm" round>{{ file.tag }}</KTag>
            <strong class="slot-percent">{{ percent }}%</strong>
          </span>
        </template>
      </KProgress>
    </div>

    <KFlex gap="lg" align="center" wrap>
      <KProgress type="circle" :percent="72" :stroke-width="10">
        <template #content="{ percent }">
          <span class="slot-stack">
            <KAvatar text="云" size="xs" color="#7c5cff" />
            <strong class="stack-percent">{{ percent }}%</strong>
            <span class="stack-sub">同步中</span>
          </span>
        </template>
      </KProgress>
      <span class="hint">插槽里可以直接组合 KAvatar、KTag 与自定义排版。</span>
    </KFlex>
  </KFlex>
</template>

<script setup lang="ts">
import KProgress from 'kit/vue/ui/components/feedback/Progress/Progress.vue'
import KAvatar from 'kit/vue/ui/components/data-display/Avatar/Avatar.vue'
import KTag from 'kit/vue/ui/components/data-display/Tag/Tag.vue'
import KFlex from 'kit/vue/ui/components/layouts/Flex/Flex.vue'

const files = [
  {
    name: '2026 年度报告.pdf',
    initial: '报',
    color: '#1677ff',
    percent: 64,
    status: 'active',
    tag: '上传中',
    tagColor: 'processing',
  },
  {
    name: '产品演示.mp4',
    initial: '视',
    color: '#52c41a',
    percent: 100,
    status: 'success',
    tag: '已完成',
    tagColor: 'success',
  },
  {
    name: '设计稿.zip',
    initial: '设',
    color: '#fa8c16',
    percent: 72,
    status: 'exception',
    tag: '失败',
    tagColor: 'error',
  },
] as const
</script>

<style scoped>
.slot-row {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
}
.slot-name {
  max-width: 120px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: var(--k-font-size-sm);
  color: var(--k-color-text);
}
.slot-percent {
  font-variant-numeric: tabular-nums;
  color: var(--k-color-text);
}
.slot-stack {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  line-height: 1.2;
}
.stack-percent {
  font-size: var(--k-font-size-lg);
}
.stack-sub {
  font-size: var(--k-font-size-sm);
  color: var(--k-color-text-tertiary);
}
.hint {
  font-size: var(--k-font-size-sm);
  color: var(--k-color-text-tertiary);
}
</style>