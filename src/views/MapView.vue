<script setup>
	import { ref } from 'vue'
	import { useFullscreen } from '@vueuse/core'

	import CardContainer from '@/components/card/CardContainer.vue'
	import MapTopicDrawer from '@/components/map/MapTopicDrawer.vue'
	import MapBasicDrawer from '@/components/map/MapBasicDrawer.vue'

	const MapContainer = ref(null)
	const TopicNames = ref([])
	const { isFullscreen, toggle } = useFullscreen(MapContainer)

	const ComponentListOpen = ref(false)
	const ToggleComponentList = () => {
		ComponentListOpen.value = !ComponentListOpen.value
	}
	const BasicListToggle = ref(false)
	const ToggleBasicList = () => {
		BasicListToggle.value = !BasicListToggle.value
	}
</script>

<template>
	<el-container ref="MapContainer">
		<MapTopicDrawer
			:ActiveNames="TopicNames"
			:TopicToggle="ComponentListOpen"
			@update="updateTopicComponentToMap"
		/>

		<MapBasicDrawer
			:BasicListToggle="BasicListToggle"
			@update="updateBasicComponentToMap"
		/>

		<el-main 
			id="mapboxContainer" 
			:class="{
				fullscreen: isFullscreen
			}"
			v-loading="mapLoadong"
		>
			<div id="mapboxBox" style="text-align:right;"></div>
			<div id="mapBtnBox">
				<el-button type="info" circle @click="ToggleBasicList">
					<el-icon><Box /></el-icon>
				</el-button>
				<el-button type="info" circle @click="ToggleComponentList">
					<el-icon><Collection /></el-icon>
				</el-button>
				<el-button type="info" circle @click="toggle">
					<el-icon v-if="isFullscreen"><Close /></el-icon>
					<el-icon v-else><FullScreen/></el-icon>
				</el-button>
			</div>
		</el-main>
	</el-container>
</template>

<script>
import mapboxgl from 'mapbox-gl'
import MapboxLanguage from '@mapbox/mapbox-gl-language';
import 'mapbox-gl/dist/mapbox-gl.css'

const MAPBOXTOKEN = process.env.VUE_APP_MAPBOXTOKEN
const BASE_URL = process.env.VUE_APP_BASE_URL

import mapStyle from '@/assets/datas/mapStyle.js'
import { ParseLayer } from '@/assets/datas/mapFunction.js'
import { basicMapLayer, topicComponentList } from '@/assets/datas/topicList.js'
import { MapObjectConfig, MapFogStyle, BuildingsIn3D, TaipeiTown, TaipeiVillage } from '@/assets/datas/mapConfig.js'

const MapStyle = {
	'light':'mapbox://styles/mapbox/light-v10',
	'dark': mapStyle
}

const CalculationList = ['hour', 'day', 'month']

