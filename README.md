---
title: 'dashboard_demo vue3.X'
disqus: hackmd
---
# dashboard_demo_3.x

這個版本除了將Vue從2.x升級成3.X，也將原本使用的ElementUI升級成新的ElementPlus，建議使用vueuse來做一些動態切換。
在這邊紀錄一些建置過程中花比較多時間的問題：



# Table of Contents
* [Element plus](#element-plus)
* [Dark mode](#dark-mode-toggle)
* [FullScreen](#fullScreen)



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
在UI上想在最右上方有一個按鈕，可以將內容全螢幕
由於想要把整個容器一起全螢幕所以實作在App.vue中
[實作參考](https://github.com/ingridkao/dashboard_demo_3.x/blob/main/src/App.vue)


tags: `Vue` `element-plus` `vueuse` `composition api`