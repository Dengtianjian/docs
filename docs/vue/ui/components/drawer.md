# KDrawer 抽屉

> 共同约定见 [共同约定](./index.md)。P4 导航批。四方向抽屉：声明式组件 + `useKApp().drawer` 实例 API。

## 何时使用

- 不改当前上下文的表单/详情编辑；
- 列表 → 详情 → 编辑等多级任务，不希望离开当前上下文；
- 侧边导航、筛选面板、临时任务；
- 需要从顶部/底部展开的面板。

## 代码演示

<Demo path="drawer/basic" title="四方向 / 三档尺寸 / 页脚插槽" :desc="['`placement` 支持 left / right / top / bottom。', '`size` 三档：sm 320 / md 378 / lg 480；`width` / `height` 可覆盖。', '遮罩、X、Esc 均可关闭；页脚按钮由业务通过 `#footer` 自绘。']" />

<Demo path="drawer/nested" title="多级抽屉（3 层）" :desc="['每一层都是独立 KDrawer：父层保持打开，子层从右侧叠加，遮罩逐层加深。', 'Esc / 点击遮罩只关闭最上层；关闭父层会连带收起子层（示例通过 `after-close` 串联）。', 'body 滚动锁按引用计数管理，全部关闭后才恢复页面滚动。']" />

<Demo path="drawer/overlay-layers" title="抽屉里的下拉控件" :desc="['抽屉内直接放 Select、DatePicker、Dropdown、Tooltip、Popconfirm 等控件。', '这些控件的弹层统一 Teleport 到 body，层级高于抽屉，展开后不会被抽屉裁切。', '控件弹层打开时按 Esc 只关闭弹层，抽屉保持打开。']" />

<Demo path="drawer/instance" title="实例 API" :desc="['`useKApp().drawer.open()` 创建，返回 `{ destroy }`。', '`onClose` 在关闭动作时触发，`afterClose` 在退场动画结束后触发。', '`destroyAll()` 清空队列。']" />

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| v-model:open | 受控开合 | `boolean` | `false` |
| title | 标题；也可用 `#title` | `string \| VNodeChild` | — |
| content | 正文；默认插槽优先 | `string \| VNodeChild` | — |
| footer | 页脚；`#footer` 优先 | `string \| VNodeChild` | — |
| placement | 弹出方向 | `'left' \| 'right' \| 'top' \| 'bottom'` | `'right'` |
| size | 尺寸（左右为宽，上下为高） | `'sm' \| 'md' \| 'lg'` | `'md'` |
| width | 左右方向宽度覆盖 | `number \| string` | — |
| height | 上下方向高度覆盖 | `number \| string` | — |
| closable | 显示右上角关闭按钮 | `boolean` | `true` |
| mask | 显示遮罩 | `boolean` | `true` |
| maskClosable | 点击遮罩关闭 | `boolean` | `true` |
| keyboard | Esc 关闭 | `boolean` | `true` |
| classNames | 部件类名（`root / mask / panel / header / title / body / footer / close`） | `Partial<Record<Part, string>>` | — |
| styles | 部件内联样式（同上） | `Partial<Record<Part, CSSProperties>>` | — |

<CommonProps />

### Events

| 事件 | 说明 | 参数 |
| --- | --- | --- |
| update:open | 受控开合更新 | `open: boolean` |
| close | X / 遮罩 / Esc 请求关闭 | `MouseEvent \| KeyboardEvent` |
| afterClose | 退场动画结束 | — |

### Slots

| 插槽名 | 说明 |
| --- | --- |
| default | 正文 |
| header | 标题区整块内容（关闭按钮保留） |
| title | 标题文本 |
| footer | 页脚内容 |

### 实例 API

```ts
const app = useKApp();
const handle = app?.drawer?.open({
  title: '标题',
  content: h('div', '内容'),
  placement: 'right',
  onClose: () => {},
  afterClose: () => {},
});
handle?.destroy();
app?.drawer?.destroyAll();
```

`KDrawerFuncProps` 支持上述 Props 的子集（title/content/footer/placement/size/width/height/closable/mask/maskClosable/keyboard/classNames/styles/onClose/afterClose）。

### 部件

`root` / `mask` / `panel`（role=dialog）/ `header` / `title` / `body` / `footer` / `close`。

## 注意事项

- 打开时锁定 body 滚动并补偿滚动条宽度，关闭后恢复原样，页面不会因滚动条消失而抖动。
- 锁定期间接管焦点：焦点进入正文首个可聚焦元素，Tab 在面板内循环，关闭后还原到打开前元素。
- 与 `KModal` 共享叠层栈：同时打开时只有最上层响应 Esc 与 Tab 循环。
- 抽屉内展开 Select / Dropdown / DatePicker 等控件时，弹层 Teleport 到 body 并按层级抬高，不会被抽屉裁切。
- 出口优先级：`KApp` 根 > ConfigProvider `popupContainer` > body。
- 关闭时内容卸载（无 keep-alive），需要保留表单状态时请在关闭前自行缓存。
- 宽/高默认走 `size` 令牌；显式 `width` / `height` 只影响对应方向。
- 系统“减少动态效果”时关闭滑入/遮罩过渡。