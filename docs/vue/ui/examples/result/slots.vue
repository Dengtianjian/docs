<template>
  <div class="result-slots">
    <KResult
      class="result-card"
      status="success"
      title="prop 标题会被插槽覆盖"
      sub-title="prop 副标题也会被插槽覆盖"
    >
      <template #icon>
        <IconRocket size="1em" />
      </template>
      <template #title>
        发布完成
        <KTag size="sm" color="success" variant="filled">v2.4.0</KTag>
      </template>
      <template #subTitle>
        产物已上传 CDN，用时 42s。
        <KButton type="primary" size="xs" variant="text">查看日志</KButton>
      </template>
      <template #extra>
        <KButton type="primary">复制链接</KButton>
        <KButton>查看详情</KButton>
      </template>
      <div class="result-panel">
        <div v-for="item in summary" :key="item.label" class="result-panel__row">
          <span class="result-panel__label">{{ item.label }}</span>
          <span class="result-panel__value">{{ item.value }}</span>
        </div>
      </div>
    </KResult>

    <KResult class="result-card" status="info">
      <template #icon>
        <IconChartPie size="1em" />
      </template>
      <template #title>报表生成中</template>
      <template #subTitle>预计 2 分钟后完成，可先离开此页，完成后站内信通知。</template>
      <template #extra>
        <KButton size="sm">刷新状态</KButton>
      </template>
      <ol class="result-steps">
        <li class="result-steps__done">拉取昨日订单数据</li>
        <li class="result-steps__done">聚合渠道与商品维度</li>
        <li>生成图表并打包下载文件</li>
      </ol>
    </KResult>
  </div>
</template>

<script setup lang="ts">
import { IconChartPie, IconRocket } from '@tabler/icons-vue'
import KResult from 'kit/vue/ui/components/feedback/Result/Result.vue'
import KButton from 'kit/vue/ui/components/general/Button/Button.vue'
import KTag from 'kit/vue/ui/components/data-display/Tag/Tag.vue'

const summary = [
  { label: '产物', value: 'dist-2.4.0.tar.gz · 3.2 MB' },
  { label: '环境', value: 'production · cn-hangzhou' },
  { label: '耗时', value: '42s' }
]
</script>

<style scoped>
.result-slots {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 320px), 1fr));
  gap: 16px;
  align-items: start;
}

.result-card {
  border: 1px solid var(--k-color-border-secondary);
  border-radius: var(--k-border-radius-lg);
  background: var(--k-color-bg-container);
}

.result-panel {
  border: 1px solid var(--k-color-border-secondary);
  border-radius: var(--k-border-radius);
  background: var(--k-color-bg-layout);
  padding: var(--k-size-xs) var(--k-size);
}

.result-panel__row {
  display: flex;
  justify-content: space-between;
  gap: var(--k-size);
  padding: var(--k-size-xs) 0;
  font-size: var(--k-font-size-sm);
}

.result-panel__row + .result-panel__row {
  border-top: 1px dashed var(--k-color-split);
}

.result-panel__label {
  color: var(--k-color-text-tertiary);
  flex: none;
}

.result-panel__value {
  color: var(--k-color-text);
  text-align: right;
  word-break: break-all;
}

.result-steps {
  margin: 0;
  padding-left: 18px;
  color: var(--k-color-text-secondary);
  font-size: var(--k-font-size);
  line-height: 2;
}

.result-steps__done {
  color: var(--k-color-success-text);
}
</style>