import { defineConfig } from 'vitepress'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

/**
 * 扫描 docs/php/api 生成「一个类一篇」的侧边栏
 *
 * 目录层级即分组层级，标题取每个 md 的第一行 `# xxx`。
 */
const directoryLabels: Record<string, string> = {
  foundation: 'Foundation · 框架基础',
  modules: 'Modules · 业务模块',
  facades: '门面 Facades',
  controllers: '控制器 Controllers',
  commands: '命令 Commands',
  crons: '定时任务 Crons',
  middlewares: '中间件 Middlewares',
  discuzx: 'DiscuzX',
  setup: '装配 Setup',
  support: '支撑 Support',
}

// API 侧边栏最大目录深度：第 4 层以上的叶子目录不再建组，平铺合并到第 4 层并加「目录路径 ·」前缀
const MAX_API_DEPTH = 4

function buildApiSidebar(dir: string, urlBase: string, depth = 0): any[] {
  if (!fs.existsSync(dir)) return []

  const entries = fs.readdirSync(dir, { withFileTypes: true })
  const files: any[] = []
  const groups: any[] = []

  for (const entry of entries.sort((a, b) => a.name.localeCompare(b.name))) {
    if (entry.isDirectory()) {
      const childDepth = depth + 1
      if (childDepth > MAX_API_DEPTH) {
        flattenLeaf(path.join(dir, entry.name), `${urlBase}/${entry.name}`, entry.name, files)
      } else {
        const children = buildApiSidebar(path.join(dir, entry.name), `${urlBase}/${entry.name}`, childDepth)
        if (children.length) {
          const label = directoryLabels[entry.name] ?? entry.name.charAt(0).toUpperCase() + entry.name.slice(1)
          groups.push({ text: label, collapsed: true, items: children })
        }
      }
      continue
    }
    if (!entry.name.endsWith('.md')) continue

    const raw = fs.readFileSync(path.join(dir, entry.name), 'utf-8')
    const matched = raw.match(/^#\s+(.+)$/m)
    const title = matched ? matched[1].trim() : entry.name.replace(/\.md$/, '')
    files.push({ text: title, link: `${urlBase}/${entry.name.replace(/\.md$/, '')}` })
  }

  return [...files, ...groups]
}

function flattenLeaf(dir: string, urlBase: string, prefix: string, out: any[]) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true }).sort((a, b) => a.name.localeCompare(b.name))) {
    if (entry.isDirectory()) {
      flattenLeaf(path.join(dir, entry.name), `${urlBase}/${entry.name}`, `${prefix}/${entry.name}`, out)
      continue
    }
    if (!entry.name.endsWith('.md')) continue

    const raw = fs.readFileSync(path.join(dir, entry.name), 'utf-8')
    const matched = raw.match(/^#\s+(.+)$/m)
    const title = matched ? matched[1].trim() : entry.name.replace(/\.md$/, '')
    out.push({ text: `${prefix} · ${title}`, link: `${urlBase}/${entry.name.replace(/\.md$/, '')}` })
  }
}

