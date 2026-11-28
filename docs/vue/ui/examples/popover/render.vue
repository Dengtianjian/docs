<template>
  <div style="display: flex; gap: 24px; align-items: center; flex-wrap: wrap">
    <!-- #render 插槽通道：点击触发自绘快捷菜单，Teleport/定位/外点关闭全继承 -->
    <KPopover trigger="click" placement="bottom">
      <template #render="ctx">
        <span :ref="ctx.triggerEl" v-bind="ctx.triggerAttrs" v-on="ctx.triggerOn" class="hl-pop-menu-trigger">
          <KButton size="sm">快捷操作</KButton>
        </span>
        <Teleport :to="ctx.teleportTarget" defer>
          <div v-if="ctx.visible" :ref="ctx.popupEl" v-bind="ctx.popupAttrs" v-on="ctx.popupOn" class="hl-pop-menu">
            <button v-for="act in ['复制节点 ID', '导出为 SVG', '固定到画布']" :key="act" type="button" class="hl-pop-menu__item" @click="picked = act; ctx.setOpen(false)">
              {{ act }}
            </button>
          </div>
        </Teleport>
      </template>
    </KPopover>
    <span style="color: var(--k-color-text-tertiary); font-size: 13px">{{ picked ? `已执行：${picked}` : '点击按钮打开菜单' }}</span>

    <!-- render prop 通道：hover 墨线气泡 -->
    <KPopover title="画布锚点" content="弹层坐标由组件计算：视口翻转、箭头限位、容器跟随全在 popupAttrs 里。" :render="renderInk" />
  </div>
</template>

<script setup lang="ts">
import { h, Teleport, ref } from 'vue'
import KPopover from 'kit/vue/ui/components/overlay/Popover/Popover.vue'
import KButton from 'kit/vue/ui/components/general/Button/Button.vue'
import type { KPopoverRenderScope } from 'kit/vue/ui/components/overlay/Popover/Popover.vue'
import { onProps } from 'kit/vue/ui/composables/useCustomRender'

const picked = ref('')

// render prop 通道：定位/延迟/外点关闭逻辑包继承，墨线气泡视觉自绘
const renderInk = (ctx: KPopoverRenderScope) => [
  h(
    'span',
    { ref: ctx.triggerEl, ...ctx.triggerAttrs, ...onProps(ctx.triggerOn), class: 'hl-pop-ink-trigger' },
    '悬停查看释义',
  ),
  h(
    Teleport,
    { to: ctx.teleportTarget, defer: true },
    ctx.visible
      ? [h('div', { ref: ctx.popupEl, ...ctx.popupAttrs, ...onProps(ctx.popupOn), class: 'hl-pop-ink' }, [
          h('strong', { class: 'hl-pop-ink__title' }, ctx.title),
          h('p', { class: 'hl-pop-ink__body' }, ctx.content),
        ])]
      : [],
  ),
]
</script>

<!-- render prop 闭包产物在子组件作用域渲染，样式须全局（hl- 专属命名）或内联 -->
<style>
.hl-pop-menu-trigger { display: inline-block; }
.hl-pop-menu {
  display: flex;
  flex-direction: column;
  min-width: 160px;
  padding: 6px;
  border-radius: 10px;
  border: 1px solid var(--k-color-border);
  background: var(--k-color-bg-elevated);
  box-shadow: var(--k-box-shadow-secondary);
}
.hl-pop-menu__item {
  border: none;
  background: transparent;
  text-align: left;
  padding: 8px 10px;
  border-radius: 7px;
  color: var(--k-color-text);
  font-size: 13px;
  cursor: pointer;
}
.hl-pop-menu__item:hover {
  background: color-mix(in oklab, var(--k-color-primary) 12%, transparent);
  color: var(--k-color-primary);
}

.hl-pop-ink-trigger {
  display: inline-block;
  color: var(--k-color-primary);
  font-size: 13px;
  cursor: help;
  border-bottom: 1px dashed var(--k-color-primary);
  padding-bottom: 1px;
}
.hl-pop-ink {
  max-width: 260px;
  padding: 10px 14px;
  border-left: 3px solid var(--k-color-primary);
  background: var(--k-color-bg-elevated);
  box-shadow: var(--k-box-shadow-secondary);
  font-size: 13px;
}
.hl-pop-ink__title {
  display: block;
  color: var(--k-color-text);
  margin-bottom: 4px;
}
.hl-pop-ink__body {
  margin: 0;
  color: var(--k-color-text-secondary);
  line-height: 1.6;
}
</style>
