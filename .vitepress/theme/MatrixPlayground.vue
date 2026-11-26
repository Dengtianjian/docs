<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, reactive, ref, watch } from 'vue';
import { Search } from '@vicons/tabler';
import KButton from 'kit/vue/ui/components/general/Button/Button.vue';
import KConfigProvider from 'kit/vue/ui/components/general/ConfigProvider/ConfigProvider.vue';
import { antdRef, ANTD_NONE_NOTE } from './antdButtonRef';

/** embed = iframe 内嵌模式（matrix-embed 页传入）：去控制条/视口切换，紧凑排版，mobile token 由 375 视口真触发 */
const props = defineProps<{ embed?: boolean }>();

const TYPES = ['default', 'primary', 'info', 'success', 'warning', 'danger', 'link'] as const;
const VARIANTS = [
  'outlined', 'filled', 'tonal', 'text', 'quiet',
  'dashed', 'ghost', 'plain', 'soft', 'border',
] as const;
const SIZES = ['xs', 'sm', 'md', 'lg'] as const;
const TEXT_SHAPES = ['default', 'round'] as const;
const ICON_SHAPES = ['circle', 'square'] as const;

const viewport = ref<'pc' | 'mobile'>('pc');

const activeTypes = ref<string[]>([...TYPES]);
const SCHEMES = ['light', 'dark'] as const;

interface Cell {
  key: string;
  label: string;
  buttonProps: Record<string, unknown>;
  tipLight: string;
  tipDark: string;
}

function tipFor(type: string, variant: string, scheme: 'light' | 'dark'): string {
  const ref = antdRef(type, variant, scheme);
  if (!ref) return `antd 无对照（自创档）\n${ANTD_NONE_NOTE}`;
  const row = (ch: string, tri: [string, string, string]) => `${ch} ${tri[0]} → ${tri[1]} → ${tri[2]}`;
  return [
    `antd ${ref.level === 'exact' ? '对应' : '近似'}｜${ref.antd}（${scheme}）`,
    row('bg', ref.bg),
    row('fg', ref.fg),
    row('bd', ref.bd),
    '（静置 → hover → active）',
  ].join('\n');
}

const cells = computed<Cell[]>(() => {
  const out: Cell[] = [];
  for (const type of TYPES) {
    if (!activeTypes.value.includes(type)) continue;
    if (type === 'link') {
      out.push({
        key: 'link',
        label: 'link',
        buttonProps: { type: 'link' },
        tipLight: tipFor('primary', 'link', 'light'),
        tipDark: tipFor('primary', 'link', 'dark'),
      });
      continue;
    }
    for (const variant of VARIANTS) {
      out.push({
        key: `${type}:${variant}`,
        label: variant.slice(0, 2),
        buttonProps: { type, variant },
        tipLight: tipFor(type, variant, 'light'),
        tipDark: tipFor(type, variant, 'dark'),
      });
    }
  }
  return out;
});

/* ---------------- WCAG 2.x 对比度徽章（R2/R4b） ----------------
   静置 = 读格内按钮 computed color/background（canvas 解析任意色空间，半透明 source-over 叠容器底）。
   hover/active（R4b）= 桌面指针不可用，改走 CSSOM：收集命中该按钮且声明该伪类的规则——库内状态规则
   只重声明 --k-button-bg/--k-button-text-color 变量——把表达式放进按钮内部的探针 span，
   借继承的 --k-button-c/--k-mix-* 现值让 color-mix 真实求值。 */

const stateMode = ref<'rest' | 'hover' | 'active'>('rest');

const cellEls = ref<HTMLElement[]>([]);
const gridEls = ref<HTMLElement[]>([]);
const ratios = reactive<Record<string, number>>({});

