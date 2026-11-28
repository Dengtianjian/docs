<script setup lang="ts">
import { computed } from 'vue'
import themeCss from 'kit/vue/ui/css/theme.css?raw'
import atomsCss from 'kit/vue/ui/css/atoms.css?raw'
import { classMeta, displayDefault, tokenMeta, type Meta } from './tokenMeta'

type Row = {
  kind: 'token' | 'class' | 'multi' | 'subtoken' | 'plain'
  tokens: string[]
  raw: string
  cls: string
  jsList: string[]
  meta: Meta
}

type Group = {
  title: string
  rows: Row[]
}

const ACRONYMS = new Set(['xs', 'sm', 'md', 'lg', 'xl', 'xxs', 'xxl'])

/** 与 create-theme.ts 的 kebab() 互逆：size-md → sizeMD */
function camel(parts: string[]) {
  return parts
    .map((part, index) => {
      if (/^\d+$/.test(part)) return part
      if (ACRONYMS.has(part)) return part.toUpperCase()
      return index === 0 ? part : part[0].toUpperCase() + part.slice(1)
    })
    .join('')
}

function jsName(token: string): string {
  if (token.startsWith('--k-scrollbar-')) return ''
  const parts = token.slice('--k-'.length).split('-')
  if (parts[0] === 'seed') return `seed.${camel(parts.slice(1))}`
  return camel(parts)
}

function displayTitle(raw: string) {
  const plain = raw.replace(/（[^）]*）/g, '').replace(/\s+/g, ' ').trim()
  if (plain.startsWith('Seed')) return 'Seed'
  if (plain.startsWith('Base')) return 'Base · 模式基线'
  if (plain.startsWith('Map')) return 'Map · 语义色'
  if (plain.includes('透明通道')) return 'Alias · 文本 / 填充 / 遮罩'
  if (plain.includes('Tinted Neutral')) return 'Alias · 灰阶 / 中性色'
  if (plain.includes('背景 / 边框')) return 'Alias · 背景 / 边框 / 阴影 / 光晕'
  if (plain.includes('字体')) return 'Alias · 字体'
  if (plain.includes('圆角')) return 'Alias · 圆角 / 间距 / 控件高'
  if (plain.includes('动效')) return 'Alias · 动效 / zIndex / 图标 / 断点'
  return plain
}

/* ---------------- 原子类：按 atoms.css 分组解析 ---------------- */
type AtomClass = { cls: string; tokens: string[]; section: string }

