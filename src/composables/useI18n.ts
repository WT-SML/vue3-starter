import i18n from '~/plugins/i18n'
import { dateEnUS, dateZhCN, enUS, zhCN } from 'naive-ui'

const localeOptions = [
	{
		label: '中文',
		key: 'zh-CN',
		naiveLocale: {
			locale: zhCN,
			dateLocale: dateZhCN,
		},
	},
	{
		label: 'English',
		key: 'en-US',
		naiveLocale: {
			locale: enUS,
			dateLocale: dateEnUS,
		},
	},
]

const { t, locale } = i18n.global

const changeLocale = (localePayload: string) => {
	locale.value = localePayload
}

const naiveLocale = computed(() => {
	const currentLocale = localeOptions.find((item) => item.key === locale.value)
	return (currentLocale ?? localeOptions[0]).naiveLocale
})

const localeLabel = computed(() => {
	const currentLocale = localeOptions.find((item) => item.key === locale.value)
	return (currentLocale ?? localeOptions[0]).label
})

export default () => ({
	t,
	locale,
	localeLabel,
	changeLocale,
	naiveLocale,
	localeOptions,
})
