<script setup lang="ts">
import { computed, defineAsyncComponent, ref, shallowRef, watch } from "vue";
import {
  transformerMetaHighlight,
  transformerNotationFocus,
  transformerNotationHighlight,
} from "@shikijs/transformers";

const props = defineProps<{
  /** 相对 docs/vue/ui/examples/ 的路径（不含 .vue），如 button/types */
  path: string;
  title?: string;
  /** 说明：字符串或按段落拆分的数组；支持行内代码、加粗 */
  desc?: string | string[];
  /** 行高亮（VitePress 围栏风格）："2,4-6"；与源码内 // [!code hl] 标记可叠加 */
  lines?: string;
}>();

const escapeHtml = (text: string) =>
  text.replace(/[&<>"']/g, (ch) => `&#${ch.charCodeAt(0)};`);

/** 仅放行文档内写的行内代码与加粗，其余一律转义 */
function renderInline(text: string) {
  return text
    .split(/(`[^`]+`)/g)
    .map((part) => {
      if (part.length > 2 && part.startsWith("`") && part.endsWith("`")) {
        return `<code>${escapeHtml(part.slice(1, -1))}</code>`;
      }
      return escapeHtml(part).replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
    })
    .join("");
}

const descBlocks = computed(() => {
  const desc = props.desc;
  const blocks = Array.isArray(desc) ? desc : desc ? [desc] : [];
  return blocks.filter(Boolean).map(renderInline);
});

const loaders = import.meta.glob("../../docs/vue/ui/examples/**/*.vue");
const sources = import.meta.glob("../../docs/vue/ui/examples/**/*.vue", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

const key = computed(() => `../../docs/vue/ui/examples/${props.path}.vue`);
const demoTitleId = computed(
  () => `demo-${props.path.replace(/[^a-zA-Z0-9]+/g, "-").replace(/^-|-$/g, "")}`,
);
const demo = computed(() => {
  const loader = loaders[key.value];
  return loader ? defineAsyncComponent(loader as never) : null;
});
const source = computed(() => sources[key.value] ?? "");

const showCode = ref(false);
const copied = ref(false);
const codeHtml = shallowRef("");

// 首次展开时懒加载 shiki 高亮；未就绪前模板回退纯文本 pre
watch(showCode, async (on) => {
  if (!on || codeHtml.value) return;
  const { codeToHtml } = await import("shiki");
  codeHtml.value = await codeToHtml(source.value, {
    lang: "vue",
    themes: { light: "github-light", dark: "github-dark" },
    defaultColor: false,
    meta: props.lines ? { __raw: `{${props.lines}}` } : undefined,
    transformers: [
      transformerNotationHighlight(),
      transformerNotationFocus(),
      props.lines ? transformerMetaHighlight() : null,
      // 行结构块化：'\n' 文本节点拆成空 span.line，让 line--* 类背景撑满整行
      blockLinesTransformer,
    ].filter(Boolean) as never[],
  });
});

/** shiki 输出里每行是 <span class="line">，行间用 '\n' 文本节点分隔——行内 span 挂背景类只有文字宽度；
    这里把 '\n' 替换成 display:block 的空 span.line（连续换行 = 空行），满宽高亮且不产生双行距 */
const blockLinesTransformer = {
  name: "k-doc-block-lines",
  pre(tree: any) {
    const code = tree.children?.[0]?.children?.[0];
    if (!code) return tree;
    const next: any[] = [];
    for (const node of code.children ?? []) {
      if (node.type === "text" && node.value.includes("\n")) {
        const extra = (node.value.match(/\n/g) ?? []).length - 1;
        for (let i = 0; i < extra; i++) {
          next.push({
            type: "element",
            tag: "span",
            properties: { className: ["line"] },
            children: [{ type: "text", value: " " }],
          });
        }
      } else {
        next.push(node);
      }
    }
    code.children = next;
    return tree;
  },
};

async function copy() {
  try {
    await navigator.clipboard.writeText(source.value);
  } catch {
    const ta = document.createElement("textarea");
    ta.value = source.value;
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    document.execCommand("copy");
    ta.remove();
  }
  copied.value = true;
  setTimeout(() => (copied.value = false), 1500);
}
</script>

<template>
  <section class="k-doc-demo">
    <header v-if="title || desc" class="k-doc-demo__head">
      <h3 v-if="title" :id="demoTitleId" class="k-doc-demo__title">{{ title }}</h3>
      <div v-if="descBlocks.length" class="k-doc-demo__desc">
        <p v-for="(block, index) in descBlocks" :key="index" v-html="block"></p>
      </div>
    </header>
    <div class="k-doc-demo__preview">
      <component :is="demo" v-if="demo" />
      <p v-else class="k-doc-demo__missing">示例不存在：{{ path }}</p>
    </div>
    <footer class="k-doc-demo__bar">
      <button
        type="button"
        :class="['k-doc-demo__btn', showCode ? 'k-doc-demo__btn-active' : '']"
        @click="showCode = !showCode"
      >
        {{ showCode ? "收起代码" : "查看代码" }}
      </button>
      <button type="button" class="k-doc-demo__btn" @click="copy">
        {{ copied ? "已复制" : "复制代码" }}
      </button>
    </footer>
    <div
      v-if="showCode && codeHtml"
      class="k-doc-demo__code"
      v-html="codeHtml"
    ></div>
    <pre
      v-else-if="showCode"
      class="k-doc-demo__code"
    ><code>{{ source }}</code></pre>
  </section>
</template>

<style scoped>
.k-doc-demo {
  margin: 24px 0;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  overflow: hidden;
  /* clip 不建立滚动容器，页面级 sticky 表头可以贴住视口 */
  overflow: clip;
}
.k-doc-demo__head {
  padding: 16px 20px 0;
}
.k-doc-demo__title {
  margin: 0;
  font-size: 15px;
  font-weight: 600;
  line-height: 24px;
  letter-spacing: -0.02em;
  scroll-margin-top: 88px;
}
.k-doc-demo__desc {
  margin: 6px 0 0;
  font-size: 14px;
  line-height: 24px;
  color: var(--vp-c-text-2);
}
.k-doc-demo__desc p {
  margin: 0;
}
.k-doc-demo__desc p + p {
  margin-top: 4px;
}
.k-doc-demo__preview {
  padding: 24px 20px;
  border-bottom: 1px solid var(--vp-c-divider);
}
.k-doc-demo__missing {
  margin: 0;
  color: var(--vp-c-danger-1);
  font-size: 14px;
}
.k-doc-demo__bar {
  display: flex;
  gap: 8px;
  padding: 8px 12px;
  background: var(--vp-c-bg-soft);
}
.k-doc-demo__btn {
  border: 1px solid transparent;
  background: none;
  cursor: pointer;
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 13px;
  color: var(--vp-c-text-2);
  line-height: 20px;
}
.k-doc-demo__btn:hover,
.k-doc-demo__btn-active {
  color: var(--vp-c-brand-1);
  border-color: var(--vp-c-divider);
  background: var(--vp-c-bg);
}
.k-doc-demo__code {
  margin: 0;
  border-radius: 0;
  border-top: 1px solid var(--vp-c-divider);
  padding: 16px 20px;
  overflow: auto;
  font-size: 14px;
  line-height: normal;
  background: #fff;
}
</style>

<style>
/* shiki 双主题（defaultColor:false 输出 --shiki-light/dark 变量，按站点 .dark 切换） */
.dark .k-doc-demo__code {
  background: var(--vp-code-block-bg);
}
.k-doc-demo__code pre.shiki {
  margin: 0;
  padding: 0;
  background: transparent;
  font-family: var(--vp-font-family-mono);
  font-size: 14px;
  line-height: normal;
}
/* 行结构块化（见 blockLinesTransformer）：line--* 类背景撑满整行 */
.k-doc-demo__code pre.shiki span.line {
  display: block;
}
.k-doc-demo__code .highlighted {
  background: var(--vp-c-yellow-soft, rgba(234, 179, 8, 0.14));
}
.k-doc-demo__code .has-focused span.line {
  opacity: 0.56;
}
.k-doc-demo__code .focused {
  opacity: 1;
  background: var(--vp-c-bg-soft-up, rgba(128, 128, 128, 0.14));
}
.k-doc-demo__code .shiki span {
  color: var(--shiki-light);
}
.dark .k-doc-demo__code .shiki span {
  color: var(--shiki-dark);
}
</style>
