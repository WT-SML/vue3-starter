import 'vue-router'

declare module 'vue-router' {
	interface RouteMeta {
		/** 页面标题，会拼接进 document.title */
		title?: string
		/** 使用的 layout 名称，默认 default */
		layout?: string
		/** 是否需要登录 */
		auth?: boolean
		/** 允许访问的角色，["*"] 表示不限制 */
		roles?: string[]
		/** 是否 keep-alive 缓存 */
		keep?: boolean
	}
}
