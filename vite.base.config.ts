import vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import { fileURLToPath, URL } from 'node:url'
import VueRouter from 'vue-router/vite'
import Layouts from 'vite-plugin-vue-layouts-next'
import AutoImport from 'unplugin-auto-import/vite'
import type { Options as AutoImportOptions } from 'unplugin-auto-import/types'
import { viteMockServe } from 'vite-plugin-mock'
import { loadEnv, type UserConfig } from 'vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import viteCompression from 'vite-plugin-compression'

// 字符串的 true 或者 false 转成布尔类型，通常用于 env 文件变量读取
export const stringToBoolean = (v?: string): boolean => {
	return v === 'true'
}

// 自动导入配置
const autoImportConf: AutoImportOptions = {
	imports: [
		'vue',
		'vue-router',
		'@vueuse/core',
		{
			'vue-request': ['useRequest'],
			axios: [['default', 'axios']],
			'naive-ui': ['useDialog', 'useMessage', 'useNotification'],
		},
	],
	dts: 'types/auto-imports.d.ts', // 生成的类型声明文件
}

// 通用 vite 配置，供各环境复用
const viteBaseConfig = (mode: string): UserConfig => {
	const env = loadEnv(mode, process.cwd())

	return {
		plugins: [
			viteMockServe({
				enable: stringToBoolean(env.VITE_APP_MOCK_OPEN),
			}),
			VueRouter({
				dts: 'types/route-map.d.ts',
			}),
			vue(),
			UnoCSS(),
			Layouts(),
			AutoImport(autoImportConf),
			Components({
				resolvers: [NaiveUiResolver()],
				dts: 'types/components.d.ts',
			}),
			viteCompression(),
		],
		resolve: {
			alias: {
				'@': fileURLToPath(new URL('./src', import.meta.url)),
				'~': fileURLToPath(new URL('./src', import.meta.url)),
			},
		},
		assetsInclude: ['**/*.yml'],
	}
}

export default viteBaseConfig
