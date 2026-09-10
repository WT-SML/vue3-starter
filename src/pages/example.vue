<script setup lang="ts">
import useI18n from '~/composables/useI18n'

const { t } = useI18n()
</script>

<template>
	<div class="flex flex-col gap-y-10 p-10">
		<div>
			<div class="title">国际化效果演示：</div>
			<div class="mb-3">文字：{{ t('home') }}</div>
			<div class="flex items-center">表单：<n-input class="!w-150px" /></div>
		</div>
		<div>
			<div class="title">多主题效果演示：</div>
			<div class="flex items-center">
				按钮变化：<n-button type="primary">切换主题查看按钮变化</n-button>
			</div>
		</div>
		<div>
			<div class="title">登录页：</div>
			<div class="flex items-center">
				去登录页：
				<n-button type="primary" @click="$router.push('/login')">
					点击去登录页
				</n-button>
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.title {
	font-size: 16px;
	font-weight: bold;
	margin-bottom: 0.75rem;
}
</style>

<route lang="json">
{
	"meta": {
		"title": "示例页面",
		"layout": "nav",
		"auth": false,
		"roles": ["*"],
		"keep": false
	}
}
</route>
