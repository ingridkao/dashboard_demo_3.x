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
		:style="{height: (keyratioInfo.length > 0)? 'calc(100% - 3rem)': '100%'}"
		:options="chartOptions" 
		:updateArgs="[true, false]" 
	/>
</template>
<script>
/* 
 * https://www.highcharts.com/docs/chart-and-series-types/treemap
 * https://www.highcharts.com/demo/pie-semi-circle
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
			deep: true,
			default: () => {}
		}
	},
    watch: {
        request: {
            deep: true,
            immediate: true,
            handler: function(newObj, oldObj){
				const { config, data } = newObj
				const title = config && config.title? config.title: "累積案件"
				const label = config && config.label? config.label: this.name
				const dataset = data? data.reduce((a,b) => {
					if(Array.isArray(b)) return a+b[1]
					return a+b.y
				}, 0): []
				this.chartOptions.title.text = `<b>${title}</b><br/>${dataset}`
				this.chartOptions.series[0].name = label
				this.chartOptions.series[0].data = data
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
			chartOptions: {
				...Options,
				chart: {
					type: 'pie',
					plotBackgroundColor: null,
					plotBorderWidth: null,
					plotShadow: false,
				},
				title: {
					align: 'center',
					verticalAlign: 'middle',
					y: 15,
					style: {
						fontSize: '16px'
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
							format: '{point.name}:<br/>{point.percentage:.1f} %',
							padding: 1,
                			distance: '50%'
						}
					}
				},
				series: [
					{
						size: '50%',
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