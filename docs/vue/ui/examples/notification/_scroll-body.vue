<script setup lang="ts">
import { useKApp } from 'kit/vue/ui/composables/useKApp'
import KButton from 'kit/vue/ui/components/Button/Button.vue'
import KText from 'kit/vue/ui/components/Typography/Text.vue'
import KSpace from 'kit/vue/ui/components/Space/Space.vue'

const { notification } = useKApp()!

function burst(n: number) {
  for (let i = 1; i <= n; i++) {
    notification!.open({
      title: `系统通知 ${i}`,
      description: `第 ${i} 条消息，用于演示列超出视口高度后在列内滚动。`,
      duration: 60,
    })
  }
}
</script>

<template>
  <KSpace direction="vertical" size="lg">
    <KSpace size="lg" wrap>
      <KButton type="primary" @click="burst(12)">弹 12 条（列内滚动）</KButton>
      <KButton @click="notification!.config({ maxCount: 3 }); burst(12)">maxCount=3 再弹 12 条</KButton>
      <KButton @click="notification!.config({ maxCount: undefined })">取消 maxCount</KButton>
      <KButton variant="text" type="link" @click="notification!.destroyAll()">清空</KButton>
    </KSpace>
    <KText type="secondary">
      本库差异登记：antd 默认溢出走 stack 收起（悬停展开），本库按可滚动列表实现（v6 list 语义含滚动区域）；
      maxCount 超限直接挤掉最旧一条（无退场动画）。
    </KText>
  </KSpace>
</template>
