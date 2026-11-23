<template>
  <div class="lanes">
    <div v-for="align in list" :key="align" class="lane">
      <div class="lane-label">align="{{ align }}"</div>
      <KPagination :total="45" show-total :align="align" />
    </div>
  </div>
</template>

<script setup lang="ts">
import KPagination from 'kit/vue/ui/components/Pagination/Pagination.vue'

const list = ['left', 'center', 'right'] as const
</script>

<style scoped>
.lanes {
  display: flex;
  flex-direction: column;
  gap: var(--k-size-sm);
}
.lane {
  padding: var(--k-size-sm);
  border: var(--k-line-width) dashed var(--k-color-border);
  border-radius: var(--k-border-radius-sm);
}
.lane-label {
  margin-bottom: var(--k-size-xs);
  color: var(--k-color-text-tertiary);
  font-size: var(--k-font-size-xs);
}
</style>