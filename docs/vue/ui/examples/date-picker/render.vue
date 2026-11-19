<template>
  <div style="display: flex; align-items: center; gap: 16px; flex-wrap: wrap">
    <!-- 整件自绘：下划线触发器 + 深色紧凑面板；开合/键盘/下钻/点外关闭/定位翻转全由绑定包继承 -->
    <KDatePicker v-model="val" clearable>
      <template #render="ctx">
        <span :ref="ctx.rootEl" v-bind="ctx.rootAttrs" v-on="ctx.rootOn" class="hl-dp">
          <input
            :ref="ctx.triggerEl"
            v-bind="ctx.triggerAttrs"
            v-on="ctx.triggerOn"
            class="hl-dp__trigger"
          />
        </span>
        <Teleport :to="ctx.teleportTarget">
          <div v-if="ctx.open" :ref="ctx.popupEl" v-bind="ctx.dropAttrs" class="hl-dp__drop">
            <div class="hl-dp__head">
              <button v-if="ctx.showSuperNav" type="button" class="hl-dp__nav" v-on="ctx.superPrevOn">«</button>
              <button type="button" class="hl-dp__nav" v-on="ctx.prevOn">‹</button>
              <button type="button" class="hl-dp__title" v-on="ctx.titleOn">{{ ctx.titleText }}</button>
              <button type="button" class="hl-dp__nav" v-on="ctx.nextOn">›</button>
              <button v-if="ctx.showSuperNav" type="button" class="hl-dp__nav" v-on="ctx.superNextOn">»</button>
            </div>
            <div v-if="ctx.viewLevel === 'date'" class="hl-dp__weekdays">
              <span v-for="w in ctx.weekdays" :key="w">{{ w }}</span>
            </div>
            <div class="hl-dp__grid" :data-level="ctx.viewLevel">
              <div v-for="(row, ri) in ctx.rows" :key="ri" class="hl-dp__row">
                <button
                  v-for="c in row"
                  :key="c.ts"
                  type="button"
                  v-bind="ctx.cellAttrs(c)"
                  v-on="ctx.cellOn(c)"
                  class="hl-dp__cell"
                  :disabled="c.disabled"
                >{{ c.label }}</button>
              </div>
            </div>
            <div class="hl-dp__foot">
              <button type="button" class="hl-dp__today" :disabled="ctx.todayDisabled" v-on="ctx.todayOn">今天</button>
              <span class="hl-dp__value">{{ ctx.displayText || '未选择' }}</span>
            </div>
          </div>
        </Teleport>
      </template>
    </KDatePicker>
    <span style="font-size: 13px; color: var(--k-color-text-secondary)">时间戳：{{ val }}</span>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import KDatePicker from 'kit/vue/ui/components/DatePicker/DatePicker.vue'

const val = ref<number | null>(null)
</script>

<style scoped>
.hl-dp {
  display: inline-block;
}
.hl-dp__trigger {
  width: 150px;
  padding: 4px 2px;
  border: none;
  border-bottom: 2px solid var(--k-color-primary);
  outline: none;
  background: transparent;
  color: var(--k-color-text);
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
}
.hl-dp__trigger::placeholder {
  color: var(--k-color-text-tertiary);
  font-weight: 400;
}
.hl-dp__drop {
  z-index: 1050;
  width: 252px;
  padding: 8px;
  border-radius: 12px;
  background: #1f1f28;
  box-shadow: 0 10px 30px rgb(0 0 0 / 0.3);
  color: #e8e8ef;
}
.hl-dp__head {
  display: flex;
  align-items: center;
  gap: 2px;
  margin-bottom: 6px;
}
.hl-dp__nav {
  flex: none;
  width: 24px;
  height: 24px;
  border: none;
  border-radius: 6px;
  background: transparent;
  color: #9a9ab0;
  font-size: 14px;
  cursor: pointer;
}
.hl-dp__nav:hover {
  color: #fff;
  background: rgb(255 255 255 / 0.08);
}
.hl-dp__title {
  flex: auto;
  border: none;
  background: transparent;
  color: #ffd666;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
}
.hl-dp__weekdays {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  margin-bottom: 2px;
  color: #9a9ab0;
  font-size: 11px;
  text-align: center;
}
.hl-dp__grid {
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.hl-dp__row {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 2px;
}
.hl-dp__grid[data-level='month'] .hl-dp__row,
.hl-dp__grid[data-level='year'] .hl-dp__row {
  grid-template-columns: repeat(3, 1fr);
}
.hl-dp__cell {
  height: 28px;
  border: none;
  border-radius: 6px;
  background: transparent;
  color: #e8e8ef;
  font-size: 12px;
  cursor: pointer;
}
.hl-dp__grid[data-level='month'] .hl-dp__cell,
.hl-dp__grid[data-level='year'] .hl-dp__cell {
  height: 36px;
}
.hl-dp__cell:hover:not(:disabled):not([data-selected]) {
  background: rgb(255 255 255 / 0.1);
}
.hl-dp__cell[data-outside] {
  color: #5a5a70;
}
.hl-dp__cell[data-today]:not([data-selected]) {
  color: #ffd666;
  box-shadow: inset 0 0 0 1px #ffd666;
}
.hl-dp__cell[data-selected] {
  background: #ffd666;
  color: #1f1f28;
  font-weight: 700;
}
.hl-dp__cell[data-focused]:not([data-selected]) {
  box-shadow: inset 0 0 0 1px #9a9ab0;
}
.hl-dp__cell:disabled {
  opacity: 0.35;
  cursor: not-allowed;
}
.hl-dp__foot {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 6px;
  padding-top: 6px;
  border-top: 1px solid rgb(255 255 255 / 0.1);
}
.hl-dp__today {
  border: none;
  background: transparent;
  color: #ffd666;
  font-size: 12px;
  cursor: pointer;
}
.hl-dp__today:disabled {
  opacity: 0.35;
  cursor: not-allowed;
}
.hl-dp__value {
  font-size: 11px;
  color: #9a9ab0;
}
</style>
