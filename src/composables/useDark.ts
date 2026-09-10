// 深色 / 浅色选项，key 需为 string | number 才能作为 n-dropdown 的选项
const darkOptions = [
	{
		label: '浅色',
		key: 'light',
	},
	{
		label: '深色',
		key: 'dark',
	},
]

const isDark = useDark()
const toggleDark = useToggle(isDark)

// 当前明暗模式对应的选项 key
const darkKey = computed(() => {
	return isDark.value ? 'dark' : 'light'
})

const changeDark = (val: boolean) => {
	isDark.value = val
}

const darkLabel = computed(() => {
	return (
		darkOptions.find((item) => item.key === darkKey.value) ?? darkOptions[0]
	).label
})

export default () => ({
	isDark,
	toggleDark,
	darkOptions,
	darkKey,
	changeDark,
	darkLabel,
})
