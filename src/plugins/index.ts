import type { App } from 'vue'
import i18n from '~/plugins/i18n'
import router from '~/plugins/router'

import '@unocss/reset/tailwind-compat.css'
import 'virtual:uno.css'
import 'virtual:unocss-devtools'
import '~/styles/main.scss'

const usePlugins = (app: App) => {
	// 国际化
	app.use(i18n)

	// 路由
	app.use(router)

	// naive style 处理
	const meta = document.createElement('meta')
	meta.name = 'naive-ui-style'
	document.head.appendChild(meta)
}

export default usePlugins
