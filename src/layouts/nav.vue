<script setup lang="ts">
import Nav from '~/components/common/nav.vue'
</script>

<template>
	<div class="h-100vh flex flex-col overflow-hidden">
		<div class="flex-shrink-0">
			<Nav />
		</div>
		<div class="flex-grow overflow-y-auto">
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
		</div>
	</div>
</template>

<style lang="scss" scoped></style>
