import { defineConfig } from 'vite'
import viteBaseConfig from './vite.base.config.ts'

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
	...viteBaseConfig(mode),
	server: {
		port: 3000,
		// 代理
		// proxy: {
		// 	'/api': {
		// 		target: 'http://127.0.0.1',
		// 		changeOrigin: true,
		// 	},
		// },
	},
}))
