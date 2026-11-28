<script setup lang="ts">
</script>

<template>
  <details class="k-doc-common-props">
    <summary>公共 Props（render / classNames / styles）<span class="k-doc-common-props__hint">所有组件通用，展开查看</span></summary>
    <table>
      <thead>
        <tr>
          <th>属性</th>
          <th>说明</th>
          <th>类型</th>
          <th>默认值</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><code>render</code></td>
          <td>headless render prop；<code>#render</code> 插槽优先，提供任一时整件视觉输出被替换</td>
          <td><code>(scope: KXxxRenderScope) =&gt; VNodeChild</code></td>
          <td>—</td>
        </tr>
        <tr>
          <td><code>classNames</code></td>
          <td>默认模板各部件类名</td>
          <td><code>Partial&lt;Record&lt;Part, string&gt;&gt;</code></td>
          <td>—</td>
        </tr>
        <tr>
          <td><code>styles</code></td>
          <td>默认模板各部件样式</td>
          <td><code>Partial&lt;Record&lt;Part, CSSProperties&gt;&gt;</code></td>
          <td>—</td>
        </tr>
      </tbody>
    </table>
    <p>
      通用契约见 <a href="../headless.html">headless 自定义渲染</a>；scope 类型以各组件导出为准（
      <code>KXxxRenderScope</code>），<code>classNames</code> / <code>styles</code> 只作用于默认模板。
    </p>
  </details>
</template>

<style scoped>
.k-doc-common-props {
  margin: 12px 0 0;
  padding: 0 16px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background-color: var(--vp-c-bg-soft);
}
.k-doc-common-props summary {
  padding: 12px 0;
  font-size: 14px;
  color: var(--vp-c-text-1);
  cursor: pointer;
  user-select: none;
}
.k-doc-common-props summary:hover {
  color: var(--vp-c-brand-1);
}
.k-doc-common-props[open] summary {
  padding-bottom: 8px;
  border-bottom: 1px solid var(--vp-c-divider);
}
.k-doc-common-props__hint {
  margin-left: 8px;
  font-size: 12px;
  color: var(--vp-c-text-3);
}
.k-doc-common-props table {
  margin: 8px 0 0;
}
.k-doc-common-props p {
  margin: 8px 0 12px;
  font-size: 13px;
  line-height: 22px;
  color: var(--vp-c-text-2);
}
</style>
