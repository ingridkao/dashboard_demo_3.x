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

import Highcharts from 'highcharts'
import HighchartsVue from 'highcharts-vue'
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
Highcharts.setOptions({
    //https://api.highcharts.com/highcharts/lang
    lang: {
        decimalPoint: '.',
        thousandsSep: ',',
        downloadCSV: '另存為CSV',
        downloadXLS: '另存為XLS',
        downloadJPEG: '下載JPEG圖檔',
        downloadPNG: '下載PNG圖檔',
        downloadSVG: '下載SVG向量圖檔',
        downloadPDF: '下載PDF檔案',
        hideData: '隱藏資料',
        viewData: '顯示資料',
        viewFullscreen: '全螢幕顯示',
        printChart: '列印',
        exportData:{
            categoryHeader: ""
        }
        // drillUpText: 'Back',
        // noData: "Check your options please",
        // resetZoom: 'Reset',
        // months: [
        //     'Janvier', 'Février', 'Mars', 'Avril',
        //     'Mai', 'Juin', 'Juillet', 'Août',
        //     'Septembre', 'Octobre', 'Novembre', 'Décembre'
        // ]
    }
});


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