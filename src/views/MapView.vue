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
				<el-button type="info" circle @click="toggle">
					<el-icon v-if="isFullscreen"><Close /></el-icon>
					<el-icon v-else><FullScreen/></el-icon>
				</el-button>
				<el-button type="info" circle @click="ToggleComponentList">
					<el-icon><Collection /></el-icon>
				</el-button>
				<el-button type="info" circle @click="ToggleBasicList">
					<el-icon><Box /></el-icon>
				</el-button>
			</div>
		</el-main>
	</el-container>
</template>

<script>
import { createApp, defineComponent, nextTick } from 'vue'
import mapboxgl from 'mapbox-gl'
import MapboxLanguage from '@mapbox/mapbox-gl-language'
import 'mapbox-gl/dist/mapbox-gl.css'
import MapboxPopup from '@/components/map/MapboxPopup.vue'

const MAPBOXTOKEN = process.env.VUE_APP_MAPBOXTOKEN
const BASE_URL = process.env.VUE_APP_BASE_URL

import mapStyle from '@/assets/datas/mapStyle.js'
import { ParseMapLayer } from '@/assets/datas/mapFunction.js'
import { basicMapLayer, MapTopicComponentList, RainOptions, RainPaintConfig } from '@/assets/datas/topicList.js'
import { MapObjectConfig, MapFogStyle, BuildingsIn3D, TaipeiTown, TaipeiVillage } from '@/assets/datas/mapConfig.js'
const CalculationList = ['hour', 'day', 'month']

const MapColorStyle = {
	'light':'mapbox://styles/mapbox/light-v10',
	'dark': mapStyle
}

