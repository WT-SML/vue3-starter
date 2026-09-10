# AGENTS.md

本文件是 Vue3 Starter 的开发说明，面向开发者与 AI 编码代理。

项目简介与已集成功能见 `README.md`。

## 技术栈与依赖版本

| 依赖                         | 版本     | 说明                        |
| ---------------------------- | -------- | --------------------------- |
| vue                          | ^3.5.42  |                             |
| vue-router                   | ^5.3.1   | 文件路由已内置到核心包      |
| vue-i18n                     | ^11.4.10 |                             |
| naive-ui                     | ^2.45.3  |                             |
| @vueuse/core                 | ^14.4.0  |                             |
| vue-request                  | ^2.0.4   | `useRequest` 已在自动导入中 |
| axios                        | ^1.20.0  |                             |
| mitt                         | ^3.0.1   | 全局事件总线                |
| jsencrypt                    | ^3.5.4   | 本地加解密                  |
| unocss                       | ^66.10.1 | 图标 preset-icons           |
| @iconify-json/carbon         | ^1.2.26  | Carbon 图标集数据源         |
| vite                         | ^8.2.2   |                             |
| typescript                   | ~6.0.2   |                             |
| vue-tsc                      | ^3.3.11  |                             |
| unplugin-auto-import         | ^21.1.0  | API 自动导入                |
| unplugin-vue-components      | ^32.1.0  | 组件自动导入                |
| vite-plugin-vue-layouts-next | ^3.0.0   | layout 布局                 |
| vite-plugin-mock             | ^3.0.2   | mock 接口                   |
| vite-plugin-compression      | ^0.5.1   | gzip 压缩产物               |
| sass-embedded                | ^1.104.0 | SCSS 编译                   |
| eslint                       | ^10.10.0 | flat config                 |
| prettier                     | ^3.9.6   | 代码格式化                  |
| yaml                         | ^2.9.0   | 解析 `locales/*.yml`        |
| mockjs                       | ^1.1.0   | mock 数据生成               |

运行时要求：node `>=24.20.0`，pnpm `12.3.4`。

## 常用脚本

```bash
pnpm install
pnpm dev           # 启动开发服务（vite --host）
pnpm build         # 类型检查 + 打包
pnpm preview       # 预览打包产物
pnpm typecheck     # 只做类型检查
pnpm lint          # ESLint 检查
pnpm lint:fix      # ESLint 自动修复
pnpm format        # Prettier 格式化
pnpm format:check  # 检查格式是否符合 Prettier
```

`build` 是 `vue-tsc -b && vite build`，类型检查在打包之前，类型不通过不会产出产物。

开发服务端口为 `3000`（`vite.config.ts` 的 `server.port`），后端代理在该文件的 `server.proxy` 里，默认注释掉、需要时取消注释即可。

## 目录结构

```
├── locales/                    # 国际化文案（yml）
├── mock/                       # mock 接口
├── public/                     # 静态资源（favicon）
├── types/                      # 全部类型声明文件
│   ├── env.d.ts                # 环境变量类型
│   ├── global.d.ts             # window 等全局类型扩展
│   ├── router.d.ts             # RouteMeta 扩展
│   ├── axios.d.ts              # AxiosRequestConfig 扩展（query 参数）
│   ├── virtual-modules.d.ts    # 无自带类型的虚拟模块声明
│   ├── auto-imports.d.ts       # 【自动生成】API 自动导入声明
│   ├── components.d.ts         # 【自动生成】组件自动导入声明
│   └── route-map.d.ts          # 【自动生成】路由类型声明
├── src/
│   ├── apis/                   # 接口定义，一个模块一个文件
│   │   └── types/              # 接口出入参类型，index.ts 为统一出口
│   ├── assets/                 # 需要被打包处理的静态资源（当前为空）
│   ├── components/common/      # 公共组件（nav.vue、naive-provider.vue）
│   ├── composables/            # 组合式函数（useAuth 等，见下文一览表）
│   ├── constants/              # 常量（role、evt-name、safe、enum）
│   ├── http/                   # http 封装（index.ts、status.ts）
│   ├── layouts/                # 布局（default、empty、nav）
│   ├── pages/                  # 页面（文件路由）
│   ├── plugins/                # 应用插件（index、i18n、router）
│   ├── styles/                 # 全局样式
│   ├── theme/                  # naive-ui 主题，文件名取主色 hex
│   ├── tools/                  # 工具函数（index.ts、emitter.ts）
│   ├── App.vue
│   └── main.ts
├── eslint.config.ts            # ESLint flat config
├── uno.config.ts               # UnoCSS 配置
├── vite.config.ts              # 项目配置（dev server 端口、proxy）
└── vite.base.config.ts         # 通用 vite 配置（插件、别名）
```

