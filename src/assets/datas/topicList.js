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
                source_from: '新聞知識系統',
                request_list: [{
                    type: 'WordCloud',
                    config: {
                        title: "新聞熱議關鍵字",
                        // series: [{
                        //     name: "新聞熱議關鍵字"
                        // }]    
                    },
                    data:[
                        {name: "媒體", weight: 1, color: "hsl(210deg,80%,54%)"},
                        {name: "記者會", weight: 1, color: "hsl(210deg,80%,54%)"},
                        {name: "柯文哲", weight: 3, color: "hsl(210deg,80%,54%)"},
                        {name: "疫情", weight: 3, color: "hsl(210deg,80%,54%)"},
                        {name: "民進黨", weight: 2, color: "hsl(210deg,80%,54%)"},
                        {name: "美國", weight: 5, color: "hsl(210deg,80%,54%)"},
                        {name: "國民黨", weight: 2, color: "hsl(210deg,80%,54%)"},
                        {name: "參選人", weight: 4, color: "hsl(210deg,80%,54%)"},
                        {name: "投資", weight: 2, color: "hsl(210deg,80%,54%)"},
                        {name: "協助", weight: 3, color: "hsl(210deg,80%,54%)"},
                        {name: "新竹", weight: 1, color: "hsl(210deg,80%,54%)"},
                        {name: "林智堅", weight: 1, color: "hsl(210deg,10%,54%)"}
                    ]
                }]
            },
            {
                index: 'circular',
                name: '單一陳情系統案件',
                source_from: 'HelloTaipei陳情系統',
                overview_display: 'wide',
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
            },
            {
                index: "hello_taipei",
                name: "1999話務案件局處",
                source_from: "1999話務系統",
                overview_display: '',
                calculation_config: {
                    fields: "SUM(daily_count::float)::int AS count",
                    table: "app_calcu_daily_sentiment_voice1999_109"
                },
                request_list: [{
                    config: {
                        bar: {index: "value"}, 
                        pie: {display: "累積件數", show_top: true}
                    }
                }]
            },
            {
                index: "4d9f2794",
                name: "派工案件",
                source_from: "派工系統",
                overview_display: 'tall',
                calculation_config: {fields: "SUM(daily_count::float)::int AS count", table: "app_calcu_daily_sentiment_voice1999_109"},
                request_list: [{
                    type: "CountChart",
                    config: {
                        bar: {index: "value"}, 
                        pie: {display: "累積件數", show_top: true}
                    }
                }]
            }
        ]
    },
    {
        index: 'Patrol',
        components: [
            {
                index: 'designate',
                name: '避難收容地點',
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
            }
        ]
    },
    {
        index: 'Traffic',
        components: []
    },
    {
        index: 'Construction',
        components: []
    }
]