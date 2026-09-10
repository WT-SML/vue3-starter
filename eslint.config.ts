import js from '@eslint/js'
import globals from 'globals'
import pluginVue from 'eslint-plugin-vue'
import tseslint from 'typescript-eslint'
import prettier from 'eslint-config-prettier'

export default tseslint.config(
	// 忽略目录
	{
		ignores: ['dist/**', 'node_modules/**', 'public/**'],
	},

	js.configs.recommended,
	tseslint.configs.recommended,
	pluginVue.configs['flat/recommended'],

	{
		languageOptions: {
			globals: {
				...globals.browser,
				...globals.node,
				// Vue 编译宏
				defineOptions: 'readonly',
				definePage: 'readonly',
			},
		},
		rules: {
			// 允许组件使用单词名（index.vue / login.vue 等）
			'vue/multi-word-component-names': 'off',
			// 项目里存在对 props 的就地修改
			'vue/no-mutating-props': 'off',
			// 禁止使用 var，而应该用 let 或 const
			'no-var': 'error',
			// new Promise 里使用 async executor 是项目既定写法
			'no-async-promise-executor': 'off',
		},
	},

	{
		// .vue 的 <script lang="ts"> 交给 TS parser 解析
		files: ['**/*.vue'],
		languageOptions: {
			parserOptions: {
				parser: tseslint.parser,
			},
		},
	},

	{
		files: ['**/*.ts', '**/*.tsx', '**/*.vue'],
		rules: {
			// vue-tsc 已经能发现未定义变量；且自动导入的 API（ref/computed/useStorage...）
			// 不会出现在 ESLint 的 globals 里，开启 no-undef 会大量误报
			'no-undef': 'off',
		},
	},

	{
		// 类型声明文件需要与上游声明的泛型默认值保持一致，允许 any；
		// 声明合并用到的泛型参数在本地不会被引用，关闭未使用检查
		files: ['**/*.d.ts'],
		rules: {
			'@typescript-eslint/no-explicit-any': 'off',
			'@typescript-eslint/no-unused-vars': 'off',
		},
	},

	// 关闭所有与 prettier 冲突的格式化规则（格式化统一交给 prettier，见 pnpm format）
	prettier,
)
