# KUpload 上传

> 共同约定见 [共同约定](./index.md)。P2.5 第二个新组件；**组件自身不发请求**——`upload` 全权接管上传，组件只维护文件列表状态机；删除侧对应 `remove` 钩子。

## 何时使用

- 需要点选 / 拖放文件、并把文件交给业务自己上传（fetch、axios、S3、后端 SDK 均可）。
- 需要在 text / picture / picture-card 三种列表形态间切换，或需要进度、失败重试、图片预览、删除拦截。

## 代码演示

<Demo path="upload/directory" title="目录上传" desc="`directory` 选择整个文件夹（webkitdirectory），强制多选、列表显示相对路径；maxCount / maxSize 照常生效。" />

<Demo path="upload/paste" title="粘贴上传" desc="`paste` 监听页面 Ctrl/Cmd+V：剪贴板里的文件/截图直接入列，纯文本不拦截。" />

<Demo path="upload/crop" title="图片裁剪" desc="`crop` 选图后弹层裁剪：拖动裁剪框，四角 + 四边中点自由缩放（可裁长方形）；PC 按住 Shift 临时锁比例；下方提供 自由 / 1:1 / 4:3 / 3:4 / 16:9 / 3:2 / 5:4 / 7:5 固定比例与「锁定比例」开关；传 `{ aspectRatio }` 时全程固定比例。" />

<Demo path="upload/chunk" title="分片上传" desc="`chunkSize=256KB` + `chunkConcurrency=2`：`upload` 按片调用（`ctx.chunk` 带 index/start/end），全部成功后 `merge` 汇总；示例生成 1MB 文件演示 4 片。" />

<Demo path="upload/compress" title="图片压缩" desc="`compress` 在入列前用 canvas 缩放到长边 800 / 质量 0.75；示例点按钮生成 1600×1200 图片对比前后体积。" />

<Demo path="upload/concurrency" title="并发上限" desc="`concurrency=2`：同时最多执行 2 个 upload，其余排队；完成一个自动补位（示例实时显示当前/峰值并发）。" />

<Demo path="upload/basic" title="基础使用" desc="text 列表 + mock upload 阶梯进度；maxCount=3、maxSize=2MB、accept 过滤；change / reject 实时回显。" />

<Demo path="upload/drag" title="拖拽上传" desc="drag 开启后根区域整体作为拖放目标；拖入高亮并出现「释放以上传」提示；multiple 多选。" />

<Demo path="upload/picture" title="图片列表（picture）" desc="缩略图优先 thumbUrl、其次 url；新上传图片无 url 时用本地 raw 对象 URL 即时出图。" />

<Demo path="upload/picture-card" title="卡片墙（picture-card）" desc="hover 出现黑底白色图标的「预览 / 删除」操作蒙层（图标按钮，title 提示）；点图片或预览打开内置 KPreview 画廊（全部图片可切换、缩放）；到达 maxCount 后「+」块消失。" />

<Demo path="upload/picture-circle" title="圆形卡片墙（picture-circle）" desc="方形卡片的圆形变体：卡片与「+」块同尺寸正圆，蒙层与上传/失败遮罩随圆裁切；sortable、clickToUpload 等能力与 picture-card 一致。" />

<Demo path="upload/compact" title="精简操作 / 点击重传" desc="showActions=false 隐藏 hover 操作栏；clickToUpload：卡片墙 hover 显示黑底白色图标蒙层，图片列表与文件列表 hover 行尾出现与删除同款的「重新上传」图标按钮；点选文件后原位替换（change reason=replace）。" />

<Demo path="upload/states" title="失败重试 / 拒绝 / 删除拦截" desc="失败项显示「上传失败」与重试；upload 返回 false 同步拒绝、Promise&lt;false&gt; 异步拒绝；remove 返回 false 异步拦截删除。" />

<Demo path="upload/sortable" title="拖拽排序" desc="sortable 开启后列表项可拖拽换顺序（原生 HTML5 DnD）；行内上/下半区决定插在目标前/后，与拖文件进根区域互不干扰；change 的 reason 为 move。" />

