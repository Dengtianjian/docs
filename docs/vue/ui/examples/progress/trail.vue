<template>
  <KFlex vertical gap="lg" style="width: 100%">
    <KProgress :percent="60" color="#6a5cff" />
    <KProgress :percent="60" :color="['#6a5cff', '#12c2e9']" />
    <KProgress :percent="60" color="#6a5cff" :stroke-color="['#fa8c16', '#f5222d']" />
    <KProgress :percent="60" color="#6a5cff" :trail-color="['#ffe7ba', '#f6ffed']" />
    <KProgress type="steps" :percent="60" :steps="8" :color="['#1677ff', '#52c41a']" />
    <KFlex gap="lg" align="center" wrap>
      <KProgress type="circle" :percent="70" color="#6a5cff" />
      <KProgress type="circle" :percent="70" :color="['#6a5cff', '#12c2e9']" />
      <KProgress type="circle" :segments="10" :percent="70" color="#fa8c16" />
    </KFlex>
    <KProgress :percent="90" :items="itemGradients" />
    <KProgress type="steps" :percent="90" :steps="10" :items="itemGradients" />
    <KFlex gap="lg" align="center" wrap>
      <KProgress type="circle" :percent="90" :items="itemGradients" />
      <KProgress type="circle" :segments="10" :percent="90" :items="itemGradients" />
    </KFlex>
    <div class="group-pair">
      <KProgressGroup :size="220" :stroke-width="14" :gap="8">
        <KProgress :percent="90" :stroke-color="ladderPairs[0]" />
        <KProgress :percent="75" :stroke-color="ladderPairs[1]" />
        <KProgress :percent="60" :stroke-color="ladderPairs[2]" />
        <KProgress :percent="45" :stroke-color="ladderPairs[3]" />
      </KProgressGroup>
      <KProgressGroup :size="220" :stroke-width="14" :gap="8">
        <KProgress :percent="90" :items="itemGradients" />
        <KProgress :percent="75" :items="itemGradients" />
        <KProgress :percent="60" :items="itemGradients" />
        <KProgress :percent="45" :items="itemGradients" />
      </KProgressGroup>
    </div>
    <KProgress :percent="90" :items="itemGradients" />
    <KFlex gap="lg" align="center" wrap>
      <KProgress type="circle" :percent="90" :items="itemGradients" />
      <KProgress type="circle" :segments="10" :percent="90" :items="itemGradients" />
    </KFlex>
    <KProgress :percent="75" :success-percent="45" :color="['#93c5fd', '#2563eb']" />
    <KProgress :percent="90" :items="multiHueItems" />
    <KFlex gap="lg" align="center" wrap>
      <KProgress type="circle" :percent="90" :items="multiHueItems" />
    </KFlex>
    <KProgress :percent="90" :items="multiHueItems" items-stack="end" />
    <KFlex gap="lg" align="center" wrap>
      <KProgress type="circle" :percent="90" :items="multiHueItems" items-stack="end" />
    </KFlex>
    <p class="hint">
      color 同时设置进度与轨道（轨道自动浅色）；strokeColor 覆盖进度、trailColor 覆盖轨道。单值为单色，数组为渐变。使用 items 时以 items 为准：底层进度条隐藏、successPercent 等进度类 props 不生效。最后：同色系四组渐变 items（条形 / 分段 / 环形 / 分段环）、同心叠环两组（左：每环一组渐变；右：每环四段渐变）、其下的条形与两个环形用 items 四段渐变；末尾一条条形专作 successPercent 成功段，另加非同色系四组渐变的条形与环形（不分段）、圆角头，并各加一份 itemsStack="end"（后段压前段）对照。
    </p>
  </KFlex>
</template>

<script setup lang="ts">
import KProgress from 'kit/vue/ui/components/feedback/Progress/Progress.vue'
import KProgressGroup from 'kit/vue/ui/components/feedback/Progress/Group.vue'
import KFlex from 'kit/vue/ui/components/layouts/Flex/Flex.vue'

/* 同一色系四组渐变：后一组的起点 = 前一组的终点，整体逐渐加深 */
const itemGradients = [
  { percent: 25, color: ['#93c5fd', '#60a5fa'] },
  { percent: 25, color: ['#60a5fa', '#3b82f6'] },
  { percent: 20, color: ['#3b82f6', '#2563eb'] },
  { percent: 20, color: ['#2563eb', '#1e40af'] },
]
const ladderPairs = itemGradients.map(item => item.color)

/* 非同色系四组渐变：蓝 / 绿 / 橙红 / 紫粉 */
const multiHueItems = [
  { percent: 25, color: ['#1677ff', '#36cfc9'] },
  { percent: 25, color: ['#52c41a', '#a0d911'] },
  { percent: 20, color: ['#fa8c16', '#f5222d'] },
  { percent: 20, color: ['#722ed1', '#eb2f96'] },
]
</script>

<style scoped>
.hint {
  margin: 0;
  font-size: var(--k-font-size-sm);
  color: var(--k-color-text-tertiary);
}
.group-pair {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: clamp(24px, 5vw, 56px);
  flex-wrap: wrap;
}
</style>