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
            config: {
                layoutAlgorithm: "squarified"
            },
            data:[
                {name:"國有",value: 69.71615706999988, color:"#2d7b7d"},
                {name:"臺北市有",value: 43.60226278000003,color:"#38b19f"},
                {name:"公私共有",value: 11.51243749 ,color:"#07a0d4"},
                {name:"其他政府機關有",value: 0.91925099 ,color:"#007aff"},
                {name:"臺北市及國有共有",value: 7.432367920000001 ,color:"#27d5d7"},
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
        request_list: [
            {
                type: 'MapIconDisplay'
            }
        ]
    },
    {
        index: '',
        name: '消防應變設施',
        order: 3,
        source_from: '',
        request_list: [
            {
                type: 'MapIconDisplay'
            }
        ]
    },
    {
        index: 'building_landuse',
        name: '都市計畫用地類型',
        order: 4,
        overview_display: 'large',
        source_from: '都發局',
        request_list: [{
            type: 'TreeMap',
            config: {
            },
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
        request_list: [
            {
                type: 'MapIconDisplay'
            }
        ]
    },
    {
        index: '',
        name: '居職人口推估',
        source_from: '遠傳電信',
        order: 6,
        request_list: [
            {
                type: 'MapIconDisplay'
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
            {
                type: 'MapIconDisplay',
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
            }
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
                sample_data: '2022-08-03',
                source_from: '新聞知識系統',
                request_list: [{
                    type: 'WordCloud',
                    config: {
                        label: "出現次數"
                    },
                    data:[
                        {name: '美國', weight: 60, color: "hsl(210deg,80%,54%)"},
                        {name: '裴洛西', weight: 60, color: "hsl(210deg,80%,54%)"},
                        {name: '協助', weight: 49, color: "hsl(210deg,80%,54%)"},
                        {name: '疫情', weight: 39, color: "hsl(210deg,50%,54%)"},
                        {name: '投資', weight: 36, color: "hsl(210deg,50%,54%)"},
                        {name: '風險', weight: 26, color: "hsl(210deg,50%,54%)"},
                        {name: '國防', weight: 20, color: "hsl(210deg,25%,54%)"},
                        {name: '眾議院議長', weight: 16, color: "hsl(210deg,25%,54%)"}
                    ]
                }]
            },
            {
                index: "hello_taipei",
                name: "1999話務案件局處",
                overview_display: '',
                order: 2,
                sample_data: '2022-08-03',
                source_from: "1999話務系統",
                request_list: [{
                    type: 'Circle',
                    config: {
                        label: "案件數"
                    },
                    data:[
                        {name: "1999話務中心",y: 15652,color: "#7ad1a9"},
                        {name: "環保局",y: 8213,color: "#1b9ac5"},
                        {name: "衛生局",y: 5349,color: "#2e999a"},
                        {name: "都發局建管處",y: 2496,color: "#0dbab8"},
                        {name: "中央行政機關或其他地方政府機關",y: 2048,color: "#42d9c7"},
                        {name: "社會局",y: 1935,color: "#00563F"},
                        {name: "其他",y: 1872,color: "#3875b7"},
                        ['產業局商業處', 1528],
                        ['勞動局', 1506],
                        ['警察局', 1144],
                        ['都發局',  761],
                        ['交通局',  691],
                        ['教育局',  619],
                        ['觀傳局',  570],
                        ['交通局交工處', 554],
                        ['工務局公園處', 548],
                        ['區公所',542],
                        ['消防局',509],
                        ['民政局',499],
                        ['交通局公運處', 450],
                        ['法務局',409],
                        ['交通局停管處', 357],
                        ['資訊局',341],
                        ['產業局動保處', 287],
                        ['秘書處', 283],
                        ['地政局',275],
                        ['工務局新工處', 272],
                        ['自來水處', 251],
                        ['產業局',245],
                        ['研考會',198],
                        ['兵役局',189],
                        ['非市政單位',147],
                        ['捷運公司',134],
                        ['文化局',133],
                        ['財政局稅捐處', 99],
                        ['工務局水利處', 70],
                        ['臺北市議會',65],
                        ['工務局',63],
                        ['交通局裁決所',51],
                        ['體育局',51],
                        ['工務局衛工處', 50],
                        ['財政局',46],
                        ['主計處', 46],
                        ['副市長室',34],
                        ['市長室',33],
                        ['人事處', 27],
                        ['產業局市場處', 23],
                        ['工務局大地處', 17],
                        ['原民會',13],
                        ['政風處',13],
                        ['捷運局', 8],
                        ['臺北市選委會', 5],
                        ['都市計畫委員會', 5],
                        ['公訓處', 4]
                    ]
                }]
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
                sample_data: '2022-08-03',
                source_from: 'HelloTaipei',
                request_list: [{
                    type: 'Circle',
                    config: {
                        label: "案件數"
                    },
                    data:[
                        {name: "其他事項",y: 1127,color: "#C5E1A5"},
                        {name: "公車、計程車、復康巴士問題",y: 433,color: "#ADED64"},
                        {name: "建築物使用管理、違建查報及拆除（含防火巷占用、固定式騎樓障礙物）",y: 331,color: "#7BB661"},
                        {name: "環保稽查",y: 312,color: "#479562"},
                        {name: "停車管理及收費問題（含停車場內違規停車）",y: 306,color: "#357664"},
                        {name: "違規停車",y: 294,color: "#00563F"},
                        {name: "治安維護（含警政風紀、妨害風化（俗））",y: 223,color: "#04432C"},
                        ['疫情相關', 193],
                        ['標線增設、補繪或塗銷', 176],
                        ['勞工權益、職業安全衛生', 141],
                        ['違規罰單問題', 135],
                        ['人行道維護', 125],
                        ['無牌廢棄車、廢棄物處理（含醫療廢棄物）及資源回收', 122],
                        ['道路凹陷、不平、有高低差', 121],
                        ['教育事務（校園、教師、幼兒園、圖書館、補教業）', 105],
                        ['公寓大廈及廣告招牌', 103],
                        ['一般公園綠地管理及設施維護（含車輛違規進入）', 102],
                        ['路面清潔（含行人果皮箱、菸蒂、狗便）', 100],
                        ['交通號（標）誌設置問題', 93],
                        ['食品衛生安全及藥品安全', 92],
                        ['路樹修剪維護、路燈遷移', 84],
                        ['社會救助、福利服務', 70],
                        ['管線施工、纜線附掛', 67],
                        ['室內通道違規及裝修', 61],
                        ['疾病防治及醫療管理', 57],
                        ['施工管理及建築損鄰', 56],
                        ['消防安全管理（含防災、搶救、火災調查及消防通道）', 53],
                        ['都市規劃、設計、更新、開發及管理', 52],
                        ['民政、區政業務（不含衛政、食安業務）', 50],
                        ['移工業務', 49],
                        ['微笑單車（YouBike）',45],
                        ['交通動線規劃問題', 43],
                        ['動物保護', 41],
                        ['體育事務（含大巨蛋狐疑專線事項）', 40],
                        ['有牌廢棄車', 39],
                        ['污水下水道維護（含孔蓋冒水）、污水管申接、污水排放稽查', 39],
                        ['產業發展（含工商業、農業、市場、公用事業等）', 38],
                        ['政風服務', 37],
                        ['路霸（移動式障礙物）檢舉', 37],
                        ['捷運營運、貓纜服務', 36],
                        ['河濱公園管理及設施維護（含車輛違規進入）', 32],
                        ['山坡地問題', 29],
                        ['地政業務（含房仲申訴）', 28],
                        ['文化事務（樹木保護、文化資產、表演藝術、文化場館、藝文推廣）', 25],
                        ['人與動物噪音', 24],
                        ['垃圾車清運及服務事項', 23],
                        ['都市計畫審議', 23],
                        ['自來水相關業務', 23],
                        ['地方稅務問題（不含國稅）', 20],
                        ['國民住宅、公共住宅', 19],
                        ['違規小廣告、旗幟', 19],
                        ['行人違規、自行車違規及道路障礙違規', 16],
                        ['城市美學-環境清潔整理', 16],
                        ['溝蓋遺失、鬆動、被打開', 13],
                        ['城市美學-道路橋梁',12],
                        ['菸害防制', 12],
                        ['拖吊問題', 11],
                        ['資訊服務', 9],
                        ['雨水下水道維護', 8],
                        ['城市美學-公園綠地廣場及行道樹',8],
                        ['員工事件通報', 8],
                        ['觀光事務（民宿、旅館、觀光活動諮詢）', 8],
                        ['城市美學-都市景觀',7],
                        ['就業服務、職能培育', 6],
                        ['訴願、國家賠償及消費爭議程序諮詢', 6],
                        ['排水溝疏通', 6],
                        ['捷運施工及路線規劃', 6],
                        ['交通管制疏導', 6],
                        ['交通事故', 5],
                        ['街友安置與管理', 4],
                        ['發生在公園之噪音', 4],
                        ['城市美學-捷運維運與服務', 4],
                        ['媒體事務（有線電視、出版品、吉祥物）',4],
                        ['專用袋（含兩用袋）、源頭減量（含限塑政策）',4],
                        ['城市美學-城市美學行銷',3],
                        ['監視器問題',3],
                        ['城市美學-其他事項',2],
                        ['城市美學-校園美學',2],
                        ['城市美學-公共藝術',2],
                        ['城市美學-建築及廣告物',2],
                        ['人民團體服務及勸募',2],
                        ['城市美學-社會住宅',2],
                        ['城市美學-市場及夜市',1],
                        ['城市美學-堤防及河濱公園',1]
                    ]
                },                    // {
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
                    {
                        type: 'MapIconDisplay',
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
                    }
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
                            }
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
                    {
                        type: 'MapIconDisplay',
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
                    }
                ],
                map_config:[
                    {
                        raster:{
                            index: 'patrol_debris',
                            title: '土石流潛勢溪流',
                            symbol: 'line',
                            color:  '#d7c500',
                            property: []
                        }
                    },
                    {
                        raster:{
                            index: 'patrol_debrisarea',
                            title: '土石流影響範圍',
                            symbol: 'fill',
                            color: '#958f00',
                            property: []
                        }
                    },
                    {
                        raster:{
                            index: 'patrol_artificial_slope',
                            title: '列管邊坡',
                            symbol: 'line',
                            color: '#ff9800',
                            property: []
                        }
                    },
                    {
                        raster:{
                            index: 'patrol_old_settlement',
                            title: '老舊聚落',
                            symbol: 'fill',
                            color: '#9e7b5c',
                            property: []
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
                request_list: [
                    {
                        type: 'MapIconDisplay'
                    }
                ]
            },
            {
                index: '',
                name: '抽水站狀態',
                overview_display: '',
                order: 5,
                sample_data: '',
                source_from: '',
                request_list: [
                    {
                        type: 'MapIconDisplay'
                    }
                ]
            },
            {
                index: 'criminalcase',
                name: '刑事統計',
                overview_display: '',
                order: 6,
                source_from: '警察局',
                sample_data: '2022-01-01',
                request_list: [{
                    type: 'LineArea',
                    keyratio:{
                        name: "發生總件數",
                        info: [
                            {label: "破獲總案件", value: 18879},
                            {label: "平均破獲率", value: '76.27%'},
                        ]
                    },
                    config: {},
                    categories:["3月", "4月", "5月", "6月", "7月", "8月"],
                    data:[{
                        name: '今年',
                        data: [4409, 3924, 3527, 3685, 4623, 4534],
                        color: "#FD5696"
                    },{
                        type: 'line',
                        dashStyle: 'ShortDash',
                        name: '去年',
                        data: [4585, 4308, 4298, 4304, 4541, 4673],
                        color: "#00A9E0"
                    }]
                }]
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
                request_list: [{
                    type: 'Circle',
                    config: {
                        title: "事故總數",
                        label: "事故件數",
                    },
                    keyratio:{
                        info: [
                            {label: "4月事故死亡人數", value: 2504},
                            {label: "4月事故受傷人數", value: 2502},
                        ]
                    },
                    data:[
                        {name: "A1",y: 2,color: "#ca0020"},
                        {name: "A2",y: 1854,color: "#ff996c"},
                        {name: "A3",y: 1462,color: "#f8c3ac"}
                    ]
                }]
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
                source_from: '臺北大眾捷運股份有限公司',
                sample_data: '2022-08-04',
                request_list: [{
                    type: 'LineArea',
                    keyratio:{
                        name: "總搭乘數",
                        info: [
                            {label: "近一小時進站人數", value: 46100},
                            {label: "近一小時出站人數", value: 45409},
                        ]
                    },
                    config: {
                        plotOptions:{
                            pointInterval: 30 * 60 * 1000,
                            pointStart: Date.UTC(2022,8,4,0,0,0,0)
                        },
                        xAxis:{
                            type: 'datetime',
                            dateTimeLabelFormats: {
                              hour: '%H:%M',
                            }
                        }
                    },
                    data:[{
                        name: '進站',
                        data:[
                            2442,
                            330,
                            0,
                            0,
                            0,
                            0,
                            0,
                            0,
                            0,
                            0,
                            1,
                            7088,
                            15626,
                            32765,
                            63942,
                            100173,
                            115744,
                            82071,
                            53149,
                            40234,
                            33449,
                            31693,
                            32865,
                            32511,
                            40018,
                            38713,
                            38660,
                            35454,
                            34829,
                            31646,
                            33679,
                            36323,
                            46100
                        ],
                        color: "#7ad1a9"
                    },{
                        name: '出站',
                        data:[
                            5573,
                            2270,
                            0,
                            0,
                            0,
                            0,
                            0,
                            0,
                            0,
                            0,
                            38,
                            7667,
                            18457,
                            37252,
                            71334,
                            106425,
                            120484,
                            69522,
                            49478,
                            36610,
                            33013,
                            31329,
                            33781,
                            33535,
                            39931,
                            38111,
                            38563,
                            34664,
                            34515,
                            30593,
                            34935,
                            38183,
                            45409
                        ],
                        color: "#229cc6"
                    }]
                }]
            },
            {
                index: 'traffic_mrt_bl',
                name: '板南線車廂擁擠程度',
                overview_display: 'tall',
                order: 3,
                source_from: '',
                sample_data: '',
                request_list: []
            },
            {
                index: 'youbike',
                name: 'Youbike空位數量',
                overview_display: '',
                order: 5,
                source_from: '',
                sample_data: '',
                request_list: []
            },
            {
                index: 'bus',
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
                sample_data: '2022-08-03',
                request_list: [{
                    type: 'Circle',
                    config: {
                        title: "累積數量",
                        label: "案件數",
                    },
                    data:[
                        {name: "核准自劃單元",y: 64315,color: "#67baca"},
                        {name: "公劃地區內事業",y: 716,color: "#5a8965"},
                        {name: "公告自劃單元",y: 584,color: "#477653"},
                        {name: "公劃更新地區",y: 194,color: "#9b976c"},
                        {name: "都市計畫劃定更新地區",y: 60,color: "#c0ccad"}
                    ]
                }]
            },
            {
                index: 'social_house',
                name: '社會住宅建設進度',
                overview_display: '',
                order: 5,
                source_from: '都發局',
                sample_data: '2022-08-03',
                request_list: [{
                    type: 'Circle',
                    config: {
                        label: "總件數"
                    },
                    data:[
                        {name: "已完工",y: 30,color: "#f3d626"},
                        {name: "施工中及待開工",y: 24,color: "#ddb11f"},
                        {name: "規劃中",y: 7,color: "#e3863a"},
                        {name: "招標中及待上網",y: 4,color: "#c2651c"},
                        {name: "都更聯開分回",y: 2,color: "#a65818"}
                    ]
                }]
            },
            {
                index: 'building_age',
                name: '全市屋齡分布',
                overview_display: 'wide',
                order: 2,
                source_from: '建管處&消防局',
                sample_data: '2021-12-27',
                request_list: [{
                    type: 'Column',
                    config: {
                        inverted: true,
                        plotOptions:{
                            series: {
                                stacking: 'normal'
                            }
                        }
                    },
                    categories:[
                        '中正區',
                        '信義區',
                        '內湖區',
                        '北投區',
                        '南港區',
                        '大安區',
                        '松山區',
                        '中山區',
                        '士林區',
                        '大同區',
                        '文山區',
                        '萬華區'
                    ],
                    data:[{
                        name: '>40',
                        data: [11563, 12653, 6060, 15742, 6410, 20243, 10855, 15154, 20453, 12984, 12710, 17647],
                        color: "#9c7a3e"
                    }, {
                        name: '20-40',
                        data: [3174, 6702, 12366, 6312, 2857, 7165, 4194, 6043, 7805, 2500, 8214, 3731],
                        color: "#b7e28e"
                    }, {
                        name: '5-20',
                        data: [1171, 1022, 3357, 1963, 1351, 1469, 684, 1947, 2335, 1025, 2039, 716],
                        color: "#7febd0"
                    }, {
                        name: '<=5',
                        data: [33, 5, 71, 48, 12, 38, 6, 49, 91, 25, 73, 14],
                        color: "#8ce8ff"
                    }]
                }]
            },
            {
                index: 'building_license',
                name: '建管處發照量',
                overview_display: '',
                order: 1,
                source_from: '建管處',
                sample_data: '2022-06-30',
                request_list: [{
                    type: 'LineArea',
                    keyratio:{
                        name: "累積發放量"
                    },
                    config: {},
                    categories:["2月", "3月", "4月", "5月", "6月"],
                    data:[{
                        name: '建照',
                        data: [169, 271, 275, 81, 116],
                        color: "#4dd97a"
                    },{
                        name: '使照',
                        data: [16, 171, 80, 52, 64],
                        color: "#0a85f4"
                    }]
                }]
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
                    config: {
                        inverted: false
                    },
                    categories:["智慧經濟", "智慧安防", "智慧教育", "智慧建築", "智慧交通", "智慧健康", "智慧環境", "智慧政府", "其他"],
                    data:[{
                        name: '數量',
                        data: [47,23,25,31,59,63,39,53,11],
                        color: "#52b69a"
                    }]
                }]
            }
        ]
    },
    {
        index: 'Basic',
        components: basicMapLayer
    }
]