## 自动生成的类型声明

`types/` 下带 **【自动生成】** 标记的三个文件由 Vite 插件产出，不需要手动维护，也**不要手动修改**：

| 文件                      | 生成方                    | 作用                                                                  |
| ------------------------- | ------------------------- | --------------------------------------------------------------------- |
| `types/auto-imports.d.ts` | `unplugin-auto-import`    | 声明 `ref` / `computed` / `useRouter` / `useStorage` 等自动导入的 API |
| `types/components.d.ts`   | `unplugin-vue-components` | 声明 `<n-button>` 等自动导入的组件                                    |
| `types/route-map.d.ts`    | `vue-router/vite`         | 声明 `vue-router/auto-routes` 的模块与路由名映射                      |

生成时机：

- `pnpm dev` / `pnpm build` 启动时生成；
- **开发服务运行期间新增 / 删除 / 重命名 `src/pages/` 下的页面时，会自动重新生成**，不需要重启；
- 已加入 `.gitignore` 与 `.prettierignore`，不提交、不格式化。

> ⚠️ 首次拉到代码后需要先跑一次 `pnpm dev` 生成这三个文件，否则 `pnpm build` 会因 `vue-tsc` 找不到自动导入的声明而报错。

## 使用说明

### 新增页面

在 `src/pages/` 下新建 `.vue` 文件即可，路由会自动生成。文件名即路由路径（`src/pages/user/list.vue` → `/user/list`，`[...notFound].vue` 为 404 兜底）。

页面通过 `<route lang="json">` 自定义块声明 meta：

```vue
<route lang="json">
{
	"meta": {
		"title": "示例页面",
		"layout": "nav",
		"auth": false,
		"roles": ["*"],
		"keep": false
	}
}
</route>
```

meta 字段（类型声明见 `types/router.d.ts`）：

| 字段     | 类型       | 说明                                          |
| -------- | ---------- | --------------------------------------------- |
| `title`  | `string`   | 页面标题，拼接为 `标题 - VITE_APP_TITLE`      |
| `layout` | `string`   | 使用的 layout，对应 `src/layouts/` 下的文件名 |
| `auth`   | `boolean`  | 是否需要登录                                  |
| `roles`  | `string[]` | 允许访问的角色 key，`["*"]` 表示不限制        |
| `keep`   | `boolean`  | 是否 keep-alive 缓存                          |

`roles` 里写的是**角色 key**（如 `ROLE_ADMIN`），不是后端的数字 `roleId`，详见「登录与鉴权」。

`<route>` 块能被 Volar / `vue-tsc` 识别，靠的是 `tsconfig.json` 里的 `vueCompilerOptions.plugins`（`vue-router/volar/sfc-typed-router` 与 `sfc-route-blocks`），改动自定义块写法前先确认这里没被删。

### 新增 layout

在 `src/layouts/` 下新建 `.vue` 文件，在页面 meta 的 `layout` 中引用即可。

**keep-alive 由 layout 自己实现**：`nav.vue` 与 `empty.vue` 里各有一份 `router-view` + `keep-alive` 的模板（按 `$route.meta.keep` 决定是否缓存、以 `$route.name` 作为 key），新建 layout 时如果要支持 `keep: true`，需要把这段模板一起复制过去。`default.vue` 只有裸的 `<router-view />`，**没有** keep-alive。

### 新增接口

接口定义放 `src/apis/`，出入参类型放 `src/apis/types/`，`request` 会自动解包后端的 `data` 字段：

```ts
// src/apis/types/user.ts
export interface UserInfo {
	id: number
	nickname: string
}

// src/apis/user.ts
import request from '~/http'
import type { UserInfo } from '~/apis/types'

export const getUserInfo = (params: { id: number }) =>
	request<UserInfo>({
		url: `/user/info`,
		method: 'get',
		params,
	})
```