function parseAtoms(css: string): AtomClass[] {
  const parts = css.split(/\/\* -{5,}\s*([\s\S]*?)\s*\*\//)
  const out: AtomClass[] = []
  for (let i = 1; i < parts.length; i += 2) {
    const section = parts[i].replace(/^-+|-+$/g, '').replace(/\s+/g, ' ').trim().split('：')[0]
    for (const match of parts[i + 1].matchAll(/\.(k-[a-z0-9-]+)\s*\{([^}]*)\}/g)) {
      const body = match[2]
      const declared = [...body.matchAll(/(--k-[a-z0-9-]+)\s*:/g)].map(m => m[1])
      const refs = [...body.matchAll(/var\(\s*(--k-[a-z0-9-]+)/g)].map(m => m[1])
      out.push({ cls: match[1], tokens: [...new Set(declared.length ? declared : refs)], section })
    }
  }
  return out
}

const atomClasses = parseAtoms(atomsCss)

/** 一个原子类对应多个 token 时才单独摊一行（如 k-border） */
const multiClasses = new Map(atomClasses.filter(item => item.tokens.length > 1).map(item => [item.cls, item.tokens]))

const tokenClasses = new Map<string, string[]>()
for (const item of atomClasses) {
  for (const token of item.tokens) {
    const list = tokenClasses.get(token) ?? []
    list.push(item.cls)
    tokenClasses.set(token, list)
  }
}

/* ---------------- 行构造 ---------------- */
function tokenRow(token: string, raw: string, cls = ''): Row {
  return { kind: 'token', tokens: [token], raw, cls, jsList: [jsName(token)].filter(Boolean), meta: tokenMeta(token) }
}

function childRow(token: string, raw: string, cls: string): Row {
  return { kind: 'class', tokens: [token], raw, cls, jsList: [jsName(token)].filter(Boolean), meta: classMeta(cls) }
}

const rawByToken = new Map<string, string>()
for (const match of themeCss.matchAll(/(--k-[a-z0-9-]+)\s*:\s*([^;]+);/g)) {
  if (!rawByToken.has(match[1])) rawByToken.set(match[1], match[2].replace(/\s+/g, ' ').trim())
}
for (const match of atomsCss.matchAll(/(--k-scrollbar-[a-z0-9-]+)\s*:\s*([^;]+);/g)) {
  if (!rawByToken.has(match[1])) rawByToken.set(match[1], match[2].replace(/\s+/g, ' ').trim())
}

/** 一个原子类对应多个 token：类做父行，token 逐个摊成子行 */
function multiRows(cls: string): Row[] {
  const tokens = multiClasses.get(cls) ?? []
  const parent: Row = { kind: 'multi', tokens: [], raw: '', cls, jsList: [], meta: classMeta(cls) }
  const children: Row[] = tokens.map(token => ({
    kind: 'subtoken',
    tokens: [token],
    raw: rawByToken.get(token) ?? '',
    cls: '',
    jsList: [jsName(token)].filter(Boolean),
    meta: tokenMeta(token),
  }))
  return [parent, ...children]
}

/** 一个 token 只有一对多（多个原子类）时才拆子行，一对一直接并排 */
function rowsForToken(token: string, raw: string): Row[] {
  const consumers = (tokenClasses.get(token) ?? []).filter(cls => !multiClasses.has(cls))
  if (consumers.length >= 2) {
    return [tokenRow(token, raw), ...consumers.map(cls => childRow(token, raw, cls))]
  }
  return [tokenRow(token, raw, consumers[0] ?? '')]
}

const seenTokens = new Set<string>()
const addedMulti = new Set<string>()

function buildRows(tokens: string[], groupTokens: Set<string>): Row[] {
  const attached = [...multiClasses.keys()].filter(cls => {
    if (addedMulti.has(cls)) return false
    return multiClasses.get(cls)!.some(token => groupTokens.has(token))
  })

  const rows: Row[] = []
  for (const token of tokens) {
    const consumers = tokenClasses.get(token) ?? []
    // 只被多 token 类消费时，token 直接挂到该类子行下，不再重复父行
    if (consumers.length && consumers.every(cls => multiClasses.has(cls))) continue
    rows.push(...rowsForToken(token, rawByToken.get(token) ?? ''))
  }
  for (const cls of attached) {
    addedMulti.add(cls)
    rows.push(...multiRows(cls))
  }
  return rows
}

function parseTheme(css: string): Group[] {
  const parts = css.split(/\/\* ={10,}\s*([\s\S]*?)\s*\*\//)
  const groups: Group[] = []
  for (let i = 1; i < parts.length; i += 2) {
    const tokens: string[] = []
    for (const match of parts[i + 1].matchAll(/(--k-[a-z0-9-]+)\s*:\s*[^;]+;/g)) {
      const token = match[1]
      if (seenTokens.has(token)) continue
      seenTokens.add(token)
      tokens.push(token)
    }
    if (!tokens.length) continue
    const rows = buildRows(tokens, new Set(tokens))
    if (rows.length) groups.push({ title: displayTitle(parts[i]), rows })
  }
  return groups
}

const themeGroups = parseTheme(themeCss)

function localGroup(): Group {
  const tokens = [...new Set(atomClasses.flatMap(item => item.tokens.filter(t => t.startsWith('--k-scrollbar-'))))]
  return { title: '滚动条局部变量', rows: buildRows(tokens, new Set(tokens)) }
}

const sections = new Map<string, Group>(themeGroups.map(group => [group.title, group]))
const local = localGroup()
sections.set(local.title, local)

/* ---------------- 无 token 的原子类：并入能对上的分类，否则自建 ---------------- */
const extraGroups = new Map<string, Group>()

function targetSection(section: string) {
  if (section === '布局') return '布局'
  if (section === '文本') return 'Alias · 字体'
  if (section === '滚动条') return '滚动条局部变量'
  if (section.startsWith('间距')) return 'Alias · 圆角 / 间距 / 控件高'
  return section
}

for (const item of atomClasses) {
  if (item.tokens.length) continue
  const title = targetSection(item.section)
  const row: Row = { kind: 'plain', tokens: [], raw: '', cls: item.cls, jsList: [], meta: classMeta(item.cls) }
  const target = sections.get(title)
  if (target) {
    target.rows.push(row)
    continue
  }
  const extra = extraGroups.get(title) ?? { title, rows: [] }
  extra.rows.push(row)
  extraGroups.set(title, extra)
}
for (const group of extraGroups.values()) sections.set(group.title, group)

const props = defineProps<{ section: string }>()

const group = computed(() => sections.get(props.section))

const defaultValue = (row: Row) => (row.tokens.length === 1 ? displayDefault(row.tokens[0], row.raw) : '')

const isColor = (row: Row) => row.kind === 'token' && row.meta.accepts.startsWith('颜色值') && !row.tokens[0].startsWith('--k-scrollbar-')

function exampleKind(example: string) {
  if (example.startsWith('class=')) return '类名'
  if (example.startsWith('.k-scrollbar')) return 'CSS 变量'
  if (/^(seed|alias|breakpoints|neutralTint)\b/.test(example)) return 'JS 配置'
  return 'CSS'
}

/** 让 camelCase 在词边界换行，避免从单词中间断开 */
const jsHtml = (js: string) => js.replace(/\./g, '.<wbr>').replace(/([a-z0-9])([A-Z])/g, '$1<wbr>$2')
</script>

<template>
  <div class="token-table">
    <p v-if="!group" class="missing">未找到「{{ section }}」分组</p>

    <table v-else>
      <colgroup>
        <col class="col-meta" />
        <col class="col-token" />
        <col class="col-cls" />
        <col class="col-js" />
        <col class="col-default" />
        <col class="col-accepts" />
        <col class="col-example" />
      </colgroup>
      <thead>
        <tr>
          <th>名称 / 描述</th>
          <th>CSS token</th>
          <th>原子类</th>
          <th>JS 键名</th>
          <th>默认值</th>
          <th>接收值</th>
          <th>示例</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, index) in group.rows" :key="index" :class="row.kind">
          <td>
            <strong class="name">{{ row.meta.name }}</strong>
            <p class="desc">{{ row.meta.desc }}</p>
          </td>
          <td>
            <template v-if="row.tokens.length === 1">
              <code class="wrap">{{ row.tokens[0] }}</code>
            </template>
            <div v-else-if="row.tokens.length" class="chips">
              <code v-for="token in row.tokens" :key="token">{{ token }}</code>
            </div>
          </td>
          <td>
            <code v-if="row.cls" class="cls">{{ row.cls }}</code>
          </td>
          <td>
            <template v-if="row.jsList.length === 1">
              <code class="wrap" v-html="jsHtml(row.jsList[0])"></code>
            </template>
            <div v-else-if="row.jsList.length" class="chips">
              <code v-for="js in row.jsList" :key="js" v-html="jsHtml(js)"></code>
            </div>
          </td>
          <td>
            <template v-if="row.tokens.length === 1">
              <div class="default-cell">
                <span
                  v-if="isColor(row)"
                  class="swatch"
                  :style="{ background: `var(${row.tokens[0]})` }"
                  :title="defaultValue(row)"
                />
                <code class="value">{{ defaultValue(row) }}</code>
              </div>
            </template>
          </td>
          <td class="accepts">{{ row.meta.accepts }}</td>
          <td>
            <template v-if="row.meta.example">
              <span class="ex-tag">{{ exampleKind(row.meta.example) }}</span>
              <code class="example">{{ row.meta.example }}</code>
            </template>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.token-table {
  margin: 16px 0 24px;
  overflow-x: auto;
}

table {
  display: table;
  width: 100%;
  min-width: 960px;
  table-layout: fixed;
}

.col-meta {
  width: 19%;
}

.col-token {
  width: 16%;
}

.col-cls {
  width: 9%;
}

.col-js {
  width: 13%;
}

.col-default {
  width: 18%;
}

.col-accepts {
  width: 7%;
}

.col-example {
  width: 18%;
}

.token-table :deep(th),
.token-table :deep(td) {
  padding: 8px 10px;
}

td {
  vertical-align: top;
}

tr.class > td:first-child,
tr.subtoken > td:first-child {
  padding-left: 32px;
  position: relative;
}

tr.class > td:first-child::before,
tr.subtoken > td:first-child::before {
  content: '└';
  position: absolute;
  left: 14px;
  top: 10px;
  color: var(--vp-c-text-3);
}

code {
  font-size: 12px;
}

.chips {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
}

.wrap {
  overflow-wrap: anywhere;
}

.default-cell {
  display: flex;
  align-items: flex-start;
  gap: 6px;
}

.value {
  overflow-wrap: anywhere;
  white-space: normal;
}

.name {
  display: block;
  font-size: 13px;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

tr.class .name,
tr.subtoken .name {
  font-weight: 500;
}

.desc {
  margin: 2px 0 0;
  font-size: 12px;
  line-height: 1.5;
  color: var(--vp-c-text-2);
}

.cls {
  white-space: normal;
  overflow-wrap: anywhere;
}

.accepts {
  font-size: 12px;
  line-height: 1.5;
  color: var(--vp-c-text-2);
}

.ex-tag {
  display: inline-block;
  margin-bottom: 3px;
  padding: 0 5px;
  border-radius: 4px;
  font-size: 11px;
  line-height: 16px;
  color: var(--vp-c-text-2);
  background: var(--vp-c-default-soft);
}

.example {
  display: block;
  white-space: pre-wrap;
  word-break: break-word;
}

.swatch {
  flex: none;
  width: 12px;
  height: 12px;
  margin-top: 3px;
  border-radius: 3px;
  box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.12);
}

.missing {
  color: var(--vp-c-text-3);
}
</style>