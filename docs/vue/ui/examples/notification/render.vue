<script setup lang="ts">
import { h, ref } from 'vue'
import KNotification from 'kit/vue/ui/components/Notification/Notification.vue'
import type { KNotificationRenderScope } from 'kit/vue/ui/components/Notification/Notification.vue'
import { onProps } from 'kit/vue/ui/composables/useCustomRender'

const clicked = ref('')
const snackMsg = ref('')
const closed = ref(false)

// render prop 通道：close/click 事件逻辑继承，极简 snackbar 视觉自绘
const renderSnack = (ctx: KNotificationRenderScope) =>
  h('div', { ...ctx.rootAttrs, ...onProps(ctx.rootOn), class: 'hl-ntf-snack' }, [
    h('span', { class: 'hl-ntf-snack__text' }, ctx.title as string),
    ctx.closable
      ? h('button', { type: 'button', class: 'hl-ntf-snack__close', 'aria-label': '关闭', onClick: (e: MouseEvent) => { e.stopPropagation(); ctx.onClose(e) } }, '收起')
      : null,
  ])
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 14px; max-width: 460px">
    <!-- #render 插槽通道：自绘 toast 卡，type 驱动强调色，rootOn/onClose 继承 -->
    <KNotification
      v-if="!closed"
      type="success"
      title="构建完成"
      description="产物 2.4 MB · 耗时 18s · 已推送至预发环境。"
      @click="clicked = '卡片被点击'"
      @close="closed = true"
    >
      <template #render="ctx">
        <div v-bind="ctx.rootAttrs" v-on="ctx.rootOn" :class="['hl-ntf-card', `hl-ntf-card--${ctx.type}`]">
          <span class="hl-ntf-card__rail" aria-hidden="true" />
          <div class="hl-ntf-card__body">
            <strong class="hl-ntf-card__title">{{ ctx.title }}</strong>
            <p class="hl-ntf-card__desc">{{ ctx.description }}</p>
          </div>
          <button v-if="ctx.closable" type="button" class="hl-ntf-card__close" aria-label="关闭" @click.stop="ctx.onClose">✕</button>
        </div>
      </template>
    </KNotification>
    <span style="color: var(--k-color-text-tertiary); font-size: 13px">{{ [closed ? '卡片已关闭' : '', clicked].filter(Boolean).join(' · ') }}</span>

    <!-- render prop 通道：snackbar -->
    <KNotification title="草稿已自动保存" :render="renderSnack" @close="snackMsg = 'snackbar 已收起'" />
    <span style="color: var(--k-color-text-tertiary); font-size: 13px">{{ snackMsg }}</span>
  </div>
</template>

<!-- render prop 闭包产物在子组件作用域渲染，样式须全局（hl- 专属命名）或内联 -->
<style>
.hl-ntf-card {
  --hl-ntf-accent: var(--k-color-primary);
  position: relative;
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 12px 14px 12px 16px;
  border-radius: 12px;
  background: var(--k-color-bg-elevated);
  box-shadow: var(--k-box-shadow);
  overflow: hidden;
  cursor: pointer;
}
.hl-ntf-card--success { --hl-ntf-accent: var(--k-color-success); }
.hl-ntf-card--error { --hl-ntf-accent: var(--k-color-error); }
.hl-ntf-card--warning { --hl-ntf-accent: var(--k-color-warning); }
.hl-ntf-card--info { --hl-ntf-accent: var(--k-color-info); }
.hl-ntf-card__rail {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 4px;
  background: var(--hl-ntf-accent);
}
.hl-ntf-card__body { flex: auto; min-width: 0; }
.hl-ntf-card__title {
  display: block;
  color: var(--k-color-text);
  font-size: 14px;
}
.hl-ntf-card__desc {
  margin: 4px 0 0;
  color: var(--k-color-text-secondary);
  font-size: 13px;
  line-height: 1.6;
}
.hl-ntf-card__close {
  flex: none;
  border: none;
  background: transparent;
  color: var(--k-color-text-tertiary);
  font-size: 12px;
  cursor: pointer;
  padding: 2px;
}
.hl-ntf-card__close:hover { color: var(--k-color-text); }

.hl-ntf-snack {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  padding: 8px 14px;
  border-radius: 999px;
  background: var(--k-color-bg-spotlight);
  color: var(--k-color-text-light-solid);
  font-size: 13px;
  box-shadow: var(--k-box-shadow-secondary);
}
.hl-ntf-snack__close {
  border: none;
  background: transparent;
  color: var(--k-color-primary);
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  padding: 0;
}
</style>