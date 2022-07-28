<template>
	<highcharts 
		class="chartContainer column"
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
import {Options} from '@/assets/js/hightchartConfig.js'
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
		dataset: {
			type: Array,
			default: () => []
		}
	},
  	data(){
		return {
			chartOptions: {
				...Options,
				chart: {
					inverted: false,
					polar: false
				},
				xAxis: {
					categories: this.request? this.request.categories: []
				},
				yAxis: {
					title: {
						text: null
					}
				},
				series: [
					{
						type: 'column',
						// colorByPoint: true,
						showInLegend: false,
						name: this.name,
						data: this.dataset
					}
				]
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