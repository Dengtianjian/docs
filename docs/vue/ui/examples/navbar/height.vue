<template>
  <div>
    <div class="phone-frame">
      <KNavBar
        title="订单详情"
        subtitle="自定义高度 56px"
        :class-names="{ root: 'nav-tall' }"
      >
        <template #right>
          <KButton variant="text">分享</KButton>
        </template>
      </KNavBar>
      <div class="phone-body">
        <p>classNames.root 改 --k-navbar-height 抬高度。</p>
        <p>同一类里改 border-bottom，加粗为 2px 主色分隔线。</p>
      </div>
    </div>
    <div class="nav-tip">高度 56px · 底边 2px 主色</div>
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
.nav-tall {
  --k-navbar-height: 56px;
  border-bottom: 2px solid var(--k-color-primary);
}
</style>