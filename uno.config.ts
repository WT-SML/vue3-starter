import { defineConfig, presetIcons, presetWind3 } from 'unocss'

export default defineConfig({
	presets: [
		presetWind3(),
		presetIcons({
			// 图标尺寸 = font-size * 1.2，1.2 是为了补偿 Carbon 图标的画布留白，视觉大小贴近 1em
			scale: 1.2,
			// 图标名写错时给出告警，避免静默失效
			warn: true,
			extraProperties: {
				display: 'inline-block',
				'vertical-align': 'middle',
			},
		}),
	],
})
