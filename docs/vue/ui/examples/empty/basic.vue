<template>
  <KFlex vertical gap="lg">
    <KFlex gap="lg" align="start" wrap>
      <KEmpty size="sm" description="小号空态" style="width: 180px" />
      <KEmpty description="暂无数据" style="width: 180px" />
      <KEmpty size="lg" description="大号空态" style="width: 180px" />
    </KFlex>
    <KEmpty :icon="Search" title="没有匹配的结果" description="试试调整筛选条件，或新建一条记录">
      <template #actions>
        <KButton size="sm" @click="reset">重置筛选</KButton>
        <KButton size="sm" type="primary">新建</KButton>
      </template>
    </KEmpty>
    <KEmpty description="自定义插图">
      <template #image>
        <span class="custom">🗂️</span>
      </template>
    </KEmpty>
  </KFlex>
</template>

<script setup lang="ts">
import KEmpty from 'kit/vue/ui/components/Empty/Empty.vue'
import KButton from 'kit/vue/ui/components/Button/Button.vue'
import KFlex from 'kit/vue/ui/components/Flex/Flex.vue'
import { Search } from '@vicons/tabler'

function reset() {
  // demo only
}
</script>

<style scoped>
.custom {
  font-size: 64px;
  line-height: 1;
}
</style>