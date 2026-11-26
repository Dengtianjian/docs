<template>
  <div class="hl-like-demo">
    <div class="hl-like-demo__row">
      <LikeButton :count="128" @change="(v) => (msg = v ? '默认形态：已赞' : '默认形态：已取消')" />
      <LikeButton v-model="liked" :count="41" />
      <KButton size="sm" @click="liked = !liked">外部切换受控态</KButton>
      <span class="hl-like-demo__echo">{{ msg }}{{ liked ? ' · 受控实例=已赞' : '' }}</span>
    </div>
    <div class="hl-like-demo__row">
      <!-- #render 插槽通道：收藏书签，toggle/aria-pressed/键盘全继承 -->
      <LikeButton :count="7">
        <template #render="ctx">
          <button
            type="button"
            v-bind="ctx.rootAttrs"
            v-on="ctx.rootOn"
            class="hl-like-bookmark"
            :data-liked="ctx.liked || undefined"
          >
            {{ ctx.liked ? '★ 已收藏' : '☆ 收藏' }} · {{ ctx.count }}
          </button>
        </template>
      </LikeButton>
      <!-- render prop 通道 -->
      <LikeButton :count="326" :render="renderPlain" />
      <LikeButton :count="999" disabled />
    </div>
    <p class="hl-like-demo__note">
      LikeButton 是用 useCustomRender 基座从零接线的自有组件（源码见 examples/headless/_LikeButton.vue）：
      默认视觉 / #render 插槽 / render prop 三形态共用同一份点赞逻辑（受控双模 + 派生计数 + 键盘）。
    </p>
  </div>
</template>

<script setup lang="ts">
import { h, ref } from 'vue'
import LikeButton from './_LikeButton.vue'
import type { KLikeButtonRenderScope } from './_LikeButton.vue'
import KButton from 'kit/vue/ui/components/general/Button/Button.vue'
import { onProps } from 'kit/vue/ui/composables/useCustomRender'

const liked = ref(false)
const msg = ref('')

// render prop 通道：纯文本点赞，样式须全局（hl- 命名）或内联
const renderPlain = (ctx: KLikeButtonRenderScope) =>
  h(
    'span',
    { ...ctx.rootAttrs, ...onProps(ctx.rootOn), class: 'hl-like-plain', 'data-liked': ctx.liked || undefined },
    `${ctx.liked ? '♥' : '♡'} ${ctx.count}`,
  )
</script>

<style>
.hl-like-demo {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.hl-like-demo__row {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
}
.hl-like-demo__echo {
  font-size: 13px;
  color: var(--k-color-text-secondary);
}
.hl-like-demo__note {
  margin: 0;
  font-size: 12px;
  line-height: 1.7;
  color: var(--k-color-text-quaternary);
}
.hl-like-bookmark {
  padding: 6px 14px;
  border-radius: 8px;
  border: 1px dashed var(--k-color-border);
  background: transparent;
  color: var(--k-color-text-secondary);
  font-size: 13px;
  cursor: pointer;
  transition:
    color 0.2s,
    border-color 0.2s;
}
.hl-like-bookmark:hover {
  border-color: var(--k-color-warning);
  color: var(--k-color-warning);
}
.hl-like-bookmark[data-liked] {
  border-style: solid;
  border-color: var(--k-color-warning);
  color: var(--k-color-warning);
  background: color-mix(in oklab, var(--k-color-warning) 8%, transparent);
}
.hl-like-plain {
  display: inline-block;
  font-size: 14px;
  color: var(--k-color-text-tertiary);
  cursor: pointer;
  user-select: none;
}
.hl-like-plain[data-liked] {
  color: var(--k-color-error);
}
</style>
