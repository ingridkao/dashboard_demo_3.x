<template>
	<highcharts 
		class="chartContainer treeMap"
		:options="chartOptions" 
	/>
</template>
<script>
/* 
 * https://www.highcharts.com/docs/chart-and-series-types/treemap
 */
import {Options} from '@/assets/js/hightchartConfig.js'
export default {
	name: 'WordCloud',
	props: {
		name: {
			type: String,
			default: ""
		},
		config: {
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
				series: [
					{
						type: 'treemap',
						name: this.config.label? this.config.label: this.name,
						data: this.dataset,
						tooltip: {
							valueSuffix: this.config.suffix? this.config.suffix:'km²'
						},
						layoutAlgorithm: 'squarified',
						dataLabels: {
							enabled: true,
							formatter: function() {
								const {key, point, series} = this
								const valueSuffix = series.userOptions.tooltip.valueSuffix
								const Value = point.value.toFixed(2)
								return `${key}<br> ${Value}${valueSuffix}`
							}
						}
					}
				]
			}
		}
	}
}
</script>