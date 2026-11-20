/**
 * VitePress 的 `.vp-doc` 内容规则会直接命中组件内部的 ul/ol/li/a/table 等元素，
 * 且特异性通常是（class + 元素），会压过组件自己的单类名规则。
 *
 * 构建期把 `.vp-doc` 降权为 `:where(.vp-doc)`：
 * - 组件内部：任何带类名的组件样式都能稳定胜出；
 * - 正文内容：VitePress 规则仍按原顺序生效，markdown 列表/链接外观不变。
 */
export function isolateVpDoc() {
  return {
    postcssPlugin: 'isolate-vp-doc',
    Once(root: any) {
      root.walkRules((rule: any) => {
        if (!rule.selectors?.some((selector: string) => selector.includes('.vp-doc'))) return;
        rule.selector = rule.selectors
          .map((selector: string) => selector.replaceAll('.vp-doc', ':where(.vp-doc)'))
          .join(', ')
      })
    },
  }
}

isolateVpDoc.postcss = true