const apiSidebar = buildApiSidebar(fileURLToPath(new URL('../docs/php/api', import.meta.url)), '/php/api')

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "如意技术库文档",
  lang: 'zh-Hans',
  description: "如意技术库文档",
  lastUpdated: true,
  srcDir: "docs",
  ignoreDeadLinks: true,
  head: [
    [
      'link',
      {
        rel: 'icon',
        href: '/favicon.png'
      }
    ]
  ],
  markdown: {
    container: {
      tipLabel: '提示',
      warningLabel: '警告',
      dangerLabel: '危险',
      infoLabel: '信息',
      detailsLabel: '详细信息'
    },
    lineNumbers: true,
    image: {
      // 默认禁用图片懒加载
      lazyLoading: true
    },
    // 关闭 markdown-it-attrs：否则 PHPDoc 的 array{...} 类型标注会被解析成 HTML 属性，
    // 导致 Duplicate attribute 构建报错（手写文档未使用 {#id}/{.class} 属性语法）
    attrs: {
      disable: true
    }
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Vue', link: '/vue/index' },
      { text: 'PHP', link: '/php/getting-started' },
      { text: '微信小程序', link: '/wechat_miniProgram/token/index.html' }
    ],

    sidebar: {
      '/vue/': [
        {
          text: "介绍",
          link: "/vue/index"
        },
        {
          text: "接入与构建",
          collapsed: false,
          items: [
            {
              text: "vite 插件",
              link: "/vue/vite-plugin"
            }
          ]
        },
        {
          text: "基础能力（foundation）",
          collapsed: false,
          items: [
            {
              text: "HTTP 请求",
              link: "/vue/foundation/http"
            },
            {
              text: "cookies",
              link: "/vue/foundation/cookies"
            },
            {
              text: "eventBus",
              link: "/vue/foundation/event-bus"
            },
            {
              text: "file",
              link: "/vue/foundation/file"
            },
            {
              text: "helper",
              link: "/vue/foundation/helper"
            },
            {
              text: "naiveUI",
              link: "/vue/foundation/naive-ui"
            }
          ]
        },
        {
          text: "服务（services）",
          collapsed: false,
          items: [
            {
              text: "SettingFormService",
              link: "/vue/services/setting-form"
            },
            {
              text: "commonService",
              link: "/vue/services/common"
            },
            {
              text: "dayjsService",
              link: "/vue/services/dayjs"
            },
            {
              text: "naiveUIService",
              link: "/vue/services/naive-ui"
            },
            {
              text: "generateRouterMenuOptions",
              link: "/vue/services/naive-router-menu"
            },
            {
              text: "DiscuzXSettingFormService",
              link: "/vue/services/discuzx-setting-form"
            }
          ]
        },
        {
          text: "组件（components）",
          collapsed: false,
          items: [
            {
              text: "Base",
              collapsed: false,
              items: [
                {
                  text: "AnthorFloating",
                  link: "/vue/components/base/AnthorFloating"
                },
                {
                  text: "RPanel",
                  link: "/vue/components/base/RPanel"
                },
                {
                  text: "RCopyText",
                  link: "/vue/components/base/RCopyText"
                },
                {
                  text: "RKeepAliveRouterView",
                  link: "/vue/components/base/RKeepAliveRouterView"
                },
                {
                  text: "RRouterMenu",
                  link: "/vue/components/base/RRouterMenu"
                },
                {
                  text: "RSpace",
                  link: "/vue/components/base/RSpace"
                },
                {
                  text: "RStatus",
                  link: "/vue/components/base/RStatus"
                },
                {
                  text: "RCommonFooter",
                  link: "/vue/components/base/RCommonFooter"
                },
                {
                  text: "RTwoColumnLayout",
                  link: "/vue/components/base/RTwoColumnLayout"
                }
              ]
            },
            {
              text: "Naive",
              collapsed: false,
              items: [
                {
                  text: "NaiveUIProvider",
                  link: "/vue/components/naive/NaiveUIProvider"
                },
                {
                  text: "NaiveUIMenu",
                  link: "/vue/components/naive/NaiveUIMenu"
                },
                {
                  text: "NaiveUIMenuLink",
                  link: "/vue/components/naive/NaiveUIMenuLink"
                },
                {
                  text: "RNaiveConfig",
                  link: "/vue/components/naive/RNaiveConfig"
                },
                {
                  text: "RNaiveFormItem",
                  link: "/vue/components/naive/RNaiveFormItem"
                },
                {
                  text: "RNaiveRouterMenu",
                  link: "/vue/components/naive/RNaiveRouterMenu"
                },
                {
                  text: "RNaiveRouterTabs",
                  link: "/vue/components/naive/RNaiveRouterTabs"
                },
                {
                  text: "RNaiveUpload",
                  link: "/vue/components/naive/RNaiveUpload"
                },
                {
                  text: "RCenterPagination",
                  link: "/vue/components/naive/RCenterPagination"
                }
              ]
            },
            {
              text: "DiscuzX",
              collapsed: false,
              items: [
                {
                  text: "RDiscuzXUploadAttachment",
                  link: "/vue/components/discuzx/RDiscuzXUploadAttachment"
                },
                {
                  text: "RDiscuzXUploadFile",
                  link: "/vue/components/discuzx/RDiscuzXUploadFile"
                }
              ]
            }
          ]
        },
        {
          text: "接口（api）",
          collapsed: false,
          items: [
            {
              text: "common",
              link: "/vue/api/index"
            },
            {
              text: "DiscuzX",
              link: "/vue/api/discuzx"
            }
          ]
        },
        {
          text: "类型（types）",
          collapsed: false,
          items: [
            {
              text: "类型一览",
              link: "/vue/types/index"
            }
          ]
        }
      ],
      '/php/': [
        {
          text: "开始",
          collapsed: false,
          items: [
            { text: "简介", link: "/php/" },
            { text: "快速开始", link: "/php/getting-started" }
          ]
        },
        {
          text: "核心概念",
          collapsed: false,
          items: [
            { text: "应用与装配", link: "/php/guide/app" },
            { text: "容器", link: "/php/guide/container" },
            { text: "模块机制", link: "/php/guide/modules" }
          ]
        },
        {
          text: "框架功能",
          collapsed: false,
          items: [
            { text: "门面", link: "/php/framework/facade" },
            { text: "配置", link: "/php/framework/config" },
            { text: "缓存", link: "/php/framework/cache" },
            { text: "日志", link: "/php/framework/log" },
            { text: "事件", link: "/php/framework/event" },
            { text: "生命周期", link: "/php/framework/lifecycle" },
            { text: "路由", link: "/php/framework/router" },
            { text: "控制器", link: "/php/framework/controller" },
            { text: "中间件", link: "/php/framework/middleware" },
            { text: "验证", link: "/php/framework/validation" },
            { text: "文件系统", link: "/php/framework/filesystem" },
            { text: "数据工具", link: "/php/framework/data" },
            { text: "对象基类", link: "/php/framework/object" }
          ]
        },
        {
          text: "模块",
          collapsed: false,
          items: [
            { text: "认证", link: "/php/modules/auth" },
            { text: "设置", link: "/php/modules/setting" },
            { text: "存储", link: "/php/modules/storage" },
            { text: "Redis", link: "/php/modules/redis" },
            { text: "云服务", link: "/php/modules/cloud" },
            { text: "微信", link: "/php/modules/wechat" }
          ]
        },
        {
          text: "基础",
          collapsed: false,
          items: [
            { text: "HTTP", link: "/php/basics/http" },
            { text: "数据库", link: "/php/basics/database" },
            { text: "控制台与计划任务", link: "/php/basics/console" }
          ]
        },
        {
          text: "运维",
          collapsed: false,
          items: [
            { text: "安装 / 升级 / 卸载", link: "/php/ops/deploy" },
            { text: "异常与错误", link: "/php/ops/errors" }
          ]
        },
        {
          text: "API 参考（按类）",
          collapsed: true,
          items: apiSidebar
        }
      ],
      '/wechat_miniProgram/': [
        {
          text: "开发指南",
          items: [
            {
              text: "设计变量",
              link: "/wechat_miniProgram/token/index"
            },
            {
              text: "图标",
              link: "/wechat_miniProgram/icons/index"
            },
            {
              text: "组件",
              items: [
                {
                  text: "面板",
                  collapsed: false,
                  items: [
                    {
                      text: "面板列表",
                      link: "/wechat_miniProgram/components/panel/panelList"
                    },
                    {
                      text: "普通面板",
                      link: "/wechat_miniProgram/components/panel/panel"
                    },
                    {
                      text: "内嵌面板",
                      link: "/wechat_miniProgram/components/panel/innerPanel"
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ],

    docFooter: {
      prev: '上一页',
      next: '下一页'
    },
    search: {
      provider: 'local',
      options: {
        locales: {
          zh: {
            translations: {
              button: {
                buttonText: '搜索文档',
                buttonAriaLabel: '搜索文档'
              },
              modal: {
                noResultsText: '无法找到相关结果',
                resetButtonTitle: '清除查询条件',
                footer: {
                  selectText: '选择',
                  navigateText: '切换'
                }
              }
            }
          }
        }
      }
    }
  }
})