#### 接口类型的组织方式

`src/apis/types/` 按「一个接口模块一个文件」拆分，`index.ts` 是唯一出口：

| 文件        | 作用                                                    |
| ----------- | ------------------------------------------------------- |
| `index.ts`  | 统一出口，业务侧一律从 `~/apis/types` 引入              |
| `common.ts` | 跨模块通用类型（当前是后端统一返回结构 `ApiResult<T>`） |
| `user.ts`   | 用户模块的出入参（`LoginParams`、`LoginResult`）        |

新增接口模块时，在 `types/` 下按模块名新建文件，并在 `index.ts` 里追加一行 `export type * from './模块名'`；`src/apis/` 下的接口文件只保留请求函数，不再就地声明 interface。

#### 请求参数的约定（重要）

封装对参数做了自动归位，业务代码**统一用 `params` 传参**，不需要关心它最终进 query 还是 body：

| 参数     | get 请求  | 非 get 请求                        |
| -------- | --------- | ---------------------------------- |
| `params` | URL query | **request body**                   |
| `query`  | URL query | URL query（需要额外拼 URL 时使用） |

```ts
// get：params 走 URL → /user/list?page=1
request({ url: '/user/list', method: 'get', params: { page: 1 } })

// post：params 走 body，query 走 URL → /user/save?from=web  body: { name: 'a' }
request({
	url: '/user/save',
	method: 'post',
	params: { name: 'a' },
	query: { from: 'web' },
})
```

`query` 是对 axios 配置的类型扩展，声明在 `types/axios.d.ts`。

#### 响应处理

- 后端返回形如 `{ code, msg, data }` 时，`request` 返回 `data`，`code !== 200` 会 toast 报错并 reject。
- 后端直接返回数组 / 字符串 / 不带 `code` 的对象时，`request` 原样返回，不会当成错误（由 `isApiResult()` 类型守卫判断）。
- 响应体解包只在 `request` 里做一次，响应拦截器只处理 HTTP 层面错误。
- HTTP 401 与业务 `code === 401` 都会清空登录态并跳转登录页，并发时只会跳转一次（`handleUnauthorized()`）。
- 请求头会自动注入 `Authorization`（登录后，取 `currentUser.token`）与语言参数（`VITE_APP_REQ_LOCALE_KEY`，值为当前 locale）。
- HTTP 错误文案取自 `src/http/status.ts` 的 `getHttpCodeMsg()`，对应 i18n 的 `serverTips.*`。

### 登录与鉴权

登录页是 `src/pages/login.vue`：用 `useRequest(login, { manual: true })` 调 `POST /user/login`，成功后把返回的用户信息写进 `currentUser`，再跳转 `/example`。

登录态的唯一来源是 `src/composables/useAuth.ts`（模块级单例，基于 `useStorage` + `VITE_APP_AUTH_USER_KEY` 持久化）：

| 导出          | 说明                                                                                          |
| ------------- | --------------------------------------------------------------------------------------------- |
| `currentUser` | 可写 ref，`AuthUser = Partial<LoginResult> & { dziToken?: string }`                           |
| `isLoggedIn`  | 用户对象非空即为 `true`                                                                       |
| `role`        | 用 `roleOptions`（`src/constants/role.ts`）把 `roleId` 映射成角色 key，未登录时为 `undefined` |

要点：

- **`role` 返回的是角色 key，不是 `roleId`**：`roleOptions` 里 `value` 是后端的数字 `roleId`，`key` 是业务用的字符串（`ROLE_ADMIN` / `ROLE_GENERAL_USER`）。因此页面 meta 的 `roles` 必须写 key：

  ```json
  { "meta": { "auth": true, "roles": ["ROLE_ADMIN"] } }
  ```

  守卫会把 `role` 转成字符串后与 `roles` 比较，`roles` 含 `"*"` 时不校验。

