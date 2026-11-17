<script setup lang="ts">
import { h, Teleport, ref } from 'vue'
import KPopconfirm from 'kit/vue/ui/components/Popconfirm/Popconfirm.vue'
import KButton from 'kit/vue/ui/components/Button/Button.vue'
import type { KPopconfirmRenderScope } from 'kit/vue/ui/components/Popconfirm/Popconfirm.vue'
import { onProps } from 'kit/vue/ui/composables/useCustomRender'

const removing = ref(false)
const removed = ref(false)
const inlineMsg = ref('')

function onRemove() {
  removing.value = true
  setTimeout(() => {
    removing.value = false
    removed.value = true
  }, 900)
}

// render prop 通道：确认/取消/okLoading 收尾逻辑继承，内联确认条视觉自绘
const renderStrip = (ctx: KPopconfirmRenderScope) => [
  h('span', { ref: ctx.triggerEl, ...ctx.triggerAttrs, ...onProps(ctx.triggerOn), class: 'hl-pcf-strip-trigger' }, '重置画布'),
  h(
    Teleport,
    { to: ctx.teleportTarget, defer: true },
    ctx.visible
      ? [h('div', { ref: ctx.popupEl, ...ctx.popupAttrs, class: 'hl-pcf-strip' }, [
          h('span', { class: 'hl-pcf-strip__text' }, ctx.title),
          h('button', { type: 'button', class: 'hl-pcf-strip__btn', onClick: ctx.onCancel }, ctx.cancelText),
          h('button', { type: 'button', class: 'hl-pcf-strip__btn hl-pcf-strip__btn--ok', onClick: ctx.onConfirm }, ctx.okText),
        ])]
      : [],
  ),
]
</script>

<template>
  <div style="display: flex; gap: 24px; align-items: center; flex-wrap: wrap">
    <!-- #render 插槽通道：危险确认卡，okLoading 异步收尾（true→false 自动关）照跑 -->
    <KPopconfirm
      title="删除该图层组？"
      description="组内 8 个节点将一并移除，操作不可撤销。"
      ok-text="删除"
      ok-type="danger"
      :ok-loading="removing"
      placement="bottom"
      @confirm="onRemove"
    >
      <template #render="ctx">
        <span :ref="ctx.triggerEl" v-bind="ctx.triggerAttrs" v-on="ctx.triggerOn">
          <KButton size="sm" type="danger" :disabled="removed">{{ removed ? '已删除' : '删除图层组' }}</KButton>
        </span>
        <Teleport :to="ctx.teleportTarget" defer>
          <div v-if="ctx.visible" :ref="ctx.popupEl" v-bind="ctx.popupAttrs" class="hl-pcf-card">
            <strong class="hl-pcf-card__title">{{ ctx.title }}</strong>
            <p class="hl-pcf-card__desc">{{ ctx.description }}</p>
            <div class="hl-pcf-card__foot">
              <button type="button" class="hl-pcf-card__btn" @click="ctx.onCancel">{{ ctx.cancelText }}</button>
              <button type="button" class="hl-pcf-card__btn hl-pcf-card__btn--danger" :disabled="ctx.okLoading" @click="ctx.onConfirm">
                {{ ctx.okLoading ? '删除中…' : ctx.okText }}
              </button>
            </div>
          </div>
        </Teleport>
      </template>
    </KPopconfirm>

    <!-- render prop 通道：内联确认条 -->
    <KPopconfirm title="画布将回到初始状态，继续？" ok-text="继续" :render="renderStrip" @confirm="inlineMsg = '已重置'" @cancel="inlineMsg = '已取消'" />
    <span style="color: var(--k-color-text-tertiary); font-size: 13px">{{ inlineMsg }}</span>
  </div>
</template>

<!-- render prop 闭包产物在子组件作用域渲染，样式须全局（hl- 专属命名）或内联 -->
<style>
.hl-pcf-card {
  min-width: 240px;
  max-width: 300px;
  padding: 14px 16px;
  border-radius: 12px;
  border: 1px solid color-mix(in oklab, var(--k-color-error) 35%, var(--k-color-border));
  background: var(--k-color-bg-elevated);
  box-shadow: var(--k-box-shadow-secondary);
}
.hl-pcf-card__title {
  display: block;
  color: var(--k-color-text);
  font-size: 14px;
}
.hl-pcf-card__desc {
  margin: 6px 0 12px;
  color: var(--k-color-text-secondary);
  font-size: 13px;
  line-height: 1.6;
}
.hl-pcf-card__foot {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
}
.hl-pcf-card__btn {
  padding: 4px 14px;
  border-radius: 7px;
  border: 1px solid var(--k-color-border);
  background: var(--k-color-bg-container);
  color: var(--k-color-text);
  font-size: 13px;
  cursor: pointer;
}
.hl-pcf-card__btn:hover { border-color: var(--k-color-primary); color: var(--k-color-primary); }
.hl-pcf-card__btn--danger {
  border-color: var(--k-color-error);
  background: var(--k-color-error);
  color: var(--k-color-text-light-solid);
}
.hl-pcf-card__btn--danger:hover {
  border-color: var(--k-color-error-hover);
  background: var(--k-color-error-hover);
  color: var(--k-color-text-light-solid);
}
.hl-pcf-card__btn--danger:disabled { opacity: 0.6; cursor: not-allowed; }

.hl-pcf-strip-trigger {
  display: inline-block;
  color: var(--k-color-warning);
  font-size: 13px;
  cursor: pointer;
  border-bottom: 1px dashed var(--k-color-warning);
  padding-bottom: 1px;
}
.hl-pcf-strip {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 12px;
  border-radius: 999px;
  border: 1px solid color-mix(in oklab, var(--k-color-warning) 45%, transparent);
  background: var(--k-color-bg-elevated);
  box-shadow: var(--k-box-shadow-secondary);
  font-size: 13px;
  color: var(--k-color-text);
}
.hl-pcf-strip__btn {
  border: none;
  background: transparent;
  color: var(--k-color-text-secondary);
  font-size: 13px;
  cursor: pointer;
  padding: 2px 6px;
  border-radius: 6px;
}
.hl-pcf-strip__btn:hover { color: var(--k-color-text); background: var(--k-color-fill-tertiary); }
.hl-pcf-strip__btn--ok { color: var(--k-color-warning); font-weight: 600; }
</style>