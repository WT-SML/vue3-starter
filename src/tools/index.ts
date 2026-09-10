import JSEncrypt from 'jsencrypt'
import {
	LOCAL_PRIVATE_KEY,
	LOCAL_PUBLIC_KEY_CER,
} from '~/constants/safe'
import emitter from '~/tools/emitter'
import { COMMON_PROVIDE, type CommonProvidePayload } from '~/constants/evt-name'

// 字符串的 true 或者 false 转成布尔类型，通常用于 env 文件变量读取
export const stringToBoolean = (v?: string): boolean => {
	return v === 'true'
}

// 本地加密
export const localEncrypt = (proclaimedInWriting: string): string => {
	const encryptor = new JSEncrypt() // 创建加密对象实例
	encryptor.setPublicKey(LOCAL_PUBLIC_KEY_CER) // 设置公钥
	return encryptor.encrypt(proclaimedInWriting) || '' // 对内容进行加密
}

// 本地解密
export const localDecrypt = (ciphertext: string): string => {
	const decryptor = new JSEncrypt() // 创建解密对象实例
	decryptor.setPrivateKey(LOCAL_PRIVATE_KEY) // 设置秘钥
	return decryptor.decrypt(ciphertext) || '' // 解密公钥加密的内容
}


// 根据值获取描述
export const getLabelByVal = <T extends Record<string, unknown>>(
	val: unknown,
	options: readonly T[] = [],
	value = 'value',
	label = 'label',
): T[keyof T] | null => {
	if (!Array.isArray(options)) {
		return null
	}
	for (const v of options) {
		if (val === v[value]) {
			return v[label as keyof T]
		}
	}
	return null
}

// 格式化文件大小
export const formatFileSize = (bytes: number, decimalPoint = 2): string => {
	if (bytes == 0) return '0 Bytes'
	const k = 1000
	const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
	const i = Math.floor(Math.log(bytes) / Math.log(k))
	return (
		parseFloat((bytes / Math.pow(k, i)).toFixed(decimalPoint)) + ' ' + sizes[i]
	)
}

// 图片尺寸
export interface ImageSize {
	width: number
	height: number
}

// 获取图片宽高
export const getImageSize = (src: string): Promise<ImageSize> =>
	new Promise((resolve) => {
		const img = new Image()
		img.src = src
		img.onload = () => {
			resolve({
				width: img.width,
				height: img.height,
			})
		}
		img.onerror = () => {
			resolve({
				width: 0,
				height: 0,
			})
		}
	})

// 格式化数字为以 K 为单位
export const formatNumber = (num: number): number | string => {
	if (!num) return num
	if (num >= 100 * 10000) {
		return ((num / 100) * 10000).toFixed(1) + 'M'
	} else if (num >= 1000) {
		return (num / 1000).toFixed(1) + 'K'
	} else {
		return num
	}
}

// 比较函数
export const compare = <T extends Record<string, unknown>>(
	propertyName: keyof T,
	isAscending?: boolean,
) => {
	const order = isAscending === undefined ? 1 : isAscending ? 1 : -1
	return function (obj1: T, obj2: T): number {
		const value1 = obj1[propertyName] as unknown as number | string
		const value2 = obj2[propertyName] as unknown as number | string
		if (value1 < value2) {
			return order * -1
		} else if (value1 > value2) {
			return order * 1
		} else {
			return 0
		}
	}
}

// 提供一个东西
export const commonProvide = (
	provideId: string,
): Promise<CommonProvidePayload> =>
	new Promise((resolve) => {
		emitter.on(COMMON_PROVIDE, (payload) => {
			if (payload.provideId === provideId) {
				emitter.off(COMMON_PROVIDE)
				resolve(payload)
			}
		})
	})

// 当前有聚焦的输入元素
export const isFocusInput = (): boolean => {
	const el = document.activeElement
	if (el && ['INPUT', 'TEXTAREA'].includes(el.tagName)) {
		return true
	}
	return false
}

// 获取后缀
export const getExt = (fileName: string): string => {
	const fileNameList = fileName.split('.')
	return fileNameList.length > 1
		? (fileName.split('.').at(-1) ?? '').toLocaleLowerCase()
		: ''
}
