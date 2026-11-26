<template>
  <KFlex vertical gap="lg" style="width: 100%">
    <KSteps :current="current" variant="dot">
      <KStep title="待处理" description="工单已创建" />
      <KStep title="处理中" description="客服已接单" />
      <KStep title="已完成" description="等待评价" />
    </KSteps>
    <KFlex>
      <KButton size="sm" :disabled="current === 0" @click="current--">上一步</KButton>
      <KButton size="sm" type="primary" :disabled="current === 2" @click="current++">下一步</KButton>
    </KFlex>
  </KFlex>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import KSteps from 'kit/vue/ui/components/navigation/Steps/Steps.vue'
import KStep from 'kit/vue/ui/components/navigation/Steps/Step.vue'
import KButton from 'kit/vue/ui/components/general/Button/Button.vue'
import KFlex from 'kit/vue/ui/components/layouts/Flex/Flex.vue'

const current = ref(1)
</script>