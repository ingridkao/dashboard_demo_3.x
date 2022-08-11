<script setup>
	import { ref } from 'vue'
	import { useFullscreen } from '@vueuse/core'
	const isCollapse = ref(false)
	const MapContainer = ref(null)
	const { isFullscreen, toggle } = useFullscreen(MapContainer)
	const updateCollapse = () => {
		isCollapse.value = !isCollapse.value
	}
</script>

<template>
	<el-container ref="MapContainer">
		<el-drawer
			v-model="isCollapse"
			direction="ltr"
			:with-header="false"
		>
			<el-breadcrumb separator="/">
				<el-breadcrumb-item :to="{ path: '/' }">
					<el-icon><House /></el-icon>
				</el-breadcrumb-item>
				<el-breadcrumb-item>主題名稱</el-breadcrumb-item>
			</el-breadcrumb>
			<el-scrollbar>
				<div>
					<p>轉來轉去</p>
					<p>component list(checkbox)</p>
				</div>
			</el-scrollbar>
		</el-drawer>
		<el-main 
			id="mapboxContainer" 
			:class="{
				fullscreen: isFullscreen
			}"
			v-loading="mapLoadong"
		>
			<div id="mapboxBox"/>
			<div id="mapBtnBox">
				<el-button type="info" circle @click="updateCollapse">
					<el-icon><Tickets /></el-icon>
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
import 'mapbox-gl/dist/mapbox-gl.css'
const MAPBOXTOKEN = process.env.VUE_APP_MAPBOXTOKEN
import mapStyle from '@/assets/datas/mapStyle.js'
import { MapObjectConfig, MapFogStyle } from '@/assets/datas/mapConfig.js'
const MapStyle = {
	'light':'mapbox://styles/mapbox/light-v10',
	'dark': mapStyle
}
export default {
	props: {
		mode: {
			type: String
		}
	},
	computed:{
		// config(){
		// 	return this.request.config? this.request.config: null
		// },
	},
	methods: {
		// translateSymbol(contentSymbol){
        //     return (contentSymbol)? contentSymbol: 'circle'
        // }
	},
	watch: {
		mode() {
			this.MapBoxObject.setStyle(MapStyle[this.mode]);
		}
	},
	methods: {
		initMapBox() {
            mapboxgl.accessToken = MAPBOXTOKEN
            this.MapBoxObject = new mapboxgl.Map({
				...MapObjectConfig,
                style: MapStyle[this.mode]
            })
            this.MapBoxObject.addControl( new mapboxgl.NavigationControl() )
            this.MapBoxObject.doubleClickZoom.disable()
			this.MapBoxObject.scrollZoom.disable();
            // Add language controls to the map.
            // if (mapboxgl.getRTLTextPluginStatus() !== 'loaded') {
            //     mapboxgl.setRTLTextPlugin('/js/mapbox-gl-rtl-text.js') 
            // }
            // this.MapBoxObject.addControl(new MapboxLanguage({
            //     defaultLanguage: 'zh-Hant'
            // }))
            // this.mapDrawInitialized()
            if (this.MapBoxObject.loaded()) {
                this.mapLoadLayer()
            } else {
                this.MapBoxObject.on('load', () => this.mapLoadLayer())
            }
			this.MapBoxObject.on('style.load', () => {
				this.mapLoadong = true
				this.MapBoxObject.setFog(MapFogStyle[this.mode])
			}).on('idle', () => {
                this.mapLoadong = false
            }).on('error', (e) => {
                console.log('A error event occurred:'+ e)
            })
        },
		mapLoadLayer(){
			// console.log('load');
		}
	},
  	data(){
		return {
			mapLoadong: false,
			MapBoxObject: null,
		}
	},
    mounted() {
        this.initMapBox()
    },
    destroyed() {
		if(this.MapBoxObject){
			this.MapBoxObject.remove()
		}
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
	.el-main{
		// margin: 0 auto;
		// display: grid;
		// gap: 1rem;
		// grid-template-columns: repeat(auto-fit, minmax(22.5rem, 1fr));
		// grid-auto-rows: 25rem;
		// max-width: 100rem;
		// &.fullscreen{
		// 	max-width: 120rem;
		// }
		// @media all and (min-width: 1920px){
		// 	max-width: 95rem;
		// 	&.fullscreen{
		// 		max-width: 115rem;
		// 	}
		// }
		// .card-container{
		// 	width: 100%;
		// 	height: 100%;
		// 	display: flex;
		// 	flex-direction: column;
		// 	transition: all 500ms;
		// 	overflow: hidden;
		// 	@media screen and (min-width: 600px) {
		// 		&.tall {
		// 			grid-row: span 2 / auto;
		// 		}
		// 		&.wide {
		// 			grid-column: span 2 / auto;
		// 		}
		// 		&.large {
		// 			grid-row: span 2 / auto;
		// 			grid-column: span 2 / auto;
		// 		}
		// 	}
		// }
	}
}
</style>