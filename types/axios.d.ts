import 'axios'

declare module 'axios' {
	interface AxiosRequestConfig<D = any, P = any> {
		/**
		 * 只拼接在 URL 上的参数。
		 * 业务参数统一用 params 传递（非 get 请求会自动作为 body 发送），
		 * 需要额外往 URL 上拼参数时用 query。
		 */
		query?: Record<string, unknown>
	}
}
