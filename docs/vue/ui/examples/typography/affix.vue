<template>
  <KFlex :inline="false" vertical gap="sm">
    <KText prefix="¥" suffix="元" strong>1,299</KText>
    <KText>
      <template #prefix>
        <KTag color="success" variant="outlined" size="sm">NEW</KTag>
      </template>
      前后缀支持插槽，可放标签或图标
      <template #suffix>
        <KText type="secondary">（可选）</KText>
      </template>
    </KText>
  </KFlex>
</template>

<script setup lang="ts">
import KFlex from 'kit/vue/ui/components/layouts/Flex/Flex.vue'
import KText from 'kit/vue/ui/components/general/Typography/Text.vue'
import KTag from 'kit/vue/ui/components/data-display/Tag/Tag.vue'
</script>