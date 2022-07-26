<template>
	<highcharts 
		id="LineBasicContainer"
		class="chartContainer"
		:options="chartOptions" 
	/>
</template>

<script>
/* TODO: Implement basic line chart
 * 
 */
// import Highcharts from "highcharts"
export default {
	name: 'LineBasic',
	props: {
		lineChartTitle: {
			type: String,
			default: ""
		},
		lineChartType: {
			type: String,
			default: "spline" // spline, area
		},
		xAxis: {
			type: Object,
			default: () => {
				return {
					categories: []
				}
			}
		},
		yAxis: {
			type: Object,
			default: () => {
				return {
					title: ""
				}
			}
		},
		data: {
			type: Array,
			default: () => []	
		}
	},
	methods: {},
	watch: {},
  	data(){
		return {
			chartOptions: {
				title: {
					text: this.lineChartTitle
				},
				chart: {
					type: this.lineChartType,
					// zoomType: "x"
				},
				xAxis: {
					type: "datetime",
					categories: ["Jun", "Jul", "Aug", "Sept"],
					crosshair: {
						width: 2,
						color: "red",
						dashStyle: "shortdot"
					}
				},
				yAxis: {
					title: {
						text: "Average ft"
					},
				},
				plotOptions: {
					area: {
						fillColor: {
							linearGradient: {
								x1: 0,
								y1: 0,
								x2: 0,
								y2: 1
							},
							// stops: [
							// 	[
							// 		0, 
							// 		Highcharts.getOptions().colors[4]]
							// 	[
							// 		1,
							// 		Highcharts.color(Highcharts.getOptions().colors[0])
							// 		.setOpacity(0.2)
							// 		.get("rgba")
							// 	]
							// ],
						},
						marker: {
							radius: 2,
						},
						lineWidth: 2,
						states: {
							hover: {
								lineWidth: 4
							}
						},
						threshold: null
					}
				},
				tooltip: {
					// positioner: () => {
					// 	return { x: 80, y: 50 }
					// },
					shadow: true,
					borderWidth: 0,
					shape: "square",
					// shared: true
				},
				series: [
					{
						// type: 'area',
						name: "Average ft",
						data: this.data
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