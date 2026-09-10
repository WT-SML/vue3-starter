<script setup lang="ts"></script>

<template>
	<div class="h-100vh flex flex-col items-center justify-center gap-2">
		404
		<n-button type="primary" text @click="$router.push('/')">
			返回首页
		</n-button>
	</div>
</template>

<style lang="scss" scoped></style>

<route lang="json">
{
	"meta": {
		"title": "404",
		"layout": "empty",
		"auth": false,
		"roles": ["*"],
		"keep": false
	}
}
</route>
