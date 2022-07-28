export const topicList = [
    {
        index: 'Sentiment',
        icon:"ChatDotRound",
        title: '民情熱議',
        disabled: false
    },
    {
        index: 'Patrol',
        icon:"Aim",
        title: '城市安防',
        disabled: false
    },
    {
        index: 'Traffic',
        icon:"Van",
        title: '城市交通',
        disabled: false
    },
    {
        index: 'Construction',
        icon:"OfficeBuilding",
        title: '城市建設',
        disabled: false
    },
    {
        index: 'Basic',
        icon:"Briefcase",
        title: '基本圖資',
        disabled: false
    }
]

export const basicMapLayer = [
    {
        index: 'building_publand',
        name: '公有土地',
        order: 1,
        overview_display: 'large',
        source_from: '地政局',
        request_list: [{
            type: 'TreeMap',
            config: {},
            data:[
                {name:"公私共有",value: 11.51243749 ,color:"#07a0d4"},
                {name:"其他政府機關有",value: 0.91925099 ,color:"#007aff"},
                {name:"國有",value: 69.71615706999988, color:"#2d7b7d"},
                {name:"臺北市及國有共有",value: 7.432367920000001 ,color:"#27d5d7"},
                {name:"臺北市有",value: 43.60226278000003,color:"#38b19f"},
                {name:"臺北市有、國有及其他政府機關共有",value: 0.5184777100000001 ,color:"#3975b7"},
                {name:"臺北市有及非國有政府機關共有",value: 0.05869149 ,color:"#223477"}
            ]
        }]
    },
    {
        index: '',
        name: '警察相關設施',
        order: 2,
        source_from: '',
        request_list: []
    },
    {
        index: '',
        name: '消防應變設施',
        order: 3,
        source_from: '',
        request_list: []
    },
    {
        index: 'building_landuse',
        name: '都市計畫用地類型',
        order: 4,
        overview_display: 'large',
        source_from: '都發局',
        request_list: [{
            type: 'TreeMap',
            config: {},
            data:[
                {name: "保護區", value: 68.95487201399997, color:"#7fff00"},
                {name: "其他", value: 54.980457214000005,color:"#00ff00"},
                {name: "住宅用地類", value: 38.32658783599997,color:"#ffff00"},
                {name: "水域", value: 20.278449778000013,color:"#7fffff"},
                {name: "綠地", value: 12.989934836000005,color:"#00ff00"},
                {name: "文教用地類", value: 11.639669542999986,color:"#bf7fff"},
                {name: "商業用地類", value: 9.285234021999987,color:"#e6e6e6"},
                {name: "交通用地類", value: 7.966499887000001,color:"#e6e6e6"},
                {name: "機關用地類", value: 5.979598264999998,color:"#bf7fff"},
                {name: "農業區", value: 5.267627249999999,color:"#7fff00"},
                {name: "工業區類", value: 4.009408242000001,color:"#7f3f00"},
                {name: "設施類", value: 2.0751619929999996,color:"#b3b3b3"},
                {name: "風景區", value: 1.7450766370000004,color:"#7fff00"},
                {name: "動物園用地", value: 1.644274776,color:"#00ff00"},
                {name: "專用區類", value: 1.4745479699999997,color:"#ff003f"},
                {name: "醫療用地類", value: 0.6728907040000001,color:"#bf7fff"},
                {name: "娛樂區", value: 0.578546754,color:"#ff8fad"},
                {name: "市場用地類", value: 0.5286828530000002,color:"#ff3f00"},
                {name: "遊樂區", value: 0.52481217,color:"#00ff00"},
                {name: "體育場", value: 0.301448423,color:"#00ff00"},
                {name: "中正紀念堂", value: 0.24946848000000002,color:"#00ff00"},
                {name: "保存區", value: 0.16782077599999998,color:"#00ff00"},
                {name: "兒童遊樂場", value: 0.013729825,color:"#00ff00"}
            ]
        }]
    },
    {
        index: '',
        name: '活動人口推估',
        source_from: '遠傳電信',
        order: 5,
        request_list: []
    },
    {
        index: '',
        name: '居職人口推估',
        source_from: '遠傳電信',
        order: 6,
        request_list: []
    },
    {
        index: '',
        name: '水災風險',
        source_from: '',
        order: 7,
        request_list: []
    }
]

