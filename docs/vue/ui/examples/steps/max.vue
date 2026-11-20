<template>
  <KSpace direction="vertical" size="lg" style="width: 100%">
    <KSteps :current="4" :max="5">
      <KStep
        v-for="(step, i) in steps"
        :key="step"
        :title="step"
        :description="i === 4 ? '正在创建账号' : undefined"
      />
    </KSteps>
    <div class="steps-tip">共 8 步，max=5：保留首尾与当前步，中间折叠为省略节点。</div>
  </KSpace>
</template>

<script setup lang="ts">
import KSteps from 'kit/vue/ui/components/Steps/Steps.vue'
import KStep from 'kit/vue/ui/components/Steps/Step.vue'
import KSpace from 'kit/vue/ui/components/Space/Space.vue'

const steps = ['提交申请', '资料审核', '资质核验', '签署合同', '开通账号', '配置权限', '部署实例', '完成']
</script>

<style scoped>
.steps-tip {
  color: var(--k-color-text-secondary);
  font-size: var(--k-font-size-sm);
}
</style>