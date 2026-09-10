import { roleOptions } from '~/constants/role'
import type { LoginResult } from '~/apis/types'

// 当前登录用户信息：字段与登录接口返回保持一致，本地存储时全部可选
export type AuthUser = Partial<LoginResult> & {
	/** deepzoom 接口的 token */
	dziToken?: string
}

const currentUser = useStorage<AuthUser>(
	import.meta.env.VITE_APP_AUTH_USER_KEY,
	{},
)

const isLoggedIn = computed(() => {
	return !!Object.values(currentUser.value).length
})

const role = computed(() => {
	const roleKey = roleOptions.find(
		(item) => item.value === currentUser.value.roleId,
	)?.key
	return roleKey
})

export default () => ({
	currentUser,
	isLoggedIn,
	role,
})