- 退出登录 / 登录失效只需把 `currentUser.value` 置为 `{}`（`handleUnauthorized()` 就是这么做并顺手跳转登录页）。
- **记住密码**：登录页勾选后把账号明文、密码 `localEncrypt(...)` 加密后存进 `memorized-account`，下次进入自动回填。**公私钥都在前端**（`src/constants/safe.ts`），所以这只是「不让密码以明文躺在 localStorage 里」，**不是安全加密**，不要用于真正的敏感数据保护。
- 未登录 / 角色不足时的提示文案取自 i18n 的 `routerTips.auth`、`routerTips.role`。

### 国际化

文案在 `locales/zh-CN.yml` 与 `locales/en-US.yml` 中同名 key 一一对应，**新增文案时两个文件都要加**。

#### 新增文案

在 yml 里加 key，通过 `t()` 使用：

```ts
const { t } = useI18n()
t('routerTips.auth')
```

yml 由 `src/plugins/i18n.ts` 用 `import.meta.glob(..., { query: '?raw' })` 全量加载，再用 `yaml` 解析成 `{ 'zh-CN': {...}, 'en-US': {...} }`，**新增 yml 文件不需要改代码**（文件名即 locale key）。当前已有文案分组：`home`、`routerTips.*`、`serverTips.*`。

#### `useI18n` 与语言切换

`src/composables/useI18n.ts` 是唯一的 i18n 入口：

| 导出            | 说明                                                                   |
| --------------- | ---------------------------------------------------------------------- |
| `t`             | 翻译函数                                                               |
| `locale`        | 当前 locale 的 ref（`zh-CN` / `en-US`）                                |
| `localeLabel`   | 当前语言的显示名，用于下拉展示                                         |
| `localeOptions` | `n-dropdown` 的选项，同时携带 naive-ui 的 `locale` / `dateLocale`      |
| `changeLocale`  | 切换语言                                                               |
| `naiveLocale`   | 当前语言对应的 naive-ui locale，`App.vue` 用它喂给 `n-config-provider` |

- 语言选择通过 `useStorage('locale', 'zh-CN')` 持久化，`src/plugins/i18n.ts` 里用 `syncRef` 让存储与 `i18n.global.locale` 双向同步。
- naive-ui 组件自身的文案（日期、分页等）跟随 `naiveLocale` 一起切换，切换入口在导航栏（`src/components/common/nav.vue`）和登录页右上角。
- `serverTips.*` 供 `src/http/status.ts` 使用，`routerTips.*` 供路由守卫使用。

### 使用图标

