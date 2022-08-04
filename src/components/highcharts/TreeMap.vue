<template>
	<div class="treeMapContainer">
		<highcharts 
			class="chartContainer treeMap"
			:options="chartOptions" 
		/>
		<div class="desc">
			<p>台北市總面積: 271.8 {{suffix}}</p>
		</div>
	</div>
</template>
<script>
/* 
 * https://www.highcharts.com/docs/chart-and-series-types/treemap
 */
import {Options} from '@/assets/js/hightchartConfig.js'
const suffix = 'km²'
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
				this.chartOptions.series[0]['data'] = data
            }
        }
	},
  	data(){
		return {
			suffix,
			chartOptions: {
				...Options,
				series: [
					{
						type: 'treemap',
						name: this.request.config && this.request.config.label? this.request.config.label: this.name,
						data: [],
						tooltip: {
							valueDecimals: 2,
							valueSuffix: this.request.config && this.request.config.suffix? this.request.config.suffix: suffix
						},
						layoutAlgorithm: this.request.config && this.request.config.layoutAlgorithm? this.request.config.layoutAlgorithm: "strip",
						dataLabels: {
							enabled: true,
							formatter: function() {
								const {key, point, series} = this
								const valueSuffix = series.userOptions.tooltip? series.userOptions.tooltip.valueSuffix: ''
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
<style lang="scss" scoped>
.treeMapContainer{
	height: 100%;
	.chartContainer{
        height: calc(100% - 1.5rem);
	}
	.desc{
		display: flex;
		justify-content: flex-end;
		p{
			font-size: 0.8rem;
			margin: 0 0.5rem;
			line-height: 1.5;
		}
	}
}
</style>