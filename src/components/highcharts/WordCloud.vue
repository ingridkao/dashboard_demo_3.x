<template>
	<highcharts 
		class="chartContainer wordCloud"
		:options="chartOptions" 
	/>
</template>
<script>
/* 
 * https://www.highcharts.com/docs/chart-and-series-types/word-cloud-series
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
	computed:{
		config(){
			return this.request.config
		}
	},
  	data(){
		return {
			chartOptions: {
				...Options,
				plotOptions:{
					series: {
						// general options for all series
					},
					wordcloud: {
						// shared options for all wordcloud series
						rotation: {
							to: 0
						}
					}
				},
				series: [
					{
						// specific options for this series instance
						type: 'wordcloud',
						data: this.dataset,
						name: this.config && this.config.label? this.config.label: this.name
					}
				]
			}
		}
	}
}
</script>