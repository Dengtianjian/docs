<script setup lang="ts">
import { h, ref } from 'vue'
import KSpin from 'kit/vue/ui/components/Spin/Spin.vue'
import KButton from 'kit/vue/ui/components/Button/Button.vue'
import type { KSpinRenderScope } from 'kit/vue/ui/components/Spin/Spin.vue'

const loading = ref(true)

// render prop 通道：delay 收敛后的 spinning 态继承，三点脉冲视觉自绘
const renderPulse = (ctx: KSpinRenderScope) =>
  h('span', { ...ctx.rootAttrs, class: 'hl-spin-pulse', 'aria-busy': ctx.spinning || undefined }, [
    ctx.spinning
      ? h('span', { ...ctx.indicatorAttrs, class: 'hl-spin-pulse__dots' }, [
          h('i', { class: 'hl-spin-pulse__dot' }),
          h('i', { class: 'hl-spin-pulse__dot' }),
          h('i', { class: 'hl-spin-pulse__dot' }),
        ])
      : h('span', { class: 'hl-spin-pulse__done' }, '就绪'),
  ])
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 16px; max-width: 520px">
    <KButton size="sm" @click="loading = !loading">{{ loading ? '停止加载' : '开始加载' }}</KButton>

    <!-- #render 插槽通道：包裹模式，nestedAttrs 继承 inert/aria-busy，内容压暗自绘 -->
    <KSpin :spinning="loading" tip="正在同步画布…">
      <template #render="ctx">
        <div v-bind="ctx.rootAttrs" class="hl-spin-frame">
          <div v-bind="ctx.nestedAttrs" class="hl-spin-frame__content" :class="{ 'hl-spin-frame__content--dim': ctx.spinning }">
            <strong>季度运营报表</strong>
            <p>渲染任务 #4092 · 12 张图表 · 数据源已连接</p>
          </div>
          <div v-if="ctx.spinning" v-bind="ctx.indicatorAttrs" class="hl-spin-frame__veil">
            <span class="hl-spin-frame__ring" aria-hidden="true" />
            <span class="hl-spin-frame__tip">{{ ctx.tip }}</span>
          </div>
        </div>
      </template>
    </KSpin>

    <!-- render prop 通道：独立三点脉冲 -->
    <KSpin :spinning="loading" :render="renderPulse" />
  </div>
</template>

<!-- render prop 闭包产物在子组件作用域渲染，样式须全局（hl- 专属命名）或内联 -->
<style>
.hl-spin-frame {
  position: relative;
  border-radius: 10px;
  overflow: hidden;
}
.hl-spin-frame__content {
  padding: 18px;
  border: 1px solid var(--k-color-border);
  border-radius: 10px;
  background: var(--k-color-bg-container);
  transition: opacity 0.2s;
}
.hl-spin-frame__content p {
  margin: 6px 0 0;
  color: var(--k-color-text-secondary);
  font-size: 13px;
}
.hl-spin-frame__content--dim {
  opacity: 0.45;
  user-select: none;
  pointer-events: none;
}
.hl-spin-frame__veil {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
}
.hl-spin-frame__ring {
  width: 26px;
  height: 26px;
  border-radius: 50%;
  border: 2.5px solid color-mix(in oklab, var(--k-color-primary) 25%, transparent);
  border-top-color: var(--k-color-primary);
  animation: hl-spin-rot 0.9s linear infinite;
}
.hl-spin-frame__tip {
  color: var(--k-color-primary);
  font-size: 13px;
}
@keyframes hl-spin-rot {
  to { transform: rotate(360deg); }
}

.hl-spin-pulse {
  display: inline-flex;
  align-items: center;
  min-height: 24px;
}
.hl-spin-pulse__dots {
  display: inline-flex;
  gap: 5px;
}
.hl-spin-pulse__dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--k-color-primary);
  animation: hl-spin-blink 1s ease-in-out infinite;
}
.hl-spin-pulse__dot:nth-child(2) { animation-delay: 0.15s; }
.hl-spin-pulse__dot:nth-child(3) { animation-delay: 0.3s; }
.hl-spin-pulse__done {
  color: var(--k-color-success);
  font-size: 13px;
}
@keyframes hl-spin-blink {
  0%, 100% { opacity: 0.25; transform: scale(0.8); }
  50% { opacity: 1; transform: scale(1); }
}
</style>