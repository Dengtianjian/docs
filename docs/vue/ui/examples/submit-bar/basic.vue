<template>
  <div class="phone">
    <div class="body">
      <p>订单金额已含运费与优惠。</p>
      <p class="muted">固定栏在实际页面中吸附在视口底部。</p>
    </div>
    <KSubmitBar :price="268" label="合计" button-text="提交订单" @submit="last = '已提交'" />
  </div>
  <p class="tip">{{ last || '点击提交订单试试' }}</p>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import KSubmitBar from 'kit/vue/ui/components/SubmitBar/SubmitBar.vue'

const last = ref('')
</script>

<style scoped>
.phone {
  max-width: 420px;
  border: 1px solid var(--k-color-border-secondary);
  border-radius: var(--k-border-radius-lg);
  overflow: hidden;
}
.body {
  padding: 20px 16px;
  font-size: var(--k-font-size-sm);
}
.body p { margin: 0 0 8px; }
.muted { color: var(--k-color-text-tertiary); }
.tip {
  margin: 12px 0 0;
  color: var(--k-color-text-secondary);
  font-size: var(--k-font-size-sm);
}
</style>