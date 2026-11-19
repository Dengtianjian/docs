<template>
  <KConfigProvider scoped :theme="theme">
    <div class="panel">
      <label>
        主色
        <input type="color" v-model="primary" />
      </label>
      <label>
        圆角 {{ radius }}px
        <input type="range" min="0" max="16" v-model.number="radius" />
      </label>
      <KDivider />
      <div style="display: flex; gap: 8px; flex-wrap: wrap; align-items: center">
        <KButton type="primary">Primary</KButton>
        <KButton>Default</KButton>
        <KButton type="danger">Danger</KButton>
        <KButton variant="filled">Filled</KButton>
        <KButton type="primary" variant="quiet">Text</KButton>
        <KLink href="#api">联动 Link</KLink>
      </div>
    </div>
  </KConfigProvider>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import KConfigProvider from 'kit/vue/ui/components/ConfigProvider/ConfigProvider.vue'
import KButton from 'kit/vue/ui/components/Button/Button.vue'
import KLink from 'kit/vue/ui/components/Link/Link.vue'
import KDivider from 'kit/vue/ui/components/Divider/Divider.vue'

const primary = ref('#722ed1')
const radius = ref(6)

// theme 响应式：改一个 seed → Provider 重算差量 <style>，子树全量联动（无 JS 派生计算）
const theme = computed(() => ({
  seed: { colorPrimary: primary.value, borderRadius: radius.value },
}))
</script>

<style scoped>
.panel {
  padding: 16px;
  border: 1px dashed var(--k-color-border);
  border-radius: var(--k-border-radius);
  background: var(--k-color-primary-bg);
}
label {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-inline-end: 16px;
  color: var(--k-color-text);
  font-size: var(--k-font-size);
}
</style>
