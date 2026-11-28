<template>
  <KConfigProvider scoped :theme="brand" scheme="dark">
    <div class="scope-app">
      <KApp>
        <p class="scope-app__intro">
          推荐顺序：ConfigProvider 在外、KApp 在内。这段普通 HTML 文字与下方组件都继承子树暗色与青色主题；
          点开的 message / notification / modal / drawer 虽 Teleport 到 body，仍携带作用域类与 scheme，配色不脱链。
        </p>
        <UsePanel title="Provider 内的 KApp" />
      </KApp>
    </div>
  </KConfigProvider>
</template>

<script setup lang="ts">
import KConfigProvider from 'kit/vue/ui/components/general/ConfigProvider/ConfigProvider.vue'
import KApp from 'kit/vue/ui/components/general/App/App.vue'
import UsePanel from './_use-panel.vue'

const brand = {
  seed: { colorPrimary: '#13c2c2', borderRadius: 10 },
}
</script>

<style scoped>
.scope-app {
  padding: 16px;
  border: 1px solid var(--k-color-border);
  border-radius: var(--k-border-radius);
  background: var(--k-color-bg-container);
}
.scope-app__intro {
  margin: 0 0 12px;
  color: var(--k-color-text-secondary);
  font-size: var(--k-font-size);
  line-height: var(--k-line-height);
}
</style>