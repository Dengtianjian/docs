<template>
  <div style="display: flex; gap: 20px; align-items: center; flex-wrap: wrap">
    <!-- #render 插槽通道：自绘拖拽面板，headerOn 拖拽链 + requestClose + Esc + 滚动锁全继承 -->
    <KModal draggable width="400px" @close="log = '面板已关闭'">
      <template #render="ctx">
        <span v-bind="{ 'data-part': 'trigger' }" v-on="ctx.triggerOn">
          <KButton size="sm" type="primary">自绘拖拽面板</KButton>
        </span>
        <Teleport :to="ctx.teleportTarget" defer>
          <Transition name="hl-modal-fade" @after-leave="ctx.onAfterLeave">
            <div v-if="ctx.open" v-bind="ctx.rootAttrs" class="hl-modal-root">
              <div v-if="ctx.mask" v-bind="ctx.maskAttrs" class="hl-modal-mask" />
              <div v-bind="ctx.wrapAttrs" v-on="ctx.wrapOn" class="hl-modal-wrap">
                <div
                  :ref="ctx.dialogEl"
                  v-bind="ctx.dialogAttrs"
                  class="hl-modal-panel"
                  :style="{ visibility: ctx.zoomed ? 'visible' : 'hidden' }"
                >
                  <div v-bind="ctx.headerAttrs" v-on="ctx.headerOn" class="hl-modal-panel__head" :class="{ 'hl-modal-panel__head--drag': ctx.dragging }">
                    <strong>节点检查器</strong>
                    <span class="hl-modal-panel__hint">拖我移动</span>
                    <button type="button" class="hl-modal-panel__close" aria-label="关闭" @click="ctx.requestClose($event)">✕</button>
                  </div>
                  <div class="hl-modal-panel__body">
                    <p>头部拖拽位移写在 dialogAttrs 的 translate 里，与原点缩放复合不打架。</p>
                    <p>点蒙层、按 Esc、点 ✕ 都走 requestClose；打开期间 body 滚动被锁定。</p>
                  </div>
                  <div class="hl-modal-panel__foot">
                    <KButton size="sm" @click="ctx.requestClose(new MouseEvent('click'))">收起</KButton>
                  </div>
                </div>
              </div>
            </div>
          </Transition>
        </Teleport>
      </template>
    </KModal>

    <!-- render prop 通道：居中 sheets -->
    <KModal width="380px" :render="renderSheet" />
    <span style="color: var(--k-color-text-tertiary); font-size: 13px">{{ log }}</span>
  </div>
</template>

<script setup lang="ts">
import { h, Teleport, Transition, ref } from 'vue'
import KModal from 'kit/vue/ui/components/feedback/Modal/Modal.vue'
import KButton from 'kit/vue/ui/components/general/Button/Button.vue'
import type { KModalRenderScope } from 'kit/vue/ui/components/feedback/Modal/Modal.vue'
import { onProps } from 'kit/vue/ui/composables/useCustomRender'

const log = ref('')

// render prop 通道：滚动锁/Esc/蒙层关闭/原点动画逻辑继承，居中 sheets 视觉自绘
const renderSheet = (ctx: KModalRenderScope) => [
  h('span', { ...ctx.triggerAttrs, ...onProps(ctx.triggerOn), class: 'hl-modal-link' }, '打开发布说明'),
  h(
    Teleport,
    { to: ctx.teleportTarget, defer: true },
    [h(Transition, { name: 'hl-modal-fade', onAfterLeave: ctx.onAfterLeave }, {
      default: () => ctx.open
        ? [h('div', { ...ctx.rootAttrs, class: 'hl-modal-sheet-root' }, [
            ctx.mask ? h('div', { ...ctx.maskAttrs, class: 'hl-modal-sheet-mask' }) : null,
            h('div', { ...ctx.wrapAttrs, ...onProps(ctx.wrapOn), class: 'hl-modal-sheet-wrap' }, [
              h('div', {
                ref: ctx.dialogEl,
                ...ctx.dialogAttrs,
                class: 'hl-modal-sheet',
                style: [ctx.dialogAttrs.style, { visibility: ctx.zoomed ? 'visible' : 'hidden' }],
              }, [
                h('div', { ...ctx.headerAttrs, class: 'hl-modal-sheet__head' }, [
                  h('strong', null, 'v0.9 发布说明'),
                  h('button', { type: 'button', class: 'hl-modal-sheet__close', 'aria-label': '关闭', onClick: ctx.requestClose }, '✕'),
                ]),
                h('div', { class: 'hl-modal-sheet__body' }, [
                  h('p', null, 'headless 自定义渲染全量铺开：27 个视觉组件支持 #render 插槽 / render prop 双通道。'),
                  h('p', null, '本弹窗的滚动锁、Esc 关闭、蒙层点击关闭与原点缩放全部由组件逻辑驱动。'),
                ]),
              ]),
            ]),
          ])]
        : [],
    })],
  ),
]
</script>

