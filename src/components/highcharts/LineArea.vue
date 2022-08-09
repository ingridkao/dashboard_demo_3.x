<template>
	<el-row justify="start" class="keyratio">
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
			<div>{{item.label}}</div>
			<div>{{item.value}}</div>
		</el-col>
	</el-row>
	<highcharts 
		class="chartContainer area"
		:style="{height: (sum.length > 0 || keyratioInfo.length > 0)? 'calc(100% - 3rem)': '100%'}"
		:options="chartOptions" 
		:updateArgs="[true, false]" 
	/>
</template>
<script>
/* 
 * https://www.highcharts.com/demo/area-basic
 */
import {Options, LineXAxis, LineYAxis } from '@/assets/js/hightchartConfig.js'
export default {
	props: {
		request: {
			type: Object,
			deep: true,
			default: () => {}
		}
	},
    watch: {
        request: {
            deep: true,
            immediate: true,
            handler: function(newObj, oldObj){
				const { config, data, categories, keyratio } = newObj
				const title = config && config.title? config.title: ""
				this.chartOptions.series = data
				if(!config.sumHide){
					const keyratioName = keyratio && keyratio.name? keyratio.name: ''
					this.sum = data.map(item => {
						return {
							label: `${item.name}${keyratioName}`,
							value: item.data.reduce((a,b) => a+b, 0)
						}
					})
				}
				if(categories){
					this.chartOptions.xAxis.categories = categories
				}
				if(config && config.plotOptions){
					this.chartOptions.plotOptions.area = {
						...this.chartOptions.plotOptions.area,
						...config.plotOptions
					}
				}
				if(config && config.xAxis){
					this.chartOptions.xAxis = {
						...this.chartOptions.xAxis,
						...config.xAxis
					}
				}
            }
        }
	},
	computed:{
		keyratioInfo(){
			return this.request.keyratio && this.request.keyratio.info? this.request.keyratio.info: []
		}
	},
  	data(){
		return {
			sum:[],
			chartOptions: {
				...Options,
				chart: {
					type: 'area'
				},
				// colors: ['#A81A9A', '#00abff'],
				xAxis: {
					...LineXAxis
				},
				yAxis: {
					...LineYAxis
				},
				legend:{
					align: 'left',
					verticalAlign: 'top',
					// layout: 'vertical',	
				},
				tooltip: {
					shared: true
				},
				plotOptions: {
					area: {
						fillOpacity: 0.35,
						marker: {
							radius: 1
						},
						lineWidth: 1,
						threshold: null
					}
				},
				series: []
			}
		}
	}
}
</script>
<style lang="scss">
.chartContainer.area{
	.highcharts-line-series text,
	.highcharts-area-series text{
		fill: var(--el-menu-text-color) !important;
	}
}
.keyratio{
	.el-col{
		padding: 0 0 0 0.75rem;
		div:first-child{
			font-size: 0.75rem;
		}
		div:last-child{
			font-size: 0.9rem;
		}
	}
}
</style>