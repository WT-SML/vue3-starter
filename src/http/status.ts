import useI18n from '~/composables/useI18n'

const { t } = useI18n()

export const getHttpCodeMsg = (status: number): string => {
	let message: string
	switch (status) {
		case 400:
			message = t('serverTips.400')
			break
		case 401:
			message = t('serverTips.401')
			break
		case 403:
			message = t('serverTips.403')
			break
		case 404:
			message = t('serverTips.404')
			break
		case 405:
			message = t('serverTips.405')
			break
		case 408:
			message = t('serverTips.408')
			break
		case 409:
			message = t('serverTips.409')
			break
		case 500:
			message = t('serverTips.500')
			break
		case 501:
			message = t('serverTips.501')
			break
		case 502:
			message = t('serverTips.502')
			break
		case 503:
			message = t('serverTips.503')
			break
		case 504:
			message = t('serverTips.504')
			break
		case 505:
			message = t('serverTips.505')
			break
		default:
			message = t('serverTips.others', { code: status })
	}
	return message
}
