<template>
  <KFlex vertical gap="xs" style="max-width: 320px">
    <KText strong>纵向堆叠（vertical + gap）</KText>
    <KText type="secondary">KFlex 是布局原子件：属性一对一映射 CSS flex，不附带行为。</KText>
    <KFlex justify="end" gap="xs">
      <KButton size="sm">取消</KButton>
      <KButton size="sm" type="primary">提交</KButton>
    </KFlex>
  </KFlex>
</template>

<script setup lang="ts">
import KFlex from 'kit/vue/ui/components/Flex/Flex.vue'
import KButton from 'kit/vue/ui/components/Button/Button.vue'
import KText from 'kit/vue/ui/components/Typography/Text.vue'
</script>
