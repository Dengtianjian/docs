# KPreview 预览

> 共同约定见 [共同约定](./index.md)。独立全屏预览器，不依赖 KModal；支持图片缩放/旋转/翻转/拖拽平移、多图缩略图、视频/音频播放、PDF 嵌入与 Office 文件卡，并保留可插拔类型渲染。

## 何时使用

- 需要在暗色舞台上查看大图，并在多张图片间切换、缩放。
- 需要统一预览图片、视频、音频、PDF 与 Office 文件：前四类内置渲染，Office 提供文件卡与打开入口；特殊类型仍可通过 `resolveType` + `renderers` 或 `#item` 插槽接管。

## 代码演示

<Demo path="preview/basic" title="多图画廊" desc="items 传图片列表；点缩略图从对应张打开；←/→ 切换、+/− 缩放、0 复位、Esc 关闭；工具栏百分比可点复位。" />

<Demo path="preview/slots" title="自定义内容（#item）" desc="#item 插槽按业务字段/type 接管当前内容渲染（示例：PDF 占位卡），切换、缩放、键盘与开合仍由组件提供。" />

<Demo path="preview/media" title="缩略图 + 视频 + 自定义 PDF" desc="多图默认出现底部缩略图条；后缀自动识别 image/video/pdf；视频内置播放器手动播放；注册 renderers.pdf 后覆盖内置 PDF 渲染，演示类型覆盖优先级。" />

<Demo path="preview/builtin" title="内置音频 / PDF / Office" desc="audio 内置播放器；pdf 用浏览器内置阅读器嵌入并附新窗口入口；Office 文档（doc/docx/xls/xlsx/ppt/pptx）展示文件卡与打开原文件，不在页面内解析。" />

<Demo path="preview/resolve" title="resolveType 类型判定" desc="items 携带业务字段 kind；resolveType 优先于后缀推断，把 data:image 的合同项判成 pdf 并命中 renderers.pdf，演示自定义类型决策链路。" />

<Demo path="preview/states" title="加载 / 失败 / 缩略图兜底" desc="缩略图地址无效时退回名称占位；大图或视频加载失败显示错误卡（重新加载 / 打开原文件）；单张慢速大图演示微光骨架，多图中的远程大图可观察加载态。" />

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| v-model:open | 是否打开（受控） | `boolean` | `false` |
| v-model:current | 当前序号（0 基，受控） | `number` | `0` |
| items | 预览项列表 | `KPreviewItem[]` | `[]` |
| minScale | 最小缩放 | `number` | `0.25` |
| maxScale | 最大缩放 | `number` | `5` |
| maskClosable | 点遮罩是否关闭 | `boolean` | `true` |
| closable | 是否显示右上角关闭钮 | `boolean` | `true` |
| toolbar | 是否显示底部缩放工具栏（仅图片） | `boolean` | `true` |
| thumbnails | 多图时显示底部缩略图条 | `boolean` | `true` |
| resolveType | 类型判定钩子，返回 undefined 回落后缀推断 | `(item) => string \| undefined` | — |
| renderers | 按类型注册渲染函数（可覆盖内置 image/video/audio/pdf/office） | `Record<string, KPreviewRenderer>` | — |
<CommonProps />

`KPreviewItem`：`{ src: string; alt?: string; name?: string; type?: string; thumbnail?: string; poster?: string; [key: string]: unknown }`。

类型判定优先级：`item.type` > `resolveType(item)` > 后缀推断（`png/jpg/gif/webp/avif/svg` → image，`mp4/webm/mov/m4v` → video，`mp3/wav/ogg/oga/m4a/aac/flac` → audio，`pdf` → pdf，`doc/docx/xls/xlsx/ppt/pptx` → office，其余 → other）；同时识别 `data:image/*`、`data:video/*`、`data:audio/*`、`data:application/pdf`。

渲染优先级：`#item` 插槽 > `renderers[type]` > 内置 image/video/audio/pdf/office > 兜底卡（文件名 + 下载/新窗口）。Office 只提供文件卡（扩展名徽标 + 下载/新窗口），不在页面内解析文档。

### Events

| 事件 | 说明 | 参数 |
| --- | --- | --- |
| update:open | 开合变化 | `open: boolean` |
| update:current | 序号变化 | `current: number` |
| close | 用户主动关闭（Esc / 遮罩 / 关闭钮，emit 一次） | — |
| change | 切换图片 | `current: number, item: KPreviewItem` |
| zoom | 缩放变化 | `scale: number` |
| rotate | 旋转累计角度（可超过 360，如 450） | `deg: number` |
| flip | 水平翻转切换 | `flippedX: boolean` |

### Slots

| 插槽 | 说明 | 参数 |
| --- | --- | --- |
| item | 接管当前内容渲染（优先级最高，可覆盖 image/video/audio/pdf/office） | `{ item, index, type }` |

### Expose

