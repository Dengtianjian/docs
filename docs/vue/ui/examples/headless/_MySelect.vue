<script setup lang="ts">
import KSelect from 'kit/vue/ui/components/Select/Select.vue'
import type { KSelectOption } from 'kit/vue/ui/components/Select/Select.vue'

withDefaults(
  defineProps<{
    modelValue?: string | number | null
    options?: KSelectOption[]
    placeholder?: string
    /** 强调色：触发器下划线 / 选中项 / 勾标共用，传 kit token 或任意 CSS 色值 */
    accent?: string
    disabled?: boolean
  }>(),
  {
    modelValue: null,
    options: () => [],
    placeholder: '请选择',
    accent: 'var(--k-color-primary)',
    disabled: false,
  },
)

const emit = defineEmits<{
  'update:modelValue': [value: string | number | null]
  change: [value: string | number | null]
}>()
</script>

<template>
  <!-- 自有组件只消费 KSelect 的 headless 绑定包：开合/键盘/外点/定位/禁用全继承，视觉身份整件自绘 -->
  <KSelect
    :model-value="modelValue"
    :options="options"
    :placeholder="placeholder"
    :disabled="disabled"
    @update:model-value="(v) => emit('update:modelValue', v as string | number | null)"
    @change="(v) => emit('change', v as string | number | null)"
  >
    <template #render="ctx">
      <span
        :ref="ctx.rootEl"
        v-bind="ctx.rootAttrs"
        v-on="ctx.rootOn"
        class="my-select"
        :style="{ '--my-accent': accent }"
      >
        <button
          :ref="ctx.controlEl"
          v-bind="ctx.controlAttrs"
          v-on="ctx.controlOn"
          type="button"
          class="my-select__trigger"
          :class="{ 'is-open': ctx.open }"
          :data-disabled="ctx.disabled || undefined"
        >
          <span :class="{ 'my-select__placeholder': !ctx.hasValue }">
            {{ ctx.hasValue ? ctx.labelOf(ctx.selectedValues[0]) : ctx.placeholder }}
          </span>
          <span class="my-select__caret" aria-hidden="true">▾</span>
        </button>
      </span>
      <Teleport :to="ctx.teleportTarget" defer>
        <!-- CSS 变量不跨 Teleport 继承：强调色须在弹层上重声明 -->
        <div
          v-if="ctx.open"
          :ref="ctx.popupEl"
          v-bind="ctx.dropAttrs"
          class="my-select__drop"
          :style="{ '--my-accent': accent }"
        >
          <div v-bind="ctx.listAttrs" v-on="ctx.listOn">
            <button
              v-for="o in ctx.menuOptions"
              :key="String(o.value)"
              v-bind="ctx.optionAttrs(o)"
              v-on="ctx.optionOn(o)"
              type="button"
              class="my-select__option"
              :data-selected="ctx.selectedValues.includes(o.value) || undefined"
              :disabled="o.disabled"
            >
              <span>{{ o.label }}</span>
              <span v-if="ctx.selectedValues.includes(o.value)" class="my-select__check" aria-hidden="true">✓</span>
            </button>
          </div>
        </div>
      </Teleport>
    </template>
  </KSelect>
</template>

<style>
.my-select {
  display: inline-block;
}
.my-select__trigger {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 2px;
  border: none;
  border-bottom: 2px solid var(--k-color-border);
  background: transparent;
  color: var(--k-color-text);
  font-size: 14px;
  cursor: pointer;
  transition: border-color 0.2s;
}
.my-select__trigger:hover {
  border-color: var(--k-color-border-hover);
}
.my-select__trigger.is-open {
  border-color: var(--my-accent);
}
.my-select__trigger[data-disabled] {
  opacity: 0.45;
  cursor: not-allowed;
}
.my-select__placeholder {
  color: var(--k-color-text-quaternary);
}
.my-select__caret {
  font-size: 12px;
  color: var(--k-color-text-tertiary);
  transition: transform 0.2s;
}
.my-select__trigger.is-open .my-select__caret {
  transform: rotate(180deg);
  color: var(--my-accent);
}
.my-select__drop {
  min-width: 180px;
  padding: 6px;
  border-radius: 10px;
  border: 1px solid var(--k-color-border);
  background: var(--k-color-bg-elevated);
  box-shadow: var(--k-box-shadow-secondary);
}
.my-select__option {
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 7px 10px;
  border: none;
  border-radius: 7px;
  background: transparent;
  color: var(--k-color-text);
  font-size: 13px;
  text-align: left;
  cursor: pointer;
}
.my-select__option[data-active] {
  background: var(--k-color-fill-tertiary);
}
.my-select__option[data-selected] {
  color: var(--my-accent);
  font-weight: 600;
}
.my-select__option:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}
.my-select__check {
  color: var(--my-accent);
}
</style>