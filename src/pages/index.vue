<script setup lang="ts">
const router = useRouter()
router.push('/example')
</script>

<template>
	<div></div>
</template>

<style lang="scss" scoped></style>

<route lang="json">
{
	"meta": {
		"title": "首页",
		"layout": "empty",
		"auth": false,
		"roles": ["*"],
		"keep": false
	}
}
</route>
