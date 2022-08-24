<template>
	<el-row v-if="keyratioInfo.length>0" justify="start" class="keyratio">
		<el-col 
			v-for="(item, index) in sum" 
			:key="index" 
			:span="sum.length/24"
		>
			<div>{{item.label}}</div>
			<div>{{item.value}}</div>
		</el-col>
		<el-col 
			v-for="(item, index) in keyratioInfo" 
			:key="index" 
			:span="keyratioInfo.length/24"
		>
			<div>
				<span 
					v-if="item.symbol"
					class="mapIcon big" 
					:class="translateSymbol(item.symbol)" 
					:style="translateStyle(item, index)"
				/>
				{{item.label}}
			</div>
			<div>{{item.value}}</div>
		</el-col>
	</el-row>
	<highcharts 
		class="chartContainer column"
		:style="chartContainerHeight"
		:options="chartOptions" 
	/>
	<el-row justify="center" class="columnActionBts">
		<el-button size="small" text bg @click="updateChart()">垂直</el-button>
		<el-button size="small" text bg @click="updateChart('inverted')">水平</el-button>
		<el-button size="small" text bg @click="updateChart('polar')">雷達</el-button>
	</el-row>
</template>
<script>
/* 
 * https://www.highcharts.com/docs/chart-and-series-types/treemap
 */
import {Options, LineXAxis, LineYAxis} from '@/assets/js/hightchartConfig.js'
export default {
	props: {
		name: {
			type: String,
			default: ""
		},
		request: {
			type: Object,
			default: () => {}
		},
		belong: {
			type: String
		}
	},
	computed:{
		keyratioInfo(){
			return this.request.keyratio && this.request.keyratio.info? this.request.keyratio.info: []
		},
		chartContainerHeight(){
			if(this.belong === 'information_home'){
				return {height: '80%'}
			}else if((this.keyratioInfo.length > 0)){
				if(this.belong === 'card_mapview'){
					return {height: '10rem'}
				}else if(this.belong === 'card_home'){
					return {height: '16rem'}
				}
			}else{
				return {height: '90%'}
			}
		}
	},
    watch: {
        request: {
            deep: true,
            immediate: true,
            handler: function(newObj, oldObj){
				const { config, data, categories } = newObj
				this.chartOptions.chart.inverted = config.inverted? config.inverted: false
				this.chartOptions.series = data
				if(categories){
					this.chartOptions.xAxis.categories = categories
				}
				if(config && config.plotOptions){
					this.chartOptions.plotOptions = {
						...this.chartOptions.plotOptions,
						...config.plotOptions
					}
				}
            }
        }
	},
  	data(){
		return {
			chartOptions: {
				...Options,
				chart: {
					type: 'column',
					showInLegend: false,
					inverted: false,
					polar: false
				},
				xAxis: {
					...LineXAxis
				},
				yAxis: {
					...LineYAxis
				},
				legend:{
					align: 'left',
					verticalAlign: 'top'
				},
				series: []
			}
		}
	},
	methods: {
		translateSymbol(contentSymbol){
            return (contentSymbol)? contentSymbol: 'circle'
        },
        translateStyle(content){
            if(content){
				return {
					backgroundColor: content.color? content.color: '#ddd',
					borderColor: content.color? content.color: '#ddd' 
				}    
            }else{
				return {}
			}
        },
		updateChart(type){
			this.chartOptions.chart.inverted = (type === 'inverted')
			this.chartOptions.chart.polar = (type === 'polar')
		}
	}
}
</script>
<style lang="scss">
.chartContainer.column{
	height: 90%;
	.highcharts-column-series text{
		fill: var(--el-menu-text-color) !important;
	}
	// .highcharts-title{
	// 	fill: var(--el-text-color-secondary) !important;
	// }
	// .highcharts-data-label{
	// 	text{
	// 		fill: var(--el-menu-text-color) !important;
	// 	}
	// 	.highcharts-text-outline{
	// 		stroke: transparent;
	// 	}
	// }
}
</style>