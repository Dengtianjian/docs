<template>
  <KFlex vertical gap="lg" style="width: 420px; max-width: 100%">
    <KInputTags v-model="tags" placeholder="输入技能后回车" />
    <p class="hint">v-model：{{ tags.join('、') || '空' }}</p>
  </KFlex>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import KInputTags from 'kit/vue/ui/components/data-entry/InputTags/InputTags.vue'
import KFlex from 'kit/vue/ui/components/layouts/Flex/Flex.vue'

const tags = ref(['Vue', 'TypeScript'])
</script>

<style scoped>
.hint {
  margin: 0;
  color: var(--k-color-text-secondary);
  font-size: var(--k-font-size-sm);
}
</style>