<Demo path="upload/render" title="自定义渲染（headless）" desc="#render 整件替换：暗色清单 + 自绘进度条；选文件、拖放、状态机、重试、删除逻辑由绑定包继承。" />

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| v-model:file-list | 文件列表（受控双模） | `KUploadFile[]` | `[]` |
| listType | 列表形态 | `'text' \| 'picture' \| 'picture-card' \| 'picture-circle'` | `'text'` |
| accept | 原生 input 的 accept | `string` | — |
| directory | 目录选择（webkitdirectory），强制多选并显示相对路径 | `boolean` | `false` |
| paste | 监听页面粘贴事件，文件/图片直接入列 | `boolean` | `false` |
| multiple | 是否多选；`false` 时一次只取第一个文件 | `boolean` | `false` |
| concurrency | 并发上限：>0 时最多同时执行 N 个 upload，其余排队；0 = 不限 | `number` | `0` |
| compress | 图片前置压缩：true 或 `{ maxWidth, maxHeight, quality, type }` | `boolean \| object` | `false` |
| chunkSize | 分片大小（字节），文件大于该值时按片调用 upload；0 = 关闭 | `number` | `0` |
| chunkConcurrency | 单文件内分片并发数 | `number` | `3` |
| merge | 全部分片成功后调用，返回值参与 mapResponse | `(ctx) => unknown \| Promise<unknown>` | — |
| crop | 图片选后裁剪再入列（true 或 `{ aspectRatio, type, quality }`）；SVG/GIF 跳过 | `boolean \| object` | `false` |
| maxCount | 列表上限；超出部分 emit reject（`maxCount`） | `number` | — |
| maxSize | 单文件字节上限；超出 emit reject（`size`） | `number` | — |
| disabled | 是否禁用（选择、拖放、删除全部停用） | `boolean` | `false` |
| drag | 根区域是否作为拖放目标 | `boolean` | `false` |
| showActions | 是否渲染 hover 操作栏（picture-card 预览/删除、列表删除；error 重试不受控） | `boolean` | `true` |
| clickToUpload | 点缩略图重新选择文件并原位替换（关闭则点图预览） | `boolean` | `false` |
| sortable | 列表项可拖拽换顺序（原生 HTML5 DnD，不引第三方库） | `boolean` | `false` |
| upload | **必传**：上传实现，全权接管请求；返回 `false` / `Promise<false>` 拒绝该文件 | `(options: KUploadRequestOptions) => KUploadRequestResult` | — |
| remove | 删除前钩子（与 upload 对称）：返回 `false` 或 reject 则保留 | `(file) => boolean \| Promise<boolean>` | — |
<CommonProps />

### Events

| 事件 | 说明 | 参数 |
| --- | --- | --- |
| update:file-list | v-model 更新 | `fileList: KUploadFileItem[]` |
| change | 列表任何变化（进度 tick 也会触发） | `fileList, info: { file?, reason }` |
| success | 单个文件上传成功 | `file: KUploadFileItem` |
| error | 单个文件上传失败 | `file, err: unknown` |
| reject | 文件被拒绝 | `file: File, reason: 'size' \| 'maxCount' \| 'upload'` |
| remove | 文件被移除 | `file: KUploadFileItem` |
| preview | 点击预览（默认动作仍执行） | `file: KUploadFileItem` |
| retry | 开始重传（error → uploading，点重试图标或调用 `retry()` 均触发） | `file: KUploadFileItem` |
| reorder | 拖拽排序落位后（from / to 为操作前/后下标） | `fileList, info: { file, from, to, position: 'before' \| 'after' }` |

`reason` 取值为 `add | progress | success | error | retry | remove | move | replace`；重传与排序除 `change`（reason=`retry` / `move`）外另有专属 `retry` / `reorder` 事件。

### Slots

| 插槽 | 说明 | 参数 |
| --- | --- | --- |
| trigger | 替换触发区内容（picture-card 的「+」块 / 文本触发按钮） | `{ open, disabled }` |

### Expose

| 方法 / 属性 | 说明 |
| --- | --- |
| `openSelect()` | 打开文件选择框（受 maxCount / disabled 约束） |
| `upload(file)` | 手动（重新）上传已有项（需 `raw`，不受 status 限制） |
| `addFiles(files)` | 直接注入 `File[]` / `FileList`，走完整管线（upload） |
| `remove(file)` | 删除文件项（走 remove 钩子与 abort） |
| `retry(file)` | 重试 error 项（需要 raw） |
| `abort(file)` | 中止某文件进行中的请求 |
| `preview(file)` | 触发预览（图片走内置 KModal） |
| `reorder(from, to, position)` | 把项移到目标项前/后（`before` / `after`，越界静默忽略） |
| `inputEl` | 原生 input 的 ref |

