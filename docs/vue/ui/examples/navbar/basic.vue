<template>
  <div>
    <div class="phone-frame">
      <KNavBar title="订单详情" subtitle="2026-11-20" @back="backed = true">
        <template #right>
          <KButton variant="text">分享</KButton>
        </template>
      </KNavBar>
      <div class="phone-body">
        <p>顶部导航：返回按钮、标题、副标题与右侧操作区。</p>
        <p>使用 #left / #title / #subtitle / #right 插槽自定义。</p>
      </div>
    </div>
    <div class="nav-tip">返回按钮点击：{{ backed ? '已触发' : '未触发' }}</div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import KNavBar from 'kit/vue/ui/components/navigation/NavBar/NavBar.vue'
import KButton from 'kit/vue/ui/components/general/Button/Button.vue'

const backed = ref(false)
</script>

<style scoped>
.phone-frame {
  width: 320px;
  border: 1px solid var(--k-color-border-secondary);
  border-radius: 18px;
  overflow: hidden;
  background: var(--k-color-bg-layout);
}
.phone-body {
  min-height: 120px;
  padding: 16px;
}
.phone-body p {
  margin: 0 0 8px;
  color: var(--k-color-text-secondary);
  font-size: var(--k-font-size-sm);
  line-height: 1.7;
}
.nav-tip {
  margin-top: 12px;
  color: var(--k-color-text-secondary);
  font-size: var(--k-font-size-sm);
}
</style>