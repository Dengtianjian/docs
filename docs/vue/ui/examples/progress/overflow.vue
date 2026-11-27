<template>
  <div>
    <KFlex gap="lg" align="center" wrap>
      <KProgress type="circle" :percent="75" :format="formatLong" info-tooltip />
      <KProgress type="circle" size="sm" :percent="75" :format="formatLong" info-tooltip />
      <KProgress
        type="circle"
        :percent="75"
        :stroke-width="14"
        :format="formatLong"
        info-tooltip
      />
    </KFlex>
    <p class="hint">中心文案超出内圆时自动省略，悬停环上可查看全文案。</p>
  </div>
</template>

<script setup lang="ts">
import KProgress from 'kit/vue/ui/components/feedback/Progress/Progress.vue'
import KFlex from 'kit/vue/ui/components/layouts/Flex/Flex.vue'

function formatLong() {
  return '正在上传固件 75%'
}
</script>

<style scoped>
.hint {
  margin: 16px 0 0;
  font-size: var(--k-font-size-sm);
  color: var(--k-color-text-tertiary);
}
</style>