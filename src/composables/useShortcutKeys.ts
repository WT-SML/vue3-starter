const keys = useMagicKeys()

// 快捷键配置项
export interface ShortcutKeyItem {
	keys: string[]
	[key: string]: unknown
}

// 从当前按下的按键集合中匹配出命中的快捷键配置
const matchKey = (current: Set<string>, shortcutKeys: ShortcutKeyItem[]) => {
	for (const v of shortcutKeys) {
		for (const _ of v.keys) {
			if (current.has(_)) {
				return v
			}
		}
	}
	return null
}

export default () => ({
	keys,
	matchKey,
})
