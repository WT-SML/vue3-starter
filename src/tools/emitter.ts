import mitt from 'mitt'
import type { CommonProvidePayload } from '~/constants/evt-name'

const emitter = mitt<Record<string, CommonProvidePayload>>()

export default emitter
