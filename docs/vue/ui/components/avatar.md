# KAvatar 头像

> 共同约定见 [共同约定](./index.md)。P6 基础补齐。图片、文字、图标头像，支持分组叠放与加载失败回退。

## 何时使用

- 用户、团队、应用的图形标识；
- 列表、评论、协作者等场景的多人头像叠放。

## 代码演示

<Demo path="avatar/basic" title="尺寸 / 形状 / 回退" :desc="['size 支持 xs / sm / md / lg 或数字像素。', 'shape=square 切换为圆角方形。', '没有图片时按 #icon → 默认插槽 → 文字 → 内置人像图标回退。', 'alt 缺省取首字符作为文字。']" />

<Demo path="avatar/image" title="图片与失败回退" :desc="['传 src 渲染图片；加载失败自动回退到文字/图标。', '错误后更换 src 会自动重试。', '触发 load / error 事件可接入业务埋点。']" />

<Demo path="avatar/group" title="头像组" overflow="visible" :desc="['maxCount 控制最多展示数量，超出显示 +N。', 'size / shape 作为子 Avatar 的默认值，可被单个 Avatar 覆盖。', 'gap 控制叠放间距，默认 8px。', 'hover-expand 开启悬停展开：expandMode=&quot;full&quot; 完全分开，peek 仅移动 hoverOffset 距离；悬停头像同时上浮并高亮描边。', '+N 使用更深填充色，并随组悬停轻微上浮。']" />

## API

### KAvatar Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| src | 图片地址 | `string` | — |
| srcset | 图片候选集 | `string` | — |
| alt | 图片替代文本；无文字时取首字符回退 | `string` | — |
| icon | 图标组件，也可用 `#icon` 插槽 | `Component` | — |
| text | 回退文字 | `string` | — |
| size | 尺寸档或像素 | `'xs' \| 'sm' \| 'md' \| 'lg' \| number` | `'md'` |
| shape | 形状 | `'circle' \| 'square'` | `'circle'` |
| fit | 图片裁切方式 | `CSSProperties['objectFit']` | `'cover'` |
| color | 回退底色 | `string` | — |
| bordered | 白色描边 | `boolean` | `false` |
| classNames / styles | 部件：`root / image / fallback / text / icon` | — | — |

### KAvatar Slots

| 插槽名 | 说明 |
| --- | --- |
| default | 自定义回退内容 |
| icon | 自定义图标 |
| fallback | 回退内容，优先级低于 default |

### KAvatar Events

| 事件 | 说明 | 参数 |
| --- | --- | --- |
| load | 图片加载成功 | `Event` |
| error | 图片加载失败并已回退 | `Event` |

### KAvatarGroup Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| maxCount | 最多展示数量；0 = 不限制 | `number` | `5` |
| size | 子头像默认尺寸 | `'xs' \| 'sm' \| 'md' \| 'lg' \| number` | — |
| shape | 子头像默认形状 | `'circle' \| 'square'` | — |
| gap | 叠放间距，正值表示重叠 | `number` | `8` |
| bordered | 子头像白色描边 | `boolean` | `true` |
| hoverExpand | 悬停时展开头像组 | `boolean` | `false` |
| expandMode | 展开方式：完全分开 / 仅移动一点 | `'full' \| 'peek'` | `'full'` |
| hoverOffset | peek 模式的分离距离（px） | `number` | `6` |
| classNames / styles | 部件：`root / extra` | — | — |

<CommonProps />

## 注意事项

- `+N` 使用与子头像相同的尺寸与形状；`maxCount=0` 时不显示计数。
- 头像组通过父级依赖注入下发尺寸/形状/描边，单个 Avatar 显式传值优先。
- `hoverExpand` 只在支持悬停的设备生效，触屏不会因点击残留展开态。
- 图片按 `alt` 提供可访问名称；纯装饰头像请传空 `alt` 并用 `aria-hidden` 包裹。