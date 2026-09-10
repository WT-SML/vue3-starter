import { createWebHistory, createRouter } from 'vue-router'
import { routes } from 'vue-router/auto-routes'
import { setupLayouts } from 'virtual:generated-layouts'
import useAuth from '~/composables/useAuth'
import useI18n from '~/composables/useI18n'

const { t } = useI18n()

const router = createRouter({
	history: createWebHistory(),
	routes: setupLayouts(routes),
})

const { role, isLoggedIn } = useAuth()

// 路由拦截
router.beforeEach((to) => {
	// 首次导航发生在 app.use(router) 时，此时 window.$message 还未被 naive-provider.vue 挂载
	if (to.meta) {
		// 登录鉴权
		if (to.meta.auth && !isLoggedIn.value) {
			window.$message?.error(t('routerTips.auth'))
			return '/login'
		}
	}
	// 身份鉴权（route meta 里的 roles 是字符串数组，这里统一转成字符串比较）
	if (to.meta.roles) {
		const roles = to.meta.roles
		const currentRole = role.value === undefined ? '' : String(role.value)
		if (!roles.includes('*') && !roles.includes(currentRole)) {
			window.$message?.error(t('routerTips.role'))
			return '/login'
		}
	}
	// 设置页面 title
	document.title = to.meta.title
		? `${to.meta.title} - ${import.meta.env.VITE_APP_TITLE}`
		: import.meta.env.VITE_APP_TITLE
	// 重置页面滚动条
	document.documentElement.scrollTop = 0
	document.body.scrollTop = 0
})

export default router
