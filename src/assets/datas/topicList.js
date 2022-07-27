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
    }
]

export const basicMapLayer = [
    {
        index: '',
        name: '警察相關設施',
        source_from: '',
        request_list: []
    },
    {
        index: '',
        name: '消防應變設施',
        source_from: '',
        request_list: []
    },
    {
        index: '',
        name: '都市計畫用地類型',
        source_from: '',
        request_list: []
    },
    {
        index: '',
        name: '公有土地',
        source_from: '',
        request_list: []
    },
    {
        index: '',
        name: '活動人口推估',
        source_from: '遠傳電信',
        request_list: []
    },
    {
        index: '',
        name: '居職人口推估',
        source_from: '遠傳電信',
        request_list: []
    },
    {
        index: '',
        name: '水災風險',
        source_from: '',
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
                sample_data: '',
                source_from: '新聞知識系統',
            },
            {
                index: "hello_taipei",
                name: "1999話務案件局處",
                overview_display: '',
                order: 2,
                sample_data: '',
                source_from: "1999話務系統",
                calculation_config: {fields: "SUM(daily_count::float)::int AS count", table: "app_calcu_daily_sentiment_voice1999_109"},
                request_list: [{
                    color: null, 
                    config: {
                        bar: {index: "value"}, 
                        pie: {display: "累積件數", show_top: true}
                    }
                }]
            },
            {
                index: 'dispatching',
                name: '派工案件',
                overview_display: 'tall', 
                order: 3,
                sample_data: '',
                source_from: '',
            },
            {
                index: 'circular',
                name: '單一陳情系統案件',
                overview_display: 'wide',
                order: 4,
                sample_data: '',
                source_from: 'HelloTaipei',
                calculation_config:{
                    table: "sentiment_hello_taipei_109",
                    time_field: "受理日期utc"
                },
                request_list: [
                    {
                        type: 'AlarmBar',
                        name: '累計件數',
                        color: ['#27d5d7'],
                        config:{
                            total: {
                                title: '累積件數(本週)',
                                formula: 'sum'
                            }
                        },
                        path:'/sentiment/component/hellotaipei',
                        form_data: {
                            column: '案件主類',
                            start: "2020-12-25T00:00:00+08:00",
                            end: "2020-12-31T23:59:59+08:00"
                        }
                    }
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
                        type: 'MapDisplay',
                        path: '/patrol/component/patroldesignateplace',
                        config: {
                            mapLabels:[
                                {
                                    select_array: '避難場所',
                                    symbol: 'circle_stroke',
                                    color: '#FDD79B',
                                    unit: '處'
                                }
                            ],
                            statistic: true
                        } 
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
                    {
                        type: 'MapDisplay',
                        config: {
                            mapLabels:[
                                {
                                    select_array: '高風險地區',
                                    symbol: 'Area',
                                    unit: 'km²',
                                    color: '#baf4f5'
                                },
                                {
                                    select_array: '低風險地區',
                                    symbol: 'Area',
                                    unit: 'km²',
                                    color: '#009ff4'
                                },
                                {
                                    select_array: '中風險地區',
                                    symbol: 'Area',
                                    unit: 'km²',
                                    color: '#352ad1'
                                }
                            ]
                        }
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
            {
                index: 'slope_area_risk',
                name: '山坡地風險地點',
                overview_display: '',
                order: 4,
                source_from: '工務局',
                request_list: [
                    {
                        type: 'MapDisplay',
                        path:'/patrol/component/patroldebris',
                        config: {
                            mapLabels: [
                                {
                                    select_array: '土石流潛勢溪流',
                                    symbol: 'line',
                                    unit: '處',
                                    color: '#d7c500',
                                },
                                {
                                    select_array: '土石流影響範圍',
                                    symbol: 'Area',
                                    unit: '處',
                                    color: '#958f00',
                                },
                                {
                                    select_array: '列管邊坡',
                                    symbol: 'line',
                                    unit: '處',
                                    color: '#ff9800',
                                },
                                {
                                    select_array: '老舊聚落',
                                    symbol: 'Area',
                                    unit: '處',
                                    color: '#9e7b5c',
                                }
                            ]
                        }
                    }
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
                index: '',
                name: 'TPMO智慧城市專案',
                overview_display: '',
                order: 3,
                source_from: '建管處',
                sample_data: '',
                request_list: []
            }
        ]
    }
]