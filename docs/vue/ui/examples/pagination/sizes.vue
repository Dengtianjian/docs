<template>
  <KSpace direction="vertical" size="lg">
    <div class="row"><span class="tag">sm</span><KPagination :total="120" size="sm" show-total /></div>
    <div class="row"><span class="tag">md</span><KPagination :total="120" size="md" show-total /></div>
    <div class="row"><span class="tag">lg</span><KPagination :total="120" size="lg" show-total /></div>
  </KSpace>
</template>

<script setup lang="ts">
import KPagination from 'kit/vue/ui/components/Pagination/Pagination.vue'
import KSpace from 'kit/vue/ui/components/Space/Space.vue'
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
