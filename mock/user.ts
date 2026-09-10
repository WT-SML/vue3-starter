import type { MockMethod } from 'vite-plugin-mock'

export default [
	{
		url: '/api/user/login',
		method: 'post',
		response: () => {
			return {
				code: 200,
				data: {
					id: 1,
					roleId: 1,
					username: 'maple',
					nickname: 'Maple',
					token: 'maple leaf',
				},
			}
		},
	},
] as MockMethod[]
