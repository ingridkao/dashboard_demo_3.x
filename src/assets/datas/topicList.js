export const TopicList = [
    {
        index: 'Traffic',
        icon: "Van",
        name: '城市交通',
        disabled: false
    },
    {
        index: 'Sentiment',
        icon: "ChatDotRound",
        name: '民情熱議',
        disabled: false
    },
    {
        index: 'Patrol',
        icon: "Aim",
        name: '城市安防',
        disabled: false
    },
    {
        index: 'Construction',
        icon: "OfficeBuilding",
        name: '城市建設',
        disabled: false
    },
    // {
    //     index: 'Basic',
    //     icon: "Briefcase",
    //     name: '基本圖資',
    //     disabled: false
    // }
]

const building_publand_config = {
    symbol: "fill",
    property: [
        {key: "publand_1_土地權屬情形", name: "土地權屬情形"},
        {key: "publand_1_類型", name: "類型"},
        {key: "publand_1_管理機關", name: "管理機關"},
        {key: "area", name: "面積"}
    ],
    paint: {
        "fill-color": [
        "match", ["get","publand_1_土地權屬情形"],
        "國有", "#2d7b7d",
        "臺北市有", "#38b19f",
        "公私共有", "#07a0d4",
        "公私共有或其他", "#07a0d4",
        "其他政府機關有", "#007aff",
        "臺北市及國有共有", "#27d5d7",
        "臺北市有、國有及其他政府機關共有", "#3975b7",
        "臺北市有及非國有政府機關共有", "#223477",
        "#ccc"
        ]
    }
}

export const RainOptions = [{
    value: '78.8',
    label: '78.8mm',
    index: "patrol_flood_78_8",
    title:"近一小時降雨78.8mm可能淹水範圍",
}, {
    value: '100',
    label: '100mm',
    index: "patrol_flood_100",
    title:"近一小時降雨100mm可能淹水範圍",
}, {
    value: '130',
    label: '130mm',
    index: "patrol_flood_130",
    title:"近一小時降雨130mm可能淹水範圍",
}]

export const RainPaintConfig = {
    "fill-color":[
        "match",["get","name"],
        "1.0 m ~ 2.0 m","#4d9bd1",
        "0.30 m ~ 1.0 m","#70b5c8",
        "0.15 m ~ 0.30 m","#baf4f5",
        "#4d9bd1"
    ],
    "fill-opacity": [
        "interpolate",["linear"],["zoom"],
        11,0.75,
        13.5,0.5
    ]
}

/**
 * overview_display: default(1X1)| wide(2X1) |tall(1X2) | large(2X2)
 */
 export const basicPatrolMapLayer = [
    {
        index: 'police_facility',
        name: '警察相關設施',
        order: 5,
        source_from: '警察局',
        sample_data: '樣本數據',
        request_list: [
            {
                type: 'MapIconDisplay',
                mapLabel: [
                    {
                        index: 'police_station',
                        name: '警察局',
                        symbol: 'triangle_white'
                    },
                    {
                        index: 'patrol_district',
                        name: '警局轄區',
                        symbol: 'dasharray',
                        color: '#009688'
                    }
                ]
            }
        ],
        map_config: [
            {
                index: 'police_station',
                property: [
                    {key: "OFFICE_NAME", name: "所屬分局"},
                    {key: "STATION_NAME", name: "名稱"},
                    {key: "ADDR", name: "地址"}
                ],
                interactive: {
                    target: "patrol_district",
                    trigger: "STATION_NAME",
                    resultset: ["station", "precinct"], 
                }
            },
            {
                index: 'patrol_district',
                layout: {'visibility': 'none'},
                interactive: {
                    affected: "police_station"
                }
            }
        ]
    },
    {
        index: 'fire_brigade',
        name: '消防應變設施',
        order: 6,
        source_from: '消防局',
        sample_data: '樣本數據',
        request_list: [
            {
                type: 'MapIconDisplay',
                mapLabel: [
                    {
                        index: 'patrol_fire_brigade',
                        name: '消防隊',
                        symbol: 'triangle_green'
                    },
                    {
                        index: 'fire_hydrant_location',
                        name: '消防栓',
                        symbol: 'circle',
                        color: '#3f51b5'
                    }
                ]
            }
        ],
        map_config: [
            {
                index: 'patrol_fire_brigade',
                property: [
                    {key: "name", name: "名稱"}
                ]
            },
            {
                index: 'fire_hydrant_location',
                property: [
                    {key: "type", name: "類型"},
                    {key: "location", name: "位置"}
                ]
            }
        ]
    },
    {
        index: 'flood_risk',
        name: '水災風險區域分佈',
        overview_display: '',
        order: 7,
        source_from: ['臺北市淹水潛勢模擬圖：工務局水利工程處'],
        request_list: [
            {
                type: 'RainDisplay'
            }
        ]
    }
]

