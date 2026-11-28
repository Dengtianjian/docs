<template>
  <KResult status="404" title="页面不存在" sub-title="链接可能已失效，或你访问的页面已被移动。">
    <template #extra>
      <KButton type="primary" @click="back">返回首页</KButton>
      <KButton @click="reload">重新加载</KButton>
    </template>
    <div class="result-tip">错误码：404 · 请求 ID：{{ requestId }}</div>
  </KResult>
</template>

<script setup lang="ts">
import KResult from 'kit/vue/ui/components/feedback/Result/Result.vue'
import KButton from 'kit/vue/ui/components/general/Button/Button.vue'

const requestId = 'req_8f2c1a'
function back() {
  console.log('back')
}
function reload() {
  console.log('reload')
}
</script>

<style scoped>
.result-tip {
  color: var(--k-color-text-tertiary);
  font-size: var(--k-font-size-sm);
  text-align: center;
}
</style>