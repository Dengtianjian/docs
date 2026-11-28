<template>
  <div class="affix-page">
    <KAffix class="affix-page__sticky" :offset-top="76" @change="affixed = $event">
      <div class="affix-page__bar" :class="{ 'is-affixed': affixed }">
        <strong>页面工具条</strong>
        <span>{{ affixed ? '已吸顶（距视口顶部 76px）' : '随页面滚动' }}</span>
        <KButton size="sm" type="primary">新建</KButton>
      </div>
    </KAffix>

    <div class="affix-page__body">
      <h3>页面级吸顶</h3>
      <p v-for="index in 22" :key="index">
        第 {{ index }} 段：直接滚动整个文档页面，工具条会在顶部导航下方吸顶，直到本示例区域滚出视口。
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import KAffix from 'kit/vue/ui/components/layouts/Affix/Affix.vue'
import KButton from 'kit/vue/ui/components/general/Button/Button.vue'

const affixed = ref(false)
</script>

<style scoped>
.affix-page {
  display: grid;
}
/* 吸顶根节点与正文叠在同一格，随正文高度拉伸，sticky 才有足够行程 */
.affix-page > * {
  grid-area: 1 / 1;
}
.affix-page__sticky {
  pointer-events: none;
}
.affix-page__bar {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 14px;
  border: 1px solid var(--k-color-border-secondary);
  border-radius: var(--k-border-radius);
  background: var(--k-color-bg-elevated);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  pointer-events: auto;
}
.affix-page__bar.is-affixed {
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.14);
}
.affix-page__bar strong {
  color: var(--k-color-text);
  font-size: var(--k-font-size);
}
.affix-page__bar span {
  flex: 1;
  color: var(--k-color-text-secondary);
  font-size: var(--k-font-size-sm);
}
.affix-page__body {
  padding-top: 64px;
}
.affix-page__body h3 {
  margin: 0 0 8px;
  font-size: var(--k-font-size);
}
.affix-page__body p {
  margin: 0 0 10px;
  color: var(--k-color-text-secondary);
  font-size: var(--k-font-size-sm);
  line-height: 1.7;
}
</style>