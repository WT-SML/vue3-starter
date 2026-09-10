<script setup lang="ts">
import { useDialog, useMessage, useNotification } from 'naive-ui'

/**
 * 把 naive-ui 的全局实例挂到 window 上。
 * 这样在非组件上下文（路由守卫、请求层、工具函数）也能直接提示。
 */
window.$message = useMessage()
window.$dialog = useDialog()
window.$notification = useNotification()
</script>
<template>
	<!-- 仅用于挂载全局实例，不渲染任何内容 -->
	<div class="hidden" />
</template>
