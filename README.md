# Vue3 Starter

这是一个 vue3 的快速启动模板。

该项目模板基于 Vite、Vue3、TypeScript、SCSS。

- node 版本: `v24.20.0`
- pnpm 版本: `v12.3.4`

## 已集成功能

- 文件路由、layout 布局、keep-alive 页面缓存
- Naive UI、多主题、暗黑模式、UnoCSS
- 封装好的 http 请求、mock 接口、vue-request
- 国际化：中 / 英切换，Naive UI 组件语言同步
- 登录与鉴权：登录页、路由守卫（登录鉴权 + 角色鉴权）、登录态持久化
- Vue 相关 API 自动导入
- 一些内置功能：
  - 图标：UnoCSS 图标预设 + Carbon 图标集（`i-carbon-*`）
  - 编写好的路由守卫
  - 一些 composables（`useAuth` / `useTheme` / `useDark` / `useI18n` / `useShortcutKeys`）
  - 一些常用的工具函数（含基于 jsencrypt 的本地加解密）
  - emitter 全局事件总线
  - 快捷键（基于 `useMagicKeys`）
  - 导航栏一键切换主题 / 明暗 / 语言（登录页也可切换语言）
  - `/login` 登录页（支持记住密码）、`/example` 示例页、`/` 首页、404 兜底

## 开始使用

```bash
pnpm install
pnpm dev     # 启动开发服务（端口 3000）
pnpm build   # 类型检查 + 打包
```

完整的开发说明（脚本、目录结构、环境变量、编码约定、各类功能的增改方式）见 [AGENTS.md](./AGENTS.md)。
