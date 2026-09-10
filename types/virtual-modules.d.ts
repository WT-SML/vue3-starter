// 没有自带类型声明的虚拟模块
// 注意：本文件不能出现顶层 import/export，否则会被当成模块，
// 简写的 `declare module` 将失效（.d.ts 不受 moduleDetection: force 影响）

// UnoCSS 开发调试面板，仅 dev 环境生效
// https://unocss.dev/tools/inspector
declare module 'virtual:unocss-devtools'
