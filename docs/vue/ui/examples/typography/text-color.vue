<template>
  <KSpace direction="vertical" :size="12">
    <KSpace :size="8">
      <KText color="var(--k-color-success)">Token 色</KText>
      <KText color="#fa8c16">任意色值</KText>
      <KText color="rgb(114, 46, 209)">rgb 值</KText>
    </KSpace>
    <KSpace :size="8">
      <KText gradient>渐变文字</KText>
      <KText gradient strong>渐变 + 加重</KText>
      <KText gradient code>渐变 + code</KText>
    </KSpace>
    <KSpace :size="8">
      <!-- 自定义色标：逗号分隔的两个（或多个）CSS 色值 -->
      <KText gradient="var(--k-color-primary), var(--k-color-warning)">自定义双色</KText>
      <KText gradient="linear-gradient(90deg, var(--k-color-error), var(--k-color-info))">完整 gradient()</KText>
    </KSpace>
  </KSpace>
</template>

<script setup lang="ts">
import KText from 'kit/vue/ui/components/Typography/Text.vue'
import KSpace from 'kit/vue/ui/components/Space/Space.vue'
</script>