export default {
	props: {
		mode: {
			type: String
		}
	},
	watch: {
		mode() {
			// this.mapBoxObject.setStyle(MapColorStyle[this.mode])
		},
		'$store.state.rainfallLayerShow'() {
			this.updateRainLayer(true)
		}
	},
	methods: {
		initMapBox() {
            mapboxgl.accessToken = MAPBOXTOKEN
			const Mode = this.mode? this.mode: 'dark'
            this.mapBoxObject = new mapboxgl.Map({
				...MapObjectConfig,
                style: MapColorStyle[Mode]
            })
            this.mapBoxObject.addControl( new mapboxgl.NavigationControl() )
			this.mapBoxObject.addControl(new MapboxLanguage({defaultLanguage: 'zh-Hant'}))
            this.mapBoxObject.doubleClickZoom.disable()

			this.mapBoxObject.on('style.load', () => { //1
				this.mapLoadong = true
				this.mapBoxObject.setFog(MapFogStyle[Mode])
				this.initMapBasicLayer()
				if(!this.initMapLoad ){
					this.uploadAllActiveComponent()
				}
			}).on('load', (e) => { //2
				this.initMapLoad = false
				this.parseRouterQuery()

			}).on('idle', () => { //3
				this.mapLoadong = false

			}).on('error', (e) => {
				console.log('A error event occurred:'+ e.error)

			}).on("click", (event) => {
				event.preventDefault()
				this.mapBoxObject.getCanvas().style.cursor = 'pointer'
				// console.log( this.mapBoxObject.getZoom())

				if(this.mapBoxPopup)this.mapBoxPopup.remove()
				this.mapboxPopupGetInfo(event)
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
		},
		fetchDataset(mapConfigItem){
			return fetch(`${BASE_URL}/datas/${mapConfigItem.index}.geojson`)
			.catch(error => console.error('Error:', error.message))
			.then((response) => {
				if(response.status === 200 || response.status === 304) return response.json()
				if(response.status === 404) console.log(response.statusText)
			})
			.then(data => {
				return data? data: null
			})
		},
        mapboxPopupGetInfo(event){
			this.clearMapboxPopup()
			const clickFeatureDatas = this.mapBoxObject.queryRenderedFeatures(event.point, { layers: Object.keys(this.existCacheMapLayer) })
			if(!(clickFeatureDatas && clickFeatureDatas.length>0))return
            
			const componentDatas = clickFeatureDatas.map(item => this.existComponentData[item.layer.id]? this.existComponentData[item.layer.id]: null)
            this.mapBoxPopup = new mapboxgl.Popup().setLngLat(event.lngLat).setHTML('<div id="vue-popup-content"></div>').addTo(this.mapBoxObject)
			
			// https://v3-migration.vuejs.org/breaking-changes/props-data.html
            const PopupComponent = defineComponent({
				extends: MapboxPopup,
				setup() {
					return { 
						featureDatas: clickFeatureDatas,
						componentDatas
					}
				}
			})
			nextTick(() => {
				createApp(PopupComponent).mount('#vue-popup-content')
			})
        },
		clearMapboxPopup(){
            if(this.mapBoxPopup)this.mapBoxPopup.remove()
        },
		updateAllDrawerSelect(target){
			console.log('updateAllDrawerSelect');
			// First laod - Layer settings are loaded only once
			const { name, map_config, request_list } = target
			const ComponentIndex = target.index
			if(!(map_config && request_list))return
			const TargetRequest = request_list.find(list => list.type === 'MapIconDisplay')
			map_config.map(mapConfigItem => {
				const MapLayerIndex = mapConfigItem.index
				const exitCache = Object.keys(this.existCacheMapLayer).includes(MapLayerIndex)
				if(exitCache)return
				this.fetchDataset(mapConfigItem).then(data => {
					if(!data) returnå
					this.addMapLayer(TargetRequest, mapConfigItem, data, ComponentIndex, name)
					this.existComponentDisplay[ComponentIndex] = true
				})
			})
		},
		updateTopicComponentToMap(updateData){
			// Replace active list
			this.activeTopicComponent = updateData.active
			this.activeTopicLayer = updateData.topicLayer.value
			this.clearMapboxPopup()
			this.updateActiveComponent(this.activeTopicLayer)
		},
		updateBasicComponentToMap(layers){
			// Replace active list
			this.activeBasicComponent = layers
			this.clearMapboxPopup()
			this.updateRainLayer(layers.includes('flood_risk'))
			this.updateActiveComponent(basicMapLayer)

		},
		uploadAllActiveComponent(){
			this.clearMapboxPopup()
			this.updateRainLayer(this.activeBasicComponent.includes('flood_risk'))
			// const 
			this.updateActiveComponent([...basicMapLayer, ...this.activeTopicLayer])

		},
		parseRouterQuery(){
			const {topic, component} = this.$route.query
			if(!(topic && component)) return 
			const TargetTopic = MapTopicComponentList.find(item => item.index === topic)
			if(!TargetTopic) return
			const TargetComponent = TargetTopic.components.find(item => item.index === component)
			this.TopicNames = component
			this.activeTopicComponent = [component]
			this.updateActiveComponent(TargetTopic.components)
		},
		updateActiveComponent(MapLayers = []){
			const DrawerActiveComponent = this.activeBasicComponent.concat(this.activeTopicComponent)
			// Clean active component
            DrawerActiveComponent.map(componentIndex => {
				const targetObj = MapLayers.find(item => item.index === componentIndex)
				if(!targetObj)return
				this.updateAllDrawerSelect(targetObj)
            })

			Object.keys(this.existComponentDisplay).filter(item => {
				this.existComponentDisplay[item] = DrawerActiveComponent.includes(item)
			})

			// Check exist layers - Show or Hide map layer from cache
			if(Object.keys(this.existCacheMapLayer).length === 0) return
			Object.keys(this.existCacheMapLayer).map(layerIndex => {
				if(this.mapBoxObject.getLayer(layerIndex)){
					const TargertComponent = this.existCacheMapLayer[layerIndex]
					if(!this.affectedMapLayer[layerIndex]){
						this.mapBoxObject.setLayoutProperty(layerIndex, 'visibility', (this.existComponentDisplay[TargertComponent])?'visible': 'none')
					}
				}else{
					// All the map source & layer are missing because change map style mode.
					console.log(layerIndex);
				}
			})
		},
		addMapLayer(TargetRequest, mapConfigItem, data, componentIndex, componentName){
			const MapLayerIndex = mapConfigItem.index
			const MapLabel = TargetRequest && TargetRequest.mapLabel? TargetRequest.mapLabel: []
			const targetMapLabel = MapLabel.find(list => list.index === MapLayerIndex)
			const { loadImage, main, extra, interactive } = ParseMapLayer(mapConfigItem, targetMapLabel)
			if(loadImage !== '' && !this.mapBoxObject.hasImage(loadImage)){
				const PngUrl = require(`@/assets/img/mapbox/${loadImage}.png`)
				this.mapBoxObject.loadImage(PngUrl, (error, image) => {
					if (error) throw error
					this.mapBoxObject.addImage(loadImage, image)
				})
			}
			if(!this.mapBoxObject.getSource(`${MapLayerIndex}`)){
				this.mapBoxObject.addSource(`${MapLayerIndex}_source`, { type: 'geojson', data: data })
			}
			if(!this.mapBoxObject.getLayer(main.id)){
				this.mapBoxObject.addLayer(main)
			}

			/** Exist cache mapLayer
			 * 	 key: Layer index
			 * 	 value: Component index
			 */
			this.existCacheMapLayer[main.id] = componentIndex
			/** Exist cache mapLayer data
			 * 	 key: Layer index
			 */
			const ComponentDataValue = {
				title: targetMapLabel && targetMapLabel.name? targetMapLabel.name: componentName,
				property: mapConfigItem.property? mapConfigItem.property: null
			}
			this.existComponentData[main.id] = ComponentDataValue

			if(main.interactive){
				this.affectedMapLayer[main.id] = main.interactive
			}else if(this.fromComponent === componentIndex){
				this.mapBoxObject.setLayoutProperty(main.id, 'visibility', 'visible')
			}

			if(extra && extra.id){
				if(!this.mapBoxObject.getLayer(extra.id)){
					this.mapBoxObject.addLayer(extra)
				}
				this.existCacheMapLayer[extra.id] = componentIndex
				this.existComponentData[extra.id] = ComponentDataValue
				if(extra.interactive){
					this.affectedMapLayer[extra.id] = extra.interactive
				}else if(this.fromComponent === componentIndex){
					this.mapBoxObject.setLayoutProperty(extra.id, 'visibility', interactive? 'none': 'visible')
				}
			}
		},
        updateRainLayer(componentToggle){
			this.clearMapboxPopup()
            RainOptions.map((rainFallItem) => {
				const MapLayerIndex = rainFallItem.index
				const MapVisible = (componentToggle && rainFallItem.value === this.$store.state.rainfallLayerShow)?  'visible': 'none'
				if(!this.mapBoxObject.getLayer(`${MapLayerIndex}`)){
					this.fetchDataset(rainFallItem).then(data => {
						if(!data) return
						this.mapBoxObject.addSource(`${MapLayerIndex}`, { type: 'geojson', data: data }).addLayer({
							id: MapLayerIndex,
							source: `${MapLayerIndex}`,
							type: 'fill',
							paint: RainPaintConfig,
							layout: {
								'visibility': MapVisible
							}
						})
						this.existCacheMapLayer[MapLayerIndex] = 'flood_risk'
						this.existComponentData[MapLayerIndex] = {
							title: rainFallItem.title,
							property: [
								{key: "name", name: "可能積水深度"}
							]
						}
					})
                }else{
					this.mapBoxObject.setLayoutProperty(MapLayerIndex, 'visibility', MapVisible)
				}
            })
        }
	},
  	data(){
		return {
			initMapLoad: true,
			mapLoadong: false,
			mapBoxObject: null,
			mapBoxPopup: null,
			existComponentDisplay: {},
			existCacheMapLayer: {},

			//maplayerID:componentData
			existComponentData: {},

			activeBasicComponent: [],
			activeTopicComponent: [],
			activeTopicLayer: [],
			
			affectedMapLayer: {}
		}
	},
    mounted() {
        this.initMapBox()
    },
    beforeDestroy() {
        this.$store.commit('changeRainfall', "")
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