### 部件变量

| 部件 | 变量 |
| --- | --- |
| 根 | `--k-upload-item-bg`（缩略图底/进度槽）、`--k-upload-item-hover-bg`（行 hover 底色）、`--k-upload-item-radius`、`--k-upload-border-color`、`--k-upload-trigger-color`、`--k-upload-hint-color`、`--k-upload-action-color`、`--k-upload-action-hover`、`--k-upload-error-color`、`--k-upload-progress-color` |
| 尺寸 | `--k-upload-thumb-size`（picture 缩略图 40px）、`--k-upload-card-size`（卡片 96px） |
| 重传蒙层 | `--k-upload-replace-overlay-bg`（卡片 hover 蒙层底色，默认恒黑 65%）、`--k-upload-replace-overlay-color`（蒙层图标色，默认 #fff） |

## 注意事项

- 操作项（预览/重试/删除/重新上传/文件名、失败蒙层）均支持 Tab 聚焦与 Enter/Space 触发，并带 aria-label 与 focus-visible 描边。

- **组件不发请求**：不传 `upload` 时文件项直接落 error 并 console.warn；真实上传请用 fetch/axios（`signal` 已接入，删除/卸载自动 abort）。
- `upload` 的 `onSuccess(response)` 响应映射：`string` 视为 `url`；对象取 `url / thumbUrl / name / size` 四字段合并进文件项。
- 文件项状态归一：外部传入 `finished` 视为 `done`，缺省状态视为 `done`；`uid` 缺省按 `id` 或序号兜底。
- 上传中删除会同时 `AbortController.abort()` 与调用 upload 返回句柄的 `abort()`。
- `remove` 可异步拦截；外部整体替换 fileList 时，进行中的请求会失去更新目标（不会崩溃，组件卸载时统一 abort）。
- `multiple=false` 时一次选择/拖放只取第一个文件；列表上限统一由 `maxCount` 控制（不隐含“替换”语义）。
- 预览：图片（按 `raw.type` 或扩展名判定）走内置 KPreview 画廊——从当前张打开，可左右切换列表中全部图片并缩放；非图片有 `url` 时新窗口打开。
- 本地预览对象 URL 在删除与组件卸载时自动 `revokeObjectURL`。
- 默认模板交互动画：新增项进场（淡入 + 位移/缩放）、删除退场（列表绝对定位 + 其余项 FLIP 上移）、排序用 TransitionGroup 的 move 过渡（0.22s）、失败态抖动一次；图片预览动画由 KPreview 承担（淡入 + 方向滑动）。动画只作用于默认模板，headless 自绘请自行处理。
- `clickToUpload`：缩略图点击改为打开文件选择，选中后**原位替换**——复用 uid 保住列表位置，先 abort 旧请求并回收旧对象 URL，再走完整管线（maxSize / upload），change reason 为 `replace`；替换不占 `maxCount` 名额。开启后预览改走「预览」按钮或文件名；**卡片墙 hover 操作蒙层统一为黑底（65%）白色大图标**（预览 / 删除 / 重新上传 同款，仅图标、`title` / `aria-label` 提示），**图片列表与文件列表 hover 只在行尾出现与删除同款的「重新上传」图标按钮**（text 无缩略图，按钮是唯一入口），不覆盖整行也不撑高行。
- `showActions=false` 隐藏 hover 操作栏（picture-card 的预览/删除、列表的删除）；error 项的「重试」始终保留。
- 触屏（`hover: none`）：卡片操作栏改为常显底部小按钮（不再依赖 hover），列表的「重新上传」按钮常显。**触屏排序**：按住 `sortable` 项约 250ms 激活，之后移动即实时让位；列表按纵向中点、卡片墙按横向中点判定落点，松手换序。可拖项 `touch-action: none`（同类库取舍），页面滚动请从列表空隙/空白处发起；卡片上的预览/删除/重传按钮区域不触发长按排序。
- `sortable` 使用原生 HTML5 拖拽：文件项 `draggable`，拖拽源半透明；**列表在拖动经过相邻项中点时，中间行实时上/下让位（0.18s transform 过渡，距离 = 行高 + 行距）**，目标行仍描上/下边；松手后按落位重排并走 TransitionGroup FLIP（0.22s）。卡片墙按横向中点描左/右边、落位后 FLIP。与 `drag`（文件拖进根区域）互不干扰（排序拖拽带 `text/plain`，文件拖拽带 `Files`）。
- headless 模式不渲染预览器（KPreview）与默认 input，需绑定 `inputEl` / `inputAttrs` / `inputOn`，预览可自行接 `preview` 事件。

