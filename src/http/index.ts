import axios, { type AxiosRequestConfig } from 'axios'
import type { ApiResult } from '~/apis/types'
import { getHttpCodeMsg } from '~/http/status'
import useAuth from '~/composables/useAuth'
import useI18n from '~/composables/useI18n'
import router from '~/plugins/router'

// 是否符合后端的统一返回结构（顶层直接返回数组 / 字符串等场景不满足）
const isApiResult = <T>(payload: unknown): payload is ApiResult<T> => {
	return typeof payload === 'object' && payload !== null && 'code' in payload
}

const { locale } = useI18n()
const { currentUser, isLoggedIn } = useAuth()

const baseURL = import.meta.env.VITE_APP_API_BASE_URL
const timeout = Number(import.meta.env.VITE_APP_REQ_TIMEOUT) * 1000
const localeKey = import.meta.env.VITE_APP_REQ_LOCALE_KEY

// 创建 axios 实例
const service = axios.create({
	withCredentials: false,
	baseURL,
	timeout,
	headers: {},
})

let isRedirectingToLogin = false

// 未授权统一处理：清空登录态 + 跳转登录页。
// 有两个触发来源，含义不同，都需要处理：
//   1. 响应拦截器 —— HTTP 状态码为 401
//   2. request     —— HTTP 200，但业务 code 为 401
// 并发请求同时未授权时只跳转一次
const handleUnauthorized = () => {
	currentUser.value = {}
	if (isRedirectingToLogin || router.currentRoute.value.path === '/login') {
		return
	}
	isRedirectingToLogin = true
	router
		.push('/login')
		.catch(() => undefined)
		.finally(() => {
			isRedirectingToLogin = false
		})
}

// axios 实例拦截请求
service.interceptors.request.use(
	(config) => {
		// token 注入
		if (isLoggedIn.value && currentUser.value.token) {
			config.headers.Authorization = currentUser.value.token
		}
		// 参数自动转换：业务参数统一用 params 传，非 get 请求自动作为 body 发送
		if (config.method?.toLocaleLowerCase() !== 'get') {
			config.data = config.params
			delete config.params
		}
		// query 始终拼接到 URL 上，供非 get 请求补充 query 参数
		if (config.query) {
			config.params = { ...config.params, ...config.query }
			delete config.query
		}
		// 语言参数注入
		config.headers[localeKey] = locale.value
		return config
	},
	(error) => {
		return Promise.reject(error)
	},
)

// axios 实例拦截响应
// 这里只处理 http 层面的错误，响应体解包统一放在 request 里做，避免类型断言
service.interceptors.response.use(
	(response) => response,
	// 请求失败
	(error) => {
		const { response } = error
		if (response) {
			// 请求已发出，但是 http code 不在 2xx 的范围
			if (response.status === 401) {
				handleUnauthorized()
			}
			window.$message.error(getHttpCodeMsg(response.status))
			return Promise.reject(response.data)
		}
		window.$message.error('网络连接超时,请稍后再试！')
		return Promise.reject(error)
	},
)

const request = async <T = unknown>(config: AxiosRequestConfig): Promise<T> => {
	const response = await service.request<unknown>(config)
	const result: unknown = response.data
	// 不符合后端统一结构时原样返回（例如直接返回数组、字符串、文件流）
	if (!isApiResult<T>(result)) {
		return result as T
	}
	const { code, msg, data } = result
	if (code === 200) {
		return data
	}
	// 业务层面的未授权：HTTP 200 但业务 code 为 401
	if (code === 401) {
		handleUnauthorized()
		throw result
	}
	window.$message.error(msg || getHttpCodeMsg(code))
	throw result
}

export { request }

export default request
