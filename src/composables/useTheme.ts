import theme1677ff from '~/theme/1677ff'
import theme18a058 from '~/theme/18a058'

const themes = [
	{
		label: '蓝色',
		key: '1677ff',
		value: theme1677ff,
	},
	{
		label: '绿色',
		key: '18a058',
		value: theme18a058,
	},
]

const theme = useStorage('theme', themes[0].key)

if (!themes.find((item) => item.key === theme.value)) {
	theme.value = themes[0].key
}

const changeTheme = (themePayload: string) => {
	theme.value = themePayload
}

const themeOverrides = computed(() => {
	return (themes.find((item) => item.key === theme.value) ?? themes[0]).value
})

const themeLabel = computed(() => {
	return (themes.find((item) => item.key === theme.value) ?? themes[0]).label
})

export default () => ({
	themes,
	theme,
	themeLabel,
	changeTheme,
	themeOverrides,
})