## 自定义渲染（headless）

提供 `#render` 作用域插槽（优先）或 `render` 闭包 prop 任一，**整件视觉输出被替换**（触发区、列表、卡片墙、input、预览 Modal 都自绘）；script 逻辑照跑，**绑定包散播到自绘节点才继承**。通用契约见 [headless 自定义渲染](../headless.md)。scope 为 `KUploadRenderScope`（入口导出），四组字段逐项如下。

#### 状态（只读快照）

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| fileList | `KUploadFileItem[]` | 归一后的文件列表（uid/name/status 必有） |
| listType | `'text' \| 'picture' \| 'picture-card' \| 'picture-circle'` | 列表形态 |
| accept | `string \| undefined` | 选择过滤 |
| multiple | `boolean \| undefined` | 是否多选 |
| maxCount | `number \| undefined` | 列表上限 |
| maxSize | `number \| undefined` | 单文件字节上限 |
| disabled | `boolean \| undefined` | 是否禁用 |
| drag | `boolean \| undefined` | 是否拖放模式 |
| directory | `boolean \| undefined` | 是否目录选择（自绘 trigger 时用于提示/行为同步） |
| paste | `boolean \| undefined` | 是否开启页面粘贴监听 |
| concurrency | `number` | 当前并发上限（0 = 不限） |
| compress | `boolean \| KUploadCompressOptions` | 当前压缩配置 |
| chunkSize / chunkConcurrency | `number` | 当前分片配置 |
| crop | `boolean \| KUploadCropOptions` | 当前裁剪配置 |
| showActions | `boolean \| undefined` | 是否渲染预览/删除操作栏 |
| clickToUpload | `boolean \| undefined` | 点缩略图是否改为重新选择替换 |
| sortable | `boolean \| undefined` | 列表项是否可拖拽换顺序 |
| dragOver | `boolean` | 拖拽文件正经过根区域 |
| draggingUid | `string \| null` | 正在被拖拽排序的文件 uid |
| canAdd | `boolean` | 未禁用且未达上限 |
| thumbOf | `(file) => string \| undefined` | 缩略图源：thumbUrl > url（图片）> raw 本地对象 URL |
| isImage | `(file) => boolean` | 图片判定（raw.type / 扩展名） |
| extOf | `(file) => string` | 扩展名标签（无扩展名回退 FILE） |

#### ref 与出口

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| rootEl | `Ref<HTMLElement \| null>` | 根节点；拖放包与 disabled 态判定基于它 |
| inputEl | `Ref<HTMLInputElement \| null>` | 原生文件 input；`openSelect` 依赖它 click |

#### 绑定包（spread 到自绘节点才继承）

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| rootAttrs | `Record<string, unknown>` | 根节点 `data-part="root"` |
| rootOn | `KOnPack` | dragenter / dragover / dragleave / drop（drag 开启才响应） |
| triggerAttrs | `Record<string, unknown>` | role=button、tabindex、aria-disabled |
| triggerOn | `KOnPack` | click / keydown(Enter/Space) 打开选择框 |
| inputAttrs | `Record<string, unknown>` | type=file / accept / multiple / disabled |
| inputOn | `KOnPack` | change 接文件并清空 value（同文件可重复选） |
| itemAttrs(file) | `(file) => Record<string, unknown>` | data-part=item、data-status、data-uid；sortable 时附 draggable、data-dragging、data-drop(before/after) |
| itemDragOn(file) | `(file) => KOnPack` | 排序包：dragstart / dragover / dragleave / drop / dragend（sortable 开启才响应） |
| removeOn(file) | `(file) => KOnPack` | 删除（stopPropagation + remove 钩子拦截 + abort） |
| retryOn(file) | `(file) => KOnPack` | 重试（仅 error + 有 raw） |
| previewOn(file) | `(file) => KOnPack` | 预览（emit preview + 默认动作） |
| thumbOn(file) | `(file) => KOnPack` | 缩略图点击（clickToUpload 开启为替换，否则预览） |

