<template>
  <KSpace direction="vertical" size="lg" align="start">
    <KSpace size="xl" align="center">
      <KSpin size="sm" />
      <KSpin />
      <KSpin size="lg" />
      <KSpin tip="加载中…" />
      <KSpin :spinning="false" />（spinning=false 不渲染）
    </KSpace>

    <div style="width: calc(var(--k-size) * 20)">
      <KSpace size="md" align="center" style="margin-bottom: 12px">
        <KButton type="primary" :loading="contentLoading" @click="reload">重新加载</KButton>
        <span style="color: var(--k-color-text-secondary)">包裹模式：内容压暗 + 禁交互，指示器居中；delay 见文档</span>
      </KSpace>
      <KSpin :spinning="contentLoading" tip="加载中…">
        <div
          style="
            padding: var(--k-size);
            border: var(--k-line-width) solid var(--k-color-border);
            border-radius: var(--k-border-radius-lg);
            background: var(--k-color-bg-container);
          "
        >
          <p style="margin: 0 0 8px"><b>被包裹的内容区</b></p>
          <p style="margin: 0; color: var(--k-color-text-secondary)">
            加载期间这段文字不可选中、不可点击（inert + pointer-events），转完后恢复。
          </p>
        </div>
      </KSpin>
    </div>
  </KSpace>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import KSpin from 'kit/vue/ui/components/Spin/Spin.vue'
import KButton from 'kit/vue/ui/components/Button/Button.vue'
import KSpace from 'kit/vue/ui/components/Space/Space.vue'

const contentLoading = ref(false)

function reload() {
  contentLoading.value = true
  setTimeout(() => (contentLoading.value = false), 2000)
}
</script>
