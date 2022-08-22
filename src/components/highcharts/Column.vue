<template>
	<highcharts 
		class="chartContainer column"
		:style="chartContainerHeight"
		:options="chartOptions" 
	/>
	<el-row justify="center">
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
		chartContainerHeight(){
			if(this.belong === 'card_mapview'){
				return {height: '15rem'}
			}else{
				return {height: '100%'}
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