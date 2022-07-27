<template>
	<highcharts 
		id="WordCloudContainer"
		class="chartContainer"
		:options="chartOptions" 
	/>
</template>

<script>
/* TODO: Implement basic line chart
 * https://www.highcharts.com/docs/chart-and-series-types/word-cloud-series
 */
export default {
	name: 'WordCloud',
	props: {
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
				title:{
					text: null
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
				series: [
					{
						// specific options for this series instance
						type: 'wordcloud',
						data: this.dataset,
						name: this.config? this.config.title: null
					}
				],
				credits: {
					enabled: false
				}
			}
		}
	}
}
</script>

<style lang="scss" scoped>
</style>