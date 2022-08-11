---
title: 'dashboard_demo vue3.X'
disqus: hackmd
---
# dashboard_demo_3.x

這個版本除了將Vue從2.x升級成3.X，也將原本使用的ElementUI升級成新的ElementPlus，建議使用vueuse來做一些動態切換。
在這邊紀錄一些建置過程中花比較多時間的問題：

[Demo](https://ingridkao.github.io/dashboard_demo_3.x/)



# Table of Contents
* [Deploy](#deploy)
* [Element plus](#element-plus)
* [Dark mode](#dark-mode-toggle)
* [FullScreen](#fullScreen)
* [Highcharts](#highcharts)
* [動態組件Async Components](#async-components)
* [解決:換掉favicon.ico不生效](#favicon)


## Deploy
### 1.Project setup
For dependency warning for @mapbox/mapbox-gl-traffic
```
npm install --force
```
### 2. .env
1. 新增.env
    `vi .env`
2. 編輯.env
    ```
    VUE_APP_GOOGLE_ANALYTICS=G-XXXXXXXXX
    VUE_APP_MAPBOXTOKEN=pk.?????????
    ```
### 3. Deploy
1. 編輯deploy.sh
 - Line.13 ： commit msg
 - Line.16 ： 相關字串確認
2. 於專案目錄執行`sh deploy.sh`



## Element plus

在這個版本的ElementUI有些說明比較不清楚，可以參考前個版本的說明，像是icon引入有更換。
1. 安裝：參考官網
2. 引入：可參考[main.js](https://github.com/ingridkao/dashboard_demo_3.x/blob/main/src/main.js)



## Dark mode toggle
在UI上想在最右上方有一個按鈕，可以切換淺深色模式[實作於HeaderNav](https://github.com/ingridkao/dashboard_demo_3.x/blob/main/src/components/HeaderNav.vue)

> vueuse主要使用composition api的方式，之前還是大量的使用Option API的方式在開發，所以也需要習慣一下用法。關於為什麼要使用composition api，可以參考作者的[線上簡報](https://talks.antfu.me/2021/vueconf-china/1)
    
Element+暗黑模式[官網說明](https://element-plus.org/zh-CN/guide/dark-mode.html)
1. 自定義scss：可參考[element-variables](https://github.com/ingridkao/dashboard_demo_3.x/blob/main/src/assets/styles/element-variables.scss)
    > 透過App.vue引入，但應該有更好的做法(待優化)
2. 動態切換：使用vueuse的usedark
    > [vueuse用法](https://vueuse.org/core/usedark/#usedark)
3. 由於Element+的方式使用CSS Vars變數來市縣動態更新色彩模式，並偵測html的class，依據官網再稍微改一下寫法
    ```
    <script setup>
        import { useColorMode } from '@vueuse/core'
        const mode = useColorMode({
            class: 'theme'
        })
    </script>
    ```



## FullScreen
> 在UI上想在最右上方有一個按鈕，可以將內容全螢幕。

由於想要把整個容器一起全螢幕所以實作在App.vue中，[實作參考](https://github.com/ingridkao/dashboard_demo_3.x/blob/main/src/App.vue)



## Highcharts
> `npm install highcharts highcharts-vue`
1. 



## Async Components
之前使用`<component :is="Foo" />`來寫動態組件，如[說明](https://vuejs.org/api/sfc-script-setup.html#using-components)，主要是傳圖表類型，在呈現不同圖表。

但使用vue3的時候好像對於字串轉參數較嚴格，撞了一個小時牆後來使用[defineAsyncComponent](https://vuejs.org/guide/components/async.html)就成功了＾＾

```
<script setup>
	import LoadingComponent from '@/components/highcharts/LoadingComponent.vue'
	import errorComponent from '@/components/highcharts/errorComponent.vue'
    import { defineAsyncComponent } from 'vue'
    const props = defineProps({
        request: { 
            type: Object || null
        }
    })
    const AsyncComp = defineAsyncComponent({
        loader: () => import(`../highcharts/${props.request.type}.vue`),
        loadingComponent: LoadingComponent,
        delay: 200,
        //   errorComponent: ErrorComponent,
        timeout: 3000
    })
</script>

<template>
    <AsyncComp/>
</template>
```


## favicon
當項目使用@vue/cli-plugin-pwa這個插件，會更改網頁圖標路自動生成public/img/icons的路徑
> [pwa.iconPaths](https://github.com/vuejs/vue-cli/tree/dev/packages/@vue/cli-plugin-pwa#readme)
> 在`vue.config.js`中補上設置
> @vue/cli-plugin-pwa v4.3.0後可以補上`null`並重啟

```
    pwa: {
        iconPaths: {
            faviconSVG: null,
            favicon32: null,
            favicon16: null,
            appleTouchIcon: null,
            maskIcon: null,
            msTileImage: null
        }
    }
```
加完重新`npm run serve`後icon就會出現，但會出現error: /android-chrome-192x192.png Not Found
這邊讓他讀取到原本的icon list變成空陣列

```
    pwa: {
        ...
        manifestOptions: {
            name: "城市運營聯合儀表板",
            short_name: "城市運營儀表板",
            start_url: "index.html",
            display: "standalone",
            theme_color: "#080403",
            icons: []
        }
    }
```



## mapbox
目前使用過的地圖框架，大概有三四個，如果想要開源免費的版本會優先挑選Leaflet，
如果需要商家即時資訊的話googleMap還是較具優勢，
而MapboxGL具有幾項優勢像是採取webGL可以透過內建的function來開發3D或是其他視覺，並且在資料filter等功能很齊全。

缺點有兩個一個是比較少人使用，但是官方文件和範例寫的非常仔細，完全可以彌補這個缺點；
另外是有可能計費，但目前測試如果不是應用在擁有大量使用者的網頁，應該不至於被收費。

可以參考下列網址
[快速上手](https://docs.mapbox.com/mapbox-gl-js/guides/install/#quickstart)
[Changelog](https://github.com/mapbox/mapbox-gl-js/blob/main/CHANGELOG.md)



tags: `Vue` `element-plus` `vueuse` `composition api` `mapbox`