<template>
  <div class="result-grid">
    <KResult status="success" title="提交成功" sub-title="审批流已启动，预计 1 个工作日完成。" />
    <KResult status="warning" title="资料待补充" sub-title="缺少营业执照副本，请补充后重新提交。" />
    <KResult status="error" title="提交失败" sub-title="网络异常，请稍后重试。" />
    <KResult status="info" title="等待审核" sub-title="审核结果会通过站内信通知。" />
  </div>
</template>

<script setup lang="ts">
import KResult from 'kit/vue/ui/components/Result/Result.vue'
</script>

<style scoped>
.result-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 16px;
}
</style>