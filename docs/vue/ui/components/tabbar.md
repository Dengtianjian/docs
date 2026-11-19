# KTabBar 底部标签栏

> 共同约定见 [共同约定](./index.md)。P4 导航批。移动端底部导航：图标、文案、角标与受控选中。

## 何时使用

- App 一级页面切换；
- 需要角标提示未读/待办。

## 代码演示

<Demo path="tabbar/basic" title="图标 / 角标 / 受控 / 键盘" :desc="['`items` 提供 `key/title/icon/badge/disabled`。', '`v-model:active` 受控选中；`change` 返回 key 与原 item。', '底部固定为默认行为；演示用 `:fixed=&quot;false&quot;` 嵌入手机框。']" />

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| items | 标签项 | `KTabBarItem[]` | `[]` |
| v-model:active | 当前 key | `string` | 第一个可用项 |
| fixed | 固定在视口底部 | `boolean` | `true` |
| safeArea | 底部安全区（`env(safe-area-inset-bottom)`） | `boolean` | `true` |
| classNames | 部件类名（`root / item / itemActive / icon / label / badge`） | `Partial<Record<Part, string>>` | — |
| styles | 部件内联样式（同上） | `Partial<Record<Part, CSSProperties>>` | — |

<CommonProps />

### KTabBarItem

| 字段 | 说明 | 类型 |
| --- | --- | --- |
| key | 唯一标识 | `string` |
| title | 文案 / VNode | `VNodeChild` |
| icon | 图标组件 | `Component` |
| badge | `true` = 红点；其余按文本显示 | `string \| number \| boolean` |
| disabled | 禁用 | `boolean` |

### Events

| 事件 | 说明 | 参数 |
| --- | --- | --- |
| change | 切换标签 | `key: string, item: KTabBarItem` |
| update:active | 受控模型更新 | `key: string` |

### Slots

| 插槽名 | 说明 |
| --- | --- |
| item | 单项作用域插槽，scope `{ item, index, active }` |

## 注意事项

- 键盘 ←/→ 循环切换并跳过禁用项，Home/End 跳首尾；选中项 `tabindex=0`，其余 -1。
- `fixed` 默认贴视口底部；嵌入局部容器时传 `:fixed="false"`。
- `safeArea` 使用 `env(safe-area-inset-bottom)`，桌面环境为 0。
- 当前只做导航选中，不内建页面内容切换；`role="tablist"` + `role="tab"` 供读屏识别。