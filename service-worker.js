if(!self.define){let d,e={};const a=(a,s)=>(a=new URL(a+".js",s).href,e[a]||new Promise((e=>{if("document"in self){const d=document.createElement("script");d.src=a,d.onload=e,document.head.appendChild(d)}else d=a,importScripts(a),e()})).then((()=>{let d=e[a];if(!d)throw new Error(`Module ${a} didn’t register its module`);return d})));self.define=(s,o)=>{const r=d||("document"in self?document.currentScript.src:"")||location.href;if(e[r])return;let i={};const n=d=>a(d,r),_={module:{uri:r},exports:i,require:n};e[r]=Promise.all(s.map((d=>_[d]||n(d)))).then((d=>(o(...d),i)))}}define(["./workbox-79ffe3e0"],(function(d){"use strict";d.setCacheNameDetails({prefix:"citydashboard_3.X"}),self.addEventListener("message",(d=>{d.data&&"SKIP_WAITING"===d.data.type&&self.skipWaiting()})),d.precacheAndRoute([{url:"/dashboard_demo_3.x/css/158.6ddbfa72.css",revision:null},{url:"/dashboard_demo_3.x/css/171.e98c3406.css",revision:null},{url:"/dashboard_demo_3.x/css/266.022d7d87.css",revision:null},{url:"/dashboard_demo_3.x/css/346.a302cde7.css",revision:null},{url:"/dashboard_demo_3.x/css/474.25ad9be1.css",revision:null},{url:"/dashboard_demo_3.x/css/688.052b979e.css",revision:null},{url:"/dashboard_demo_3.x/css/743.e98c3406.css",revision:null},{url:"/dashboard_demo_3.x/css/857.b416a2e8.css",revision:null},{url:"/dashboard_demo_3.x/css/893.888d0620.css",revision:null},{url:"/dashboard_demo_3.x/css/app.e62bfde8.css",revision:null},{url:"/dashboard_demo_3.x/css/chunk-vendors.f03cd975.css",revision:null},{url:"/dashboard_demo_3.x/datas/building_renewunit_12.geojson",revision:"5a58894d67abffac6dbf4bf0594e4242"},{url:"/dashboard_demo_3.x/datas/building_renewunit_20.geojson",revision:"c7c806eef592fd1b2af0e665cb06329e"},{url:"/dashboard_demo_3.x/datas/building_renewunit_30.geojson",revision:"ba4b093586894bd2f0006fda05934809"},{url:"/dashboard_demo_3.x/datas/building_unsued_public.geojson",revision:"ea8c9f1e0566c4925e7e4def7d1f4cfa"},{url:"/dashboard_demo_3.x/datas/day/sentiment_dispatching.json",revision:"b63d7809ae0473806d1bfe59dc70c801"},{url:"/dashboard_demo_3.x/datas/day/sentiment_hello_taipei_109.json",revision:"3742dcdedd34c8a17f713fa58b1a5b23"},{url:"/dashboard_demo_3.x/datas/day/traffic_accident.json",revision:"3093cb28ca2cecf025a16c4db0abe803"},{url:"/dashboard_demo_3.x/datas/dispatchingpoint.geojson",revision:"ddf9085dd497a2d4fa2050f38128b818"},{url:"/dashboard_demo_3.x/datas/hour/sentiment_dispatching.json",revision:"dd0d82c2285815aa64fe7a80b969ffdc"},{url:"/dashboard_demo_3.x/datas/hour/sentiment_hello_taipei_109.json",revision:"6d60a350b6a3362addf3029e9ffa0778"},{url:"/dashboard_demo_3.x/datas/hour/traffic_accident.json",revision:"c69f5f870e7a37072de855b359c4063f"},{url:"/dashboard_demo_3.x/datas/it_tpmo_poc_location.geojson",revision:"ee8f00f97e57d82cbcfd0fac18d1c7f1"},{url:"/dashboard_demo_3.x/datas/month/sentiment_dispatching.json",revision:"5767fc060ed6354f4e954adcb6edceee"},{url:"/dashboard_demo_3.x/datas/month/sentiment_hello_taipei_109.json",revision:"7c25383dc81884ca11ad2ab002368d90"},{url:"/dashboard_demo_3.x/datas/month/traffic_accident.json",revision:"c0f0cc9a5f555832a77796ec159e2876"},{url:"/dashboard_demo_3.x/datas/patrol_debrisarea.geojson",revision:"87ab3932b339e4698ed04d7d1c8265b5"},{url:"/dashboard_demo_3.x/datas/patrol_designate_place.geojson",revision:"50dbd5dfe4eac050ad0d7b7d3ad66be7"},{url:"/dashboard_demo_3.x/datas/patrol_district.geojson",revision:"e326132f1241a81192caca91719de898"},{url:"/dashboard_demo_3.x/datas/patrol_fire_brigade.geojson",revision:"dfd945d934e250282a0d55742ab5fb59"},{url:"/dashboard_demo_3.x/datas/patrol_old_settlement.geojson",revision:"fc6556648390dd19a5190693f12366a1"},{url:"/dashboard_demo_3.x/datas/police_station.geojson",revision:"03929f0e4bdf0d63bf7c78880c02c91a"},{url:"/dashboard_demo_3.x/datas/social_house.geojson",revision:"c8322f062cc92e3ced7aa49cf10d9e46"},{url:"/dashboard_demo_3.x/datas/taipei_town.geojson",revision:"863660953d197b3ac415896efea942bf"},{url:"/dashboard_demo_3.x/datas/tp_fet_age_hr.geojson",revision:"a26dd1929700f14a4e8ece3cdeae4717"},{url:"/dashboard_demo_3.x/datas/tp_fet_work_live.geojson",revision:"b4bea871f718e564a1ece845be3dc03d"},{url:"/dashboard_demo_3.x/datas/traffic_bus_station.geojson",revision:"cce25ae81300761843fe5f1088b2fbeb"},{url:"/dashboard_demo_3.x/datas/traffic_lives.geojson",revision:"f3373af5d65510f31bc3f5371a16c4a3"},{url:"/dashboard_demo_3.x/datas/traffic_metro_line.geojson",revision:"eaa404209f0cd9ec8dfad28d9deeecab"},{url:"/dashboard_demo_3.x/datas/traffic_metro_station.geojson",revision:"7cf5db66cc19566045faaa437bb1a6e5"},{url:"/dashboard_demo_3.x/datas/traffic_todaywork_view.geojson",revision:"aae0ebfd98f572613ab5425470245d41"},{url:"/dashboard_demo_3.x/datas/traffic_youbike_station.geojson",revision:"ca18fafdf547d1065a6de1fb1af2a92a"},{url:"/dashboard_demo_3.x/img/TUIC.851a4a7d.svg",revision:null},{url:"/dashboard_demo_3.x/index.html",revision:"e8583f5cc39542a855c2f012d1e21505"},{url:"/dashboard_demo_3.x/js/158.1de4bd94.js",revision:null},{url:"/dashboard_demo_3.x/js/171.524418b7.js",revision:null},{url:"/dashboard_demo_3.x/js/266.fc02f7fa.js",revision:null},{url:"/dashboard_demo_3.x/js/311.2630b149.js",revision:null},{url:"/dashboard_demo_3.x/js/346.7f12ecde.js",revision:null},{url:"/dashboard_demo_3.x/js/474.487ebbd2.js",revision:null},{url:"/dashboard_demo_3.x/js/688.46727675.js",revision:null},{url:"/dashboard_demo_3.x/js/743.42447ad3.js",revision:null},{url:"/dashboard_demo_3.x/js/857.43a83e3e.js",revision:null},{url:"/dashboard_demo_3.x/js/893.7c3b9cba.js",revision:null},{url:"/dashboard_demo_3.x/js/app.56409330.js",revision:null},{url:"/dashboard_demo_3.x/js/mapbox-gl-rtl-text.js",revision:"e3b1bd3256c6e2785c1c7786bf60a1a7"},{url:"/dashboard_demo_3.x/manifest.json",revision:"9d36fdfd106fe1dce781827ebce92e7b"}],{})}));
//# sourceMappingURL=service-worker.js.map
