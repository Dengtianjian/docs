<template>
  <div>
    <div class="phone-frame">
      <KNavBar
        title="2026 年双十一预售详情与跨仓物流跟踪信息汇总"
        subtitle="浙江省杭州市西湖区文三路 90 号东部软件园 6 幢 302 室"
      >
        <template #right>
          <KButton variant="text">分享</KButton>
        </template>
      </KNavBar>
      <div class="phone-body">
        <p>标题与副标题都超长，单行省略不换行。</p>
        <p>两侧各预留宽度，超长标题不会压住返回和右侧操作。</p>
      </div>
    </div>
    <div class="nav-tip">悬停标题可查看完整文案（原生 title 属性不内置，按需自行添加）</div>
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
</style>