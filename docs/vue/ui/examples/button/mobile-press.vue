<template>
  <p class="mp-hint">按住不放对比四种按压形态（移动端决策预览，非组件能力）。波纹关闭走 <code>:wave="false"</code>。</p>
  <KSpace wrap style="margin-bottom: 16px">
    <KButton type="primary">A 现状（波纹+底色）</KButton> <!-- [!code hl] -->
    <KButton type="primary" :wave="false" class="mp-m">B antd-mobile 黑8%</KButton>
    <KButton type="primary" :wave="false" class="mp-v">C vant 灰10%</KButton>
    <KButton type="primary" :wave="false" class="mp-o">D 整体 opacity</KButton>
  </KSpace>
  <KSpace wrap>
    <KButton :wave="false">A 现状关波纹（仅底色加深）</KButton>
    <KButton :wave="false" class="mp-m">B antd-mobile</KButton>
    <KButton :wave="false" class="mp-v">C vant</KButton>
    <KButton :wave="false" class="mp-o">D opacity</KButton>
  </KSpace>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import KButton from 'kit/vue/ui/components/Button/Button.vue'
import KSpace from 'kit/vue/ui/components/Space/Space.vue'

const dark = ref(false)
</script>

<style scoped>
.mp-hint {
  margin: 0 0 12px;
  font-size: 13px;
  color: var(--vp-c-text-2);
}
/* B：antd-mobile 实况——::before 全铺黑底 :active 时 opacity .08，transition opacity .15s */
.mp-m {
  position: relative;
}
.mp-m::before {
  content: " ";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background-color: #000;
  opacity: 0;
  transition: opacity ease 0.15s;
  pointer-events: none;
}
.mp-m:active:not(:disabled)::before {
  opacity: 0.08;
}
/* C：vant 实况——::before 铺 --van-active-color(#e8e8e8)，:active 时 opacity .1 */
.mp-v {
  position: relative;
}
.mp-v::before {
  content: " ";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background-color: #e8e8e8;
  opacity: 0;
  transition: opacity ease 0.15s;
  pointer-events: none;
}
.mp-v:active:not(:disabled)::before {
  opacity: 0.1;
}
/* D：未落地候选——按压整体降透明度（iOS 原生味） */
.mp-o {
  transition: opacity ease 0.15s;
}
.mp-o:active:not(:disabled) {
  opacity: 0.65;
}
</style>