export default {
	props: {
		mode: {
			type: String
		}
	},
	methods: {
		// translateSymbol(contentSymbol){
        //     return (contentSymbol)? contentSymbol: 'circle'
        // }
	},
	watch: {
		mode() {
			this.mapBoxObject.setStyle(MapStyle[this.mode]);
		}
	},
	methods: {
		initMapBox() {
            mapboxgl.accessToken = MAPBOXTOKEN
            this.mapBoxObject = new mapboxgl.Map({
				...MapObjectConfig,
                style: MapStyle[this.mode]
            })
            this.mapBoxObject.addControl( new mapboxgl.NavigationControl() )
			this.mapBoxObject.addControl(new MapboxLanguage({defaultLanguage: 'zh-Hant'}))
            this.mapBoxObject.doubleClickZoom.disable()

			this.mapBoxObject.on('style.load', () => { //1
				this.mapLoadong = true
				this.mapBoxObject.setFog(MapFogStyle[this.mode])
				this.initMapBasicLayer()

			}).on('load', (e) => { //2
				this.parseRouterQuery()

			}).on('idle', () => { //3
				this.mapLoadong = false

			}).on('error', (e) => {
				console.log('A error event occurred:'+ e.error)

			}).on("click", (event) => {
				console.log( this.mapBoxObject.getZoom())
            })
        },
		initMapBasicLayer(){
			const layers = this.mapBoxObject.getStyle().layers
			const checkLayer = layers.find(layer => layer.type === 'symbol' && layer.layout['text-field'])
            this.mapBoxObject.addLayer(BuildingsIn3D(this.mode), checkLayer.id)

            fetch(`${BASE_URL}/datas/taipei_town.geojson`).then((response) => (response.json())).then(data => {
				this.mapBoxObject.addSource('taipei_town', { type: 'geojson', data: data }).addLayer(TaipeiTown(this.mode))
			})
            fetch(`${BASE_URL}/datas/taipei_village.geojson`).then((response) => (response.json())).then(data => {
				this.mapBoxObject.addSource('taipei_village', { type: 'geojson', data: data }).addLayer(TaipeiVillage(this.mode))
			})
			/**
			    fetch('http://localhost:8888/posts')
				.then(res => res.json())
				.then(data => (this.posts = data))
			*/
		},
		updateTopicComponentToMap(updateData){
			// Replace active list
			this.activeTopicComponent = updateData.active
			this.cleanActiveComponent(updateData.topicLayer.value)
		},
		updateBasicComponentToMap(layers){
			// Replace active list
			this.activeBasicComponent = layers
			this.cleanActiveComponent(basicMapLayer)
		},
		parseRouterQuery(){
			const {topic, component} = this.$route.query
			if(!(topic && component)) return 
			const TargetTopic = topicComponentList.find(item => item.index === topic)
			if(!TargetTopic) return
			const TargetComponent = TargetTopic.components.find(item => item.index === component)
			this.TopicNames = component
			this.activeTopicComponent = [component]
			this.cleanActiveComponent(TargetTopic.components)
		},
		cleanActiveComponent(MapLayers = []){
			const DrawerActiveComponent = this.activeBasicComponent.concat(this.activeTopicComponent)
			// Clean active component
            DrawerActiveComponent.map(componentIndex => {
				const target = MapLayers.find(item => item.index === componentIndex)
				if(!target)return
				this.cleanDrawerSelect(target)
            })

			Object.keys(this.existComponent).filter(item => {
				this.existComponent[item] = DrawerActiveComponent.includes(item)
			})

			// Check exist layers - Show or Hide map layer from cache
			if(Object.keys(this.existCacheMapLayer).length === 0) return
			Object.keys(this.existCacheMapLayer).map(layerIndex => {
				if(!this.mapBoxObject.getLayer(layerIndex)) return
				const TargertComponent = this.existCacheMapLayer[layerIndex]
				// const LayerVisible = this.mapBoxObject.getLayoutProperty(layerIndex, 'visibility')
				this.mapBoxObject.setLayoutProperty(layerIndex, 'visibility', (this.existComponent[TargertComponent])?'visible': 'none')
			})
		},
		cleanDrawerSelect(target){
			// Layer settings are loaded only once
			const { map_config, request_list, calculation_config } = target
			if(!(map_config && request_list))return

			const targetRequest = request_list.find(list => list.type === 'MapIconDisplay')
			map_config.map(configItem => {
				// if(calculation_config){
				// 	this.fetchHistoryDataset(target.index, configItem)
				// }
				if(!Object.keys(this.existCacheMapLayer).includes(configItem.index)){
					this.fetchDataset(target.index, configItem, targetRequest)
				}
			})
		},
		fetchDataset(componentIndex, mapConfigItem, targetRequest = {}){
			// First laod
			const MapLayerIndex = mapConfigItem.index
			this.existComponent[componentIndex] = true
			fetch(`${BASE_URL}/datas/${MapLayerIndex}.geojson`)
			.catch(error => console.error('Error:', error.message))
			.then((response) => {
				if(response.status === 200 || response.status === 304) return response.json()
				if(response.status === 404){
					console.log(response.statusText)
				}
			})
			.then(data => {
				if(!data) return
				this.addMapLayer(targetRequest, MapLayerIndex, mapConfigItem, data, componentIndex)
			})
		},
		// fetchHistoryDataset(componentIndex, mapConfigItem){
		// 	const MapLayerIndex = mapConfigItem.index
		// 	CalculationList.map(calcItem => {
		// 		this.existComponent[`${MapLayerIndex}_${calcItem}`] = (calcItem === 'day')
		// 		fetch(`${BASE_URL}/datas/${calcItem}/${MapLayerIndex}.geojson`)
		// 		.catch(error => console.error('Error:', error.message))
		// 		.then((response) => {
		// 			if(response.status === 200 || response.status === 304) return response.json()
		// 			if(response.status === 404){ console.log(response.statusText)}
		// 			this.addMapLayer({}, MapLayerIndex, mapConfigItem, data, componentIndex)
		// 		})
		// 		.then(data => {
		// 			if(!data) return
		// 		})
		// 	})
		// },
		addMapLayer(TargetRequest, MapLayerIndex, mapConfigItem, data, componentIndex){
			const MapLabel = TargetRequest.mapLabel? TargetRequest.mapLabel: []
			const targetMapLabel = MapLabel.find(list => list.index === MapLayerIndex)
			const { loadImage, main, extra } = ParseLayer(mapConfigItem, targetMapLabel)
			if(loadImage !== '' && !this.mapBoxObject.hasImage(loadImage)){
				const PngUrl = require(`@/assets/img/mapbox/${loadImage}.png`)
				this.mapBoxObject.loadImage(PngUrl, (error, image) => {
					if (error) throw error
					this.mapBoxObject.addImage(loadImage, image)
				})
			}
			this.mapBoxObject.addSource(`${MapLayerIndex}_source`, { type: 'geojson', data: data }).addLayer(main)

			if(this.fromComponent === componentIndex){
				this.mapBoxObject.setLayoutProperty(main.id, 'visibility', 'visible')
			}

			/** Exist cache mapLayer
			 * 	 key: Layer index
			 * 	 value: Component index
			 */
			this.existCacheMapLayer[main.id] = componentIndex
			if(extra && extra.id){
				this.mapBoxObject.addLayer(extra)
				this.existCacheMapLayer[extra.id] = componentIndex
				if(this.fromComponent === componentIndex){
					this.mapBoxObject.setLayoutProperty(extra.id, 'visibility', 'visible')
				}
			}
		}
	},
  	data(){
		return {
			mapLoadong: false,
			mapBoxObject: null,
			existComponent: [],
			existCacheMapLayer: {},
			activeBasicComponent: [],
			activeTopicComponent: []
		}
	},
    mounted() {
        this.initMapBox()
    },
    destroyed() {
		if(this.mapBoxObject) this.mapBoxObject.remove()
    }
}
</script>

<style lang="scss">
#mapboxContainer{
	position: relative;
	width: 100%;
	&.fullscreen{
		--el-main-padding: 0 !important;
		#mapBtnBox{
			top: 1rem;
			left: 1rem;
		}
	}
	#mapboxBox{
		height: 100%;
	}
	#mapBtnBox{
		position: absolute;
		top: 2.5rem;
		left: 2.5rem;
	}
}
</style>