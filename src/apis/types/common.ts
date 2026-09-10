// 后端统一返回结构（跨模块通用）
export interface ApiResult<T = unknown> {
	code: number
	msg?: string
	data: T
}
