// 通用的提供某个东西的事件
export const COMMON_PROVIDE = 'COMMON_PROVIDE'

// 通用提供事件的载荷
export interface CommonProvidePayload {
	provideId: string
	[key: string]: unknown
}
