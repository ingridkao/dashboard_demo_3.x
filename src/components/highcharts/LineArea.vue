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
		:style="chartContainerHeight"
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
				const name = config && config.name? config.name: ""
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
		},
		chartContainerHeight(){
			const sumLength = this.sum.length
			const keyratioInfoLength = this.keyratioInfo.length
			if((sumLength > 0 || keyratioInfoLength > 0)){
				if(this.$route.name === 'mapview'){
					return {height: '15rem'}
				}else{
					return {height: `calc(100% - ${(sumLength+keyratioInfoLength)*1.5}rem)`}
				}
			}else{
				return {height: '100%'}
			}
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
		padding: 0 0.75rem 0.25rem 0;
		div:first-child{
			font-size: 0.6rem;
		}
		div:last-child{
			font-size: 0.9rem;
		}
	}
}
</style>