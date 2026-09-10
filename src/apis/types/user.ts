// 登录入参
export interface LoginParams {
	username: string
	password: string
}

// 登录返回的登录用户信息
export interface LoginResult {
	id: number
	roleId: number
	username: string
	nickname: string
	token: string
}
