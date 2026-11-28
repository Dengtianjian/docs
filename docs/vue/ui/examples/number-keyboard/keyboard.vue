<template>
  <div class="phone">
    <div class="display">
      <span class="label">输入金额</span>
      <strong>{{ value || '0' }}</strong>
    </div>
    <KNumberKeyboard v-model="value" :maxlength="6" show-extra-key extra-key-text="完成" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import KNumberKeyboard from 'kit/vue/ui/components/data-entry/NumberKeyboard/NumberKeyboard.vue'

const value = ref('')
</script>

<style scoped>
.phone {
  max-width: 360px;
  overflow: hidden;
  border: 1px solid var(--k-color-border-secondary);
  border-radius: var(--k-border-radius-lg);
  background: var(--k-color-fill-quaternary);
}
.display {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  padding: 28px 16px;
}
.label {
  color: var(--k-color-text-tertiary);
  font-size: var(--k-font-size-sm);
}
.display strong {
  min-height: 34px;
  font-size: 30px;
  font-variant-numeric: tabular-nums;
  letter-spacing: 0.06em;
}
</style>