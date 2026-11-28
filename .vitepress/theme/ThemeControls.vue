<script setup lang="ts">
import { nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { useData } from 'vitepress';
import { createTheme } from 'kit/vue/ui/themes/create-theme';

const DEFAULT_PRIMARY = '#1677ff';

// antd 预设色板（默认蓝在首位）
const PRESETS = [
  { name: '默认蓝', hex: '#1677ff' },
  { name: '极客蓝', hex: '#2f54eb' },
  { name: '青碧', hex: '#13c2c2' },
  { name: '极光绿', hex: '#52c41a' },
  { name: '青柠', hex: '#a0d911' },
  { name: '金盏', hex: '#faad14' },
  { name: '橘橙', hex: '#fa8c16' },
  { name: '火山', hex: '#fa541c' },
  { name: '薄暮', hex: '#f5222d' },
  { name: '法式洋红', hex: '#eb2f96' },
  { name: '酱紫', hex: '#722ed1' },
];

const { isDark } = useData();
const primary = ref(DEFAULT_PRIMARY);
const open = ref(false);
const hexDraft = ref(DEFAULT_PRIMARY.toUpperCase());
const hexFocused = ref(false);

const rootEl = ref<HTMLElement | null>(null);
const panelEl = ref<HTMLElement | null>(null);
const triggerEl = ref<HTMLButtonElement | null>(null);

// kit 组件区的亮暗跟随站点外观开关（同一 data-k-theme 语义，见 token 规格 §7）
watch(
  isDark,
  dark => {
    if (typeof document === 'undefined') return;
    document.documentElement.setAttribute('data-k-theme', dark ? 'dark' : 'light');
  },
  { immediate: true },
);

// 外部改色（预设/取色器/重置）时同步十六进制草稿；输入框聚焦期间不回写，避免打字被改写
watch(primary, v => {
  if (!hexFocused.value) hexDraft.value = v.toUpperCase();
});

function applyPrimary(hex: string) {
  if (typeof document === 'undefined') return;
  let style = document.getElementById('k-doc-primary');
  if (hex.toLowerCase() === DEFAULT_PRIMARY) {
    style?.remove();
    localStorage.removeItem('k-doc-primary');
    return;
  }
  if (!style) {
    style = document.createElement('style');
    style.id = 'k-doc-primary';
    document.head.appendChild(style);
  }
  // 活体演示 createTheme：一个 seed 差量 → oklab 表达式图铺满全库
  style.textContent = createTheme({ seed: { colorPrimary: hex } }).cssText(':root');
  localStorage.setItem('k-doc-primary', hex);
}

function pick(hex: string) {
  primary.value = hex.toLowerCase();
  applyPrimary(primary.value);
}

function onSpectrum(e: Event) {
  pick((e.target as HTMLInputElement).value);
}

const HEX_RE = /^#?([0-9a-f]{3}|[0-9a-f]{6})$/i;
function normalizeHex(raw: string): string | null {
  const m = raw.trim().match(HEX_RE);
  if (!m) return null;
  let h = m[1];
  if (h.length === 3) h = h.split('').map(c => c + c).join('');
  return `#${h.toLowerCase()}`;
}

function onHexInput(e: Event) {
  hexDraft.value = (e.target as HTMLInputElement).value;
  const norm = normalizeHex(hexDraft.value);
  if (norm) pick(norm);
}

function commitHex() {
  const norm = normalizeHex(hexDraft.value);
  if (norm) {
    pick(norm);
    hexDraft.value = norm.toUpperCase();
  } else {
    hexDraft.value = primary.value.toUpperCase();
  }
}

function onHexBlur() {
  hexFocused.value = false;
  commitHex();
}

function onHexEnter(e: KeyboardEvent) {
  commitHex();
  (e.target as HTMLInputElement).select();
}

function openPanel() {
  open.value = true;
  nextTick(() => panelEl.value?.focus());
}

function closePanel(restoreFocus = false) {
  open.value = false;
  if (restoreFocus) triggerEl.value?.focus();
}

function onTrigger() {
  open.value ? closePanel() : openPanel();
}

function onDocPointer(e: PointerEvent) {
  if (!open.value) return;
  if (rootEl.value?.contains(e.target as Node)) return;
  closePanel();
}

function onDocKey(e: KeyboardEvent) {
  if (e.key === 'Escape' && open.value) closePanel(true);
}

onMounted(() => {
  const saved = localStorage.getItem('k-doc-primary');
  if (saved) {
    primary.value = saved;
    applyPrimary(saved);
  }
  document.addEventListener('pointerdown', onDocPointer, true);
  document.addEventListener('keydown', onDocKey);
});

onBeforeUnmount(() => {
  document.removeEventListener('pointerdown', onDocPointer, true);
  document.removeEventListener('keydown', onDocKey);
});
</script>

<template>
  <div ref="rootEl" class="k-doc-ctl">
    <button
      ref="triggerEl"
      type="button"
      class="k-doc-ctl__trigger"
      :aria-expanded="open"
      aria-haspopup="dialog"
      title="主题颜色面板（createTheme seed 差量实时生效）"
      @click="onTrigger"
    >
      <span class="k-doc-ctl__swatch" :style="{ background: primary }" />
      <span class="k-doc-ctl__caret" :data-open="open || undefined" aria-hidden="true">▾</span>
    </button>

    <Transition name="k-doc-ctl-pop">
      <div
        v-if="open"
        ref="panelEl"
        class="k-doc-ctl__panel"
        role="dialog"
        aria-label="主题颜色面板"
        tabindex="-1"
      >
        <header class="k-doc-ctl__head">
          <span class="k-doc-ctl__title">主题颜色</span>
          <span class="k-doc-ctl__current">
            <i class="k-doc-ctl__dot" :style="{ background: primary }" />
            {{ primary.toUpperCase() }}
          </span>
        </header>

        <div class="k-doc-ctl__presets" role="group" aria-label="预设主题色">
          <button
            v-for="p in PRESETS"
            :key="p.hex"
            type="button"
            class="k-doc-ctl__preset"
            :class="{ 'is-active': primary === p.hex }"
            :style="{ background: p.hex, '--k-doc-ring': p.hex }"
            :title="`${p.name} ${p.hex.toUpperCase()}`"
            :aria-label="`${p.name} ${p.hex.toUpperCase()}`"
            :aria-pressed="primary === p.hex"
            @click="pick(p.hex)"
          />
        </div>

        <div class="k-doc-ctl__custom">
          <span class="k-doc-ctl__label">自定义</span>
          <div class="k-doc-ctl__row">
            <label class="k-doc-ctl__spectrum" title="打开系统取色器">
              <span class="k-doc-ctl__spectrum-fill" :style="{ background: primary }" />
              <input type="color" :value="primary" aria-label="系统取色器" @input="onSpectrum" />
            </label>
            <input
              class="k-doc-ctl__hex"
              type="text"
              spellcheck="false"
              autocomplete="off"
              maxlength="7"
              :value="hexDraft"
              aria-label="十六进制颜色值"
              @focus="hexFocused = true"
              @input="onHexInput"
              @blur="onHexBlur"
              @keydown.enter="onHexEnter"
            />
          </div>
        </div>

        <footer class="k-doc-ctl__foot">
          <span class="k-doc-ctl__hint">选「默认蓝」即恢复默认 · seed 差量实时生效</span>
        </footer>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.k-doc-ctl {
  position: relative;
  display: inline-flex;
  align-items: center;
  margin-inline-start: 12px;
}
.k-doc-ctl__trigger {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px 6px;
  border: 1px solid transparent;
  border-radius: 8px;
  background: none;
  cursor: pointer;
  color: var(--vp-c-text-2);
  line-height: 1;
}
.k-doc-ctl__trigger:hover {
  border-color: var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
}
.k-doc-ctl__swatch {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  border: 2px solid var(--vp-c-divider);
  box-shadow: inset 0 0 0 1px rgb(0 0 0 / 0.05);
}
.k-doc-ctl__caret {
  font-size: 10px;
  transition: transform 0.15s;
}
.k-doc-ctl__caret[data-open] {
  transform: rotate(180deg);
}

.k-doc-ctl__panel {
  position: absolute;
  top: calc(100% + 10px);
  right: 0;
  z-index: 100;
  width: 264px;
  max-width: calc(100vw - 32px);
  padding: 14px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background: var(--vp-c-bg-elv);
  box-shadow: var(--vp-shadow-3, 0 12px 32px rgb(0 0 0 / 0.12));
  outline: none;
}
.k-doc-ctl__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
}
.k-doc-ctl__title {
  font-size: 13px;
  font-weight: 600;
  color: var(--vp-c-text-1);
}
.k-doc-ctl__current {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-family: var(--vp-font-family-mono);
  font-size: 12px;
  color: var(--vp-c-text-2);
}
.k-doc-ctl__dot {
  width: 12px;
  height: 12px;
  border-radius: 4px;
  border: 1px solid var(--vp-c-divider);
}

