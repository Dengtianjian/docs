<template>
  <KSteps :current="1">
    <KStep>
      <template #icon><IconUser /></template>
      <template #title>账号资料</template>
      <template #description>已由管理员填写</template>
    </KStep>
    <KStep>
      <template #icon><IconLock /></template>
      <template #title>安全设置</template>
      <template #description>请开启两步验证</template>
    </KStep>
    <KStep title="完成" description="全部设置完成后生效" />
  </KSteps>
</template>

<script setup lang="ts">
import { IconLock, IconUser } from '@tabler/icons-vue'
import KSteps from 'kit/vue/ui/components/navigation/Steps/Steps.vue'
import KStep from 'kit/vue/ui/components/navigation/Steps/Step.vue'
</script>