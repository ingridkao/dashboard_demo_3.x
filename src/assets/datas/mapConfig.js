export const MapPositions = {
    center: [121.536609, 25.044808],
    CityHall: [121.56384899783005,25.037454320016653],
    Dadaocheng: [121.51013649269608, 25.055775323336594],
    Yangmingshan: [121.55180953513364, 25.12898719167495],
    MainStation: [121.51701453118407,25.047950866969824],
    n: [121.53799903832744, 25.092301189452208],
    e:[ 121.5858901814368, 25.046019127628448],
    w:[121.48719722062226, 25.050157512489278],
    s:[121.52908519223917, 25.005905715593244]
}

export const MaxBounds = [
    [121.3870596781498, 24.95733863075891], // Southwest coordinates
    [121.6998231749096, 25.21179993640203] // Northeast coordinates
]

export const MapObjectConfig = {
    antialias: true,
    container: "mapboxBox",
    center: MapPositions.center,
    maxBounds: MaxBounds,
    zoom:12.5,
    minZoom: 11,
    maxZoom: 22,
    projection: 'globe' // display the map as a 3D globe
}

// // Set the default atmosphere style
export const MapFogStyle = {
	'light': {
		'high-color': '#cbd2d3',
		'space-color': '#d8f2ff',
        'star-intensity': 0.0,
        "horizon-blend": 0.5
	},
	'dark': {
        "range": [1, 3],
		'space-color': '#0f1227',
        'high-color': '#172053',
		'color': '#41455a',
        'star-intensity': 0.1,
        "horizon-blend": 0.5
	}
}