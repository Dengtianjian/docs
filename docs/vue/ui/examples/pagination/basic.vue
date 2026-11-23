<template>
  <KFlex vertical gap="lg">
    <KPagination v-model:current="page" v-model:page-size="size" :total="230" show-total />
    <div class="hint">当前第 {{ page }} 页，每页 {{ size }} 条</div>
    <KPagination :total="230" show-total show-size-changer show-quick-jumper />
    <KPagination :total="120" simple />
    <KPagination :total="8" hide-on-single-page />
    <KPagination :total="80" disabled show-total />
  </KFlex>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import KPagination from 'kit/vue/ui/components/Pagination/Pagination.vue'
import KFlex from 'kit/vue/ui/components/Flex/Flex.vue'

const page = ref(3)
const size = ref(10)
</script>

<style scoped>
.hint {
  color: var(--k-color-text-secondary);
  font-size: var(--k-font-size-sm);
}
</style>