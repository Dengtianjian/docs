<template>
  <KBorderBeam :size="2" :duration="5">
    <div class="panel">
      <h4>常亮边框</h4>
      <p>光束沿圆角边框循环移动，内容区域保持可交互。</p>
    </div>
  </KBorderBeam>
</template>

<script setup lang="ts">
import KBorderBeam from 'kit/vue/ui/components/BorderBeam/BorderBeam.vue'
</script>

<style scoped>
.panel {
  padding: 20px 22px;
}
.panel h4 {
  margin: 0 0 8px;
  font-size: var(--k-font-size-lg);
}
.panel p {
  margin: 0;
  color: var(--k-color-text-secondary);
  font-size: var(--k-font-size-sm);
  line-height: 1.6;
}
</style>