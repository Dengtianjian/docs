# 路由页签

> 组件类型：二次封装（Composed） · `KRouterTabs = KTabs + vue-router`。页签 key 直接使用路由 name，激活项跟随路由（含前进后退），点击页签执行导航。

## 预览

<Demo
  path="templates/composed/router-tabs"
  title="页签跟随路由"
  :desc="['激活项由当前路由决定；点击页签默认 `router.push({ name: key })`。', '子路由通过 `match` 归到父页签；进入没有页签的临时页时，高亮保持在上一个页签。', '示例用内存路由模拟；实际项目直接用应用的 router，内容通常放在外层 `<router-view>`。']"
/>

## 二次封装

| 组成 | 职责 |
| --- | --- |
| `KTabs` | 外观、滚动、键盘导航、面板与插槽 |
| `vue-router` | 路由是唯一数据源：`route.matched` 决定激活项，点击触发跳转 |

`KRouterTabs` 已由 kit 导出（`kit/vue/ui`），不需要复制内部实现；本页演示的是接入方式。

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| items | 页签数据；`name` / `key` 对应路由 name | `KRouterTabItem[]` | — |
| routerMode | 点击页签的跳转方式 | `'push' \| 'replace'` | `'push'` |

`KRouterTabItem` = `KTabsItem` + 两个路由字段：

| 字段 | 说明 |
| --- | --- |
| `match` | 额外归到该页签的路由名（数组），或 `(route) => boolean`；用于详情页等子路由 |
| `to` | 覆盖点击目标；缺省 `{ name: key }` |

其余 `KTabs` 属性（`type` / `placement` / `size` / `align` / `centered` / `stretch` / `addable` / `scrollButtons` / `animated` / `classNames` / `styles`）原样透传。

### Events

| 事件 | 说明 | 参数 |
| --- | --- | --- |
| update:active | 路由真正切换后同步激活项 | `key: string \| number` |
| change | 同上 | `key: string \| number` |

首次挂载的同步不触发；点击后若导航被守卫拦下或失败，页签保持不动，也不会触发事件。

### Slots

`label` / `content` / `prefix` / `suffix` / `leftExtra` / `rightExtra` / `extra` 原样转发给 `KTabs`；用法见 [KTabs](../../components/tabs.md)。

## 注意

- 路由是唯一数据源：不接受 `v-model:active`，页签 key 必须能对上路由 name（或通过 `match` 归属）。
- 组件在挂载时读取当前路由并直接初始化激活项；应用应在 `router.isReady()` 后再挂载（或先完成初始导航），避免首帧先落到第一个页签。
- 从 `route.matched` 最内层向外匹配，子路由会归到父页签；未命中任何页签的临时路由保持上一个激活项。
- 点击已在当前路由上的页签不会重复导航；`to` 可把页签指向别的路由（例如带参数的默认子路由）。
- 依赖应用已安装 vue-router；`items` 变化会重新解析当前路由。