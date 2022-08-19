

import { hexToHSL } from '@/assets/js/commom.js'
import * as mapLayerStyle from '@/assets/datas/mapConfig.js'

export const ParseLayer = (MapConfig, MapLabel = {}) => {
    if(!MapConfig) return
    const MapLayerIndex = MapConfig.index
    const mapIconColor = (MapLabel && MapLabel.color)? MapLabel.color: (MapConfig.color? MapConfig.color: "#ddd")

    let symbolType = MapLabel && MapLabel.symbol?  MapLabel.symbol: MapConfig.symbol
    let symbolPaint = {}
    let symbolLayout = {}
    let mapExtraLayer = {}
    let loadImage = ''

    switch (symbolType) {
        case 'circle':
            symbolPaint = {...mapLayerStyle.circleCommonStyle, 'circle-color': mapIconColor}
            break;

        case 'circle_stroke':
            symbolType = 'circle'
            symbolPaint = {...mapLayerStyle.circleCommonStyle, 'circle-color': mapIconColor}
            break;

        case 'heatmap':
            symbolPaint = {...mapLayerStyle.circleHeatmapStyle, 'circle-color': mapIconColor}
            break;

        case 'line':
            symbolPaint = { ...mapLayerStyle.lineWideStyle, 'line-color': mapIconColor}
            break;

        case 'dasharray':
            symbolType = 'line'
            symbolPaint = { ...mapLayerStyle.lineWideStyle, 'line-color': mapIconColor, 'line-dasharray': [2, 2]}
            break;

        case 'fill':
            symbolPaint = { ...mapLayerStyle.fillCommonStyle, 'fill-color': mapIconColor}
            break;

        case 'fill-extrusion':
            break;
    
        default:
            if(symbolType === 'triangle_white' || symbolType === 'triangle_green'){
                symbolLayout = { ...mapLayerStyle.symbolShapeSmallStyle, 'icon-image': symbolType}
            }else if(symbolType === 'cross_normal' || symbolType === 'cross_bold'){
                symbolLayout = { ...mapLayerStyle.symbolIconSmallStyle, 'icon-image': symbolType}
            }else if(symbolType === 'bus'){
                symbolLayout = mapLayerStyle.symbolBusStyle
            }else if(symbolType === 'bike'){
                symbolLayout = { ...mapLayerStyle.symbolTextHaloStyle.layout, 'icon-image': symbolType}
                symbolPaint = { ...mapLayerStyle.symbolTextHaloStyle.paint}
            }else if(symbolType === 'metro'){
                symbolLayout = { ...mapLayerStyle.symbolTextHaloStyle.layout, 'icon-image': symbolType}
                symbolPaint = { ...mapLayerStyle.symbolTextHaloStyle.paint}
            }else if(symbolType === 'symbol'){
            //     symbolLayout = { ...mapLayerStyle.symbolHaloStyle.layout, 'icon-image': symbolType + '-15'}
            //     symbolPaint = { ...mapLayerStyle.symbolHaloStyle.paint, "text-halo-color": mapIconColor }
            }
            loadImage = symbolType
            symbolType = 'symbol'
            break;
    }

    if(MapConfig.paint){
        // if(typeof MapConfig.paint === "string"){
        //     MapConfig.paint = JSON.parse(MapConfig.paint)
        // }
        symbolPaint = {
            ...symbolPaint,
            ...MapConfig.paint
        }
    }
    // const layerBeforeId = this.getDataLayerBeforeId()

    const mapLayerConfig = {
        id: MapLayerIndex,
        type: symbolType,
        source: `${MapLayerIndex}_source`,
        paint: symbolPaint,
        layout: {
            ...symbolLayout,
            'visibility': 'visible'
        }
    }
    console.log(mapLayerConfig);
    // if(MapConfig.filter && MapConfig.filter.target === 'hr'){
    //     const refer = dayjs().hour()
    //     mapLayerConfig.filter = ['==', ['get', 'hr'], refer]
    // }

    // Add extra layers
    switch (symbolType) {
        case 'heatmap':
            //https://docs.mapbox.com/mapbox-gl-js/example/heatmap-layer/
            const heatmap_hsl = hexToHSL(mapIconColor)
            mapExtraLayer = {
                ...mapLayerConfig,
                id: `heatmap_${MapLayerIndex}`,
                type: 'heatmap',
                paint: {
                    ...mapLayerStyle.heatmapCommonStyle,
                    'heatmap-intensity': [
                        "interpolate",["linear"],["zoom"],
                        10.99,0,
                        11,0.01,
                        15,0.2
                    ],
                    'heatmap-radius': 10,
                    'heatmap-color': [
                        "step",["heatmap-density"],`hsla(${heatmap_hsl}, 0%)`,
                        0.1,`hsla(${heatmap_hsl}, 25%)`,
                        0.6,`hsla(${heatmap_hsl}, 50%)`,
                        1,`hsla(${heatmap_hsl}, 75%)`
                    ]
                }
            }
            mapLayerConfig.type = 'circle'
            break;
        case 'line':
            mapExtraLayer = {
                ...mapLayerConfig,
                id: `linefill_${MapLayerIndex}`,
                type: 'fill',
                paint: {
                    ...mapLayerStyle.fillCommonStyle,
                    'fill-color': `hsla(${hexToHSL(mapIconColor)}, 50%)`
                }
            }
            break;
        default:
        break;
    }
    return {
        main: mapLayerConfig,
        extra: mapExtraLayer,
        loadImage: loadImage
    }
}