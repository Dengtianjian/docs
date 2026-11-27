# 胶囊导航（KTabBarCapsule）

> 组件类型：二次封装（Composed） · `KTabBarCapsule = 悬浮胶囊 + 左侧入口`。`KTabBar` 负责标签与选中态，组件负责胶囊布局与左侧 accessory 插槽。

## 预览

<Demo
  path="templates/composed/tabbar-capsule"
  title="胶囊导航 + AI 入口"
  :desc="['左侧 `#accessory` 插槽放头像 / AI 入口，右侧为悬浮胶囊。', '支付宝式做法：首页用 `activeIcon` 换成图片并隐藏文案（`activeHide: label`）。', '切换直接换图、无过渡动画；其它项选中只变主题色，文案保留。']"
/>

## 组成

| 组成 | 职责 |
| --- | --- |
| `KTabBar` | 标签数据、选中态、子菜单、动效（`mode=floating` 渲染胶囊） |
| `KTabBarCapsule` | 外层留边布局、左侧 accessory 插槽、固定定位与安全区 |

`KTabBarCapsule` 已由 kit 导出（`kit/vue/ui`）。组件自身的 Props 只在这里维护，`KTabBar` 的项级能力（`activeIcon` / `activeTitle` / `activeHide` / `render` / `bounce` 等）仍按 TabBar 文档使用。

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| items | 标签项，同 `KTabBarItem` | `KTabBarItem[]` | `[]` |
| v-model:active | 当前 key | `string` | — |
| fixed | 固定在视口底部（外层容器定位） | `boolean` | `false` |
| safeArea | 底部安全区 | `boolean` | `false` |
| menuVariant | 子菜单形态，透传 `KTabBar` | `'full' \| 'bubble'` | `'full'` |

### Events

| 事件 | 说明 | 参数 |
| --- | --- | --- |
| change | 切换标签 | `key, item` |
| child-click | 点击子菜单项 | `key, child, item` |
| accessory-click | 点击左侧 accessory | `MouseEvent` |

### Slots

| 插槽名 | 说明 |
| --- | --- |
| accessory | 胶囊左侧内容（头像 / AI 入口等） |

## 注意事项

- 胶囊外观来自 `KTabBar` 的 `mode=floating`（留边、四边框、全圆、投影）；本组件只负责外层布局，不再重复定义胶囊样式。
- 左侧入口需要与胶囊底部对齐时，给 `#accessory` 内容自定尺寸即可，组件用 `align-items: flex-end` 排列。