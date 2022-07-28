import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'



import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'  // For color mode toggle
import zhTw from 'element-plus/es/locale/lang/zh-tw'  // For i18n
import * as ElementPlusIconsVue from '@element-plus/icons-vue'  // For icon

import HighchartsVue from 'highcharts-vue'
import Highcharts from 'highcharts'
import highchartsMore from 'highcharts/highcharts-more'
import accessibilityInit from "highcharts/modules/accessibility"
import exportingInit from "highcharts/modules/exporting"
import exportData from "highcharts/modules/export-data"
import loadWordcloud from 'highcharts/modules/wordcloud'
import loadTreemap from 'highcharts/modules/treemap'

// import mapInit from 'highcharts/modules/map'
// import addWorldMap from './js/worldmap'
// mapInit(Highcharts)
// addWorldMap(Highcharts)
highchartsMore(Highcharts)
loadTreemap(Highcharts)
accessibilityInit(Highcharts)
exportingInit(Highcharts)
exportData(Highcharts)
loadWordcloud(Highcharts)



const app = createApp(App)
app.use(store)
app.use(router)



app.use(ElementPlus,{
    locale: zhTw
})
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}



app.use(HighchartsVue, { Highcharts })



app.mount('#app')