let scratch: CanvasRenderingContext2D | null = null;
function toRGBA(color: string): [number, number, number, number] {
  if (!scratch) {
    const c = document.createElement('canvas');
    c.width = 1;
    c.height = 1;
    scratch = c.getContext('2d', { willReadFrequently: true })!;
  }
  const ctx = scratch;
  ctx.clearRect(0, 0, 1, 1);
  ctx.fillStyle = '#000';
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, 1, 1);
  const img = ctx.getImageData(0, 0, 1, 1).data;
  return [img[0], img[1], img[2], img[3] / 255];
}
/** fg 叠到 bg（bg 视作不透明基底）后的有效色 */
function over(bg: [number, number, number, number], fg: [number, number, number, number]): [number, number, number] {
  const a = fg[3];
  return [0, 1, 2].map(i => fg[i] * a + bg[i] * (1 - a)) as [number, number, number];
}
function wcagRatio(fg: [number, number, number], bg: [number, number, number]): number {
  const lum = (c: number[]) => {
    const f = (v: number) => {
      v /= 255;
      return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
    };
    return 0.2126 * f(c[0]) + 0.7152 * f(c[1]) + 0.0722 * f(c[2]);
  };
  const [l1, l2] = [lum(fg), lum(bg)];
  return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
}

/** 状态变量三通道：库内 hover/active 只重声明这些 var（border 档不参与对比度） */
const STATE_PROPS = ['--k-button-bg', '--k-button-text-color'] as const;

/** 顶层逗号切分（:is(...) 内的逗号不算分隔，否则带 :is 的状态规则全部误拆） */
function splitSelectors(sel: string): string[] {
  const parts: string[] = [];
  let depth = 0;
  let cur = '';
  for (const ch of sel) {
    if (ch === '(') depth++;
    else if (ch === ')') depth--;
    if (ch === ',' && depth === 0) { parts.push(cur); cur = ''; continue; }
    cur += ch;
  }
  parts.push(cur);
  return parts;
}

function stateDecls(el: HTMLElement, pseudo: ':hover' | ':active'): Map<string, string> {
  const out = new Map<string, string>();
  const scan = (rules: CSSRuleList) => {
    for (const rule of Array.from(rules)) {
      if (rule instanceof CSSMediaRule) { scan(rule.cssRules); continue; }
      if (!(rule instanceof CSSStyleRule)) continue;
      if (!rule.selectorText.includes(pseudo)) continue;
      const hit = splitSelectors(rule.selectorText).some(part => {
        if (!part.includes(pseudo)) return false;
        const clean = part.trim().replace(/:(?:hover|active)/g, '');
        try { return el.matches(clean); } catch { return false; }
      });
      if (!hit) continue;
      for (const p of STATE_PROPS) {
        const v = rule.style.getPropertyValue(p).trim();
        if (v) out.set(p, v);
      }
    }
  };
  for (const sheet of Array.from(document.styleSheets)) {
    try { scan(sheet.cssRules); } catch { /* 跨源样式表跳过 */ }
  }
  return out;
}

/** 探针放按钮内部：继承按钮现值变量链，覆盖状态声明后由浏览器真实求值 */
function stateColors(btn: HTMLElement, pseudo: ':hover' | ':active') {
  const decls = stateDecls(btn, pseudo);
  const probe = document.createElement('span');
  probe.style.cssText = 'position:absolute;width:0;height:0;overflow:hidden;pointer-events:none';
  for (const [p, v] of decls) probe.style.setProperty(p, v);
  probe.style.backgroundColor = 'var(--k-button-bg)';
  probe.style.color = 'var(--k-button-text-color)';
  btn.appendChild(probe);
  const cs = getComputedStyle(probe);
  const res = { bg: toRGBA(cs.backgroundColor), fg: toRGBA(cs.color), hadRules: decls.size > 0 };
  probe.remove();
  return res;
}

function measure() {
  const keys = cells.value.map(c => c.key);
  cellEls.value.forEach((el, i) => {
    if (!el) return;
    // 双列布局：cellEls 顺序 = [light 列 cells..., dark 列 cells...]（模板两层 v-for 展平）
    const perCol = keys.length;
    const schemeIdx = i >= perCol ? 1 : 0;
    const key = keys[i % perCol];
    const btn = el.querySelector<HTMLElement>('.k-button');
    const grid = gridEls.value[schemeIdx];
    if (!btn || !grid) return;
    const base = toRGBA(getComputedStyle(grid).backgroundColor);
    let btnBg: [number, number, number, number];
    let btnFg: [number, number, number, number];
    if (stateMode.value === 'rest') {
      btnBg = toRGBA(getComputedStyle(btn).backgroundColor);
      btnFg = toRGBA(getComputedStyle(btn).color);
    } else {
      const st = stateColors(btn, stateMode.value === 'hover' ? ':hover' : ':active');
      btnBg = st.bg;
      btnFg = st.fg;
    }
    const effBg = over(base, btnBg);
    const fg = over(effBg, btnFg);
    const dup = schemeIdx === 1 ? `${key}@dark` : key;
    ratios[dup] = Math.round(wcagRatio(fg, effBg) * 100) / 100;
  });
}

