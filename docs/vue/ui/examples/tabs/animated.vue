<template>
  <div class="anim-demo">
    <KTabs v-model:active="active" animated>
      <KTabPane name="one" label="第一步">
        <div class="panel">第一步：填写基础信息。</div>
      </KTabPane>
      <KTabPane name="two" label="第二步">
        <div class="panel">第二步：配置参数与权限。</div>
      </KTabPane>
      <KTabPane name="three" label="第三步">
        <div class="panel">第三步：确认并提交。</div>
      </KTabPane>
    </KTabs>
    <div class="tip">`animated` 开启后内容淡入并按切换方向轻微位移；默认关闭，减少动态偏好时自动禁用。</div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import KTabs from 'kit/vue/ui/components/navigation/Tabs/Tabs.vue'
import KTabPane from 'kit/vue/ui/components/navigation/Tabs/TabPane.vue'

const active = ref<string | number>('one')
</script>

<style scoped>
.anim-demo {
  max-width: 520px;
}
.panel {
  margin-top: 12px;
  padding: 16px;
  border: 1px dashed var(--k-color-border);
  border-radius: var(--k-border-radius-sm);
  color: var(--k-color-text-secondary);
  font-size: var(--k-font-size-sm);
}
.tip {
  margin-top: 8px;
  color: var(--k-color-text-tertiary);
  font-size: var(--k-font-size-xs);
}
</style>