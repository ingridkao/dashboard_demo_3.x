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
		}
	},
    watch: {
        request: {
            deep: true,
            immediate: true,
            handler: function(newObj, oldObj){
				const { config, data } = newObj
				this.chartOptions.series[0] = {
					data: data,
					name: config.label? config.label: this.name
				}
            }
        }
	},
  	data(){
		return {
			chartOptions: {
				...Options,
				chart: {
					type: 'wordcloud'
				},

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
				series: []
			}
		}
	}
}
</script>