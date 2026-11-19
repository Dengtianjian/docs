<template>
  <KApp>
    <p style="margin: 0 0 12px; color: var(--k-color-text-secondary)">
      KApp 内的普通文字（非组件元素）继承 K UI 的字体 / 字号 / 行高 / 文字色 token；点击按钮试试按压加深与波纹。
    </p>
    <KSpace>
      <KButton type="primary">主要操作</KButton>
      <KButton>次要操作</KButton>
    </KSpace>
  </KApp>
</template>

<script setup lang="ts">
import KApp from 'kit/vue/ui/components/App/App.vue'
import KButton from 'kit/vue/ui/components/Button/Button.vue'
import KSpace from 'kit/vue/ui/components/Space/Space.vue'
</script>
