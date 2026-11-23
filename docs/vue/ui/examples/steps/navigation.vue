<template>
  <KFlex vertical gap="lg" style="width: 100%">
    <KSteps
      v-for="size in sizes"
      :key="size"
      v-model:current="current"
      variant="navigation"
      :size="size"
      clickable
    >
      <KStep title="填写信息" description="账号与联系方式" />
      <KStep title="安全验证" description="邮箱或手机验证" />
      <KStep title="完成设置" description="进入工作台" />
    </KSteps>
  </KFlex>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import KSteps from 'kit/vue/ui/components/Steps/Steps.vue'
import KStep from 'kit/vue/ui/components/Steps/Step.vue'
import KFlex from 'kit/vue/ui/components/Flex/Flex.vue'
import type { KStepsSize } from 'kit/vue/ui'

const current = ref(1)
const sizes: KStepsSize[] = ['sm', 'md', 'lg']
</script>