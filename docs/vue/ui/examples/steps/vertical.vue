<template>
  <KFlex vertical gap="lg">
    <KSteps v-model:current="active" direction="vertical" clickable @change="onChange">
      <KStep title="创建实例" description="选择配置与可用区" />
      <KStep title="配置网络" description="绑定公网 IP 与安全组" />
      <KStep title="确认订单" description="核对费用并支付" />
      <KStep title="完成部署" disabled description="支付后自动执行" />
    </KSteps>
    <div class="steps-tip">当前步骤：{{ active + 1 }} / 4</div>
  </KFlex>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import KSteps from 'kit/vue/ui/components/navigation/Steps/Steps.vue'
import KStep from 'kit/vue/ui/components/navigation/Steps/Step.vue'
import KFlex from 'kit/vue/ui/components/layouts/Flex/Flex.vue'

const active = ref(0)

function onChange(index: number) {
  console.log('切换步骤', index)
}
</script>

<style scoped>
.steps-tip {
  color: var(--k-color-text-secondary);
  font-size: var(--k-font-size-sm);
}
</style>