<template>
  <KFlex vertical gap="lg" style="width: 100%">
    <KSteps v-model:current="current" direction="vertical" variant="navigation" show-icon clickable>
      <KStep title="账号资料">
        <template #icon><UserIcon /></template>
        <template #description>已由管理员填写</template>
      </KStep>
      <KStep title="安全验证" description="邮箱或手机验证" />
      <KStep title="完善资料" description="企业与开票信息" />
      <KStep title="完成设置" description="进入工作台" />
    </KSteps>
  </KFlex>
</template>

<script setup lang="ts">
import { defineComponent, h, ref } from 'vue'
import KSteps from 'kit/vue/ui/components/navigation/Steps/Steps.vue'
import KStep from 'kit/vue/ui/components/navigation/Steps/Step.vue'
import KFlex from 'kit/vue/ui/components/layouts/Flex/Flex.vue'

const current = ref(1)

const UserIcon = defineComponent({
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
          h('circle', { cx: 8, cy: 5.4, r: 2.6 }),
          h('path', { d: 'M3.2 13.2c.6-2.3 2.5-3.6 4.8-3.6s4.2 1.3 4.8 3.6' }),
        ],
      )
  },
})
</script>