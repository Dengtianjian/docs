<template>
  <template v-if="hasCustomRender">
    <slot v-if="$slots.render" name="render" v-bind="renderScope" />
    <component v-else :is="renderPropOutlet" />
  </template>
  <button
    v-else
    type="button"
    v-bind="rootAttrs"
    v-on="rootOn"
    class="hl-like"
    :class="{ 'is-liked': liked }"
    :disabled="disabled"
  >
    <span class="hl-like__heart" aria-hidden="true"><IconHeartFilled :size="15" /></span>
    <span class="hl-like__count">{{ renderScope.count }}</span>
  </button>
</template>

<script setup lang="ts">
import { computed, getCurrentInstance, ref, useSlots } from 'vue'
import { IconHeartFilled } from '@tabler/icons-vue'
import { useCustomRender, type KOnPack, type KRenderFn } from 'kit/vue/ui/composables/useCustomRender'

export interface KLikeButtonRenderScope {
  liked: boolean
  /** 派生状态：基数 + 点赞增量 */
  count: number
  disabled: boolean
  rootAttrs: Record<string, unknown>
  rootOn: KOnPack
  toggle: () => void
  slots: ReturnType<typeof useSlots>
}

const props = withDefaults(
  defineProps<{
    /** 不传 = 自管点赞态；传 = 受控（toggle 只发事件） */
    modelValue?: boolean
    count?: number
    disabled?: boolean
    render?: KRenderFn<KLikeButtonRenderScope>
  }>(),
  { count: 0, disabled: false },
)

const emit = defineEmits<{
  'update:modelValue': [liked: boolean]
  change: [liked: boolean]
}>()

const instance = getCurrentInstance()!
const controlled = computed(() => 'modelValue' in (instance.vnode.props ?? {}))
const inner = ref(false)
const liked = computed(() => (controlled.value ? !!props.modelValue : inner.value))

function toggle() {
  if (props.disabled) return
  const next = !liked.value
  if (!controlled.value) inner.value = next
  emit('update:modelValue', next)
  emit('change', next)
}

// 铁律①：默认模板与 scope 共用的包提顶层 computed；铁律②：包里只有语义/状态，无视觉壳类
const rootAttrs = computed(() => ({
  'data-part': 'root',
  role: 'button',
  'aria-pressed': String(liked.value),
  'aria-disabled': props.disabled || undefined,
  tabindex: props.disabled ? undefined : '0',
}))

const rootOn: KOnPack = {
  click: () => toggle(),
  keydown: (e) => {
    // 原生 button/a 的 Enter/Space 已会派发 click，此处跳过防双触发
    const tag = (e.target as HTMLElement).tagName
    if (tag === 'BUTTON' || tag === 'A') return
    const key = (e as KeyboardEvent).key
    if (key === 'Enter' || key === ' ') {
      e.preventDefault()
      toggle()
    }
  },
}

const slots = useSlots()
const { renderScope, hasCustomRender, renderPropOutlet } = useCustomRender(
  () => props.render,
  () => ({
    liked: liked.value,
    count: props.count + (liked.value ? 1 : 0),
    disabled: props.disabled,
    rootAttrs: rootAttrs.value,
    rootOn,
    toggle,
    slots,
  }),
)

defineSlots<{ render?(scope: KLikeButtonRenderScope): any }>()
</script>

<style>
.hl-like {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 14px;
  border-radius: 999px;
  border: 1px solid var(--k-color-border);
  background: var(--k-color-bg-container);
  color: var(--k-color-text-secondary);
  font-size: 13px;
  cursor: pointer;
  transition:
    color 0.2s,
    border-color 0.2s,
    background-color 0.2s;
}
.hl-like:hover {
  border-color: var(--k-color-error);
  color: var(--k-color-error);
}
.hl-like.is-liked {
  color: var(--k-color-error);
  border-color: color-mix(in oklab, var(--k-color-error) 45%, var(--k-color-border));
  background: color-mix(in oklab, var(--k-color-error) 6%, var(--k-color-bg-container));
}
.hl-like:disabled {
  opacity: 0.45;
  cursor: not-allowed;
}
.hl-like__heart {
  display: inline-flex;
}
.hl-like.is-liked .hl-like__heart {
  animation: hl-like-pop 0.3s ease;
}
.hl-like__count {
  font-variant-numeric: tabular-nums;
}
@keyframes hl-like-pop {
  0% {
    transform: scale(1);
  }
  40% {
    transform: scale(1.35);
  }
  100% {
    transform: scale(1);
  }
}
</style>
