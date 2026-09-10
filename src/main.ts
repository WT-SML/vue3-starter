import { createApp } from 'vue'
import App from '~/App.vue'
import usePlugins from './plugins'

const app = createApp(App)

usePlugins(app) // 使用插件

app.mount('#app')
