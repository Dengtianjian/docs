<template>
  <div class="grid">
    <KSwitch v-model="sort" label="排序 · 文字在左" label-position="left" />
    <KSwitch v-model="sort" label="排序 · 文字在右" label-position="right" />
    <KSwitch v-model="sort" label="排序 · 文字在上" label-position="top" />
    <KSwitch v-model="sort" label="排序 · 文字在下" label-position="bottom" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import KSwitch from 'kit/vue/ui/components/Switch/Switch.vue'

const sort = ref(true)
</script>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, max-content));
  gap: 24px 48px;
  align-items: center;
}
</style>