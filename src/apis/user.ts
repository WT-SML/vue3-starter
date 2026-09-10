import request from '~/http'
import type {
	LoginParams,
	LoginResult,
} from '~/apis/types'

// 登录
export const login = (params: LoginParams) =>
	request<LoginResult>({
		url: `/user/login`,
		method: 'post',
		params,
	})
