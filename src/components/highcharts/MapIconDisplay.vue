<template>
	<el-row  
		v-if="mapLabel.length > 0"
		:justify="config && config.col? 'space-around':'space-between'"
		align="middle"
		:class="['mapIconRow', {col: config && config.col}]"
	>
		<el-col 
			v-for="(contentItem, contentIndex) in mapLabel" 
			:key="contentItem.index" 
			:span="config && config.col? 24: 24/mapLabel.length"
		>
			<div>
				<span 
					class="mapIcon" 
					:class="translateSymbol(contentItem.symbol)" 
					:style="translateStyle(contentItem, contentIndex)"
				/>
				<span>
					{{contentItem.name}}
				</span>
			</div>
			<div v-if="contentItem.data" class="mapData" >
				<span class="data">{{contentItem.data}}</span>
				<span v-if="contentItem.unit" class="unit">{{contentItem.unit}}</span>
			</div>
		</el-col>
	</el-row >
	<template v-else>
		Map Icon
	</template>
</template>

<script>
import bike from '@/assets/img/mapbox/bike.png'
import bus from '@/assets/img/mapbox/bus.png'
import metro from '@/assets/img/mapbox/metro.png'
import cross1 from '@/assets/img/mapbox/cross_normal.png'
import cross2 from '@/assets/img/mapbox/cross_bold.png'
import triangleGreen from '@/assets/img/mapbox/triangle_green.png'
import triangleWhite from '@/assets/img/mapbox/triangle_white.png'
const MainColors = ["#26d5d7", "#7EE4D3", "#219A86", "#A5ECE0", "#166759"]

export default {
	props: {
		components: {
			type: Object,
			default: () => {}
		},
		request: {
			type: Object,
			default: () => {}
		}
	},
	computed:{
		config(){
			return this.request.config? this.request.config: null
		},
		mapLabel(){
			return this.request.mapLabel? this.request.mapLabel: []
		}
	},
	methods: {
		translateSymbol(contentSymbol){
            return (contentSymbol)? contentSymbol: 'circle'
        },
        translateStyle(content, index){
            const css = {}
            const color = (content && content.color)? content.color: MainColors[index]
            if(content){
                if(['bike', 'bus', 'metro', 'cross1', 'cross2', 'triangle_green', 'triangle_white'].includes(content.symbol)){
                    css.backgroundSize = 'contain'
                    if(content.symbol === 'bike'){ css.backgroundImage = `url(${bike})`}
                    if(content.symbol === 'bus'){ css.backgroundImage = `url(${bus})`}
                    if(content.symbol === 'metro'){ css.backgroundImage = `url(${metro})`}
                    if(content.symbol === 'cross1'){ css.backgroundImage = `url(${cross1})`}
                    if(content.symbol === 'cross2'){ css.backgroundImage = `url(${cross2})`}
                    if(content.symbol === 'triangle_green'){ css.backgroundImage = `url(${triangleGreen})`}
                    if(content.symbol === 'triangle_white'){ css.backgroundImage = `url(${triangleWhite})`}
                }else{
					//dasharray
                    css.backgroundColor = color
                    css.borderColor = color     
                }
            }
            return css
        }
	},
  	data(){
		return {}
	}
}
</script>
<style lang="scss" scoped>
$iconWidth:1rem;
$borderWidth: $iconWidth/10;
.mapIconRow{
	width: calc(100% - 3rem);
    height: 100%;
	margin: 0 auto;
	&.col{
		height: calc(100% - 3rem);
		margin-top: 1rem;
		align-content: start;
		>*{
			padding: 1rem 0;
		}
	}
	.el-col,
	.el-col > div{
		display: inline-flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: space-between;
	}
	.mapIcon{
		display: inline-flex;
		width: $iconWidth;
		height: $iconWidth;
		margin-right: $iconWidth/2;
		&.dasharray{
			background-color: transparent !important;
			border-width: $iconWidth/5;
			border-style: dotted;
		}
		&.circle{
			width: $borderWidth;
			height: $borderWidth;
			border-radius: $borderWidth;
			border-width: $borderWidth;
			border-style: solid;
		}
		&.circle_stroke{
			background-color: transparent !important;
			border-width: $borderWidth;
			border-radius: $iconWidth;
			border-style: solid;
		}
		// &.square{
		// 	transform: rotate(45deg);
		// }
		&.triangle_white{
			background-color: var(--el-color-info-light-7);
			border-radius: 50%;
		}
		&.line{
			height: $borderWidth*2;
			border-radius: $borderWidth;
		}
	}
	.mapData{
		align-items: end !important;
		.data{
			font-size: 1.2rem;
			line-height: 1;
		}
		.unit{
			font-size: 0.5rem;
		}
	}
}
</style>