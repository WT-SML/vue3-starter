import { createI18n } from 'vue-i18n'
import YAML from 'yaml'
import type { Ref } from 'vue'

const modules = import.meta.glob(['../../locales/**.yml'], {
	query: '?raw',
	eager: true,
}) as Record<string, { default: string }>

// 把 locales/*.yml 解析成 { 'zh-CN': {...}, 'en-US': {...} } 的形式
const messages = Object.fromEntries(
	Object.keys(modules).map((key) => {
		const locale = key.split('/').at(-1)?.split('.').at(0) ?? ''
		return [locale, YAML.parse(modules[key].default)]
	}),
)

// useStorage 返回的是可移除的 RemovableRef<string | null | undefined>，这里按普通字符串 Ref 使用
const localeCache: Ref<string> = useStorage('locale', 'zh-CN')

const i18n = createI18n({
	messages,
	locale: localeCache.value,
	legacy: false, // you must set `false`, to use Composition API
	globalInjection: true, // 是否为每个组件注入全局属性和函数。
})

syncRef(localeCache, i18n.global.locale)

export default i18n