<!-- render prop 闭包产物在子组件作用域渲染，样式须全局（hl- 专属命名）或内联 -->
<style>
.hl-modal-link {
  display: inline-block;
  color: var(--k-color-primary);
  font-size: 13px;
  cursor: pointer;
  border-bottom: 1px dashed var(--k-color-primary);
  padding-bottom: 1px;
}

.hl-modal-root {
  position: fixed;
  inset: 0;
  z-index: var(--k-z-index-modal);
  overflow: hidden;
  font-family: inherit;
}
.hl-modal-mask {
  position: fixed;
  inset: 0;
  z-index: var(--k-z-index-mask);
  background: rgb(0 0 0 / 45%);
}
.hl-modal-wrap {
  position: relative;
  z-index: calc(var(--k-z-index-mask) + 1);
  min-height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  box-sizing: border-box;
}
.hl-modal-panel {
  display: flex;
  flex-direction: column;
  max-width: calc(100vw - 32px);
  border-radius: 14px;
  background: var(--k-color-bg-elevated);
  box-shadow: var(--k-box-shadow-secondary);
  transform-origin: var(--k-modal-transform-origin, 50% 50%);
  overflow: hidden;
}
.hl-modal-panel__head {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 14px 18px;
  border-bottom: 1px solid var(--k-color-split);
  color: var(--k-color-text);
  cursor: grab;
  user-select: none;
  touch-action: none;
}
.hl-modal-panel__head--drag { cursor: grabbing; }
.hl-modal-panel__hint {
  color: var(--k-color-text-quaternary);
  font-size: 12px;
  flex: auto;
}
.hl-modal-panel__close {
  border: none;
  background: transparent;
  color: var(--k-color-text-tertiary);
  font-size: 13px;
  cursor: pointer;
  padding: 2px;
}
.hl-modal-panel__close:hover { color: var(--k-color-text); }
.hl-modal-panel__body {
  padding: 14px 18px;
  color: var(--k-color-text-secondary);
  font-size: 13px;
  line-height: 1.7;
}
.hl-modal-panel__body p { margin: 0 0 8px; }
.hl-modal-panel__body p:last-child { margin-bottom: 0; }
.hl-modal-panel__foot {
  display: flex;
  justify-content: flex-end;
  padding: 0 18px 14px;
}

.hl-modal-sheet-root {
  position: fixed;
  inset: 0;
  z-index: var(--k-z-index-modal);
  overflow: hidden;
  font-family: inherit;
}
.hl-modal-sheet-mask {
  position: fixed;
  inset: 0;
  z-index: var(--k-z-index-mask);
  background: rgb(0 0 0 / 45%);
}
.hl-modal-sheet-wrap {
  position: relative;
  z-index: calc(var(--k-z-index-mask) + 1);
  min-height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  box-sizing: border-box;
}
.hl-modal-sheet {
  border-radius: 14px;
  background: var(--k-color-bg-elevated);
  box-shadow: var(--k-box-shadow-secondary);
  transform-origin: var(--k-modal-transform-origin, 50% 50%);
  overflow: hidden;
}
.hl-modal-sheet__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 18px;
  color: var(--k-color-text);
}
.hl-modal-sheet__close {
  border: none;
  background: transparent;
  color: var(--k-color-text-tertiary);
  font-size: 13px;
  cursor: pointer;
}
.hl-modal-sheet__close:hover { color: var(--k-color-text); }
.hl-modal-sheet__body {
  padding: 0 18px 16px;
  color: var(--k-color-text-secondary);
  font-size: 13px;
  line-height: 1.7;
}
.hl-modal-sheet__body p { margin: 0 0 8px; }
.hl-modal-sheet__body p:last-child { margin-bottom: 0; }

.hl-modal-fade-enter-active { animation: hl-modal-in 0.18s ease-out; }
.hl-modal-fade-leave-active { animation: hl-modal-out 0.18s ease-in; }
@keyframes hl-modal-in {
  from { opacity: 0; }
  to { opacity: 1; }
}
@keyframes hl-modal-out {
  from { opacity: 1; }
  to { opacity: 0; }
}
</style>