export const basicMapLayer = [
    ...basicPatrolMapLayer,
    {
        index: 'building_publand',
        name: '公有土地',
        order: 1,
        overview_display: 'large',
        source_from: '地政局',
        sample_data: '樣本數據',
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
        }],
        map_config: [
            {
                index: 'building_publand_0',
                ...building_publand_config
            },
            {
                index: 'building_publand_1',
                ...building_publand_config
            },
            {
                index: 'building_publand_2',
                ...building_publand_config
            }
        ]
    },
    {
        index: 'building_landuse',
        name: '都市計畫用地類型',
        order: 4,
        overview_display: 'large',
        source_from: '都發局',
        sample_data: '樣本數據',
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
        }],
        map_config: [
            {
                index: "building_landuse",
                symbol: "fill",
                paint: {
                    "fill-color": 
                    ["match",["get","顏色"],
                    "0","#00ff00",
                    "3","#ff003f",
                    "4","#ffff00",
                    "5","#b3b3b3",
                    "7","#7fffff",
                    "9","#7f3f00",
                    "10","#bf7fff",
                    "11","#70dcaf",
                    "13","#007fff",
                    "14","#7fff00",
                    "15","#00ff00",
                    "16","#ff3f00",
                    "17","#ff00ff",
                    "18","#e6e6e6",
                    "19","#00ff00",
                    "29","#ff8fad",
                    "34","#00ff00",
                    "50","#7fff00",
                    "53","#e58bd8",
                    "82","#00ff00",
                    "#7fff00"]
                },
                property: [
                    {key: "landuse group_metadata_用地分類",name: "用地分類"},
                    {key: "使用分區",name: "使用分區"},
                    {key: "分區簡稱",name: "分區簡稱"},
                    {key: "編號",name: "編號"},
                    {key: "area",name: "面積" }
                ]
            }
        ]
    },
    {
        index: 'fet_age',
        name: '電信推估活動人口',
        source_from: '遠傳電信',
        sample_data: '2020-06-16',
        order: 2,
        request_list: [
            {
                type: 'FetDisplay',
                config: {
                    sumHide: true,
                    plotOptions:{
                        pointInterval: 60 * 60 * 1000,
                        pointStart: Date.UTC(2020,6,15,0,0,0,0)
                    },
                    xAxis:{
                        type: 'datetime',
                        dateTimeLabelFormats: {
                            hour: '%H:%M',
                        }
                    }
                },
                data:[{
                    name: '人口數量',
                    data: [2424143, 2424433, 2408941, 2401391, 2398867, 2419733, 2488692, 2679432, 2901084, 2981665, 3034451, 3086497, 3185502, 3175144, 3133531, 3053310, 3118477, 3142913, 3095452, 2940427, 2827133, 2737657, 2601668, 2461531],
                    color: "#75a6db"
                }]
            }
        ],
        map_config: [
            {
                index: 'tp_fet_age_hr',
                symbol: 'fill-extrusion',
                property: [
                    {key: "hr", name: "推估時間"},
                    {key: "pop-all", name: "推估人口"},
                    {key: "15-17", name: "15-17歲"},
                    {key: "18-21", name: "18-21歲"},
                    {key: "22-29", name: "22-29歲"},
                    {key: "30-39", name: "30-39歲"},
                    {key: "40-49", name: "40-49歲"},
                    {key: "50-59", name: "50-59歲"},
                    {key: "60-64", name: "60-64歲"},
                    {key: "over65", name: "超過65歲"}
                ],
                paint:{
                    "fill-extrusion-color": [
                      "interpolate",
                      ["linear"],
                      ["get","pop-all"],
                      0,"hsl(0, 0%, 3%)",
                      15842,"#77A9DF"
                    ],
                    "fill-extrusion-height": [
                      "interpolate",
                      ["linear"],
                      ["get","pop-all"],
                      0,0,
                      15842,900
                    ],
                    "fill-extrusion-opacity": 0.5
                }
            }
        ]
    },
    {
        index: 'work_live',
        name: '居職人口推估',
        source_from: '遠傳電信',
        sample_data: '2020-06-16',
        order: 3,
        request_list: [
            {
                type: 'MapIconDisplay',
                config: {
                    col: true
                },
                mapLabel: [
                    {
                        index: 'pop-live',
                        name: '居住推估人數',
                        symbol: 'fill',
                        color: '#d76c29',
                        data: 2350032
                    },
                    {
                        index: 'pop-work',
                        name: '工作推估人數',
                        symbol: 'fill',
                        color: '#77dddf',
                        data: 2759779
                    }
                ]
            }
        ],
        map_config: [
            {
                index: 'tp_fet_work_live',
                symbol: 'fill-extrusion',
                property: [
                    {key: "pop-live", name: "居住推估人數"},
                    {key: "pop-work", name: "工作推估人數"}
                ],
                paint:{
                    "fill-extrusion-color": [
                        "interpolate",
                        ["linear"],
                        ["get","work_L-W"],
                        -11533,"#77dddf",
                        -4,"#000000",
                        8,"#000000",
                        2551,"#d76c29"
                    ],
                    "fill-extrusion-height": [
                        "interpolate",
                        ["linear"],
                        ["get","work_L+W"],
                        0,0,
                        19895,1000
                    ],
                    "fill-extrusion-opacity": 0.5
                }
            }
        ]
    }
]

