<script setup lang="ts"></script>

<template>
	<router-view v-slot="{ Component }">
		<keep-alive>
			<component
				:is="Component"
				v-if="$route.meta?.keep"
				:key="$route.name"
			></component>
		</keep-alive>
		<component
			:is="Component"
			v-if="!$route.meta?.keep"
			:key="$route.name"
		></component>
	</router-view>
</template>

<style lang="scss" scoped></style>
