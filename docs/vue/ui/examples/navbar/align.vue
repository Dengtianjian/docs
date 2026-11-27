<template>
  <div>
    <div class="phone-frame">
      <KNavBar
        title="订单详情"
        :class-names="{ center: 'nav-align-left', left: 'nav-align-side', right: 'nav-align-side' }"
      >
        <template #right>
          <KButton variant="text">分享</KButton>
        </template>
      </KNavBar>
      <KNavBar
        title="订单详情"
        :class-names="{ center: 'nav-align-right', left: 'nav-align-side', right: 'nav-align-side' }"
      >
        <template #right>
          <KButton variant="text">分享</KButton>
        </template>
      </KNavBar>
      <div class="phone-body">
        <p>classNames.center 让中间区域撑开，再改 text-align。</p>
        <p>靠左：标题紧跟左侧返回；靠右：标题贴近右侧操作。</p>
      </div>
    </div>
    <div class="nav-tip">默认居中；左右位置通过部件样式覆盖</div>
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
.phone-frame :deep(.nav-align-side) {
  flex: 0 0 auto;
}
.phone-frame :deep(.nav-align-left) {
  flex: 1;
  text-align: left;
}
.phone-frame :deep(.nav-align-right) {
  flex: 1;
  text-align: right;
}
</style>