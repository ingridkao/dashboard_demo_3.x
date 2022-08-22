<template>
	<highcharts 
		class="chartContainer wordCloud"
		:style="chartContainerHeight"
		:options="chartOptions" 
	/>
</template>
<script>
/* 
 * https://www.highcharts.com/docs/chart-and-series-types/word-cloud-series
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
				this.chartOptions.series[0] = {
					data: data,
					name: config.label? config.label: this.name
				}
            }
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
  	data(){
		return {
			chartOptions: {
				...Options,
				chart: {
					type: 'wordcloud',
					...ChartConfig
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