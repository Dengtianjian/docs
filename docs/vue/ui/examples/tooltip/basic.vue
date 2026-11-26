<template>
  <KFlex gap="lg" wrap>
    <KTooltip content="=top 默认方位（content prop 兜底）">
      <template #trigger><KButton>Top</KButton></template>
    </KTooltip>
    <KTooltip title="=bottom（title prop 别名）" placement="bottom">
      <template #trigger><KButton>Bottom</KButton></template>
    </KTooltip>
    <KTooltip title="=left，后缀 LeftBottom 贴下缘" placement="leftBottom">
      <template #trigger><KButton>LeftBottom</KButton></template>
    </KTooltip>
    <KTooltip title="=rightTop 贴上缘" placement="rightTop">
      <template #trigger><KButton>RightTop</KButton></template>
    </KTooltip>
    <KTooltip trigger="click" v-model:open="controlled" :mouse-enter-delay="0" :mouse-leave-delay="0">
      <template #trigger><KButton>{{ controlled ? '再点关闭' : 'Click 触发' }}</KButton></template>
      点击触发 + 受控开合（openChange 同步）
    </KTooltip>
    <KTooltip>
      <template #trigger><KButton>自定义内容</KButton></template>
      <b>默认插槽</b>：富内容提示
    </KTooltip>
    <KTooltip>
      <template #trigger><KButton>空内容不弹</KButton></template>
    </KTooltip>
    <KTooltip title="disabled 不弹出" disabled>
      <template #trigger><KButton>Disabled</KButton></template>
    </KTooltip>
  </KFlex>
  <p style="margin: 12px 0 0; color: var(--k-color-text-tertiary); font-size: var(--k-font-size-sm)">
    贴近视口上缘的 top 提示会自动翻到下方（可用浏览器缩窗口验证）。
  </p>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import KTooltip from 'kit/vue/ui/components/overlay/Tooltip/Tooltip.vue'
import KButton from 'kit/vue/ui/components/general/Button/Button.vue'
import KFlex from 'kit/vue/ui/components/layouts/Flex/Flex.vue'

const controlled = ref(false)
</script>
