<template>
  <!-- 两端对齐：典型工具栏/表单项布局 -->
  <KFlex :inline="false" justify="between" align="center" style="border: 1px dashed var(--k-color-border); padding: 8px 12px; border-radius: var(--k-border-radius)">
    <span>左侧内容</span>
    <KFlex gap="xxs">
      <KButton size="sm">取消</KButton>
      <KButton size="sm" type="primary">确定</KButton>
    </KFlex>
  </KFlex>
</template>

<script setup lang="ts">
import KFlex from 'kit/vue/ui/components/layouts/Flex/Flex.vue'
import KButton from 'kit/vue/ui/components/general/Button/Button.vue'
</script>
