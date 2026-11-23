# KConfigProvider 全局配置

> 共同约定见 [共同约定](./index.md)。运行时「作用域主题 + 全局配置」载体件——**非库启动必需项**：不装它，`import 'kit/vue/ui/css/index.css'` 一切照常。

## 何时使用

- 运行时换肤：主题数据来自接口/用户配置，需要把 seed 差量落到 DOM；
- 局部暗色 / 局部品牌色（子树独立，页级亮暗不受影响）；
- 组件级部件变量覆盖（`components.KButton.radius` 这类，不写 CSS 的声明式通道）。

## 代码演示

<Demo path="config-provider/theme" title="作用域主题" desc="只写 seed（主色 + 圆角），色板/状态/派生全由 CSS 表达式图自动铺——一变百变的声明式入口。" />

<Demo path="config-provider/scheme" title="子树独立暗色" :desc="['`scheme=dark` + `scoped`：wrapper 落 data-k-theme，子树内 light-dark() 就近解析成暗色，页面其它区域不受影响。', '站点导航的亮暗开关是同一机制的全局用法。']" />

<Demo path="config-provider/components-token" title="组件级变量" desc="`components.KButton` 的键 = 部件变量去掉 `--k-button-` 前缀，数字自动加 px（lineHeight/zIndex 等无量纲键除外）。" />

<Demo path="config-provider/live-seed" title="响应式换肤" desc="theme 传 computed：改 seed → Provider 只重算差量 `<style>` 内容，不重建 DOM。导航栏取色器就是这条链路的站点级演示。" />

<Demo path="config-provider/breakpoints" title="自定义断点" :desc="['`theme.breakpoints` 同时下发 JS 断点判定与 `--k-screen-*` 变量。', '示例把整组档位抬高（md=1600），子树内 `useBreakpoint()` 与响应式 size 立即按新档位判定，下方为默认断点对照。', '请保持 xs < sm < md < lg < xl < xxl 单调递增。']" />

<Demo path="config-provider/wave-toggle" title="波纹全局开关" :desc="['`:wave=&quot;{ disabled: true }&quot;`（antd ConfigProvider.wave 同款形态）关闭子树内所有点击波纹。', '实例级 `KButton wave` prop 优先级更高，可单独强制开/关。']" />

<Demo path="config-provider/popup-container" title="弹层容器" :desc="['`popupContainer` 指向滚动容器：Select / Tooltip 弹层以 absolute 进入容器文档流，随内容滚动并被 `overflow` 裁切。', '缺省 body 时弹层是 fixed + 全局 scroll 跟随；容器为 static 时组件会自动补 `relative`。']" />

## API

### Props

| 属性 | 说明 |
| --- | --- |
| theme | 类型 `ThemeConfig \| ThemeResult`，默认 `—`。<br>主题配置，可传 computed 响应式对象。 |
| scheme | 类型 `'auto' \| 'light' \| 'dark'`，默认 `'auto'`。<br>亮暗指令，作用于当前作用域。 |
| scoped | 类型 `boolean`，默认 `false`。<br>仅子树生效；`false` 为全局。 |
| popupContainer | 类型 `HTMLElement \| (() => HTMLElement)`，默认 `—`。<br>弹层默认容器，缺省为 body。 |
| defaults | 类型 `Record<string, Record<string, unknown>>`，默认 `—`。<br>组件轴默认值。 |
| wave | 类型 `{ disabled?: boolean }`，默认 `—`。<br>波纹全局开关。 |
| theme.breakpoints | 类型 `Partial<Record<'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| 'xxl', number>>`，默认 `—`。<br>自定义断点，需整组递增。 |
| theme.locale | 类型 `—`，默认 `—`。<br>国际化预留，未实现。 |

### Props 说明

- **theme**：`ThemeConfig` 就地调用 `createTheme`，`ThemeResult` 直接复用已有实例。<br>传 computed 时，seed 变化只重算差量 `<style>`，不重建 DOM。
- **scheme**：`auto` 不写属性，跟随系统/外层并尊重宿主已有的强制态。<br>`light` / `dark` 在 `scoped` 下落 wrapper 的 `data-k-theme`，全局模式落 `<html>`。
- **scoped**：`true` 渲染 wrapper + 作用域类，主题变量只在子树生效；<br>`false` 变量写 `:root`，显式 light/dark 落 `<html>`。
- **popupContainer**：Select / Tooltip / Popover / Popconfirm 的默认出口。<br>缺省 body：`fixed` + 全局 scroll 跟随；<br>指定元素：`absolute` 进容器文档流，随内容滚动并被 overflow 裁切；<br>static 容器自动补 `relative`（antd getPopupContainer 同款）。
- **defaults**：当前 KButton.wave 直接消费；其它键由组件通过 `useProps(组件名, prop, () => props.x)` 接入。<br>合并链：prop > 最近 Provider > 上层 > token。
- **wave**：`disabled: true` 时子树内波纹组件停发；<br>嵌套 Provider 子覆盖父，实例级 `wave` prop 优先。
- **theme.breakpoints**：同时影响 `useBreakpoint()`、响应式 prop 与 `--k-screen-*` 变量；<br>`md` 还决定 `platform.mobile` 块的媒体上限；嵌套按档合并。

