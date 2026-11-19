<template>
  <KSteps :current="1">
    <KStep>
      <template #icon><UserIcon /></template>
      <template #title>账号资料</template>
      <template #description>已由管理员填写</template>
    </KStep>
    <KStep>
      <template #icon><LockIcon /></template>
      <template #title>安全设置</template>
      <template #description>请开启两步验证</template>
    </KStep>
    <KStep title="完成" description="全部设置完成后生效" />
  </KSteps>
</template>

<script setup lang="ts">
import { defineComponent, h } from 'vue'
import KSteps from 'kit/vue/ui/components/Steps/Steps.vue'
import KStep from 'kit/vue/ui/components/Steps/Step.vue'

function svg(children: ReturnType<typeof h>[]) {
  return defineComponent({
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
          children,
        )
    },
  })
}

const UserIcon = svg([
  h('circle', { cx: 8, cy: 5.4, r: 2.6 }),
  h('path', { d: 'M3.2 13.2c.6-2.3 2.5-3.6 4.8-3.6s4.2 1.3 4.8 3.6' }),
])
const LockIcon = svg([
  h('rect', { x: 3.2, y: 7.2, width: 9.6, height: 6.4, rx: 1.4 }),
  h('path', { d: 'M5.4 7.2V5.6a2.6 2.6 0 0 1 5.2 0v1.6' }),
])
</script>