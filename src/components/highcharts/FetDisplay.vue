<script setup>
import LineArea from '@/components/highcharts/LineArea.vue'
</script>

<template>
	<div class="houerFilterContainer">
		<el-row justify="start" class="keyratio">
			<el-col :span="24">
				<div>目前推估人數</div>
				<div>{{count}}</div>
			</el-col>
		</el-row>
		<LineArea :request="request"/>
		<el-slider 
			v-model="targetHour"
			:max="23"
			:format-tooltip="formatTooltip"
		/>
	</div>
</template>

<script>

export default {
	props: {
		request: {
			type: Object,
			default: () => {}
		}
	},
	components: {
		LineArea
	},
	computed:{
		config(){
			return this.request.config? this.request.config: null
		},
		count(){
			const Hours = new Date().getHours();
			const DataArray = this.request.data? this.request.data[0]['data']: null
			return DataArray? DataArray[Hours]: '--'
		}
	},
    data() {
		return {
			targetHour: 0,
		}
    },
    methods: {
		formatTooltip(val) {
			return `${val}Hr`
		}
    }
}
</script>
<style lang="scss">
.houerFilterContainer{
	.chartContainer.area{
		height: 15rem !important;
	}
	.el-slider{
		width: calc(100% - 6rem);
		margin-top: .5rem;
		margin-left: 5rem;
	}
}
.mapDrawerContainer{
	.houerFilterContainer{
		.chartContainer.area{
			height: 10rem !important;
		}
	}
}
</style>