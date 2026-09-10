import type { useDialog, useMessage, useNotification } from 'naive-ui'

type MessageApi = ReturnType<typeof useMessage>
type DialogApi = ReturnType<typeof useDialog>
type NotificationApi = ReturnType<typeof useNotification>

declare global {
	interface Window {
		/** 全局挂载的 naive-ui message 实例，由 components/common/naive-provider.vue 注入 */
		$message: MessageApi
		/** 全局挂载的 naive-ui dialog 实例，由 components/common/naive-provider.vue 注入 */
		$dialog: DialogApi
		/** 全局挂载的 naive-ui notification 实例，由 components/common/naive-provider.vue 注入 */
		$notification: NotificationApi
	}
}

export {}
