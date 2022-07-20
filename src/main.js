import { createApp } from 'vue'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhTw from 'element-plus/es/locale/lang/zh-tw'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

const app = createApp(App)
app.use(store)
app.use(router)
app.use(ElementPlus,{
    locale: zhTw
})
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
app.mount('#app')