export const SentimentMapLayer = [
    {
        index: 'hotnews',
        name: '新聞熱議關鍵字',
        overview_display: '',
        order: 3,
        sample_data: '2022-08-22',
        source_from: '新聞知識系統',
        request_list: [{
            type: 'WordCloud',
            config: {
                label: "出現次數"
            },
            data:[
                {name: '疫情', weight: 60, color: "hsl(210deg,80%,54%)"},
                {name: '民進黨', weight: 60, color: "hsl(210deg,80%,54%)"},
                {name: '媒體', weight: 49, color: "hsl(210deg,80%,54%)"},
                {name: '城博會', weight: 39, color: "hsl(210deg,50%,54%)"},
                {name: '調查', weight: 36, color: "hsl(210deg,50%,54%)"},
                {name: '風險', weight: 26, color: "hsl(210deg,50%,54%)"},
                {name: '殉職', weight: 20, color: "hsl(210deg,25%,54%)"},
                {name: '記者會', weight: 16, color: "hsl(210deg,25%,54%)"},
                {name: '台南市', weight: 16, color: "hsl(210deg,25%,54%)"}
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
        order: 1,
        sample_data: '2022-08-24',
        source_from: '派工系統',
    //     calculation_config:{
    //         table: "sentiment_dispatching",
    //         time_field: "成案時間utc"
    //     },
        request_list: [{
            type: 'Column',
            config: {
                inverted: true
            },
            categories:[
                "交通標誌及設施物損壞(含汙損)、傾斜",
                "交通號誌異常",
                "交通號誌電纜線垂落及設施損壞",
                "人孔蓋(含周邊)破損、遺失處理",
                "動物救援",
                "場所與設施噪音",
                "大型廢棄物清運",
                "市區道路坑洞處理",
                "污染舉發"
            ],
            data:[{
                name: '案件數量',
                data: [16,4,1,6,2,9,3,10,1],
                color: "#fc9f0b"
            }]
        },{
            type: 'Line',
            config: {
                plotOptions:{
                    pointInterval: 30 * 60 * 1000,
                    pointStart: Date.UTC(2022,8,4,0,0,0,0)
                }
            },
            data:[{
                name: '結案數量',
                data: [16, 171, 80, 52, 64],
                color: "#90dce9"
            },{
                name: '成案數量',
                data: [169, 271, 275, 81, 116],
                color: "#fc9f0d"
            }]
        }],
        map_config: [
            {
                index: "dispatchingpoint",
                title: "派工類別",
                symbol: "heatmap",
                color: "#fc9f0b",
                paint: {
                    "circle-color":[
                        "match",
                        ["get", "案件類型"],
                        "大型廢棄物清運聯繫","#fc9f0b",
                        "場所與設施噪音舉發","#dac117",
                        "污染舉發","#FDD79B",
                        "路燈故障或設施損壞","#FDD79B",
                        "#555"
                    ]
                },
                property: [
                    {key: "案件編號", name: "案件編號"},
                    {key: "案件類型", name: "案件類型"},
                    {key: "案件狀態", name: "案件狀態"},
                    {key: "案件內容", name: "案件內容"},
                    {key: "成案時間", name: "成案時間"},
                    {key: "結案時間", name: "結案時間"}
                ]
            }
        ]
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
        },{
            type: 'Column',
            config: {
                inverted: true
            },
            categories:[
                "其他事項",
                "公車、計程車、復康巴士問題",
                "建築物使用管理、違建查報及拆除",
                "環保稽查",
                "停車管理及收費問題",
                "違規停車",
                "治安維護"
            ],
            data:[{
                name: '案件數量',
                data: [1127,433,331,312,306,294,223],
                color: "#C5E1A5"
            }]
        }]
    }
]

export const PatrolMapLayer = [
    {
        index: 'designate',
        name: '避難收容地點',
        overview_display: '',
        order: 1,
        sample_data: '2022-08-08',
        source_from: '消防局',
        request_list: [
            {
                type: 'MapIconDisplay',
                mapLabel:[
                    {
                        index: 'patrol_designate_place',
                        name: '避難場所',
                        symbol: 'circle_stroke',
                        color: '#FDD79B',
                        data: 289
                    }
                ]
            }
        ],
        map_config:[
            {
                index: 'patrol_designate_place',
                symbol: 'circle',
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
                config: {
                    col: true
                },
                mapLabel: [
                    {
                        index: 'patrol_debris',
                        name: '土石流潛勢溪流',
                        symbol: 'line',
                        color: '#d7c500',
                        data: 50,
                        unit: '處'
                    },
                    {
                        index: 'patrol_debrisarea',
                        name: '土石流影響範圍',
                        symbol: 'fill',
                        color: '#958f00',
                        data: 163,
                        unit: '戶'
                    },
                    {
                        index: 'patrol_artificial_slope',
                        name: '列管邊坡',
                        symbol: 'line',
                        color: '#ff9800',
                        data: 34897,
                        unit: '處'
                    },
                    {
                        index: 'patrol_old_settlement',
                        name: '老舊聚落',
                        symbol: 'fill',
                        color: '#9e7b5c',
                        data: 34,
                        unit: '處'
                    }
                ]
            }
        ],
        map_config:[
            {
                index: 'patrol_debris',
                property: {}
            },
            {
                index: 'patrol_debrisarea',
                property: {}
            },
            {
                index: 'patrol_artificial_slope',
                property: {}
            },
            {
                index: 'patrol_old_settlement',
                property: {}
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

export const TrafficMapLayer = [
    {
        index: 'traffic_accident',
        name: '交通事故統計',
        overview_display: '',
        order: 1,
        source_from: '警察局',
        sample_data: '2021-02-28',
        request_list: [{
            type: 'Pie',
            config: {
                name: "事故總數",
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
        }],
        map_config: [
            {
                index: 'traffic_accident_location_view',
                title: '交通事故統計',
                symbol: 'heatmap',
                paint: {
                    'circle-color': [
                        'match',
                        ['get', 'type'],
                        '1','#CA0020',
                        '2','#F8C3AC',
                        '3','#D1D1D1',
                        '#ccc'
                    ]
                },
                property: [
                    {"key": "type","name": "事故類型"},
                    {"key": "location","name": "事故位置"}
                ]

            }
        ]
    },
    {
        index: 'traffic_live',
        name: '交通路況',
        overview_display: '',
        order: 2,
        source_from: '交通局',
        sample_data: '2022-08-24',
        request_list: [
            {
                type: 'LineArea',
                keyratio:{
                    info: [
                        {label: "嚴重壅塞", value: '1.77%', symbol: 'fill',color: '#EC4037'},
                        {label: "輕微壅塞", value: '28.64%', symbol: 'fill',color: '#ff8c1a'},
                        {label: "道路順暢", value: '58.5%', symbol: 'fill',color: '#4dd97a'}
                    ]
                },
                config: {
                    sumHide: true,
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
                    name: '本日壅塞趨勢',
                    data:[
                        1.77,
                        4.29,
                        3.55,
                        7.27,
                        6.52,
                        3.77,
                        0.99,
                        0.28,
                        0.28,
                        0.14,
                        0.43,
                        1.25,
                        7,
                        7.5,
                        3.92,
                        2.94,
                        4.09,
                        2.09
                    ],
                    color: "#EC4037"
                }]
            }

        ],
        map_config:[
            {
                index: 'traffic_lives',
                symbol: 'fill',
                property: [
                    {"key": "snippet","name": "路段代號"},
                    {"key": "speed_type","name": "壅塞程度"},
                    {"key": "speed","name": "速度"},
                    {"key": "update_at","name": "更新時間"}
                ],
                paint: {
                    "fill-color": [
                      "match",["get","speed_type"],
                      "壅塞","#EC4037",
                      "車多","#ff8c1a",
                      "順暢","#4dd97a",
                      "#ccc"
                    ]
                }
            }
        ]
    },
    {
        index: 'traffic_todaywork',
        name: '道路施工',
        overview_display: '',
        order: 3,
        source_from: '工務局',
        sample_data: '',
        request_list: [
            {
                type: 'MapIconDisplay',
                mapLabel: [
                    {
                        index: 'traffic_todaywork_view',
                        name: '施工路段',
                        symbol: 'triangle_green',
                        data: 138
                    }
                ]
            }
        ],
        map_config:[
            {
                index: 'traffic_todaywork_view',
                property: [
                    {"key": "npurp","name": "施工類型"},
                    {"key": "app_name","name": "主管機關"},
                    {"key": "tc_na","name": "施工單位"},
                    {"key": "co_ti","name": "時段"},
                    {"key": "起始日期","name": "起始日期"},
                    {"key": "結束日期","name": "結束日期"}
                ]
            }
        ]
    },
    {
        index: 'traffic_mrt',
        name: '捷運人流趨勢',
        overview_display: '',
        order: 4,
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
        }],
        map_config: [
            {
                index: 'traffic_metro_station',
                title: '捷運站點',
                symbol: 'metro',
                property: [
                    {"key": "stationid","name": "代號"},
                    {"key": "stationname2","name": "站名"}
                ]
            },
            {
                index: 'traffic_metro_line',
                title: '捷運路線',
                symbol: 'lineThin',
                paint: {
                    "line-color":[
                        "match",
                        ["get","mrtid"],
                        ["BL"],"#0070bd",
                        ["O"],"#f7b04d",
                        ["G"],"#00bd74",
                        ["R"],"#f44336",
                        ["BR"],"#bd7e00",
                        "#505050"
                    ]
                },
                property: [
                    {"key": "mrtsys","name": "系統"},
                    {"key": "mrtid","name": "代號"},
                    {"key": "mrtcode","name": "路線"}
                ]
            }
        ]
    },
    {
        index: 'youbike',
        name: 'Youbike站點',
        overview_display: 'wide',
        order: 6,
        source_from: 'Youbike',
        sample_data: '2022-08-24',
        request_list: [{
            type: 'Pie',
            config: {
                label: "Youbike 1.0"
            },
            data:[
                {name: "可借",y: 4490,color: "#356340"},
                {name: "可還",y: 2893,color: "#222"}
            ]
        },{
            type: 'Pie',
            config: {
                label: "Youbike 2.0"
            },
            data:[
                {name: "可借",y: 11415,color: "#9dc56e"},
                {name: "可還",y: 5522,color: "#222"}
            ]
        }],
        map_config: [
            {
                index: 'traffic_youbike_station',
                title: 'Youbike站點',
                symbol: 'bike',
                paint: {
                    'text-halo-color': [
                        'match',
                        ['get', 'version'],
                        '1',
                        '#479589',
                        "#9DC56E"
                    ]
                },
                property: [
                    {"key": "station_id","name": "代號"},
                    {"key": "station","name": "站名"}
                ]
            }
        ]
    }
]

export const ConstructionMapLayer = [
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
        }],
        map_config: [
            {
                index: 'building_license_all',
                title: '建照',
                symbol: 'circle',
                color: '#4dd97a',
                cover: true,
                property:[
                    {"key": "執照號碼","name": "執照號碼"},
                    {"key": "地段地號","name": "地段地號"},
                    {"key": "發照日","name": "發照日"}
                ],
                paint: {
                    "circle-radius": [
                        "interpolate",
                        ["linear"],["zoom"],
                        11.99,0,
                        12,0.5,
                        15,3
                    ]
                }
            },
            {
                index: 'building_permit_all',
                title: '使照',
                symbol: 'fill',
                color: '#0a85f4',
                property:[
                    {"key": "執照號碼","name": "執照號碼"},
                    {"key": "地段地號","name": "地段地號"},
                    {"key": "發照日","name": "發照日"}
                ]
            }
        ]
    },
    {
        index: 'tpmo',
        name: 'TPMO智慧城市專案',
        overview_display: '',
        order: 2,
        source_from: 'TPMO',
        sample_data: '2022-07-24',
        request_list: [{
            type: 'Column',
            keyratio:{
                info: [
                    {label: "階段完成", value: 194, symbol: 'circle',color: '#D9ED92'},
                    {label: "實驗進行中", value: 43, symbol: 'circle',color: '#5EBB6D'},
                    {label: "階段終止", value: 120, symbol: 'circle',color: '#0F80BD'}
                ]
            },
            config: {
                inverted: false
            },
            categories:["智慧經濟", "智慧安防", "智慧教育", "智慧建築", "智慧交通", "智慧健康", "智慧環境", "智慧政府", "其他"],
            data:[{
                name: '數量',
                data: [47,23,25,31,59,63,39,53,11],
                color: "#52b69a"
            }]
        }],
        map_config:[
            {
                index: 'it_tpmo_poc_location',
                symbol: 'circle',
                paint: {
                    "circle-radius": [
                        "interpolate",
                        ["linear"],["zoom"],
                        11.99,3,
                        15,5
                    ],
                    "circle-color": [
                        "match",["get","icon_status"],
                        "階段完成",
                        "#D9ED92",
                        "實驗進行中",
                        "#5EBB6D",
                        "階段終止",
                        "#0F80BD",
                        "#ccc"
                    ]
                },
                property:[
                    {"key": "type","name": "類型"},
                    {"key": "icon_status","name": "狀態"},
                    {"key": "id","name": "號碼"},
                    {"key": "name","name": "名稱"},
                    {"key": "address","name": "位置"},
                    {"key": "img","name": "圖片"},
                    {"key": "intro","name": "簡介"},
                ]
            }
        ]
    },
    {
        index: 'building_age',
        name: '全市屋齡分布',
        overview_display: 'wide',
        order: 4,
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
        }],
        map_config: [
            {
                index: 'building_age_0',
                symbol: 'circle',
                paint: {
                    "circle-color": [
                        "interpolate",["linear"],["get","age_2021"],
                        5,"#8ce8ff",
                        6,"#7febd0",
                        21,"#b7e28e",
                        41,"#81612a"
                    ],
                    "circle-radius": [
                        "interpolate",
                        ["linear"],["zoom"],
                        11.99,0,
                        12,0.5,
                        15,2,
                        18,5
                    ]
                  },
                property: [
                    {key: "ptname", name: "行政區"},
                    {key: "addr_key", name: "地址"},
                    {key: "age_2021", name: "屋齡"}
                ]
            },
            {
                index: 'building_age_1',
                symbol: 'circle',
                paint: {
                    "circle-color": [
                        "interpolate",["linear"],["get","age_2021"],
                        5,"#8ce8ff",
                        6,"#7febd0",
                        21,"#b7e28e",
                        41,"#81612a"
                    ],
                    "circle-radius": [
                        "interpolate",
                        ["linear"],["zoom"],
                        11.99,0,
                        12,0.5,
                        15,2,
                        18,5
                    ]
                  },
                property: [
                    {key: "ptname", name: "行政區"},
                    {key: "addr_key", name: "地址"},
                    {key: "age_2021", name: "屋齡"}
                ]
            }
        ]
    },
    {
        index: 'building_renew',
        name: '都市更新案件',
        overview_display: '',
        order: 3,
        source_from: '都市更新處',
        sample_data: '2022-08-03',
        request_list: [{
            type: 'Circle',
            config: {
                name: "累積數量",
                label: "案件數",
            },
            data:[
                {name: "核准自劃單元",y: 64315,color: "#e0e08c"},
                {name: "公劃地區內事業",y: 716,color: "#f8ea21"},
                {name: "公告自劃單元",y: 584,color: "#f7ac3b"},
                {name: "公劃更新地區",y: 194,color: "#f7773b"},
                {name: "都市計畫劃定更新地區",y: 60,color: "#f74922"}
            ]
        }],
        map_config: [
            {
                index: 'building_renewunit_12',
                symbol: 'line',
                color: '#e0e08c'
            },
            {
                index: 'building_renewunit_20',
                symbol: 'line',
                color: '#f8ea21'
            },
            {
                index: 'building_renewunit_30',
                symbol: 'line',
                color: '#f7ac3b'
            }
        ]
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
                {name: "已完工",y: 30,color: "#7EE4D3"},
                {name: "施工中及待開工",y: 24,color: "#26d5d7"},
                {name: "規劃中",y: 7,color: "#A5ECE0"},
                {name: "招標中及待上網",y: 4,color: "#166759"},
                {name: "都更聯開分回",y: 2,color: "#219A86"}
            ]
        }],
        map_config: [
            {
                index: 'social_house',
                symbol: 'circle',
                paint: {
                    'circle-radius': 5,
                    'circle-color':[
                        'match',
                        ['get', 'progress'],
                        '施工中及待開工',
                        '#26d5d7',
                        '已完工',
                        '#7EE4D3',
                        '都更連開分回',
                        '#219A86',
                        '規劃中',
                        '#A5ECE0',
                        '招標中及待上鋼',
                        '#166759',
                        '#ccc'
                    ]
                },
                property: [
                    {key: "progress", name: "進度"},
                    {key: "name", name: "名稱"},
                    {key: "address", name: "位置"},
                    {key: "floors", name: "樓層"},
                    {key: "households", name: "戶數"},
                    {key: "persons", name: "人數"}
                ]
            }
        ]
    }
]

export const topicComponentList = [
    {
        index: "Sentiment",
        components: SentimentMapLayer
    },
    {
        index: 'Patrol',
        components: [...basicPatrolMapLayer,...PatrolMapLayer]
    },
    {
        index: 'Traffic',
        components: TrafficMapLayer
    },
    {
        index: 'Construction',
        components: ConstructionMapLayer
    }
]

export const MapTopicComponentList = [
    {
        index: "Sentiment",
        components: SentimentMapLayer
    },
    {
        index: 'Patrol',
        components: PatrolMapLayer
    },
    {
        index: 'Traffic',
        components: TrafficMapLayer
    },
    {
        index: 'Construction',
        components: ConstructionMapLayer
    },
    {
        index: 'Basic',
        components: basicMapLayer
    }
]