#### 动作

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| openSelect | `() => void` | 打开文件选择框（canAdd 才生效） |
| openReplace | `(file) => void` | 打开文件选择框，选中后原位替换该文件 |
| addFiles | `(files: File[] \| FileList \| ArrayLike<File>) => void` | 注入文件走完整管线 |
| remove | `(file) => void` | 异步删除（remove 钩子可拦截） |
| retry | `(file) => void` | 重试 error 项 |
| upload | `(file) => void` | 手动（重新）上传已有项（需 raw） |
| abort | `(file) => void` | 只中止请求，不动列表 |
| preview | `(file) => void` | 预览动作 |
| reorder | `(fromUid, toUid, position) => void` | 拖拽排序的落点动作 |
| slots | `ReturnType<typeof useSlots>` | 当前组件 slots 访问对象 |

最小契约：

```vue
<KUpload v-model:file-list="files" :custom-request="request">
  <template #render="ctx">
    <div :ref="ctx.rootEl" v-bind="ctx.rootAttrs" v-on="ctx.rootOn">
      <input :ref="ctx.inputEl" v-bind="ctx.inputAttrs" v-on="ctx.inputOn" />
      <button type="button" v-bind="ctx.triggerAttrs" v-on="ctx.triggerOn">选择文件</button>
      <ul>
        <li v-for="f in ctx.fileList" :key="f.uid" v-bind="ctx.itemAttrs(f)" v-on="ctx.itemDragOn(f)">
          <span>{{ f.name }}</span>
          <span>{{ f.status === 'uploading' ? `${f.percent ?? 0}%` : f.status }}</span>
          <button v-if="f.status === 'error'" type="button" v-on="ctx.retryOn(f)">重试</button>
          <button type="button" v-on="ctx.removeOn(f)">删除</button>
        </li>
      </ul>
    </div>
  </template>
</KUpload>
```

注意：headless 时必须绑定 `inputEl`（`openSelect` 靠它拉起原生选择框），否则只能用 `addFiles` 编程注入；预览 Modal 不在 headless 路径渲染，预览请自行接 `preview` 事件；`render` prop 经 `h()` 自绘时样式须使用全局选择器或内联样式，`#render` 插槽通道的 scoped 样式可正常生效；`classNames`/`styles` 只作用于默认渲染；事件包经 `h()` 散播时按通用约定调用 `onProps(pack)`。

## 规格附录

### DOM 部件与状态属性

默认模板的 `data-part` 部件为：`root`、`trigger`、`input`、`item`；根节点另有 `data-*` 无（形态走类名 `k-upload--text|picture|picture-card` 与 `is-dragover / is-disabled / is-drag`）。文件项带 `data-status="uploading|done|error"` 与 `data-uid`。

### upload 契约

```ts
type KUploadUpload = (options: {
  file: File;
  signal: AbortSignal;
  onProgress: (percent: number) => void;
  onSuccess: (response?: unknown) => void;
  onError: (err?: unknown) => void;
}) => { abort?: () => void } | void | false | Promise<unknown>;
```

- 返回 `false`（或 `Promise` resolve `false`）：拒绝该文件——不进列表、emit `reject`（reason `upload`）；原先的 `beforeUpload` 已合并到此处。
- 返回 `{ abort }`：删除 / 卸载 / `abort()` 时被调用。
- 返回 Promise：reject 视为失败；resolve 值为 `{ abort }` 时登记为句柄。
- `onSuccess` 响应合并规则见「注意事项」。

### 拖拽排序

`sortable` 开启后文件项获得 `draggable="true"`；`itemDragOn` 内的 dragstart 会写入 `text/plain`（Firefox 启动拖拽所需），根区域文件拖放仅响应 `Files` 类型，两套拖拽互不串扰。落点判定：text / picture 列表由 ul 级 `dragover` 按指针 Y 与各行 `offsetTop` 中点计算（不受让位 transform 影响），跨过中点即让位；picture-card / picture-circle 按横向中点，决定 `before` / `after`。排序只改列表顺序，不发请求、不中断进行中的上传。

### 文件项状态机

