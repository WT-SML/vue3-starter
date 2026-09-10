/// <reference types="vite/client" />
/// <reference types="vite-plugin-vue-layouts-next/client" />

interface ImportMetaEnv {
	/** 网页基础 title */
	readonly VITE_APP_TITLE: string
	/** 作者 */
	readonly VITE_APP_AUTHOR: string
	/** 发布版本号 */
	readonly VITE_APP_VERSION_CODE_PUBLISH: string
	/** 完整版本号 */
	readonly VITE_APP_VERSION_CODE_FULL: string
	/** 后端接口 BASE_URL */
	readonly VITE_APP_API_BASE_URL: string
	/** 后端接口超时时间（秒） */
	readonly VITE_APP_REQ_TIMEOUT: string
	/** 后端接口语言的 key */
	readonly VITE_APP_REQ_LOCALE_KEY: string
	/** 登录用户信息存储的 key */
	readonly VITE_APP_AUTH_USER_KEY: string
	/** mock 开关 */
	readonly VITE_APP_MOCK_OPEN: string
}

interface ImportMeta {
	readonly env: ImportMetaEnv
}
