<template>
  <KFlex vertical gap="lg">
    <KFlex gap="lg" wrap>
      <KButton type="primary" @click="burst(12)">弹 12 条（列内滚动）</KButton>
      <KButton @click="notification!.config({ maxCount: 3 }); burst(12)">maxCount=3 再弹 12 条</KButton>
      <KButton @click="notification!.config({ maxCount: undefined })">取消 maxCount</KButton>
      <KButton variant="text" type="link" @click="notification!.destroyAll()">清空</KButton>
    </KFlex>
    <KText type="secondary">
      本示例关闭堆叠（stackLimit: 0），按可滚动列表实现；默认 stackLimit=3 时同方位的列表会堆叠收起，见上方「堆叠收起」演示。maxCount 超限直接挤掉最旧一条（无退场动画）。
    </KText>
  </KFlex>
</template>

<script setup lang="ts">
import { useKApp } from 'kit/vue/ui/composables/useKApp'
import KButton from 'kit/vue/ui/components/Button/Button.vue'
import KText from 'kit/vue/ui/components/Typography/Text.vue'
import KFlex from 'kit/vue/ui/components/Flex/Flex.vue'

const { notification } = useKApp()!

function burst(n: number) {
  notification!.config({ stackLimit: 0 })
  for (let i = 1; i <= n; i++) {
    notification!.open({
      title: '系统通知',
      description: `第 ${i} 条消息，用于演示列超出视口高度后在列内滚动。`,
      duration: 60,
    })
  }
}
</script>