.k-doc-ctl__presets {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 8px;
  margin-bottom: 14px;
}
.k-doc-ctl__preset {
  width: 100%;
  aspect-ratio: 1;
  border: none;
  border-radius: 7px;
  cursor: pointer;
  transition: transform 0.12s;
}
.k-doc-ctl__preset:hover {
  transform: scale(1.1);
}
.k-doc-ctl__preset.is-active {
  box-shadow:
    0 0 0 2px var(--vp-c-bg-elv),
    0 0 0 4px var(--k-doc-ring);
}

.k-doc-ctl__custom {
  padding-top: 12px;
  border-top: 1px solid var(--vp-c-divider);
}
.k-doc-ctl__label {
  display: block;
  margin-bottom: 8px;
  font-size: 12px;
  color: var(--vp-c-text-2);
}
.k-doc-ctl__row {
  display: flex;
  gap: 8px;
}
.k-doc-ctl__spectrum {
  position: relative;
  flex: none;
  width: 44px;
  height: 32px;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  border: 1px solid var(--vp-c-divider);
}
.k-doc-ctl__spectrum-fill {
  position: absolute;
  inset: 0;
}
.k-doc-ctl__spectrum input {
  position: absolute;
  inset: 0;
  opacity: 0;
  cursor: pointer;
}
.k-doc-ctl__hex {
  flex: 1;
  min-width: 0;
  height: 32px;
  padding: 0 10px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  font-family: var(--vp-font-family-mono);
  font-size: 13px;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}
.k-doc-ctl__hex:focus {
  border-color: var(--vp-c-brand-1);
  outline: none;
}

.k-doc-ctl__foot {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 14px;
}
.k-doc-ctl__hint {
  font-size: 11px;
  color: var(--vp-c-text-3);
}

.k-doc-ctl-pop-enter-active,
.k-doc-ctl-pop-leave-active {
  transition: opacity 0.15s ease, transform 0.15s ease;
  transform-origin: top right;
}
.k-doc-ctl-pop-enter-from,
.k-doc-ctl-pop-leave-to {
  opacity: 0;
  transform: translateY(-4px) scale(0.98);
}
</style>