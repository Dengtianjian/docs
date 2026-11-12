import { createMarkdownRenderer } from 'vitepress'
import fs from 'node:fs'
import path from 'node:path'

const root = '/development/projects/discuz/x/source/plugin/docs'
const srcDir = path.resolve(root, 'docs')
const md = await createMarkdownRenderer(srcDir, {
  lineNumbers: true,
  container: {
    tipLabel: '提示', warningLabel: '警告', dangerLabel: '危险',
    infoLabel: '信息', detailsLabel: '详细信息'
  },
  image: { lazyLoading: true }
}, '/')

const file = path.resolve(srcDir, 'php/api/foundation/builtin/deployment.md')
const src = fs.readFileSync(file, 'utf8')

const env = {
  path: file,
  relativePath: 'php/api/foundation/builtin/deployment.md',
  cleanUrls: false,
  includes: [],
  realPath: file,
  localeIndex: undefined
}
const html = md.render(src, env)

const pageData = {
  title: 'Deployment',
  titleTemplate: undefined,
  description: '',
  frontmatter: {},
  headers: env.headers ?? [],
  params: undefined,
  relativePath: 'php/api/foundation/builtin/deployment.md',
  filePath: 'php/api/foundation/builtin/deployment.md'
}
const code = `export const __pageData = JSON.parse(${JSON.stringify(JSON.stringify(pageData))})`
const script = `<script>${code}\nexport default {name:${JSON.stringify(pageData.relativePath)}}<\/script>`
const vueSrc = `${script}\n<template><div>${html}</div></template>`

const lines = vueSrc.split('\n')
console.log('total', lines.length)
for (let i = 374; i <= 383 && i < lines.length; i++) console.log(i + 1, '|', lines[i].slice(0, 500))

const sfcMod = await import('./node_modules/.pnpm/@vue+compiler-sfc@3.5.41/node_modules/@vue/compiler-sfc/dist/compiler-sfc.cjs.js')
const { parse } = sfcMod.default ?? sfcMod
try {
  parse(vueSrc, { filename: file })
  console.log('OK, total lines:', lines.length)
} catch (e) {
  console.log('FAIL', e.message)
  const m = /\((\d+):(\d+)\)/.exec(e.message)
  if (m) {
    const ln = Number(m[1])
    const lines = vueSrc.split('\n')
    for (let i = ln - 4; i <= ln + 1 && i < lines.length; i++) {
      if (i >= 0) console.log(String(i + 1).padStart(4), '|', lines[i].slice(0, 700))
    }
  }
}
