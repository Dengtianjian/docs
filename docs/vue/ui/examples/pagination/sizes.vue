<template>
  <KFlex vertical gap="lg">
    <div class="row"><span class="tag">sm</span><KPagination :total="120" size="sm" show-total /></div>
    <div class="row"><span class="tag">md</span><KPagination :total="120" size="md" show-total /></div>
    <div class="row"><span class="tag">lg</span><KPagination :total="120" size="lg" show-total /></div>
  </KFlex>
</template>

<script setup lang="ts">
import KPagination from 'kit/vue/ui/components/navigation/Pagination/Pagination.vue'
import KFlex from 'kit/vue/ui/components/layouts/Flex/Flex.vue'
</script>

<style scoped>
.row {
  display: flex;
  align-items: center;
  gap: 12px;
}
.tag {
  width: 28px;
  color: var(--k-color-text-secondary);
  font-size: var(--k-font-size-sm);
}
</style>