/**
 * overview_display: default(1X1)| wide(2X1) |tall(1X2) | large(2X2)
 */
export const topicComponentList = [
    {
        index: "Sentiment",
        components: [
            {
                index: 'hotnews',
                name: '新聞熱議關鍵字',
                overview_display: '',
                order: 1,
                sample_data: '2022-07-28',
                source_from: '新聞知識系統',
                request_list: [{
                    type: 'WordCloud',
                    config: {
                        label: "出現次數"
                    },
                    data:[
                        {name: '美國', weight: 60, color: "hsl(210deg,80%,54%)"},
                        {name: '協助', weight: 49, color: "hsl(210deg,80%,54%)"},
                        {name: '張芷瑄', weight: 42, color: "hsl(210deg,80%,54%)"},
                        {name: '疫情', weight: 39, color: "hsl(210deg,80%,54%)"},
                        {name: '投資', weight: 36, color: "hsl(210deg,80%,54%)"},
                        {name: '風險', weight: 26, color: "hsl(210deg,80%,54%)"},
                        {name: '高雄', weight: 25, color: "hsl(210deg,80%,54%)"},
                        {name: '裴洛西', weight: 24, color: "hsl(210deg,80%,54%)"},
                        {name: '華盛頓', weight: 12, color: "hsl(210deg,80%,54%)"},
                        {name: '出訪', weight: 12,color: "hsl(210deg,80%,54%)"},
                        {name: '戰略', weight: 11, color: "hsl(210deg,80%,54%)"},
                        {name: '國防', weight: 10, color: "hsl(210deg,80%,54%)"},
                        {name: '防衛', weight: 9,color: "hsl(210deg,50%,54%)"},
                        {name: '國防部', weight: 7, color: "hsl(210deg,50%,54%)"},
                        {name: '眾議院議長', weight: 6, color: "hsl(210deg,50%,54%)"},
                        {name: '訪問台灣', weight: 6, color: "hsl(210deg,50%,54%)"},
                        {name: '刑法', weight: 4, color: "hsl(210deg,50%,54%)"},
                        {name: '發言', weight: 4, color: "hsl(210deg,50%,54%)"},
                        {name: '軍方', weight: 6,color: "hsl(210deg,50%,54%)"},
                        {name: '國家安全', weight: 3, color: "hsl(210deg,50%,54%)"},
                        {name: '行政院', weight: 2, color: "hsl(210deg,50%,54%)"},
                        {name: '高溫', weight: 2, color: "hsl(210deg,50%,54%)"}
                    ]
                }]
            },
            {
                index: "hello_taipei",
                name: "1999話務案件局處",
                overview_display: '',
                order: 2,
                sample_data: '',
                source_from: "1999話務系統",
                request_list: []
            },
            {
                index: 'dispatching',
                name: '派工案件',
                overview_display: 'tall', 
                order: 3,
                sample_data: '',
                source_from: '',
                request_list: []
            },
            {
                index: 'circular',
                name: '單一陳情系統案件',
                source_from: 'HelloTaipei陳情系統',
                overview_display: 'wide',
                order: 4,
                sample_data: '',
                source_from: 'HelloTaipei',
                request_list: [
                    // {
                    //     type: 'AlarmBar',
                    //     name: '累計件數',
                    //     color: ['#27d5d7'],
                    //     config:{
                    //         total: {
                    //             title: '累積件數(本週)',
                    //             formula: 'sum'
                    //         }
                    //     },
                    //     path:'/sentiment/component/hellotaipei',
                    //     form_data: {
                    //         column: '案件主類',
                    //         start: "2020-12-25T00:00:00+08:00",
                    //         end: "2020-12-31T23:59:59+08:00"
                    //     },
                    //     data: []
                    // }
                ]
            }
        ]
    },
    {
        index: 'Patrol',
        components: [
            {
                index: 'designate',
                name: '避難收容地點',
                overview_display: '',
                order: 1,
                sample_data: '',
                source_from: '消防局',
                request_list: [
                    // {
                    //     type: 'MapDisplay',
                    //     path: '/patrol/component/patroldesignateplace',
                    //     config: {
                    //         mapLabels:[
                    //             {
                    //                 select_array: '避難場所',
                    //                 symbol: 'circle_stroke',
                    //                 color: '#FDD79B',
                    //                 unit: '處'
                    //             }
                    //         ],
                    //         statistic: true
                    //     } 
                    // }
                ],
                map_config:[
                    {
                        raster:{
                            index: 'patrol_designate_place',
                            title: '避難場所',
                            symbol: 'circle',
                            color: '#4cd9c1',
                            paint: {
                                "circle-opacity": 0,
                                "circle-stroke-width": 1,
                                'circle-stroke-color': '#FDD79B',
                                'circle-radius': [
                                    'interpolate', ['cubic-bezier', 0, 0.5, 1, 1],
                                    ["to-number", ["get", "容納人數"]],
                                    50,
                                    1,
                                    50000,
                                    100
                                ]
                            },
                            property: ['名稱', '道路門牌', '水災', '震災', '土石流', '海嘯', '是否設置無障礙設施', '室內', '室外', '服務里別','容納人數']
                        }
                    }
                ]
            },
            {
                index: 'flood_risk',
                name: '水災風險地區',
                overview_display: '',
                order: 2,
                source_from: '消防局',
                request_list: [
                    // {
                    //     type: 'MapDisplay',
                    //     config: {
                    //         mapLabels:[
                    //             {
                    //                 select_array: '高風險地區',
                    //                 symbol: 'Area',
                    //                 unit: 'km²',
                    //                 color: '#baf4f5'
                    //             },
                    //             {
                    //                 select_array: '低風險地區',
                    //                 symbol: 'Area',
                    //                 unit: 'km²',
                    //                 color: '#009ff4'
                    //             },
                    //             {
                    //                 select_array: '中風險地區',
                    //                 symbol: 'Area',
                    //                 unit: 'km²',
                    //                 color: '#352ad1'
                    //             }
                    //         ]
                    //     }
                    // }
                ],
                map_config:[
                    {
                        raster:{
                            index: 'patrol_flood_100',
                            title: '水災風險地區',
                            symbol: 'fill',
                            paint: {
                                'fill-color':[
                                    'match',
                                    ['get', 'name'],
                                    '1.0 m ~ 2.0 m',
                                    '#0a85f4',
                                    '0.30 m ~ 1.0 m',
                                    '#68ccf8',
                                    '0.15 m ~ 0.30 m',
                                    '#205CE6',
                                    '#ccc'
                                ]
                            },
                            property: ['name']
                        }
                    },
                    {
                        raster:{
                            index: 'patrol_flood_78_8',
                            title: '水災風險地區',
                            symbol: 'fill',
                            paint: {
                                'fill-color':[
                                    'match',
                                    ['get', 'name'],
                                    '1.0 m ~ 2.0 m',
                                    '#0a85f4',
                                    '0.30 m ~ 1.0 m',
                                    '#68ccf8',
                                    '0.15 m ~ 0.30 m',
                                    '#205CE6',
                                    '#ccc'
                                ]
                            },
                            property: ['name']
                        }
                    },
                    {
                        raster:{
                            index: 'patrol_flood_130',
                            title: '水災風險地區',
                            symbol: 'fill',
                            paint: {
                                'fill-color':[
                                    'match',
                                    ['get', 'name'],
                                    '1.0 m ~ 2.0 m',
                                    '#0a85f4',
                                    '0.30 m ~ 1.0 m',
                                    '#68ccf8',
                                    '0.15 m ~ 0.30 m',
                                    '#205CE6',
                                    '#ccc'
                                ]
                            },
                            property: ['name']
                        }
                    }
                ]
            },
            {
                index: 'slope_area_risk',
                name: '山坡地風險地點',
                overview_display: '',
                order: 4,
                source_from: '工務局',
                request_list: [
                    // {
                    //     type: 'MapDisplay',
                    //     path:'/patrol/component/patroldebris',
                    //     config: {
                    //         mapLabels: [
                    //             {
                    //                 select_array: '土石流潛勢溪流',
                    //                 symbol: 'line',
                    //                 unit: '處',
                    //                 color: '#d7c500',
                    //             },
                    //             {
                    //                 select_array: '土石流影響範圍',
                    //                 symbol: 'Area',
                    //                 unit: '處',
                    //                 color: '#958f00',
                    //             },
                    //             {
                    //                 select_array: '列管邊坡',
                    //                 symbol: 'line',
                    //                 unit: '處',
                    //                 color: '#ff9800',
                    //             },
                    //             {
                    //                 select_array: '老舊聚落',
                    //                 symbol: 'Area',
                    //                 unit: '處',
                    //                 color: '#9e7b5c',
                    //             }
                    //         ]
                    //     }
                    // }
                ],
                map_config:[
                    {
                        raster:{
                            index: 'patrol_debris',
                            title: '土石流潛勢溪流',
                            symbol: 'line',
                            color:  '#d7c500',
                            property: ['mark','risk','stra_1','stra_2','basin','sub_basin','date','year']
                        }
                    },
                    {
                        raster:{
                            index: 'patrol_debrisarea',
                            title: '土石流影響範圍',
                            symbol: 'fill',
                            color: '#958f00',
                            property: ['total_res','risk']
                        }
                    },
                    {
                        raster:{
                            index: 'patrol_artificial_slope',
                            title: '列管邊坡',
                            symbol: 'line',
                            color: '#ff9800',
                            property: ['level']
                        }
                    },
                    {
                        raster:{
                            index: 'patrol_old_settlement',
                            title: '老舊聚落',
                            symbol: 'fill',
                            color: '#9e7b5c',
                            property: ['name']
                        }
                    }
                ]
            },
            {
                index: '',
                name: '水位監測',
                overview_display: '',
                order: 3,
                sample_data: '',
                source_from: '',
                request_list: []
            },
            {
                index: '',
                name: '抽水站狀態',
                overview_display: '',
                order: 5,
                sample_data: '',
                source_from: '',
                request_list: []
            },
            {
                index: '',
                name: '刑事統計',
                overview_display: '',
                order: 6,
                source_from: '',
                sample_data: '',
                request_list: []
            }

        ]
    },
    {
        index: 'Traffic',
        components: [
            {
                index: 'traffic_accident',
                name: '交通事故統計',
                overview_display: '',
                order: 1,
                source_from: '警察局',
                sample_data: '2021-02-28',
                request_list: []
            },
            {
                index: 'traffic_live',
                name: '交通路況',
                overview_display: 'wide',
                order: 4,
                source_from: '交通局',
                sample_data: '',
                request_list: []
            },
            {
                index: 'traffic_todaywork',
                name: '道路施工',
                overview_display: 'wide',
                order: 6,
                source_from: '工務局',
                sample_data: '',
                request_list: []
            },
            {
                index: 'traffic_mrt',
                name: '捷運人流趨勢',
                overview_display: '',
                order: 2,
                source_from: '捷運公司',
                sample_data: '',
                request_list: []
            },
            {
                index: '',
                name: '板南線車廂擁擠程度',
                overview_display: 'tall',
                order: 3,
                source_from: '',
                sample_data: '',
                request_list: []
            },
            {
                index: '',
                name: 'Youbike空位數量',
                overview_display: '',
                order: 5,
                source_from: '',
                sample_data: '',
                request_list: []
            },
            {
                index: '',
                name: '公車行駛狀態',
                overview_display: '',
                order: 7,
                source_from: '',
                sample_data: '',
                request_list: []
            }
        ]
    },
    {
        index: 'Construction',
        components: [
            {
                index: 'building_renew',
                name: '都市更新案件',
                overview_display: '',
                order: 4,
                source_from: '都市更新處',
                sample_data: '',
                request_list: []
            },
            {
                index: 'social_house',
                name: '社會住宅建設進度',
                overview_display: '',
                order: 5,
                source_from: '都發局',
                sample_data: '',
                request_list: []
            },
            {
                index: 'building_age',
                name: '全市屋齡分布',
                overview_display: 'wide',
                order: 2,
                source_from: '建管處',
                sample_data: '',
                request_list: []
            },
            {
                index: '',
                name: '建管處發照量',
                overview_display: '',
                order: 1,
                source_from: '建管處',
                sample_data: '',
                request_list: []
            },
            {
                index: 'tpmo',
                name: 'TPMO智慧城市專案',
                overview_display: '',
                order: 3,
                source_from: 'TPMO',
                sample_data: '2022-07-24',
                request_list: [{
                    type: 'Column',
                    config: {},
                    categories:["智慧經濟", "智慧安防", "智慧教育", "智慧建築", "智慧交通", "智慧健康", "智慧環境", "智慧政府", "其他"],
                    data:[47,23,25,31,59,63,39,53,11]
                }]
            }
        ]
    },
    {
        index: 'Basic',
        components: basicMapLayer
    }
]