function grade(key: string): 'pass' | 'mid' | 'fail' | 'none' {
  const r = ratios[key];
  if (r == null) return 'none';
  return r >= 4.5 ? 'pass' : r >= 3 ? 'mid' : 'fail';
}

let headObserver: MutationObserver | null = null;
onMounted(async () => {
  await nextTick();
  measure();
  // 站点主色取色器（#k-doc-primary style 标签）/ html 亮暗翻转时重测；scoped scheme 列是 prop 不需监听
  headObserver = new MutationObserver(() => measure());
  headObserver.observe(document.head, { childList: true });
  headObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-k-theme', 'class'] });
});
watch(cells, async () => {
  await nextTick();
  measure();
});
watch(stateMode, () => measure());
onBeforeUnmount(() => headObserver?.disconnect());
</script>

<template>
  <div :class="['mp', { 'mp--embed': props.embed }]">
    <div v-if="!props.embed" class="mp__controls">
      <span class="mp__label">type：</span>
      <label v-for="t in TYPES" :key="t" class="mp__chk">
        <input v-model="activeTypes" type="checkbox" :value="t" /> {{ t }}
      </label>
      <span class="mp__label">视口：</span>
      <label v-for="v in (['pc', 'mobile'] as const)" :key="v" class="mp__chk">
        <input v-model="viewport" type="radio" name="mp-viewport" :value="v" /> {{ v === 'pc' ? 'PC' : 'mobile 375（iframe）' }}
      </label>
      <span class="mp__label">状态：</span>
      <label v-for="s in (['rest', 'hover', 'active'] as const)" :key="s" class="mp__chk">
        <input v-model="stateMode" type="radio" name="mp-state" :value="s" /> {{ s === 'rest' ? '静置' : s }}
      </label>
      <span class="mp__hint">徽章 = 所选状态的字色叠底色 WCAG 2.x 对比度（≥4.5 绿 / ≥3 黄 / <3 红；large 档线）；hover/active 为 CSSOM 表达式探针实测值（非指针模拟）。</span>
    </div>

    <div v-if="!props.embed && viewport === 'mobile'" class="mp__mobile">
      <p class="mp__mobile-note">
        iframe 视口 375×667：kit 的 mobile @media（controlHeight 44 / radius 8）按真实宽度生效；
        <code>hover:none</code> 按压形态跟随设备而非窗口，桌面浏览器内不切换（真机/DevTools 模拟验证）。
        iframe 内是独立页面，type 过滤不联动。
      </p>
      <iframe
        class="mp__iframe"
        src="/vue/ui/playground/matrix-embed.html"
        width="375"
        height="667"
        title="mobile 375 视口矩阵"
      />
    </div>

    <div v-else class="mp__schemes">
      <section v-for="scheme in SCHEMES" :key="scheme" class="mp__col">
        <h5 v-if="!props.embed" class="mp__col-title">{{ scheme === 'light' ? '亮' : '暗' }}（scheme 子树独立，兼做待定项 #8 载体）</h5>
        <KConfigProvider :scheme="scheme" scoped>
          <div class="mp__grid" :ref="(el) => { if (el) gridEls[SCHEMES.indexOf(scheme)] = el as HTMLElement }">
            <div
              v-for="(c, idx) in cells"
              :key="`${scheme}:${c.key}`"
              class="mp__cell"
              :ref="(el) => { if (el) cellEls[cells.length * SCHEMES.indexOf(scheme) + idx] = (el as HTMLElement) }"
            >
              <KButton v-bind="c.buttonProps">{{ c.label }}</KButton>
              <span :class="['mp__badge', `mp__badge--${grade(scheme === 'light' ? c.key : `${c.key}@dark`)}`]">
                {{ ratios[scheme === 'light' ? c.key : `${c.key}@dark`]?.toFixed(1) ?? '—' }}
              </span>
              <div class="mp__tip" v-text="scheme === 'light' ? c.tipLight : c.tipDark" />
            </div>
          </div>

          <div class="mp__subs">
            <div class="mp__sub">
              <h6 class="mp__sub-title">size × shape（文字钮）</h6>
              <div class="mp__sub-grid mp__sub-grid--2">
                <template v-for="s in SIZES" :key="s">
                  <div v-for="sh in TEXT_SHAPES" :key="`${s}:${sh}`" class="mp__sub-cell">
                    <KButton :size="s" :shape="sh">{{ s }}</KButton>
                    <em class="mp__sub-cap">{{ sh }}</em>
                  </div>
                </template>
              </div>
            </div>
            <div class="mp__sub">
              <h6 class="mp__sub-title">size × shape（icon-only）</h6>
              <div class="mp__sub-grid mp__sub-grid--2">
                <template v-for="s in SIZES" :key="s">
                  <div v-for="sh in ICON_SHAPES" :key="`${s}:${sh}`" class="mp__sub-cell">
                    <KButton :size="s" :shape="sh" :icon="Search" />
                    <em class="mp__sub-cap">{{ sh }}</em>
                  </div>
                </template>
              </div>
            </div>
          </div>
        </KConfigProvider>
      </section>
    </div>
  </div>
