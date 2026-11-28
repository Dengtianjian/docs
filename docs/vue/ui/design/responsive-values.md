# 响应式取值

> 部分布局类 prop 支持「常量 / 断点对象 / 字符串语法糖」三态；解析后按当前视口取定值。定位：**少量 JS 例外**，只服务必须由 JS 读值的行为/布局逻辑，纯视觉仍优先 CSS 断点与 token。

## 用法

```vue
<!-- 常量 -->
<KFlex gap="sm" />

<!-- 对象（推荐，类型完整） -->
<KFlex :gap="{ xs: 8, md: 'sm', lg: 'lg' }" />
<KLayoutSider :width="{ xs: 140, sm: 180, md: 208 }" />

<!-- 字符串语法糖（空白分隔键值对） -->
<KFlex gap="xs:8 md:sm lg:lg" />
<KGrid columns="xs:1 sm:2 md:3" />
<KLayoutSider width="xs:140 sm:180 md:208" />
```

- 键：`xs / sm / md / lg / xl / xxl`（与 theme.css 断点同源：0/576/768/992/1200/1600）。
- 值：组件自身的 prop 值类型；数值型组件（gap、columns、Sider width）会把字符串里的 `8` 转成数字。
- Grid 二元组字符串用逗号：`"xs:8,16 md:16,24"`（水平, 垂直）。
- 缺档规则：**mobile-first**，当前档缺值 → 向低档回退；低档全缺 → `undefined`，由组件缺省值接管。
- SSR：无 `matchMedia` 时按保守档 `md` 首帧解析，挂载后由真实视口校正（视觉仍走 CSS 断点，不闪列宽）。

## 当前接入

| 组件 | prop | 说明 |
| --- | --- | --- |
| KGrid | columns / gap / span / start | 数字 / 断点对象 / 字符串 |
| KFlex | gap | token 名 / 数字 / 二元组 / 断点对象 / 字符串 |
| KLayoutSider | width | px 数字 / 断点对象 / 字符串 |
| KButton / KButtonGroup | size | xs/sm/md/lg 四档，组内下发同可响应式 |
| KForm | layout / labelWidth / labelAlign / colon | 全部非数据属性支持断点对象 / 字符串；`model` / `rules` 除外 |

## 约定

- **只收常量**：断点映射里不传函数、不传 ref；动态值请在父层 `computed` 解出后传常量。
- **共享断点**：全库只有一套 `matchMedia` 监听（`getSharedBreakpoint()`），不随组件实例增长；断点变化才触发响应式更新，不对 resize 逐帧计算。
- **常量零依赖**：未使用响应式取值时，`useResponsiveValue` 直接返回值，不建立断点依赖。
- 需要自定义断点：`useBreakpoint(overrides)` 仍保留实例级用法；响应式取值目前统一走默认断点。
- 视觉优先：间距/宽度等纯视觉值若能用 CSS 断点或容器查询表达，优先 CSS；本机制只覆盖必须由 JS 读取的 prop。

## Composable

```ts
import { useResponsiveValue } from 'kit/vue/ui'

const gap = useResponsiveValue<number>(
  () => props.gap,
  { coerce: raw => Number(raw) },
) // ComputedRef<number | undefined>
```

辅助函数：`parseResponsiveString`（字符串 → 映射）、`resolveResponsiveValue`（同步解析）、`isResponsiveString` / `isResponsiveMap`。均从入口导出，可用于业务自研组件。