| 方法 | 说明 |
| --- | --- |
| `open()` / `close()` | 打开 / 关闭 |
| `next()` / `prev()` | 下一张 / 上一张（到边界为无操作） |
| `setCurrent(index)` | 跳转到指定序号（越界自动收敛） |
| `setScale(scale)` | 直接设定缩放（按 minScale/maxScale 收敛） |
| `rotateBy(delta)` | 按角度旋转（90° 步进常用） |
| `flip()` | 水平翻转切换 |
| `resetView()` | 复位缩放 / 旋转 / 翻转 |

### 部件变量

| 变量 | 说明 |
| --- | --- |
| `--k-preview-mask-bg` | 遮罩底色（深色舞台，默认 `rgb(0 0 0 / 75%)`） |
| `--k-preview-control-bg` / `--k-preview-control-bg-hover` | 控件底色 / 悬浮底色 |
| `--k-preview-control-color` | 控件前景色 |

## 注意事项

- 键盘：`←` / `→` 切换，`+` / `-` 缩放，`0` 复位全部变换（缩放/旋转/翻转），`Esc` 关闭；Tab / Shift+Tab 在预览内控件间循环（焦点圈定），打开时焦点落到遮罩容器，关闭后焦点回到打开前的元素。
- 点暗色空白区域或遮罩关闭；点在图片/控件上不关闭（舞台铺满全屏，空白点击由舞台层判定）。
- 切换图片带方向滑动 + 淡变（out-in，约 0.18s），方向随切换序自动判定；工具栏右侧为逆时针旋转 / 顺时针旋转 / 水平翻转，`100%` 按钮复位全部变换。
- 打开期间锁定 `body` 滚动，关闭恢复；切换图片或重新打开时缩放自动复位为 100%。
- 滚轮在舞台内缩放（阻止页面滚动）；**触屏手势**：双指捏合缩放、放大后单指拖动平移、单指左右滑切换上一张/下一张（滑动阈值 50px、垂直位移 <40px）。舞台 `touch-action: none`，复位/切换图片会清空平移。
- 遮罩恒定深色（与 KModal mask 同款破格登记），不随主题反相；控件白字半透明。
- 层级走 `--k-z-index-modal`；ConfigProvider 的 scoped 主题类会随遮罩根节点输出，token 链不断。
- **缩略图**：`items.length > 1` 且 `thumbnails` 为真时显示底部横滚条；点击切换，当前项自动滚到中间；`thumbnail` 缺省时图片取 `src`、视频取 `poster`，都没有或加载失败则显示名称/类型占位；移动端缩略项 44px 命中。带缩略图时工具栏与计数器自动上移。缩略条可横向滚动，左右边缘按滚动位置渐隐提示。
- **媒体加载态**：图片加载中显示微光骨架 + 半透明图，视频/音频加载中显示居中 spinner，加载失败显示错误卡（文件名 + 重新加载 + 打开原文件）；切换项或关闭会重置状态，重新加载走 key 重建元素。PDF/Office/自定义类型不进入媒体加载态。
- **相邻预加载**：打开或切换后，预取前后各 2 项的图片（data URI 除外），已预取地址不重复请求。
- **视频 / 音频**：内置 `<video controls playsinline>` 与 `<audio controls>`，均不自动播放；切换项或关闭预览时自动 `pause()`。非图片类型不启用缩放旋转、滚轮与捏合手势，工具栏隐藏；`←/→` 切换与 Esc 关闭照常。
- **PDF**：`<iframe>` 嵌入浏览器内置阅读器，右上角提供「新窗口打开」；嵌入策略受浏览器与文件源响应头影响，无法内嵌时请用新窗口入口或自定义 `renderers.pdf`。
- **类型与渲染器**：类型判定与渲染优先级见上文；`renderers` 可覆盖内置 image/video/audio/pdf/office，`#item` 插槽优先级最高。未命中渲染器时显示统一兜底卡（文件名 + 说明 + 打开原文件）；媒体加载失败另有重新加载。
- headless 模式不渲染 Teleport/Transition，自绘时需自行 Teleport 并绑定 `rootOn`（键盘）与各动作包。

## 自定义渲染（headless）

提供 `#render` 作用域插槽（优先）或 `render` 闭包 prop 任一，**整件视觉输出被替换**（遮罩、舞台、控件、过渡都自绘）；script 逻辑照跑，**绑定包散播到自绘节点才继承**。通用契约见 [headless 自定义渲染](../headless.md)。scope 为 `KPreviewRenderScope`（入口导出），四组字段逐项如下。

#### 状态（只读快照）

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| open | `boolean` | 是否打开 |
| items | `KPreviewItem[]` | 预览项列表 |
| count | `number` | 总数 |
| current | `number` | 当前序号（已收敛到合法范围） |
| currentItem | `KPreviewItem \| null` | 当前项 |
| scale | `number` | 当前缩放 |
| panX / panY | `number` | 放大后的平移偏移（px） |
| isPannable | `boolean` | 当前是否可拖拽平移（图片且 scale > 1） |
| rotate | `number` | 旋转累计角度（可持续累加，不取模） |
| flipX | `boolean` | 是否水平翻转 |
| minScale | `number` | 最小缩放 |
| maxScale | `number` | 最大缩放 |
| hasPrev | `boolean` | 是否有上一张 |
| hasNext | `boolean` | 是否有下一张 |
| maskClosable | `boolean` | 点遮罩关闭 |
| closable | `boolean` | 显示关闭钮 |
| toolbar | `boolean` | 显示缩放工具栏 |

