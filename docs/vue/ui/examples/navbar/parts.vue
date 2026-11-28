<template>
  <div>
    <div class="phone-frame">
      <KNavBar
        title="工作台"
        subtitle="周三 · 第 4 个工作日"
        :class-names="{ root: 'nav-tinted' }"
        :styles="{ title: { color: 'var(--k-color-primary)' } }"
      >
        <template #right>
          <KButton variant="text">设置</KButton>
        </template>
      </KNavBar>
      <div class="phone-body">
        <p>classNames.root 换背景与分隔线，其余部件不变。</p>
        <p>styles.title 只改标题颜色，副标题取默认样式。</p>
      </div>
    </div>
    <div class="nav-tip">部件名：root / left / center / title / subtitle / right / back</div>
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
.nav-tinted {
  border-bottom-color: transparent;
  background: var(--k-color-primary-bg);
}
</style>