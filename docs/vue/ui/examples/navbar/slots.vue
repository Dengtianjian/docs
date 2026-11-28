<template>
  <div>
    <div class="phone-frame">
      <KNavBar :back="false">
        <template #left>
          <span class="nav-avatar">林</span>
          <span class="nav-name">林一</span>
        </template>
        <template #title>消息中心</template>
        <template #subtitle>3 条未读</template>
        <template #right>
          <KButton variant="text">已读</KButton>
        </template>
      </KNavBar>
      <div class="phone-body">
        <p>关闭返回按钮后，左侧可放头像与昵称。</p>
        <p>#title / #subtitle / #right 均可替换为任意内容。</p>
      </div>
    </div>
    <div class="nav-tip">当前未读：3 条</div>
  </div>
</template>

<script setup lang="ts">
import KButton from 'kit/vue/ui/components/general/Button/Button.vue'
import KNavBar from 'kit/vue/ui/components/navigation/NavBar/NavBar.vue'
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
.nav-avatar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: var(--k-color-primary-bg);
  color: var(--k-color-primary);
  font-size: var(--k-font-size-sm);
}
.nav-name {
  color: var(--k-color-text);
  font-size: var(--k-font-size-sm);
}
</style>