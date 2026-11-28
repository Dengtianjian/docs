<template>
  <div style="display: flex; flex-direction: column; gap: 14px; max-width: 520px">
    <!-- #render 插槽通道：语义左缘条，type 驱动强调色，onClose 继承关闭（受控 open 回写） -->
    <KAlert v-model:open="showBar" type="warning" closable message="配额即将用尽" description="本月渲染额度剩余 12%，建议升级套餐或减少并发任务。">
      <template #render="ctx">
        <div v-bind="ctx.rootAttrs" :class="['hl-alert-bar', `hl-alert-bar--${ctx.type}`]">
          <div class="hl-alert-bar__body">
            <strong class="hl-alert-bar__title">{{ ctx.message }}</strong>
            <p class="hl-alert-bar__desc">{{ ctx.description }}</p>
          </div>
          <button v-if="ctx.closable" type="button" class="hl-alert-bar__close" aria-label="关闭" @click="ctx.onClose">✕</button>
        </div>
      </template>
    </KAlert>
    <KButton v-if="!showBar" size="sm" @click="showBar = true">恢复通告条</KButton>

    <!-- render prop 通道：成功横条 -->
    <KAlert type="success" closable message="部署完成 · 3 个站点已上线" :render="renderStrip" />
  </div>
</template>

<script setup lang="ts">
import { h, ref } from 'vue'
import KAlert from 'kit/vue/ui/components/feedback/Alert/Alert.vue'
import KButton from 'kit/vue/ui/components/general/Button/Button.vue'
import type { KAlertRenderScope } from 'kit/vue/ui/components/feedback/Alert/Alert.vue'

const showBar = ref(true)

// render prop 通道：关闭逻辑（onClose → update:open/close 事件）继承，紧凑横条视觉自绘
const renderStrip = (ctx: KAlertRenderScope) =>
  h('div', { ...ctx.rootAttrs, class: `hl-alert-strip hl-alert-strip--${ctx.type}` }, [
    h('span', { class: 'hl-alert-strip__dot', 'aria-hidden': 'true' }),
    h('span', { class: 'hl-alert-strip__text' }, ctx.message as string),
    ctx.closable
      ? h('button', { type: 'button', class: 'hl-alert-strip__close', 'aria-label': '关闭', onClick: ctx.onClose }, '✕')
      : null,
  ])
</script>

<!-- render prop 闭包产物在子组件作用域渲染，样式须全局（hl- 专属命名）或内联 -->
<style>
.hl-alert-bar {
  --hl-alert-accent: var(--k-color-info);
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 12px 14px;
  border-left: 3px solid var(--hl-alert-accent);
  border-radius: 0 10px 10px 0;
  background: color-mix(in oklab, var(--hl-alert-accent) 9%, var(--k-color-bg-container));
}
.hl-alert-bar--success { --hl-alert-accent: var(--k-color-success); }
.hl-alert-bar--warning { --hl-alert-accent: var(--k-color-warning); }
.hl-alert-bar--error { --hl-alert-accent: var(--k-color-error); }
.hl-alert-bar__body { flex: auto; min-width: 0; }
.hl-alert-bar__title {
  display: block;
  color: var(--k-color-text);
  font-size: 14px;
}
.hl-alert-bar__desc {
  margin: 4px 0 0;
  color: var(--k-color-text-secondary);
  font-size: 13px;
  line-height: 1.6;
}
.hl-alert-bar__close {
  flex: none;
  border: none;
  background: transparent;
  color: var(--k-color-text-tertiary);
  font-size: 13px;
  cursor: pointer;
  padding: 2px;
}
.hl-alert-bar__close:hover { color: var(--k-color-text); }

.hl-alert-strip {
  --hl-alert-accent: var(--k-color-info);
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 12px;
  border-radius: 999px;
  border: 1px solid color-mix(in oklab, var(--hl-alert-accent) 45%, transparent);
  background: color-mix(in oklab, var(--hl-alert-accent) 10%, transparent);
  font-size: 13px;
  color: var(--k-color-text);
}
.hl-alert-strip--success { --hl-alert-accent: var(--k-color-success); }
.hl-alert-strip--warning { --hl-alert-accent: var(--k-color-warning); }
.hl-alert-strip--error { --hl-alert-accent: var(--k-color-error); }
.hl-alert-strip__dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--hl-alert-accent);
}
.hl-alert-strip__close {
  border: none;
  background: transparent;
  color: var(--k-color-text-tertiary);
  font-size: 11px;
  cursor: pointer;
  padding: 0 0 0 4px;
}
.hl-alert-strip__close:hover { color: var(--k-color-text); }
</style>