#### ref 与出口

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| rootEl | `Ref<HTMLElement \| null>` | 遮罩根节点（打开时聚焦） |
| stageEl | `Ref<HTMLElement \| null>` | 舞台节点（滚轮缩放挂载处） |

#### 绑定包（spread 到自绘节点才继承）

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| rootAttrs | `Record<string, unknown>` | role=dialog / aria-modal / tabindex / data-k-theme |
| rootOn | `KOnPack` | keydown：切图 / 缩放 / Esc |
| maskOn | `KOnPack` | 遮罩点击关闭（受 maskClosable 约束） |
| stageOn | `KOnPack` | wheel：滚轮缩放（已 preventDefault） |
| prevOn / nextOn | `KOnPack` | 上一张 / 下一张 |
| closeOn | `KOnPack` | 关闭 |
| zoomInOn / zoomOutOn | `KOnPack` | ×1.25 / ×0.8 |
| resetOn | `KOnPack` | 复位全部变换（缩放/旋转/翻转） |
| rotateLeftOn / rotateRightOn | `KOnPack` | 逆 / 顺时针旋转 90° |
| flipOn | `KOnPack` | 水平翻转切换 |
| imageAttrs | `Record<string, unknown>` | src / alt / draggable=false |
| imageStyle | `CSSProperties` | `transform: translate(panX, panY) scale(...) rotate(...deg) scaleX(±1)` |

#### 动作

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| setOpen | `(v: boolean) => void` | 开合（含滚动锁/焦点/监听副作用） |
| close | `() => void` | 关闭并 emit close |
| setCurrent | `(index: number) => void` | 跳转并 emit change |
| next / prev | `() => void` | 相邻切换（边界无操作） |
| zoomBy | `(factor: number) => void` | 乘性缩放 |
| setScale | `(scale: number) => void` | 绝对缩放（收敛到 min/max） |
| rotateBy | `(delta: number) => void` | 旋转（角度累加，转满 360° 继续转不归零） |
| flip | `() => void` | 水平翻转切换 |
| resetView | `() => void` | 复位缩放 / 旋转 / 翻转 |
| slots | `ReturnType<typeof useSlots>` | 当前组件 slots 访问对象 |

最小契约：

```vue
<KPreview v-model:open="open" :items="items">
  <template #render="ctx">
    <Teleport to="body">
      <div v-if="ctx.open" :ref="ctx.rootEl" v-bind="ctx.rootAttrs" v-on="ctx.rootOn" class="my-preview">
        <div class="my-preview__mask" v-on="ctx.maskOn" />
        <img v-if="ctx.currentItem" v-bind="ctx.imageAttrs" :style="ctx.imageStyle" v-on="ctx.stageOn" />
        <button type="button" v-on="ctx.prevOn" :disabled="!ctx.hasPrev">‹</button>
        <button type="button" v-on="ctx.nextOn" :disabled="!ctx.hasNext">›</button>
        <button type="button" v-on="ctx.zoomInOn">+</button>
        <button type="button" v-on="ctx.zoomOutOn">−</button>
        <button type="button" v-on="ctx.closeOn">关闭</button>
        <span>{{ ctx.current + 1 }} / {{ ctx.count }} · {{ Math.round(ctx.scale * 100) }}%</span>
      </div>
    </Teleport>
  </template>
</KPreview>
```

注意：headless 下 Teleport/Transition 不自带，需自行包裹；`maskOn` 已内置 maskClosable 判定；滚轮缩放绑定 `stageOn` 才能阻止页面滚动；`render` prop 经 `h()` 自绘时样式须全局或内联，`#render` 插槽通道的 scoped 样式可正常生效；`classNames`/`styles` 只作用于默认渲染。

## 规格附录

### 键位

| 按键 | 行为 |
| --- | --- |
| ← / → | 上一张 / 下一张 |
| + / = | 放大（×1.25） |
| - | 缩小（×0.8） |
| 0 | 复位全部变换（缩放/旋转/翻转） |
| Esc | 关闭 |

### 层级与交互

- 根节点 `position: fixed; inset: 0; z-index: var(--k-z-index-modal)`；遮罩与舞台分层，控件 `z-index: 2`。
- 鼠标滚轮缩放步进 1.1，范围受 `minScale` / `maxScale` 约束；放大后鼠标/触屏拖动平移，光标切换 grab/grabbing，缩回 100% 或复位时清空平移。
- 切换图片时缩放/旋转/翻转全部复位；变换不改变图片布局盒（`transform` 为主），顺序为 `scale → rotate → scaleX`。
- 轮播动画：切换方向由序号比较决定，离场图绝对定位居中避免撑高，随后入场图平移 + 淡入。

### 后续登记

- Office 文档的在线渲染（需接入第三方文档预览服务，当前仅文件卡 + 打开原文件）。
- 预加载失败重试与相邻项预取数量配置（当前固定前后 2 项、图片类）。
