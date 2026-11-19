<template>
  <KDateRangePicker v-model="range" :presets="presets" clearable>
    <template #render="ctx">
      <div :ref="ctx.rootEl" v-bind="ctx.rootAttrs" v-on="ctx.rootOn" class="mini">
        <div class="mini__trigger">
          <input class="mini__input" v-bind="ctx.triggerAttrs('start')" v-on="ctx.triggerOn('start')" />
          <span>→</span>
          <input class="mini__input" v-bind="ctx.triggerAttrs('end')" v-on="ctx.triggerOn('end')" />
          <button v-if="range" type="button" class="mini__clear" v-on="ctx.clearOn">×</button>
        </div>
        <div v-if="ctx.open" :ref="ctx.popupEl" v-bind="ctx.panelAttrs" class="mini__panel">
          <div class="mini__presets">
            <button v-for="preset in ctx.presets" :key="preset.label" type="button" v-on="ctx.presetOn(preset)">
              {{ preset.label }}
            </button>
          </div>
          <div class="mini__calendars">
            <div v-for="(rows, side) in [ctx.leftRows, ctx.rightRows]" :key="side" class="mini__calendar">
              <div class="mini__header">
                <button v-if="side === 0" type="button" v-on="ctx.prevOn">‹</button>
                <span>{{ side === 0 ? ctx.leftTitle : ctx.rightTitle }}</span>
                <button v-if="side === 1" type="button" v-on="ctx.nextOn">›</button>
              </div>
              <div class="mini__grid">
                <span
                  v-for="cell in rows.flat()"
                  :key="cell.ts"
                  v-bind="ctx.cellAttrs(cell)"
                  v-on="ctx.cellOn(cell)"
                  class="mini__cell"
                  :class="{ 'is-in': cell.inRange, 'is-edge': cell.rangeStart || cell.rangeEnd, 'is-out': !cell.inView, 'is-disabled': cell.disabled }"
                >{{ cell.label }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </KDateRangePicker>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import KDateRangePicker from 'kit/vue/ui/components/DateRangePicker/DateRangePicker.vue'

const range = ref<[number, number] | null>(null)
const presets = [
  { label: '近 7 天', value: [Date.now() - 6 * 86400000, Date.now()] as [number, number] },
  { label: '今天', value: [Date.now(), Date.now()] as [number, number] },
]
</script>

<style scoped>
.mini { position: relative; width: 360px; max-width: 100%; }
.mini__trigger { display: flex; align-items: center; gap: 6px; padding: 0 10px; height: 38px; border: 1px solid var(--vp-c-divider); border-radius: 6px; }
.mini__input { flex: 1; min-width: 0; border: none; background: none; outline: none; text-align: center; font: inherit; color: inherit; }
.mini__clear { border: none; background: none; cursor: pointer; color: var(--vp-c-text-3); }
.mini__panel { position: absolute; z-index: 10; top: calc(100% + 4px); left: 0; padding: 10px; display: flex; gap: 10px; background: var(--vp-c-bg-elv); border: 1px solid var(--vp-c-divider); border-radius: 8px; box-shadow: 0 6px 20px rgb(0 0 0 / 12%); }
.mini__presets { display: flex; flex-direction: column; gap: 4px; padding-right: 8px; border-right: 1px solid var(--vp-c-divider); }
.mini__presets button { border: none; background: none; cursor: pointer; color: var(--vp-c-text-2); font-size: 12px; text-align: left; white-space: nowrap; }
.mini__calendars { display: flex; gap: 12px; }
.mini__header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px; font-size: 12px; }
.mini__header button { border: none; background: none; cursor: pointer; }
.mini__grid { display: grid; grid-template-columns: repeat(7, 28px); gap: 2px; }
.mini__cell { display: flex; align-items: center; justify-content: center; height: 28px; border-radius: 4px; font-size: 12px; cursor: pointer; }
.mini__cell:hover { background: var(--vp-c-bg-soft); }
.mini__cell.is-out { color: var(--vp-c-text-3); }
.mini__cell.is-edge { background: var(--vp-c-brand-1); color: #fff; }
.mini__cell.is-in { background: var(--vp-c-brand-soft); }
.mini__cell.is-disabled { color: var(--vp-c-text-3); text-decoration: line-through; cursor: not-allowed; }
@media (max-width: 767px) {
  .mini__panel { flex-direction: column; max-width: calc(100vw - 48px); overflow: auto; }
  .mini__presets { flex-direction: row; border-right: none; border-bottom: 1px solid var(--vp-c-divider); padding: 0 0 6px; }
  .mini__calendars { flex-direction: column; }
}
</style>
