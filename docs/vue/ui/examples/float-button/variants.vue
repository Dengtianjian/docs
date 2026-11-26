<template>
  <KFloatButton
    position="right-top"
    shape="square"
    content="帮助"
    type="default"
    tooltip="文档与反馈"
    :badge="{ dot: true }"
    :offset="[24, 96]"
    @click="clicked = (clicked ?? 0) + 1"
  >
    <template #icon>
      <span class="question">?</span>
    </template>
  </KFloatButton>
  <p class="tip">点击次数：{{ clicked ?? 0 }}</p>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import KFloatButton from 'kit/vue/ui/components/other/FloatButton/FloatButton.vue'

const clicked = ref<number | null>(null)
</script>

<style scoped>
.question {
  display: inline-flex;
  width: 20px;
  height: 20px;
  align-items: center;
  justify-content: center;
  border: 1.5px solid currentColor;
  border-radius: 50%;
  font-size: 12px;
  font-weight: 700;
}
.tip {
  margin: 0;
  color: var(--k-color-text-secondary);
  font-size: var(--k-font-size-sm);
}
</style>