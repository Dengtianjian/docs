<script setup lang="ts">
import KSpace from 'kit/vue/ui/components/Space/Space.vue'
import KButton from 'kit/vue/ui/components/Button/Button.vue'
</script>

<template>
  <div style="display: flex; gap: 48px; align-items: flex-start">
    <KSpace direction="vertical">
      <KButton type="primary" block>纵向一</KButton>
      <KButton block>纵向二</KButton>
      <KButton block>纵向三</KButton>
    </KSpace>
    <!-- size 支持 [行, 列] 二元组，wrap 时两个轴分别生效 -->
    <KSpace :size="['sm', 'lg']" wrap style="max-width: 240px">
      <KButton v-for="i in 7" :key="i">按钮 {{ i }}</KButton>
    </KSpace>
  </div>
</template>