</template>

<style scoped>
.mp__controls {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
  margin-bottom: 16px;
  font-size: 13px;
}
.mp__label {
  font-weight: 600;
}
.mp__chk {
  display: inline-flex;
  gap: 4px;
  align-items: center;
  cursor: pointer;
  user-select: none;
}
.mp__hint {
  color: var(--vp-c-text-3);
}
.mp__schemes {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(440px, 1fr));
  gap: 16px;
}
.mp__col-title {
  margin: 0 0 8px;
  font-size: 13px;
  color: var(--vp-c-text-2);
}
.mp__grid {
  position: relative;
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  gap: 6px;
  padding: 12px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--k-color-bg-container);
}
.mp__cell {
  position: relative;
  display: flex;
  justify-content: center;
}
.mp__badge {
  position: absolute;
  top: -4px;
  right: -6px;
  padding: 0 3px;
  border-radius: 4px;
  font: 9px/14px var(--vp-font-family-mono);
  color: #fff;
  pointer-events: none;
}
.mp__badge--pass { background: #2e7d32; }
.mp__badge--mid { background: #b26a00; }
.mp__badge--fail { background: #c62828; }
.mp__badge--none { background: #757575; }
.mp__tip {
  display: none;
  position: absolute;
  bottom: calc(100% + 6px);
  left: 50%;
  transform: translateX(-50%);
  z-index: 30;
  width: max-content;
  max-width: 280px;
  padding: 8px 10px;
  border-radius: 6px;
  background: rgba(0, 0, 0, 0.88);
  color: #fff;
  font: 11px/1.7 var(--vp-font-family-mono);
  white-space: pre;
  pointer-events: none;
}
.mp__cell:hover .mp__tip {
  display: block;
}
.mp__mobile {
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: flex-start;
}
.mp__mobile-note {
  margin: 0;
  max-width: 640px;
  font-size: 12px;
  line-height: 1.7;
  color: var(--vp-c-text-2);
}
.mp__iframe {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: #fff;
}
.mp__subs {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 12px;
  margin-top: 12px;
  padding: 12px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  /* 与 .mp__grid 同理：scoped 暗列必须有容器底，否则白字 88% 叠站点白底不可见（2026-11-17 用户截图抓获） */
  background: var(--k-color-bg-container);
}
.mp__sub-title {
  margin: 0 0 6px;
  font-size: 12px;
  font-weight: 600;
  color: var(--k-color-text-secondary); /* 跟列 scheme 走，不用站点 vp 变量 */
}
.mp__sub-grid {
  display: grid;
  gap: 8px;
  align-items: end;
}
.mp__sub-grid--2 {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}
.mp__sub-cell {
  display: flex;
  flex-direction: column;
  gap: 2px;
  align-items: center;
}
.mp__sub-cap {
  font: 10px var(--vp-font-family-mono);
  font-style: normal;
  color: var(--k-color-text-tertiary);
}
/* embed（375 iframe）：单列堆叠 + 主矩阵按可用宽自适应换行 */
.mp--embed .mp__schemes {
  grid-template-columns: 1fr;
}
.mp--embed .mp__grid {
  grid-template-columns: repeat(auto-fill, minmax(58px, 1fr));
  padding: 8px;
}
.mp--embed {
  padding: 8px;
}
</style>
