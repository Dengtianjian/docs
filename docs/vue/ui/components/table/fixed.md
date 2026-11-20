# KTable · 固定列与固定行

> 左右固定列、多行固定、表头沉底、页面级吸顶与吸底横向滚动条。

### 固定列

<Demo :title-level="4" path="table/fixed" title="固定列 + 粘性表头" :desc="['`fixed` 取 `left` / `right`，需配合数字 `width`。', '`scroll.x` 横向滚动，`scroll.y` 限制高度并让表头吸顶。', '组合限制：固定列需与数字 `scroll.x` 搭配，同侧固定列必须连续。']" />

<Demo :title-level="4" path="table/fixed-stacked" title="堆叠固定列" :desc="['同侧多列按 `width` 依次累加偏移。', '选择列 44px 自动计入左侧偏移。', '组合限制：固定列需连续，分组不能同时跨固定与非固定边界。']" />

### 固定行

<Demo :title-level="4" path="table/pinned-rows" title="固定行堆叠 × 固定列堆叠" :desc="['`rowPinning` 指定 top / bottom 行，可与左右固定列同时存在。', '固定行不受筛选、排序与分页影响，并从分页总数剔除。', '组合限制：树形下只能固定顶层行，固定带子节点的行后子树不再展示。']" />

### 表头位置与页面吸顶

<Demo :title-level="4" path="table/header-position" title="表头位置 · 顶部 / 底部" :desc="['`headerPosition` 控制表头渲染在数据行上方还是下方；表头在底部时汇总行仍在其上方。', '`sticky` 跟随位置：表头在底部时吸在滚动容器底部，多级表头整块悬浮。', '组合限制：卡片模式不渲染表头；表头沉底依赖表格行组渲染顺序，分页器仍固定在表格外。']" />

<Demo :title-level="4" path="table/header-bottom-combo" title="表头沉底 · 交互与组合" :desc="['底部表头叠加多级表头、左右固定列、选择/展开列、固定行、汇总行、排序/筛选与列拖宽。', '筛选面板在底部表头下改为向上展开；选择/展开列的整组表头贴住容器底部。', '组合限制：固定列的表头在浮层里拖拽可用，拖宽把手仍只在主表表头；卡片模式不渲染表头。']" />

<Demo :title-level="4" path="table/page-sticky" title="页面级吸顶表头" :desc="['`pageSticky` 在页面滚动时把表头吸在视口顶部，不需要 `scroll.y`。', '`pageStickyOffset` 可避开站点顶栏；多级表头整块吸顶。', '组合限制：依赖 CSS sticky，表头到页面根之间若有 `overflow: hidden` 祖先会被阻断（`overflow: clip` 不阻断；自定义滚动容器则吸在该容器顶部）；检测到 `scroll.x` / `scroll.y` 时忽略并 dev 告警（`scroll.y` 请用 `sticky`）。']" />

<Demo :title-level="4" path="table/page-sticky-bottom" title="页面级悬浮 · 底部表头" :desc="['表头沉底后再开 `pageSticky`：页面滚动时表头贴在视口最底部，默认不留间距；需要间距时用 `pageStickyOffset`（按底边计算）。', '不需要 `scroll.y`；多级表头整块悬浮，汇总行保留在表头上方。', '组合限制：与顶部吸顶相同，要求没有 `scroll.x` / `scroll.y`；祖先 `overflow: hidden` 会阻断。']" />

### 吸底横向滚动条

<Demo :title-level="4" path="table/bottom-scrollbar" title="吸底横向滚动条" :desc="['`bottomScrollbar` 在表格下方渲染常驻横向滚动条，拖动条或滚动表体双向同步。', '页面继续下滚时滚动条贴在视口底部，宽表不用滚到表尾才能横向拖动；固定列与浮层照常工作。', '组合限制：只在表格真实横向溢出时出现；卡片模式不渲染；设了 `scroll.y` 时不额外渲染，使用容器底部的原生横向条。']" />

## API

<!--@include: /vue/ui/components/table/_api/props-fixed.md-->
<!--@include: /vue/ui/components/table/_api/column-fields.md-->

## 注意事项

<!--@include: /vue/ui/components/table/_api/notes-fixed.md-->
