<template>
	<el-row justify="start" class="keyratio">
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
		class="chartContainer circle"
		:style="chartContainerHeight"
		:options="chartOptions" 
		:updateArgs="[true, false]" 
	/>
</template>
<script>
/* 
 * https://www.highcharts.com/docs/chart-and-series-types/treemap
 * https://www.highcharts.com/demo/pie-semi-circle
 */
import {Options, ChartConfig} from '@/assets/js/hightchartConfig.js'
export default {
	props: {
		name: {
			type: String,
			default: ""
		},
		request: {
			type: Object,
			deep: true,
			default: () => {}
		},
		belong: {
			type: String
		}
	},
    watch: {
        request: {
            deep: true,
            immediate: true,
            handler: function(newObj, oldObj){
				const { config, data } = newObj
				const name = config && config.name? config.name: "累積案件"
				const label = config && config.label? config.label: this.name
				const dataset = data? data.reduce((a,b) => {
					if(Array.isArray(b)) return a+b[1]
					return a+b.y
				}, 0): []
				this.chartOptions.name.text = `<b>${name}</b><br/>${dataset}`
				this.chartOptions.series[0].name = label

				let str = ''
				label.split(' ').map(item =>{
					str += `${item}<br/>`
				})
				this.chartOptions.title.text = str
				this.chartOptions.series[0].data = data
            }
        }
	},
	computed:{
		keyratioInfo(){
			return this.request.keyratio && this.request.keyratio.info? this.request.keyratio.info: []
		},
		chartContainerHeight(){
			if(this.belong === 'card_mapview'){
				return {height: '14rem'}
			}else{
				const keyratioInfoLength = this.keyratioInfo.length
				if((keyratioInfoLength > 0)){
					return {height: `calc(100% - 3rem)`}
				}else{
					return {height: '100%'}

				}
			}
		}
	},
  	data(){
		return {
			chartOptions: {
				...Options,
				title:{
					text: '',
					align: 'center',
					verticalAlign: 'middle'
				},
				chart: {
					type: 'pie',
					...ChartConfig,
					plotBackgroundColor: null,
					plotBorderWidth: null,
					plotShadow: false
				},
				name: {
					align: 'center',
					verticalAlign: 'middle',
					style: {
						fontSize: '1.5rem'
					}
				},
				tooltip: {
					useHTML: true,
					headerFormat: '<table><tr><th colspan="2">{point.key}:  {point.percentage:.1f}% </th></tr>',
					pointFormat: '<tr><td>{series.name} </td>' +
						'<td style="text-align: right"><b>{point.y}</b></td></tr>',
					footerFormat: '</table>'
				},
				plotOptions: {
					pie: {
						allowPointSelect: true,
						cursor: 'pointer',
						dataLabels: {
							enabled: true,
							format: '<h6 style="font-size: 1rem">{point.percentage:.1f} %</h6><br/>{point.name}:{point.y}',
							padding: 1,
                			distance: '50%'
						}
					}
				},
				series: [
					{
						// size: '50%',
						innerSize: '85%',
						data: []
					}
				]
			}
		}
	}
}
</script>
<style lang="scss">
.chartContainer.circle{
	.highcharts-title{
		fill: var(--el-text-color-secondary) !important;
	}
	.highcharts-data-label{
		text{
			fill: var(--el-menu-text-color) !important;
		}
		.highcharts-text-outline{
			stroke: transparent;
		}
	}
}
</style>