`uploading`（初始，percent 0→100）→ `done` 或 `error`；`error` 可 `retry()` 回到 `uploading`；任意状态可 `remove()`（会 abort）。外部传入项若无 `status` 直接视为 `done`。

## 目录与粘贴

- `directory` 只认原生文件夹选择：拖入文件夹不会递归；iOS/部分 WebView 不支持 `webkitdirectory`，降级为普通文件选择。
- `paste` 是 **document 级监听**，同一页面多个上传组件同时开启会重复收文件；建议只在一个实例开启，或按业务手动调用 `addFiles()`。
- 两者都走同一套 `addFiles`：maxCount、maxSize、upload 拒绝、progress/change 事件与普通选择完全一致。

## 图片裁剪

- `crop` 在图片入列前打开裁剪弹层（内置 [KImageCropper](./image-cropper.md)）：拖动框移动；自由模式显示 4 角 + 4 边中点（可裁任意长方形），拖动时按住 **Shift** 临时锁定起始比例；裁剪区下方提供 自由 / 1:1 / 4:3 / 3:4 / 16:9 / 3:2 / 5:4 / 7:5 预设与「锁定比例」开关（锁定当前框比例），传 `aspectRatio` 时全程固定比例并只保留四角；支持重置。确定后输出裁剪后的 File，再走压缩 / maxSize / 分片 / upload 全流程。
- 移动端裁剪弹窗放大到近全屏：裁剪区 `min(36vh,280px)`、8 个控制点命中区扩到约 26px；比例预设横向滚动、锁定开关与 footer 同屏可见；拖动/缩放走 pointer 事件，触屏可直接操作。
- 多图选择会逐个弹层；取消或关闭不产生文件、不占 maxCount；替换上传同样会走裁剪。
- SVG/GIF 跳过裁剪；裁剪输出默认沿用原图类型（PNG 保透明，其余 JPEG），可用 `type/quality` 覆盖。

## 分片上传

- `chunkSize>0` 且文件大于该值时，`upload` 会被调用多次，每次 `ctx.chunk = { index, total, start, end, size }`，`ctx.file` 是该片 File；`onProgress` 按分片百分比汇总为整文件进度。
- 分片失败/返回 `false`/抛错会中止同文件其他分片；外部 abort/删除同样通过共享 signal 中止。单文件分片并发由 `chunkConcurrency` 控制，文件之间的并发仍由 `concurrency` 控制。
- 全部成功后调用 `merge({ file, signal, chunkCount, responses })`；`responses` 是各片 `onSuccess` 返回值。merge 返回对象会走 `url/thumbUrl/name/size` 映射，返回 false 视为拒绝整文件；未传 merge 时不回传 url。
- 压缩（`compress`）在切片前完成，分片基于压缩后的 File。

## 图片压缩

- `compress` 在创建列表项前用 canvas 缩放到 `maxWidth/maxHeight`（默认 1920）并按 `quality`（默认 0.85）重编码；非图片、SVG、GIF 跳过，压缩失败或产物更大时保留原图。
- 默认 PNG 保持 PNG（质量参数无效，只缩尺寸），JPEG/WebP 沿用原类型；可用 `type` 强制输出（如 `image/webp`）。
- `maxSize` 按**压缩后**体积判断；`upload` 收到的 `file` 也是压缩后的 File，相对路径会保留。
- 浏览器无 `createImageBitmap`/canvas 时自动降级为原图。

## 并发与队列

- `concurrency>0` 时组件维护 FIFO 队列：达到上限的文件保持 `uploading`/0% 占位，前一个成功、失败或被中止后自动启动下一个。
- 队列中的文件被删除或 `abort()` 会直接出队；并发上限调大时立即补位，调小不打断已执行请求。
- 队列只约束 `upload` 的调用时机；重试、手动 `upload(item)` 同样入队。

### 后续登记

- `picture-circle` 为 `picture-card` 的圆形变体：卡片与「+」块 `border-radius: 50%`，蒙层与 uploading/error 遮罩随 `overflow: hidden` 裁圆；其余能力（排序、重传、预览）与 `picture-card` 完全一致，排序落点同样按横向中点判定。
- 目录上传（`webkitdirectory`）与粘贴上传。
- 图片裁剪、压缩前置钩子。
- 分片 / 并发多字段上传策略（当前由 upload 内部自理）。
