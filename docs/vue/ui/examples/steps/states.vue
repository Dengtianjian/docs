<template>
  <KFlex vertical gap="lg" style="width: 100%">
    <KSteps :current="1" status="error">
      <KStep title="填写信息" />
      <KStep title="校验失败" description="证件号格式不正确" />
      <KStep title="提交" />
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
    <KSteps :current="1" :pulse="false">
      <KStep title="关闭呼吸" />
      <KStep title="当前步骤" description="pulse=false" />
      <KStep title="完成" />
    </KSteps>
  </KFlex>
</template>

<script setup lang="ts">
import KSteps from 'kit/vue/ui/components/Steps/Steps.vue'
import KStep from 'kit/vue/ui/components/Steps/Step.vue'
import KFlex from 'kit/vue/ui/components/Flex/Flex.vue'
</script>