图标由 UnoCSS 的 `preset-icons` 提供，数据源是 [Carbon](https://carbondesignsystem.com/elements/icons/library/) 图标集（`@iconify-json/carbon`，Apache-2.0）。图标在构建时被编译成内联 SVG 的 CSS（mask），**不产生额外请求，也不需要任何字体文件**。

类名规则为 `i-carbon-<图标名>`，图标名在 [Icônes](https://icones.js.org/collection/carbon) 或 [Iconify Carbon 合集](https://icon-sets.iconify.design/carbon/) 查询：

```vue
<!-- 图标大小随 font-size 缩放，颜色随 color 变化 -->
<i class="i-carbon-chevron-down" />
<i class="i-carbon-user text-22px text-[#8B919E]" />
<button class="i-carbon-sun dark:i-carbon-moon" />
```

配置见 `uno.config.ts`：

| 选项              | 值                        | 说明                                           |
| ----------------- | ------------------------- | ---------------------------------------------- |
| `scale`           | `1.2`                     | 图标尺寸 = `font-size * 1.2`，补偿 Carbon 留白 |
| `warn`            | `true`                    | 图标名写错时在终端告警，避免静默失效           |
| `extraProperties` | `inline-block` / `middle` | 让图标在文字中垂直居中，可当行内元素用         |

注意事项：

- 图标名写错时**不会报错**，只是不产生任何 CSS，页面上什么都看不到；此时终端会有 `failed to load icon "i-carbon-xxx"` 告警，按告警里的名字去核对拼写。
- 想换图标集只需 `pnpm add -D @iconify-json/<集名>`，类名相应变成 `i-<集名>-<图标名>`（如 `i-mdi-alarm`），**不需要改 `uno.config.ts`**：Node 环境下 preset 会自动扫描已安装的 `@iconify-json/*`。
- Carbon 是单色图标集，走 `mask` + `background-color: currentColor` 渲染，所以用 `text-*` 改颜色即可；多色图标集会走 `background-img`，颜色不可改（可用 `?mask` 强制）。
- 不要往 `public/` 里放字体图标文件（iconfont 之类），图标统一走这条链路。

### 主题与明暗模式

主题只决定**配色（主色）**，明暗由 `src/composables/useDark.ts` 的开关独立控制，两者互不影响：切主题不会进暗色模式，切明暗也不会换主色。切换入口都在导航栏（`src/components/common/nav.vue`），`App.vue` 把两者一起喂给 `n-config-provider`（`:theme` 必须是 `App.vue` 里最外层的 provider，否则 `window.$message` 拿不到暗黑主题）。

#### 新增主题

在 `src/theme/` 下新建文件（文件名取主色 hex，如 `1677ff.ts`），导出一个 `GlobalThemeOverrides`，再在 `src/composables/useTheme.ts` 的 `themes` 数组中注册：

```ts
const themes = [
	{ label: '蓝色', key: '1677ff', value: theme1677ff },
	// ...
]
```

- `label`：下拉里显示的名字；`key`：持久化到 localStorage 的标识（`useStorage('theme', ...)`）。
- **`themes[0]` 就是默认主题**，调整顺序即可换默认值。
- 存的值不在 `themes` 里时会自动回退到 `themes[0]`，所以删掉 / 重命名旧主题不会让老用户卡在空主题上。

`GlobalThemeOverrides` 的 `common` 里至少要给全主色的四个状态，否则 hover / pressed 会退回 naive-ui 默认色，和主色不搭：

| 字段                  | 说明                                       |
| --------------------- | ------------------------------------------ |
| `primaryColor`        | 主色                                       |
| `primaryColorHover`   | 悬停态，约定比主色**亮**                   |
| `primaryColorPressed` | 按下态，约定比主色**暗**                   |
| `primaryColorSuppl`   | 补充态（如开关打开时的颜色），一般同 hover |

当前主题：

| label | key      | 主色                                                      |
| ----- | -------- | --------------------------------------------------------- |
| 蓝色  | `1677ff` | `#1677ff`（默认），四个状态都给全                         |
| 绿色  | `18a058` | 直接沿用 naive-ui 内置绿，因此只额外覆盖了 `borderRadius` |

#### `useTheme` / `useDark` 对外接口

| composable | 导出                                                                        |
| ---------- | --------------------------------------------------------------------------- |
| `useTheme` | `themes`、`theme`、`themeLabel`、`changeTheme`、`themeOverrides`            |
| `useDark`  | `isDark`、`toggleDark`、`darkOptions`、`darkKey`、`changeDark`、`darkLabel` |

明暗由 @vueuse/core 的 `useDark` 实现：在 `<html>` 上切换 `dark` class 并持久化（localStorage key 为 `vueuse-color-scheme`，初始值 `auto`，即跟随系统）。暗色下的页面底色与滚动条样式写在 `src/styles/main.scss` 的 `html.dark` 里。

### 工具函数与本地加解密

工具函数统一从 `src/tools`（即 `src/tools/index.ts`）引入：

| 函数                                     | 说明                                                     |
| ---------------------------------------- | -------------------------------------------------------- |
| `stringToBoolean(v?)`                    | 字符串 `'true'` 转布尔，常用于读 env 变量                |
| `localEncrypt(text)` / `localDecrypt(c)` | 基于 jsencrypt 的本地加解密，见下方注意事项              |
| `getLabelByVal(val, options, v, l)`      | 按值在选项数组里取 label，取不到返回 `null`              |
| `formatFileSize(bytes, decimalPoint?)`   | 格式化文件大小（1000 进制）                              |
| `getImageSize(src)`                      | 获取图片宽高，失败返回 `{ width: 0, height: 0 }`         |
| `formatNumber(num)`                      | 数字格式化，≥ 1000 显示为 `K`、≥ 100 万显示为 `M`        |
| `compare(propertyName, isAscending?)`    | 生成数组排序比较函数                                     |
| `commonProvide(provideId)`               | 配合事件总线「提供一个东西」，见「事件总线」             |
| `isFocusInput()`                         | 当前焦点是否在 `input` / `textarea` 上，判断快捷键时常用 |
| `getExt(fileName)`                       | 取文件后缀，无后缀返回空串                               |

本地加解密：

```ts
import { localEncrypt, localDecrypt } from '~/tools'

const cipher = localEncrypt('明文')
const plain = localDecrypt(cipher)
```

- 密钥（`LOCAL_PUBLIC_KEY_CER` / `LOCAL_PRIVATE_KEY`）写在 `src/constants/safe.ts`。
- 加解密对**纯字符串**有效，空串、非字符串入参会返回空串，调用侧要自己兜底。
- 用途仅限「本地存储混淆」（如登录页记住密码）。**私钥也在前端**，任何人都能解开，因此**不能**当作安全机制，敏感数据必须走后端加密。

### composables 与全局单例

`src/composables/` 下的每个文件都是同一种写法：**状态定义在模块顶层，默认导出一个工厂函数**，所以多次调用拿到的是同一份状态（模块级单例）。这也正是 `useAuth` 能在路由守卫、请求层、页面之间共享登录态的原因。

| composable        | 说明                           |
| ----------------- | ------------------------------ |
| `useAuth`         | 登录态，见「登录与鉴权」       |
| `useTheme`        | 配色主题，见「主题与明暗模式」 |
| `useDark`         | 明暗模式，见「主题与明暗模式」 |
| `useI18n`         | 国际化，见「国际化」           |
| `useShortcutKeys` | 快捷键，见「快捷键」           |

### 事件总线

`src/tools/emitter.ts` 用 mitt 暴露全局 emitter，事件名与载荷类型在 `src/constants/evt-name.ts`：

```ts
import emitter from '~/tools/emitter'
import { COMMON_PROVIDE } from '~/constants/evt-name'

emitter.emit(COMMON_PROVIDE, { provideId: 'user-info', data: {} })
emitter.on(COMMON_PROVIDE, (payload) => {})
```

`commonProvide(provideId)` 是对「等一个东西准备好」的封装：调用它会返回 Promise，收到 `provideId` 匹配的 `COMMON_PROVIDE` 事件后 resolve（并自动 `off`），适合先拿到某个组件实例 / 数据后再继续的场景。

### 快捷键

`src/composables/useShortcutKeys.ts` 基于 @vueuse/core 的 `useMagicKeys`：

```ts
const { keys, matchKey } = useShortcutKeys()

const hit = matchKey(keys.value, [
	{ keys: ['ctrl+s', 'meta+s'], action: 'save' },
])
```

`matchKey(current, shortcutKeys)` 会遍历配置，**当前按下的按键集合里命中任意一个 `keys` 项就返回该配置**（返回首个命中项，否则 `null`）；它不做「组合键必须同时按下」的严格判定，配置项里可以放任意附加字段（如 `action`），由调用方自己分发。判断是否需要忽略快捷键时配合 `isFocusInput()` 使用。

### mock 接口

`mock/` 下的文件会被 `vite-plugin-mock` 自动加载，开关为 `.env` 中的 `VITE_APP_MOCK_OPEN`（`stringToBoolean` 判断，只有字面量 `true` 才算开）。

mock 的 `url` 要写全前缀，例如登录是 `/api/user/login`，因为 `VITE_APP_API_BASE_URL` 是 `/api`；接口文件里只写 `/user/login`。

### 路径别名

`~` 与 `@` 均指向 `src`，在 `vite.base.config.ts`（`resolve.alias`）与 `tsconfig.app.json`（`compilerOptions.paths`）中同步配置，改动时两处都要改。

## 本地存储 key 一览

| key                   | 写入方                                | 说明                    |
| --------------------- | ------------------------------------- | ----------------------- |
| `authUser`            | `useAuth`（`VITE_APP_AUTH_USER_KEY`） | 登录用户信息            |
| `theme`               | `useTheme`                            | 主题 key，如 `1677ff`   |
| `locale`              | `src/plugins/i18n.ts`                 | 语言，`zh-CN` / `en-US` |
| `vueuse-color-scheme` | @vueuse/core 的 `useDark`             | 明暗模式                |
| `memorized-account`   | `src/pages/login.vue`                 | 记住密码，密码为密文    |

## 依赖安装与 pnpm 配置

`pnpm-workspace.yaml` 在本项目里不用于 monorepo，而是放 pnpm 的安装策略：

- `allowBuilds`：安装脚本（preinstall / install / postinstall）审批表，`true` 放行、`false` 禁止，**未列出的包一律按未审批处理并禁止执行脚本**。因此新增带安装脚本的依赖（原生模块、需要下载二进制的包等）后，必须在这里补一条，否则 `pnpm install` 会以 `ERR_PNPM_IGNORED_BUILDS` 失败。
- `minimumReleaseAgeExclude`：跳过「最小发布时长」校验的包名单，目前放了 `unocss` 与 `@unocss/*`（两者发版频繁，等待默认的 1 天会让 `pnpm update` 静默回退到旧版本）。

## 环境变量

| 变量                            | 说明                   |
| ------------------------------- | ---------------------- |
| `VITE_APP_TITLE`                | 网页基础 title         |
| `VITE_APP_AUTHOR`               | 作者                   |
| `VITE_APP_VERSION_CODE_PUBLISH` | 发布版本号             |
| `VITE_APP_VERSION_CODE_FULL`    | 完整版本号             |
| `VITE_APP_API_BASE_URL`         | 后端接口 BASE_URL      |
| `VITE_APP_REQ_TIMEOUT`          | 后端接口超时时间（秒） |
| `VITE_APP_REQ_LOCALE_KEY`       | 后端接口语言的 key     |
| `VITE_APP_AUTH_USER_KEY`        | 登录用户信息存储的 key |
| `VITE_APP_MOCK_OPEN`            | mock 开关              |

新增变量后需同步 `types/env.d.ts` 中的 `ImportMetaEnv` 声明。

`VITE_APP_AUTHOR`、`VITE_APP_VERSION_CODE_PUBLISH`、`VITE_APP_VERSION_CODE_FULL` 显示在登录页脚注，`VITE_APP_TITLE` 显示在导航栏与 `document.title`。

## 编码约定与注意事项

- **缩进用 Tab**（`.editorconfig` + `.prettierrc.json` 的 `useTabs: true`），格式化统一交给 Prettier，ESLint 只做代码质量检查。
- **API 与组件自动导入**：`ref` / `computed` / `useRouter` / `useStorage`、`useRequest`（vue-request）、`axios`、naive-ui 的 `useMessage` / `useDialog` / `useNotification`、`<n-button>` 等无需手动 import；配置见 `vite.base.config.ts`。
- **`window.$message` 等全局实例**：`$message` / `$dialog` / `$notification` 由 `src/components/common/naive-provider.vue` 挂载（类型声明在 `types/global.d.ts`），供路由守卫、请求层等非组件上下文使用。首次导航由 `app.use(router)` 触发，早于 `app.mount()`，因此调用时要用可选链（`window.$message?.error()`）。
- **路由守卫**（`src/plugins/router.ts`）负责登录鉴权、角色鉴权、设置 `document.title`、重置滚动条。角色比较用的是 `useAuth` 映射后的角色 key（字符串），页面 meta 的 `roles` 写 key 而不是数字 `roleId`。
- **登录态**：统一从 `src/composables/useAuth.ts` 读写，不要另起一份 `useStorage`，否则守卫和请求层拿不到同一份状态。
- **ESLint 使用 flat config**（`eslint.config.ts`），已刻意**不接入 `@unocss/eslint-config`**：该插件在 Windows 上会以 `0xC0000005` 概率性崩溃，导致 CI 随机飘红。代价是失去 `unocss/order` 工具类排序规则。
  - 因此 Unocss 工具类顺序靠约定，不靠 lint 保证。
- **`tsconfig.app.json`** 开启了 `noUnusedLocals` / `noUnusedParameters` / `erasableSyntaxOnly`，未使用的变量和参数会导致 `pnpm build` 失败。
- **`vue-tsc -b` 是项目引用构建**：`tsconfig.json` 只做 `references` 聚合，实际配置在 `tsconfig.app.json`（业务代码）与 `tsconfig.node.json`（vite / eslint / uno 配置与 `mock/**`）里。
- `dayjs` 保留在依赖中，模板内暂无使用处，可直接在业务中使用。
