<template>
  <div style="display: flex; gap: 48px; align-items: flex-start">
    <KFlex :inline="false" vertical>
      <KButton type="primary" block>纵向一</KButton>
      <KButton block>纵向二</KButton>
      <KButton block>纵向三</KButton>
    </KFlex>
    <!-- gap 支持 [行, 列] 二元组，wrap 时两个轴分别生效 -->
    <KFlex :inline="false" :gap="['sm', 'lg']" wrap style="max-width: 240px">
      <KButton v-for="i in 7" :key="i">按钮 {{ i }}</KButton>
    </KFlex>
  </div>
</template>

<script setup lang="ts">
import KFlex from 'kit/vue/ui/components/Flex/Flex.vue'
import KButton from 'kit/vue/ui/components/Button/Button.vue'
</script>
