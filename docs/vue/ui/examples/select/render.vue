<script setup lang="ts">
import { ref } from 'vue'
import KSelect from 'kit/vue/ui/components/Select/Select.vue'

const opts = [
  { label: 'Vue', value: 'vue' },
  { label: 'React', value: 'react' },
  { label: 'Svelte', value: 'svelte' },
  { label: 'Solid', value: 'solid' },
  { label: 'Angular', value: 'angular', disabled: true },
]
const val = ref<string | number | null>('vue')
</script>

<template>
  <div style="display: flex; align-items: center; gap: 16px; flex-wrap: wrap">
    <!-- 整件自绘：下划线触发器 + 深色面板；开合/键盘/点外关闭/定位翻转全由绑定包继承 -->
    <KSelect v-model="val" :options="opts" placeholder="选择框架">
      <template #render="ctx">
        <span :ref="ctx.rootEl" v-bind="ctx.rootAttrs" v-on="ctx.rootOn" class="hl-sel">
          <button
            :ref="ctx.controlEl"
            v-bind="ctx.controlAttrs"
            v-on="ctx.controlOn"
            class="hl-sel__control"
            type="button"
          >
            <span :class="{ 'hl-sel__placeholder': !ctx.hasValue }">
              {{ ctx.hasValue ? ctx.labelOf(ctx.selectedValues[0]) : ctx.placeholder }}
            </span>
            <span class="hl-sel__caret" :data-open="ctx.open || undefined" aria-hidden="true">▾</span>
          </button>
        </span>
        <Teleport :to="ctx.teleportTarget">
          <div v-if="ctx.open" :ref="ctx.popupEl" v-bind="ctx.dropAttrs" class="hl-sel__drop">
            <div v-bind="ctx.listAttrs" v-on="ctx.listOn" class="hl-sel__list">
              <button
                v-for="o in ctx.menuOptions"
                :key="String(o.value)"
                v-bind="ctx.optionAttrs(o)"
                v-on="ctx.optionOn(o)"
                class="hl-sel__opt"
                type="button"
                :data-selected="ctx.selectedValues.includes(o.value) || undefined"
                :disabled="o.disabled"
              >
                <span>{{ o.label }}</span>
                <span v-if="ctx.selectedValues.includes(o.value)" aria-hidden="true">✓</span>
              </button>
            </div>
          </div>
        </Teleport>
      </template>
    </KSelect>
    <span style="font-size: 13px; color: var(--k-color-text-secondary)">当前值：{{ val }}</span>
  </div>
</template>

<style scoped>
.hl-sel {
  display: inline-block;
}
.hl-sel__control {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 4px 2px;
  border: none;
  border-bottom: 2px solid var(--k-color-primary);
  background: transparent;
  color: var(--k-color-text);
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
}
.hl-sel__placeholder {
  color: var(--k-color-text-tertiary);
  font-weight: 400;
}
.hl-sel__caret {
  font-size: 11px;
  color: var(--k-color-primary);
  transition: transform 0.15s;
}
.hl-sel__caret[data-open] {
  transform: rotate(180deg);
}
.hl-sel__drop {
  z-index: 1050;
  min-width: 160px;
  padding: 6px;
  border-radius: 12px;
  background: #1f1f28;
  box-shadow: 0 10px 30px rgb(0 0 0 / 0.3);
}
.hl-sel__list {
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.hl-sel__opt {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 7px 12px;
  border: none;
  border-radius: 8px;
  background: transparent;
  color: #e8e8ef;
  font-size: 13px;
  text-align: left;
  cursor: pointer;
}
.hl-sel__opt[data-active] {
  background: rgb(255 255 255 / 0.1);
}
.hl-sel__opt[data-selected] {
  color: #ffd666;
}
.hl-sel__opt:disabled {
  opacity: 0.35;
  cursor: not-allowed;
}
</style>