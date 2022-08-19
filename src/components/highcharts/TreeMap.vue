<template>
	<div class="treeMapContainer">
		<highcharts 
			class="chartContainer treeMap"
			:style="chartContainerHeight"
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
				const label = config.label? config.label: this.name
				const layoutAlgorithm = config.layoutAlgorithm? config.layoutAlgorithm: "strip"
				this.chartOptions.series[0]['name'] = label
				this.chartOptions.series[0]['data'] = data
				this.chartOptions.series[0]['layoutAlgorithm'] = layoutAlgorithm
            }
        }
	},
	computed:{
		chartContainerHeight(){
			if(this.$route.name === 'mapview'){
				return {height: '15rem'}
			}else{
				return {height: '100%'}
			}
		}
	},
  	data(){
		return {
			suffix,
			chartOptions: {
				...Options,
				chart: {
					type: 'treemap'
				},
				tooltip: {
					valueDecimals: 2,
					valueSuffix: this.request.config && this.request.config.suffix? this.request.config.suffix: suffix
				},
				series: [{
					name: '',
					data: [],
					dataLabels: {
						enabled: true,
						formatter: function() {
							const {key, point, series} = this
							const valueSuffix = series.tooltipOptions? series.tooltipOptions.valueSuffix: ''
							const valueDecimals = series.tooltipOptions? series.tooltipOptions.valueDecimals: ''
							const Value = point.value.toFixed(valueDecimals)
							return `${key}<br> ${Value}${valueSuffix}`
						}
					}
				}]
			}
		}
	}
}
</script>
<style lang="scss">
.treeMapContainer{
	height: 100%;
	.desc{
		display: flex;
		justify-content: flex-start;
		p{
			font-size: 0.8rem;
			margin: 0.25rem 0.5rem;
		}
	}
	.chartContainer.treeMap{
		height: calc(100% - 1rem);
		.highcharts-data-label{
			text{
				fill: var(--el-menu-text-color) !important;
			}
			.highcharts-text-outline{
				stroke: transparent;
			}
		}
	}
}
</style>