### Slots

| 插槽名 | 说明 |
| --- | --- |
| default | 受配置/主题作用的内容子树 |

无事件。

### 组合式 API（组件/业务侧消费面）

```ts
import { useKConfig, useProps } from 'kit/vue/ui'

const cfg = useKConfig()      // 无 Provider 时为全局缺省单例，永远可用
cfg.scopeClass                // 弹层/portal 必须绑定（Teleport 脱离 DOM 树后的主题续链）
cfg.defaults                  // 轴默认值（合并链：prop > 最近 Provider > 上层 > token 初始值）
cfg.breakpoints               // 当前作用域断点差量（与上层按档合并）
```

## 工作原理（简）

1. `theme` 经 `createTheme` 编成**只含差量**的声明（未声明的变量靠级联继承，嵌套 Provider 天然合成、子覆父就近赢）；
2. 作用域 = **内容 hash 的稳定 class**（`k-scope-xxx`，SSR/CSR 一致），差量经 Teleport 注入 `<head>` 的 `<style>`——**绝不用行内 style 变量**（行内断链 Teleport 弹层，naive-ui 的已知翻车点）；
   - 注入选择器为 `.k-config-provider.k-scope-xxx`，且 theme.css 图块并列声明在 `.k-config-provider` 上，容器自身重算整图（见主题 Token 规格 §10.3 修订，2026-11-17）；
3. `cssText()` 键名字典序稳定排序：SSR 快照可比对、diff 可读。

## 注意事项

- 全局模式（`scoped=false`）：显式 `light/dark` 把属性写到 `<html>`；
  - `auto` 不改写宿主已有属性（只回收本 Provider 自己写上的那次）——多 Provider 同时全局属于业务自己的仲裁，库不禁止但文档不推荐；
- 弹层类组件（P3+）有硬契约：portal 根必须绑 `cfg.scopeClass` 并按 `cfg.popupContainer` 选定出口，「局部暗色区内的弹层跟随暗色」是验收用例。
- 与 [KApp](./app.md) 组合时推荐 `KApp` 放在 Provider 内层：主题变量由 Provider 承担，文字基线与实例上下文由 KApp 承担；演示见 [app.md「与 KConfigProvider 组合」](./app.md)。
- **自定义断点的作用范围**：JS 断点判定（`useBreakpoint` / `useResponsiveValue`，覆盖 Button/Space/Form/Sider/Row gutter/DateRangePicker 的移动端行为）、`--k-screen-*` 变量、`platform.mobile` 生成块；
  - 组件样式内的静态 `@media`（如 `max-width: 767px`）仍是设计基线值，不随 Provider 运行时改变；需要整体改版式请同步覆盖对应 CSS。
- 断点请传**单调递增**的整组档位；
  - 只改单档时至少要保证它落在相邻两档之间，否则 `useBreakpoint` 会按「从高到低第一个满足 min-width」的规则返回较低档。

---

## 规格附录（决策登记，面向贡献者）

- 职责封闭清单 = ①主题注入 ②自定义断点 ③亮暗指令 ④非视觉全局配置；新增职责先进清单再实现；
- 自定义断点实现（2026-11-19）：`theme.breakpoints` →
  - ① `createTheme` 输出 `--k-screen-*` 差量并让 `platform.mobile` 媒体块跟随 `md`；
  - ② Provider 注入 `breakpoints`，嵌套按档合并；
  - ③ `useBreakpoint` 按断点组合缓存 MQL（同一子树共用一套），`useResponsiveValue` 改为从最近 Provider 取档；
- 明确不做：Provider 内计算 CSS 变量（级联自己算）、主题持久化（业务职责）、第二套主题模型、深合并（浅合并 + 编译期 `extend`）、CSS-in-JS 运行时；
- 实现与 v0.1 规格的两处偏离（以本文为准）：
  - `scoped` 缺省改为 `false`（全局更符合「应用根挂一个」的主场景）；
  - `config`/`getPopupContainer` 更名 `defaults`/`popupContainer`（与 K 前缀 prop 风格统一）；
- **亮暗链两条硬规则（2026-11-17 按压变压暗事故复盘）**：
  - ① `color-scheme: light dark` 缺省只在 `:root`，scoped 容器绝不重抄（`light dark` 的 used 值跟系统不跟祖先，会把强暗子树拉回亮档）；
  - ② 全局 Provider 的 `scheme=auto` 不得 `removeAttribute('data-k-theme')`（那可能是宿主站点开关的强制态），只回收自己写上的那次；
- 设计器是 playground 页面，消费本件而不是内嵌逻辑。
