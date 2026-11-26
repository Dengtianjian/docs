<template>
  <KFlex vertical gap="lg" style="width: 100%">
    <KSteps v-model:current="current" direction="vertical" variant="panel" show-icon clickable>
      <KStep title="提交申请" description="填写基础信息与联系人" />
      <KStep title="资料审核">
        <template #icon><ShieldIcon /></template>
        <template #description>预计 1 个工作日</template>
      </KStep>
      <KStep title="完成开通" description="审核通过后自动生效" />
    </KSteps>
  </KFlex>
</template>

<script setup lang="ts">
import { defineComponent, h, ref } from 'vue'
import KSteps from 'kit/vue/ui/components/navigation/Steps/Steps.vue'
import KStep from 'kit/vue/ui/components/navigation/Steps/Step.vue'
import KFlex from 'kit/vue/ui/components/layouts/Flex/Flex.vue'

const current = ref(1)

const ShieldIcon = defineComponent({
  setup() {
    return () =>
      h(
        'svg',
        {
          viewBox: '0 0 16 16',
          width: '1em',
          height: '1em',
          fill: 'none',
          stroke: 'currentColor',
          'stroke-width': 1.5,
          'stroke-linecap': 'round',
          'stroke-linejoin': 'round',
          'aria-hidden': 'true',
        },
        [
          h('path', { d: 'M8 1.8l5 1.8v4.1c0 3.2-2.1 5.4-5 6.5-2.9-1.1-5-3.3-5-6.5V3.6l5-1.8Z' }),
          h('path', { d: 'M5.8 8l1.5 1.5 2.9-3' }),
        ],
      )
  },
})
</script>