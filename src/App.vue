<script setup lang="ts">
import naiveProvider from '~/components/common/naive-provider.vue'
import useTheme from './composables/useTheme'
import useI18n from '~/composables/useI18n'
import useDark from './composables/useDark'
import { darkTheme } from 'naive-ui'

const { naiveLocale } = useI18n()
const { themeOverrides } = useTheme()
const { isDark } = useDark()

const computedDarkTheme = computed(() => {
	return isDark.value ? darkTheme : null
})
</script>

<template>
	<!-- :theme 必须放在最外层，否则 window.$message（messageMount 挂在这层）拿不到暗黑主题 -->
	<n-config-provider
		:theme="computedDarkTheme"
		:theme-overrides="themeOverrides"
		:locale="naiveLocale.locale"
		:date-locale="naiveLocale.dateLocale"
	>
		<n-dialog-provider>
			<n-message-provider>
				<n-notification-provider>
					<!-- 把 useMessage 等实例挂到 window 上，方便在非组件上下文（如路由守卫、请求层）调用 -->
					<naiveProvider />
				</n-notification-provider>
				<router-view />
			</n-message-provider>
		</n-dialog-provider>
	</n-config-provider>
</template>

<style lang="scss" scoped></style>
