import type { GlobalThemeOverrides } from 'naive-ui'

/**
 * 蓝色主题。
 *
 * 注意：这里只覆盖主色（强调色），**不会强制进入暗色模式**——明暗由
 * `src/composables/useDark.ts` 的开关控制，主题只决定配色。
 */
const theme: GlobalThemeOverrides = {
	common: {
		primaryColor: '#1677ff',
		// hover 更亮、pressed 更暗，与主色同色系
		primaryColorHover: '#3f95fe',
		primaryColorPressed: '#0857d8',
		primaryColorSuppl: '#3f95fe',
		borderRadius: '8px',
	},
}

export default theme
