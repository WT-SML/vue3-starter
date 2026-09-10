<script setup lang="ts">
import { login } from '~/apis/user'
import type { LoginParams } from '~/apis/types'
import { localEncrypt, localDecrypt } from '~/tools'
import useI18n from '~/composables/useI18n'
import useAuth from '~/composables/useAuth'
import { useMessage, type FormInst, type FormRules } from 'naive-ui'

const message = useMessage()
const router = useRouter()

const { localeOptions, localeLabel, changeLocale } = useI18n()
const { currentUser } = useAuth()

const loginReq = useRequest(login, {
	manual: true,
})

// 记住账号
const memorizedAccount = useStorage('memorized-account', {
	isRemember: false,
	username: '',
	password: '',
})

// 表单
const formRef = ref<FormInst | null>(null)
const form = ref<LoginParams>({
	username: '',
	password: '',
})

// 表单验证规则
const rules: FormRules = {
	username: [
		{
			required: true,
			message: '请输入用户名',
			trigger: ['input', 'blur'],
		},
	],
	password: [
		{
			required: true,
			message: '请输入密码',
			trigger: ['input', 'blur'],
		},
	],
}
// 登录提交
const loginSubmit = async () => {
	formRef.value?.validate(async (errors) => {
		if (errors) {
			return
		}
		await loginReq.runAsync({
			...form.value,
		})
		const userInfo = loginReq.data.value
		if (!userInfo) {
			return
		}
		currentUser.value = userInfo
		message.success(`欢迎，${currentUser.value.nickname}`)
		// 记住账号密码
		if (memorizedAccount.value.isRemember) {
			memorizedAccount.value.username = form.value.username
			memorizedAccount.value.password = localEncrypt(form.value.password)
		}
		redirect()
	})
}
// 重定向
const redirect = () => {
	router.push('/example')
}
// 语言切换
const handleLocaleSelect = (key: string | number) => {
	changeLocale(String(key))
}
// 挂载
onMounted(() => {
	// 还原记住的账号密码
	if (memorizedAccount.value.isRemember) {
		form.value.username = memorizedAccount.value.username
		form.value.password = localDecrypt(memorizedAccount.value.password)
	}
})

// 一些环境变量
const VITE_APP_AUTHOR = import.meta.env.VITE_APP_AUTHOR
const VITE_APP_VERSION_CODE_PUBLISH = import.meta.env
	.VITE_APP_VERSION_CODE_PUBLISH
const VITE_APP_VERSION_CODE_FULL = import.meta.env.VITE_APP_VERSION_CODE_FULL
</script>

<template>
	<div class="login-page h-100vh flex flex-col justify-between overflow-hidden">
		<!-- logo -->
		<div class="flex items-center justify-end px-5 pt-5">
			<n-dropdown
				trigger="click"
				:options="localeOptions"
				@select="handleLocaleSelect"
			>
				<div class="cursor-pointer rounded-8px bg-white px-2 py-1">
					<i class="i-carbon-translate"></i>
					{{ localeLabel }}
					<i class="i-carbon-chevron-down"></i>
				</div>
			</n-dropdown>
		</div>
		<!-- 表单 -->
		<div class="flex items-center justify-center">
			<div class="w-360px rounded-10px bg-white px-40px py-70px">
				<div class="mb-5 flex items-center justify-center text-24px">
					欢迎登录
				</div>
				<n-form ref="formRef" :model="form" :rules="rules" :show-label="false">
					<n-form-item path="username">
						<n-input
							v-model:value="form.username"
							class="!h-48px !leading-48px"
							placeholder="请输入账号"
							:maxlength="32"
							@keyup.enter="loginSubmit()"
						>
							<template #prefix>
								<i class="i-carbon-user text-22px text-[#8B919E]"></i>
							</template>
						</n-input>
					</n-form-item>
					<n-form-item path="password">
						<n-input
							v-model:value="form.password"
							class="!h-48px !leading-48px"
							placeholder="请输入密码"
							type="password"
							:maxlength="32"
							show-password-on="click"
							@keyup.enter="loginSubmit()"
						>
							<template #prefix>
								<span class="i-carbon-password text-22px text-[#8B919E]"></span>
							</template>
						</n-input>
					</n-form-item>
				</n-form>
				<n-checkbox
					v-model:checked="memorizedAccount.isRemember"
					class="mb-24px"
				>
					记住密码
				</n-checkbox>
				<n-button
					class="!h-48px !px-16px !py-10px"
					type="primary"
					block
					:loading="loginReq.loading.value"
					@click="loginSubmit()"
				>
					登录
				</n-button>
			</div>
		</div>
		<!-- 脚注 -->
		<div class="flex justify-center gap-x-10 pb-5">
			<div>©{{ VITE_APP_AUTHOR }}</div>
			<div>发布版本号：{{ VITE_APP_VERSION_CODE_PUBLISH }}</div>
			<div>完整版本号：{{ VITE_APP_VERSION_CODE_FULL }}</div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.login-page {
	background-color: #eee;
}
</style>

<route lang="json">
{
	"meta": {
		"title": "登录",
		"layout": "empty",
		"auth": false,
		"roles": ["*"],
		"keep": false
	}
}
</route>
