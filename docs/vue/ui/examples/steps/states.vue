<template>
  <KSpace direction="vertical" size="lg">
    <KSteps :current="1" status="error">
      <KStep title="填写信息" />
      <KStep title="校验失败" description="证件号格式不正确" />
      <KStep title="提交" />
    </KSteps>
    <KSteps :current="1" variant="dot">
      <KStep title="待处理" />
      <KStep title="处理中" />
      <KStep title="已完成" />
    </KSteps>
    <KSteps :current="2" size="sm">
      <KStep title="小号" />
      <KStep title="尺寸" />
      <KStep title="sm" />
    </KSteps>
    <KSteps :current="0" size="lg">
      <KStep title="大号" />
      <KStep title="尺寸" />
      <KStep title="lg" />
    </KSteps>
  </KSpace>
</template>

<script setup lang="ts">
import KSteps from 'kit/vue/ui/components/Steps/Steps.vue'
import KStep from 'kit/vue/ui/components/Steps/Step.vue'
import KSpace from 'kit/vue/ui/components/Space/Space.vue'
</script>