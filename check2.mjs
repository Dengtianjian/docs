import { createMarkdownRenderer } from 'vitepress'
import fs from 'node:fs'
const sfcMod = await import('./node_modules/.pnpm/@vue+compiler-sfc@3.5.41/node_modules/@vue/compiler-sfc/dist/compiler-sfc.cjs.js')
const { parse } = sfcMod.default ?? sfcMod
const root = '/development/projects/discuz/x/source/plugin/docs'
const md = await createMarkdownRenderer(root, { lineNumbers: true }, '/')
for (const f of process.argv.slice(2)) {
  const src = fs.readFileSync(f, 'utf8')
  const html = md.render(src, { path: f })
  const sfc = `<template><div>${html}</div></template>`
  try { parse(sfc, { filename: f }); console.log('OK', f.split('/').pop()) }
  catch (e) {
    console.log('FAIL', f.split('/').pop(), e.message)
    const m = /\((\d+):(\d+)\)/.exec(e.message)
    if (m) { const lines = sfc.split('\n'); console.log('line>', (lines[Number(m[1])-1]||'').slice(0,300)) }
  }
}
