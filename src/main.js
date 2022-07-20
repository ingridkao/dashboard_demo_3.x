import { createApp } from 'vue'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// ElementPlus: For color mode toggle
import 'element-plus/theme-chalk/dark/css-vars.css'
// ElementPlus: For i18n
import zhTw from 'element-plus/es/locale/lang/zh-tw'
// ElementPlus: For icon
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'



const app = createApp(App)
app.use(store)
app.use(router)

//For ElementPlus
app.use(ElementPlus,{
    locale: zhTw
})
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}



app.mount('#app')