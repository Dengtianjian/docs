# KTable · 表头位置与滚动

> 顶部/底部表头、内部吸顶、页面级吸顶与吸底横向滚动条。


### 最小用法

```vue
<KTable sticky row-key="id" :columns="columns" :data-source="rows" :scroll="{ y: 320 }" />
```

### 表头位置

<Demo :title-level="4" path="table/header-position" title="表头位置 · 顶部 / 底部" :desc="['`headerPosition` 控制表头渲染在数据行上方还是下方；表头在底部时汇总行仍在其上方。', '`sticky` 跟随位置：表头在底部时吸在滚动容器底部，多级表头整块悬浮。', '组合限制：卡片模式不渲染表头；表头沉底依赖表格行组渲染顺序，分页器仍固定在表格外。']" />

### 页面级吸顶

<Demo :title-level="4" path="table/page-sticky" title="页面级吸顶表头" :desc="['`pageSticky` 在页面滚动时把表头吸在视口顶部，不需要 `scroll.y`。', '`pageStickyOffset` 可避开站点顶栏；多级表头整块吸顶。', '组合限制：依赖 CSS sticky，表头到页面根之间若有 `overflow: hidden` 祖先会被阻断（`overflow: clip` 不阻断；自定义滚动容器则吸在该容器顶部）；检测到 `scroll.x` / `scroll.y` 时忽略并 dev 告警（`scroll.y` 请用 `sticky`）。']" />

<Demo :title-level="4" path="table/page-sticky-bottom" title="页面级悬浮 · 底部表头" :desc="['表头沉底后再开 `pageSticky`：页面滚动时表头贴在视口最底部，默认不留间距；需要间距时用 `pageStickyOffset`（按底边计算）。', '不需要 `scroll.y`；多级表头整块悬浮，汇总行保留在表头上方。', '组合限制：与顶部吸顶相同，要求没有 `scroll.x` / `scroll.y`；祖先 `overflow: hidden` 会阻断。']" />

### 吸底横向滚动条

<Demo :title-level="4" path="table/bottom-scrollbar" title="吸底横向滚动条" :desc="['`bottomScrollbar` 在表格下方渲染常驻横向滚动条，拖动条或滚动表体双向同步。', '页面继续下滚时滚动条贴在视口底部，宽表不用滚到表尾才能横向拖动；固定列与浮层照常工作。', '组合限制：只在表格真实横向溢出时出现；卡片模式不渲染；设了 `scroll.y` 时不额外渲染，使用容器底部的原生横向条。']" />

## API

<!--@include: ./_api/props-sticky-scroll.md-->

## 注意事项

<!--@include: ./_api/notes-sticky-scroll.md-->
