<script setup lang="ts">
import useI18n from '~/composables/useI18n'
import useTheme from '~/composables/useTheme'
import useDark from '~/composables/useDark'

const { localeOptions, localeLabel, changeLocale } = useI18n()
const { themeLabel, changeTheme, themes } = useTheme()
const { darkLabel, changeDark, darkOptions } = useDark()

const handleThemeSelect = (key: string | number) => {
	changeTheme(String(key))
}
const handleLocaleSelect = (key: string | number) => {
	changeLocale(String(key))
}
const handleDarkSelect = (key: string | number) => {
	changeDark(key === 'dark')
}

const VITE_APP_TITLE = import.meta.env.VITE_APP_TITLE
</script>

<template>
	<div class="h-60px flex items-center justify-between px-5 shadow">
		<div class="flex items-center gap-x-3">
			<img src="/favicon.svg" width="25" />
			<div class="text-16px font-bold">{{ VITE_APP_TITLE }}</div>
		</div>
		<div class="flex items-center gap-x-5">
			<n-dropdown
				trigger="click"
				:options="localeOptions"
				@select="handleLocaleSelect"
			>
				<div class="cursor-pointer">
					{{ localeLabel }}
					<i class="i-carbon-chevron-down"></i>
				</div>
			</n-dropdown>
			<n-dropdown trigger="click" :options="themes" @select="handleThemeSelect">
				<div class="cursor-pointer">
					{{ themeLabel }} <i class="i-carbon-chevron-down"></i>
				</div>
			</n-dropdown>
			<n-dropdown
				trigger="click"
				:options="darkOptions"
				@select="handleDarkSelect"
			>
				<div class="cursor-pointer">
					{{ darkLabel }} <i class="i-carbon-chevron-down"></i>
				</div>
			</n-dropdown>
		</div>
	</div>
</template>

<style lang="scss" scoped></style>
